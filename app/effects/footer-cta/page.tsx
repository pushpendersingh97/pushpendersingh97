import EffectsFooterCta from "@/components/effects/EffectsFooterCta";
import EffectsPageLayout from "@/components/effects/EffectsPageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Footer CTA — Scroll Effect" };

export default function FooterCtaPage() {
  return (
    <EffectsPageLayout
      title="Footer CTA reveal"
      description="A bottom bar slides up after you pass roughly 70% page depth."
      tag="CTA"
    >
      <EffectsFooterCta />
    </EffectsPageLayout>
  );
}
