import { EFFECT_ROUTES } from "@/lib/effectsData";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scroll Effects — Showcase",
  description:
    "Interactive gallery of scroll-driven animations: scrollytelling, timelines, parallax, and more.",
};

export default function EffectsHubPage() {
  return (
    <div className="portfolio-theme min-h-svh bg-[#0a0e14] text-zinc-100">
      <nav className="fixed top-4 right-4 z-50 flex gap-2">
        <Link
          href="/demo"
          className="rounded-full border border-zinc-700 bg-zinc-900/90 px-4 py-2 text-sm font-medium text-zinc-300 backdrop-blur-sm transition-colors hover:border-sky-400/50 hover:text-sky-300"
        >
          TMTC demo
        </Link>
        <Link
          href="/"
          className="rounded-full border border-zinc-700 bg-zinc-900/90 px-4 py-2 text-sm font-medium text-zinc-300 backdrop-blur-sm transition-colors hover:border-sky-400/50 hover:text-sky-300"
        >
          Portfolio
        </Link>
      </nav>

      <header className="flex min-h-[50svh] flex-col items-center justify-center px-6 pt-16 text-center">
        <p className="text-xs tracking-[0.3em] text-sky-400/80 uppercase">
          Animation library
        </p>
        <h1 className="mt-4 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
          Scroll effects showcase
        </h1>
        <p className="mt-6 max-w-lg text-lg text-zinc-500">
          Twenty-six scroll-driven patterns — each on its own route with reduced-motion
          fallbacks.
        </p>
      </header>

      <div className="mx-auto grid max-w-4xl gap-4 px-6 pb-24 sm:grid-cols-2">
        {EFFECT_ROUTES.map((effect) => (
          <Link
            key={effect.slug}
            href={`/effects/${effect.slug}`}
            className="group rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 transition-colors hover:border-sky-500/40 hover:bg-zinc-900/70"
          >
            <span className="text-[10px] font-medium tracking-[0.2em] text-sky-400/70 uppercase">
              {effect.tag}
            </span>
            <h2 className="mt-2 text-lg font-semibold text-white group-hover:text-sky-300">
              {effect.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500">
              {effect.description}
            </p>
            <span className="mt-4 inline-block text-sm text-sky-400/80 group-hover:text-sky-300">
              View demo →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
