"use client";

import {
  bindScrollProgress,
  mapRange,
  prefersReducedMotion,
} from "@/lib/scrollProgress";
import { applyLinkedLayers, type LinkedLayer } from "@/lib/linkedScrollAnimations";
import { useEffect, useRef, useState } from "react";

const LIME = "#c5ff3b";

type ParallaxElements = {
  blobBack: HTMLElement;
  blobMid: HTMLElement;
  blobFront: HTMLElement;
  ringOuter: HTMLElement;
  ringInner: HTMLElement;
  headline: HTMLElement;
  subcopy: HTMLElement;
  cardLeft: HTMLElement;
  cardCenter: HTMLElement;
  cardRight: HTMLElement;
  progressBar: HTMLElement;
  progressLabel: HTMLElement;
  floatA: HTMLElement;
  floatB: HTMLElement;
};

function queryParallaxElements(stage: HTMLElement): ParallaxElements | null {
  const blobBack = stage.querySelector<HTMLElement>('[data-parallax="blob-back"]');
  const blobMid = stage.querySelector<HTMLElement>('[data-parallax="blob-mid"]');
  const blobFront = stage.querySelector<HTMLElement>('[data-parallax="blob-front"]');
  const ringOuter = stage.querySelector<HTMLElement>('[data-parallax="ring-outer"]');
  const ringInner = stage.querySelector<HTMLElement>('[data-parallax="ring-inner"]');
  const headline = stage.querySelector<HTMLElement>('[data-parallax="headline"]');
  const subcopy = stage.querySelector<HTMLElement>('[data-parallax="subcopy"]');
  const cardLeft = stage.querySelector<HTMLElement>('[data-parallax="card-left"]');
  const cardCenter = stage.querySelector<HTMLElement>('[data-parallax="card-center"]');
  const cardRight = stage.querySelector<HTMLElement>('[data-parallax="card-right"]');
  const progressBar = stage.querySelector<HTMLElement>('[data-parallax="progress-bar"]');
  const progressLabel = stage.querySelector<HTMLElement>(
    '[data-parallax="progress-label"]',
  );
  const floatA = stage.querySelector<HTMLElement>('[data-parallax="float-a"]');
  const floatB = stage.querySelector<HTMLElement>('[data-parallax="float-b"]');

  if (
    !blobBack ||
    !blobMid ||
    !blobFront ||
    !ringOuter ||
    !ringInner ||
    !headline ||
    !subcopy ||
    !cardLeft ||
    !cardCenter ||
    !cardRight ||
    !progressBar ||
    !progressLabel ||
    !floatA ||
    !floatB
  ) {
    return null;
  }

  return {
    blobBack,
    blobMid,
    blobFront,
    ringOuter,
    ringInner,
    headline,
    subcopy,
    cardLeft,
    cardCenter,
    cardRight,
    progressBar,
    progressLabel,
    floatA,
    floatB,
  };
}

