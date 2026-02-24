import PageHeader from "@/components/PageHeader";

const glossary = [
  {
    term: "Declaration",
    definition:
      "A written statement signed under penalty of perjury, often used to provide facts to the court.",
  },
  {
    term: "Motion",
    definition:
      "A request asking the court to issue an order or take a specific action.",
  },
  {
    term: "Service",
    definition:
      "The formal process of delivering court documents to the other party.",
  },
];

export default function LearnPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Learning"
        title="Glossary & Guides"
        subtitle="Plain-language explanations for Washington family court."
      />

      <div className="card space-y-3">
        <input
          type="text"
          placeholder="Search glossary, forms, rules"
          className="w-full rounded-full border border-ink/10 bg-parchment/80 px-4 py-2 text-sm text-ink placeholder:text-ink/40"
        />
        <div className="flex flex-wrap gap-2">
          <span className="pill">Common Terms</span>
          <span className="pill">WA Procedures</span>
          <span className="pill">FAQs</span>
        </div>
      </div>

      <section className="space-y-3">
        {glossary.map((item) => (
          <div key={item.term} className="card">
            <p className="text-sm font-semibold">{item.term}</p>
            <p className="mt-2 text-xs text-ink/60">{item.definition}</p>
            <button className="mt-3 btn-secondary">Learn more</button>
          </div>
        ))}
      </section>

      <div className="card-muted">
        <p className="text-sm font-semibold">WA Family Court Guides</p>
        <p className="mt-2 text-xs text-ink/60">
          Browse county-specific checklists, filing rules, and form lists.
        </p>
        <button className="mt-3 btn-primary">Open Guides</button>
      </div>
    </div>
  );
}
