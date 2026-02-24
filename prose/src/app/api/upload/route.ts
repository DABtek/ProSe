import path from "path";
import { auth } from "@/auth";
import { getOrCreateActiveCase } from "@/lib/caseScope";
import { NextResponse } from "next/server";
import { addDocument, saveUpload, type DocumentRecord } from "@/lib/documentStore";

export const runtime = "nodejs";

const documentTypes = [
  "Declaration",
  "Motion",
  "Order",
  "Parenting Plan",
  "Financial Declaration",
];
const judges = [
  "Hon. Maria Reynolds",
  "Hon. Steven Patel",
  "Hon. Alicia Chen",
  "Hon. Mark Henderson",
  "Hon. Diane Alvarez",
];
const parties = [
  "Jordan Reed v. Casey Reed",
  "Alex Johnson v. Taylor Johnson",
  "Chris Morgan v. Riley Morgan",
  "Sam Rivera v. Avery Rivera",
  "Morgan Lee v. Jamie Lee",
];
const casePrefixes = ["24-2", "25-3", "23-1", "24-1", "25-2"];

function pickFrom<T>(items: T[], seed: number) {
  return items[seed % items.length];
}

function hashSeed(input: string) {
  return Array.from(input).reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

function generateFakeExtraction(id: string, filename: string) {
  const seed = hashSeed(id + filename);
  const docType = pickFrom(documentTypes, seed);
  const judge = pickFrom(judges, seed + 3);
  const partiesText = pickFrom(parties, seed + 7);
  const caseNumber = `${pickFrom(casePrefixes, seed + 11)}-${String(
    1000 + (seed % 8000),
  )}-5`;
  const hearingDate = new Date(
    Date.now() + ((seed % 14) + 3) * 24 * 60 * 60 * 1000,
  ).toLocaleDateString();

  return {
    documentType: docType,
    judge,
    parties: partiesText,
    caseNumber,
    hearingDate,
    summary: `Detected a ${docType.toLowerCase()} referencing parenting time and scheduling changes. Extracted key parties and court assignments for review.`,
    keyDates: [hearingDate],
    tags: [docType, "Washington", "Family Court"],
  };
}

export async function POST(request: Request) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const activeCase = await getOrCreateActiveCase(userId);
  const formData = await request.formData();
  const file = formData.get("file");

  if (!file || !(file instanceof File)) {
    return NextResponse.json(
      { error: "No file uploaded." },
      { status: 400 },
    );
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const id = crypto.randomUUID();
  const extension = path.extname(file.name) || ".bin";
  const storedName = `${id}${extension}`;

  await saveUpload(storedName, buffer);

  const fakeExtraction = generateFakeExtraction(id, file.name);

  const record: DocumentRecord = {
    id,
    filename: file.name,
    storedName,
    mimeType: file.type || "application/octet-stream",
    size: file.size,
    uploadedAt: new Date().toISOString(),
    status: "ready",
    ...fakeExtraction,
  };

  await addDocument({
    userId,
    caseId: activeCase.id,
    record,
  });

  return NextResponse.json(record);
}
