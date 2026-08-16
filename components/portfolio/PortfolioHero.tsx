"use client";

import { FRONTEND_SKILLS, PROFILE } from "@/lib/portfolioData";
import { swatchColor } from "@/lib/swatchColor";
import { useTwinChat } from "@/components/twin/TwinChatWidget";
import { motion, useReducedMotion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function PortfolioHero() {
  const reducedMotion = useReducedMotion();
  const { open } = useTwinChat();

  return (
    <section
      id="hero"
      className="portfolio-gutter relative flex min-h-svh flex-col justify-center overflow-hidden py-20"
    >
      <div className="portfolio-grid-bg pointer-events-none absolute inset-0" aria-hidden />

      <motion.div
        className="portfolio-column relative z-10"
        variants={reducedMotion ? undefined : container}
        initial={reducedMotion ? false : "hidden"}
        animate="show"
      >
        <motion.p variants={reducedMotion ? undefined : item} className="atlas-label">
          Portfolio · Full Stack Engineer
        </motion.p>

        <motion.h1
          variants={reducedMotion ? undefined : item}
          className="font-display mt-5 text-5xl font-bold tracking-tight text-ink uppercase sm:text-6xl md:text-7xl lg:text-8xl"
        >
          {PROFILE.name}
        </motion.h1>

        <motion.div
          variants={reducedMotion ? undefined : item}
          className="mt-6 flex items-center gap-3"
        >
          <span className="inline-block h-px w-10 bg-stamp" aria-hidden />
          <p className="font-mono text-sm font-medium tracking-wide text-route sm:text-base">
            {PROFILE.title}
          </p>
        </motion.div>

        <motion.p
          variants={reducedMotion ? undefined : item}
          className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
        >
          {PROFILE.tagline}
        </motion.p>

        <motion.div variants={reducedMotion ? undefined : item}>
          <a
            href="#skills"
            className="mt-8 flex w-fit items-center gap-1.5"
            aria-label="Browse the colorway"
          >
            {FRONTEND_SKILLS.slice(0, 10).map((skill) => (
              <span
                key={skill.id}
                className="h-2.5 w-5 border border-ink/10"
                style={{ backgroundColor: swatchColor(skill.color) }}
                title={skill.label}
              />
            ))}
          </a>
        </motion.div>

        <motion.div
          variants={reducedMotion ? undefined : item}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <button type="button" onClick={open} className="portfolio-btn">
            Ask the twin
          </button>
          <a href={`mailto:${PROFILE.email}`} className="portfolio-btn-outline">
            Email
          </a>
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="portfolio-btn-outline"
          >
            GitHub
          </a>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="portfolio-btn-outline"
          >
            LinkedIn
          </a>
        </motion.div>

        <motion.div
          variants={reducedMotion ? undefined : item}
          className="mt-16 flex items-center gap-3"
        >
          <span className="font-mono text-[10px] tracking-[0.25em] text-muted uppercase">
            Continue
          </span>
          <span className="hero-pulse block h-8 w-px origin-top bg-route" aria-hidden />
        </motion.div>
      </motion.div>
    </section>
  );
}
