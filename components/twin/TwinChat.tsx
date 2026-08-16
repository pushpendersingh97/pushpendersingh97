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

export default function TwinChat() {
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
          className="absolute right-4 bottom-[calc(5.75rem+env(safe-area-inset-bottom,0px))] z-30 flex h-11 w-11 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900/90 text-zinc-100 shadow-lg shadow-black/40 backdrop-blur-sm transition-colors hover:border-sky-500/50 hover:text-sky-300"
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
        className="m-auto w-[min(calc(100%-2rem),24rem)] rounded-3xl border border-zinc-800 bg-[#0a0e14] p-6 text-zinc-100 shadow-2xl outline-none backdrop:bg-black/70 backdrop:backdrop-blur-sm"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            event.currentTarget.close();
          }
        }}
      >
        <form method="dialog">
          <h2 id="twin-new-chat-title" className="text-lg font-semibold tracking-tight">
            Start a new chat?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            This clears the current conversation.
          </p>
          <div className="mt-5 flex justify-end gap-2">
            <button
              type="submit"
              className="rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-sky-500/50 hover:text-sky-300"
            >
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
        className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-4 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden px-4 py-6 pb-20"
        onScroll={() => {
          const thread = threadRef.current;
          if (!thread) {
            return;
          }

          pinToBottomRef.current =
            thread.scrollHeight - thread.scrollTop - thread.clientHeight < 80;
        }}
      >
        {messages.length === 0 ? (
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6">
            <p className="text-sm leading-relaxed text-zinc-400">
              Ask about roles, projects, stack, or how to reach me. Answers come from my
              public profile — this is not me live.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => submitPrompt(prompt)}
                  className="rounded-full border border-zinc-700 px-3 py-1.5 text-left text-xs text-zinc-300 transition-colors hover:border-sky-500/50 hover:text-sky-300"
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
                  ? "ml-8 rounded-2xl border border-sky-500/20 bg-sky-500/10 px-4 py-3 text-sm text-zinc-100"
                  : "mr-8 rounded-2xl border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-zinc-300"
              }
            >
              <p className="mb-1 text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
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
          <p className="text-xs tracking-wide text-zinc-500">Looking that up…</p>
        ) : null}

        {error ? (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            <p>Something went wrong. Try again in a moment.</p>
            <button
              type="button"
              onClick={() => regenerate()}
              className="mt-2 text-xs text-sky-300 underline-offset-2 hover:underline"
            >
              Retry
            </button>
          </div>
        ) : null}
      </div>

      <form
        className="sticky bottom-0 z-20 shrink-0 border-t border-zinc-800 bg-[#0a0e14]/90 px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur-sm"
        onSubmit={(event) => {
          event.preventDefault();
          submitPrompt(input);
        }}
      >
        {messages.length >= TWIN_CONTEXT_WINDOW ? (
          <p className="mx-auto mb-3 max-w-2xl text-xs text-zinc-500">
            I only keep the last few questions in mind. Start a new chat if you want a
            clean slate.
          </p>
        ) : null}
        <div className="mx-auto flex max-w-2xl gap-2">
          <label className="sr-only" htmlFor="twin-question">
            Ask a question
          </label>
          <input
            id="twin-question"
            value={input}
            onChange={(event) => setInput(event.currentTarget.value)}
            disabled={error != null}
            placeholder="Ask about my work, stack, or how to reach me"
            className="min-w-0 flex-1 rounded-full border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-sky-500/60 focus:outline-none"
            maxLength={2000}
          />
          {busy ? (
            <button
              type="button"
              onClick={() => stop()}
              className="rounded-full border border-zinc-700 px-4 py-3 text-sm font-medium text-zinc-300 hover:border-sky-500/50 hover:text-sky-300"
            >
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
      </form>
    </div>
  );
}
