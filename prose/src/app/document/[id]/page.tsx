import { auth } from "@/auth";
import { getOrCreateActiveCase } from "@/lib/caseScope";
import Link from "next/link";
import { redirect } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import { getDocumentById } from "@/lib/documentStore";
import DesktopShell from "@/components/DesktopShell";
import {
  WireframeAnalysisCard,
  WireframeChecklist,
  WireframeRiskScore,
} from "@/components/WireframeInserts";

type PageProps = {
  params: { id: string };
};

export default async function DocumentPage({ params }: PageProps) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    redirect("/signin");
  }

  const activeCase = await getOrCreateActiveCase(userId);
  const document = await getDocumentById({
    id: params.id,
    userId,
    caseId: activeCase.id,
  });

  if (!document) {
    return (
      <div className="card">
        <p className="text-sm font-semibold">Document not found</p>
        <p className="mt-2 text-xs text-ink/60">
          This document may not be in your local KB yet.
        </p>
        <Link href="/kb" className="mt-4 inline-flex btn-secondary">
          Back to KB
        </Link>
      </div>
    );
  }

  return (
    <DesktopShell
      activeHref="/kb"
      documents={[
        { title: document.filename, status: "Analyzed" },
        { title: "Motion to Modify Custody", status: "Pending" },
        { title: "GAL Report", status: "Analyzing" },
      ]}
    >
      <div className="space-y-6">
        <PageHeader
          eyebrow="Document Analysis"
          title={document.filename}
          subtitle={`${document.documentType ?? "Document"} • ${document.caseNumber ?? "Case TBD"}`}
          actionLabel="Draft"
          actionHref="/drafts"
        />

        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <section className="card">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ink/60">
                  Preview
                </p>
                <button className="btn-secondary">Replace</button>
              </div>
              <div className="mt-4 flex h-56 items-center justify-center rounded-2xl border border-dashed border-ink/15 bg-fog/60 text-xs text-ink/50">
                PDF preview placeholder
              </div>
            </section>

            <section className="card space-y-4">
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-ink/60">
                  Plain-Language Summary
                </h2>
                <p className="mt-2 text-sm text-ink/70">
                  {document.summary ??
                    "This document has been added to your knowledge base. OCR analysis will populate a summary shortly."}
                </p>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/60">
                  Key Dates
                </h3>
                {document.keyDates?.length ? (
                  <ul className="mt-2 space-y-2 text-sm text-ink/70">
                    {document.keyDates.map((date) => (
                      <li key={date}>{date}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-sm text-ink/60">
                    No deadlines extracted yet.
                  </p>
                )}
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/60">
                  WA References (Informational)
                </h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="pill">RCW 26.09.260</span>
                  <span className="pill">WA Family Law Rule 3</span>
                  <span className="pill">Local Rule 7</span>
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-4">
            <WireframeRiskScore />
            <WireframeAnalysisCard />
            <WireframeChecklist />
            <section className="card-muted">
              <p className="text-sm font-semibold">Suggested next steps</p>
              <p className="mt-2 text-xs text-ink/60">
                Review deadlines, gather supporting evidence, and consult a
                licensed attorney before filing a response.
              </p>
              <div className="mt-3 flex gap-2">
                <Link href="/timeline" className="btn-secondary">
                  Add to timeline
                </Link>
                <Link href="/drafts" className="btn-primary">
                  Start draft
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </DesktopShell>
  );
}
