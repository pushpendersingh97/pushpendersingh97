import EffectsGeoPins from "@/components/effects/EffectsGeoPins";
import EffectsPageLayout from "@/components/effects/EffectsPageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Geo Pins — Scroll Effect" };

export default function GeoPinsPage() {
  return (
    <EffectsPageLayout
      title="Geo pin sequence"
      description="Locale pins drop onto a map photo as scroll progresses."
      tag="TMTC"
    >
      <EffectsGeoPins />
    </EffectsPageLayout>
  );
}
