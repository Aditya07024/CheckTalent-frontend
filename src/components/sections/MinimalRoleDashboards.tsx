"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  GraduationCap,
  School,
  Sparkles,
} from "lucide-react";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { GridBackground } from "@/components/visuals/GridBackground";
import { Floating3DCube } from "@/components/three/Floating3DCube";
import { TiltCard3D } from "@/components/visuals/TiltCard3D";

export function MinimalRoleDashboards() {
  return (
    <AnimatedSection
      id="dashboards"
      className="relative border-b border-orange-200/70 bg-gradient-to-b from-yellow-50/45 via-transparent to-orange-50/35 py-16 lg:py-24 overflow-hidden"
    >
      <GridBackground density="fine" showRadialGlow />

      {/* Warm ambient solar glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[15%] top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-yellow-300/20 via-orange-300/15 to-red-300/10 blur-2xl transform-gpu"
      />

      <div className="container relative z-10 w-full">
        {/* Left-Aligned Header Aligned with Hero Grid */}
        <div data-animate-header className="max-w-2xl lg:max-w-3xl space-y-4">
          <div className="flex items-center gap-3">
            <Floating3DCube label="ROLE" tone="gold" size={44} />
            <div className="inline-flex items-center gap-2.5 rounded-full border-2 border-orange-300 bg-white/90 px-3.5 py-1.5 shadow-sm">
              <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 ring-4 ring-amber-200/80 animate-pulse" />
              <span className="font-mono text-[11px] font-bold tracking-wider text-orange-900 uppercase">
                THREE DEDICATED WORKSPACES
              </span>
            </div>
          </div>

          <h2 className="aldrich-regular font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-ink leading-[1.12]">
            Built for Candidates, Recruiters &{" "}
            <span className="bg-gradient-to-r from-orange-600 via-red-600 to-amber-600 bg-clip-text text-transparent">
              Campus Drives.
            </span>
          </h2>

          <p className="text-base sm:text-lg leading-relaxed text-ink-secondary font-quantico italic quantico-regular-italic">
            Select your role once during signup. Your account is permanently
            locked to your tailored workspace for data security and verified
            evaluation integrity.
          </p>
        </div>

        {/* 3 Neo-Brutalist 3D Cards Aligned with Theme */}
        <div data-animate-item className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card 1: Student / Developer (Yellow / Amber Theme) */}
          <TiltCard3D maxTiltDeg={3} glowColor="rgba(245, 158, 11, 0.20)">
            <div className="flex h-full flex-col justify-between rounded-3xl border-2 border-amber-400 bg-gradient-to-br from-yellow-50/95 via-white to-amber-50/70 p-7 shadow-[0_12px_32px_rgba(245,158,11,0.14)] transition-all hover:border-amber-500 hover:-translate-y-1">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-300 bg-yellow-100 text-yellow-900 shadow-xs">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <span className="rounded-full border border-amber-300 bg-amber-100/90 px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider text-amber-950">
                    CANDIDATE
                  </span>
                </div>

                <h3 className="aldrich-regular mt-5 text-2xl font-bold text-ink">
                  User / Student / Employee
                </h3>

                <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-ink-secondary">
                  Upload your resume or connect GitHub. Automatically audit code
                  originality, AI percentage, and apply directly to campus &
                  off-campus drives.
                </p>

                <div className="mt-6 space-y-2 border-t border-amber-200/80 pt-4 text-xs text-ink-secondary">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span>Verifiable Proof Card with SHA-256 signature</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span>AI vs human code percentage forensics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span>Apply directly to off-campus & campus drives</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4">
                <Link
                  href="/signup"
                  className="flex items-center justify-between rounded-xl border border-amber-500 bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 px-4 py-3 text-xs font-mono font-bold uppercase tracking-wider text-amber-950 shadow-sm transition hover:brightness-105"
                >
                  <span>Get Started as Candidate</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </TiltCard3D>

          {/* Card 2: Off-Campus Companies (Solar Orange Theme) */}
          <TiltCard3D maxTiltDeg={3} glowColor="rgba(234, 88, 12, 0.20)">
            <div className="flex h-full flex-col justify-between rounded-3xl border-2 border-orange-400 bg-gradient-to-br from-orange-50/95 via-white to-amber-50/70 p-7 shadow-[0_12px_32px_rgba(234,88,12,0.14)] transition-all hover:border-orange-500 hover:-translate-y-1">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-orange-300 bg-orange-100 text-orange-900 shadow-xs">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <span className="rounded-full border border-orange-300 bg-orange-100/90 px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider text-orange-950">
                    RECRUITER
                  </span>
                </div>

                <h3 className="aldrich-regular mt-5 text-2xl font-bold text-ink">
                  Off-Campus Companies
                </h3>

                <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-ink-secondary">
                  Stop filtering keyword resumes. Discover pre-vetted engineers
                  using AST code forensics, commit timelines, and zero tutorial
                  plagiarism.
                </p>

                <div className="mt-6 space-y-2 border-t border-orange-200/80 pt-4 text-xs text-ink-secondary">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span>Pre-verified talent pool filtered by proof score</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span>Flags YouTube clones & single-commit dumps</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span>Post off-campus jobs with minimum score cutoffs</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4">
                <Link
                  href="/signup"
                  className="flex items-center justify-between rounded-xl border border-orange-500 bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 px-4 py-3 text-xs font-mono font-bold uppercase tracking-wider text-white shadow-sm transition hover:brightness-105"
                >
                  <span>Recruiter Portal Access</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </TiltCard3D>

          {/* Card 3: Campus & Placement Cells (Crimson Red Theme - Zero Blue) */}
          <TiltCard3D maxTiltDeg={3} glowColor="rgba(220, 38, 38, 0.20)">
            <div className="flex h-full flex-col justify-between rounded-3xl border-2 border-red-400 bg-gradient-to-br from-red-50/95 via-white to-orange-50/70 p-7 shadow-[0_12px_32px_rgba(220,38,38,0.14)] transition-all hover:border-red-500 hover:-translate-y-1 sm:col-span-2 lg:col-span-1">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-300 bg-red-100 text-red-900 shadow-xs">
                    <School className="h-6 w-6" />
                  </div>
                  <span className="rounded-full border border-red-300 bg-red-100/90 px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider text-red-950">
                    CAMPUS TPO
                  </span>
                </div>

                <h3 className="aldrich-regular mt-5 text-2xl font-bold text-ink">
                  Campus & Placement Cells
                </h3>

                <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-ink-secondary">
                  Automate batch skill audits, monitor student readiness scores,
                  schedule visiting campus drives, and generate verified
                  NAAC/NIRF reports.
                </p>

                <div className="mt-6 space-y-2 border-t border-red-200/80 pt-4 text-xs text-ink-secondary">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span>Batch-wide technical skill audits across branches</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span>Schedule campus drives & round progressions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span>Downloadable NIRF & NAAC placement dossiers</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4">
                <Link
                  href="/signup"
                  className="flex items-center justify-between rounded-xl border border-red-500 bg-gradient-to-r from-red-600 via-rose-600 to-amber-700 px-4 py-3 text-xs font-mono font-bold uppercase tracking-wider text-white shadow-sm transition hover:brightness-105"
                >
                  <span>Campus / TPO Access</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </TiltCard3D>
        </div>

        {/* 3-in-1 Test Demo Banner Aligned with Hero Palette */}
        <div
          data-animate-item
          className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border-2 border-orange-300 bg-gradient-to-r from-yellow-50/95 via-white/95 to-orange-50/95 p-5 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-100 text-orange-700">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-ink">
                Want to test all three dashboards without creating separate accounts?
              </p>
              <p className="text-xs text-ink-secondary">
                Switch between mock candidate, recruiter, and campus personas with one click.
              </p>
            </div>
          </div>
          <Link
            href="/dashboard/test"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-orange-400 bg-white px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-orange-950 transition hover:bg-orange-50 shadow-xs shrink-0"
          >
            <span>Try 3-in-1 Test Demo</span>
            <ArrowRight className="h-3.5 w-3.5 text-orange-600" />
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
}
