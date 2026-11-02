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

export function MinimalForensicsSpotlight() {
  return (
    <section id="forensics" className="border-b border-[#1C1613]/10 bg-white py-16 lg:py-24">
      <div className="container">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center space-y-3">
          <span className="font-mono text-xs uppercase tracking-widest text-[#D9481E] font-bold">
            CODE FORENSICS & AUTHENTICITY
          </span>

          <h2 className="aldrich-regular text-3xl font-bold tracking-tight text-[#1C1613] sm:text-4xl lg:text-5xl">
            Separating True Builders from Tutorial Clones.
          </h2>

          <p className="text-sm sm:text-base leading-relaxed text-[#756A62]">
            Our AST analyzer inspects repository commits to distinguish authentic developers from copied YouTube projects and unedited AI prompt dumps.
          </p>
        </div>

        {/* 2-Column Comparison */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {/* Box 1: What We Flag (Red/Amber) */}
          <div className="rounded-3xl border-2 border-red-200 bg-red-50/40 p-7 sm:p-8 space-y-5">
            <div className="flex items-center gap-2 text-red-700">
              <ShieldAlert className="h-6 w-6 shrink-0" />
              <h3 className="aldrich-regular text-xl font-bold">
                What CheckTalent Flags
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-[#756A62]">
              Superficial signals that fool simple keyword ATS resume scanners:
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3 rounded-2xl border border-red-200/80 bg-white p-3.5 text-xs text-[#52463F]">
                <XCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-red-900 block font-bold">
                    YouTube & Course Tutorial Clones
                  </strong>
                  <span>
                    Exact variable and syntax matches with popular Netflix, Spotify, and standard MERN tutorial templates.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-red-200/80 bg-white p-3.5 text-xs text-[#52463F]">
                <XCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-red-900 block font-bold">
                    Single-Commit Bulk Dumps
                  </strong>
                  <span>
                    15,000 lines committed in a single snapshot without natural iterative evolution or branch history.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-red-200/80 bg-white p-3.5 text-xs text-[#52463F]">
                <XCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-red-900 block font-bold">
                    Raw AI Prompt Dumps
                  </strong>
                  <span>
                    Unaltered LLM boilerplate code with generic placeholder comments and lack of custom domain architecture.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Box 2: What We Verify (Emerald/Green) */}
          <div className="rounded-3xl border-2 border-emerald-200 bg-emerald-50/40 p-7 sm:p-8 space-y-5">
            <div className="flex items-center gap-2 text-emerald-700">
              <ShieldCheck className="h-6 w-6 shrink-0" />
              <h3 className="aldrich-regular text-xl font-bold">
                What CheckTalent Verifies
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-[#756A62]">
              Genuine engineering depth that proves true technical competency:
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3 rounded-2xl border border-emerald-200/80 bg-white p-3.5 text-xs text-[#52463F]">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-emerald-900 block font-bold">
                    Organic Commit Timestamps
                  </strong>
                  <span>
                    Continuous multi-week/month development with bugfixes, refactoring, and authentic author identity.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-emerald-200/80 bg-white p-3.5 text-xs text-[#52463F]">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-emerald-900 block font-bold">
                    Original Domain Architecture
                  </strong>
                  <span>
                    Clean modular boundaries, custom state management, and algorithmic complexity unique to the candidate.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-emerald-200/80 bg-white p-3.5 text-xs text-[#52463F]">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-emerald-900 block font-bold">
                    AI vs Human Ratio Transparency
                  </strong>
                  <span>
                    Separates helpful AI scaffolding (configs, test mocks) from original human problem-solving logic.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Link */}
        <div className="mt-10 text-center">
          <Link
            href="/dashboard/test"
            className="inline-flex items-center gap-2 rounded-xl bg-[#1C1613] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-black transition"
          >
            <Bot className="h-4 w-4 text-[#E9A23B]" />
            Test AI & Plagiarism Detector in Demo Suite
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
