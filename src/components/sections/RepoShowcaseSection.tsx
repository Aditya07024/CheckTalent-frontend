"use client";

import React from "react";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { RepositoryPreview } from "@/components/product-demo/RepositoryPreview";
import { VisualStage } from "@/components/visuals/VisualStage";
import { TiltCard3D } from "@/components/visuals/TiltCard3D";
import { Floating3DCube } from "@/components/three/Floating3DCube";
import { GridBackground } from "@/components/visuals/GridBackground";

/**
 * Second-fold showcase housing the Repository Intelligence & Code Defense
 * preview shifted out of the Hero section for an uncongested layout.
 */
export function RepoShowcaseSection() {
  return (
    <AnimatedSection
      id="repository-preview"
      className="relative border-b border-orange-200/70 bg-gradient-to-b from-amber-50/45 via-transparent to-orange-50/35 py-16 lg:py-24 overflow-hidden"
    >
      <GridBackground density="fine" showRadialGlow />

      {/* Warm glow behind the visual stage */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[10%] top-1/2 h-[480px] w-[480px] -translate-y-1/2 rounded-full bg-gradient-to-tr from-yellow-300/25 via-orange-300/20 to-red-300/15 blur-2xl transform-gpu will-change-transform"
      />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          {/* Left Concise Context + Floating 3D Cube (aligns with Hero left margin) */}
          <div data-animate-header className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <Floating3DCube label="AST" tone="orange" size={44} />
              <div className="inline-flex items-center gap-2.5 rounded-full border-2 border-orange-300 bg-white/90 px-3.5 py-1.5 shadow-sm">
                <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 ring-4 ring-amber-200/80 animate-pulse" />
                <span className="font-mono text-[11px] font-bold tracking-wider text-orange-900 uppercase">
                  LIVE REPOSITORY INSPECTION
                </span>
              </div>
            </div>

            <h2 className="aldrich-regular font-bold text-3xl tracking-tight text-ink sm:text-4xl lg:text-[44px] leading-[1.12]">
              From source files directly to{" "}
              <span className="bg-gradient-to-r from-orange-600 via-red-600 to-amber-600 bg-clip-text text-transparent">
                code-defense questions.
              </span>
            </h2>

            <p className="text-base sm:text-lg leading-relaxed text-ink-secondary font-quantico italic quantico-regular-italic">
              CheckTalent indexes modular boundaries, API error handling, and
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
