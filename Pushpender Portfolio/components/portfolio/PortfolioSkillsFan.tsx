"use client";

import { FRONTEND_SKILLS, type FrontendSkill } from "@/lib/portfolioData";
import {
  bindScrollProgress,
  getScrollProgress,
  mapRange,
  prefersReducedMotion,
} from "@/lib/scrollProgress";
import { useEffect, useRef, useState } from "react";

const CARD_W = 128;
const CARD_H = 148;
const ORBIT_RX = 200;
const ORBIT_RY = 118;

function SkillCardFace({ skill, compact }: { skill: FrontendSkill; compact?: boolean }) {
  return (
    <div
      className={`skill-orbit-card-inner overflow-hidden rounded-2xl border border-zinc-700/80 bg-zinc-900/95 shadow-[0_20px_50px_-16px_rgba(0,0,0,0.55)] backdrop-blur-md ${
        compact ? "p-3" : "p-4"
      }`}
      style={{
        borderTopColor: skill.color,
        borderTopWidth: 3,
        boxShadow: `0 20px 50px -16px rgba(0,0,0,0.55), 0 0 0 1px ${skill.color}18`,
      }}
    >
      <div
        className={`flex items-center justify-center rounded-xl font-bold ${
          compact ? "mb-2 h-8 w-8 text-sm" : "mb-2.5 h-10 w-10 text-sm"
        }`}
        style={{ backgroundColor: `${skill.color}22`, color: skill.color }}
      >
        {skill.label.charAt(0)}
      </div>
      <p className={`font-semibold text-white ${compact ? "text-xs" : "text-sm leading-snug"}`}>
        {skill.label}
      </p>
      {!compact && (
        <p className="mt-1 text-[9px] tracking-wide text-zinc-500 uppercase">
          {skill.category}
        </p>
      )}
    </div>
  );
}

type OrbitElements = {
  orbitLayer: HTMLElement;
  gridLayer: HTMLElement;
  ring: HTMLElement;
  glow: HTMLElement;
  activeLabel: HTMLElement;
  activeCategory: HTMLElement;
  progressFill: HTMLElement;
  cards: HTMLElement[];
};

function queryOrbitElements(stage: HTMLElement): OrbitElements | null {
  const orbitLayer = stage.querySelector<HTMLElement>('[data-skill-part="orbit-layer"]');
  const gridLayer = stage.querySelector<HTMLElement>('[data-skill-part="grid-layer"]');
  const ring = stage.querySelector<HTMLElement>('[data-skill-part="ring"]');
  const glow = stage.querySelector<HTMLElement>('[data-skill-part="glow"]');
  const activeLabel = stage.querySelector<HTMLElement>('[data-skill-part="active-label"]');
  const activeCategory = stage.querySelector<HTMLElement>(
    '[data-skill-part="active-category"]',
  );
  const progressFill = stage.querySelector<HTMLElement>('[data-skill-part="progress-fill"]');
  const cards = Array.from(
    stage.querySelectorAll<HTMLElement>('[data-skill-part="orbit-card"]'),
  );

  if (
    !orbitLayer ||
    !gridLayer ||
    !ring ||
    !glow ||
    !activeLabel ||
    !activeCategory ||
    !progressFill ||
    cards.length === 0
  ) {
    return null;
  }

  return {
    orbitLayer,
    gridLayer,
    ring,
    glow,
    activeLabel,
    activeCategory,
    progressFill,
    cards,
  };
}

function applyOrbitAnimation(
  elements: OrbitElements,
  progress: number,
  skills: FrontendSkill[],
  onActiveChange: (index: number) => void,
  lastActive: { current: number },
) {
  const count = skills.length;
  const spinT = mapRange(progress, [0.08, 0.72], [0, 1]);
  const gridT = mapRange(progress, [0.72, 0.92], [0, 1]);
  const orbitOpacity = 1 - gridT;
  const gridOpacity = gridT;

  elements.progressFill.style.transform = `scaleX(${progress})`;
  elements.orbitLayer.style.opacity = String(orbitOpacity);
  elements.orbitLayer.style.pointerEvents = gridT > 0.5 ? "none" : "auto";
  elements.gridLayer.style.opacity = String(gridOpacity);
  elements.gridLayer.style.pointerEvents = gridT > 0.5 ? "auto" : "none";

  elements.ring.style.transform = `rotate(${spinT * 360}deg)`;
  elements.ring.style.opacity = String(0.45 * orbitOpacity);
  elements.activeLabel.style.opacity = String(orbitOpacity * mapRange(progress, [0.06, 0.2], [0, 1]));
  elements.activeCategory.style.opacity = String(
    orbitOpacity * mapRange(progress, [0.1, 0.24], [0, 1]),
  );

  const baseRotation = spinT * Math.PI * 2 - Math.PI / 2;
  let activeIndex = 0;
  let bestSpot = 0;

  elements.cards.forEach((card, i) => {
    const slotAngle = (i / count) * Math.PI * 2;
    const angle = slotAngle + baseRotation;
    const x = Math.cos(angle) * ORBIT_RX;
    const y = Math.sin(angle) * ORBIT_RY;

    let angleDiff = Math.abs(angle - Math.PI / 2);
    if (angleDiff > Math.PI) angleDiff = Math.PI * 2 - angleDiff;
    const spotStrength = Math.max(0, 1 - angleDiff / (Math.PI / 2.4));
    const scale = 0.78 + spotStrength * 0.28;
    const opacity = 0.45 + spotStrength * 0.55;

    card.style.transform = `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), 0) scale(${scale})`;
    card.style.opacity = String(opacity);
    card.style.zIndex = String(Math.round(spotStrength * 20));

    const inner = card.querySelector<HTMLElement>(".skill-orbit-card-inner");
    if (inner) {
      const highlighted = spotStrength > 0.62;
      inner.style.borderColor = highlighted
        ? `${skills[i].color}99`
        : "rgba(63, 63, 70, 0.8)";
      inner.style.boxShadow = highlighted
        ? `0 0 28px -6px ${skills[i].color}66, 0 16px 40px -12px rgba(0,0,0,0.55)`
        : `0 16px 40px -12px rgba(0,0,0,0.55), 0 0 0 1px ${skills[i].color}18`;
    }

    if (spotStrength > bestSpot) {
      bestSpot = spotStrength;
      activeIndex = i;
    }
  });

  if (gridT < 0.35 && activeIndex !== lastActive.current) {
    lastActive.current = activeIndex;
    onActiveChange(activeIndex);
  }

  const activeAngle = (activeIndex / count) * Math.PI * 2 + baseRotation;
  const glowX = Math.cos(activeAngle) * ORBIT_RX;
  const glowY = Math.sin(activeAngle) * ORBIT_RY;

  elements.glow.style.transform = `translate3d(calc(-50% + ${glowX}px), calc(-50% + ${glowY}px), 0)`;
  elements.glow.style.opacity = String(0.55 * orbitOpacity * Math.max(bestSpot, 0.35));
  elements.glow.style.backgroundColor = `${skills[activeIndex].color}40`;
}

