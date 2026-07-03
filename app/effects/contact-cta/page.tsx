import EffectsContactCta from "@/components/effects/EffectsContactCta";
import EffectsPageLayout from "@/components/effects/EffectsPageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact CTA — Scroll Effect",
};

export default function ContactCtaEffectPage() {
  return (
    <EffectsPageLayout
      title="Magnetic contact CTA"
      description="Call-to-action scales and glows as scroll progress completes."
      tag="CTA"
    >
      <EffectsContactCta />
    </EffectsPageLayout>
  );
}
