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

const ACCENT_CLASS =
  "bg-gradient-to-r from-orange-600 via-red-600 to-amber-600 bg-clip-text text-transparent";

export function HeroSection() {
  const [accentFirst, ...accentWords] = HERO_CONTENT.headlineAccent.split(" ");
  const accentRest = accentWords.join(" ");
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
      className="relative flex min-h-[620px] items-start overflow-hidden border-b border-orange-200/70 bg-gradient-to-b from-yellow-50/50 via-transparent to-orange-50/35 pb-12 pt-12 sm:min-h-[660px] sm:pt-14 lg:min-h-[calc(100vh-4rem)] lg:pt-16"
    >
      <GridBackground density="fine" showRadialGlow />

      {/* Warm glow behind the orbit (right on desktop, centered on mobile) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[55%] h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-yellow-300/30 via-orange-300/25 to-red-300/20 blur-3xl lg:left-[68%]"
      />

      {/* Full-bleed background 3D Orbit — text sits on top of it */}
      <LanguageOrbit3D className="z-0 opacity-40 sm:opacity-60 lg:opacity-100" />

      <div className="container relative z-10 w-full">
        <div className="max-w-xl lg:max-w-4xl xl:max-w-5xl">
          {/* Title + Minimal Core Components (overlaying the orbit) */}
          <div className="space-y-4 sm:space-y-5">
            <div
              data-hero-copy
              className="inline-flex items-center gap-2.5 rounded-full border-2 border-orange-300 bg-white/90 px-4 py-1.5 shadow-sm"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 ring-4 ring-amber-200/80" />
              <span className="font-mono text-[11px] font-bold tracking-wider text-orange-900">
                {HERO_CONTENT.eyebrow}
              </span>
            </div>

            <h1
              data-hero-copy
              className="font-londrina font-normal londrina-shadow-regular tracking-wide text-ink"
            >
              {/* Line 1: Substantially larger prominent statement */}
              <span className="block text-6xl sm:text-7xl lg:text-[86px] xl:text-[98px] leading-[0.98] lg:whitespace-nowrap">
                {HERO_CONTENT.headlineLead}
                <span className={ACCENT_CLASS}>{accentFirst}</span>
              </span>

              {/* Line 2: Also larger than previous, while slightly smaller than Line 1 */}
              <span className="block mt-2 sm:mt-3 text-5xl sm:text-6xl lg:text-[70px] xl:text-[78px] leading-[1.04] text-ink">
                <span className={ACCENT_CLASS}>{accentRest}</span>
                {HERO_CONTENT.headlineTail}
              </span>
            </h1>

            <p
              data-hero-copy
              className="max-w-xl text-base sm:text-lg lg:text-[19px] leading-relaxed text-ink-secondary font-quantico italic quantico-regular-italic tracking-wide"
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

            {/* Stacked 3D Extruded Pillar Chips */}
            <div data-hero-copy className="flex flex-col items-start gap-2.5 pt-2">
              <span className="inline-flex items-center gap-1.5 rounded-xl border-2 border-yellow-400 bg-yellow-50/90 px-3 py-1.5 font-mono text-xs font-bold text-amber-950 shadow-sm">
                <TerminalSquare className="h-3.5 w-3.5 text-amber-600" />
                Repo Intelligence
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-xl border-2 border-orange-400 bg-orange-50/90 px-3 py-1.5 font-mono text-xs font-bold text-orange-950 shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-orange-600" />
                AI Technical Viva
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-xl border-2 border-red-400 bg-red-50/90 px-3 py-1.5 font-mono text-xs font-bold text-red-950 shadow-sm">
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
