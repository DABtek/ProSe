import { auth } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import SignOutButton from "@/components/SignOutButton";

export default async function SettingsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/signin");
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Settings"
        title="Account & Safety"
        subtitle="Control jurisdiction, data export, and AI providers."
      />

      <section className="card space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-semibold">Jurisdiction</p>
            <p className="text-xs text-ink/60">Washington • Pierce County</p>
          </div>
          <button className="btn-secondary">Edit</button>
        </div>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-semibold">Wireframes</p>
            <p className="text-xs text-ink/60">
              Review responsive layouts for phone, tablet, and desktop.
            </p>
          </div>
          <div className="flex gap-2">
            <Link href="/wireframes" className="btn-secondary">
              HTML
            </Link>
            <Link href="/wireframes-native" className="btn-secondary">
              React
            </Link>
          </div>
        </div>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-semibold">AI Provider</p>
            <p className="text-xs text-ink/60">OpenAI (API key required)</p>
          </div>
          <button className="btn-secondary">Manage</button>
        </div>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-semibold">Data Export</p>
            <p className="text-xs text-ink/60">
              Download your KB, drafts, and timeline history.
            </p>
          </div>
          <button className="btn-secondary">Export</button>
        </div>
      </section>

      <section className="card-muted space-y-3">
        <p className="text-sm font-semibold">Legal Safety Policy</p>
        <p className="text-xs text-ink/60">
          This app provides general information only and never replaces legal
          counsel.
        </p>
        <Link href="/legal-safety" className="btn-primary">
          View Policy
        </Link>
      </section>

      <section className="card space-y-3">
        <p className="text-sm font-semibold">Account</p>
        <p className="text-xs text-ink/60">{session.user.email}</p>
        <SignOutButton />
        <button className="btn-secondary text-rust">Delete account</button>
      </section>
    </div>
  );
}
