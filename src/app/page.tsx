import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { MinimalRoleDashboards } from "@/components/sections/MinimalRoleDashboards";
import { MinimalHowItWorks } from "@/components/sections/MinimalHowItWorks";
import { MinimalForensicsSpotlight } from "@/components/sections/MinimalForensicsSpotlight";
import { ProofCardSection } from "@/components/sections/ProofCardSection";
import { MinimalFAQ } from "@/components/sections/MinimalFAQ";
import { MinimalCTA } from "@/components/sections/MinimalCTA";
import { GlobalExperience3D } from "@/components/three/GlobalExperience3D";
import { PolyglotMarquee3D } from "@/components/three/PolyglotMarquee3D";

export default function HomePage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      {/* 3D Global Experience */}
      <GlobalExperience3D />

      {/* Navigation */}
      <Navbar />

      <main id="main-content" className="relative z-[2] flex-1">
        {/* 1. Hero with minimal punchy statement & direct CTAs */}
        <HeroSection />

        {/* 2. 3D Marquee */}
        <PolyglotMarquee3D />

        {/* 3. The Three Tailored Dashboards */}
        <MinimalRoleDashboards />

        {/* 4. Simple 3-Step Verification Pipeline */}
        <MinimalHowItWorks />

        {/* 5. AI Detection & Tutorial Plagiarism Forensics Spotlight */}
        <MinimalForensicsSpotlight />

        {/* 6. Interactive Verifiable Skill Proof Card */}
        <ProofCardSection />

        {/* 7. Concise Minimal FAQs */}
        <MinimalFAQ />

        {/* 8. Clean Final Action Banner */}
        <MinimalCTA />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
