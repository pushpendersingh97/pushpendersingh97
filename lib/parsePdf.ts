import * as pdfjs from "pdfjs-dist";

if (typeof globalThis !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url,
  ).toString();
}

type PdfTextItem = {
  str: string;
  x: number;
  y: number;
  height: number;
  fontName: string;
};

type PdfLine = {
  y: number;
  items: PdfTextItem[];
  text: string;
  height: number;
  fontName: string;
};

export type PdfProgressCallback = (progress: number, message: string) => void;

const Y_TOLERANCE = 4;

function isBoldFont(fontName: string): boolean {
  return /bold|black|heavy|semibold|demi/i.test(fontName);
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function groupIntoLines(items: PdfTextItem[]): PdfLine[] {
  const sorted = [...items].sort((a, b) => b.y - a.y || a.x - b.x);
  const lines: PdfLine[] = [];

  for (const item of sorted) {
    const existing = lines.find((line) => Math.abs(line.y - item.y) <= Y_TOLERANCE);

    if (existing) {
      const gap = item.x - (existing.items.at(-1)?.x ?? item.x);
      const spacer = existing.text.length > 0 && gap > item.height * 0.35 ? " " : "";
      existing.text += spacer + item.str;
      existing.items.push(item);
      existing.height = Math.max(existing.height, item.height);
      if (isBoldFont(item.fontName)) {
        existing.fontName = item.fontName;
      }
    } else {
      lines.push({
        y: item.y,
        items: [item],
        text: item.str,
        height: item.height,
        fontName: item.fontName,
      });
    }
  }

  return lines.sort((a, b) => b.y - a.y);
}

function headingLevel(
  lineHeight: number,
  medianHeight: number,
  bold: boolean,
): 0 | 1 | 2 | 3 {
  if (medianHeight <= 0) {
    return bold ? 2 : 0;
  }

  const ratio = lineHeight / medianHeight;

  if (ratio >= 1.75 || (ratio >= 1.45 && bold)) {
    return 1;
  }
  if (ratio >= 1.35 || (ratio >= 1.15 && bold)) {
    return 2;
  }
  if (ratio >= 1.2 && bold) {
    return 3;
  }

  return 0;
}

function lineToHtml(line: PdfLine, medianHeight: number): string {
  const text = line.text.trim();
  if (!text) {
    return "";
  }

  const level = headingLevel(line.height, medianHeight, isBoldFont(line.fontName));
  const safe = escapeHtml(text);

  if (level === 1) {
    return `<h1>${safe}</h1>`;
  }
  if (level === 2) {
    return `<h2>${safe}</h2>`;
  }
  if (level === 3) {
    return `<h3>${safe}</h3>`;
  }

  return `<p>${safe}</p>`;
}

export async function parsePdfToHtml(
  arrayBuffer: ArrayBuffer,
  onProgress?: PdfProgressCallback,
): Promise<string> {
  const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
  const { numPages } = pdf;
  const pageHtml: string[] = [];

  onProgress?.(0.05, `Loaded PDF (${numPages} page${numPages === 1 ? "" : "s"})`);

  for (let pageNum = 1; pageNum <= numPages; pageNum += 1) {
    onProgress?.(
      0.05 + (pageNum / numPages) * 0.9,
      `Extracting page ${pageNum} of ${numPages}`,
    );

    const page = await pdf.getPage(pageNum);
    const content = await page.getTextContent();
    const items: PdfTextItem[] = [];

    for (const raw of content.items) {
      if (!("str" in raw) || !raw.str.trim()) {
        continue;
      }

      const [, , , , x, y] = raw.transform;
      items.push({
        str: raw.str,
        x,
        y,
        height: Math.abs(raw.transform[3]) || Math.abs(raw.height) || 12,
        fontName: raw.fontName ?? "",
      });
    }

    const lines = groupIntoLines(items);
    const heights = lines.map((line) => line.height).sort((a, b) => a - b);
    const medianHeight =
      heights.length === 0
        ? 12
        : heights[Math.floor(heights.length / 2)] ?? 12;

    const body = lines.map((line) => lineToHtml(line, medianHeight)).join("\n");
    pageHtml.push(`<section data-page="${pageNum}">${body}</section>`);
  }

  onProgress?.(0.98, "Reconstructing document structure");

  return [
    '<article class="pdf-extract">',
  '<p><em>PDF conversion is best-effort — headings are inferred from font size. Tables may appear as plain text.</em></p>',
    pageHtml.join("\n"),
    "</article>",
  ].join("\n");
}
