export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

export const ACCEPTED_EXTENSIONS = [".docx", ".pdf"] as const;

export type AcceptedExtension = (typeof ACCEPTED_EXTENSIONS)[number];

export const ACCEPT_MIME: Record<string, AcceptedExtension[]> = {
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
    ".docx",
  ],
  "application/pdf": [".pdf"],
};

export function getExtension(filename: string): string {
  const dot = filename.lastIndexOf(".");
  return dot === -1 ? "" : filename.slice(dot).toLowerCase();
}

export function isAcceptedFile(file: File): {
  ok: boolean;
  extension?: AcceptedExtension;
  error?: string;
} {
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      ok: false,
      error: `File exceeds ${MAX_FILE_SIZE_BYTES / (1024 * 1024)} MB limit`,
    };
  }

  const ext = getExtension(file.name) as AcceptedExtension;
  if (!ACCEPTED_EXTENSIONS.includes(ext)) {
    return { ok: false, error: "Only .docx and .pdf files are supported" };
  }

  return { ok: true, extension: ext };
}
