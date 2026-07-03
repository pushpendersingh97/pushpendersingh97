import EffectsSectionNav from "@/components/effects/EffectsSectionNav";
import EffectsPageLayout from "@/components/effects/EffectsPageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Section Nav — Scroll Effect",
};

export default function SectionNavEffectPage() {
  return (
    <EffectsPageLayout
      title="Section nav dots"
      description="Five image chapters with a fixed rail that tracks which section is in view."
      tag="Navigation"
    >
      <EffectsSectionNav />
    </EffectsPageLayout>
  );
}
