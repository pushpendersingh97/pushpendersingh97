import EffectsBeforeAfter from "@/components/effects/EffectsBeforeAfter";
import EffectsPageLayout from "@/components/effects/EffectsPageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Before / After — Scroll Effect",
};

export default function BeforeAfterEffectPage() {
  return (
    <EffectsPageLayout
      title="Before / after scrub"
      description="Scroll-scrub comparison between legacy and refactored UI states."
      tag="Scrub"
    >
      <EffectsBeforeAfter />
    </EffectsPageLayout>
  );
}
