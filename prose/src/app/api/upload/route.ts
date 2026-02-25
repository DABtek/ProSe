import path from "path";
import { auth } from "@/auth";
import { getOrCreateActiveCase } from "@/lib/caseScope";
import { NextResponse } from "next/server";
import { addDocument, saveUpload, type DocumentRecord } from "@/lib/documentStore";
import pdfParse from "pdf-parse";

export const runtime = "nodejs";

// ─── Ollama AI extraction ──────────────────────────────────────────────────

async function analyzeWithOllama(text: string, filename: string) {
  const prompt = `You are a legal document analyst. Analyze this court document and return ONLY a valid JSON object with no extra text, no markdown, no code blocks.

Document text (first 3000 chars):
${text.slice(0, 3000)}

Return this exact JSON structure:
{
  "documentType": "one of: Motion, Order, Declaration, Parenting Plan, Financial Declaration, GAL Report, Subpoena, Legal Document",
  "summary": "2-3 sentence plain English summary of what this document is and what it does",
  "caseNumber": "case number or null",
  "judge": "judge full name or null",
  "parties": "Petitioner name v. Respondent name or null",
  "hearingDate": "date string or null",
  "keyDates": ["array", "of", "important", "dates", "found"],
  "tags": ["relevant", "topic", "tags"],
  "riskFlags": ["any concerning clauses or issues found, empty array if none"]
}`;

  try {
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3.2",
        prompt,
        stream: false,
        options: { temperature: 0.1 }, // low temp = more consistent output
      }),
    });

    if (!response.ok) throw new Error("Ollama request failed");

    const data = await response.json() as { response: string };
    const raw = data.response.trim();

    // Strip any accidental markdown code fences
    const cleaned = raw.replace(/^```json\n?/, "").replace(/\n?```$/, "").trim();
    const parsed = JSON.parse(cleaned);

    return {
      documentType: parsed.documentType || "Legal Document",
      summary:      parsed.summary || `Uploaded: ${filename}`,
      caseNumber:   parsed.caseNumber || undefined,
      judge:        parsed.judge || undefined,
      parties:      parsed.parties || undefined,
      hearingDate:  parsed.hearingDate || undefined,
      keyDates:     Array.isArray(parsed.keyDates) ? parsed.keyDates : [],
      tags:         Array.isArray(parsed.tags) ? parsed.tags : [],
      riskFlags:    Array.isArray(parsed.riskFlags) ? parsed.riskFlags : [],
    };

  } catch (err) {
    console.error("Ollama analysis failed:", err);
    return null; // fall through to regex fallback
  }
}

// ─── Regex fallback (if Ollama is not running) ─────────────────────────────

function extractField(text: string, patterns: RegExp[]): string | undefined {
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match?.[1]?.trim()) return match[1].trim();
  }
  return undefined;
}

function extractDates(text: string): string[] {
  const datePattern = /\b(\w+ \d{1,2},?\s+\d{4}|\d{1,2}\/\d{1,2}\/\d{4}|\d{4}-\d{2}-\d{2})\b/g;
  const matches = text.match(datePattern) || [];
  return [...new Set(matches)].slice(0, 5);
}

function extractTags(text: string): string[] {
  const tags: string[] = [];
  const keywords: Record<string, string[]> = {
    "Parenting Plan":  ["parenting plan", "residential schedule", "custody"],
    "Motion":          ["motion to", "hereby moves"],
    "Order":           ["it is ordered", "the court orders", "so ordered"],
    "Declaration":     ["i declare", "i hereby declare", "under penalty of perjury"],
    "Financial":       ["income", "monthly expenses", "financial declaration"],
    "Family Court":    ["family court", "superior court", "dissolution"],
    "Washington":      ["rcw", "washington state", "wash."],
    "Child Support":   ["child support", "support obligation"],
  };
  const lower = text.toLowerCase();
  for (const [tag, triggers] of Object.entries(keywords)) {
    if (triggers.some(t => lower.includes(t))) tags.push(tag);
  }
  return tags;
}

