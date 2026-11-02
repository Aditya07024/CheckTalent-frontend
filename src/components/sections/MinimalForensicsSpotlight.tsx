"use client";

import React from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Bot,
  CheckCircle2,
  GitBranch,
  ShieldAlert,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { GridBackground } from "@/components/visuals/GridBackground";
import { Floating3DCube } from "@/components/three/Floating3DCube";

export function MinimalForensicsSpotlight() {
  return (
    <AnimatedSection
      id="forensics"
      className="relative border-b border-orange-200/70 bg-gradient-to-b from-yellow-50/45 via-transparent to-red-50/35 py-16 lg:py-24 overflow-hidden"
    >
      <GridBackground density="fine" />

      <div className="container relative z-10 w-full">
        {/* Left-Aligned Header */}
        <div data-animate-header className="max-w-2xl lg:max-w-3xl space-y-4">
          <div className="flex items-center gap-3">
            <Floating3DCube label="AST" tone="crimson" size={44} />
            <div className="inline-flex items-center gap-2.5 rounded-full border-2 border-orange-300 bg-white/90 px-3.5 py-1.5 shadow-sm">
              <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 ring-4 ring-amber-200/80 animate-pulse" />
              <span className="font-mono text-[11px] font-bold tracking-wider text-orange-900 uppercase">
                CODE FORENSICS & AUTHENTICITY
              </span>
            </div>
          </div>

          <h2 className="aldrich-regular font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-ink leading-[1.12]">
            Separating True Builders from{" "}
            <span className="bg-gradient-to-r from-orange-600 via-red-600 to-amber-600 bg-clip-text text-transparent">
              Tutorial Clones.
            </span>
          </h2>

          <p className="text-base sm:text-lg leading-relaxed text-ink-secondary font-quantico italic quantico-regular-italic">
            Our AST analyzer inspects repository commits to distinguish
            authentic software developers from copied YouTube projects and
            unedited AI prompt dumps.
          </p>
        </div>

        {/* 2-Column Comparison Cards */}
        <div data-animate-item className="mt-12 grid gap-6 md:grid-cols-2">
          {/* Box 1: What We Flag (Red/Crimson Tone) */}
          <div className="flex flex-col justify-between rounded-3xl border-2 border-red-400 bg-gradient-to-br from-red-50/90 via-white to-orange-50/60 p-7 sm:p-8 shadow-[0_12px_32px_rgba(220,38,38,0.12)]">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-red-700">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-300 bg-red-100 shadow-xs">
                    <ShieldAlert className="h-5 w-5" />
                  </div>
                  <h3 className="aldrich-regular text-xl font-bold text-ink">
                    What CheckTalent Flags
                  </h3>
                </div>
                <span className="rounded-full border border-red-300 bg-red-100/90 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-red-900">
                  REJECTED SIGNALS
                </span>
              </div>

              <p className="text-xs sm:text-sm text-ink-secondary">
                Superficial patterns that fool keyword ATS scanners but fail deep
                code inspection:
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-white/80 p-3.5">
                  <XCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-ink">
                      Internet Tutorial & Course Clones
                    </p>
                    <p className="text-[11px] text-ink-secondary mt-0.5">
                      Identical AST structures matched against 1.8M public
                      YouTube & FreeCodeCamp tutorials.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-white/80 p-3.5">
                  <Bot className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-ink">
                      Raw AI Prompt Dumps
                    </p>
                    <p className="text-[11px] text-ink-secondary mt-0.5">
                      100% boilerplate generation without iterative human edits
                      or test defenses.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-white/80 p-3.5">
                  <AlertTriangle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-ink">
                      Single-Commit Mass Dumps
                    </p>
                    <p className="text-[11px] text-ink-secondary mt-0.5">
                      Large repositories uploaded in a single commit with zero
                      organic git development history.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Box 2: What We Verify (Emerald/Warm Verified Tone) */}
          <div className="flex flex-col justify-between rounded-3xl border-2 border-emerald-500 bg-gradient-to-br from-emerald-50/90 via-white to-teal-50/60 p-7 sm:p-8 shadow-[0_12px_32px_rgba(16,185,129,0.12)]">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-emerald-800">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-300 bg-emerald-100 shadow-xs">
                    <ShieldCheck className="h-5 w-5 text-emerald-700" />
                  </div>
                  <h3 className="aldrich-regular text-xl font-bold text-ink">
                    What CheckTalent Verifies
                  </h3>
                </div>
                <span className="rounded-full border border-emerald-300 bg-emerald-100/90 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-900">
                  VERIFIED SIGNALS
                </span>
              </div>

              <p className="text-xs sm:text-sm text-ink-secondary">
                Concrete engineering signals proving candidate ownership and
                technical competence:
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-white/80 p-3.5">
                  <GitBranch className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-ink">
                      Organic Commit Chronology
                    </p>
                    <p className="text-[11px] text-ink-secondary mt-0.5">
                      Realistic branch progression, bug fixes, refactoring
                      patterns, and author commit consistency.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-white/80 p-3.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-ink">
                      Human Architecture & Modular Boundary
                    </p>
                    <p className="text-[11px] text-ink-secondary mt-0.5">
                      Custom domain logic, API design patterns, and test suites
                      proving intentional system architecture.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-white/80 p-3.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-ink">
                      Interactive Code Viva Defense
                    </p>
                    <p className="text-[11px] text-ink-secondary mt-0.5">
                      Targeted AI-generated oral and written defense questions
                      anchored to exact lines in their repository.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
