"use client";

import {
  bindScrollProgress,
  getScrollProgress,
  prefersReducedMotion,
} from "@/lib/scrollProgress";
import { useEffect, useState, type RefObject } from "react";

export function useScrollProgress(
  sectionRef: RefObject<HTMLElement | null>,
  enabled = true,
) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!enabled || prefersReducedMotion()) return;

    const section = sectionRef.current;
    if (!section) return;

    return bindScrollProgress(section, setProgress);
  }, [enabled, sectionRef]);

  return progress;
}

export function useSectionScrollProgress(section: HTMLElement | null) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!section || prefersReducedMotion()) return;
    return bindScrollProgress(section, setProgress);
  }, [section]);

  return progress;
}

export { getScrollProgress, prefersReducedMotion };
