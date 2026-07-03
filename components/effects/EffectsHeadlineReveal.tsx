"use client";

import {
  bindScrollProgress,
  mapRange,
  prefersReducedMotion,
} from "@/lib/scrollProgress";
import { useEffect, useRef, useState } from "react";

const WORDS = [
  "Building",
  "scalable",
  "web",
  "products",
  "with",
  "React,",
  "Next.js",
  "&",
  "TypeScript",
];

type HeadlineElements = {
  words: HTMLElement[];
  subline: HTMLElement;
};

function queryElements(stage: HTMLElement): HeadlineElements | null {
  const words = Array.from(
    stage.querySelectorAll<HTMLElement>('[data-hl-part="word"]'),
  );
  const subline = stage.querySelector<HTMLElement>('[data-hl-part="subline"]');
  if (words.length === 0 || !subline) return null;
  return { words, subline };
}

function applyHeadlineStyles(elements: HeadlineElements, progress: number) {
  const count = elements.words.length;

  elements.words.forEach((word, index) => {
    const start = (index / count) * 0.75;
    const end = start + 0.12;
    const local = mapRange(progress, [start, end], [0, 1]);

    const y = mapRange(local, [0, 1], [48, 0]);
    const opacity = mapRange(local, [0, 0.4, 1], [0, 0.6, 1]);
    const blur = mapRange(local, [0, 0.5, 1], [8, 2, 0]);

    word.style.opacity = String(opacity);
    word.style.transform = `translate3d(0, ${y}px, 0)`;
    word.style.filter = blur > 0.5 ? `blur(${blur}px)` : "none";
  });

  elements.subline.style.opacity = String(mapRange(progress, [0.72, 0.88], [0, 1]));
  elements.subline.style.transform = `translateY(${mapRange(progress, [0.72, 0.88], [24, 0])}px)`;
}

export default function EffectsHeadlineReveal() {
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
        applyHeadlineStyles(elements, progress);
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
      <section className="px-6 py-24 text-center" aria-label="Headline reveal">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          {WORDS.join(" ")}
        </h2>
        <p className="mt-4 text-zinc-500">Full stack engineer · 7+ years</p>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-[280vh] w-full"
      aria-label="Scroll-driven headline reveal"
    >
      <div className="sticky top-0 flex h-svh items-center justify-center px-6">
        <div ref={stageRef} className="max-w-3xl text-center">
          <h2 className="flex flex-wrap justify-center gap-x-3 gap-y-2 text-3xl font-bold sm:text-5xl">
            {WORDS.map((word) => (
              <span
                key={word}
                data-hl-part="word"
                className="inline-block text-white will-change-[opacity,transform,filter]"
                style={{ opacity: 0, transform: "translate3d(0, 48px, 0)" }}
              >
                {word}
              </span>
            ))}
          </h2>
          <p
            data-hl-part="subline"
            className="mt-8 text-lg text-zinc-500 will-change-[opacity,transform]"
            style={{ opacity: 0 }}
          >
            Full stack engineer · 7+ years shipping production web apps
          </p>
        </div>
      </div>
    </section>
  );
}
