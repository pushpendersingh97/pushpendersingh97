"use client";

import { FLIP_STORY_BEATS } from "@/lib/effectsData";
import {
  bindScrollProgress,
  mapRange,
  prefersReducedMotion,
} from "@/lib/scrollProgress";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type FlipElements = {
  inner: HTMLElement;
  phase: HTMLElement;
  title: HTMLElement;
  body: HTMLElement;
  progressFill: HTMLElement;
};

function queryElements(stage: HTMLElement): FlipElements | null {
  const inner = stage.querySelector<HTMLElement>('[data-flip-part="inner"]');
  const phase = stage.querySelector<HTMLElement>('[data-flip-part="phase"]');
  const title = stage.querySelector<HTMLElement>('[data-flip-part="title"]');
  const body = stage.querySelector<HTMLElement>('[data-flip-part="body"]');
  const progressFill = stage.querySelector<HTMLElement>(
    '[data-flip-part="progress-fill"]',
  );

  if (!inner || !phase || !title || !body || !progressFill) return null;
  return { inner, phase, title, body, progressFill };
}

function applyFlipStyles(
  elements: FlipElements,
  progress: number,
  onBeatChange: (index: number) => void,
  lastBeat: { current: number },
) {
  const count = FLIP_STORY_BEATS.length;
  const segmentSize = 1 / count;
  const activeIndex = Math.min(count - 1, Math.floor(progress * count + 0.001));
  const local = mapRange(
    progress,
    [activeIndex * segmentSize, (activeIndex + 1) * segmentSize],
    [0, 1],
  );

  elements.progressFill.style.transform = `scaleX(${progress})`;

  const rotateY = mapRange(local, [0, 0.45, 0.55, 1], [0, 0, 180, 180]);
  elements.inner.style.transform = `rotateY(${rotateY}deg)`;

  const showBack = local >= 0.5;
  elements.phase.style.opacity = String(showBack ? 1 : 0);
  elements.title.style.opacity = String(showBack ? 1 : 0);
  elements.body.style.opacity = String(showBack ? mapRange(local, [0.5, 0.65], [0, 1]) : 0);

  if (activeIndex !== lastBeat.current) {
    lastBeat.current = activeIndex;
    onBeatChange(activeIndex);
  }
}

export default function EffectsFlipStory() {
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
    const lastBeat = { current: 0 };

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
        applyFlipStyles(elements, progress, setActiveIndex, lastBeat);
      });
    };

    setup();
    return () => {
      cancelAnimationFrame(retryFrame);
      cleanup?.();
    };
  }, [reducedMotion]);

  const beat = FLIP_STORY_BEATS[activeIndex];

  if (reducedMotion) {
    return (
      <section className="px-6 py-24" aria-label="Flip card story">
        <div className="mx-auto max-w-md space-y-8">
          {FLIP_STORY_BEATS.map((item) => (
            <article key={item.id} className="overflow-hidden rounded-2xl border border-zinc-800">
              <div className="relative aspect-5/3">
                <Image src={item.image} alt={item.title} fill className="object-cover" sizes="400px" />
              </div>
              <div className="p-5">
                <p className="text-xs uppercase" style={{ color: item.accent }}>
                  {item.phase}
                </p>
                <h2 className="mt-2 text-xl font-bold text-white">{item.title}</h2>
                <p className="mt-2 text-sm text-zinc-400">{item.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-[380vh] w-full"
      aria-label="Scroll-driven flip card story"
    >
      <div className="sticky top-0 flex h-svh items-center justify-center px-6">
        <div ref={stageRef} className="w-full max-w-md">
          <div className="mb-6 h-0.5 overflow-hidden rounded-full bg-zinc-800">
            <div
              data-flip-part="progress-fill"
              className="h-full origin-left rounded-full bg-sky-400 will-change-transform"
              style={{ transform: "scaleX(0)" }}
            />
          </div>

          <div className="perspective-[1200px]">
            <div
              data-flip-part="inner"
              className="relative h-[420px] w-full transform-3d will-change-transform"
              style={{ transformStyle: "preserve-3d", transform: "rotateY(0deg)" }}
            >
              <div
                className="absolute inset-0 overflow-hidden rounded-2xl border border-zinc-700/60 shadow-2xl backface-hidden"
                style={{ backfaceVisibility: "hidden" }}
              >
                <div className="relative h-full w-full">
                  <Image
                    src={beat.image}
                    alt={beat.title}
                    fill
                    className="object-cover"
                    sizes="400px"
                    priority
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-zinc-950 via-zinc-950/60 to-transparent p-6">
                    <p className="text-xs font-medium uppercase" style={{ color: beat.accent }}>
                      {beat.phase}
                    </p>
                    <p className="mt-2 text-lg font-bold text-white">{beat.title}</p>
                  </div>
                </div>
              </div>

              <div
                className="absolute inset-0 flex flex-col justify-center rounded-2xl border border-zinc-700/60 bg-zinc-900/95 p-8 shadow-2xl backface-hidden"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <p
                  data-flip-part="phase"
                  className="text-xs font-medium tracking-[0.2em] uppercase will-change-[opacity]"
                  style={{ color: beat.accent, opacity: 0 }}
                >
                  {beat.phase}
                </p>
                <h2
                  data-flip-part="title"
                  className="mt-3 text-2xl font-bold text-white will-change-[opacity]"
                  style={{ opacity: 0 }}
                >
                  {beat.title}
                </h2>
                <p
                  data-flip-part="body"
                  className="mt-4 text-sm leading-relaxed text-zinc-400 will-change-[opacity]"
                  style={{ opacity: 0 }}
                >
                  {beat.body}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {FLIP_STORY_BEATS.map((item, i) => (
              <span
                key={item.id}
                className="h-1.5 rounded-full transition-all"
                style={{
                  width: i === activeIndex ? 24 : 8,
                  backgroundColor: i === activeIndex ? item.accent : "#3f3f46",
                }}
                aria-hidden
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
