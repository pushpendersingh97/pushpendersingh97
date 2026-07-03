"use client";

import { CODE_REVEAL_IMAGE, CODE_REVEAL_LINES } from "@/lib/effectsData";
import {
  bindScrollProgress,
  mapRange,
  prefersReducedMotion,
} from "@/lib/scrollProgress";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type CodeElements = {
  lines: HTMLElement[];
  imageWrap: HTMLElement;
  cursor: HTMLElement;
  progressFill: HTMLElement;
};

function queryElements(stage: HTMLElement): CodeElements | null {
  const lines = Array.from(
    stage.querySelectorAll<HTMLElement>('[data-code-part="line"]'),
  );
  const imageWrap = stage.querySelector<HTMLElement>('[data-code-part="image"]');
  const cursor = stage.querySelector<HTMLElement>('[data-code-part="cursor"]');
  const progressFill = stage.querySelector<HTMLElement>(
    '[data-code-part="progress-fill"]',
  );

  if (lines.length === 0 || !imageWrap || !cursor || !progressFill) return null;
  return { lines, imageWrap, cursor, progressFill };
}

function applyCodeStyles(elements: CodeElements, progress: number) {
  const lineCount = elements.lines.length;
  const typedProgress = mapRange(progress, [0.08, 0.82], [0, lineCount]);

  elements.progressFill.style.transform = `scaleX(${progress})`;

  elements.lines.forEach((line, index) => {
    const reveal = Math.min(1, Math.max(0, typedProgress - index));
    line.style.opacity = String(mapRange(reveal, [0, 0.35], [0, 1]));
    line.style.transform = `translateX(${mapRange(reveal, [0, 1], [-8, 0])}px)`;
  });

  const lastLine = Math.floor(typedProgress);
  elements.cursor.style.opacity = String(
    progress > 0.08 && progress < 0.85 ? 1 : 0,
  );
  elements.cursor.style.transform = `translateY(${lastLine * 28 + 8}px)`;

  elements.imageWrap.style.opacity = String(mapRange(progress, [0.2, 0.45, 0.9], [0, 1, 1]));
  elements.imageWrap.style.transform = `scale(${mapRange(progress, [0.2, 0.5, 0.85], [0.94, 1, 1.02])}) translateY(${mapRange(progress, [0.2, 0.45], [20, 0])}px)`;
}

export default function EffectsCodeReveal() {
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
        applyCodeStyles(elements, progress);
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
      <section className="px-6 py-24" aria-label="Code reveal">
        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          <pre className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-sm text-sky-300/90">
            {CODE_REVEAL_LINES.join("\n")}
          </pre>
          <div className="relative aspect-4/3 overflow-hidden rounded-xl border border-zinc-800">
            <Image
              src={CODE_REVEAL_IMAGE}
              alt="Product screen"
              fill
              className="object-cover"
              sizes="480px"
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-[340vh] w-full"
      aria-label="Scroll-driven code reveal"
    >
      <div className="sticky top-0 flex h-svh items-center justify-center px-6">
        <div
          ref={stageRef}
          className="grid w-full max-w-4xl gap-6 md:grid-cols-[1fr_1.05fr] md:items-center"
        >
          <div className="relative rounded-2xl border border-zinc-800 bg-zinc-950 p-5 shadow-xl">
            <div className="mb-3 flex gap-1.5" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
            </div>
            <div className="relative min-h-[220px] font-mono text-sm leading-7">
              {CODE_REVEAL_LINES.map((line, index) => (
                <div
                  key={`line-${index}`}
                  data-code-part="line"
                  className="whitespace-pre text-sky-300/90 will-change-[opacity,transform]"
                  style={{ opacity: 0 }}
                >
                  {line || " "}
                </div>
              ))}
              <span
                data-code-part="cursor"
                className="absolute left-0 top-0 h-5 w-0.5 bg-sky-400 will-change-[opacity,transform]"
                style={{ opacity: 0 }}
                aria-hidden
              />
            </div>
            <div className="mt-4 h-0.5 overflow-hidden rounded-full bg-zinc-800">
              <div
                data-code-part="progress-fill"
                className="h-full origin-left rounded-full bg-sky-400 will-change-transform"
                style={{ transform: "scaleX(0)" }}
              />
            </div>
          </div>

          <div
            data-code-part="image"
            className="relative aspect-4/3 overflow-hidden rounded-2xl border border-zinc-700/60 shadow-2xl will-change-[opacity,transform]"
            style={{ opacity: 0, transform: "scale(0.94) translateY(20px)" }}
          >
            <Image
              src={CODE_REVEAL_IMAGE}
              alt="Patient dashboard preview"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 480px"
              priority
            />
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-zinc-950/80 to-transparent p-4">
              <p className="text-xs text-zinc-400">Live preview · ISR-enabled route</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
