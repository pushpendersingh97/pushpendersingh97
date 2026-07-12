"use client";

import { FRONTEND_SKILLS } from "@/lib/portfolioData";
import {
  bindScrollProgress,
  getScrollProgress,
  prefersReducedMotion,
} from "@/lib/scrollProgress";
import { useEffect, useRef, useState } from "react";

type GalleryElements = {
  viewport: HTMLElement;
  track: HTMLElement;
  progressFill: HTMLElement;
  caption: HTMLElement;
  category: HTMLElement;
  cards: HTMLElement[];
};

function queryElements(stage: HTMLElement): GalleryElements | null {
  const viewport = stage.querySelector<HTMLElement>(
    '[data-skill-part="viewport"]',
  );
  const track = stage.querySelector<HTMLElement>('[data-skill-part="track"]');
  const progressFill = stage.querySelector<HTMLElement>(
    '[data-skill-part="progress-fill"]',
  );
  const caption = stage.querySelector<HTMLElement>('[data-skill-part="caption"]');
  const category = stage.querySelector<HTMLElement>(
    '[data-skill-part="category"]',
  );
  const cards = Array.from(
    stage.querySelectorAll<HTMLElement>('[data-skill-part="card"]'),
  );

  if (
    !viewport ||
    !track ||
    !progressFill ||
    !caption ||
    !category ||
    cards.length === 0
  ) {
    return null;
  }

  return { viewport, track, progressFill, caption, category, cards };
}

function getMaxShift(elements: GalleryElements): number {
  return Math.max(0, elements.track.scrollWidth - elements.viewport.clientWidth);
}

function applyGalleryStyles(
  elements: GalleryElements,
  progress: number,
  maxShift: number,
) {
  const count = FRONTEND_SKILLS.length;
  const x = -(maxShift * progress);

  elements.track.style.transform = `translate3d(${x}px, 0, 0)`;
  elements.progressFill.style.transform = `scaleX(${progress})`;

  const activeIndex = Math.min(
    count - 1,
    Math.round(progress * (count - 1)),
  );
  const skill = FRONTEND_SKILLS[activeIndex];
  elements.caption.textContent = skill.label;
  elements.caption.style.color = skill.color;
  elements.category.textContent = skill.category;

  elements.cards.forEach((card, i) => {
    const dist = Math.abs(i - activeIndex);
    const scale = dist === 0 ? 1 : dist === 1 ? 0.97 : 0.94;
    const opacity = dist === 0 ? 1 : dist === 1 ? 0.88 : 0.7;
    card.style.transform = `scale(${scale})`;
    card.style.opacity = String(opacity);
  });
}

export default function PortfolioSkillsFan() {
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

      const measureAndApply = (progress: number) => {
        applyGalleryStyles(elements, progress, getMaxShift(elements));
      };

      measureAndApply(getScrollProgress(section));
      cleanup = bindScrollProgress(section, measureAndApply);
    };

    setup();
    return () => {
      cancelAnimationFrame(retryFrame);
      cleanup?.();
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <section className="px-6 py-24" aria-label="Core technologies">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-3xl font-bold text-white">
            Core technologies
          </h2>
          <p className="mt-2 text-center text-sm text-zinc-500">Frontend stack</p>
          <div className="mt-10 flex gap-4 overflow-x-auto pb-4">
            {FRONTEND_SKILLS.map((skill) => (
              <div
                key={skill.id}
                className="h-48 w-56 shrink-0 rounded-2xl border border-zinc-800 bg-zinc-900 p-5"
                style={{ borderTopColor: skill.color, borderTopWidth: 3 }}
              >
                <div
                  className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold"
                  style={{
                    backgroundColor: `${skill.color}22`,
                    color: skill.color,
                  }}
                >
                  {skill.label.charAt(0)}
                </div>
                <p className="font-semibold text-white">{skill.label}</p>
                <p className="mt-1 text-[10px] tracking-wide text-zinc-500 uppercase">
                  {skill.category}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-[380vh] w-full overflow-x-clip"
      aria-label="Core technologies — horizontal gallery"
    >
      <div className="sticky top-0 flex h-svh flex-col items-center justify-center px-6">
        <div ref={stageRef} className="w-full max-w-5xl">
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Core technologies
            </h2>
            <p className="mt-2 text-sm text-zinc-500">
              Scroll sideways through the stack I ship with
            </p>
          </div>

          <div className="mb-4 flex items-end justify-between gap-4">
            <div className="min-w-0">
              <p
                data-skill-part="caption"
                className="truncate text-lg font-semibold will-change-[color] sm:text-xl"
                style={{ color: FRONTEND_SKILLS[0].color }}
              >
                {FRONTEND_SKILLS[0].label}
              </p>
              <p
                data-skill-part="category"
                className="mt-0.5 text-[10px] tracking-[0.2em] text-zinc-500 uppercase"
              >
                {FRONTEND_SKILLS[0].category}
              </p>
            </div>
            <div className="h-0.5 max-w-xs flex-1 overflow-hidden rounded-full bg-zinc-800">
              <div
                data-skill-part="progress-fill"
                className="h-full origin-left rounded-full bg-linear-to-r from-sky-400 to-[#c5ff3b] will-change-transform"
                style={{ transform: "scaleX(0)" }}
              />
            </div>
          </div>

          <div
            data-skill-part="viewport"
            className="overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-950/50 py-8"
          >
            <div
              data-skill-part="track"
              className="flex gap-5 px-6 will-change-transform sm:gap-6 sm:px-8"
              style={{ width: "max-content" }}
            >
              {FRONTEND_SKILLS.map((skill) => (
                <div
                  key={skill.id}
                  data-skill-part="card"
                  className="flex h-52 w-[220px] shrink-0 flex-col justify-between rounded-2xl border border-zinc-700/60 bg-linear-to-br from-zinc-800 to-zinc-950 p-5 shadow-xl will-change-transform sm:h-56 sm:w-[260px] sm:p-6"
                  style={{
                    borderTopColor: skill.color,
                    borderTopWidth: 3,
                    transformOrigin: "center center",
                  }}
                >
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl text-base font-bold sm:h-12 sm:w-12 sm:text-lg"
                    style={{
                      backgroundColor: `${skill.color}22`,
                      color: skill.color === "#ffffff" ? "#e4e4e7" : skill.color,
                    }}
                  >
                    {skill.label.charAt(0)}
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white sm:text-xl">
                      {skill.label}
                    </p>
                    <p className="mt-1 text-xs text-zinc-500">{skill.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
