import PageHeader from "@/components/PageHeader";

export default function WireframesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Wireframes"
        title="Responsive Prototype"
        subtitle="iPhone 17 Pro Max, iPad Pro 11, and MacBook Pro 16 layouts."
      />

      <div className="card">
        <p className="text-sm text-ink/70">
          These wireframes were imported from the provided HTML and are rendered
          in a full-page canvas below.
        </p>
      </div>

      <div className="card-muted p-0 overflow-hidden">
        <iframe
          title="ProSe Responsive Wireframes"
          src="/wireframes/prose-responsive-wireframes.html"
          className="h-[78vh] w-full rounded-2xl"
        />
      </div>
    </div>
  );
}
