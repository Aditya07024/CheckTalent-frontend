"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Bot, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

export function MinimalCTA() {
  return (
    <section id="cta" className="relative overflow-hidden bg-gradient-to-b from-[#FAF7F2] to-orange-50/40 py-20 lg:py-28">
      <div className="container max-w-5xl">
        <div className="relative overflow-hidden rounded-3xl border-2 border-orange-300 bg-white p-8 sm:p-12 lg:p-16 shadow-[0_20px_60px_rgba(217,72,30,0.1)] text-center space-y-6">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#D9481E]/8 blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-[#E9A23B]/10 blur-3xl pointer-events-none" />

          <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-orange-900">
            <Sparkles className="h-3.5 w-3.5 text-[#D9481E]" />
            Proof Over Promises
          </div>

          <h2 className="aldrich-regular mx-auto max-w-2xl text-3xl font-bold tracking-tight text-[#1C1613] sm:text-4xl lg:text-5xl leading-tight">
            Ready to Prove What You Can Actually Build?
          </h2>

          <p className="mx-auto max-w-xl text-sm sm:text-base leading-relaxed text-[#756A62]">
            Join candidates, off-campus hiring partners, and colleges on CheckTalent. Get your code audited and your skills verified today.
          </p>

          <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row">
            <Link
              href="/signup"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#D9481E] px-7 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-[#B93615] sm:w-auto"
            >
              <span>Create Account Free</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/dashboard/test"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#1C1613]/15 bg-[#FAF7F2] px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#1C1613] transition hover:bg-white sm:w-auto"
            >
              <Bot className="h-4 w-4 text-[#D9481E]" />
              <span>Explore 3-in-1 Test Demo</span>
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-semibold text-[#756A62]">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              Free to start
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              Instant GitHub audit
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              Verifiable Proof Card
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
