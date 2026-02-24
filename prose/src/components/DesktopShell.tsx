import Link from "next/link";

const navItems = [
  { href: "/", label: "Dashboard" },
  { href: "/kb", label: "My Documents" },
  { href: "/timeline", label: "Case Timeline" },
  { href: "/drafts", label: "Drafts" },
  { href: "/learn", label: "Learning" },
];

type DocumentItem = {
  title: string;
  status?: string;
};

type DesktopShellProps = {
  children: React.ReactNode;
  activeHref?: string;
  documents?: DocumentItem[];
  footer?: React.ReactNode;
};

export default function DesktopShell({
  children,
  activeHref,
  documents,
  footer,
}: DesktopShellProps) {
  return (
    <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-6">
      <aside className="hidden lg:block">
        <div className="rounded-3xl bg-ink px-4 py-5 text-parchment shadow-sm">
          <p className="text-[11px] uppercase tracking-[0.3em] text-gold">
            Navigation
          </p>
          <div className="mt-4 space-y-2 text-sm">
            {navItems.map((item) => {
              const isActive = item.href === activeHref;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between rounded-xl px-3 py-2 transition ${
                    isActive
                      ? "bg-gold/15 text-gold"
                      : "text-parchment/70 hover:text-parchment"
                  }`}
                >
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {documents?.length ? (
            <div className="mt-6">
              <p className="text-[11px] uppercase tracking-[0.3em] text-parchment/40">
                Documents
              </p>
              <div className="mt-3 space-y-2">
                {documents.map((doc) => (
                  <div
                    key={doc.title}
                    className="rounded-xl border border-gold/20 bg-parchment/5 px-3 py-2 text-xs text-parchment/80"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span>{doc.title}</span>
                      {doc.status ? (
                        <span className="rounded-full bg-gold/20 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-gold">
                          {doc.status}
                        </span>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {footer ? <div className="mt-6">{footer}</div> : null}
        </div>
      </aside>
      <div>{children}</div>
    </div>
  );
}