function extractDocumentType(text: string): string {
  const lower = text.toLowerCase();
  if (lower.includes("parenting plan"))        return "Parenting Plan";
  if (lower.includes("motion to"))             return "Motion";
  if (lower.includes("it is ordered"))         return "Order";
  if (lower.includes("i declare"))             return "Declaration";
  if (lower.includes("financial declaration")) return "Financial Declaration";
  return "Legal Document";
}

function regexFallback(text: string, filename: string) {
  const caseNumber = extractField(text, [
    /case\s+no[.:]?\s*([0-9\-A-Z]+)/i,
    /cause\s+no[.:]?\s*([0-9\-A-Z]+)/i,
  ]);
  const judge = extractField(text, [
    /judge[:\s]+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)/,
    /hon(?:orable)?[.\s]+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)/i,
  ]);
  const parties = extractField(text, [
    /([A-Z][a-z]+(?: [A-Z][a-z]+)*)\s*,?\s*(?:Petitioner|Plaintiff)[\s\S]{0,30}(?:vs?\.?|versus)\s*([A-Z][a-z]+(?: [A-Z][a-z]+)*)/i,
  ]);
  const hearingDate = extractField(text, [
    /hearing\s+(?:date|scheduled)[:\s]+([A-Za-z]+ \d{1,2},?\s+\d{4})/i,
    /set\s+for\s+([A-Za-z]+ \d{1,2},?\s+\d{4})/i,
  ]);
  const docType  = extractDocumentType(text);
  const keyDates = extractDates(text);
  const tags     = extractTags(text);
  const firstLine = text.split("\n").find(l => l.trim().length > 40)?.trim().slice(0, 120) || "";
  const summary  = `${docType} — ${firstLine || `See ${filename} for details.`}`;

  return { documentType: docType, summary, caseNumber, judge, parties, hearingDate, keyDates, tags, riskFlags: [] };
}

// ─── Main PDF processor ────────────────────────────────────────────────────

async function extractFromPdf(buffer: Buffer, filename: string) {
  try {
    const data = await pdfParse(buffer);
    const text = data.text || "";

    if (!text.trim()) {
      return {
        documentType: "Legal Document",
        summary: `Uploaded: ${filename}. No text could be extracted — may be a scanned image.`,
        caseNumber: undefined, judge: undefined, parties: undefined,
        hearingDate: undefined, keyDates: [], tags: ["Scanned"], riskFlags: [],
      };
    }

    // Try Ollama first, fall back to regex if not available
    const aiResult = await analyzeWithOllama(text, filename);
    if (aiResult) {
      console.log("✅ Ollama analysis succeeded for:", filename);
      return aiResult;
    }

    console.log("⚠️ Ollama unavailable, using regex fallback for:", filename);
    return regexFallback(text, filename);

  } catch (err) {
    console.error("PDF parse error:", err);
    return {
      documentType: "Legal Document",
      summary: `Uploaded: ${filename}. Could not extract text.`,
      caseNumber: undefined, judge: undefined, parties: undefined,
      hearingDate: undefined, keyDates: [], tags: ["Uploaded"], riskFlags: [],
    };
  }
}

// ─── Route handler ─────────────────────────────────────────────────────────

export async function POST(request: Request) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const activeCase = await getOrCreateActiveCase(userId);
  const formData   = await request.formData();
  const file       = formData.get("file");

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer      = Buffer.from(arrayBuffer);
  const id          = crypto.randomUUID();
  const extension   = path.extname(file.name) || ".bin";
  const storedName  = `${id}${extension}`;

  await saveUpload(storedName, buffer);

  const extraction = file.type === "application/pdf" || file.name.endsWith(".pdf")
    ? await extractFromPdf(buffer, file.name)
    : {
        documentType: "Document",
        summary: `Uploaded: ${file.name}`,
        judge: undefined, parties: undefined, caseNumber: undefined,
        hearingDate: undefined, keyDates: [], tags: [file.type?.split("/")[1]?.toUpperCase() || "File"],
        riskFlags: [],
      };

  const record: DocumentRecord = {
    id,
    filename:   file.name,
    storedName,
    mimeType:   file.type || "application/octet-stream",
    size:       file.size,
    uploadedAt: new Date().toISOString(),
    status:     "ready",
    ...extraction,
  };

  await addDocument({ userId, caseId: activeCase.id, record });

  return NextResponse.json(record);
}
