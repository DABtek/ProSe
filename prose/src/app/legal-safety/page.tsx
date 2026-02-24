import PageHeader from "@/components/PageHeader";

const rules = [
  "Always show a Not Legal Advice banner on analyses and drafts.",
  "Explain concepts and procedures, never recommend strategy.",
  "Provide templates only; the user supplies their narrative.",
  "Cite statutes and court rules as informational sources.",
  "Encourage review by a licensed attorney.",
];

export default function LegalSafetyPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Safety"
        title="Legal Safety Policy"
        subtitle="This app provides general legal information only."
      />

      <section className="card space-y-4">
        <p className="text-sm text-ink/70">
          ProSe is built to help people organize and understand family court
          documents. It does not provide legal advice and does not replace a
          licensed attorney.
        </p>
        <div className="space-y-2">
          {rules.map((rule) => (
            <div key={rule} className="flex gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-teal" />
              <p className="text-sm text-ink/70">{rule}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="card-muted">
        <p className="text-sm font-semibold">Need legal advice?</p>
        <p className="mt-2 text-xs text-ink/60">
          Contact a licensed attorney or your local court self-help center for
          guidance specific to your case.
        </p>
      </section>
    </div>
  );
}
