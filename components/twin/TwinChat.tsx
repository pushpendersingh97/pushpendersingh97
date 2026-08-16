"use client";

import { TWIN_CONTEXT_WINDOW } from "@/lib/twin/limits";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useLayoutEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const twinTransport = new DefaultChatTransport({
  api: "/api/twin",
  prepareSendMessagesRequest: ({ id, messages, body }) => ({
    body: {
      ...body,
      id,
      messages: messages.slice(-TWIN_CONTEXT_WINDOW),
    },
  }),
});

const SUGGESTED_PROMPTS = [
  "What are you working on now?",
  "Walk me through your experience.",
  "What tech do you ship with?",
  "How can I get in touch?",
];

function messageText(parts: { type: string; text?: string }[]): string {
  return parts
    .filter((part) => part.type === "text" && part.text)
    .map((part) => part.text ?? "")
    .join("");
}

export default function TwinChat({
  variant = "page",
}: {
  variant?: "page" | "panel";
}) {
  const isPanel = variant === "panel";
  const inputId = isPanel ? "twin-question-panel" : "twin-question";
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, stop, error, regenerate, setMessages, clearError } =
    useChat({
      transport: twinTransport,
      throttle: 50,
    });

  const busy = status === "submitted" || status === "streaming";
  const newChatDialogRef = useRef<HTMLDialogElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);
  const pinToBottomRef = useRef(true);

  function scrollThreadToBottom(behavior: ScrollBehavior = "auto") {
    const thread = threadRef.current;
    if (!thread) {
      return;
    }

    thread.scrollTo({ top: thread.scrollHeight, behavior });
  }

  function startNewChat() {
    if (busy) {
      stop();
    }
    setMessages([]);
    clearError();
    setInput("");
  }

  function requestNewChat() {
    newChatDialogRef.current?.showModal();
  }

  function confirmNewChat() {
    startNewChat();
    newChatDialogRef.current?.close();
  }

  function submitPrompt(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) {
      return;
    }

    pinToBottomRef.current = true;
    void sendMessage({ text: trimmed });
    setInput("");
  }

  useLayoutEffect(() => {
    if (!pinToBottomRef.current) {
      return;
    }

    scrollThreadToBottom();
  }, [messages, status]);

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      {messages.length > 0 ? (
        <button
          type="button"
          onClick={requestNewChat}
          className={`absolute z-30 flex h-11 w-11 items-center justify-center border border-grid bg-paper text-ink shadow-sm transition-colors hover:border-route hover:text-route ${
            isPanel
              ? "right-3 bottom-[4.5rem]"
              : "right-4 bottom-[calc(5.75rem+env(safe-area-inset-bottom,0px))]"
          }`}
          aria-label="New chat"
        >
          <span aria-hidden="true" className="text-2xl leading-none font-light">
            +
          </span>
        </button>
      ) : null}

      <dialog
        ref={newChatDialogRef}
        aria-labelledby="twin-new-chat-title"
        className="m-auto w-[min(calc(100%-2rem),24rem)] border border-grid bg-paper p-6 text-ink shadow-xl outline-none backdrop:bg-ink/50"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            event.currentTarget.close();
          }
        }}
      >
        <form method="dialog">
          <h2
            id="twin-new-chat-title"
            className="font-display text-lg font-bold tracking-tight uppercase"
          >
            Start a new chat?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            This clears the current conversation.
          </p>
          <div className="mt-5 flex justify-end gap-2">
            <button type="submit" className="portfolio-btn-outline px-4 py-2">
              Cancel
            </button>
            <button type="button" onClick={confirmNewChat} className="portfolio-btn px-4 py-2">
              New chat
            </button>
          </div>
        </form>
      </dialog>

      <div
        ref={threadRef}
        className={`min-h-0 flex-1 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${
          isPanel ? "px-4 py-4" : "portfolio-gutter py-6 pb-20"
        }`}
        onScroll={() => {
          const thread = threadRef.current;
          if (!thread) {
            return;
          }

          pinToBottomRef.current =
            thread.scrollHeight - thread.scrollTop - thread.clientHeight < 80;
        }}
      >
        <div className={isPanel ? "flex flex-col gap-3" : "portfolio-column flex flex-col gap-4"}>
          {messages.length === 0 ? (
            <div className={isPanel ? "atlas-ticket p-4" : "atlas-ticket p-6"}>
              <p className="text-sm leading-relaxed text-ink/75">
                Ask about roles, projects, stack, or how to reach me. Answers come from my
                public profile — this is not me live.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => submitPrompt(prompt)}
                    className="border border-grid bg-paper px-3 py-1.5 text-left font-mono text-xs text-ink transition-colors hover:border-route hover:text-route"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {messages.map((message) => {
            const text = messageText(message.parts);
            if (!text) {
              return null;
            }

            const isUser = message.role === "user";

            return (
              <article
                key={message.id}
                className={
                  isUser
                    ? "ml-8 border border-route/30 bg-route/10 px-4 py-3 text-sm text-ink"
                    : "atlas-chart-inset mr-8 px-4 py-3 text-sm"
                }
              >
                <p className="mb-1 font-mono text-[10px] tracking-[0.2em] text-muted uppercase">
                  {isUser ? "You" : "Pushpender (AI)"}
                </p>
                {isUser ? (
                  <p className="whitespace-pre-wrap">{text}</p>
                ) : (
                  <div className="twin-markdown">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
                  </div>
                )}
              </article>
            );
          })}

          {status === "submitted" ||
          (status === "streaming" &&
            !messageText(messages[messages.length - 1]?.parts ?? [])) ? (
            <p className="font-mono text-xs tracking-wide text-muted">Looking that up…</p>
          ) : null}

          {error ? (
            <div className="border border-stamp/40 bg-stamp/10 px-4 py-3 text-sm text-ink">
              <p>Something went wrong. Try again in a moment.</p>
              <button
                type="button"
                onClick={() => regenerate()}
                className="mt-2 font-mono text-xs text-route underline-offset-2 hover:underline"
              >
                Retry
              </button>
            </div>
          ) : null}
        </div>
      </div>

      <form
        className={
          isPanel
            ? "shrink-0 border-t border-grid bg-paper px-4 py-3"
            : "portfolio-gutter sticky bottom-0 z-20 shrink-0 border-t border-grid bg-paper/95 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur-sm"
        }
        onSubmit={(event) => {
          event.preventDefault();
          submitPrompt(input);
        }}
      >
        <div className={isPanel ? undefined : "portfolio-column"}>
          {messages.length >= TWIN_CONTEXT_WINDOW ? (
            <p className="mb-3 font-mono text-xs text-muted">
              I only keep the last few questions in mind. Start a new chat if you want a
              clean slate.
            </p>
          ) : null}
          <div className="flex gap-2">
            <label className="sr-only" htmlFor={inputId}>
              Ask a question
            </label>
            <input
              id={inputId}
              value={input}
              onChange={(event) => setInput(event.currentTarget.value)}
              disabled={error != null}
              placeholder="Ask about my work, stack, or how to reach me"
              className="min-w-0 flex-1 border border-grid bg-paper px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-route focus:outline-none"
              maxLength={2000}
            />
            {busy ? (
              <button type="button" onClick={() => stop()} className="portfolio-btn-outline px-4 py-3">
                Stop
              </button>
            ) : (
              <button
                type="submit"
                disabled={!input.trim() || error != null}
                className="portfolio-btn px-5 py-3 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Ask
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
