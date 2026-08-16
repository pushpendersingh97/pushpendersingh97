"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Portfolio" },
  { href: "/ask", label: "Ask" },
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
      className={`${shell} ${variant === "paper" ? "portfolio-gutter" : ""} ${className}`}
      aria-label="Site"
    >
      <ul
        className={
          variant === "floating"
            ? "flex flex-wrap items-center gap-0.5"
            : "portfolio-column flex flex-wrap items-center gap-1 py-3"
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
