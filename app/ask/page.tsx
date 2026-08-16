import TwinChat from "@/components/twin/TwinChat";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ask Pushpender — Public AI Twin",
  description:
    "Ask questions about Pushpender Singh’s public profile: experience, projects, stack, and how to get in touch.",
};

export default function AskPage() {
  return (
    <div className="portfolio-theme flex h-svh flex-col overflow-hidden">
      <header className="portfolio-gutter shrink-0 border-b border-grid py-4">
        <div className="portfolio-column">
          <Link
            href="/"
            className="font-mono text-[11px] font-medium tracking-[0.14em] text-muted uppercase transition-colors hover:text-ink"
          >
            ← Portfolio
          </Link>
          <p className="atlas-label mt-3">Public AI twin</p>
          <h1 className="font-display mt-1 text-2xl font-bold tracking-tight text-ink uppercase">
            Ask Pushpender
          </h1>
        </div>
      </header>
      <TwinChat />
    </div>
  );
}
