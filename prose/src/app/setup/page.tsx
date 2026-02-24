import PageHeader from "@/components/PageHeader";
import { WireframeRoleGrid } from "@/components/WireframeInserts";

const roles = [
  { label: "Petitioner", desc: "I filed the case", icon: "🙋" },
  { label: "Respondent", desc: "I was served", icon: "🛡️" },
  { label: "Not Sure", desc: "Help me identify", icon: "❓" },
];

export default function SetupPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Case Setup"
        title="Let’s Set Up Your Case"
        subtitle="Tell us about your situation so we can personalize your legal roadmap."
      />

      <div className="grid gap-4 lg:grid-cols-[0.9fr_2.1fr]">
        <aside className="card bg-ink text-parchment lg:sticky lg:top-6">
          <div className="space-y-4">
            <div>
              <p className="font-display text-lg text-parchment">Case Setup</p>
              <p className="mt-2 text-xs text-parchment/60">
                Complete each step to activate your personalized ProSe.
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="grid h-7 w-7 place-items-center rounded-full bg-gold text-ink text-xs font-semibold">
                  1
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-gold">
                    Case Details
                  </p>
                  <p className="text-xs text-parchment/50">
                    Role, type, jurisdiction
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 opacity-70">
                <div className="grid h-7 w-7 place-items-center rounded-full border border-parchment/30 text-xs">
                  2
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em]">Upload Docs</p>
                  <p className="text-xs text-parchment/50">Court orders, motions</p>
                </div>
              </div>
              <div className="flex items-start gap-3 opacity-70">
                <div className="grid h-7 w-7 place-items-center rounded-full border border-parchment/30 text-xs">
                  3
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em]">Review</p>
                  <p className="text-xs text-parchment/50">Dashboard ready</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-gold/30 bg-gold/10 p-4 text-xs text-parchment/70">
              <p className="uppercase tracking-[0.2em] text-gold">Privacy Note</p>
              <p className="mt-2">
                All case information is stored securely and never shared with
                third parties.
              </p>
            </div>
          </div>
        </aside>

        <div className="space-y-4">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">Your Role in This Case</p>
                <p className="text-xs text-ink/60">Step 1 of 3</p>
              </div>
              <div className="pill">Step 1 of 3</div>
            </div>
            <div className="mt-4">
              <WireframeRoleGrid roles={roles} selected="Petitioner" />
            </div>
            <p className="mt-3 text-xs text-rust/80">
              Tap a card to select your role. The selected card uses the gold
              highlight state from the wireframes.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="card">
              <p className="text-[11px] uppercase tracking-[0.22em] text-ink/50">
                Case Information
              </p>
              <div className="mt-4 space-y-3 text-sm">
                <label className="block">
                  <span className="text-xs uppercase tracking-[0.2em] text-ink/50">
                    Case Type
                  </span>
                  <select className="mt-2 w-full rounded-xl border border-ink/10 bg-parchment/80 px-3 py-2">
                    <option>Custody & Parenting Plan</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-xs uppercase tracking-[0.2em] text-ink/50">
                    Case Number
                  </span>
                  <input
                    className="mt-2 w-full rounded-xl border border-ink/10 bg-parchment/80 px-3 py-2"
                    placeholder="e.g. 24-3-00412-4"
                  />
                </label>
                <label className="block">
                  <span className="text-xs uppercase tracking-[0.2em] text-ink/50">
                    County
                  </span>
                  <input
                    className="mt-2 w-full rounded-xl border border-ink/10 bg-parchment/80 px-3 py-2"
                    placeholder="e.g. Pierce County"
                  />
                </label>
                <label className="block">
                  <span className="text-xs uppercase tracking-[0.2em] text-ink/50">
                    State
                  </span>
                  <select className="mt-2 w-full rounded-xl border border-ink/10 bg-parchment/80 px-3 py-2">
                    <option>Washington</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="card">
              <p className="text-[11px] uppercase tracking-[0.22em] text-ink/50">
                Family Information
              </p>
              <div className="mt-4 space-y-3 text-sm">
                <label className="block">
                  <span className="text-xs uppercase tracking-[0.2em] text-ink/50">
                    Children Involved?
                  </span>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <button className="btn-secondary">Yes</button>
                    <button className="btn-secondary">No</button>
                  </div>
                </label>
                <label className="block">
                  <span className="text-xs uppercase tracking-[0.2em] text-ink/50">
                    Number of Children
                  </span>
                  <input
                    className="mt-2 w-full rounded-xl border border-ink/10 bg-parchment/80 px-3 py-2"
                    placeholder="e.g. 2"
                  />
                </label>
                <label className="block">
                  <span className="text-xs uppercase tracking-[0.2em] text-ink/50">
                    Represented by Attorney?
                  </span>
                  <select className="mt-2 w-full rounded-xl border border-ink/10 bg-parchment/80 px-3 py-2">
                    <option>No — Self-represented</option>
                  </select>
                </label>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="btn-primary">Continue to Step 2 →</button>
            <button className="btn-secondary">Save Draft</button>
          </div>
        </div>
      </div>
    </div>
  );
}
