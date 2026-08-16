"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const twinTransport = new DefaultChatTransport({ api: "/api/twin" });

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
  const { messages, sendMessage, status, stop, error, regenerate } = useChat({
    transport: twinTransport,
    throttle: 50,
  });

  const busy = status === "submitted" || status === "streaming";

  function submitPrompt(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) {
      return;
    }

    void sendMessage({ text: trimmed });
    setInput("");
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-4 overflow-y-auto px-4 py-6">
        {messages.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6">
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
        className="border-t border-zinc-800 bg-[#0a0e14]/90 px-4 py-4 backdrop-blur-sm"
        onSubmit={(event) => {
          event.preventDefault();
          submitPrompt(input);
        }}
      >
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
