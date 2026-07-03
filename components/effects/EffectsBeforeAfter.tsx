"use client";

import {
  bindScrollProgress,
  mapRange,
  prefersReducedMotion,
} from "@/lib/scrollProgress";
import { useEffect, useRef, useState } from "react";

type ScrubElements = {
  afterLayer: HTMLElement;
  handle: HTMLElement;
  labelBefore: HTMLElement;
  labelAfter: HTMLElement;
};

function queryElements(stage: HTMLElement): ScrubElements | null {
  const afterLayer = stage.querySelector<HTMLElement>('[data-ba-part="after"]');
  const handle = stage.querySelector<HTMLElement>('[data-ba-part="handle"]');
  const labelBefore = stage.querySelector<HTMLElement>('[data-ba-part="label-before"]');
  const labelAfter = stage.querySelector<HTMLElement>('[data-ba-part="label-after"]');

  if (!afterLayer || !handle || !labelBefore || !labelAfter) return null;
  return { afterLayer, handle, labelBefore, labelAfter };
}

function applyScrubStyles(elements: ScrubElements, progress: number) {
  const scrub = mapRange(progress, [0.15, 0.85], [0, 100]);

  elements.afterLayer.style.clipPath = `inset(0 ${100 - scrub}% 0 0)`;
  elements.handle.style.left = `${scrub}%`;
  elements.labelBefore.style.opacity = String(mapRange(scrub, [0, 30, 70, 100], [1, 0.6, 0.3, 0.2]));
  elements.labelAfter.style.opacity = String(mapRange(scrub, [0, 30, 70, 100], [0.2, 0.3, 0.6, 1]));
}

export default function EffectsBeforeAfter() {
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
        applyScrubStyles(elements, progress);
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
      <section className="px-6 py-24" aria-label="Before and after comparison">
        <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-xs text-zinc-500 uppercase">Before</p>
            <p className="mt-2 text-sm text-zinc-400">Legacy layout · 4.2s LCP · cluttered UI</p>
          </div>
          <div className="rounded-2xl border border-sky-500/30 bg-zinc-900 p-6">
            <p className="text-xs text-sky-400 uppercase">After</p>
            <p className="mt-2 text-sm text-zinc-300">Refactored · 1.1s LCP · clean component library</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-[320vh] w-full"
      aria-label="Scroll-scrub before and after"
    >
      <div className="sticky top-0 flex h-svh items-center justify-center px-6">
        <div ref={stageRef} className="w-full max-w-3xl">
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-zinc-700/60 shadow-2xl">
            <div
              data-ba-part="label-before"
              className="absolute top-4 left-4 z-20 rounded-full bg-zinc-900/80 px-3 py-1 text-xs font-medium text-zinc-400 backdrop-blur-sm"
            >
              Before · Legacy
            </div>
            <div
              data-ba-part="label-after"
              className="absolute top-4 right-4 z-20 rounded-full bg-sky-500/20 px-3 py-1 text-xs font-medium text-sky-300 backdrop-blur-sm"
              style={{ opacity: 0.2 }}
            >
              After · Refactored
            </div>

            <div className="absolute inset-0 bg-linear-to-br from-zinc-800 via-zinc-900 to-zinc-950 p-8">
              <div className="grid h-full grid-cols-3 gap-2 opacity-60">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="rounded-lg bg-zinc-700/50" />
                ))}
              </div>
              <p className="absolute bottom-6 left-6 text-sm text-zinc-500">
                Cluttered modules · slow LCP
              </p>
            </div>

            <div
              data-ba-part="after"
              className="absolute inset-0 bg-linear-to-br from-sky-950 via-zinc-900 to-[#0a0e14] p-8 will-change-[clip-path]"
              style={{ clipPath: "inset(0 100% 0 0)" }}
            >
              <div className="grid h-full grid-cols-3 gap-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-sky-500/20 bg-zinc-800/80"
                  />
                ))}
              </div>
              <p className="absolute bottom-6 left-6 text-sm text-sky-300/80">
                Component library · 1.1s LCP
              </p>
            </div>

            <div
              data-ba-part="handle"
              className="absolute top-0 bottom-0 z-10 w-1 -translate-x-1/2 bg-white shadow-[0_0_12px_rgba(255,255,255,0.5)] will-change-[left]"
              style={{ left: "0%" }}
            >
              <div className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-zinc-900 text-xs text-white">
                ↔
              </div>
            </div>
          </div>
          <p className="mt-6 text-center text-sm text-zinc-500">
            Scroll to scrub between before and after states
          </p>
        </div>
      </div>
    </section>
  );
}
