import React from "react";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import LogoMarquee from "@/components/sections/LogoMarquee";
import VideoWallSection from "@/components/sections/VideoWallSection";
import ProcessSection from "@/components/sections/ProcessSection";
import OfferConversionFlow from "@/components/sections/OfferConversionFlow";
import JsonLd from "@/components/seo/JsonLd";

export default function HomePage() {
  return (
    <>
      <JsonLd />
      <Navbar />
      <OfferConversionFlow
        topSections={
          <>
            <HeroSection />
            <LogoMarquee />
            <VideoWallSection />
            <ProcessSection />
          </>
        }
      />
    </>
  );
}
