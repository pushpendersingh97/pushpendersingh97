"use client";

import { PATIENT_JOURNEY_STEPS } from "@/lib/effectsData";
import {
  bindScrollProgress,
  mapRange,
  prefersReducedMotion,
} from "@/lib/scrollProgress";
import { useEffect, useRef, useState } from "react";

const LIME = "#c5ff3b";
const PATH_D = "M 48 200 Q 120 160 180 140 T 340 80";

export default function EffectsPatientJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const nodeRefs = useRef<(HTMLElement | null)[]>([]);
  const labelRef = useRef<HTMLParagraphElement>(null);
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
      const path = pathRef.current;
      const label = labelRef.current;
      if (!section || !path || !label) {
        retryFrame = requestAnimationFrame(setup);
        return;
      }

      const length = path.getTotalLength();
      path.style.strokeDasharray = String(length);

      cleanup = bindScrollProgress(section, (progress) => {
        path.style.strokeDashoffset = String(length * (1 - progress));

        const activeIndex = Math.min(
          PATIENT_JOURNEY_STEPS.length - 1,
          Math.floor(progress * PATIENT_JOURNEY_STEPS.length + 0.001),
        );
        const step = PATIENT_JOURNEY_STEPS[activeIndex];
        label.textContent = step.detail;

        nodeRefs.current.forEach((node, index) => {
          if (!node) return;
          const lit = progress >= (index + 0.35) / PATIENT_JOURNEY_STEPS.length;
          const active = index === activeIndex;
          node.style.backgroundColor = lit ? LIME : "#3f3f46";
          node.style.transform = active ? "scale(1.35)" : lit ? "scale(1.15)" : "scale(1)";
          node.style.boxShadow = active
            ? `0 0 0 4px ${LIME}33, 0 0 20px ${LIME}55`
            : "none";
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
      <section className="px-6 py-24" aria-label="Patient journey map">
        <ol className="mx-auto max-w-md space-y-4">
          {PATIENT_JOURNEY_STEPS.map((step) => (
            <li key={step.id} className="rounded-xl border border-zinc-800 p-4">
              <p className="font-semibold text-white">{step.label}</p>
              <p className="text-sm text-zinc-500">{step.detail}</p>
            </li>
          ))}
        </ol>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-[360vh] w-full bg-zinc-50 text-zinc-900"
      aria-label="Scroll-driven patient journey map"
    >
      <div className="sticky top-0 flex h-svh flex-col items-center justify-center px-6">
        <p className="text-xs tracking-[0.25em] text-zinc-500 uppercase">
          TMTC · Patient journey
        </p>
        <p
          ref={labelRef}
          className="mt-3 min-h-[2.5rem] max-w-md text-center text-sm text-zinc-600"
        >
          {PATIENT_JOURNEY_STEPS[0].detail}
        </p>

        <div className="relative mt-6 w-full max-w-lg">
          <svg viewBox="0 0 400 240" className="h-auto w-full" aria-hidden>
            <path
              ref={pathRef}
              d={PATH_D}
              fill="none"
              stroke={LIME}
              strokeWidth="4"
              strokeLinecap="round"
              className="will-change-[stroke-dashoffset]"
            />
          </svg>

          {PATIENT_JOURNEY_STEPS.map((step, index) => (
            <div
              key={step.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${step.x}%`, top: `${step.y}%` }}
            >
              <div
                ref={(el) => {
                  nodeRefs.current[index] = el;
                }}
                className="mx-auto h-4 w-4 rounded-full bg-zinc-300 transition-[transform,box-shadow] will-change-transform"
              />
              <p className="mt-2 text-center text-[10px] font-semibold uppercase tracking-wide text-zinc-700">
                {step.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
