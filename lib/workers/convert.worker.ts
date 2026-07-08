/// <reference lib="webworker" />

import { parseDocxToHtml } from "../parseDocx";
import { parsePdfToHtml } from "../parsePdf";

export type ConvertWorkerRequest = {
  type: "docx" | "pdf";
  buffer: ArrayBuffer;
};

export type ConvertWorkerMessage =
  | { type: "progress"; value: number; message: string }
  | { type: "result"; html: string }
  | { type: "error"; message: string };

self.onmessage = async (event: MessageEvent<ConvertWorkerRequest>) => {
  const { type, buffer } = event.data;

  try {
    let html: string;

    if (type === "docx") {
      self.postMessage({
        type: "progress",
        value: 0.15,
        message: "Parsing DOCX…",
      } satisfies ConvertWorkerMessage);
      html = await parseDocxToHtml(buffer);
    } else {
      html = await parsePdfToHtml(buffer, (value, message) => {
        self.postMessage({
          type: "progress",
          value,
          message,
        } satisfies ConvertWorkerMessage);
      });
    }

    self.postMessage({ type: "result", html } satisfies ConvertWorkerMessage);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Conversion failed unexpectedly";

    self.postMessage({ type: "error", message } satisfies ConvertWorkerMessage);
  }
};
