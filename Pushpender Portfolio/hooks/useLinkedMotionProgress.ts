"use client";

import { bindScrollProgress, prefersReducedMotion } from "@/lib/scrollProgress";
import { useMotionValue } from "framer-motion";
import { useEffect, type RefObject } from "react";

export function useLinkedMotionProgress(
  sectionRef: RefObject<HTMLElement | null>,
  enabled = true,
) {
  const progress = useMotionValue(0);

  useEffect(() => {
    if (!enabled || prefersReducedMotion()) return;

    let cleanup: (() => void) | undefined;
    let retryFrame = 0;

    const setup = () => {
      const section = sectionRef.current;
      if (!section) {
        retryFrame = requestAnimationFrame(setup);
        return;
      }

      cleanup = bindScrollProgress(section, (value) => {
        progress.set(value);
      });
    };

    setup();

    return () => {
      cancelAnimationFrame(retryFrame);
      cleanup?.();
    };
  }, [enabled, progress, sectionRef]);

  return progress;
}
