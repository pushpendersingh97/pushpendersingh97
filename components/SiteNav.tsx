"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Portfolio" },
  { href: "/ask", label: "Ask" },
  { href: "/convert", label: "Convert" },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function SiteNav({
  className = "",
  variant = "paper",
}: {
  className?: string;
  variant?: "paper" | "floating";
}) {
  const pathname = usePathname();

  const shell =
    variant === "floating"
      ? "rounded-sm border border-grid bg-paper/95 px-2 py-1.5 shadow-sm backdrop-blur-sm"
      : "border-b border-grid bg-paper/90 backdrop-blur-sm";

  return (
    <nav
      className={`${shell} ${className}`}
      aria-label="Site"
    >
      <ul
        className={
          variant === "floating"
            ? "flex flex-wrap items-center gap-0.5"
            : "mx-auto flex max-w-6xl flex-wrap items-center gap-1 px-4 py-3 sm:px-6"
        }
      >
        {LINKS.map((link) => {
          const active = isActive(pathname, link.href);
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`inline-block rounded-sm px-3 py-1.5 font-mono text-[11px] font-medium tracking-[0.14em] uppercase transition-colors ${
                  active
                    ? "bg-ink text-paper"
                    : "text-muted hover:bg-grid/60 hover:text-ink"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
