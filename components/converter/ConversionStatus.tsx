"use client";

type ConversionStatusProps = {
  progress: number;
  message: string;
  fileName?: string | null;
};

export default function ConversionStatus({
  progress,
  message,
  fileName,
}: ConversionStatusProps) {
  const percent = Math.round(progress * 100);

  return (
    <div
      className="rounded-2xl border border-zinc-800 bg-zinc-900/60 px-5 py-6"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-3">
        <span
          className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-zinc-600 border-t-sky-400"
          aria-hidden
        />
        <div>
          <p className="text-sm font-medium text-zinc-100">Converting…</p>
          {fileName ? (
            <p className="text-xs text-zinc-500">{fileName}</p>
          ) : null}
        </div>
      </div>

      <p className="mt-4 text-sm text-zinc-400">{message}</p>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-800">
        <div
          className="h-full rounded-full bg-sky-400 transition-[width] duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="mt-2 text-right text-xs tabular-nums text-zinc-500">
        {percent}%
      </p>
    </div>
  );
}
