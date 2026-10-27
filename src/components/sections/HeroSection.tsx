"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight, ChevronRight, ShieldCheck, TerminalSquare } from "lucide-react";
import { HERO_CONTENT } from "@/data/site-content";
import { SECTION_IDS } from "@/lib/constants";
import { scrollToSection } from "@/lib/utils";
import { useAnimationContext } from "@/components/animations/AnimationProvider";
import { Button } from "@/components/ui/button";
import { GridBackground } from "@/components/visuals/GridBackground";
import { VisualStage } from "@/components/visuals/VisualStage";
import { RepositoryPreview } from "@/components/product-demo/RepositoryPreview";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { prefersReducedMotion } = useAnimationContext();

  useGSAP(
    () => {
      if (prefersReducedMotion || !sectionRef.current) return;

      const copyNodes = sectionRef.current.querySelectorAll("[data-hero-copy]");
      gsap.from(copyNodes, {
        y: 18,
        opacity: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: "power3.out",
        clearProps: "transform,opacity",
      });
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <section
      id={SECTION_IDS.hero}
      ref={sectionRef}
      className="relative overflow-hidden border-b border-hairline pb-20 pt-10 sm:pb-24 sm:pt-14 lg:pb-28 lg:pt-20"
    >
      <GridBackground density="fine" showRadialGlow />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          {/* Left Column: Core Product Pitch */}
          <div className="lg:col-span-6 space-y-6">
            {/* Eyebrow */}
            <div data-hero-copy className="inline-flex items-center gap-2.5 rounded-full border border-hairline-strong bg-canvas-secondary/90 px-3.5 py-1.5">
              <span className="h-2 w-2 rounded-full bg-lime shadow-[0_0_10px_#C5FF4A]" />
              <span className="font-mono text-[11px] font-medium tracking-wider text-ink-secondary">
                {HERO_CONTENT.eyebrow}
              </span>
            </div>

            {/* Editorial Headline */}
            <h1
              data-hero-copy
              className="text-4xl font-semibold tracking-[-0.03em] text-ink sm:text-5xl lg:text-[54px] xl:text-[60px] leading-[1.06]"
            >
              {HERO_CONTENT.headlineLead}
              <span className="text-lime">{HERO_CONTENT.headlineAccent}</span>
              {HERO_CONTENT.headlineTail}
            </h1>

            {/* Supporting Paragraph */}
            <p
              data-hero-copy
              className="max-w-xl text-base sm:text-lg leading-relaxed text-ink-secondary"
            >
              {HERO_CONTENT.supportingParagraph}
            </p>

            {/* Primary & Secondary CTAs */}
            <div
              data-hero-copy
              className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center"
            >
              <Button
                type="button"
                size="xl"
                onClick={() => scrollToSection(HERO_CONTENT.primaryCta.href)}
                className="justify-center"
              >
                {HERO_CONTENT.primaryCta.label}
                <ArrowRight className="h-4 w-4" />
              </Button>

              <Button
                type="button"
                variant="outline"
                size="xl"
                onClick={() => scrollToSection(HERO_CONTENT.secondaryCta.href)}
                className="justify-center"
              >
                {HERO_CONTENT.secondaryCta.label}
                <ChevronRight className="h-4 w-4 text-ink-secondary" />
              </Button>
            </div>

            {/* Supporting Line */}
            <p
              data-hero-copy
              className="border-l-2 border-lime/50 pl-3.5 text-sm leading-relaxed text-ink-secondary"
            >
              {HERO_CONTENT.supportingLine}
            </p>

            {/* Compact Architectural Signal Strip */}
            <div
              data-hero-copy
              className="grid grid-cols-2 gap-3 border-t border-hairline pt-6 sm:grid-cols-3"
            >
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-lime">
                  <TerminalSquare className="h-3.5 w-3.5" />
                  REPO INTELLIGENCE
                </span>
                <p className="text-xs text-ink-muted">
                  File-anchored code & architecture inspection
                </p>
              </div>
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-violet">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet" />
                  AI TECHNICAL VIVA
                </span>
                <p className="text-xs text-ink-muted">
                  Adaptive code-defense questions & rubrics
                </p>
              </div>
              <div className="col-span-2 sm:col-span-1 space-y-1">
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-ink">
                  <ShieldCheck className="h-3.5 w-3.5 text-lime" />
                  HUMAN OVERSIGHT
                </span>
                <p className="text-xs text-ink-muted">
                  Inspectable proof—never automatic rejection
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Isolated VisualStage for Product Visualization */}
          <div className="lg:col-span-6">
            <VisualStage
              stageLabel="Repository Intelligence Interface Illustration"
              minHeightClass="min-h-[540px]"
            >
              <RepositoryPreview />
            </VisualStage>
          </div>
        </div>
      </div>
    </section>
  );
}
