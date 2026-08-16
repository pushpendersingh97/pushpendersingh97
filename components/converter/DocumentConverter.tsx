"use client";

import SiteNav from "@/components/SiteNav";
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
          ? "portfolio-theme flex h-svh flex-col overflow-hidden"
          : "portfolio-theme min-h-svh"
      }
    >
      <SiteNav className="shrink-0" />
      <header className="shrink-0 border-b border-grid">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <p className="atlas-label">Client-side converter</p>
          <h1 className="font-display mt-1 text-2xl font-bold tracking-tight text-ink uppercase sm:text-3xl">
            DOCX / PDF / Paste → Markdown
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            Upload a file or paste rich text from Word, the web, or plain text.
            Everything runs in your browser — PDF heading detection is
            best-effort; DOCX tables and lists convert more reliably.
          </p>
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
              <div className="atlas-rule flex-1" />
              <span className="font-mono text-xs font-medium tracking-wider text-muted uppercase">
                or
              </span>
              <div className="atlas-rule flex-1" />
            </div>

            <PasteInput
              onConvert={(html, plainText) => {
                setDropError(null);
                convertPaste(html, plainText);
              }}
            />

            {dropError || state.error ? (
              <p className="border border-stamp/40 bg-stamp/10 px-4 py-3 text-sm text-ink">
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
              <p className="text-sm text-muted">
                Source:{" "}
                <span className="font-medium text-ink">{state.sourceName}</span>
              </p>
              <Toolbar
                markdown={state.markdown}
                fileName={state.sourceName}
                onReset={reset}
              />
            </div>

            <div className="atlas-chart-inset grid min-h-0 flex-1 grid-cols-1 grid-rows-2 overflow-hidden lg:grid-cols-2 lg:grid-rows-1">
              <div className="min-h-0 overflow-hidden lg:min-h-0">
                <MarkdownEditor value={state.markdown} onChange={setMarkdown} />
              </div>
              <div className="min-h-0 overflow-hidden border-t border-white/10 lg:border-t-0 lg:border-l">
                <MarkdownPreview markdown={state.markdown} />
              </div>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
}