export default function PortfolioSkillsFan() {
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
    const lastActive = { current: 0 };

    const setup = () => {
      const section = sectionRef.current;
      const stage = stageRef.current;
      if (!section || !stage) {
        retryFrame = requestAnimationFrame(setup);
        return;
      }

      const elements = queryOrbitElements(stage);
      if (!elements) {
        retryFrame = requestAnimationFrame(setup);
        return;
      }

      const run = (progress: number) => {
        applyOrbitAnimation(
          elements,
          progress,
          FRONTEND_SKILLS,
          setActiveIndex,
          lastActive,
        );
      };

      run(getScrollProgress(section));
      cleanup = bindScrollProgress(section, run);
    };

    setup();

    return () => {
      cancelAnimationFrame(retryFrame);
      cleanup?.();
    };
  }, [reducedMotion]);

  const activeSkill = FRONTEND_SKILLS[activeIndex] ?? FRONTEND_SKILLS[0];

  if (reducedMotion) {
    return (
      <section className="px-6 py-24" aria-label="Frontend technology stack">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-3xl font-bold text-white">Core technologies</h2>
          <p className="mt-2 text-center text-sm text-zinc-500">Frontend stack</p>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {FRONTEND_SKILLS.map((skill) => (
              <div key={skill.id} className="w-full">
                <SkillCardFace skill={skill} compact />
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
      className="skill-orbit-track relative h-[360vh] w-full"
      aria-label="Frontend skills orbital carousel"
    >
      <div className="sticky top-0 flex h-svh flex-col items-center justify-center px-4 py-8 sm:px-6">
        <div ref={stageRef} className="relative flex w-full max-w-4xl flex-col items-center">
          <div className="mb-4 text-center">
            <p className="text-xs tracking-[0.3em] text-sky-400/80 uppercase">
              Animation · Orbital carousel
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Core technologies
            </h2>
            <p className="mt-2 text-sm text-zinc-500">
              12 frontend tools · scroll to spin the orbit, then reveal the full grid
            </p>
          </div>

          <div className="mb-3 h-0.5 w-full max-w-md overflow-hidden rounded-full bg-zinc-800">
            <div
              data-skill-part="progress-fill"
              className="h-full origin-left rounded-full bg-linear-to-r from-sky-400 to-[#c5ff3b] will-change-transform"
              style={{ transform: "scaleX(0)" }}
            />
          </div>

          <div
            data-skill-part="active-label"
            className="mb-2 h-12 text-center"
            aria-live="polite"
          >
            <p
              className="text-xl font-bold sm:text-2xl"
              style={{ color: activeSkill.color }}
            >
              {activeSkill.label}
            </p>
            <p
              data-skill-part="active-category"
              className="mt-0.5 text-[10px] tracking-[0.2em] text-zinc-500 uppercase"
            >
              {activeSkill.category}
            </p>
          </div>

          <div
            className="relative w-full max-w-3xl"
            style={{ height: CARD_H * 3 + 48 }}
          >
            <div
              data-skill-part="orbit-layer"
              className="absolute inset-0 will-change-[opacity]"
            >
              <div
                data-skill-part="ring"
                className="pointer-events-none absolute top-1/2 left-1/2 h-[min(72vw,400px)] w-[min(72vw,400px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-zinc-700/80 will-change-transform"
                aria-hidden
              />

              <div
                data-skill-part="glow"
                className="pointer-events-none absolute top-1/2 left-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl will-change-transform"
                style={{ opacity: 0 }}
                aria-hidden
              />

              {FRONTEND_SKILLS.map((skill) => (
                <div
                  key={skill.id}
                  data-skill-part="orbit-card"
                  className="absolute top-1/2 left-1/2 will-change-transform"
                  style={{ width: CARD_W }}
                >
                  <SkillCardFace skill={skill} />
                </div>
              ))}
            </div>

            <div
              data-skill-part="grid-layer"
              className="absolute inset-0 flex items-center justify-center opacity-0 will-change-[opacity]"
            >
              <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
                {FRONTEND_SKILLS.map((skill) => (
                  <div key={`grid-${skill.id}`} className="min-w-0">
                    <SkillCardFace skill={skill} compact />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
