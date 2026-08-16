"use client";

import { PROJECTS } from "@/lib/portfolioData";
import {
  bindScrollProgress,
  mapRange,
} from "@/lib/scrollProgress";
import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

type ProjectElements = {
  heading: HTMLElement;
  mockup: HTMLElement;
  mockupTitle: HTMLElement;
  mockupMeta: HTMLElement;
  cards: HTMLElement[];
  counter: HTMLElement;
  progressFill: HTMLElement;
};

function queryElements(stage: HTMLElement): ProjectElements | null {
  const heading = stage.querySelector<HTMLElement>('[data-proj-part="heading"]');
  const mockup = stage.querySelector<HTMLElement>('[data-proj-part="mockup"]');
  const mockupTitle = stage.querySelector<HTMLElement>(
    '[data-proj-part="mockup-title"]',
  );
  const mockupMeta = stage.querySelector<HTMLElement>(
    '[data-proj-part="mockup-meta"]',
  );
  const cards = Array.from(
    stage.querySelectorAll<HTMLElement>('[data-proj-part="card"]'),
  );
  const counter = stage.querySelector<HTMLElement>('[data-proj-part="counter"]');
  const progressFill = stage.querySelector<HTMLElement>(
    '[data-proj-part="progress-fill"]',
  );

  if (
    !heading ||
    !mockup ||
    !mockupTitle ||
    !mockupMeta ||
    cards.length === 0 ||
    !counter ||
    !progressFill
  ) {
    return null;
  }

  return {
    heading,
    mockup,
    mockupTitle,
    mockupMeta,
    cards,
    counter,
    progressFill,
  };
}

function applyProjectStyles(elements: ProjectElements, progress: number) {
  const count = elements.cards.length;
  const segmentSize = 1 / count;

  elements.heading.style.opacity = String(mapRange(progress, [0, 0.08], [1, 0.5]));
  elements.progressFill.style.transform = `scaleX(${progress})`;

  const activeIndex = Math.min(count - 1, Math.floor(progress * count + 0.001));
  const project = PROJECTS[activeIndex];

  elements.counter.textContent = `${String(activeIndex + 1).padStart(2, "0")} / ${String(count).padStart(2, "0")}`;
  elements.mockupTitle.textContent = project.name;
  elements.mockupMeta.textContent = project.company ?? project.period;
  elements.mockup.style.borderTopColor = project.accent ?? "#1f6f8b";
  elements.mockup.style.transform = `translateY(${mapRange(progress, [0, 1], [20, -20])}px) rotate(${mapRange(progress, [0, 1], [-1.5, 1.5])}deg)`;

  elements.cards.forEach((card, index) => {
    const segmentStart = index * segmentSize;
    const local = mapRange(
      progress,
      [segmentStart, segmentStart + segmentSize],
      [0, 1],
    );

    const y = mapRange(local, [0, 0.2, 0.8, 1], [100, 0, 0, -80]);
    const scale = mapRange(local, [0, 0.15, 0.85, 1], [0.9, 1, 1, 0.94]);
    const opacity = mapRange(local, [0, 0.12, 0.88, 1], [0, 1, 1, 0.2]);
    const x = mapRange(local, [0, 0.5, 1], [index % 2 === 0 ? -16 : 16, 0, 0]);

    card.style.opacity = String(opacity);
    card.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
  });
}

export default function PortfolioProjectsScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion() ?? false;

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
      <section id="built" className="px-6 py-24 lg:pl-20" aria-label="Projects">
        <div className="mx-auto max-w-2xl">
          <p className="atlas-label">Projects</p>
          <h2 className="font-display mt-3 text-3xl font-bold text-ink uppercase">
            Built
          </h2>
          <div className="mt-10 space-y-6">
            {PROJECTS.map((project) => (
              <article
                key={project.id}
                className="atlas-ticket p-6"
                style={{
                  borderTopColor: project.accent ?? "#1f6f8b",
                  borderTopWidth: 3,
                }}
              >
                <p className="font-mono text-xs text-route">{project.period}</p>
                <h3 className="font-display mt-2 text-xl font-semibold text-ink uppercase">
                  {project.name}
                </h3>
                {project.company && (
                  <p className="text-sm text-muted">{project.company}</p>
                )}
                {project.description && (
                  <p className="mt-3 text-sm text-ink/70">{project.description}</p>
                )}
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block font-mono text-sm text-route hover:underline"
                  >
                    View on GitHub →
                  </a>
                )}
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
      id="built"
      className="relative h-[720vh] w-full"
      aria-label="Scroll-driven projects"
    >
      <div className="sticky top-0 flex h-svh items-center justify-center px-6 lg:pl-20">
        <div
          ref={stageRef}
          className="grid w-full max-w-5xl gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center"
        >
          <div data-proj-part="heading">
            <p className="atlas-label">Projects</p>
            <h2 className="font-display mt-3 mb-3 text-3xl font-bold text-ink uppercase sm:text-4xl">
              Built
            </h2>
            <p
              data-proj-part="counter"
              className="font-mono text-sm text-route"
            >
              01 / {String(PROJECTS.length).padStart(2, "0")}
            </p>
            <div className="mb-4 mt-3 h-0.5 overflow-hidden bg-grid">
              <div
                data-proj-part="progress-fill"
                className="h-full origin-left bg-route will-change-transform"
                style={{ transform: "scaleX(0)" }}
              />
            </div>
            <div
              data-proj-part="mockup"
              className="atlas-chart-inset relative aspect-4/3 overflow-hidden will-change-transform"
              style={{ borderTopWidth: 3, borderTopColor: PROJECTS[0].accent }}
            >
              <div className="absolute inset-0 bg-linear-to-br from-[#1a2432] to-[#0c1219]" />
              <div className="absolute inset-4 border border-dashed border-white/15" />
              <div className="absolute right-0 bottom-0 left-0 p-5">
                <p
                  data-proj-part="mockup-title"
                  className="font-display text-lg font-semibold tracking-tight text-white uppercase"
                >
                  {PROJECTS[0].name}
                </p>
                <p
                  data-proj-part="mockup-meta"
                  className="mt-1 font-mono text-xs text-white/50"
                >
                  {PROJECTS[0].company ?? PROJECTS[0].period}
                </p>
              </div>
            </div>
          </div>

          <div className="relative h-[min(52vh,420px)]">
            {PROJECTS.map((project) => (
              <article
                key={project.id}
                data-proj-part="card"
                className="atlas-ticket absolute inset-0 p-6 will-change-transform"
                style={{
                  opacity: 0,
                  transform: "translate3d(0, 100px, 0) scale(0.9)",
                }}
              >
                <p
                  className="font-mono text-xs font-medium"
                  style={{ color: project.accent ?? "#1f6f8b" }}
                >
                  {project.period}
                </p>
                <h3 className="font-display mt-2 text-2xl font-bold tracking-tight text-ink uppercase">
                  {project.name}
                </h3>
                {project.company && (
                  <p className="text-sm text-muted">{project.company}</p>
                )}
                {project.description && (
                  <p className="mt-4 text-sm leading-relaxed text-ink/70">
                    {project.description}
                  </p>
                )}
                {project.highlights && project.highlights.length > 0 && (
                  <ul className="mt-4 space-y-2 text-sm text-ink/65">
                    {project.highlights.map((h) => (
                      <li key={h} className="flex gap-2">
                        <span style={{ color: project.accent ?? "#1f6f8b" }}>→</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
                {project.tech && project.tech.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="border border-grid px-2.5 py-0.5 font-mono text-[10px] text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block font-mono text-sm text-route hover:underline"
                  >
                    View on GitHub →
                  </a>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
