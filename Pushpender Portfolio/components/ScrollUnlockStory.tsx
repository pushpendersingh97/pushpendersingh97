"use client";

import {
  bindScrollProgress,
  mapRange,
  prefersReducedMotion,
} from "@/lib/scrollProgress";
import { useEffect, useRef, useState } from "react";

const LIME = "#c5ff3b";
const CARD_W = 88;
const CARD_H = 120;

function LockIcon({
  unlocked,
  className,
}: {
  unlocked: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
      fill="currentColor"
    >
      <rect x="5" y="11" width="14" height="10" rx="2" />
      {unlocked ? (
        <path
          d="M8 11V8a4 4 0 0 1 8 0v1"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M8 11V8a4 4 0 0 1 8 0v3"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

function FolderIcon({
  unlocked,
  className,
}: {
  unlocked: boolean;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 120 96" aria-hidden className={className} fill="none">
      <path
        d="M8 24c0-4 3-8 8-8h24l8 10h48c4 0 8 4 8 8v44c0 4-4 8-8 8H16c-4 0-8-4-8-8V24z"
        stroke="currentColor"
        strokeWidth="3"
        fill="white"
        strokeLinejoin="round"
      />
      <circle cx="60" cy="54" r="18" fill={LIME} />
      <g transform="translate(48, 42)" className="text-black">
        <LockIcon unlocked={unlocked} className="h-6 w-6" />
      </g>
    </svg>
  );
}

type StoryElements = {
  heading: HTMLElement;
  card: HTMLElement;
  cardInner: HTMLElement;
  compactLock: HTMLElement;
  expandedContent: HTMLElement;
  crosshair: HTMLElement;
  glow: HTMLElement;
  folder: HTMLElement;
  hint: HTMLElement;
};

function queryStoryElements(stage: HTMLElement): StoryElements | null {
  const heading = stage.querySelector<HTMLElement>('[data-story-part="heading"]');
  const card = stage.querySelector<HTMLElement>('[data-story-part="card"]');
  const cardInner = stage.querySelector<HTMLElement>('[data-story-part="card-inner"]');
  const compactLock = stage.querySelector<HTMLElement>('[data-story-part="compact-lock"]');
  const expandedContent = stage.querySelector<HTMLElement>(
    '[data-story-part="expanded-content"]',
  );
  const crosshair = stage.querySelector<HTMLElement>('[data-story-part="crosshair"]');
  const glow = stage.querySelector<HTMLElement>('[data-story-part="glow"]');
  const folder = stage.querySelector<HTMLElement>('[data-story-part="folder"]');
  const hint = stage.querySelector<HTMLElement>('[data-story-part="hint"]');

  if (
    !heading ||
    !card ||
    !cardInner ||
    !compactLock ||
    !expandedContent ||
    !crosshair ||
    !glow ||
    !folder ||
    !hint
  ) {
    return null;
  }

  return {
    heading,
    card,
    cardInner,
    compactLock,
    expandedContent,
    crosshair,
    glow,
    folder,
    hint,
  };
}

function applyStoryStyles(
  elements: StoryElements,
  progress: number,
  onFolderUnlockChange: (unlocked: boolean) => void,
  lastFolderUnlocked: { current: boolean },
) {
  const cardY = mapRange(progress, [0, 0.28, 0.48, 0.58], [-140, 60, 60, -120]);
  const cardScale = mapRange(progress, [0.12, 0.32, 0.46, 0.56], [1, 3.4, 3.4, 1]);
  const cardRadius = mapRange(progress, [0.12, 0.32], [20, 12]);
  const darkFill = mapRange(progress, [0.16, 0.3], [0, 1]);
  const expandedOpacity = mapRange(
    progress,
    [0.24, 0.34, 0.5, 0.56],
    [0, 1, 1, 0],
  );
  const compactLockOpacity = mapRange(
    progress,
    [0, 0.16, 0.5, 0.56],
    [1, 1, 0, 1],
  );
  const cardOpacity = mapRange(progress, [0.54, 0.6], [1, 0]);
  const folderOpacity = mapRange(progress, [0.58, 0.64, 0.96, 1], [0, 1, 1, 0.6]);
  const folderX = mapRange(progress, [0.64, 0.94], [-130, 130]);
  const crosshairOpacity = mapRange(
    progress,
    [0.6, 0.68, 0.96, 1],
    [0, 1, 1, 0.4],
  );
  const glowWidth = mapRange(progress, [0.64, 0.78, 0.94], [0, 55, 0]);
  const headingOpacity = mapRange(progress, [0, 0.14], [1, 0.35]);
  const hintOpacity = mapRange(progress, [0.62, 0.72], [0, 1]);
  const folderUnlocked = folderX > 0;

  elements.heading.style.opacity = String(headingOpacity);
  elements.card.style.opacity = String(cardOpacity);
  elements.card.style.transform = `translate3d(-50%, calc(-50% + ${cardY}px), 0) scale(${cardScale})`;
  elements.cardInner.style.borderRadius = `${cardRadius}px`;
  elements.cardInner.style.backgroundColor = darkFill > 0.5 ? "#1a1a1a" : "#ffffff";
  elements.compactLock.style.opacity = String(compactLockOpacity);
  elements.expandedContent.style.opacity = String(expandedOpacity);
  elements.crosshair.style.opacity = String(crosshairOpacity);
  elements.glow.style.width = `${glowWidth}%`;
  elements.folder.style.opacity = String(folderOpacity);
  elements.folder.style.transform = `translate3d(calc(-50% + ${folderX}px), -50%, 0)`;
  elements.hint.style.opacity = String(hintOpacity);

  if (folderUnlocked !== lastFolderUnlocked.current) {
    lastFolderUnlocked.current = folderUnlocked;
    onFolderUnlockChange(folderUnlocked);
  }
}

export default function ScrollUnlockStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [folderUnlocked, setFolderUnlocked] = useState(false);

  useEffect(() => {
    setReducedMotion(prefersReducedMotion());
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    let cleanup: (() => void) | undefined;
    let retryFrame = 0;
    const lastFolderUnlocked = { current: false };

    const setup = () => {
      const section = sectionRef.current;
      const stage = stageRef.current;
      if (!section || !stage) {
        retryFrame = requestAnimationFrame(setup);
        return;
      }

      const elements = queryStoryElements(stage);
      if (!elements) {
        retryFrame = requestAnimationFrame(setup);
        return;
      }

      cleanup = bindScrollProgress(section, (progress) => {
        applyStoryStyles(elements, progress, setFolderUnlocked, lastFolderUnlocked);
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
        className="w-full bg-white px-6 py-24"
        aria-label="Secure intake steps"
      >
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-16 text-center">
          <div>
            <h2 className="font-serif text-3xl tracking-tight text-[#8b4513]">
              Complete your intake
            </h2>
            <p className="mt-4 text-sm text-zinc-500">
              Build a secure health profile. Each step unlocks the next.
            </p>
          </div>
          <div className="relative flex w-full max-w-lg items-center justify-center gap-8">
            <div className="h-px flex-1 border-t border-dashed border-[#c4b5a0]" />
            <div className="flex h-[120px] w-[88px] items-center justify-center rounded-[20px] border-2 border-black bg-[#1a1a1a]">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{ backgroundColor: LIME }}
              >
                <LockIcon unlocked className="h-4 w-4 text-black" />
              </div>
            </div>
            <div className="h-px flex-1 border-t border-dashed border-[#c4b5a0]" />
          </div>
          <FolderIcon unlocked className="h-24 w-32 text-black" />
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="scroll-unlock-track relative h-[300vh] w-full bg-white"
      aria-label="Scroll-driven unlock story"
    >
      <div className="sticky top-0 flex h-svh flex-col items-center justify-center px-6">
        <div ref={stageRef} className="relative flex w-full max-w-2xl flex-col items-center">
          <div
            data-story-part="heading"
            className="mb-10 max-w-md text-center"
          >
            <h2 className="font-serif text-3xl tracking-tight text-[#8b4513] sm:text-4xl">
              Complete your intake
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-500 sm:text-base">
              Build a secure health profile as you scroll. Each step unlocks the
              next — your records stay protected until you&apos;re ready to share.
            </p>
          </div>

          <div className="relative h-[min(60vh,480px)] w-full max-w-lg overflow-visible">
            <div
              className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 border-l border-dashed border-[#c4b5a0]"
              aria-hidden
            />

            <div
              data-story-part="crosshair"
              className="pointer-events-none absolute top-1/2 right-0 left-0 -translate-y-1/2 opacity-0"
              aria-hidden
            >
              <div className="relative h-px w-full bg-zinc-300">
                <div
                  data-story-part="glow"
                  className="absolute top-1/2 left-0 h-8 w-0 -translate-y-1/2 bg-linear-to-r from-[#c5ff3b]/50 via-[#c5ff3b]/20 to-transparent blur-md"
                />
              </div>
            </div>

            <div
              data-story-part="card"
              className="absolute top-1/2 left-1/2 will-change-transform"
              style={{
                transform: "translate3d(-50%, calc(-50% - 140px), 0) scale(1)",
              }}
            >
              <div
                data-story-part="card-inner"
                className="relative overflow-hidden border-2 border-black shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)]"
                style={{
                  width: CARD_W,
                  height: CARD_H,
                  borderRadius: 20,
                  backgroundColor: "#ffffff",
                }}
              >
                <div
                  data-story-part="compact-lock"
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full"
                    style={{ backgroundColor: LIME }}
                  >
                    <LockIcon unlocked={false} className="h-4 w-4 text-black" />
                  </div>
                </div>

                <div
                  data-story-part="expanded-content"
                  className="absolute inset-0 flex flex-col p-4 text-white opacity-0"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-3xl leading-none font-bold">01</span>
                    <p className="text-[10px] font-semibold tracking-[0.15em]">
                      THE KEY TO SUCCESS
                    </p>
                  </div>
                  <p className="mt-3 max-w-[58%] text-[9px] leading-relaxed text-zinc-300">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                  <div className="mt-auto flex items-end justify-between">
                    <span className="text-[9px] font-medium tracking-widest">
                      NEXT →
                    </span>
                    <div
                      className="absolute -right-6 bottom-2 flex h-16 w-16 items-center justify-center rounded-full"
                      style={{ backgroundColor: LIME }}
                    >
                      <LockIcon unlocked className="h-5 w-5 text-black" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              data-story-part="folder"
              className="absolute top-1/2 left-1/2 w-28 opacity-0 will-change-transform sm:w-32"
              style={{ transform: "translate3d(-50%, -50%, 0)" }}
            >
              <FolderIcon
                unlocked={folderUnlocked}
                className="h-auto w-full text-black"
              />
            </div>
          </div>

          <p
            data-story-part="hint"
            className="mt-8 text-center text-xs tracking-wide text-zinc-400 opacity-0"
          >
            Cross the line to unlock your records
          </p>
        </div>
      </div>
    </section>
  );
}
