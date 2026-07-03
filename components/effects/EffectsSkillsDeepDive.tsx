"use client";

import { SKILLS_DEEP_DIVE } from "@/lib/effectsData";
import {
  bindScrollProgress,
  mapRange,
  prefersReducedMotion,
} from "@/lib/scrollProgress";
import { useEffect, useRef, useState } from "react";

type DeepDiveElements = {
  navItems: HTMLElement[];
  panel: HTMLElement;
  headline: HTMLElement;
  body: HTMLElement;
  bullets: HTMLElement[];
};

function queryElements(stage: HTMLElement): DeepDiveElements | null {
  const navItems = Array.from(
    stage.querySelectorAll<HTMLElement>('[data-sd-part="nav-item"]'),
  );
  const panel = stage.querySelector<HTMLElement>('[data-sd-part="panel"]');
  const headline = stage.querySelector<HTMLElement>('[data-sd-part="headline"]');
  const body = stage.querySelector<HTMLElement>('[data-sd-part="body"]');
  const bullets = Array.from(
    stage.querySelectorAll<HTMLElement>('[data-sd-part="bullet"]'),
  );

  if (!panel || !headline || !body || navItems.length === 0 || bullets.length === 0) {
    return null;
  }

  return { navItems, panel, headline, body, bullets };
}

function applyDeepDiveStyles(
  elements: DeepDiveElements,
  progress: number,
  onActiveChange: (index: number) => void,
  lastActive: { current: number },
) {
  const count = SKILLS_DEEP_DIVE.length;
  const segmentSize = 1 / count;
  const activeIndex = Math.min(count - 1, Math.floor(progress * count + 0.001));
  const local = mapRange(
    progress,
    [activeIndex * segmentSize, (activeIndex + 1) * segmentSize],
    [0, 1],
  );

  elements.navItems.forEach((item, index) => {
    const active = index === activeIndex;
    const skill = SKILLS_DEEP_DIVE[index];
    item.style.opacity = String(active ? 1 : 0.4);
    item.style.borderLeftColor = active ? skill.color : "transparent";
    item.style.color = active ? "#ffffff" : "#71717a";
  });

  elements.panel.style.borderColor = `${SKILLS_DEEP_DIVE[activeIndex].color}44`;
  elements.panel.style.opacity = String(mapRange(local, [0, 0.15, 0.85, 1], [0.5, 1, 1, 0.5]));
  elements.panel.style.transform = `translateY(${mapRange(local, [0, 0.2], [16, 0])}px)`;

  if (activeIndex !== lastActive.current) {
    lastActive.current = activeIndex;
    onActiveChange(activeIndex);
  }
}

export default function EffectsSkillsDeepDive() {
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

      const elements = queryElements(stage);
      if (!elements) {
        retryFrame = requestAnimationFrame(setup);
        return;
      }

      cleanup = bindScrollProgress(section, (progress) => {
        applyDeepDiveStyles(elements, progress, setActiveIndex, lastActive);
      });
    };

    setup();
    return () => {
      cancelAnimationFrame(retryFrame);
      cleanup?.();
    };
  }, [reducedMotion]);

  const skill = SKILLS_DEEP_DIVE[activeIndex];

  if (reducedMotion) {
    return (
      <section className="px-6 py-24" aria-label="Skills deep dive">
        <div className="mx-auto max-w-2xl space-y-6">
          {SKILLS_DEEP_DIVE.map((s) => (
            <article
              key={s.id}
              className="rounded-2xl border border-zinc-800 p-6"
              style={{ borderLeftColor: s.color, borderLeftWidth: 3 }}
            >
              <h2 className="text-xl font-bold text-white">{s.headline}</h2>
              <p className="mt-2 text-sm text-zinc-400">{s.body}</p>
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
      aria-label="Scroll-driven skills deep dive"
    >
      <div className="sticky top-0 flex h-svh items-center justify-center px-6">
        <div
          ref={stageRef}
          className="grid w-full max-w-4xl gap-8 md:grid-cols-[200px_1fr]"
        >
          <nav className="flex flex-row gap-2 overflow-x-auto md:flex-col md:gap-1">
            {SKILLS_DEEP_DIVE.map((s) => (
              <button
                key={s.id}
                type="button"
                data-sd-part="nav-item"
                className="shrink-0 border-l-2 px-3 py-2 text-left text-sm font-medium transition-colors will-change-[opacity,color,border-color]"
                style={{ opacity: 0.4, color: "#71717a", borderLeftColor: "transparent" }}
              >
                {s.label}
              </button>
            ))}
          </nav>

          <div
            data-sd-part="panel"
            className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 will-change-[opacity,transform,border-color]"
          >
            <p className="text-xs tracking-[0.2em] uppercase" style={{ color: skill.color }}>
              {skill.label}
            </p>
            <h2
              data-sd-part="headline"
              className="mt-3 text-2xl font-bold text-white sm:text-3xl"
            >
              {skill.headline}
            </h2>
            <p data-sd-part="body" className="mt-4 text-sm leading-relaxed text-zinc-400">
              {skill.body}
            </p>
            <ul className="mt-6 space-y-2">
              {skill.bullets.map((bullet, i) => (
                <li
                  key={bullet}
                  data-sd-part="bullet"
                  className="flex gap-2 text-sm text-zinc-500"
                >
                  <span style={{ color: skill.color }}>{String(i + 1).padStart(2, "0")}</span>
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
