"use client";

import { GALLERY_ITEMS } from "@/lib/effectsData";
import {
  bindScrollProgress,
  mapRange,
  prefersReducedMotion,
} from "@/lib/scrollProgress";
import { useEffect, useRef, useState } from "react";

type GalleryElements = {
  track: HTMLElement;
  progressFill: HTMLElement;
  caption: HTMLElement;
};

function queryElements(stage: HTMLElement): GalleryElements | null {
  const track = stage.querySelector<HTMLElement>('[data-gal-part="track"]');
  const progressFill = stage.querySelector<HTMLElement>(
    '[data-gal-part="progress-fill"]',
  );
  const caption = stage.querySelector<HTMLElement>('[data-gal-part="caption"]');

  if (!track || !progressFill || !caption) return null;
  return { track, progressFill, caption };
}

function applyGalleryStyles(elements: GalleryElements, progress: number) {
  const maxShift = (GALLERY_ITEMS.length - 1) * 72;
  const x = mapRange(progress, [0, 1], [0, -maxShift]);

  elements.track.style.transform = `translate3d(${x}vw, 0, 0)`;
  elements.progressFill.style.transform = `scaleX(${progress})`;

  const activeIndex = Math.min(
    GALLERY_ITEMS.length - 1,
    Math.round(progress * (GALLERY_ITEMS.length - 1)),
  );
  const item = GALLERY_ITEMS[activeIndex];
  elements.caption.textContent = item.label;
  elements.caption.style.color = item.color;
}

export default function EffectsHorizontalGallery() {
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
        applyGalleryStyles(elements, progress);
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
      <section className="px-6 py-24" aria-label="Horizontal gallery">
        <div className="mx-auto flex max-w-4xl gap-4 overflow-x-auto pb-4">
          {GALLERY_ITEMS.map((item) => (
            <div
              key={item.id}
              className="h-48 w-64 shrink-0 rounded-2xl border border-zinc-800 bg-zinc-900 p-4"
              style={{ borderTopColor: item.color, borderTopWidth: 3 }}
            >
              <p className="font-medium text-white">{item.label}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-[380vh] w-full"
      aria-label="Scroll-driven horizontal gallery"
    >
      <div className="sticky top-0 flex h-svh flex-col items-center justify-center px-6">
        <div ref={stageRef} className="w-full max-w-5xl">
          <div className="mb-4 flex items-center justify-between gap-4">
            <p
              data-gal-part="caption"
              className="text-lg font-semibold will-change-[color]"
              style={{ color: GALLERY_ITEMS[0].color }}
            >
              {GALLERY_ITEMS[0].label}
            </p>
            <div className="h-0.5 flex-1 max-w-xs overflow-hidden rounded-full bg-zinc-800">
              <div
                data-gal-part="progress-fill"
                className="h-full origin-left rounded-full bg-sky-400 will-change-transform"
                style={{ transform: "scaleX(0)" }}
              />
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-950/50 py-8">
            <div
              data-gal-part="track"
              className="flex gap-6 pl-[10vw] will-change-transform"
              style={{ width: "max-content" }}
            >
              {GALLERY_ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="flex h-56 w-[min(72vw,320px)] shrink-0 flex-col justify-end rounded-2xl border border-zinc-700/60 bg-linear-to-br from-zinc-800 to-zinc-950 p-6 shadow-xl"
                  style={{ borderTopColor: item.color, borderTopWidth: 3 }}
                >
                  <p className="text-xl font-bold text-white">{item.label}</p>
                  <p className="mt-1 text-xs text-zinc-500">Product surface</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
