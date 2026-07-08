"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { AcceptedExtension } from "@/lib/converterConstants";
import { htmlToMarkdown } from "@/lib/htmlToMarkdown";
import { pasteToMarkdown } from "@/lib/pasteToMarkdown";
import type { ConvertWorkerMessage } from "@/lib/workers/convert.worker";

export type ConversionPhase = "idle" | "converting" | "ready" | "error";

export type ConversionState = {
  phase: ConversionPhase;
  progress: number;
  message: string;
  error: string | null;
  sourceName: string | null;
  markdown: string;
};

const initialState: ConversionState = {
  phase: "idle",
  progress: 0,
  message: "",
  error: null,
  sourceName: null,
  markdown: "",
};

export function useDocumentConverter() {
  const workerRef = useRef<Worker | null>(null);
  const [state, setState] = useState<ConversionState>(initialState);

  useEffect(() => {
    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const reset = useCallback(() => {
    workerRef.current?.terminate();
    workerRef.current = null;
    setState(initialState);
  }, []);

  const convertFile = useCallback((file: File, extension: AcceptedExtension) => {
    workerRef.current?.terminate();

    setState({
      phase: "converting",
      progress: 0,
      message: "Starting conversion…",
      error: null,
      sourceName: file.name,
      markdown: "",
    });

    const worker = new Worker(
      new URL("@/lib/workers/convert.worker.ts", import.meta.url),
    );
    workerRef.current = worker;

    worker.onmessage = (event: MessageEvent<ConvertWorkerMessage>) => {
      const payload = event.data;

      if (payload.type === "progress") {
        setState((prev) => ({
          ...prev,
          progress: payload.value,
          message: payload.message,
        }));
        return;
      }

      if (payload.type === "error") {
        setState((prev) => ({
          ...prev,
          phase: "error",
          error: payload.message,
          message: "",
        }));
        worker.terminate();
        workerRef.current = null;
        return;
      }

      const markdown = htmlToMarkdown(payload.html);
      setState((prev) => ({
        ...prev,
        phase: "ready",
        progress: 1,
        message: "Conversion complete",
        markdown,
      }));
      worker.terminate();
      workerRef.current = null;
    };

    worker.onerror = () => {
      setState((prev) => ({
        ...prev,
        phase: "error",
        error: "Worker failed — try a smaller file or refresh the page",
        message: "",
      }));
      worker.terminate();
      workerRef.current = null;
    };

    file.arrayBuffer().then((buffer) => {
      worker.postMessage({
        type: extension === ".docx" ? "docx" : "pdf",
        buffer,
      });
    });
  }, []);

  const setMarkdown = useCallback((markdown: string) => {
    setState((prev) => ({ ...prev, markdown }));
  }, []);

  const convertPaste = useCallback(
    (html: string | null, plainText: string) => {
      workerRef.current?.terminate();
      workerRef.current = null;

      try {
        const markdown = pasteToMarkdown(html, plainText);

        if (!markdown) {
          setState((prev) => ({
            ...prev,
            phase: "error",
            error: "Nothing to convert — paste some text first",
            message: "",
          }));
          return;
        }

        setState({
          phase: "ready",
          progress: 1,
          message: "Conversion complete",
          error: null,
          sourceName: "Pasted content",
          markdown,
        });
      } catch {
        setState((prev) => ({
          ...prev,
          phase: "error",
          error: "Failed to convert pasted content",
          message: "",
        }));
      }
    },
    [],
  );

  return { state, convertFile, convertPaste, setMarkdown, reset };
}
