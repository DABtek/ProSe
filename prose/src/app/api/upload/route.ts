import path from "path";
import { auth } from "@/auth";
import { getOrCreateActiveCase } from "@/lib/caseScope";
import { NextResponse } from "next/server";
import { addDocument, saveUpload, type DocumentRecord } from "@/lib/documentStore";
import pdfParse from "pdf-parse";

export const runtime = "nodejs";

// ─── Real PDF extraction ───────────────────────────────────────────────────

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
  // deduplicate
  return [...new Set(matches)].slice(0, 5);
}

function extractTags(text: string): string[] {
  const tags: string[] = [];
  const keywords: Record<string, string[]> = {
    "Parenting Plan":      ["parenting plan", "residential schedule", "custody"],
    "Motion":              ["motion to", "hereby moves"],
    "Order":               ["it is ordered", "the court orders", "so ordered"],
    "Declaration":         ["i declare", "i hereby declare", "under penalty of perjury"],
    "Financial":           ["income", "monthly expenses", "financial declaration"],
    "Family Court":        ["family court", "superior court", "dissolution"],
    "Washington":          ["rcw", "washington state", "wash."],
    "Child Support":       ["child support", "support obligation"],
  };
  const lower = text.toLowerCase();
  for (const [tag, triggers] of Object.entries(keywords)) {
    if (triggers.some(t => lower.includes(t))) tags.push(tag);
  }
  return tags;
}

function extractDocumentType(text: string): string {
  const lower = text.toLowerCase();
  if (lower.includes("parenting plan"))       return "Parenting Plan";
  if (lower.includes("motion to"))            return "Motion";
  if (lower.includes("it is ordered") || lower.includes("so ordered")) return "Order";
  if (lower.includes("i declare") || lower.includes("declaration")) return "Declaration";
  if (lower.includes("financial declaration")) return "Financial Declaration";
  return "Legal Document";
}

async function extractFromPdf(buffer: Buffer, filename: string) {
  try {
    const data = await pdfParse(buffer);
    const text = data.text || "";

    const caseNumber = extractField(text, [
      /case\s+no[.:]?\s*([0-9\-A-Z]+)/i,
      /cause\s+no[.:]?\s*([0-9\-A-Z]+)/i,
      /no[.:]?\s*([0-9]{2}-[0-9]-[0-9]{4,}[-0-9]*)/i,
    ]);

    const judge = extractField(text, [
      /judge[:\s]+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)/,
      /hon(?:orable)?[.\s]+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)/i,
      /the\s+honorable\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)/i,
    ]);

    const parties = extractField(text, [
      /([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s*[,]?\s*(?:Petitioner|Plaintiff)[\s\S]{0,30}(?:vs?\.?|versus)\s*([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/i,
    ]);

    const hearingDate = extractField(text, [
      /hearing\s+(?:date|scheduled)[:\s]+([A-Za-z]+ \d{1,2},?\s+\d{4})/i,
      /set\s+for\s+([A-Za-z]+ \d{1,2},?\s+\d{4})/i,
    ]);

    const keyDates = extractDates(text);
    const tags     = extractTags(text);
    const docType  = extractDocumentType(text);

    // Build a short summary from first 800 chars of extracted text
    const preview = text.replace(/\s+/g, " ").trim().slice(0, 800);
    const summary = preview.length > 0
      ? `${docType} — ${text.split("\n").filter(l => l.trim().length > 40)[0]?.trim().slice(0, 120) || "See document for details."}`
      : `Uploaded file: ${filename}. Text extraction not available.`;

    return { documentType: docType, judge, parties, caseNumber, hearingDate, summary, keyDates, tags };

  } catch (err) {
    console.error("pdf-parse error:", err);
    // Graceful fallback if parsing fails
    return {
      documentType: "Legal Document",
      judge:        undefined,
      parties:      undefined,
      caseNumber:   undefined,
      hearingDate:  undefined,
      summary:      `Uploaded file: ${filename}. Could not extract text automatically.`,
      keyDates:     [],
      tags:         ["Uploaded"],
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

  // Real extraction for PDFs, graceful fallback for everything else
  const extraction = file.type === "application/pdf" || file.name.endsWith(".pdf")
    ? await extractFromPdf(buffer, file.name)
    : {
        documentType: "Document",
        judge:        undefined,
        parties:      undefined,
        caseNumber:   undefined,
        hearingDate:  undefined,
        summary:      `Uploaded file: ${file.name}. Open to review.`,
        keyDates:     [],
        tags:         [file.type?.split("/")[1]?.toUpperCase() || "File"],
      };

  const record: DocumentRecord = {
    id,
    filename:  file.name,
    storedName,
    mimeType:  file.type || "application/octet-stream",
    size:      file.size,
    uploadedAt: new Date().toISOString(),
    status:    "ready",
    ...extraction,
  };

  await addDocument({ userId, caseId: activeCase.id, record });

  return NextResponse.json(record);
}
