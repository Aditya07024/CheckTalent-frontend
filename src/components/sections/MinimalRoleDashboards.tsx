"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Building2, CheckCircle2, GraduationCap, School, Sparkles } from "lucide-react";
import { ROLE_CONFIGS } from "@/types/dashboard";

export function MinimalRoleDashboards() {
  return (
    <section id="dashboards" className="border-b border-[#1C1613]/10 bg-white py-16 lg:py-24">
      <div className="container">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-300 bg-orange-50 px-3.5 py-1 text-xs font-bold text-orange-900 uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5 text-[#D9481E]" />
            Three Dedicated Dashboards
          </div>

          <h2 className="aldrich-regular text-3xl font-bold tracking-tight text-[#1C1613] sm:text-4xl lg:text-5xl">
            Built for the Entire Technical Ecosystem.
          </h2>

          <p className="text-sm sm:text-base leading-relaxed text-[#756A62]">
            After signup, your account is assigned to your dedicated dashboard with personalized workflows.
          </p>
        </div>

        {/* 3 Minimal Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card 1: Student / Employee */}
          <div className="flex flex-col justify-between rounded-3xl border-2 border-[#1C1613]/10 bg-[#FAF7F2] p-7 transition hover:border-[#D9481E] hover:shadow-lg">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D9481E]/15 text-[#D9481E]">
                <GraduationCap className="h-6 w-6" />
              </div>

              <span className="mt-5 block font-mono text-xs font-bold uppercase tracking-wider text-[#D9481E]">
                For Candidates
              </span>

              <h3 className="aldrich-regular mt-1 text-2xl font-bold text-[#1C1613]">
                User / Student / Employee
              </h3>

              <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-[#756A62]">
                Upload your resume or connect GitHub. Automatically audit code originality, AI percentage, and apply directly to campus & off-campus drives.
              </p>

              <div className="mt-6 space-y-2 border-t border-[#1C1613]/10 pt-4 text-xs text-[#52463F]">
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
                className="flex items-center justify-between rounded-xl bg-[#D9481E] px-4 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#B93615]"
              >
                <span>Get Started as Candidate</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Card 2: Off-Campus Companies */}
          <div className="flex flex-col justify-between rounded-3xl border-2 border-[#1C1613]/10 bg-[#FAF7F2] p-7 transition hover:border-[#E9A23B] hover:shadow-lg">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E9A23B]/20 text-[#B8710B]">
                <Building2 className="h-6 w-6" />
              </div>

              <span className="mt-5 block font-mono text-xs font-bold uppercase tracking-wider text-[#B8710B]">
                For Recruiters
              </span>

              <h3 className="aldrich-regular mt-1 text-2xl font-bold text-[#1C1613]">
                Off-Campus Companies
              </h3>

              <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-[#756A62]">
                Stop filtering keyword resumes. Discover pre-vetted engineers using AST code forensics, commit timelines, and zero tutorial plagiarism.
              </p>

              <div className="mt-6 space-y-2 border-t border-[#1C1613]/10 pt-4 text-xs text-[#52463F]">
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
                className="flex items-center justify-between rounded-xl bg-[#E9A23B] px-4 py-3 text-xs font-bold uppercase tracking-wider text-black transition hover:bg-[#d6902d]"
              >
                <span>Recruiter Portal Access</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Card 3: Campus */}
          <div className="flex flex-col justify-between rounded-3xl border-2 border-[#1C1613]/10 bg-[#FAF7F2] p-7 transition hover:border-blue-600 hover:shadow-lg sm:col-span-2 lg:col-span-1">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <School className="h-6 w-6" />
              </div>

              <span className="mt-5 block font-mono text-xs font-bold uppercase tracking-wider text-blue-600">
                For Colleges & TPO
              </span>

              <h3 className="aldrich-regular mt-1 text-2xl font-bold text-[#1C1613]">
                Campus & Placement Cells
              </h3>

              <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-[#756A62]">
                Automate batch skill audits, monitor student readiness scores, schedule visiting campus drives, and generate verified NAAC/NIRF reports.
              </p>

              <div className="mt-6 space-y-2 border-t border-[#1C1613]/10 pt-4 text-xs text-[#52463F]">
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
                className="flex items-center justify-between rounded-xl bg-blue-600 px-4 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-blue-700"
              >
                <span>Campus / TPO Access</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* 3-in-1 Test Suite Shortcut */}
        <div className="mt-10 rounded-2xl border border-dashed border-[#1C1613]/20 bg-[#FAF7F2] p-4 text-center">
          <p className="text-xs text-[#756A62]">
            Want to test all 3 dashboards without signing up?{" "}
            <Link
              href="/dashboard/test"
              className="font-bold text-[#D9481E] hover:underline inline-flex items-center gap-1"
            >
              Open 3-in-1 Test Suite Preview <ArrowRight className="h-3 w-3" />
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
