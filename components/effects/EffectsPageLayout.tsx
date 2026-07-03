import Link from "next/link";
import type { ReactNode } from "react";

type EffectsPageLayoutProps = {
  title: string;
  description: string;
  tag?: string;
  children: ReactNode;
};

export default function EffectsPageLayout({
  title,
  description,
  tag,
  children,
}: EffectsPageLayoutProps) {
  return (
    <div className="portfolio-theme min-h-svh bg-[#0a0e14] text-zinc-100">
      <nav className="fixed top-4 right-4 z-50 flex gap-2">
        <Link
          href="/effects"
          className="rounded-full border border-zinc-700 bg-zinc-900/90 px-4 py-2 text-sm font-medium text-zinc-300 shadow-sm backdrop-blur-sm transition-colors hover:border-sky-400/50 hover:text-sky-300"
        >
          All effects
        </Link>
        <Link
          href="/"
          className="rounded-full border border-zinc-700 bg-zinc-900/90 px-4 py-2 text-sm font-medium text-zinc-300 shadow-sm backdrop-blur-sm transition-colors hover:border-sky-400/50 hover:text-sky-300"
        >
          Portfolio
        </Link>
      </nav>

      <header className="flex min-h-[40svh] flex-col items-center justify-center px-6 pt-16 text-center">
        {tag ? (
          <p className="text-xs tracking-[0.3em] text-sky-400/80 uppercase">
            Scroll effect · {tag}
          </p>
        ) : null}
        <h1 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h1>
        <p className="mt-4 max-w-lg text-base text-zinc-500">{description}</p>
        <p className="mt-6 text-sm text-zinc-600">Scroll down to see the animation</p>
      </header>

      {children}
    </div>
  );
}
