import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";

let turndown: TurndownService | null = null;

function getTurndown(): TurndownService {
  if (!turndown) {
    turndown = new TurndownService({
      headingStyle: "atx",
      codeBlockStyle: "fenced",
      bulletListMarker: "-",
    });
    turndown.use(gfm);
    turndown.remove(["script", "style"]);
  }

  return turndown;
}

export function htmlToMarkdown(html: string): string {
  return getTurndown().turndown(html).trim();
}
