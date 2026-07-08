import { htmlToMarkdown } from "@/lib/htmlToMarkdown";

function looksLikeHtml(text: string): boolean {
  return /<[a-z][\s\S]*>/i.test(text.trim());
}

function cleanPastedHtml(html: string): string {
  const doc = new DOMParser().parseFromString(html, "text/html");
  doc.querySelectorAll("style, meta, link, script").forEach((node) => {
    node.remove();
  });
  return doc.body.innerHTML;
}

export function pasteToMarkdown(
  html: string | null | undefined,
  plainText: string,
): string {
  const trimmedPlain = plainText.trim();
  const trimmedHtml = html?.trim() ?? "";

  if (trimmedHtml && trimmedHtml !== trimmedPlain) {
    const markdown = htmlToMarkdown(cleanPastedHtml(trimmedHtml));
    if (markdown) {
      return markdown;
    }
  }

  if (looksLikeHtml(trimmedPlain)) {
    const markdown = htmlToMarkdown(cleanPastedHtml(trimmedPlain));
    if (markdown) {
      return markdown;
    }
  }

  return trimmedPlain;
}
