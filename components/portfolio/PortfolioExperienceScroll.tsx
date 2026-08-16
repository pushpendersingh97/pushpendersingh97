"use client";

import { EXPERIENCE, type Experience } from "@/lib/portfolioData";
import { bindScrollProgress } from "@/lib/scrollProgress";
import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

function ExperienceChapter({
  job,
  index,
  reducedMotion,
}: {
  job: Experience;
  index: number;
  reducedMotion: boolean;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion) return;
    const section = sectionRef.current;
    const ring = ringRef.current;
    const bar = barRef.current;
    if (!section || !ring || !bar) return;

    const circumference = 2 * Math.PI * 18;
    ring.style.strokeDasharray = String(circumference);

    return bindScrollProgress(section, (progress) => {
      ring.style.strokeDashoffset = String(circumference * (1 - progress));
      bar.style.transform = `scaleX(${progress})`;
    });
  }, [reducedMotion]);

  const isNow = index === 0;

  return (
    <section
      ref={sectionRef}
      className="relative h-[220vh] w-full"
      aria-label={`${job.role} at ${job.company}`}
    >
      <div className="sticky top-0 flex min-h-svh items-center px-6 py-20 lg:pl-20">
        <div className="atlas-ticket mx-auto flex w-full max-w-2xl items-start gap-6 p-6 sm:p-8">
          <div className="relative shrink-0">
            <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden>
              <circle
                cx="22"
                cy="22"
                r="18"
                fill="none"
                stroke="var(--atlas-grid)"
                strokeWidth="3"
              />
              <circle
                ref={ringRef}
                cx="22"
                cy="22"
                r="18"
                fill="none"
                stroke={isNow ? "var(--atlas-stamp)" : "var(--atlas-route)"}
                strokeWidth="3"
                strokeLinecap="round"
                transform="rotate(-90 22 22)"
                style={{ strokeDashoffset: 113 }}
              />
            </svg>
            <span
              className={`absolute inset-0 flex items-center justify-center font-mono text-xs ${
                isNow ? "text-stamp" : "text-route"
              }`}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <div className="min-w-0 flex-1">
            {index === 0 && <p className="atlas-label mb-3">Experience</p>}
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-mono text-xs font-medium text-route">{job.period}</p>
              {isNow ? (
                <span className="rounded-sm bg-stamp px-1.5 py-0.5 font-mono text-[9px] font-semibold tracking-wider text-white uppercase">
                  Now
                </span>
              ) : null}
            </div>
            <h2 className="font-display mt-2 text-2xl font-bold tracking-tight text-ink uppercase sm:text-3xl">
              {job.role}
            </h2>
            <p className="mt-1 text-sm text-muted">
              {job.company} · {job.location}
            </p>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-ink/70">
              {job.highlights.slice(0, 4).map((h) => (
                <li key={h} className="flex gap-2">
                  <span className="text-route">→</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              {job.tech.slice(0, 6).map((t) => (
                <span
                  key={t}
                  className="border border-grid px-2.5 py-0.5 font-mono text-[10px] text-muted"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-6 h-0.5 overflow-hidden bg-grid">
              <div
                ref={barRef}
                className={`h-full origin-left will-change-transform ${
                  isNow ? "bg-stamp" : "bg-route"
                }`}
                style={{ transform: "scaleX(0)" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function PortfolioExperienceScroll() {
  const reducedMotion = useReducedMotion() ?? false;

  if (reducedMotion) {
    return (
      <section id="work" className="px-6 py-24 lg:pl-20" aria-label="Experience">
        <div className="mx-auto max-w-2xl">
          <p className="atlas-label">Experience</p>
          <h2 className="font-display mt-3 text-3xl font-bold text-ink uppercase">
            Career
          </h2>
          <div className="mt-10 space-y-6">
            {EXPERIENCE.map((job, i) => (
              <article key={job.id} className="atlas-ticket p-6">
                <p className="font-mono text-xs text-route">
                  {String(i + 1).padStart(2, "0")} · {job.period}
                </p>
                <h3 className="font-display mt-2 text-xl font-semibold text-ink uppercase">
                  {job.role}
                </h3>
                <p className="text-muted">
                  {job.company} · {job.location}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-ink/70">
                  {job.highlights.slice(0, 3).map((h) => (
                    <li key={h}>• {h}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <div id="work" aria-label="Experience — scroll chapters">
      {EXPERIENCE.map((job, index) => (
        <ExperienceChapter
          key={job.id}
          job={job}
          index={index}
          reducedMotion={reducedMotion}
        />
      ))}
    </div>
  );
}