function buildLinkedLayers(elements: ParallaxElements): LinkedLayer[] {
  return [
    {
      element: elements.blobBack,
      config: {
        translateY: { input: [0, 1], output: [80, -120] },
        scale: { input: [0, 0.5, 1], output: [0.85, 1.05, 1.15] },
        opacity: { input: [0, 0.15, 0.85, 1], output: [0, 0.35, 0.35, 0.15] },
      },
    },
    {
      element: elements.blobMid,
      config: {
        translateY: { input: [0, 1], output: [120, -180] },
        translateX: { input: [0, 1], output: [-40, 60] },
        scale: { input: [0, 0.6, 1], output: [0.9, 1.1, 1.2] },
        opacity: { input: [0, 0.12, 0.9, 1], output: [0, 0.5, 0.5, 0.2] },
      },
    },
    {
      element: elements.blobFront,
      config: {
        translateY: { input: [0, 1], output: [160, -240] },
        translateX: { input: [0, 1], output: [50, -80] },
        scale: { input: [0, 0.4, 1], output: [0.95, 1.15, 1.25] },
        opacity: { input: [0, 0.1, 0.88, 1], output: [0, 0.55, 0.55, 0.25] },
      },
    },
    {
      element: elements.ringOuter,
      config: {
        rotate: { input: [0, 1], output: [-18, 22] },
        scale: { input: [0, 0.35, 0.7, 1], output: [0.6, 1, 1.08, 0.92] },
        opacity: { input: [0, 0.2, 0.75, 1], output: [0, 0.7, 0.7, 0.3] },
      },
    },
    {
      element: elements.ringInner,
      config: {
        rotate: { input: [0, 1], output: [24, -30] },
        scale: { input: [0, 0.4, 0.8, 1], output: [0.5, 0.95, 1.05, 0.88] },
        opacity: { input: [0, 0.18, 0.8, 1], output: [0, 0.85, 0.85, 0.35] },
      },
    },
    {
      element: elements.floatA,
      config: {
        translateY: { input: [0, 0.5, 1], output: [100, -40, -200] },
        translateX: { input: [0, 1], output: [-20, 30] },
        rotate: { input: [0, 1], output: [-12, 18] },
        opacity: { input: [0, 0.15, 0.7, 1], output: [0, 1, 1, 0.4] },
      },
    },
    {
      element: elements.floatB,
      config: {
        translateY: { input: [0, 0.5, 1], output: [140, 20, -160] },
        translateX: { input: [0, 1], output: [30, -50] },
        rotate: { input: [0, 1], output: [10, -16] },
        opacity: { input: [0, 0.2, 0.75, 1], output: [0, 1, 1, 0.35] },
      },
    },
    {
      element: elements.headline,
      config: {
        translateY: { input: [0, 0.25, 0.55, 0.85], output: [60, 0, -20, -80] },
        scale: { input: [0, 0.2, 0.5, 0.85], output: [0.88, 1, 1.04, 0.92] },
        opacity: { input: [0, 0.12, 0.7, 1], output: [0, 1, 1, 0.25] },
      },
    },
    {
      element: elements.subcopy,
      config: {
        translateY: { input: [0, 0.3, 0.6, 0.9], output: [80, 10, -10, -60] },
        opacity: { input: [0, 0.18, 0.65, 1], output: [0, 1, 1, 0.2] },
      },
    },
    {
      element: elements.cardLeft,
      config: {
        translateY: { input: [0, 0.35, 0.65, 1], output: [180, 40, -30, -140] },
        translateX: { input: [0, 0.4, 0.7, 1], output: [-80, -48, -32, -20] },
        rotate: { input: [0, 0.5, 1], output: [-14, -8, -4] },
        opacity: { input: [0, 0.22, 0.72, 1], output: [0, 1, 1, 0.3] },
      },
    },
    {
      element: elements.cardCenter,
      config: {
        translateY: { input: [0, 0.3, 0.6, 1], output: [200, 50, -10, -120] },
        scale: { input: [0, 0.35, 0.65, 1], output: [0.9, 1.06, 1.02, 0.94] },
        opacity: { input: [0, 0.2, 0.75, 1], output: [0, 1, 1, 0.35] },
      },
    },
    {
      element: elements.cardRight,
      config: {
        translateY: { input: [0, 0.38, 0.68, 1], output: [160, 30, -40, -150] },
        translateX: { input: [0, 0.42, 0.72, 1], output: [80, 48, 32, 20] },
        rotate: { input: [0, 0.5, 1], output: [14, 8, 4] },
        opacity: { input: [0, 0.24, 0.74, 1], output: [0, 1, 1, 0.3] },
      },
    },
  ];
}

function applyProgressChrome(
  elements: Pick<ParallaxElements, "progressBar" | "progressLabel">,
  progress: number,
) {
  const barScale = mapRange(progress, [0, 1], [0, 1]);
  const labelOpacity = mapRange(progress, [0, 0.08, 0.92, 1], [0.4, 1, 1, 0.5]);

  elements.progressBar.style.transform = `scaleX(${barScale})`;
  elements.progressLabel.textContent = `${Math.round(progress * 100)}%`;
  elements.progressLabel.style.opacity = String(labelOpacity);
}

