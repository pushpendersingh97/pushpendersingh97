"use client";

import { useCallback, useState } from "react";

type ToolbarProps = {
  markdown: string;
  fileName?: string | null;
  onReset: () => void;
};

export default function Toolbar({ markdown, fileName, onReset }: ToolbarProps) {
  const [copied, setCopied] = useState(false);

  const downloadName =
    fileName?.replace(/\.(docx|pdf)$/i, ".md") ?? "document.md";

  const handleCopy = useCallback(async () => {
    if (!markdown) {
      return;
    }

    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }, [markdown]);

  const handleDownload = useCallback(() => {
    if (!markdown) {
      return;
    }

    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = downloadName;
    anchor.click();
    URL.revokeObjectURL(url);
  }, [downloadName, markdown]);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={handleDownload}
        disabled={!markdown}
        className="portfolio-btn disabled:cursor-not-allowed disabled:opacity-40"
      >
        Download .md
      </button>
      <button
        type="button"
        onClick={handleCopy}
        disabled={!markdown}
        className="portfolio-btn-outline disabled:cursor-not-allowed disabled:opacity-40"
      >
        {copied ? "Copied" : "Copy"}
      </button>
      <button type="button" onClick={onReset} className="portfolio-btn-outline">
        Start over
      </button>
    </div>
  );
}
