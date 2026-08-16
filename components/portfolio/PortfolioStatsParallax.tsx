"use client";

import { STATS } from "@/lib/portfolioData";
import { applyLinkedLayers, type LinkedLayer } from "@/lib/linkedScrollAnimations";
import {
  bindScrollProgress,
  mapRange,
} from "@/lib/scrollProgress";
import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

function animateCounter(
  element: HTMLElement,
  target: number,
  suffix: string,
  progress: number,
) {
  const value = Math.round(mapRange(progress, [0.2, 0.85], [0, target]));
  element.textContent = `${value}${suffix}`;
}

export default function PortfolioStatsParallax() {
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

      const blobBack = stage.querySelector<HTMLElement>('[data-stat-part="blob-back"]');
      const blobFront = stage.querySelector<HTMLElement>('[data-stat-part="blob-front"]');
      const ring = stage.querySelector<HTMLElement>('[data-stat-part="ring"]');
      const headline = stage.querySelector<HTMLElement>('[data-stat-part="headline"]');
      const counters = Array.from(
        stage.querySelectorAll<HTMLElement>('[data-stat-part="counter"]'),
      );

      if (!blobBack || !blobFront || !ring || !headline || counters.length === 0) {
        retryFrame = requestAnimationFrame(setup);
        return;
      }

      const layers: LinkedLayer[] = [
        {
          element: blobBack,
          config: {
            translateY: { input: [0, 1], output: [120, -100] },
            opacity: { input: [0, 0.15, 0.85, 1], output: [0, 0.35, 0.35, 0.12] },
          },
        },
        {
          element: blobFront,
          config: {
            translateY: { input: [0, 1], output: [-80, 140] },
            translateX: { input: [0, 1], output: [-40, 60] },
            opacity: { input: [0, 0.2, 0.8, 1], output: [0, 0.4, 0.4, 0.15] },
          },
        },
        {
          element: ring,
          config: {
            rotate: { input: [0, 1], output: [-30, 40] },
            scale: { input: [0, 0.5, 1], output: [0.7, 1, 0.85] },
            opacity: { input: [0, 0.2, 0.8, 1], output: [0, 0.55, 0.55, 0.2] },
          },
        },
        {
          element: headline,
          config: {
            translateY: { input: [0, 0.3, 0.7, 1], output: [40, 0, -8, -40] },
            opacity: { input: [0, 0.15, 0.85, 1], output: [0, 1, 1, 0.3] },
          },
        },
      ];

      cleanup = bindScrollProgress(section, (progress) => {
        applyLinkedLayers(progress, layers);

        counters.forEach((counter, i) => {
          const stat = STATS[i];
          if (stat) {
            animateCounter(counter, stat.value, stat.suffix, progress);
          }
        });
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
      <section id="ops" className="px-6 py-24 lg:pl-20" aria-label="Career statistics">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="atlas-ticket p-6 text-center">
              <p className="font-display text-3xl font-bold text-route">
                {stat.value}
                {stat.suffix}
              </p>
              <p className="mt-2 font-mono text-[10px] tracking-wide text-muted uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="ops"
      className="relative h-[320vh] w-full"
      aria-label="Linked parallax statistics"
    >
      <div className="sticky top-0 flex h-svh items-center justify-center px-6 lg:pl-20">
        <div ref={stageRef} className="relative flex h-full w-full max-w-4xl items-center justify-center">
          <div
            data-stat-part="blob-back"
            className="pointer-events-none absolute top-[20%] left-[15%] h-56 w-56 rounded-full bg-route/15 blur-3xl will-change-transform"
            aria-hidden
          />
          <div
            data-stat-part="blob-front"
            className="pointer-events-none absolute right-[12%] bottom-[25%] h-40 w-40 rounded-full bg-stamp/10 blur-2xl will-change-transform"
            aria-hidden
          />
          <div
            data-stat-part="ring"
            className="pointer-events-none absolute inset-0 m-auto h-[min(70vw,480px)] w-[min(70vw,480px)] rounded-full border border-dashed border-grid will-change-transform"
            aria-hidden
          />

          <div className="relative z-10 w-full">
            <div data-stat-part="headline" className="mb-12 text-center will-change-transform">
              <p className="atlas-label">Ops</p>
              <h2 className="font-display mt-3 text-3xl font-bold text-ink uppercase sm:text-4xl">
                By the numbers
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="atlas-ticket p-5 text-center sm:p-6"
                >
                  <p
                    data-stat-part="counter"
                    className="font-display text-3xl font-bold tabular-nums text-route sm:text-4xl"
                  >
                    0{stat.suffix}
                  </p>
                  <p className="mt-2 font-mono text-[10px] tracking-wide text-muted uppercase sm:text-xs">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
