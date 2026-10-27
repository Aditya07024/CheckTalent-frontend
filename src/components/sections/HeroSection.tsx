"use client";

import React, { useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  ArrowRight,
  ChevronRight,
  Code2,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
} from "lucide-react";
import { HERO_CONTENT } from "@/data/site-content";
import { SECTION_IDS } from "@/lib/constants";
import { scrollToSection } from "@/lib/utils";
import { useAnimationContext } from "@/components/animations/AnimationProvider";
import { Button } from "@/components/ui/button";
import { GridBackground } from "@/components/visuals/GridBackground";
import { VisualStage } from "@/components/visuals/VisualStage";
import { RepositoryPreview } from "@/components/product-demo/RepositoryPreview";

const LanguageOrbit3D = dynamic(
  () =>
    import("@/components/visuals/LanguageOrbit3D").then(
      (mod) => mod.LanguageOrbit3D
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[225px] sm:h-[245px] w-full items-center justify-center rounded-xl border border-orange-300/60 bg-gradient-to-br from-[#1F140D] via-[#2E190E] to-[#3B1310] font-mono text-xs text-amber-200">
        Initializing 3D Polyglot Constellation...
      </div>
    ),
  }
);

const HERO_LANGUAGE_PILLS = [
  { label: "TypeScript", badge: "bg-orange-100 text-orange-900 border-orange-300" },
  { label: "React", badge: "bg-amber-100 text-amber-900 border-amber-300" },
  { label: "Python", badge: "bg-yellow-100 text-yellow-900 border-yellow-400" },
  { label: "Node.js", badge: "bg-red-100 text-red-900 border-red-300" },
  { label: "Go", badge: "bg-amber-100 text-amber-900 border-amber-300" },
  { label: "Rust", badge: "bg-orange-100 text-orange-900 border-orange-300" },
  { label: "Java", badge: "bg-red-100 text-red-900 border-red-300" },
  { label: "SQL", badge: "bg-yellow-100 text-yellow-900 border-yellow-400" },
] as const;

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
      className="relative overflow-hidden border-b border-orange-200/70 bg-gradient-to-b from-yellow-50/60 via-[#FAF7F2] to-orange-50/40 pb-20 pt-10 sm:pb-24 sm:pt-14 lg:pb-28 lg:pt-16"
    >
      <GridBackground density="fine" showRadialGlow />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-12">
          {/* Left Column: Core Product Pitch */}
          <div className="lg:col-span-6 space-y-6 lg:pt-4">
            {/* Eyebrow */}
            <div
              data-hero-copy
              className="inline-flex items-center gap-2.5 rounded-full border border-orange-300/90 bg-gradient-to-r from-yellow-50 via-white to-orange-50 px-3.5 py-1.5 shadow-sm"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 ring-4 ring-amber-200/80" />
              <span className="font-mono text-[11px] font-bold tracking-wider text-orange-900">
                {HERO_CONTENT.eyebrow}
              </span>
            </div>

            {/* Editorial Headline */}
            <h1
              data-hero-copy
              className="text-4xl font-bold tracking-[-0.03em] text-ink sm:text-5xl lg:text-[54px] xl:text-[60px] leading-[1.08]"
            >
              {HERO_CONTENT.headlineLead}
              <span className="relative inline-block rounded-lg bg-gradient-to-r from-yellow-200/90 via-amber-200/80 to-orange-200/85 px-2.5 py-0.5 text-transparent bg-clip-text box-decoration-clone">
                <span className="bg-gradient-to-r from-orange-700 via-red-600 to-amber-700 bg-clip-text text-transparent">
                  {HERO_CONTENT.headlineAccent}
                </span>
              </span>
              {HERO_CONTENT.headlineTail}
            </h1>

            {/* Supporting Paragraph */}
            <p
              data-hero-copy
              className="max-w-xl text-base sm:text-lg leading-relaxed text-ink-secondary"
            >
              {HERO_CONTENT.supportingParagraph}
            </p>

            {/* 3D Tactile Polyglot Language Strip */}
            <div data-hero-copy className="space-y-2">
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-orange-800">
                <Code2 className="h-3.5 w-3.5 text-red-600" />
                Multi-Language Code Intelligence
              </span>
              <div className="flex flex-wrap gap-2">
                {HERO_LANGUAGE_PILLS.map((pill) => (
                  <span
                    key={pill.label}
                    className={`rounded-md border px-2.5 py-1 font-mono text-xs font-semibold shadow-[0_2px_0_rgba(120,53,15,0.12)] transition-transform hover:-translate-y-0.5 ${pill.badge}`}
                  >
                    {pill.label}
                  </span>
                ))}
              </div>
            </div>

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
                <ChevronRight className="h-4 w-4 text-orange-700" />
              </Button>
            </div>

            {/* Supporting Line */}
            <p
              data-hero-copy
              className="border-l-4 border-orange-500 bg-gradient-to-r from-amber-50/90 to-transparent py-1.5 pl-3.5 text-sm font-medium leading-relaxed text-ink-secondary rounded-r-md"
            >
              {HERO_CONTENT.supportingLine}
            </p>

            {/* Colorful Three-Card Capability Strip */}
            <div
              data-hero-copy
              className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-3"
            >
              <div className="rounded-xl border border-yellow-300/90 bg-gradient-to-br from-yellow-50 to-amber-50/70 p-3.5 shadow-sm">
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold text-amber-900">
                  <TerminalSquare className="h-3.5 w-3.5 text-amber-600" />
                  REPO INTELLIGENCE
                </span>
                <p className="mt-1 text-xs text-amber-950/80">
                  File-anchored code & architecture inspection
                </p>
              </div>
              <div className="rounded-xl border border-orange-300/90 bg-gradient-to-br from-orange-50 to-amber-50/60 p-3.5 shadow-sm">
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold text-orange-900">
                  <Sparkles className="h-3.5 w-3.5 text-orange-600" />
                  AI TECHNICAL VIVA
                </span>
                <p className="mt-1 text-xs text-orange-950/80">
                  Adaptive code-defense questions & rubrics
                </p>
              </div>
              <div className="rounded-xl border border-red-300/90 bg-gradient-to-br from-red-50 to-orange-50/60 p-3.5 shadow-sm">
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold text-red-900">
                  <ShieldCheck className="h-3.5 w-3.5 text-red-600" />
                  HUMAN OVERSIGHT
                </span>
                <p className="mt-1 text-xs text-red-950/80">
                  Inspectable proof—never automatic rejection
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: VisualStage combining 3D WebGL Constellation + Repository Intelligence */}
          <div className="lg:col-span-6">
            <VisualStage
              stageLabel="3D Language Constellation and Repository Intelligence Interface"
              minHeightClass="min-h-[620px]"
            >
              <div className="space-y-3">
                <LanguageOrbit3D />
                <RepositoryPreview />
              </div>
            </VisualStage>
          </div>
        </div>
      </div>
    </section>
  );
}
