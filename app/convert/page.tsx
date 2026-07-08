import DocumentConverter from "@/components/converter/DocumentConverter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DOCX / PDF / Paste → Markdown — Client-side Converter",
  description:
    "Convert Word documents, PDFs, or pasted rich text to Markdown entirely in your browser.",
};

export default function ConvertPage() {
  return <DocumentConverter />;
}
