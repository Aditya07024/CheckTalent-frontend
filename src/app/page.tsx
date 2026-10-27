import React from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { RepoShowcaseSection } from "@/components/sections/RepoShowcaseSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { SolutionSection } from "@/components/sections/SolutionSection";
import { ProofCardSection } from "@/components/sections/ProofCardSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { CandidatesSection } from "@/components/sections/CandidatesSection";
import { RecruitersSection } from "@/components/sections/RecruitersSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { UseCasesSection } from "@/components/sections/UseCasesSection";
import { RoadmapSection } from "@/components/sections/RoadmapSection";
import { GlobalExperience3D } from "@/components/three/GlobalExperience3D";
import { PolyglotMarquee3D } from "@/components/three/PolyglotMarquee3D";

const FeatureExplorerSection = dynamic(() =>
  import("@/components/sections/FeatureExplorerSection").then(
    (mod) => mod.FeatureExplorerSection
  )
);

const FAQSection = dynamic(() =>
  import("@/components/sections/FAQSection").then((mod) => mod.FAQSection)
);

const CTASection = dynamic(() =>
  import("@/components/sections/CTASection").then((mod) => mod.CTASection)
);

export default function HomePage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Full-Viewport Scroll-Reactive Three.js 3D World + 3D Scroll HUD */}
      <GlobalExperience3D />

      {/* Navigation Bar */}
      <Navbar />

      <main id="main-content" className="relative z-[2] flex-1">
        {/* Page 1: Clean Hero + Floating Open-Air 3D Orbit */}
        <HeroSection />

        {/* 3D Extruded Polyglot Stack Ribbon */}
        <PolyglotMarquee3D />

        {/* Page 2: Shifted Repository Intelligence & Viva Preview */}
        <RepoShowcaseSection />

        {/* The Problem */}
        <ProblemSection />

        {/* The Solution */}
        <SolutionSection />

        {/* Feature Explorer (All 38 Features Across 6 Categories) */}
        <FeatureExplorerSection />

        {/* Interactive Skill Proof Card */}
        <ProofCardSection />

        {/* How It Works */}
        <HowItWorksSection />

        {/* For Candidates */}
        <CandidatesSection />

        {/* For Recruiters */}
        <RecruitersSection />

        {/* Fairness, Privacy & Trust */}
        <TrustSection />

        {/* Use Cases */}
        <UseCasesSection />

        {/* Product Roadmap */}
        <RoadmapSection />

        {/* Frequently Asked Questions */}
        <FAQSection />

        {/* Final Call to Action */}
        <CTASection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
