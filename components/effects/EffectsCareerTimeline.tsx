"use client";

import { EXPERIENCE } from "@/lib/portfolioData";
import {
  bindScrollProgress,
  mapRange,
  prefersReducedMotion,
} from "@/lib/scrollProgress";
import { useEffect, useRef, useState } from "react";

const ACCENT = "#38bdf8";

type TimelineElements = {
  lineFill: HTMLElement;
  nodes: HTMLElement[];
  labels: HTMLElement[];
  detail: HTMLElement;
};

function queryElements(stage: HTMLElement): TimelineElements | null {
  const lineFill = stage.querySelector<HTMLElement>('[data-tl-part="line-fill"]');
  const nodes = Array.from(
    stage.querySelectorAll<HTMLElement>('[data-tl-part="node"]'),
  );
  const labels = Array.from(
    stage.querySelectorAll<HTMLElement>('[data-tl-part="label"]'),
  );
  const detail = stage.querySelector<HTMLElement>('[data-tl-part="detail"]');

  if (!lineFill || nodes.length === 0 || labels.length === 0 || !detail) {
    return null;
  }

  return { lineFill, nodes, labels, detail };
}

function applyTimelineStyles(elements: TimelineElements, progress: number) {
  const count = elements.nodes.length;
  const segmentSize = 1 / count;
  const activeIndex = Math.min(count - 1, Math.floor(progress * count + 0.001));

  elements.lineFill.style.transform = `scaleY(${progress})`;

  elements.nodes.forEach((node, index) => {
    const segmentStart = index * segmentSize;
    const lit = progress >= segmentStart + segmentSize * 0.3;
    const active = index === activeIndex;

    node.style.backgroundColor = lit ? ACCENT : "#27272a";
    node.style.boxShadow = active
      ? `0 0 0 4px ${ACCENT}33, 0 0 24px ${ACCENT}44`
      : "none";
    node.style.transform = active ? "scale(1.25)" : lit ? "scale(1.1)" : "scale(1)";
  });

  elements.labels.forEach((label, index) => {
    const active = index === activeIndex;
    const passed = index < activeIndex;
    label.style.opacity = String(active ? 1 : passed ? 0.65 : 0.35);
    label.style.color = active ? "#ffffff" : passed ? "#a1a1aa" : "#52525b";
  });

  const job = EXPERIENCE[activeIndex];
  if (job) {
    elements.detail.style.opacity = String(
      mapRange(progress % segmentSize, [0, 0.15, 0.85, 1], [0.4, 1, 1, 0.4]),
    );
  }
}

export default function EffectsCareerTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

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
        applyTimelineStyles(elements, progress);
        const idx = Math.min(
          EXPERIENCE.length - 1,
          Math.floor(progress * EXPERIENCE.length + 0.001),
        );
        setActiveIndex(idx);
      });
    };

    setup();
    return () => {
      cancelAnimationFrame(retryFrame);
      cleanup?.();
    };
  }, [reducedMotion]);

  const job = EXPERIENCE[activeIndex];

  if (reducedMotion) {
    return (
      <section className="px-6 py-24" aria-label="Career timeline">
        <ol className="mx-auto max-w-md space-y-8 border-l border-zinc-800 pl-6">
          {EXPERIENCE.map((entry) => (
            <li key={entry.id}>
              <p className="text-xs text-sky-400">{entry.period}</p>
              <h2 className="mt-1 font-semibold text-white">{entry.role}</h2>
              <p className="text-sm text-zinc-500">{entry.company}</p>
            </li>
          ))}
        </ol>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-[380vh] w-full"
      aria-label="Scroll-driven career timeline"
    >
      <div className="sticky top-0 flex h-svh items-center justify-center px-6">
        <div
          ref={stageRef}
          className="grid w-full max-w-3xl gap-10 md:grid-cols-[auto_1fr]"
        >
          <div className="relative flex justify-center md:justify-start">
            <div className="absolute top-0 bottom-0 left-1/2 w-0.5 -translate-x-1/2 bg-zinc-800 md:left-5">
              <div
                data-tl-part="line-fill"
                className="h-full w-full origin-top bg-sky-400 will-change-transform"
                style={{ transform: "scaleY(0)" }}
              />
            </div>
            <div className="relative flex flex-col gap-16 py-4 md:pl-0">
              {EXPERIENCE.map((entry) => (
                <div key={entry.id} className="flex items-center gap-4 md:gap-6">
                  <div
                    data-tl-part="node"
                    className="relative z-10 h-4 w-4 shrink-0 rounded-full bg-zinc-800 transition-[transform,box-shadow] will-change-transform"
                  />
                  <span
                    data-tl-part="label"
                    className="text-sm font-medium will-change-[opacity,color] md:hidden"
                    style={{ opacity: 0.35, color: "#52525b" }}
                  >
                    {entry.company}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden flex-col justify-center gap-2 md:flex">
            {EXPERIENCE.map((entry) => (
              <span
                key={`label-${entry.id}`}
                data-tl-part="label"
                className="text-sm font-medium will-change-[opacity,color]"
                style={{ opacity: 0.35, color: "#52525b" }}
              >
                {entry.company}
              </span>
            ))}
          </div>

          <div
            data-tl-part="detail"
            className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 will-change-[opacity] md:col-start-2 md:row-start-1 md:row-end-2 md:ml-auto md:max-w-md"
          >
            {job ? (
              <>
                <p className="text-xs text-sky-400">{job.period}</p>
                <h2 className="mt-2 text-2xl font-bold text-white">{job.role}</h2>
                <p className="text-sm text-zinc-500">
                  {job.company} · {job.location}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-zinc-400">
                  {job.highlights.slice(0, 3).map((h) => (
                    <li key={h}>→ {h}</li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
