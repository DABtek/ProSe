import type {
  DocumentStatusItem,
  RoleOption,
  TimelineEvent,
  WireframeChecklistItem,
} from "@/contracts/wireframe";

export function WireframeUploadZone() {
  return (
    <div className="rounded-2xl border-2 border-dashed border-ink/20 bg-parchment/70 p-5 text-center">
      <div className="text-2xl">📎</div>
      <p className="mt-2 text-sm font-semibold text-ink">Upload a Document</p>
      <p className="mt-1 text-xs text-ink/60">
        Tap to choose a file or take a photo.
      </p>
      <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-ink/40">
        PDF · DOCX · JPG · PNG
      </p>
    </div>
  );
}

export function WireframeAnalysisCard() {
  return (
    <div className="rounded-2xl bg-ink p-5 text-parchment shadow-sm">
      <p className="text-[11px] uppercase tracking-[0.26em] text-gold">
        Key Findings
      </p>
      <p className="mt-3 text-sm text-parchment/80">
        3 clauses flagged that may conflict with Washington RCW 26.09.187.
      </p>
      <div className="mt-3 space-y-2 text-xs text-parchment/70">
        <p>› Holiday schedule leaves 4 major holidays unaddressed.</p>
        <p>› Medical decision-making lacks a tie-breaking mechanism.</p>
        <p>› Relocation clause does not meet the 60-day notice requirement.</p>
      </div>
    </div>
  );
}

export function WireframeRiskScore() {
  return (
    <div className="rounded-2xl border border-rust/20 bg-rust/5 p-4">
      <p className="text-[11px] uppercase tracking-[0.22em] text-rust/80">
        Risk Score
      </p>
      <div className="mt-3 flex items-center gap-3">
        <p className="font-display text-4xl text-rust">3</p>
        <div>
          <p className="text-sm font-semibold text-rust">Issues Found</p>
          <p className="text-xs text-ink/60">Review before filing</p>
        </div>
      </div>
    </div>
  );
}

export function WireframeTimelineStats() {
  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="rounded-2xl border border-ink/10 bg-parchment/80 p-3 text-center">
        <p className="font-display text-xl text-ink">12</p>
        <p className="text-[11px] uppercase tracking-[0.18em] text-ink/50">
          Days to Hearing
        </p>
      </div>
      <div className="rounded-2xl border border-rust/20 bg-rust/5 p-3 text-center">
        <p className="font-display text-xl text-rust">3</p>
        <p className="text-[11px] uppercase tracking-[0.18em] text-ink/50">
          Urgent Deadlines
        </p>
      </div>
      <div className="rounded-2xl border border-ink/10 bg-parchment/80 p-3 text-center">
        <p className="font-display text-xl text-ink">7</p>
        <p className="text-[11px] uppercase tracking-[0.18em] text-ink/50">
          Docs Filed
        </p>
      </div>
    </div>
  );
}

export function WireframeChecklist() {
  const items: WireframeChecklistItem[] = [
    { label: "Parenting Plan Draft", status: "done" },
    { label: "Financial Declaration", status: "pending" },
    { label: "Child Support Worksheet", status: "pending" },
    { label: "Proposed Order", status: "todo" },
    { label: "Proof of Service", status: "todo" },
  ];

  return (
    <div className="rounded-2xl border border-ink/10 bg-parchment/80 p-4">
      <p className="text-[11px] uppercase tracking-[0.22em] text-ink/50">
        Document Checklist
      </p>
      <div className="mt-3 space-y-2 text-sm">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <span>
              {item.status === "done"
                ? "✅"
                : item.status === "pending"
                  ? "⏳"
                  : "⬜"}
            </span>
            <span className="text-ink/70">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function WireframeRoleGrid({
  roles,
  selected,
}: {
  roles: RoleOption[];
  selected: string;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {roles.map((role) => (
        <div
          key={role.label}
          className={`rounded-2xl border p-4 text-center ${
            selected === role.label
              ? "border-gold bg-parchment shadow-sm"
              : "border-ink/10 bg-parchment/80"
          }`}
        >
          <div className="text-2xl">{role.icon}</div>
          <p className="mt-2 text-sm font-semibold">{role.label}</p>
          <p className="mt-1 text-xs text-ink/60">{role.desc}</p>
        </div>
      ))}
    </div>
  );
}

export function WireframeDocumentStatusList({
  items,
}: {
  items: DocumentStatusItem[];
}) {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div
          key={item.title}
          className="rounded-xl border border-ink/10 bg-parchment/85 px-3 py-3"
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-ink">{item.title}</p>
              <p className="text-xs text-ink/55">{item.meta}</p>
            </div>
            <span className="pill">{item.status}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function WireframeTimelineEvents({ events }: { events: TimelineEvent[] }) {
  return (
    <div className="space-y-4 border-l border-ink/10 pl-4">
      {events.map((event) => {
        const dotColor =
          event.state === "done"
            ? "bg-teal"
            : event.state === "alert"
              ? "bg-rust"
              : event.state === "upcoming"
                ? "bg-gold"
                : "bg-ink/30";

        const cardTone =
          event.state === "alert"
            ? "border-rust/30 bg-rust/5"
            : event.state === "upcoming"
              ? "border-gold/30 bg-gold/10"
              : "border-ink/10 bg-parchment/80";

        return (
          <div key={`${event.date}-${event.title}`} className="relative">
            <span
              className={`absolute -left-[9px] top-2 h-3 w-3 rounded-full ${dotColor}`}
            />
            <div className={`rounded-2xl border p-3 ${cardTone}`}>
              <p className="text-xs uppercase tracking-[0.18em] text-ink/50">
                {event.date}
              </p>
              <p className="mt-1 text-sm font-semibold text-ink">{event.title}</p>
              <p className="mt-1 text-xs text-ink/65">{event.desc}</p>
              {event.actions?.length ? (
                <div className="mt-2 flex flex-wrap gap-2">
                  {event.actions.map((action) => (
                    <span key={action} className="pill">
                      {action}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function WireframeFilterCard() {
  return (
    <div className="card">
      <p className="text-sm font-semibold">Filter Events</p>
      <div className="mt-3 space-y-2 text-xs text-ink/60">
        <p>✓ All events</p>
        <p>⚠️ Deadlines only</p>
        <p>📅 Hearings only</p>
        <p>✅ Completed</p>
      </div>
    </div>
  );
}
