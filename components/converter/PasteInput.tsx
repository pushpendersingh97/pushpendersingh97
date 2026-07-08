"use client";

import { useCallback, useRef, useState } from "react";

type PasteInputProps = {
  disabled?: boolean;
  onConvert: (html: string | null, plainText: string) => void;
};

export default function PasteInput({ disabled = false, onConvert }: PasteInputProps) {
  const [value, setValue] = useState("");
  const [clipboardError, setClipboardError] = useState<string | null>(null);
  const lastHtmlRef = useRef<string | null>(null);

  const runConvert = useCallback(
    (html: string | null, plainText: string) => {
      if (!plainText.trim() && !html?.trim()) {
        return;
      }
      onConvert(html, plainText);
    },
    [onConvert],
  );

  const handlePaste = useCallback(
    (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
      const html = event.clipboardData.getData("text/html");
      const plain = event.clipboardData.getData("text/plain");
      lastHtmlRef.current = html || null;
      setValue(plain);
      runConvert(html || null, plain);
    },
    [runConvert],
  );

  const handleConvert = useCallback(() => {
    runConvert(lastHtmlRef.current, value);
  }, [runConvert, value]);

  const handlePasteFromClipboard = useCallback(async () => {
    setClipboardError(null);

    try {
      if (navigator.clipboard.read) {
        const items = await navigator.clipboard.read();
        let html: string | null = null;
        let plain = "";

        for (const item of items) {
          if (item.types.includes("text/html")) {
            html = await (await item.getType("text/html")).text();
          }
          if (item.types.includes("text/plain")) {
            plain = await (await item.getType("text/plain")).text();
          }
        }

        lastHtmlRef.current = html;
        setValue(plain);
        runConvert(html, plain);
        return;
      }

      const plain = await navigator.clipboard.readText();
      lastHtmlRef.current = null;
      setValue(plain);
      runConvert(null, plain);
    } catch {
      setClipboardError(
        "Clipboard access denied — paste with Ctrl+V into the box instead",
      );
    }
  }, [runConvert]);

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
      <label htmlFor="paste-input" className="text-sm font-medium text-zinc-200">
        Paste content
      </label>
      <p className="mt-1 text-sm text-zinc-500">
        Paste from Word, Google Docs, a webpage, or plain text. Rich formatting
        converts to Markdown when HTML is available.
      </p>

      <textarea
        id="paste-input"
        value={value}
        disabled={disabled}
        onChange={(event) => {
          lastHtmlRef.current = null;
          setValue(event.target.value);
        }}
        onPaste={handlePaste}
        placeholder="Ctrl+V to paste here, or type markdown / plain text…"
        className="mt-4 min-h-36 w-full resize-y rounded-xl border border-zinc-700 bg-zinc-950/80 px-4 py-3 font-mono text-sm leading-relaxed text-zinc-100 outline-none transition-colors placeholder:text-zinc-600 focus:border-sky-500/60 disabled:opacity-60"
      />

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          disabled={disabled || !value.trim()}
          onClick={handleConvert}
          className="rounded-full bg-sky-500 px-4 py-2 text-sm font-medium text-zinc-950 transition-opacity hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Convert to Markdown
        </button>
        <button
          type="button"
          disabled={disabled}
          onClick={handlePasteFromClipboard}
          className="rounded-full border border-zinc-600 px-4 py-2 text-sm font-medium text-zinc-100 transition-colors hover:border-sky-400 hover:text-sky-300 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Paste from clipboard
        </button>
      </div>

      {clipboardError ? (
        <p className="mt-3 text-sm text-amber-400/90">{clipboardError}</p>
      ) : null}
    </div>
  );
}
