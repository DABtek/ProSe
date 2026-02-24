import Link from "next/link";
import DesktopShell from "@/components/DesktopShell";
import PageHeader from "@/components/PageHeader";
import {
  WireframeAnalysisCard,
  WireframeDocumentStatusList,
  WireframeTimelineStats,
  WireframeUploadZone,
} from "@/components/WireframeInserts";

export default function Home() {
  return (
    <DesktopShell
      activeHref="/"
      documents={[
        { title: "Parenting Plan v2", status: "Analyzed" },
        { title: "Motion to Modify", status: "Pending" },
        { title: "GAL Report", status: "Analyzing" },
      ]}
    >
      <div className="space-y-6">
        <PageHeader
          eyebrow="Case Dashboard"
          title="Johnson v. Johnson"
          subtitle="Case No. 24-2-01984-5 • Pierce County Superior Court"
          actionLabel="Switch"
          actionHref="#"
        />

        <section className="card space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-ink/70">
              Case Snapshot
            </h2>
            <span className="pill">WA only</span>
          </div>
          <WireframeTimelineStats />
        </section>

        <section className="grid gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-ink/70">
              Quick Actions
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/kb" className="card flex flex-col gap-2">
              <p className="text-sm font-semibold">Upload document</p>
              <p className="text-xs text-ink/60">
                OCR, extract parties, deadlines, and court info.
              </p>
            </Link>
            <Link href="/setup" className="card flex flex-col gap-2">
              <p className="text-sm font-semibold">Case setup</p>
              <p className="text-xs text-ink/60">
                Set jurisdiction, role, and case details.
              </p>
            </Link>
            <Link href="/drafts" className="card flex flex-col gap-2">
              <p className="text-sm font-semibold">Draft a filing</p>
              <p className="text-xs text-ink/60">
                Guided templates with WA headers and formatting.
              </p>
            </Link>
            <Link href="/kb" className="card flex flex-col gap-2 col-span-2">
              <p className="text-sm font-semibold">Record a note</p>
              <p className="text-xs text-ink/60">
                Audio or text notes saved to your case knowledge base.
              </p>
            </Link>
          </div>
        </section>

        <section className="grid gap-3 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="card space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-ink/70">
              Document Intake
            </h2>
            <WireframeUploadZone />
          </div>
          <div className="card space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-ink/70">
              Analysis Snapshot
            </h2>
            <WireframeAnalysisCard />
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="card">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-ink/70">
                Recent Documents
              </h2>
              <Link href="/kb" className="btn-secondary">
                View KB
              </Link>
            </div>
            <div className="mt-4 space-y-3">
              <Link href="/document/decl-jan" className="card-muted">
                <p className="text-sm font-semibold">Declaration of John Johnson</p>
                <p className="text-xs text-ink/60">
                  Filed Jan 12, 2026 • Declaration
                </p>
              </Link>
              <Link href="/document/motion-mod" className="card-muted">
                <p className="text-sm font-semibold">Motion to Modify Parenting Plan</p>
                <p className="text-xs text-ink/60">Received Jan 20, 2026</p>
              </Link>
            </div>
          </div>
          <WireframeDocumentStatusList
            items={[
              {
                title: "Parenting Plan Draft v2",
                meta: "Added Feb 18 • 4.2 MB",
                status: "Analyzed",
              },
              {
                title: "Motion to Modify Custody",
                meta: "Added Feb 20 • 1.8 MB",
                status: "Pending",
              },
              {
                title: "GAL Report",
                meta: "Added Feb 21 • 3.1 MB",
                status: "Analyzing",
              },
            ]}
          />
        </section>

        <section className="card">
          <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-ink/70">
            Focus This Week
          </h2>
          <p className="mt-3 text-sm text-ink/70">
            Build your evidence timeline around parenting time consistency. Add
            missed exchanges, communications, and receipts to the KB for
            retrieval.
          </p>
        </section>
      </div>
    </DesktopShell>
  );
}
