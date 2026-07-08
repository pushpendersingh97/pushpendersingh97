"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type MarkdownPreviewProps = {
  markdown: string;
};

export default function MarkdownPreview({ markdown }: MarkdownPreviewProps) {
  const [debounced, setDebounced] = useState(markdown);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(markdown), 150);
    return () => window.clearTimeout(timer);
  }, [markdown]);

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <div className="shrink-0 border-b border-zinc-800 px-4 py-3">
        <h2 className="text-sm font-medium text-zinc-300">Preview</h2>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4">
        {debounced ? (
          <article className="converter-preview">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{debounced}</ReactMarkdown>
          </article>
        ) : (
          <p className="text-sm text-zinc-500">Live preview updates as you edit.</p>
        )}
      </div>
    </div>
  );
}
