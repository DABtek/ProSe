type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  actionLabel?: string;
  actionHref?: string;
};

export default function PageHeader({
  eyebrow,
  title,
  subtitle,
  actionLabel,
  actionHref,
}: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        {eyebrow ? (
          <p className="text-[11px] uppercase tracking-[0.3em] text-teal">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-2 font-display text-2xl text-ink">{title}</h1>
        {subtitle ? (
          <p className="mt-2 text-sm text-ink/70">{subtitle}</p>
        ) : null}
      </div>
      {actionLabel && actionHref ? (
        <a
          href={actionHref}
          className="mt-1 rounded-full border border-ink/15 bg-parchment/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-ink/70 shadow-sm transition hover:border-ink/30 hover:text-ink"
        >
          {actionLabel}
        </a>
      ) : null}
    </div>
  );
}
