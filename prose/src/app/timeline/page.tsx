import PageHeader from "@/components/PageHeader";
import {
  WireframeFilterCard,
  WireframeTimelineEvents,
  WireframeTimelineStats,
} from "@/components/WireframeInserts";
import DesktopShell from "@/components/DesktopShell";

const timeline = [
  {
    date: "Jan 15, 2025",
    title: "Petition Filed",
    desc: "Case initiated. Summons served to respondent on Jan 17.",
    state: "done" as const,
  },
  {
    date: "Feb 27, 2025 • 5 Days Away",
    title: "Deadline: File Response to Motion",
    desc: "Response must be filed by 4:00 PM at the Pierce County Clerk's office.",
    state: "alert" as const,
    actions: ["Required Docs", "Court Location", "Response Template"],
  },
  {
    date: "Mar 6, 2025 • Upcoming",
    title: "Custody Evaluation • Dr. Simmons",
    desc: "In-person evaluation at 2:00 PM. Bring financial records and communication logs.",
    state: "upcoming" as const,
    actions: ["Prep Checklist", "Directions"],
  },
  {
    date: "Apr 14, 2025",
    title: "Final Hearing",
    desc: "Pierce County Superior Court • Dept. 12 • 9:00 AM.",
    state: "default" as const,
  },
];

export default function TimelinePage() {
  return (
    <DesktopShell
      activeHref="/timeline"
      footer={
        <div className="rounded-xl border border-gold/20 bg-gold/10 p-3 text-xs text-parchment/70">
          Quick Add
          <button className="mt-2 w-full rounded-full border border-gold/40 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-gold">
            + Add Event
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        <PageHeader
          eyebrow="Timeline"
          title="Case Activity"
          subtitle="Key events and deadlines pulled from your documents."
          actionLabel="Add"
          actionHref="#"
        />

        <div className="grid gap-4 lg:grid-cols-[1.6fr_0.4fr]">
          <div className="card space-y-4">
            <WireframeTimelineStats />
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ink/60">
                Events
              </p>
              <button className="btn-secondary">Deadlines only</button>
            </div>
            <WireframeTimelineEvents events={timeline} />
          </div>
          <div className="space-y-4">
            <div className="card-muted">
              <p className="text-sm font-semibold">Urgent Next Step</p>
              <p className="mt-2 text-xs text-ink/60">
                Response to Motion to Modify due Feb 27 at 4:00 PM. Upload your
                response draft and any supporting declarations.
              </p>
              <button className="mt-3 btn-primary">View Checklist</button>
            </div>
            <div className="card">
              <p className="text-sm font-semibold">Upcoming Prep</p>
              <ul className="mt-2 space-y-2 text-xs text-ink/60">
                <li>⬜ Draft response to motion</li>
                <li>⬜ Gather financial records</li>
                <li>⬜ Print communication log</li>
                <li>✅ File Parenting Plan draft</li>
                <li>✅ Complete GAL intake form</li>
              </ul>
            </div>
            <WireframeFilterCard />
          </div>
        </div>
      </div>
    </DesktopShell>
  );
}
