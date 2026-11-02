"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { GridBackground } from "@/components/visuals/GridBackground";
import { Floating3DCube } from "@/components/three/Floating3DCube";

export function MinimalFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does CheckTalent detect AI-generated code?",
      a: "Our engine inspects Abstract Syntax Trees (AST), comment-to-code ratios, generic prompt patterns, and cyclomatic uniformity. It separates helpful AI scaffolding (like configurations) from raw unedited prompt dumps.",
    },
    {
      q: "How do you detect internet tutorial clones?",
      a: "We cross-match repository AST syntax trees and variable structures against a database of 1.8M public repositories, FreeCodeCamp starters, and viral YouTube clone templates (e.g. Netflix, Spotify, standard MERN starters).",
    },
    {
      q: "What are the three dashboard options?",
      a: "1) 'Candidate Workspace' for job seekers, students and developers proving skills; 2) 'Off-Campus Companies' for employers recruiting pre-verified talent; and 3) 'Campus' for colleges and placement cells managing batch cohorts.",
    },
    {
      q: "Can users switch dashboards after selecting one?",
      a: "No. Once a user completes signup and chooses their role in onboarding, the dashboard is permanently locked to their account ID to ensure data integrity and evaluation authenticity.",
    },
  ];

  return (
    <AnimatedSection
      id="faq"
      className="relative border-b border-orange-200/70 bg-gradient-to-b from-amber-50/45 via-transparent to-orange-50/35 py-16 lg:py-24 overflow-hidden"
    >
      <GridBackground density="fine" />

      <div className="container relative z-10 w-full max-w-4xl">
        {/* Left-Aligned Header */}
        <div data-animate-header className="space-y-4">
          <div className="flex items-center gap-3">
            <Floating3DCube label="FAQ" tone="gold" size={44} />
            <div className="inline-flex items-center gap-2.5 rounded-full border-2 border-orange-300 bg-white/90 px-3.5 py-1.5 shadow-sm">
              <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 ring-4 ring-amber-200/80 animate-pulse" />
              <span className="font-mono text-[11px] font-bold tracking-wider text-orange-900 uppercase">
                COMMON QUESTIONS
              </span>
            </div>
          </div>

          <h2 className="aldrich-regular font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-ink leading-[1.12]">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-orange-600 via-red-600 to-amber-600 bg-clip-text text-transparent">
              Questions.
            </span>
          </h2>
        </div>

        {/* 4 Accordion FAQs */}
        <div data-animate-item className="mt-10 space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="overflow-hidden rounded-2xl border-2 border-orange-200/90 bg-white/95 shadow-xs transition-all hover:border-orange-400"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left transition hover:bg-orange-50/40"
                >
                  <span className="aldrich-regular text-base sm:text-lg font-bold text-ink">
                    {faq.q}
                  </span>
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-orange-300 bg-orange-100 text-orange-800 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-orange-200/60 bg-gradient-to-b from-yellow-50/40 to-white px-5 pb-5 pt-3">
                    <p className="text-sm leading-relaxed text-ink-secondary">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
