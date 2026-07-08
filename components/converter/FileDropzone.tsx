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
        "flex min-h-56 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-10 text-center transition-colors",
        disabled ? "cursor-not-allowed opacity-60" : "hover:border-sky-400/60",
        isDragReject
          ? "border-red-400/70 bg-red-500/5"
          : isDragActive
            ? "border-sky-400 bg-sky-500/10"
            : "border-zinc-700 bg-zinc-900/40",
      ].join(" ")}
    >
      <input {...getInputProps()} />

      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800 text-xl">
        📄
      </div>

      <p className="text-base font-medium text-zinc-100">
        {isDragActive ? "Drop to convert" : "Drag & drop a document"}
      </p>
      <p className="mt-2 max-w-sm text-sm text-zinc-400">
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
        className="mt-5 rounded-full border border-zinc-600 bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-100 transition-colors hover:border-sky-400 hover:text-sky-300 disabled:pointer-events-none"
      >
        Choose file
      </button>
    </div>
  );
}
