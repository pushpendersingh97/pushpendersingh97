"use client";

import { PROFILE } from "@/lib/portfolioData";
import { motion, useReducedMotion } from "framer-motion";

const ACCENT = "#38bdf8";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function PortfolioHero() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 py-24">
      <div className="portfolio-grid-bg pointer-events-none absolute inset-0 opacity-40" aria-hidden />

      {!reducedMotion && (
        <>
          <motion.div
            className="pointer-events-none absolute top-[15%] left-[10%] h-64 w-64 rounded-full blur-3xl"
            style={{ backgroundColor: `${ACCENT}22` }}
            animate={{ y: [0, -24, 0], x: [0, 12, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          />
          <motion.div
            className="pointer-events-none absolute right-[8%] bottom-[20%] h-48 w-48 rounded-full blur-3xl"
            style={{ backgroundColor: "#c5ff3b18" }}
            animate={{ y: [0, 20, 0], x: [0, -16, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          />
        </>
      )}

      <motion.div
        className="relative z-10 mx-auto max-w-4xl text-center"
        variants={reducedMotion ? undefined : container}
        initial={reducedMotion ? false : "hidden"}
        animate="show"
      >
        <motion.p
          variants={reducedMotion ? undefined : item}
          className="text-xs font-medium tracking-[0.35em] text-sky-400 uppercase"
        >
          Portfolio · Full Stack
        </motion.p>

        <motion.h1
          variants={reducedMotion ? undefined : item}
          className="portfolio-gradient-text mt-6 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl"
        >
          {PROFILE.name}
        </motion.h1>

        <motion.p
          variants={reducedMotion ? undefined : item}
          className="mt-4 text-xl font-medium text-zinc-300 sm:text-2xl"
        >
          {PROFILE.title}
        </motion.p>

        <motion.p
          variants={reducedMotion ? undefined : item}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-500 sm:text-lg"
        >
          {PROFILE.tagline}
        </motion.p>

        <motion.div
          variants={reducedMotion ? undefined : item}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="portfolio-btn group"
          >
            <span className="portfolio-btn-shine" aria-hidden />
            GitHub
          </a>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-zinc-700 px-6 py-3 text-sm font-medium text-zinc-300 transition-colors hover:border-sky-500/50 hover:text-sky-300"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${PROFILE.email}`}
            className="rounded-full border border-zinc-700 px-6 py-3 text-sm font-medium text-zinc-300 transition-colors hover:border-sky-500/50 hover:text-sky-300"
          >
            Email
          </a>
        </motion.div>

        <motion.div
          variants={reducedMotion ? undefined : item}
          className="mt-16 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] tracking-[0.25em] text-zinc-600 uppercase">
            Scroll to explore
          </span>
          {!reducedMotion && (
            <motion.span
              className="block h-8 w-px bg-linear-to-b from-sky-400/80 to-transparent"
              animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden
            />
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
