"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { DocumentRecord } from "@/lib/documentStore";
import PageHeader from "@/components/PageHeader";
import {
  WireframeAnalysisCard,
  WireframeDocumentStatusList,
  WireframeRiskScore,
  WireframeUploadZone,
} from "@/components/WireframeInserts";
import DesktopShell from "@/components/DesktopShell";

type UploadState = "idle" | "uploading" | "error";

function formatBytes(bytes: number) {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / Math.pow(1024, index);
  return `${value.toFixed(value >= 10 || index === 0 ? 0 : 1)} ${units[index]}`;
}

function statusLabel(status: DocumentRecord["status"]) {
  if (status === "ready") return "Analyzed";
  if (status === "processing") return "Analyzing";
  return "Pending";
}

export default function KnowledgeBaseClient() {
  const [documents, setDocuments] = useState<DocumentRecord[]>([]);
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const load = async () => {
      const response = await fetch("/api/documents");
      if (response.status === 401) {
        window.location.href = "/signin";
        return;
      }
      if (response.ok) {
        const data = (await response.json()) as DocumentRecord[];
        setDocuments(data);
      }
    };
    load();
  }, []);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadState("uploading");
    setMessage(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.status === 401) {
        window.location.href = "/signin";
        return;
      }

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const record = (await response.json()) as DocumentRecord;
      setDocuments((current) => [record, ...current]);
      setMessage("Upload received. OCR will run shortly.");
    } catch {
      setUploadState("error");
      setMessage("Upload failed. Please try again.");
      return;
    } finally {
      setUploadState("idle");
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  return (
    <DesktopShell
      activeHref="/kb"
      documents={documents.slice(0, 3).map((doc) => ({
        title: doc.filename,
        status: doc.status,
      }))}
    >
      <div className="space-y-6">
        <PageHeader
          eyebrow="Knowledge Base"
          title="Case Library"
          subtitle="All files, notes, and transcripts are indexed here."
        />

        <div className="card space-y-3">
          <input
            type="text"
            placeholder="Search documents, notes, dates"
            className="w-full rounded-full border border-ink/10 bg-parchment/80 px-4 py-2 text-sm text-ink placeholder:text-ink/40"
          />
          <div className="flex flex-wrap gap-2">
            <span className="pill">Docs</span>
            <span className="pill">Notes</span>
            <span className="pill">Audio</span>
            <span className="pill">Photos</span>
            <span className="pill">Transcripts</span>
          </div>
        </div>

        <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-3">
            {documents.length === 0 ? (
              <div className="card-muted">
                <p className="text-sm font-semibold">No uploads yet</p>
                <p className="mt-2 text-xs text-ink/60">
                  Upload a document to start building your case knowledge base.
                </p>
              </div>
            ) : (
              documents.map((doc) => (
                <Link key={doc.id} href={`/document/${doc.id}`} className="card">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold">{doc.filename}</p>
                      <p className="text-xs text-ink/60">
                        {new Date(doc.uploadedAt).toLocaleDateString()} •{" "}
                        {formatBytes(doc.size)}
                      </p>
                      {doc.documentType ? (
                        <p className="mt-2 text-xs text-ink/60">
                          {doc.documentType} • {doc.caseNumber}
                        </p>
                      ) : null}
                      <p className="mt-2 text-xs text-ink/50">{doc.summary}</p>
                    </div>
                    <span className="pill">{doc.status}</span>
                  </div>
                  {doc.tags?.length ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {doc.tags.map((tag) => (
                        <span key={tag} className="pill">
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </Link>
              ))
            )}
          </div>
          <div className="space-y-4">
            <div className="card space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-ink/70">
                Analysis Snapshot
              </h2>
              <WireframeAnalysisCard />
            </div>
            <div className="card space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-ink/70">
                File Status
              </h2>
              <WireframeDocumentStatusList
                items={documents.slice(0, 3).map((doc) => ({
                  title: doc.filename,
                  meta: `${new Date(doc.uploadedAt).toLocaleDateString()} • ${formatBytes(
                    doc.size,
                  )}`,
                  status: statusLabel(doc.status),
                }))}
              />
            </div>
            <WireframeRiskScore />
            <div className="card space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-ink/70">
                Quick Upload
              </h2>
              <WireframeUploadZone />
            </div>
            <div className="card space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-ink/70">
                Document Checklist
              </h2>
              <ul className="space-y-2 text-sm text-ink/70">
                <li>✅ Parenting Plan Draft</li>
                <li>⏳ Financial Declaration</li>
                <li>⏳ Child Support Worksheet</li>
                <li>⬜ Proposed Order</li>
                <li>⬜ Proof of Service</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="card-muted space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">Upload new evidence</p>
              <p className="text-xs text-ink/60">
                PDF, docx, audio, video, photos accepted.
              </p>
            </div>
            <button
              className="btn-primary"
              onClick={() => inputRef.current?.click()}
              disabled={uploadState === "uploading"}
            >
              {uploadState === "uploading" ? "Uploading" : "Upload"}
            </button>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,.mp3,.mp4,.mov"
            className="hidden"
            onChange={handleUpload}
          />
          {message ? <p className="text-xs text-ink/60">{message}</p> : null}
        </div>
      </div>
    </DesktopShell>
  );
}
