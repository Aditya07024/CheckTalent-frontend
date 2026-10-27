"use client";

import React, { useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  ArrowRight,
  ChevronRight,
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

const LanguageOrbit3D = dynamic(
  () =>
    import("@/components/visuals/LanguageOrbit3D").then(
      (mod) => mod.LanguageOrbit3D
    ),
  {
    ssr: false,
    loading: () => null,
  }
);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { prefersReducedMotion } = useAnimationContext();

  useGSAP(
    () => {
      if (prefersReducedMotion || !sectionRef.current) return;
      const nodes = sectionRef.current.querySelectorAll("[data-hero-copy]");
      gsap.from(nodes, {
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
      className="relative flex min-h-[640px] items-start overflow-hidden border-b border-orange-200/70 bg-gradient-to-b from-yellow-50/50 via-transparent to-orange-50/35 pb-16 pt-8 sm:min-h-[700px] sm:pt-10 lg:min-h-[calc(100vh-4rem)] lg:pt-14"
    >
      <GridBackground density="fine" showRadialGlow />

      {/* Warm glow behind the orbit (right on desktop, centered on mobile) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-yellow-300/30 via-orange-300/25 to-red-300/20 blur-3xl lg:left-[68%]"
      />

      {/* Full-bleed background 3D Orbit — text sits on top of it */}
      <LanguageOrbit3D className="z-0 opacity-40 sm:opacity-60 lg:opacity-100" />

      <div className="container relative z-10 w-full">
        <div className="max-w-xl">
          {/* Title + Minimal Core Components (overlaying the orbit) */}
          <div className="space-y-7">
            <div
              data-hero-copy
              className="inline-flex items-center gap-2.5 rounded-full border border-orange-300 border-b-[3px] border-b-orange-400 bg-white/90 px-4 py-1.5 shadow-sm"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 ring-4 ring-amber-200/80" />
              <span className="font-mono text-[11px] font-bold tracking-wider text-orange-900">
                {HERO_CONTENT.eyebrow}
              </span>
            </div>

            <h1
              data-hero-copy
              className="text-4xl font-bold tracking-[-0.03em] text-ink sm:text-5xl lg:text-[56px] xl:text-[62px] leading-[1.07]"
            >
              {HERO_CONTENT.headlineLead}
              <span className="bg-gradient-to-r from-orange-600 via-red-600 to-amber-600 bg-clip-text text-transparent">
                {HERO_CONTENT.headlineAccent}
              </span>
              {HERO_CONTENT.headlineTail}
            </h1>

            <p
              data-hero-copy
              className="max-w-lg text-base sm:text-lg leading-relaxed text-ink-secondary"
            >
              Inspect real repositories, run adaptive AI technical vivas, and
              share evidence-backed Skill Proof Cards with human oversight.
            </p>

            {/* Primary & Secondary 3D CTAs */}
            <div
              data-hero-copy
              className="flex flex-col gap-3.5 pt-1 sm:flex-row sm:items-center"
            >
              <Button
                type="button"
                size="xl"
                onClick={() => scrollToSection(HERO_CONTENT.primaryCta.href)}
              >
                {HERO_CONTENT.primaryCta.label}
                <ArrowRight className="h-4 w-4" />
              </Button>

              <Button
                type="button"
                variant="outline"
                size="xl"
                onClick={() => scrollToSection(HERO_CONTENT.secondaryCta.href)}
              >
                {HERO_CONTENT.secondaryCta.label}
                <ChevronRight className="h-4 w-4 text-orange-700" />
              </Button>
            </div>

            {/* Compact 3D Extruded Pillar Chips */}
            <div data-hero-copy className="flex flex-wrap items-center gap-2.5 pt-2">
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-yellow-400 border-b-[3px] border-b-amber-500 bg-yellow-50/90 px-3 py-1.5 font-mono text-xs font-bold text-amber-950 shadow-sm">
                <TerminalSquare className="h-3.5 w-3.5 text-amber-600" />
                Repo Intelligence
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-orange-400 border-b-[3px] border-b-orange-600 bg-orange-50/90 px-3 py-1.5 font-mono text-xs font-bold text-orange-950 shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-orange-600" />
                AI Technical Viva
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-red-400 border-b-[3px] border-b-red-600 bg-red-50/90 px-3 py-1.5 font-mono text-xs font-bold text-red-950 shadow-sm">
                <ShieldCheck className="h-3.5 w-3.5 text-red-600" />
                Human Oversight
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
