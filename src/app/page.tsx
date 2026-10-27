import React from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { SolutionSection } from "@/components/sections/SolutionSection";
import { ProofCardSection } from "@/components/sections/ProofCardSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { CandidatesSection } from "@/components/sections/CandidatesSection";
import { RecruitersSection } from "@/components/sections/RecruitersSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { UseCasesSection } from "@/components/sections/UseCasesSection";
import { RoadmapSection } from "@/components/sections/RoadmapSection";

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
    <div className="flex min-h-screen flex-col">
      {/* Section 1: Navigation Bar */}
      <Navbar />

      <main id="main-content" className="flex-1">
        {/* Section 2: Hero — The Core Product Message */}
        <HeroSection />

        {/* Section 3: The Problem */}
        <ProblemSection />

        {/* Section 4: The Solution */}
        <SolutionSection />

        {/* Section 5: Feature Explorer (All 38 Features Across 6 Categories) */}
        <FeatureExplorerSection />

        {/* Section 6: Interactive Skill Proof Card */}
        <ProofCardSection />

        {/* Section 7: How It Works */}
        <HowItWorksSection />

        {/* Section 8: For Candidates */}
        <CandidatesSection />

        {/* Section 9: For Recruiters */}
        <RecruitersSection />

        {/* Section 10: Fairness, Privacy & Trust */}
        <TrustSection />

        {/* Section 11: Use Cases */}
        <UseCasesSection />

        {/* Section 12: Product Roadmap */}
        <RoadmapSection />

        {/* Section 13: Frequently Asked Questions */}
        <FAQSection />

        {/* Section 14: Final Call to Action */}
        <CTASection />
      </main>

      {/* Section 15: Footer */}
      <Footer />
    </div>
  );
}
