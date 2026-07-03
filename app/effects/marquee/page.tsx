import EffectsScrollMarquee from "@/components/effects/EffectsScrollMarquee";
import EffectsPageLayout from "@/components/effects/EffectsPageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scroll Marquee — Scroll Effect",
};

export default function MarqueeEffectPage() {
  return (
    <EffectsPageLayout
      title="Scroll-linked marquee"
      description="Marquee position and scale follow section scroll progress."
      tag="Marquee"
    >
      <EffectsScrollMarquee />
    </EffectsPageLayout>
  );
}
