"use client";

import { useCallback } from "react";
import { useDropzone, type FileRejection } from "react-dropzone";
import {
  ACCEPT_MIME,
  isAcceptedFile,
  MAX_FILE_SIZE_BYTES,
} from "@/lib/converterConstants";

type FileDropzoneProps = {
  disabled?: boolean;
  onFileAccepted: (file: File) => void;
  onFileRejected: (message: string) => void;
};

export default function FileDropzone({
  disabled = false,
  onFileAccepted,
  onFileRejected,
}: FileDropzoneProps) {
  const onDrop = useCallback(
    (accepted: File[], rejected: FileRejection[]) => {
      if (rejected.length > 0) {
        onFileRejected(rejected[0]?.errors[0]?.message ?? "File rejected");
        return;
      }

      const file = accepted[0];
      if (!file) {
        return;
      }

      const validation = isAcceptedFile(file);
      if (!validation.ok) {
        onFileRejected(validation.error ?? "Invalid file");
        return;
      }

      onFileAccepted(file);
    },
    [onFileAccepted, onFileRejected],
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject, open } =
    useDropzone({
      onDrop,
      disabled,
      multiple: false,
      maxSize: MAX_FILE_SIZE_BYTES,
      accept: ACCEPT_MIME,
    });

  return (
    <div
      {...getRootProps()}
      className={[
        "flex min-h-56 cursor-pointer flex-col items-center justify-center border-2 border-dashed px-6 py-10 text-center transition-colors",
        disabled ? "cursor-not-allowed opacity-60" : "hover:border-route/70",
        isDragReject
          ? "border-stamp/70 bg-stamp/5"
          : isDragActive
            ? "border-route bg-route/10"
            : "border-grid bg-paper",
      ].join(" ")}
    >
      <input {...getInputProps()} />

      <p className="font-display text-lg font-bold tracking-tight text-ink uppercase">
        {isDragActive ? "Drop to convert" : "Drag & drop a document"}
      </p>
      <p className="mt-2 max-w-sm text-sm text-muted">
        DOCX or PDF · up to {MAX_FILE_SIZE_BYTES / (1024 * 1024)} MB · processed
        entirely in your browser
      </p>

      <button
        type="button"
        disabled={disabled}
        onClick={(event) => {
          event.stopPropagation();
          open();
        }}
        className="portfolio-btn-outline mt-5 disabled:pointer-events-none"
      >
        Choose file
      </button>
    </div>
  );
}
