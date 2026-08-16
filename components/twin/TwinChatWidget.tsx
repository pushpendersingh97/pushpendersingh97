"use client";

import dynamic from "next/dynamic";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const TwinChat = dynamic(() => import("@/components/twin/TwinChat"), {
  loading: () => (
    <div className="flex flex-1 items-center px-4">
      <p className="font-mono text-xs text-muted">Loading…</p>
    </div>
  ),
});

type TwinChatContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const TwinChatContext = createContext<TwinChatContextValue | null>(null);

export function useTwinChat() {
  const context = useContext(TwinChatContext);
  if (!context) {
    throw new Error("useTwinChat must be used within TwinChatProvider");
  }
  return context;
}

export function TwinChatProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);
  const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close]);

  return <TwinChatContext.Provider value={value}>{children}</TwinChatContext.Provider>;
}

function ChatIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <path
        strokeLinecap="square"
        d="M4.5 6.5h15v10h-5.5L9 19.5v-3H4.5z"
      />
    </svg>
  );
}

export function TwinChatWidget() {
  const { isOpen, open, close } = useTwinChat();
  const [hasOpened, setHasOpened] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setHasOpened(true);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }
      if (document.querySelector("dialog[open]")) {
        return;
      }
      close();
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, close]);

  return (
    <>
      {isOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-[55] bg-ink/40 sm:bg-ink/20"
          aria-label="Close chat"
          onClick={close}
        />
      ) : null}

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="twin-chat-title"
        hidden={!isOpen}
        className="fixed inset-3 z-[60] flex flex-col border border-grid bg-paper shadow-xl sm:inset-auto sm:right-6 sm:bottom-24 sm:h-[min(36rem,calc(100svh-8rem))] sm:w-[24rem]"
      >
        <header className="flex shrink-0 items-start justify-between gap-3 border-b border-grid px-4 py-3">
          <div>
            <p className="atlas-label">Public AI twin</p>
            <h2
              id="twin-chat-title"
              className="font-display mt-1 text-lg font-bold tracking-tight text-ink uppercase"
            >
              Ask Pushpender
            </h2>
          </div>
          <button
            type="button"
            onClick={close}
            className="flex h-9 w-9 items-center justify-center border border-grid text-ink transition-colors hover:border-route hover:text-route"
            aria-label="Close chat"
          >
            <span aria-hidden className="text-xl leading-none">
              ×
            </span>
          </button>
        </header>
        {hasOpened ? <TwinChat variant="panel" /> : null}
      </div>

      {isOpen ? null : (
        <button
          type="button"
          onClick={open}
          className="fixed right-[max(1rem,env(safe-area-inset-right))] bottom-[max(1rem,env(safe-area-inset-bottom))] z-[60] flex h-14 w-14 items-center justify-center bg-stamp text-white shadow-lg transition-colors hover:bg-[#c04a22]"
          aria-label="Ask Pushpender"
        >
          <ChatIcon className="h-6 w-6" />
        </button>
      )}
    </>
  );
}
