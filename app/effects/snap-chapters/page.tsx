import EffectsSnapChapters from "@/components/effects/EffectsSnapChapters";
import EffectsPageLayout from "@/components/effects/EffectsPageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Snap Chapters — Scroll Effect" };

export default function SnapChaptersPage() {
  return (
    <EffectsPageLayout
      title="Scroll snap chapters"
      description="Snap-scrolling beats with image chapters and a heading pulse on each stop."
      tag="Snap"
    >
      <EffectsSnapChapters />
    </EffectsPageLayout>
  );
}
