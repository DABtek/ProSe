import fs from "fs/promises";
import path from "path";
import { DocumentStatus } from "@prisma/client";
import prisma from "@/lib/prisma";
import { PROSE_DEMO_MODE } from "@/lib/runtimeMode";

export type DocumentRecord = {
  id: string;
  filename: string;
  storedName: string;
  mimeType: string;
  size: number;
  uploadedAt: string;
  status: "received" | "processing" | "ready";
  summary?: string;
  keyDates?: string[];
  tags?: string[];
  documentType?: string;
  caseNumber?: string;
  parties?: string;
  judge?: string;
  hearingDate?: string;
};

type ScopedDemoDocument = DocumentRecord & {
  userId: string;
  caseId: string;
};

const dataDir = path.join(process.cwd(), ".data");
const uploadsDir = path.join(dataDir, "uploads");
const demoDocumentsPath = path.join(dataDir, "demo-documents.json");

function toRecordStatus(status: DocumentStatus): DocumentRecord["status"] {
  if (status === "processing") return "processing";
  if (status === "ready") return "ready";
  return "received";
}

function toDbStatus(status: DocumentRecord["status"]): DocumentStatus {
  if (status === "processing") return "processing";
  if (status === "ready") return "ready";
  return "received";
}

function toDocumentRecord(doc: {
  id: string;
  filename: string;
  storedName: string;
  mimeType: string;
  size: number;
  uploadedAt: Date;
  status: DocumentStatus;
  summary: string | null;
  keyDates: string[];
  tags: string[];
  documentType: string | null;
  caseNumber: string | null;
  parties: string | null;
  judge: string | null;
  hearingDate: string | null;
}): DocumentRecord {
  return {
    id: doc.id,
    filename: doc.filename,
    storedName: doc.storedName,
    mimeType: doc.mimeType,
    size: doc.size,
    uploadedAt: doc.uploadedAt.toISOString(),
    status: toRecordStatus(doc.status),
    summary: doc.summary ?? undefined,
    keyDates: doc.keyDates,
    tags: doc.tags,
    documentType: doc.documentType ?? undefined,
    caseNumber: doc.caseNumber ?? undefined,
    parties: doc.parties ?? undefined,
    judge: doc.judge ?? undefined,
    hearingDate: doc.hearingDate ?? undefined,
  };
}

function toScopedDemoDocument(
  input: DocumentRecord & { userId: string; caseId: string },
): ScopedDemoDocument {
  return {
    id: input.id,
    userId: input.userId,
    caseId: input.caseId,
    filename: input.filename,
    storedName: input.storedName,
    mimeType: input.mimeType,
    size: input.size,
    uploadedAt: input.uploadedAt,
    status: input.status,
    summary: input.summary,
    keyDates: input.keyDates ?? [],
    tags: input.tags ?? [],
    documentType: input.documentType,
    caseNumber: input.caseNumber,
    parties: input.parties,
    judge: input.judge,
    hearingDate: input.hearingDate,
  };
}

function fromScopedDemoDocument(doc: ScopedDemoDocument): DocumentRecord {
  return {
    id: doc.id,
    filename: doc.filename,
    storedName: doc.storedName,
    mimeType: doc.mimeType,
    size: doc.size,
    uploadedAt: doc.uploadedAt,
    status: doc.status,
    summary: doc.summary,
    keyDates: doc.keyDates,
    tags: doc.tags,
    documentType: doc.documentType,
    caseNumber: doc.caseNumber,
    parties: doc.parties,
    judge: doc.judge,
    hearingDate: doc.hearingDate,
  };
}

function sortByNewest(a: { uploadedAt: string }, b: { uploadedAt: string }) {
  return Date.parse(b.uploadedAt) - Date.parse(a.uploadedAt);
}

