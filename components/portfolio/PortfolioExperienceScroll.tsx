"use client";

import { EXPERIENCE, type Experience } from "@/lib/portfolioData";
import { bindScrollProgress, prefersReducedMotion } from "@/lib/scrollProgress";
import { useEffect, useRef, useState } from "react";

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

  return (
    <section
      ref={sectionRef}
      className="relative h-[220vh] w-full"
      aria-label={`Chapter ${index + 1}: ${job.role} at ${job.company}`}
    >
      <div className="sticky top-0 flex min-h-svh items-center px-6 py-20">
        <div className="mx-auto flex w-full max-w-2xl items-start gap-6">
          <div className="relative shrink-0">
            <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden>
              <circle
                cx="22"
                cy="22"
                r="18"
                fill="none"
                stroke="#27272a"
                strokeWidth="3"
              />
              <circle
                ref={ringRef}
                cx="22"
                cy="22"
                r="18"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="3"
                strokeLinecap="round"
                transform="rotate(-90 22 22)"
                style={{ strokeDashoffset: 113 }}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center font-mono text-xs text-sky-400">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <div className="min-w-0 flex-1">
            {index === 0 && (
              <p className="mb-3 text-xs tracking-[0.2em] text-zinc-500 uppercase">
                Career journey
              </p>
            )}
            <p className="text-xs font-medium text-sky-400">{job.period}</p>
            <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              {job.role}
            </h2>
            <p className="mt-1 text-sm text-zinc-400">
              {job.company} · {job.location}
            </p>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-zinc-500">
              {job.highlights.slice(0, 4).map((h) => (
                <li key={h} className="flex gap-2">
                  <span className="text-sky-500/60">→</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              {job.tech.slice(0, 6).map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-zinc-700 px-2.5 py-0.5 text-[10px] text-zinc-400"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-6 h-0.5 overflow-hidden rounded-full bg-zinc-800">
              <div
                ref={barRef}
                className="h-full origin-left rounded-full bg-sky-400 will-change-transform"
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
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(prefersReducedMotion());
  }, []);

  if (reducedMotion) {
    return (
      <section className="px-6 py-24" aria-label="Career journey">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold text-white">Career journey</h2>
          <div className="mt-10 space-y-8">
            {EXPERIENCE.map((job, i) => (
              <article
                key={job.id}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6"
              >
                <p className="text-xs text-sky-400">
                  Chapter {String(i + 1).padStart(2, "0")} · {job.period}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-white">{job.role}</h3>
                <p className="text-zinc-400">
                  {job.company} · {job.location}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-zinc-500">
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
    <div aria-label="Career journey — chapter reading progress">
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
