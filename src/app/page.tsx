import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { RepoShowcaseSection } from "@/components/sections/RepoShowcaseSection";
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
        {/* Page 1: Hero with minimal punchy statement, CTAs & 3D Language Orbit */}
        <HeroSection />

        {/* 3D Extruded Polyglot Stack Ribbon */}
        <PolyglotMarquee3D />

        {/* Page 2: Shifted Repository Intelligence & Live Viva Preview */}
        <RepoShowcaseSection />

        {/* Page 3: The Three Tailored Workspaces (Candidate, Recruiter, Campus) */}
        <MinimalRoleDashboards />

        {/* Page 4: Simple 3-Step Verification Pipeline */}
        <MinimalHowItWorks />

        {/* Page 5: AI Detection & Tutorial Plagiarism Forensics Spotlight */}
        <MinimalForensicsSpotlight />

        {/* Page 6: Interactive Verifiable Skill Proof Card */}
        <ProofCardSection />

        {/* Page 7: Concise Minimal FAQs */}
        <MinimalFAQ />

        {/* Page 8: Clean Final Action Banner */}
        <MinimalCTA />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
