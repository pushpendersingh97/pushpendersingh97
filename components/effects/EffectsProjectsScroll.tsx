"use client";

import { FEATURED_PROJECTS } from "@/lib/effectsData";
import {
  bindScrollProgress,
  mapRange,
  prefersReducedMotion,
} from "@/lib/scrollProgress";
import { useEffect, useRef, useState } from "react";

const ACCENT = "#38bdf8";

type ProjectElements = {
  heading: HTMLElement;
  mockup: HTMLElement;
  cards: HTMLElement[];
  counter: HTMLElement;
  progressFill: HTMLElement;
};

function queryElements(stage: HTMLElement): ProjectElements | null {
  const heading = stage.querySelector<HTMLElement>('[data-proj-part="heading"]');
  const mockup = stage.querySelector<HTMLElement>('[data-proj-part="mockup"]');
  const cards = Array.from(
    stage.querySelectorAll<HTMLElement>('[data-proj-part="card"]'),
  );
  const counter = stage.querySelector<HTMLElement>('[data-proj-part="counter"]');
  const progressFill = stage.querySelector<HTMLElement>(
    '[data-proj-part="progress-fill"]',
  );

  if (!heading || !mockup || cards.length === 0 || !counter || !progressFill) {
    return null;
  }

  return { heading, mockup, cards, counter, progressFill };
}

function applyProjectStyles(elements: ProjectElements, progress: number) {
  const count = elements.cards.length;
  const segmentSize = 1 / count;

  elements.heading.style.opacity = String(mapRange(progress, [0, 0.1], [1, 0.45]));
  elements.progressFill.style.transform = `scaleX(${progress})`;

  const activeIndex = Math.min(
    count - 1,
    Math.floor(progress * count + 0.001),
  );
  elements.counter.textContent = `${String(activeIndex + 1).padStart(2, "0")} / ${String(count).padStart(2, "0")}`;

  elements.mockup.style.transform = `translateY(${mapRange(progress, [0, 1], [24, -24])}px) rotate(${mapRange(progress, [0, 1], [-2, 2])}deg)`;

  elements.cards.forEach((card, index) => {
    const segmentStart = index * segmentSize;
    const local = mapRange(progress, [segmentStart, segmentStart + segmentSize], [0, 1]);

    const y = mapRange(local, [0, 0.2, 0.8, 1], [100, 0, 0, -80]);
    const scale = mapRange(local, [0, 0.15, 0.85, 1], [0.9, 1, 1, 0.94]);
    const opacity = mapRange(local, [0, 0.12, 0.88, 1], [0, 1, 1, 0.25]);
    const x = mapRange(local, [0, 0.5, 1], [index % 2 === 0 ? -20 : 20, 0, 0]);

    card.style.opacity = String(opacity);
    card.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
  });
}

export default function EffectsProjectsScroll() {
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

      const elements = queryElements(stage);
      if (!elements) {
        retryFrame = requestAnimationFrame(setup);
        return;
      }

      cleanup = bindScrollProgress(section, (progress) => {
        applyProjectStyles(elements, progress);
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
      <section className="px-6 py-24" aria-label="Featured projects">
        <div className="mx-auto max-w-2xl space-y-8">
          {FEATURED_PROJECTS.map((project) => (
            <article
              key={project.id}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6"
            >
              <p className="text-xs text-sky-400">{project.period}</p>
              <h2 className="mt-2 text-xl font-semibold text-white">{project.title}</h2>
              <p className="text-sm text-zinc-500">{project.subtitle}</p>
              <p className="mt-3 text-sm text-zinc-400">{project.summary}</p>
            </article>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-[420vh] w-full"
      aria-label="Scroll-driven featured projects"
    >
      <div className="sticky top-0 flex h-svh items-center justify-center px-6">
        <div ref={stageRef} className="grid w-full max-w-5xl gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div data-proj-part="heading">
            <p
              data-proj-part="counter"
              className="font-mono text-sm text-sky-400"
            >
              01 / 04
            </p>
            <div className="mb-4 h-0.5 overflow-hidden rounded-full bg-zinc-800">
              <div
                data-proj-part="progress-fill"
                className="h-full origin-left rounded-full bg-sky-400 will-change-transform"
                style={{ transform: "scaleX(0)" }}
              />
            </div>
            <div
              data-proj-part="mockup"
              className="relative aspect-4/3 overflow-hidden rounded-2xl border border-zinc-700/60 bg-zinc-900 will-change-transform"
            >
              <div className="absolute inset-0 bg-linear-to-br from-zinc-800 to-zinc-950" />
              <div className="absolute inset-4 rounded-xl border border-dashed border-zinc-700/80" />
              <p className="absolute bottom-4 left-4 text-xs text-zinc-500">
                Project preview
              </p>
            </div>
          </div>

          <div className="relative h-[min(52vh,420px)]">
            {FEATURED_PROJECTS.map((project) => (
              <article
                key={project.id}
                data-proj-part="card"
                className="absolute inset-0 rounded-2xl border border-zinc-700/60 bg-zinc-900/90 p-6 shadow-xl backdrop-blur-sm will-change-transform"
                style={{ opacity: 0, transform: "translate3d(0, 100px, 0) scale(0.9)" }}
              >
                <p className="text-xs font-medium" style={{ color: project.accent }}>
                  {project.period}
                </p>
                <h2 className="mt-2 text-2xl font-bold text-white">{project.title}</h2>
                <p className="text-sm text-zinc-500">{project.subtitle}</p>
                <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                  {project.summary}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-zinc-500">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex gap-2">
                      <span style={{ color: ACCENT }}>→</span>
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
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
