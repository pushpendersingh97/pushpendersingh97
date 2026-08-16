import TwinChat from "@/components/twin/TwinChat";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ask Pushpender — Public AI Twin",
  description:
    "Ask questions about Pushpender Singh’s public profile: experience, projects, stack, and how to get in touch.",
};

export default function AskPage() {
  return (
    <div className="portfolio-theme flex h-svh flex-col overflow-hidden bg-[#0a0e14] text-zinc-100">
      <header className="shrink-0 border-b border-zinc-800 px-4 py-4">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-4">
          <div>
            <p className="text-[10px] tracking-[0.3em] text-sky-400 uppercase">
              Public AI twin
            </p>
            <h1 className="mt-1 text-lg font-semibold tracking-tight">Ask Pushpender</h1>
          </div>
          <Link
            href="/"
            className="rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-sky-500/50 hover:text-sky-300"
          >
            Portfolio
          </Link>
        </div>
      </header>

      <TwinChat />
    </div>
  );
}
