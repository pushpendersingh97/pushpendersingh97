import EffectsHighlightSweep from "@/components/effects/EffectsHighlightSweep";
import EffectsPageLayout from "@/components/effects/EffectsPageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Highlight Sweep — Scroll Effect" };

export default function HighlightSweepPage() {
  return (
    <EffectsPageLayout
      title="Text highlight sweep"
      description="Highlighter passes over key words as scroll progress advances."
      tag="Typography"
    >
      <EffectsHighlightSweep />
    </EffectsPageLayout>
  );
}
