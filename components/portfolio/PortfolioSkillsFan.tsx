"use client";

import { FRONTEND_SKILLS } from "@/lib/portfolioData";
import {
  bindScrollProgress,
  getScrollProgress,
} from "@/lib/scrollProgress";
import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

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
  elements.caption.style.color = "";
  elements.category.textContent = skill.category;

  elements.cards.forEach((card, i) => {
    const dist = Math.abs(i - activeIndex);
    const scale = dist === 0 ? 1 : dist === 1 ? 0.97 : 0.94;
    const opacity = dist === 0 ? 1 : dist === 1 ? 0.88 : 0.7;
    card.style.transform = `scale(${scale})`;
    card.style.opacity = String(opacity);
  });
}

function SkillTag({
  skill,
}: {
  skill: (typeof FRONTEND_SKILLS)[number];
}) {
  return (
    <div
      data-skill-part="card"
      className="flex h-52 w-[220px] shrink-0 flex-col justify-between border border-grid bg-paper p-5 shadow-sm will-change-transform sm:h-56 sm:w-[260px] sm:p-6"
      style={{
        borderTopColor: skill.color === "#ffffff" ? "var(--atlas-route)" : skill.color,
        borderTopWidth: 3,
        transformOrigin: "center center",
      }}
    >
      <div
        className="flex h-11 w-11 items-center justify-center font-display text-base font-bold sm:h-12 sm:w-12 sm:text-lg"
        style={{
          backgroundColor:
            skill.color === "#ffffff" ? "rgba(31,111,139,0.12)" : `${skill.color}22`,
          color: skill.color === "#ffffff" ? "var(--atlas-route)" : skill.color,
        }}
      >
        {skill.label.charAt(0)}
      </div>
      <div>
        <p className="font-display text-lg font-bold tracking-tight text-ink uppercase sm:text-xl">
          {skill.label}
        </p>
        <p className="mt-1 font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
          {skill.category}
        </p>
      </div>
    </div>
  );
}

export default function PortfolioSkillsFan() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion() ?? false;

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
      <section id="skills" className="px-6 py-24 lg:pl-20" aria-label="Core technologies">
        <div className="mx-auto max-w-4xl">
          <p className="atlas-label">Skills</p>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-ink uppercase">
            Core technologies
          </h2>
          <div className="mt-10 flex gap-4 overflow-x-auto pb-4">
            {FRONTEND_SKILLS.map((skill) => (
              <div
                key={skill.id}
                className="h-48 w-56 shrink-0 border border-grid bg-paper p-5"
                style={{
                  borderTopColor:
                    skill.color === "#ffffff" ? "var(--atlas-route)" : skill.color,
                  borderTopWidth: 3,
                }}
              >
                <p className="font-display text-lg font-bold text-ink uppercase">
                  {skill.label}
                </p>
                <p className="mt-1 font-mono text-[10px] tracking-wide text-muted uppercase">
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
      id="skills"
      className="relative h-[380vh] w-full overflow-x-clip"
      aria-label="Core technologies — horizontal gallery"
    >
      <div className="sticky top-0 flex h-svh flex-col items-center justify-center px-6 lg:pl-20">
        <div ref={stageRef} className="w-full max-w-5xl">
          <div className="mb-6">
            <p className="atlas-label">Skills</p>
            <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-ink uppercase sm:text-4xl">
              Core technologies
            </h2>
            <p className="mt-2 text-sm text-muted">
              Scroll through the stack I ship with
            </p>
          </div>

          <div className="mb-4 flex items-end justify-between gap-4">
            <div className="min-w-0">
              <p
                data-skill-part="caption"
                className="font-display truncate text-lg font-bold tracking-tight text-ink uppercase will-change-[color] sm:text-xl"
              >
                {FRONTEND_SKILLS[0].label}
              </p>
              <p
                data-skill-part="category"
                className="mt-0.5 font-mono text-[10px] tracking-[0.2em] text-muted uppercase"
              >
                {FRONTEND_SKILLS[0].category}
              </p>
            </div>
            <div className="h-0.5 max-w-xs flex-1 overflow-hidden bg-grid">
              <div
                data-skill-part="progress-fill"
                className="h-full origin-left bg-route will-change-transform"
                style={{ transform: "scaleX(0)" }}
              />
            </div>
          </div>

          <div
            data-skill-part="viewport"
            className="overflow-hidden border border-grid bg-[#dfe5ec]/60 py-8"
          >
            <div
              data-skill-part="track"
              className="flex gap-5 px-6 will-change-transform sm:gap-6 sm:px-8"
              style={{ width: "max-content" }}
            >
              {FRONTEND_SKILLS.map((skill) => (
                <SkillTag key={skill.id} skill={skill} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
