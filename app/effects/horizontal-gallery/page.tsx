import EffectsHorizontalGallery from "@/components/effects/EffectsHorizontalGallery";
import EffectsPageLayout from "@/components/effects/EffectsPageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Horizontal Gallery — Scroll Effect",
};

export default function HorizontalGalleryEffectPage() {
  return (
    <EffectsPageLayout
      title="Horizontal gallery"
      description="Pinned stage with a sideways-scrolling product strip driven by scroll."
      tag="Gallery"
    >
      <EffectsHorizontalGallery />
    </EffectsPageLayout>
  );
}
