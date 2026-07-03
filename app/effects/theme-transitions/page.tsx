import EffectsThemeTransitions from "@/components/effects/EffectsThemeTransitions";
import EffectsPageLayout from "@/components/effects/EffectsPageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Theme Transitions — Scroll Effect",
};

export default function ThemeTransitionsEffectPage() {
  return (
    <EffectsPageLayout
      title="Theme transitions"
      description="Background palette crossfades across four narrative phases."
      tag="Theme"
    >
      <EffectsThemeTransitions />
    </EffectsPageLayout>
  );
}