export default function ScrollLinkedParallax() {
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

      const elements = queryParallaxElements(stage);
      if (!elements) {
        retryFrame = requestAnimationFrame(setup);
        return;
      }

      const layers = buildLinkedLayers(elements);

      cleanup = bindScrollProgress(section, (progress) => {
        applyLinkedLayers(progress, layers);
        applyProgressChrome(elements, progress);
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
      <section
        className="w-full bg-zinc-50 px-6 py-24"
        aria-label="Linked care layers"
      >
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-10 text-center">
          <div>
            <h2 className="font-serif text-3xl tracking-tight text-zinc-900">
              Every layer moves together
            </h2>
            <p className="mt-4 text-sm text-zinc-500">
              Background, cards, and copy share one scroll timeline — depth
              comes from different speeds, not separate triggers.
            </p>
          </div>
          <div className="grid w-full max-w-xl grid-cols-3 gap-4">
            {["Intake", "Records", "Care plan"].map((label) => (
              <div
                key={label}
                className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm"
              >
                <p className="text-xs font-medium tracking-wide text-zinc-400">
                  {label}
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
      className="scroll-linked-parallax relative h-[380vh] w-full bg-zinc-50"
      aria-label="Linked parallax scroll section"
    >
      <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden px-6">
        <div
          ref={stageRef}
          className="relative flex h-full w-full max-w-4xl items-center justify-center"
        >
          <div
            data-parallax="blob-back"
            className="pointer-events-none absolute top-1/4 left-1/4 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-3xl will-change-transform"
            style={{ backgroundColor: `${LIME}33` }}
            aria-hidden
          />
          <div
            data-parallax="blob-mid"
            className="pointer-events-none absolute top-1/3 right-1/4 h-48 w-48 translate-x-1/2 rounded-full opacity-0 blur-2xl will-change-transform"
            style={{ backgroundColor: "#8b451322" }}
            aria-hidden
          />
          <div
            data-parallax="blob-front"
            className="pointer-events-none absolute bottom-1/4 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full opacity-0 blur-3xl will-change-transform"
            style={{ backgroundColor: `${LIME}44` }}
            aria-hidden
          />

          <div
            data-parallax="ring-outer"
            className="pointer-events-none absolute inset-0 m-auto h-[min(72vw,520px)] w-[min(72vw,520px)] rounded-full border border-dashed border-zinc-300 opacity-0 will-change-transform"
            aria-hidden
          />
          <div
            data-parallax="ring-inner"
            className="pointer-events-none absolute inset-0 m-auto h-[min(52vw,380px)] w-[min(52vw,380px)] rounded-full border border-zinc-200 opacity-0 will-change-transform"
            aria-hidden
          />

          <div
            data-parallax="float-a"
            className="pointer-events-none absolute top-[18%] right-[12%] flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-200 bg-white text-lg opacity-0 shadow-sm will-change-transform"
            aria-hidden
          >
            +
          </div>
          <div
            data-parallax="float-b"
            className="pointer-events-none absolute bottom-[22%] left-[10%] flex h-10 w-10 items-center justify-center rounded-full opacity-0 will-change-transform"
            style={{ backgroundColor: LIME }}
            aria-hidden
          />

          <div className="relative z-10 flex w-full flex-col items-center text-center">
            <h2
              data-parallax="headline"
              className="max-w-xl font-serif text-3xl tracking-tight text-zinc-900 opacity-0 will-change-transform sm:text-4xl md:text-5xl"
            >
              Every layer moves together
            </h2>
            <p
              data-parallax="subcopy"
              className="mt-5 max-w-md text-sm leading-relaxed text-zinc-500 opacity-0 will-change-transform sm:text-base"
            >
              One scroll progress drives background drift, ring rotation, card
              depth, and copy — linked parallax, not independent animations.
            </p>

            <div className="relative mt-14 flex w-full max-w-lg items-end justify-center">
              <div
                data-parallax="card-left"
                className="absolute bottom-0 left-0 w-[28%] opacity-0 will-change-transform"
              >
                <ParallaxCard label="Intake" step="01" tilt="left" />
              </div>
              <div
                data-parallax="card-center"
                className="relative z-10 w-[34%] opacity-0 will-change-transform"
              >
                <ParallaxCard label="Records" step="02" featured />
              </div>
              <div
                data-parallax="card-right"
                className="absolute bottom-0 right-0 w-[28%] opacity-0 will-change-transform"
              >
                <ParallaxCard label="Care plan" step="03" tilt="right" />
              </div>
            </div>
          </div>

          <div className="absolute right-0 bottom-8 left-0 mx-auto w-full max-w-md px-2">
            <div className="flex items-center justify-between text-[10px] tracking-[0.2em] text-zinc-400 uppercase">
              <span>Scroll linked</span>
              <span
                data-parallax="progress-label"
                className="tabular-nums"
              >
                0%
              </span>
            </div>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-zinc-200">
              <div
                data-parallax="progress-bar"
                className="h-full origin-left rounded-full will-change-transform"
                style={{
                  backgroundColor: LIME,
                  transform: "scaleX(0)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ParallaxCard({
  label,
  step,
  featured,
  tilt,
}: {
  label: string;
  step: string;
  featured?: boolean;
  tilt?: "left" | "right";
}) {
  return (
    <div
      className={`rounded-2xl border bg-white p-4 shadow-[0_16px_40px_-20px_rgba(0,0,0,0.25)] ${
        featured ? "border-zinc-900 py-6" : "border-zinc-200"
      }`}
    >
      <p className="text-[10px] font-semibold tracking-[0.15em] text-zinc-400">
        {step}
      </p>
      <p
        className={`mt-2 font-medium text-zinc-900 ${featured ? "text-base" : "text-sm"}`}
      >
        {label}
      </p>
      {tilt && (
        <div
          className={`mt-3 h-1 w-8 rounded-full ${tilt === "left" ? "ml-0" : "ml-auto"}`}
          style={{ backgroundColor: LIME }}
        />
      )}
    </div>
  );
}
