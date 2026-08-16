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
    <div className="atlas-ticket px-5 py-6" role="status" aria-live="polite">
      <div className="flex items-center gap-3">
        <span
          className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-grid border-t-route"
          aria-hidden
        />
        <div>
          <p className="text-sm font-medium text-ink">Converting…</p>
          {fileName ? (
            <p className="font-mono text-xs text-muted">{fileName}</p>
          ) : null}
        </div>
      </div>

      <p className="mt-4 text-sm text-muted">{message}</p>

      <div className="mt-4 h-2 overflow-hidden bg-grid">
        <div
          className="h-full bg-route transition-[width] duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="mt-2 text-right font-mono text-xs tabular-nums text-muted">
        {percent}%
      </p>
    </div>
  );
}
