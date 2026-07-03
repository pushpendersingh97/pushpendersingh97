"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const PROVIDERS = {
  left: {
    src: "/providers/left.jpg",
    alt: "Healthcare provider portrait",
  },
  center: {
    src: "/providers/center.jpg",
    alt: "Healthcare provider holding a tablet",
  },
  right: {
    src: "/providers/right.jpg",
    alt: "Healthcare provider portrait",
  },
} as const;

type CardSide = keyof typeof PROVIDERS;

type FanCardProps = {
  side: CardSide;
  zIndex: number;
  cardRef?: React.RefObject<HTMLDivElement | null>;
};

function FanCard({ side, zIndex, cardRef }: FanCardProps) {
  const { src, alt } = PROVIDERS[side];
  const sideClass =
    side === "left"
      ? "fan-card-left"
      : side === "right"
        ? "fan-card-right"
        : "fan-card-center";

  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
      <div
        ref={cardRef}
        className={`fan-card w-[220px] will-change-transform sm:w-[250px] md:w-[280px] ${sideClass}`}
        style={{ zIndex }}
      >
        <div className="overflow-hidden rounded-[1.75rem] border-[7px] border-white bg-[#d4b896] shadow-[0_24px_60px_-12px_rgba(0,0,0,0.35)]">
          <div className="relative aspect-3/4">
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 640px) 220px, (max-width: 768px) 250px, 280px"
              className="object-cover object-top"
              priority={side === "center"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function supportsViewTimeline() {
  return (
    typeof CSS !== "undefined" &&
    CSS.supports("animation-timeline", "view()")
  );
}

function collapsedTransform(progress: number) {
  const rotate = -16 + 16 * progress;
  const x = -60 + 60 * progress;
  const scale = 1 - 0.04 * progress;
  const y = 8 * progress;

  return { rotate, x, scale, y };
}

export default function ProviderFanStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (supportsViewTimeline()) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const section = sectionRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    if (!section || !left || !right) return;

    let frame = 0;

    const applySideTransform = (
      element: HTMLDivElement,
      direction: "left" | "right",
      progress: number,
    ) => {
      const { rotate, x, scale, y } = collapsedTransform(progress);
      const signedRotate = direction === "left" ? rotate : -rotate;
      const signedX = direction === "left" ? x : -x;

      element.style.transformOrigin = "50% 100%";
      element.style.transform = `translateX(${signedX}px) translateY(${y}px) rotate(${signedRotate}deg) scale(${scale})`;
    };

    const update = () => {
      const rect = section.getBoundingClientRect();
      const scrollRange = section.offsetHeight - window.innerHeight;
      const progress =
        scrollRange <= 0
          ? 0
          : Math.min(Math.max(-rect.top / scrollRange, 0), 1);

      applySideTransform(left, "left", progress);
      applySideTransform(right, "right", progress);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    document.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="fan-stack-track relative h-[250vh] w-full bg-white"
      aria-label="Provider cards scroll animation"
    >
      <div className="sticky top-0 flex h-svh flex-col items-center justify-center px-6">
        <div className="relative flex w-full max-w-3xl flex-col items-center">
          <p className="mb-10 text-sm tracking-wide text-zinc-500">100% online.</p>

          <div className="pointer-events-none absolute inset-x-1/2 top-0 bottom-0 w-px -translate-x-1/2 border-l border-dashed border-zinc-300" />

          <div className="relative h-[340px] w-full sm:h-[380px] md:h-[420px]">
            {/* Side cards first in DOM; center last so it stays on top */}
            <FanCard side="left" zIndex={1} cardRef={leftRef} />
            <FanCard side="right" zIndex={2} cardRef={rightRef} />
            <FanCard side="center" zIndex={3} />
          </div>
        </div>
      </div>
    </section>
  );
}
