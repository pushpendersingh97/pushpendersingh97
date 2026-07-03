"use client";

import {
  bindScrollProgress,
  mapRange,
  prefersReducedMotion,
} from "@/lib/scrollProgress";
import { useEffect, useRef, useState } from "react";

const PATH_LENGTH = 600;

type DrawElements = {
  path: SVGPathElement;
  dot: HTMLElement;
  labels: HTMLElement[];
};

function queryElements(stage: HTMLElement): DrawElements | null {
  const path = stage.querySelector<SVGPathElement>('[data-svg-part="path"]');
  const dot = stage.querySelector<HTMLElement>('[data-svg-part="dot"]');
  const labels = Array.from(
    stage.querySelectorAll<HTMLElement>('[data-svg-part="label"]'),
  );

  if (!path || !dot || labels.length === 0) return null;
  return { path, dot, labels };
}

function applyDrawStyles(elements: DrawElements, progress: number) {
  const draw = mapRange(progress, [0.08, 0.92], [PATH_LENGTH, 0]);
  elements.path.style.strokeDashoffset = String(draw);

  const pointProgress = mapRange(progress, [0.08, 0.92], [0, 1]);
  const x = mapRange(pointProgress, [0, 1], [40, 360]);
  const y = mapRange(
    pointProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [280, 180, 120, 180, 40],
  );

  elements.dot.style.transform = `translate(${x}px, ${y}px)`;
  elements.dot.style.opacity = String(mapRange(progress, [0.05, 0.15], [0, 1]));

  elements.labels.forEach((label, index) => {
    const threshold = (index + 1) / (elements.labels.length + 1);
    const visible = pointProgress >= threshold - 0.1;
    label.style.opacity = String(visible ? mapRange(pointProgress, [threshold - 0.08, threshold], [0, 1]) : 0);
  });
}

export default function EffectsSvgDraw() {
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

      elements.path.style.strokeDasharray = String(PATH_LENGTH);
      elements.path.style.strokeDashoffset = String(PATH_LENGTH);

      cleanup = bindScrollProgress(section, (progress) => {
        applyDrawStyles(elements, progress);
      });
    };

    setup();
    return () => {
      cancelAnimationFrame(retryFrame);
      cleanup?.();
    };
  }, [reducedMotion]);

  const milestones = ["Ideate", "Design", "Build", "Ship"];

  if (reducedMotion) {
    return (
      <section className="px-6 py-24" aria-label="SVG path draw">
        <ol className="mx-auto flex max-w-md justify-between text-sm text-zinc-400">
          {milestones.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ol>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-[320vh] w-full"
      aria-label="Scroll-driven SVG path draw"
    >
      <div className="sticky top-0 flex h-svh items-center justify-center px-6">
        <div ref={stageRef} className="relative w-full max-w-md">
          <svg
            viewBox="0 0 400 320"
            className="h-auto w-full"
            aria-hidden
          >
            <path
              data-svg-part="path"
              d="M 40 280 Q 120 200 200 120 T 360 40"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="3"
              strokeLinecap="round"
              className="will-change-[stroke-dashoffset]"
            />
          </svg>

          <div
            data-svg-part="dot"
            className="pointer-events-none absolute top-0 left-0 h-4 w-4 rounded-full bg-[#c5ff3b] shadow-[0_0_16px_#c5ff3b88] will-change-[opacity,transform]"
            style={{ opacity: 0, transform: "translate(40px, 280px)" }}
          />

          <div className="absolute inset-0 pointer-events-none">
            {milestones.map((label, i) => (
              <span
                key={label}
                data-svg-part="label"
                className="absolute text-xs font-medium text-sky-400 will-change-[opacity]"
                style={{
                  opacity: 0,
                  left: `${10 + i * 28}%`,
                  top: `${72 - i * 14}%`,
                }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
