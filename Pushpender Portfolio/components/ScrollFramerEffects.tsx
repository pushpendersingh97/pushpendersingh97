"use client";

import { useLinkedMotionProgress } from "@/hooks/useLinkedMotionProgress";
import { prefersReducedMotion } from "@/lib/scrollProgress";
import {
  motion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const LIME = "#c5ff3b";

const PROVIDERS = {
  left: {
    src: "/providers/left.jpg",
    alt: "Healthcare provider portrait",
    label: "Intake",
    step: "01",
  },
  center: {
    src: "/providers/center.jpg",
    alt: "Healthcare provider holding a tablet",
    label: "Records",
    step: "02",
  },
  right: {
    src: "/providers/right.jpg",
    alt: "Healthcare provider portrait",
    label: "Care plan",
    step: "03",
  },
} as const;

const EFFECTS = [
  { id: "parallax-y", label: "Parallax Y" },
  { id: "parallax-xy", label: "Parallax XY" },
  { id: "scale", label: "Scale" },
  { id: "rotate", label: "Rotate" },
  { id: "opacity", label: "Opacity" },
  { id: "slide-x", label: "Slide X" },
  { id: "blur", label: "Blur" },
] as const;

function LinkedEffectLabels({ progress }: { progress: MotionValue<number> }) {
  const labelOpacity = useTransform(progress, [0, 0.12, 0.88, 1], [0.35, 1, 1, 0.45]);

  return (
    <motion.div
      className="mt-8 flex flex-wrap justify-center gap-2"
      style={{ opacity: labelOpacity }}
    >
      {EFFECTS.map((effect) => (
        <span
          key={effect.id}
          className="rounded-full border border-zinc-200 bg-white/80 px-3 py-1 text-[10px] tracking-wide text-zinc-500 uppercase backdrop-blur-sm"
        >
          {effect.label}
        </span>
      ))}
    </motion.div>
  );
}

function ScrollFramerStage({ progress }: { progress: MotionValue<number> }) {
  const blobBackY = useTransform(progress, [0, 1], [140, -180]);
  const blobBackOpacity = useTransform(
    progress,
    [0, 0.12, 0.85, 1],
    [0, 0.35, 0.35, 0.12],
  );

  const backImageY = useTransform(progress, [0, 1], [80, -120]);
  const backImageScale = useTransform(progress, [0, 0.5, 1], [1.15, 1.05, 1.2]);
  const backImageOpacity = useTransform(progress, [0, 0.1, 0.8, 1], [0, 0.18, 0.18, 0.08]);

  const blobMidY = useTransform(progress, [0, 1], [-100, 160]);
  const blobMidX = useTransform(progress, [0, 1], [-70, 90]);
  const blobMidOpacity = useTransform(
    progress,
    [0, 0.15, 0.82, 1],
    [0, 0.45, 0.45, 0.15],
  );

  const floatLeftY = useTransform(progress, [0, 0.5, 1], [90, -20, -160]);
  const floatLeftX = useTransform(progress, [0, 1], [-30, 40]);
  const floatLeftRotate = useTransform(progress, [0, 1], [-10, 14]);
  const floatLeftOpacity = useTransform(progress, [0, 0.16, 0.78, 1], [0, 1, 1, 0.35]);

  const floatRightY = useTransform(progress, [0, 0.5, 1], [110, 10, -140]);
  const floatRightX = useTransform(progress, [0, 1], [40, -50]);
  const floatRightRotate = useTransform(progress, [0, 1], [12, -16]);
  const floatRightOpacity = useTransform(progress, [0, 0.18, 0.8, 1], [0, 1, 1, 0.3]);

  const ringRotate = useTransform(progress, [0, 1], [-28, 32]);
  const ringScale = useTransform(progress, [0, 0.4, 0.75, 1], [0.65, 1, 1.06, 0.9]);
  const ringOpacity = useTransform(progress, [0, 0.18, 0.8, 1], [0, 0.75, 0.75, 0.3]);

  const headlineY = useTransform(progress, [0, 0.28, 0.72, 1], [56, 0, -8, -72]);
  const headlineOpacity = useTransform(
    progress,
    [0, 0.14, 0.78, 1],
    [0, 1, 1, 0.25],
  );

  const cardScale = useTransform(
    progress,
    [0, 0.32, 0.62, 1],
    [0.82, 1.08, 1.02, 0.88],
  );
  const cardLeftX = useTransform(progress, [0, 0.38, 0.72, 1], [-120, -48, -28, -8]);
  const cardLeftRotate = useTransform(progress, [0, 0.5, 1], [-12, -6, -2]);
  const cardRightX = useTransform(progress, [0, 0.38, 0.72, 1], [120, 48, 28, 8]);
  const cardRightRotate = useTransform(progress, [0, 0.5, 1], [12, 6, 2]);
  const cardsOpacity = useTransform(progress, [0, 0.2, 0.76, 1], [0, 1, 1, 0.35]);

  const centerImageY = useTransform(progress, [0, 1], [24, -24]);

  const blurPx = useTransform(progress, [0, 0.32, 0.58, 1], [16, 0, 0, 12]);
  const backdropBlur = useTransform(blurPx, (value) => `blur(${value}px)`);

  const progressScaleX = useTransform(progress, [0, 1], [0, 1]);
  const progressPercent = useTransform(progress, [0, 1], [0, 100]);
  const progressText = useTransform(progressPercent, (value) => `${Math.round(value)}%`);

  return (
    <div className="relative flex h-full w-full max-w-5xl items-center justify-center">
      <motion.div
        className="pointer-events-none absolute inset-0 overflow-hidden will-change-transform"
        style={{
          y: backImageY,
          scale: backImageScale,
          opacity: backImageOpacity,
        }}
        aria-hidden
      >
        <Image
          src={PROVIDERS.center.src}
          alt=""
          fill
          sizes="100vw"
          className="scale-110 object-cover object-top opacity-80 blur-sm"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-zinc-50/90 via-zinc-50/70 to-zinc-50/95" />
      </motion.div>

      <motion.div
        className="pointer-events-none absolute top-[20%] left-[18%] h-56 w-56 rounded-full blur-3xl will-change-transform"
        style={{
          y: blobBackY,
          opacity: blobBackOpacity,
          backgroundColor: `${LIME}33`,
        }}
        aria-hidden
      />

      <motion.div
        className="pointer-events-none absolute top-[28%] right-[16%] h-44 w-44 rounded-full blur-2xl will-change-transform"
        style={{
          y: blobMidY,
          x: blobMidX,
          opacity: blobMidOpacity,
          backgroundColor: "#8b451326",
        }}
        aria-hidden
      />

      <motion.div
        className="pointer-events-none absolute top-[14%] left-[8%] h-16 w-16 overflow-hidden rounded-2xl border-2 border-white shadow-lg will-change-transform sm:h-20 sm:w-20"
        style={{
          y: floatLeftY,
          x: floatLeftX,
          rotate: floatLeftRotate,
          opacity: floatLeftOpacity,
        }}
        aria-hidden
      >
        <Image
          src={PROVIDERS.left.src}
          alt=""
          fill
          sizes="80px"
          className="object-cover object-top"
        />
      </motion.div>

      <motion.div
        className="pointer-events-none absolute right-[8%] bottom-[28%] h-14 w-14 overflow-hidden rounded-full border-2 border-white shadow-lg will-change-transform sm:h-16 sm:w-16"
        style={{
          y: floatRightY,
          x: floatRightX,
          rotate: floatRightRotate,
          opacity: floatRightOpacity,
        }}
        aria-hidden
      >
        <Image
          src={PROVIDERS.right.src}
          alt=""
          fill
          sizes="64px"
          className="object-cover object-top"
        />
      </motion.div>

      <motion.div
        className="pointer-events-none absolute inset-0 m-auto h-[min(72vw,520px)] w-[min(72vw,520px)] rounded-full border border-dashed border-zinc-300 will-change-transform"
        style={{
          rotate: ringRotate,
          scale: ringScale,
          opacity: ringOpacity,
        }}
        aria-hidden
      />

      <motion.div
        className="pointer-events-none absolute inset-0 z-20 bg-white/5 will-change-transform"
        style={{
          backdropFilter: backdropBlur,
          WebkitBackdropFilter: backdropBlur,
        }}
        aria-hidden
      />

      <div className="relative z-10 flex w-full flex-col items-center text-center">
        <motion.h2
          className="max-w-xl font-serif text-3xl tracking-tight text-zinc-900 will-change-transform sm:text-4xl md:text-5xl"
          style={{ y: headlineY, opacity: headlineOpacity }}
        >
          Your care team, in motion
        </motion.h2>
        <motion.p
          className="mt-5 max-w-md text-sm leading-relaxed text-zinc-500 will-change-transform sm:text-base"
          style={{ y: headlineY, opacity: headlineOpacity }}
        >
          Provider photos drive every linked effect — parallax layers, scale,
          rotation, fade, slide, and blur all follow one scroll timeline.
        </motion.p>

        <LinkedEffectLabels progress={progress} />

        <motion.div
          className="relative mt-10 flex h-[220px] w-full max-w-2xl items-end justify-center sm:h-[260px] md:h-[300px] will-change-transform"
          style={{ scale: cardScale, opacity: cardsOpacity }}
        >
          <motion.div
            className="absolute bottom-0 left-0 w-[30%] max-w-[160px] will-change-transform"
            style={{ x: cardLeftX, rotate: cardLeftRotate }}
          >
            <ProviderImageCard provider="left" />
          </motion.div>

          <div className="relative z-10 w-[38%] max-w-[200px]">
            <ProviderImageCard provider="center" featured imageY={centerImageY} />
          </div>

          <motion.div
            className="absolute bottom-0 right-0 w-[30%] max-w-[160px] will-change-transform"
            style={{ x: cardRightX, rotate: cardRightRotate }}
          >
            <ProviderImageCard provider="right" />
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute right-0 bottom-8 left-0 z-30 mx-auto w-full max-w-md px-2">
        <div className="flex items-center justify-between text-[10px] tracking-[0.2em] text-zinc-400 uppercase">
          <span>Linked progress</span>
          <motion.span className="tabular-nums">{progressText}</motion.span>
        </div>
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-zinc-200/80">
          <motion.div
            className="h-full origin-left rounded-full will-change-transform"
            style={{
              scaleX: progressScaleX,
              backgroundColor: LIME,
            }}
          />
        </div>
      </div>
    </div>
  );
}

function ProviderImageCard({
  provider,
  featured,
  imageY,
}: {
  provider: keyof typeof PROVIDERS;
  featured?: boolean;
  imageY?: MotionValue<number>;
}) {
  const { src, alt, label, step } = PROVIDERS[provider];

  return (
    <div
      className={`overflow-hidden rounded-[1.25rem] border-[5px] border-white bg-[#d4b896] shadow-[0_20px_50px_-16px_rgba(0,0,0,0.35)] ${
        featured ? "rounded-3xl border-[6px]" : ""
      }`}
    >
      <div className={`relative w-full ${featured ? "aspect-3/4" : "aspect-4/5"}`}>
        {imageY ? (
          <motion.div className="absolute inset-0 will-change-transform" style={{ y: imageY }}>
            <Image
              src={src}
              alt={alt}
              fill
              sizes={featured ? "200px" : "160px"}
              className="scale-110 object-cover object-top"
              priority={featured}
            />
          </motion.div>
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="160px"
            className="object-cover object-top"
          />
        )}
      </div>
      <div className={`bg-white px-3 ${featured ? "py-3" : "py-2.5"}`}>
        <p className="text-[9px] font-semibold tracking-[0.15em] text-zinc-400">
          {step}
        </p>
        <p
          className={`mt-0.5 font-medium text-zinc-900 ${featured ? "text-sm" : "text-xs"}`}
        >
          {label}
        </p>
      </div>
    </div>
  );
}

function StaticProviderGrid() {
  return (
    <div className="grid w-full max-w-2xl grid-cols-3 gap-3 sm:gap-4">
      {(Object.keys(PROVIDERS) as Array<keyof typeof PROVIDERS>).map((key) => (
        <ProviderImageCard key={key} provider={key} featured={key === "center"} />
      ))}
    </div>
  );
}

export default function ScrollFramerEffects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(prefersReducedMotion());
  }, []);

  const progress = useLinkedMotionProgress(sectionRef, !reducedMotion);

  if (reducedMotion) {
    return (
      <section
        className="w-full bg-zinc-50 px-6 py-24"
        aria-label="Framer scroll effects"
      >
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
          <div>
            <h2 className="font-serif text-3xl tracking-tight text-zinc-900">
              Your care team, in motion
            </h2>
            <p className="mt-4 text-sm text-zinc-500">
              Parallax, scale, rotate, opacity, slide, blur — all linked to scroll
              progress via Framer Motion.
            </p>
          </div>
          <StaticProviderGrid />
          <div className="flex flex-wrap justify-center gap-2">
            {EFFECTS.map((effect) => (
              <span
                key={effect.id}
                className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-[10px] text-zinc-500 uppercase"
              >
                {effect.label}
              </span>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="scroll-framer-effects relative h-[360vh] w-full bg-zinc-50"
      aria-label="Framer Motion linked scroll effects with provider images"
    >
      <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden px-6">
        <ScrollFramerStage progress={progress} />
      </div>
    </section>
  );
}
