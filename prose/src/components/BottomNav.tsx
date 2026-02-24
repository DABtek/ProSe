"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  {
    href: "/",
    label: "Home",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <path
          d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    href: "/kb",
    label: "KB",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <path
          d="M6 4h9a3 3 0 0 1 3 3v12a1 1 0 0 1-1 1H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 3v11h10V7H6Zm9 12h2V7a1 1 0 0 0-1-1h-1v13Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    href: "/drafts",
    label: "Drafts",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <path
          d="M5 4h9l5 5v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm8 1v4h4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M8 13h8M8 16h8M8 10h4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    href: "/timeline",
    label: "Timeline",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <path
          d="M7 4v4M17 4v4M4 9h16M5 12h5M5 15h8M5 18h4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <rect
          x="4"
          y="6"
          width="16"
          height="14"
          rx="2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
        />
      </svg>
    ),
  },
  {
    href: "/learn",
    label: "Learn",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <path
          d="M4 7.5 12 4l8 3.5-8 3.5-8-3.5Z"
          fill="currentColor"
        />
        <path
          d="M6 11v5.5C6 18.4 9 20 12 20s6-1.6 6-3.5V11"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
    ),
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-ink/10 bg-parchment/90 backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-md items-center justify-between px-6 py-3">
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 text-[10px] font-medium tracking-[0.12em] uppercase transition ${
                isActive ? "text-ink" : "text-ink/50"
              }`}
            >
              <span
                className={`grid h-9 w-9 place-items-center rounded-full transition ${
                  isActive ? "bg-ink/10" : "bg-transparent"
                }`}
              >
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
