"use client";

import { bindScrollProgress, prefersReducedMotion } from "@/lib/scrollProgress";
import { useEffect, useRef } from "react";

export default function PortfolioScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const bar = barRef.current;
    if (!bar) return;

    let frame = 0;

    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight <= 0 ? 0 : Math.min(scrollTop / docHeight, 1);
      bar.style.transform = `scaleX(${progress})`;
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
    <div
      className="fixed top-0 right-0 left-0 z-50 h-0.5 origin-left bg-sky-400/80 will-change-transform"
      ref={barRef}
      style={{ transform: "scaleX(0)" }}
      aria-hidden
    />
  );
}
