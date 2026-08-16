import SiteNav from "@/components/SiteNav";
import TwinChat from "@/components/twin/TwinChat";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ask Pushpender — Public AI Twin",
  description:
    "Ask questions about Pushpender Singh’s public profile: experience, projects, stack, and how to get in touch.",
};

export default function AskPage() {
  return (
    <div className="portfolio-theme flex h-svh flex-col overflow-hidden">
      <SiteNav className="shrink-0" />
      <header className="shrink-0 border-b border-grid px-4 py-4">
        <div className="mx-auto max-w-2xl">
          <p className="atlas-label">Public AI twin</p>
          <h1 className="font-display mt-1 text-2xl font-bold tracking-tight text-ink uppercase">
            Ask Pushpender
          </h1>
        </div>
      </header>
      <TwinChat />
    </div>
  );
}
