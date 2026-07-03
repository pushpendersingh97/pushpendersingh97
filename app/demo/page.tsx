import ProviderFanStack from "@/components/ProviderFanStack";
import ScrollFramerEffects from "@/components/ScrollFramerEffects";
import ScrollLinkedParallax from "@/components/ScrollLinkedParallax";
import ScrollUnlockStory from "@/components/ScrollUnlockStory";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TMTC Demo — Scroll Animations",
  description: "Interactive scroll animation demo with provider fan stack and linked motion effects.",
};

export default function DemoPage() {
  return (
    <div className="bg-white font-sans text-zinc-900">
      <nav className="fixed top-4 right-4 z-50 flex gap-2">
        <Link
          href="/effects"
          className="rounded-full border border-zinc-200 bg-white/90 px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm backdrop-blur-sm transition-colors hover:border-sky-300 hover:text-sky-600"
        >
          Scroll effects
        </Link>
        <Link
          href="/"
          className="rounded-full border border-zinc-200 bg-white/90 px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm backdrop-blur-sm transition-colors hover:border-sky-300 hover:text-sky-600"
        >
          Portfolio
        </Link>
      </nav>

      <section className="flex min-h-svh flex-col items-center justify-center px-6 py-24 text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
          Scroll to explore
        </p>
        <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Meet your care team, fully online
        </h1>
        <p className="mt-6 max-w-lg text-lg text-zinc-500">
          Three providers fan out as you arrive — then collapse into one focused
          view as you scroll.
        </p>
      </section>

      <ProviderFanStack />

      <ScrollFramerEffects />

      <ScrollLinkedParallax />

      <ScrollUnlockStory />

      <section className="flex min-h-svh flex-col items-center justify-center px-6 py-24 text-center">
        <h2 className="text-3xl font-semibold tracking-tight">
          Care that fits your schedule
        </h2>
        <p className="mt-4 max-w-md text-lg text-zinc-500">
          Book appointments, message your provider, and manage your health — all
          from one place.
        </p>
      </section>
    </div>
  );
}
