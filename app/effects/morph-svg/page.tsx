import EffectsMorphSvg from "@/components/effects/EffectsMorphSvg";
import EffectsPageLayout from "@/components/effects/EffectsPageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Morph SVG — Scroll Effect" };

export default function MorphSvgPage() {
  return (
    <EffectsPageLayout
      title="Morphing SVG icons"
      description="Circle, folder, and checkmark crossfade through ship / deploy / success."
      tag="SVG"
    >
      <EffectsMorphSvg />
    </EffectsPageLayout>
  );
}
