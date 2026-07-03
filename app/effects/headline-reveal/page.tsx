import EffectsHeadlineReveal from "@/components/effects/EffectsHeadlineReveal";
import EffectsPageLayout from "@/components/effects/EffectsPageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Headline Reveal — Scroll Effect",
};

export default function HeadlineRevealEffectPage() {
  return (
    <EffectsPageLayout
      title="Split headline reveal"
      description="Words stagger in with blur, opacity, and vertical motion tied to scroll."
      tag="Typography"
    >
      <EffectsHeadlineReveal />
    </EffectsPageLayout>
  );
}
