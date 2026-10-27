import React from "react";
import { SECTION_IDS } from "@/lib/constants";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { SkillProofCard } from "@/components/product-demo/SkillProofCard";

export function ProofCardSection() {
  return (
    <AnimatedSection
      id={SECTION_IDS.proofCard}
      className="border-b border-orange-200/70 bg-gradient-to-b from-yellow-50/55 via-[#FAF7F2] to-red-50/35 py-20 lg:py-28"
    >
      <div className="container">
        {/* Section Heading */}
        <div data-animate-header className="max-w-3xl space-y-4">
          <span className="font-mono text-xs uppercase tracking-widest text-lime">
            INTERACTIVE SKILL PROOF CARD · PRODUCT DEMONSTRATION
          </span>
          <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-[42px] leading-[1.12]">
            Every skill claim should have a reason.
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-ink-secondary">
            Inspect how Proof of Skill structures a candidate evaluation—linking
            skill claims to repository files, code excerpts, technical viva
            defenses, evaluation timestamps, and explicit observation-vs-inference
            boundaries.
          </p>
        </div>

        {/* Interactive Skill Proof Card Demo */}
        <div data-animate-item className="mt-12">
          <SkillProofCard />
        </div>
      </div>
    </AnimatedSection>
  );
}