function seededDemoDocuments(userId: string, caseId: string): ScopedDemoDocument[] {
  return [
    {
      id: "motion-mod",
      userId,
      caseId,
      filename: "Motion to Modify Parenting Plan.pdf",
      storedName: "motion-mod.pdf",
      mimeType: "application/pdf",
      size: 1812220,
      uploadedAt: "2026-02-20T19:30:00.000Z",
      status: "ready",
      summary:
        "Responding party requests modification of weekday exchanges and holiday schedule.",
      keyDates: ["03/05/2026", "03/18/2026"],
      tags: ["Motion", "Parenting Plan", "Washington"],
      documentType: "Motion",
      caseNumber: "24-2-01984-5",
      parties: "Jordan Johnson v. Taylor Johnson",
      judge: "Hon. Alicia Chen",
      hearingDate: "03/18/2026",
    },
    {
      id: "decl-jan",
      userId,
      caseId,
      filename: "Declaration of Jordan Johnson.pdf",
      storedName: "decl-jan.pdf",
      mimeType: "application/pdf",
      size: 4220312,
      uploadedAt: "2026-01-12T20:00:00.000Z",
      status: "ready",
      summary:
        "Declaration describes parenting routine, school transport, and missed exchanges.",
      keyDates: ["01/12/2026"],
      tags: ["Declaration", "Evidence", "Washington"],
      documentType: "Declaration",
      caseNumber: "24-2-01984-5",
      parties: "Jordan Johnson v. Taylor Johnson",
      judge: "Hon. Alicia Chen",
      hearingDate: "02/08/2026",
    },
    {
      id: "gal-report",
      userId,
      caseId,
      filename: "GAL Report.pdf",
      storedName: "gal-report.pdf",
      mimeType: "application/pdf",
      size: 3120000,
      uploadedAt: "2026-02-21T16:45:00.000Z",
      status: "processing",
      summary:
        "Guardian ad litem report imported. OCR parsing in progress for recommendations.",
      keyDates: [],
      tags: ["GAL", "Report"],
      documentType: "Report",
      caseNumber: "24-2-01984-5",
      parties: "Jordan Johnson v. Taylor Johnson",
      judge: "Hon. Alicia Chen",
      hearingDate: "",
    },
  ];
}

async function ensureStorage() {
  await fs.mkdir(uploadsDir, { recursive: true });
}

async function readDemoDocuments(): Promise<ScopedDemoDocument[]> {
  try {
    const raw = await fs.readFile(demoDocumentsPath, "utf8");
    const parsed = JSON.parse(raw) as ScopedDemoDocument[];
    return parsed;
  } catch {
    return [];
  }
}

async function writeDemoDocuments(documents: ScopedDemoDocument[]) {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(demoDocumentsPath, JSON.stringify(documents, null, 2));
}

export async function listDocuments(input: {
  userId: string;
  caseId: string;
}): Promise<DocumentRecord[]> {
  if (PROSE_DEMO_MODE) {
    const docs = await readDemoDocuments();
    const scoped = docs.filter(
      (doc) => doc.userId === input.userId && doc.caseId === input.caseId,
    );

    if (scoped.length === 0) {
      const seed = seededDemoDocuments(input.userId, input.caseId);
      await writeDemoDocuments([...docs, ...seed]);
      return seed.sort(sortByNewest).map(fromScopedDemoDocument);
    }

    return scoped.sort(sortByNewest).map(fromScopedDemoDocument);
  }

  const docs = await prisma.document.findMany({
    where: {
      userId: input.userId,
      caseId: input.caseId,
    },
    orderBy: {
      uploadedAt: "desc",
    },
  });

  return docs.map(toDocumentRecord);
}

export async function getDocumentById(input: {
  id: string;
  userId: string;
  caseId: string;
}): Promise<DocumentRecord | null> {
  if (PROSE_DEMO_MODE) {
    const docs = await readDemoDocuments();
    const doc = docs.find(
      (item) =>
        item.id === input.id &&
        item.userId === input.userId &&
        item.caseId === input.caseId,
    );

    return doc ? fromScopedDemoDocument(doc) : null;
  }

  const doc = await prisma.document.findFirst({
    where: {
      id: input.id,
      userId: input.userId,
      caseId: input.caseId,
    },
  });

  if (!doc) {
    return null;
  }

  return toDocumentRecord(doc);
}

export async function addDocument(input: {
  userId: string;
  caseId: string;
  record: DocumentRecord;
}) {
  if (PROSE_DEMO_MODE) {
    const docs = await readDemoDocuments();
    const next = toScopedDemoDocument({
      ...input.record,
      userId: input.userId,
      caseId: input.caseId,
    });
    docs.push(next);
    await writeDemoDocuments(docs);
    return fromScopedDemoDocument(next);
  }

  const doc = await prisma.document.create({
    data: {
      id: input.record.id,
      userId: input.userId,
      caseId: input.caseId,
      filename: input.record.filename,
      storedName: input.record.storedName,
      mimeType: input.record.mimeType,
      size: input.record.size,
      uploadedAt: new Date(input.record.uploadedAt),
      status: toDbStatus(input.record.status),
      summary: input.record.summary,
      keyDates: input.record.keyDates ?? [],
      tags: input.record.tags ?? [],
      documentType: input.record.documentType,
      caseNumber: input.record.caseNumber,
      parties: input.record.parties,
      judge: input.record.judge,
      hearingDate: input.record.hearingDate,
    },
  });

  return toDocumentRecord(doc);
}

export async function saveUpload(
  storedName: string,
  buffer: Buffer,
): Promise<string> {
  await ensureStorage();
  const destination = path.join(uploadsDir, storedName);
  await fs.writeFile(destination, buffer);
  return destination;
}
