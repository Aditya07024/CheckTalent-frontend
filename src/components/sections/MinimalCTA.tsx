"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight, ShieldCheck, Sparkles } from "lucide-react";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { GridBackground } from "@/components/visuals/GridBackground";
import { Button } from "@/components/ui/button";

export function MinimalCTA() {
  return (
    <AnimatedSection
      id="cta"
      className="relative border-b border-orange-200/70 bg-gradient-to-b from-amber-50/45 via-transparent to-orange-50/45 py-20 lg:py-28 overflow-hidden"
    >
      <GridBackground density="fine" showRadialGlow />

      <div className="container relative z-10 w-full">
        <div className="mx-auto max-w-4xl rounded-3xl border-2 border-orange-400 bg-gradient-to-br from-yellow-50/95 via-white to-orange-50/90 p-8 sm:p-12 lg:p-16 shadow-[0_20px_48px_rgba(217,72,30,0.15)] text-center space-y-6">
          <div className="inline-flex items-center gap-2.5 rounded-full border-2 border-orange-300 bg-white px-4 py-1.5 shadow-sm">
            <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 ring-4 ring-amber-200/80 animate-pulse" />
            <span className="font-mono text-[11px] font-bold tracking-wider text-orange-900 uppercase">
              START VERIFYING TODAY
            </span>
          </div>

          <h2 className="aldrich-regular font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-ink leading-[1.12]">
            Ready to Prove Real Code Skills or{" "}
            <span className="bg-gradient-to-r from-orange-600 via-red-600 to-amber-600 bg-clip-text text-transparent">
              Hire Verified Talent?
            </span>
          </h2>

          <p className="mx-auto max-w-2xl text-base sm:text-lg leading-relaxed text-ink-secondary font-quantico italic quantico-regular-italic">
            Join candidates, fast-growing companies, and top college placement
            cells on CheckTalent.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
            <Button
              type="button"
              size="xl"
              onClick={() => (window.location.href = "/signup")}
            >
              Get Started Free
              <ArrowRight className="h-4 w-4" />
            </Button>

            <Button
              type="button"
              variant="outline"
              size="xl"
              onClick={() => (window.location.href = "/dashboard/test")}
            >
              Explore 3-in-1 Test Demo
              <ChevronRight className="h-4 w-4 text-orange-700" />
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-mono font-bold text-ink-secondary">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Zero Keyword ATS Hallucination</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-orange-600" />
              <span>Live GitHub AST & AI Forensics</span>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
