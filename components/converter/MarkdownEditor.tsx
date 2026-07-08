"use client";

type MarkdownEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <div className="shrink-0 border-b border-zinc-800 px-4 py-3">
        <h2 className="text-sm font-medium text-zinc-300">Markdown</h2>
      </div>
      <div className="relative min-h-0 flex-1">
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          spellCheck={false}
          className="absolute inset-0 h-full w-full resize-none overflow-y-auto bg-transparent px-4 py-4 font-mono text-sm leading-relaxed text-zinc-100 outline-none"
          placeholder="Converted markdown will appear here…"
        />
      </div>
    </div>
  );
}
