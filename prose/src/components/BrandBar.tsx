import Link from "next/link";

export default function BrandBar() {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-full bg-ink text-parchment font-display text-lg shadow-sm">
          P
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-teal">
            ProSe
          </p>
          <p className="text-sm text-ink/70">Washington • Pierce County</p>
        </div>
      </div>
      <div className="hidden items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-ink/60 lg:flex">
        <Link href="/" className="hover:text-ink">
          Home
        </Link>
        <Link href="/kb" className="hover:text-ink">
          KB
        </Link>
        <Link href="/drafts" className="hover:text-ink">
          Drafts
        </Link>
        <Link href="/setup" className="hover:text-ink">
          Setup
        </Link>
        <Link href="/timeline" className="hover:text-ink">
          Timeline
        </Link>
        <Link href="/learn" className="hover:text-ink">
          Learn
        </Link>
      </div>
      <Link
        href="/settings"
        className="rounded-full border border-ink/10 bg-parchment/80 px-3 py-1 text-xs font-medium text-ink/70 shadow-sm transition hover:border-ink/20 hover:text-ink"
      >
        Settings
      </Link>
    </div>
  );
}
