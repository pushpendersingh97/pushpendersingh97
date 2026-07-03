"use client";

import { PERSPECTIVE_IMAGE } from "@/lib/effectsData";
import {
  bindScrollProgress,
  mapRange,
  prefersReducedMotion,
} from "@/lib/scrollProgress";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function EffectsPerspectiveTilt() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
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
      const card = cardRef.current;
      if (!section || !card) {
        retryFrame = requestAnimationFrame(setup);
        return;
      }

      cleanup = bindScrollProgress(section, (progress) => {
        const rotateX = mapRange(progress, [0, 0.5, 1], [14, 0, -12]);
        const rotateY = mapRange(progress, [0, 0.35, 0.65, 1], [-16, 0, 16, -8]);
        const scale = mapRange(progress, [0, 0.5, 1], [0.92, 1.04, 0.96]);
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
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
      <section className="px-6 py-24" aria-label="3D perspective tilt">
        <div className="relative mx-auto aspect-4/3 max-w-lg overflow-hidden rounded-2xl border border-zinc-800">
          <Image src={PERSPECTIVE_IMAGE} alt="Product preview" fill className="object-cover" sizes="512px" />
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-[300vh] w-full"
      aria-label="Scroll-driven 3D perspective tilt"
    >
      <div className="sticky top-0 flex h-svh items-center justify-center px-6">
        <div ref={stageRef} className="perspective-[1000px] w-full max-w-lg">
          <div
            ref={cardRef}
            className="relative aspect-4/3 overflow-hidden rounded-2xl border border-zinc-700/60 shadow-2xl will-change-transform"
            style={{ transformStyle: "preserve-3d", transform: "rotateX(14deg) rotateY(-16deg) scale(0.92)" }}
          >
            <Image
              src={PERSPECTIVE_IMAGE}
              alt="Patient coordination dashboard"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 512px"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-zinc-950/70 via-transparent to-transparent" />
            <p className="absolute bottom-4 left-4 text-sm font-medium text-white">
              Subtle perspective tilt · scroll driven
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
