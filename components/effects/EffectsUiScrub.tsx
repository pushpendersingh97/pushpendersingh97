"use client";

import { UI_SCRUB_FRAMES } from "@/lib/effectsData";
import {
  bindScrollProgress,
  mapRange,
  prefersReducedMotion,
} from "@/lib/scrollProgress";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type ScrubElements = {
  frames: HTMLElement[];
  label: HTMLElement;
  counter: HTMLElement;
  progressFill: HTMLElement;
};

function queryElements(stage: HTMLElement): ScrubElements | null {
  const frames = Array.from(
    stage.querySelectorAll<HTMLElement>('[data-scrub-part="frame"]'),
  );
  const label = stage.querySelector<HTMLElement>('[data-scrub-part="label"]');
  const counter = stage.querySelector<HTMLElement>('[data-scrub-part="counter"]');
  const progressFill = stage.querySelector<HTMLElement>(
    '[data-scrub-part="progress-fill"]',
  );

  if (frames.length === 0 || !label || !counter || !progressFill) return null;
  return { frames, label, counter, progressFill };
}

function applyScrubStyles(elements: ScrubElements, progress: number) {
  const count = elements.frames.length;
  const scaled = progress * (count - 1);
  const activeIndex = Math.min(count - 1, Math.round(scaled));

  elements.progressFill.style.transform = `scaleX(${progress})`;
  elements.counter.textContent = `Frame ${String(activeIndex + 1).padStart(2, "0")} / ${String(count).padStart(2, "0")}`;
  elements.label.textContent = UI_SCRUB_FRAMES[activeIndex]?.label ?? "";

  elements.frames.forEach((frame, index) => {
    const distance = Math.abs(scaled - index);
    const opacity = distance < 0.6 ? mapRange(distance, [0, 0.6], [1, 0]) : 0;
    const scale = mapRange(distance, [0, 0.5], [1, 1.04]);
    frame.style.opacity = String(opacity);
    frame.style.transform = `scale(${scale})`;
    frame.style.zIndex = String(Math.round((1 - distance) * 10));
  });
}

export default function EffectsUiScrub() {
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
      <section className="px-6 py-24" aria-label="UI frame scrub">
        <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
          {UI_SCRUB_FRAMES.map((frame) => (
            <figure key={frame.id} className="overflow-hidden rounded-xl border border-zinc-800">
              <div className="relative aspect-video">
                <Image src={frame.image} alt={frame.label} fill className="object-cover" sizes="480px" />
              </div>
              <figcaption className="p-3 text-sm text-zinc-400">{frame.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-[400vh] w-full"
      aria-label="Scroll-driven UI frame scrub"
    >
      <div className="sticky top-0 flex h-svh items-center justify-center px-6">
        <div ref={stageRef} className="w-full max-w-3xl">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p
                data-scrub-part="label"
                className="text-lg font-semibold text-white"
              >
                {UI_SCRUB_FRAMES[0].label}
              </p>
              <p data-scrub-part="counter" className="mt-1 font-mono text-xs text-sky-400">
                Frame 01 / 08
              </p>
            </div>
            <div className="h-0.5 w-40 overflow-hidden rounded-full bg-zinc-800">
              <div
                data-scrub-part="progress-fill"
                className="h-full origin-left rounded-full bg-sky-400 will-change-transform"
                style={{ transform: "scaleX(0)" }}
              />
            </div>
          </div>

          <div className="relative aspect-video overflow-hidden rounded-2xl border border-zinc-700/60 bg-zinc-950 shadow-2xl">
            {UI_SCRUB_FRAMES.map((frame, index) => (
              <div
                key={frame.id}
                data-scrub-part="frame"
                className="absolute inset-0 will-change-[opacity,transform]"
                style={{
                  opacity: index === 0 ? 1 : 0,
                  transform: "scale(1)",
                  zIndex: index === 0 ? 10 : 0,
                }}
              >
                <Image
                  src={frame.image}
                  alt={frame.label}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                  priority={index < 2}
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10" aria-hidden />
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-sm text-zinc-500">
            Scroll to scrub through the product walkthrough frames
          </p>
        </div>
      </div>
    </section>
  );
}
