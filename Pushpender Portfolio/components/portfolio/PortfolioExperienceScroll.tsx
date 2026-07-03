"use client";

import { EXPERIENCE } from "@/lib/portfolioData";
import {
  bindScrollProgress,
  mapRange,
  prefersReducedMotion,
} from "@/lib/scrollProgress";
import { useEffect, useRef, useState } from "react";

const ACCENT = "#38bdf8";

type StoryElements = {
  heading: HTMLElement;
  cards: HTMLElement[];
  progressFill: HTMLElement;
  stepLabels: HTMLElement[];
};

function queryStoryElements(stage: HTMLElement): StoryElements | null {
  const heading = stage.querySelector<HTMLElement>('[data-exp-part="heading"]');
  const cards = Array.from(
    stage.querySelectorAll<HTMLElement>('[data-exp-part="card"]'),
  );
  const progressFill = stage.querySelector<HTMLElement>(
    '[data-exp-part="progress-fill"]',
  );
  const stepLabels = Array.from(
    stage.querySelectorAll<HTMLElement>('[data-exp-part="step-label"]'),
  );

  if (!heading || cards.length === 0 || !progressFill || stepLabels.length === 0) {
    return null;
  }

  return { heading, cards, progressFill, stepLabels };
}

function applyExperienceStyles(elements: StoryElements, progress: number) {
  const count = elements.cards.length;
  const segmentSize = 1 / count;

  elements.heading.style.opacity = String(mapRange(progress, [0, 0.08], [1, 0.4]));
  elements.progressFill.style.transform = `scaleX(${progress})`;

  elements.cards.forEach((card, index) => {
    const segmentStart = index * segmentSize;
    const segmentEnd = (index + 1) * segmentSize;
    const localProgress = mapRange(
      progress,
      [segmentStart, segmentEnd],
      [0, 1],
    );

    const y = mapRange(localProgress, [0, 0.25, 0.75, 1], [80, 0, 0, -60]);
    const scale = mapRange(localProgress, [0, 0.2, 0.8, 1], [0.88, 1, 1, 0.92]);
    const opacity = mapRange(
      localProgress,
      [0, 0.15, 0.85, 1],
      [0, 1, 1, 0.3],
    );
    const rotate = mapRange(localProgress, [0, 0.5, 1], [-4, 0, 4]);

    card.style.opacity = String(opacity);
    card.style.transform = `translate3d(0, ${y}px, 0) scale(${scale}) rotate(${rotate}deg)`;
  });

  elements.stepLabels.forEach((label, index) => {
    const segmentStart = index * segmentSize;
    const segmentMid = segmentStart + segmentSize * 0.5;
    const active = progress >= segmentStart && progress < segmentStart + segmentSize;
    const passed = progress >= segmentStart + segmentSize;

    label.style.opacity = String(active ? 1 : passed ? 0.5 : 0.35);
    label.style.color = active ? ACCENT : passed ? "#71717a" : "#52525b";
    label.style.transform = active ? "scale(1.05)" : "scale(1)";
  });
}

export default function PortfolioExperienceScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(prefersReducedMotion());
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    let cleanup: (() => void) | undefined;
    let retryFrame = 0;

    const setup = () => {
      const section = sectionRef.current;
      const stage = stageRef.current;
      if (!section || !stage) {
        retryFrame = requestAnimationFrame(setup);
        return;
      }

      const elements = queryStoryElements(stage);
      if (!elements) {
        retryFrame = requestAnimationFrame(setup);
        return;
      }

      cleanup = bindScrollProgress(section, (progress) => {
        applyExperienceStyles(elements, progress);
      });
    };

    setup();

    return () => {
      cancelAnimationFrame(retryFrame);
      cleanup?.();
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <section className="px-6 py-24" aria-label="Work experience">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold text-white">Experience</h2>
          <div className="mt-10 space-y-8">
            {EXPERIENCE.map((job) => (
              <article
                key={job.id}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6"
              >
                <p className="text-xs text-sky-400">{job.period}</p>
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
    <section
      ref={sectionRef}
      className="relative h-[420vh] w-full"
      aria-label="Scroll-driven experience timeline"
    >
      <div className="sticky top-0 flex h-svh flex-col items-center justify-center px-6">
        <div ref={stageRef} className="relative w-full max-w-2xl">
          <div data-exp-part="heading" className="mb-8 text-center">
            <p className="text-xs tracking-[0.3em] text-sky-400/80 uppercase">
              Animation · Scroll story
            </p>
            <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
              Career journey
            </h2>
          </div>

          <div className="mb-6 flex justify-between gap-2 px-1">
            {EXPERIENCE.map((job, i) => (
              <span
                key={job.id}
                data-exp-part="step-label"
                className="text-[10px] font-medium tracking-wide uppercase transition-colors will-change-transform sm:text-xs"
                style={{ color: "#52525b", opacity: 0.35 }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            ))}
          </div>

          <div className="mb-8 h-0.5 overflow-hidden rounded-full bg-zinc-800">
            <div
              data-exp-part="progress-fill"
              className="h-full origin-left rounded-full bg-sky-400 will-change-transform"
              style={{ transform: "scaleX(0)" }}
            />
          </div>

          <div className="relative h-[min(50vh,380px)]">
            {EXPERIENCE.map((job) => (
              <article
                key={job.id}
                data-exp-part="card"
                className="absolute inset-x-0 top-0 rounded-2xl border border-zinc-700/60 bg-zinc-900/80 p-6 shadow-xl backdrop-blur-sm will-change-transform"
                style={{ opacity: 0, transform: "translate3d(0, 80px, 0) scale(0.88)" }}
              >
                <p className="text-xs font-medium text-sky-400">{job.period}</p>
                <h3 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
                  {job.role}
                </h3>
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
                  {job.tech.slice(0, 5).map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-zinc-700 px-2.5 py-0.5 text-[10px] text-zinc-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
