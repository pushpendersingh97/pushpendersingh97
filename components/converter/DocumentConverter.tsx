"use client";

import Link from "next/link";
import ConversionStatus from "@/components/converter/ConversionStatus";
import FileDropzone from "@/components/converter/FileDropzone";
import PasteInput from "@/components/converter/PasteInput";
import MarkdownEditor from "@/components/converter/MarkdownEditor";
import MarkdownPreview from "@/components/converter/MarkdownPreview";
import Toolbar from "@/components/converter/Toolbar";
import { isAcceptedFile } from "@/lib/converterConstants";
import { useDocumentConverter } from "@/hooks/useDocumentConverter";
import { useState } from "react";

export default function DocumentConverter() {
  const { state, convertFile, convertPaste, setMarkdown, reset } = useDocumentConverter();
  const [dropError, setDropError] = useState<string | null>(null);

  const handleFileAccepted = (file: File) => {
    setDropError(null);
    const validation = isAcceptedFile(file);
    if (!validation.ok || !validation.extension) {
      setDropError(validation.error ?? "Invalid file");
      return;
    }
    convertFile(file, validation.extension);
  };

  const showEditor = state.phase === "ready" && state.markdown.length > 0;

  return (
    <div
      className={
        showEditor
          ? "flex h-svh flex-col overflow-hidden bg-[#0a0e14] text-zinc-100"
          : "min-h-svh bg-[#0a0e14] text-zinc-100"
      }
    >
      <header className="shrink-0 border-b border-zinc-800/80">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-sky-400/80">
              Client-side converter
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight">
              DOCX / PDF / Paste → Markdown
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-zinc-400">
              Upload a file or paste rich text from Word, the web, or plain text.
              Everything runs in your browser — PDF heading detection is
              best-effort; DOCX tables and lists convert more reliably.
            </p>
          </div>
          <Link
            href="/"
            className="rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-sky-400 hover:text-sky-300"
          >
            ← Portfolio
          </Link>
        </div>
      </header>

      <main
        className={
          showEditor
            ? "mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col overflow-hidden px-6 py-6"
            : "mx-auto max-w-7xl px-6 py-8"
        }
      >
        {state.phase === "idle" || state.phase === "error" ? (
          <div className="mx-auto max-w-2xl space-y-6">
            <FileDropzone
              onFileAccepted={handleFileAccepted}
              onFileRejected={setDropError}
            />

            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-zinc-800" />
              <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                or
              </span>
              <div className="h-px flex-1 bg-zinc-800" />
            </div>

            <PasteInput
              onConvert={(html, plainText) => {
                setDropError(null);
                convertPaste(html, plainText);
              }}
            />

            {dropError || state.error ? (
              <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {dropError ?? state.error}
              </p>
            ) : null}
          </div>
        ) : null}

        {state.phase === "converting" ? (
          <div className="mx-auto max-w-2xl">
            <ConversionStatus
              progress={state.progress}
              message={state.message}
              fileName={state.sourceName}
            />
          </div>
        ) : null}

        {showEditor ? (
          <div className="flex min-h-0 flex-1 flex-col gap-4">
            <div className="flex shrink-0 flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-zinc-400">
                Source:{" "}
                <span className="font-medium text-zinc-200">
                  {state.sourceName}
                </span>
              </p>
              <Toolbar
                markdown={state.markdown}
                fileName={state.sourceName}
                onReset={reset}
              />
            </div>

            <div className="grid min-h-0 flex-1 grid-cols-1 grid-rows-2 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/50 lg:grid-cols-2 lg:grid-rows-1">
              <div className="min-h-0 overflow-hidden lg:min-h-0">
                <MarkdownEditor value={state.markdown} onChange={setMarkdown} />
              </div>
              <div className="min-h-0 overflow-hidden border-t border-zinc-800 lg:border-t-0 lg:border-l">
                <MarkdownPreview markdown={state.markdown} />
              </div>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
}
