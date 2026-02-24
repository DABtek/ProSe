import PageHeader from "@/components/PageHeader";
import { WireframeChecklist } from "@/components/WireframeInserts";
import DesktopShell from "@/components/DesktopShell";

const drafts = [
  {
    title: "Declaration (Response to Motion)",
    status: "Draft",
    updated: "Updated Feb 02, 2026",
  },
  {
    title: "Proposed Parenting Plan",
    status: "Draft",
    updated: "Updated Jan 27, 2026",
  },
  {
    title: "Proof of Service",
    status: "Filed",
    updated: "Filed Jan 15, 2026",
  },
];

export default function DraftsPage() {
  return (
    <DesktopShell activeHref="/drafts">
      <div className="space-y-6">
        <PageHeader
          eyebrow="Drafts"
          title="Filing Workspace"
          subtitle="Template-driven drafts stay marked until a stamped copy is uploaded."
          actionLabel="New"
          actionHref="#"
        />

        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="grid gap-3">
            {drafts.map((draft) => (
              <div key={draft.title} className="card">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold">{draft.title}</p>
                    <p className="text-xs text-ink/60">{draft.updated}</p>
                  </div>
                  <span className="pill">{draft.status}</span>
                </div>
                <div className="mt-3 flex gap-2">
                  <button className="btn-secondary">Edit</button>
                  <button className="btn-primary">Export</button>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <div className="card space-y-2">
              <p className="text-sm font-semibold">Recommended Packet</p>
              <p className="text-xs text-ink/60">
                Keep required court documents together for easier filing.
              </p>
              <WireframeChecklist />
            </div>
            <div className="card-muted">
              <p className="text-sm font-semibold">Template Library</p>
              <p className="mt-2 text-xs text-ink/60">
                Browse WA-specific templates for declarations, motions, and proof
                of service.
              </p>
              <button className="mt-3 btn-primary">Browse Templates</button>
            </div>
          </div>
        </div>
      </div>
    </DesktopShell>
  );
}
