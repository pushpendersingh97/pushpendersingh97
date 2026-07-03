export function getScrollProgress(section: HTMLElement): number {
  const rect = section.getBoundingClientRect();
  const scrollRange = section.offsetHeight - window.innerHeight;

  if (scrollRange <= 0) return 0;

  return Math.min(Math.max(-rect.top / scrollRange, 0), 1);
}

export function mapRange(
  progress: number,
  inputRange: number[],
  outputRange: number[],
): number {
  if (inputRange.length !== outputRange.length || inputRange.length < 2) {
    throw new Error("mapRange requires matching input/output arrays of length >= 2");
  }

  if (progress <= inputRange[0]) return outputRange[0];
  if (progress >= inputRange[inputRange.length - 1]) {
    return outputRange[outputRange.length - 1];
  }

  for (let i = 0; i < inputRange.length - 1; i += 1) {
    const inputStart = inputRange[i];
    const inputEnd = inputRange[i + 1];

    if (progress >= inputStart && progress <= inputEnd) {
      const t = (progress - inputStart) / (inputEnd - inputStart);
      return outputRange[i] + t * (outputRange[i + 1] - outputRange[i]);
    }
  }

  return outputRange[outputRange.length - 1];
}

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function bindScrollProgress(
  section: HTMLElement,
  onProgress: (progress: number) => void,
): () => void {
  let frame = 0;

  const update = () => {
    onProgress(getScrollProgress(section));
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
}
