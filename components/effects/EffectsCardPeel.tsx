"use client";

import { PEEL_CARDS } from "@/lib/effectsData";
import {
  bindScrollProgress,
  mapRange,
  prefersReducedMotion,
} from "@/lib/scrollProgress";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type PeelElements = {
  cards: HTMLElement[];
  progressFill: HTMLElement;
  counter: HTMLElement;
};

function queryElements(stage: HTMLElement): PeelElements | null {
  const cards = Array.from(
    stage.querySelectorAll<HTMLElement>('[data-peel-part="card"]'),
  );
  const progressFill = stage.querySelector<HTMLElement>(
    '[data-peel-part="progress-fill"]',
  );
  const counter = stage.querySelector<HTMLElement>('[data-peel-part="counter"]');

  if (cards.length === 0 || !progressFill || !counter) return null;
  return { cards, progressFill, counter };
}

function applyPeelStyles(elements: PeelElements, progress: number) {
  const count = elements.cards.length;
  const segmentSize = 1 / count;

  elements.progressFill.style.transform = `scaleX(${progress})`;

  const peeledCount = Math.min(count, Math.floor(progress * count + 0.001));
  elements.counter.textContent = `${peeledCount} / ${count} peeled`;

  elements.cards.forEach((card, index) => {
    const segmentStart = index * segmentSize;
    const segmentEnd = (index + 1) * segmentSize;
    const local = mapRange(progress, [segmentStart, segmentEnd], [0, 1]);
    const stackIndex = index - peeledCount;
    const isPeeled = progress >= segmentEnd - 0.001;
    const isPeeling = progress >= segmentStart && progress < segmentEnd;

    if (isPeeled) {
      card.style.opacity = "0";
      card.style.transform =
        "translate3d(160px, -120px, 0) rotate(22deg) scale(0.92)";
      card.style.zIndex = "0";
      return;
    }

    if (isPeeling) {
      const rotate = mapRange(local, [0, 1], [0, 24]);
      const x = mapRange(local, [0, 1], [0, 140]);
      const y = mapRange(local, [0, 1], [stackIndex * -10, -110]);
      const opacity = mapRange(local, [0.7, 1], [1, 0.35]);
      card.style.opacity = String(opacity);
      card.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg) scale(1)`;
      card.style.zIndex = String(count + 5);
      return;
    }

    const y = stackIndex * -12;
    const scale = 1 - stackIndex * 0.035;
    const rotate = stackIndex * -1.5;
    card.style.opacity = "1";
    card.style.transform = `translate3d(0, ${y}px, 0) rotate(${rotate}deg) scale(${scale})`;
    card.style.zIndex = String(count - index);
  });
}

export default function EffectsCardPeel() {
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
        applyPeelStyles(elements, progress);
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
      <section className="px-6 py-24" aria-label="Stacked card peel-off">
        <div className="mx-auto grid max-w-md gap-4">
          {PEEL_CARDS.map((card) => (
            <article
              key={card.id}
              className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900"
            >
              <div className="relative aspect-3/2">
                <Image src={card.image} alt="" fill className="object-cover" sizes="400px" />
              </div>
              <div className="p-4">
                <h2 className="font-semibold text-white">{card.title}</h2>
                <p className="text-sm text-zinc-500">{card.subtitle}</p>
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
      className="relative h-[360vh] w-full"
      aria-label="Scroll-driven stacked card peel-off"
    >
      <div className="sticky top-0 flex h-svh items-center justify-center px-6">
        <div ref={stageRef} className="w-full max-w-sm">
          <div className="mb-6 flex items-center justify-between">
            <p data-peel-part="counter" className="font-mono text-xs text-sky-400">
              0 / 4 peeled
            </p>
            <div className="h-0.5 w-32 overflow-hidden rounded-full bg-zinc-800">
              <div
                data-peel-part="progress-fill"
                className="h-full origin-left rounded-full bg-sky-400 will-change-transform"
                style={{ transform: "scaleX(0)" }}
              />
            </div>
          </div>

          <div className="relative mx-auto h-[420px] w-full max-w-[320px]">
            {PEEL_CARDS.map((card, index) => (
              <article
                key={card.id}
                data-peel-part="card"
                className="absolute inset-x-0 top-8 overflow-hidden rounded-2xl border border-zinc-700/60 bg-zinc-900 shadow-2xl will-change-transform"
                style={{
                  zIndex: PEEL_CARDS.length - index,
                  transform: `translate3d(0, ${index * -12}px, 0) rotate(${index * -1.5}deg) scale(${1 - index * 0.035})`,
                }}
              >
                <div className="relative aspect-3/2">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover"
                    sizes="320px"
                    priority={index === 0}
                  />
                  <div
                    className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-zinc-950/90 to-transparent"
                    aria-hidden
                  />
                </div>
                <div className="p-4">
                  <p className="text-[10px] font-medium uppercase" style={{ color: card.accent }}>
                    {card.subtitle}
                  </p>
                  <h2 className="mt-1 text-lg font-bold text-white">{card.title}</h2>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
