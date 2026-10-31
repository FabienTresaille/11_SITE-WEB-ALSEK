"use client";

import React, { useState } from "react";
import PricingSection from "@/components/sections/PricingSection";
import FaqSection from "@/components/sections/FaqSection";
import Footer from "@/components/layout/Footer";
import MobileActionBar from "@/components/ui/MobileActionBar";

export default function OfferConversionFlow({
  topSections,
}: {
  topSections: React.ReactNode;
}) {
  const [selectedOffer, setSelectedOffer] = useState<string>("evolution");

  return (
    <>
      <main>
        {topSections}
        <PricingSection
          selectedOffer={selectedOffer}
          onSelectOffer={setSelectedOffer}
        />
        <FaqSection />
      </main>
      <Footer
        selectedOffer={selectedOffer}
        onSelectOffer={setSelectedOffer}
      />
      <MobileActionBar />
    </>
  );
}
