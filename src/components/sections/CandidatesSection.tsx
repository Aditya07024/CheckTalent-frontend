"use client";

import React from "react";
import { ArrowRight, CheckCircle2, Code2, GitCommitHorizontal, Share2 } from "lucide-react";
import { CANDIDATES_SECTION_CONTENT } from "@/data/site-content";
import { SECTION_IDS } from "@/lib/constants";
import { scrollToSection } from "@/lib/utils";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TiltCard3D } from "@/components/visuals/TiltCard3D";
import { Floating3DCube } from "@/components/three/Floating3DCube";

export function CandidatesSection() {
  return (
    <AnimatedSection
      id={SECTION_IDS.candidates}
      className="border-b border-orange-200/70 bg-gradient-to-b from-yellow-50/45 via-transparent to-orange-50/35 py-20 lg:py-28"
    >
      <div className="container">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Narrative + CTA + Architectural Preview */}
          <div data-animate-header className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <div className="flex items-center gap-3.5">
              <Floating3DCube label="DEV" tone="gold" size={44} />
              <span className="font-mono text-xs uppercase tracking-widest text-lime">
                {CANDIDATES_SECTION_CONTENT.eyebrow}
              </span>
            </div>

            <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-[40px] leading-[1.12]">
              {CANDIDATES_SECTION_CONTENT.heading}
            </h2>

            <p className="text-base leading-relaxed text-ink-secondary">
              {CANDIDATES_SECTION_CONTENT.subheading}
            </p>

            {/* Illustrative Candidate Workspace Micro-Panel */}
            <div className="rounded-xl border border-hairline bg-canvas-secondary p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-hairline pb-3">
                <span className="font-mono text-xs text-ink">
                  CANDIDATE EVIDENCE LOOP
                </span>
                <Badge variant="default">CANDIDATE OWNED</Badge>
              </div>

              <div className="space-y-2.5 font-mono text-xs">
                <div className="flex items-center gap-3 rounded border border-hairline bg-canvas px-3 py-2.5">
                  <Code2 className="h-4 w-4 shrink-0 text-lime" />
                  <div>
                    <p className="text-ink">1. Connect Repo or Alternative Project</p>
                    <p className="text-[11px] text-ink-muted">
                      Public GitHub optional · Consent-scoped intake
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded border border-hairline bg-canvas px-3 py-2.5">
                  <GitCommitHorizontal className="h-4 w-4 shrink-0 text-violet" />
                  <div>
                    <p className="text-ink">2. Defend Real Implementation Choices</p>
                    <p className="text-[11px] text-ink-muted">
                      Explain your architecture + uncover exact skill gaps
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded border border-lime/30 bg-lime-dim/30 px-3 py-2.5">
                  <Share2 className="h-4 w-4 shrink-0 text-lime" />
                  <div>
                    <p className="text-ink">3. Share Controlled Proof Links</p>
                    <p className="text-[11px] text-ink-secondary">
                      Attach inspectable proof alongside any application
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-1">
              <Button
                type="button"
                size="lg"
                onClick={() =>
                  scrollToSection(CANDIDATES_SECTION_CONTENT.ctaHref, {
                    preselectRole: "Candidate",
                  })
                }
              >
                {CANDIDATES_SECTION_CONTENT.ctaLabel}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Right Column: Seven Structured 3D Candidate Benefits */}
          <div className="lg:col-span-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {CANDIDATES_SECTION_CONTENT.benefits.map((benefit, idx) => (
              <TiltCard3D
                key={benefit.id}
                data-animate-item
                className="flex flex-col justify-between rounded-xl border-2 border-amber-400 bg-white/95 p-5 shadow-[0_8px_24px_rgba(234,88,12,0.06)]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] text-lime">
                      0{idx + 1}
                    </span>
                    <CheckCircle2 className="h-4 w-4 text-lime/80" />
                  </div>
                  <h3 className="mt-3 text-base font-semibold text-ink leading-snug">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-ink-secondary">
                    {benefit.detail}
                  </p>
                </div>
              </TiltCard3D>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
