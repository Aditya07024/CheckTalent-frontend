"use client";

import React from "react";
import { ArrowRight, Check, FileCheck2, Scale, UserCheck } from "lucide-react";
import { RECRUITERS_SECTION_CONTENT } from "@/data/site-content";
import { SECTION_IDS } from "@/lib/constants";
import { scrollToSection } from "@/lib/utils";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function RecruitersSection() {
  return (
    <AnimatedSection
      id={SECTION_IDS.recruiters}
      className="border-b border-hairline bg-canvas-secondary/45 py-20 lg:py-28"
    >
      <div className="container">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Eight Recruiter Capabilities */}
          <div className="order-2 lg:order-1 lg:col-span-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {RECRUITERS_SECTION_CONTENT.benefits.map((benefit, idx) => (
              <div
                key={benefit.id}
                data-animate-item
                className="rounded-xl border border-hairline bg-canvas p-5 transition-colors hover:border-hairline-strong"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-ink-muted">
                    REC // 0{idx + 1}
                  </span>
                  <span className="flex h-5 w-5 items-center justify-center rounded border border-lime/30 bg-lime-dim">
                    <Check className="h-3 w-3 text-lime" />
                  </span>
                </div>
                <h3 className="mt-3 text-base font-semibold text-ink leading-snug">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-ink-secondary">
                  {benefit.detail}
                </p>
              </div>
            ))}
          </div>

          {/* Right Column: Recruiter Pitch + Decision-Support Snapshot + CTA */}
          <div
            data-animate-header
            className="order-1 lg:order-2 lg:col-span-5 space-y-6 lg:sticky lg:top-24"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-lime">
              {RECRUITERS_SECTION_CONTENT.eyebrow}
            </span>

            <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-[40px] leading-[1.12]">
              {RECRUITERS_SECTION_CONTENT.heading}
            </h2>

            <p className="text-base leading-relaxed text-ink-secondary">
              {RECRUITERS_SECTION_CONTENT.subheading}
            </p>

            {/* Illustrative Recruiter Decision-Support Card */}
            <div className="rounded-xl border border-hairline bg-canvas p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-hairline pb-3">
                <span className="font-mono text-xs text-ink">
                  DECISION-SUPPORT BRIEF (ILLUSTRATIVE)
                </span>
                <Badge variant="neutral">HUMAN IN LOOP</Badge>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-start justify-between gap-2 rounded border border-hairline bg-canvas-secondary p-3">
                  <div className="flex items-start gap-2.5">
                    <FileCheck2 className="mt-0.5 h-4 w-4 shrink-0 text-lime" />
                    <div>
                      <p className="font-medium text-ink">Explainable Rubric Match</p>
                      <p className="mt-0.5 text-ink-secondary">
                        Every matched skill cites exact repo files & viva responses
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start justify-between gap-2 rounded border border-hairline bg-canvas-secondary p-3">
                  <div className="flex items-start gap-2.5">
                    <Scale className="mt-0.5 h-4 w-4 shrink-0 text-violet" />
                    <div>
                      <p className="font-medium text-ink">Template Similarity Context</p>
                      <p className="mt-0.5 text-ink-secondary">
                        Separates starter boilerplate from custom modules with uncertainty bounds
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start justify-between gap-2 rounded border border-lime/30 bg-lime-dim/30 p-3">
                  <div className="flex items-start gap-2.5">
                    <UserCheck className="mt-0.5 h-4 w-4 shrink-0 text-lime" />
                    <div>
                      <p className="font-medium text-ink">Accountable Hiring Control</p>
                      <p className="mt-0.5 text-ink-secondary">
                        Zero automated candidate rejections; built to focus engineering interviews
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Button
                type="button"
                size="lg"
                onClick={() =>
                  scrollToSection(RECRUITERS_SECTION_CONTENT.ctaHref, {
                    selectCategory: "recruiter-intelligence",
                  })
                }
              >
                {RECRUITERS_SECTION_CONTENT.ctaLabel}
                <ArrowRight className="h-4 w-4" />
              </Button>

              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() =>
                  scrollToSection(`#${SECTION_IDS.earlyAccess}`, {
                    preselectRole: "Recruiter",
                  })
                }
              >
                Request Recruiter Access
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
