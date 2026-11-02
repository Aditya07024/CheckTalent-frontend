"use client";

import React from "react";
import { Bot, ShieldCheck, UploadCloud } from "lucide-react";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { GridBackground } from "@/components/visuals/GridBackground";
import { Floating3DCube } from "@/components/three/Floating3DCube";

export function MinimalHowItWorks() {
  const steps = [
    {
      step: "01",
      icon: UploadCloud,
      title: "Upload Resume or Connect GitHub",
      description:
        "Drop your resume or enter your GitHub profile. CheckTalent auto-indexes repositories, commit velocity, and dependencies.",
      badge: "Instant Indexing",
      tone: "amber",
    },
    {
      step: "02",
      icon: Bot,
      title: "Automated Code & AI Forensics",
      description:
        "Our engine calculates AI code percentage, cross-checks against 1.8M YouTube/internet tutorial templates, and audits organic commit history.",
      badge: "Deep AST Analysis",
      tone: "orange",
    },
    {
      step: "03",
      icon: ShieldCheck,
      title: "Verifiable Skill Proof Card",
      description:
        "Receive an immutable, cryptographically signed Proof-of-Skill Card with a unique verification link that recruiters and colleges trust.",
      badge: "Cryptographic Proof",
      tone: "red",
    },
  ];

  return (
    <AnimatedSection
      id="how-it-works"
      className="relative border-b border-orange-200/70 bg-gradient-to-b from-amber-50/45 via-transparent to-orange-50/35 py-16 lg:py-24 overflow-hidden"
    >
      <GridBackground density="fine" />

      <div className="container relative z-10 w-full">
        {/* Left-Aligned Header */}
        <div data-animate-header className="max-w-2xl lg:max-w-3xl space-y-4">
          <div className="flex items-center gap-3">
            <Floating3DCube label="FLOW" tone="gold" size={44} />
            <div className="inline-flex items-center gap-2.5 rounded-full border-2 border-orange-300 bg-white/90 px-3.5 py-1.5 shadow-sm">
              <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 ring-4 ring-amber-200/80 animate-pulse" />
              <span className="font-mono text-[11px] font-bold tracking-wider text-orange-900 uppercase">
                SIMPLE VERIFICATION PIPELINE
              </span>
            </div>
          </div>

          <h2 className="aldrich-regular font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-ink leading-[1.12]">
            How CheckTalent{" "}
            <span className="bg-gradient-to-r from-orange-600 via-red-600 to-amber-600 bg-clip-text text-transparent">
              Works.
            </span>
          </h2>

          <p className="text-base sm:text-lg leading-relaxed text-ink-secondary font-quantico italic quantico-regular-italic">
            From raw repositories and uploaded resumes to verifiable skill
            proof cards in three automated steps.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div data-animate-item className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative flex flex-col justify-between rounded-3xl border-2 border-orange-200/90 bg-gradient-to-br from-yellow-50/90 via-white to-amber-50/60 p-7 shadow-[0_8px_24px_rgba(245,158,11,0.08)] transition-all hover:border-orange-400 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-2xl font-black text-orange-700/80">
                      {item.step}
                    </span>
                    <span className="rounded-full border border-orange-300 bg-white/90 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-orange-900">
                      {item.badge}
                    </span>
                  </div>

                  <div className="mt-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-orange-200 bg-orange-100 text-orange-800 shadow-xs">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="aldrich-regular mt-5 text-xl font-bold text-ink">
                    {item.title}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-ink-secondary">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
