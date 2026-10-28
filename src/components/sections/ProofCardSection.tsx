"use client";

import React from "react";
import { SECTION_IDS } from "@/lib/constants";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { SkillProofCard } from "@/components/product-demo/SkillProofCard";
import { SectionSculpture3D } from "@/components/three/SectionSculpture3D";

export function ProofCardSection() {
  return (
    <AnimatedSection
      id={SECTION_IDS.proofCard}
      className="border-b border-orange-200/70 bg-gradient-to-b from-yellow-50/45 via-transparent to-red-50/35 py-20 lg:py-28"
    >
      <div className="container">
        {/* Section Heading + Floating Open-Air 3D Crystal Sculpture */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div data-animate-header className="max-w-3xl space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-lime">
              INTERACTIVE SKILL PROOF CARD · PRODUCT DEMONSTRATION
            </span>
            <h2 className="graduate-regular font-bold text-3xl tracking-tight text-ink sm:text-4xl lg:text-[42px] leading-[1.12]">
              Every skill claim should have a reason.
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-ink-secondary">
              Inspect how CheckTalent structures a candidate evaluation—linking
              skill claims to repository files, code excerpts, technical viva
              defenses, evaluation timestamps, and explicit observation-vs-inference
              boundaries.
            </p>
          </div>
          <SectionSculpture3D variant="crystal" className="hidden lg:block" />
        </div>

        {/* Interactive Skill Proof Card Demo (Fixed, no mouse tilt) */}
        <div data-animate-item className="mt-12">
          <SkillProofCard />
        </div>
      </div>
    </AnimatedSection>
  );
}
