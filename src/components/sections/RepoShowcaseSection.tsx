"use client";

import React from "react";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { RepositoryPreview } from "@/components/product-demo/RepositoryPreview";
import { VisualStage } from "@/components/visuals/VisualStage";
import { TiltCard3D } from "@/components/visuals/TiltCard3D";
import { Floating3DCube } from "@/components/three/Floating3DCube";

/**
 * Second-fold showcase housing the Repository Intelligence & Code Defense
 * preview shifted out of the Hero section for an uncongested layout.
 */
export function RepoShowcaseSection() {
  return (
    <AnimatedSection
      id="repository-preview"
      className="relative border-b border-orange-200/70 bg-gradient-to-b from-amber-50/45 via-transparent to-orange-50/35 py-16 lg:py-24"
    >
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          {/* Left Concise Context + Floating 3D Cube */}
          <div data-animate-header className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-4">
              <Floating3DCube label="AST" tone="orange" size={48} />
              <span className="rounded-full border border-orange-300 bg-orange-50 px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-orange-800">
                LIVE REPOSITORY INSPECTION
              </span>
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl leading-[1.12]">
              From source files directly to code-defense questions.
            </h2>

            <p className="text-base leading-relaxed text-ink-secondary">
              Proof of Skill indexes modular boundaries, API error handling, and
              test coverage—then generates targeted technical viva prompts tied
              to exact file lines.
            </p>
          </div>

          {/* Right Shifted RepositoryPreview in a 3D Tilt Stage */}
          <div data-animate-item className="lg:col-span-7">
            <TiltCard3D maxTiltDeg={4.5} glowColor="rgba(249, 115, 22, 0.18)">
              <VisualStage
                stageLabel="Repository Intelligence and Code Defense Preview"
                minHeightClass="min-h-[420px]"
              >
                <RepositoryPreview />
              </VisualStage>
            </TiltCard3D>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
