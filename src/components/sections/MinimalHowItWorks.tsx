"use client";

import React from "react";
import { Bot, FileCode2, ShieldCheck, UploadCloud } from "lucide-react";

export function MinimalHowItWorks() {
  const steps = [
    {
      step: "01",
      icon: UploadCloud,
      title: "Upload Resume or Connect GitHub",
      description:
        "Drop your resume or enter your GitHub profile. CheckTalent auto-indexes repositories, commit velocity, and dependencies.",
      badge: "Instant Indexing",
    },
    {
      step: "02",
      icon: Bot,
      title: "Automated Code & AI Forensics",
      description:
        "Our engine calculates AI code percentage, cross-checks against 1.8M YouTube/internet tutorial templates, and audits organic commit history.",
      badge: "Deep AST Analysis",
    },
    {
      step: "03",
      icon: ShieldCheck,
      title: "Verifiable Skill Proof Card",
      description:
        "Receive an immutable, cryptographically signed Proof-of-Skill Card with a unique verification link that recruiters and colleges trust.",
      badge: "Cryptographic Proof",
    },
  ];

  return (
    <section id="how-it-works" className="border-b border-[#1C1613]/10 bg-[#FAF7F2] py-16 lg:py-24">
      <div className="container">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center space-y-3">
          <span className="font-mono text-xs uppercase tracking-widest text-[#D9481E] font-bold">
            SIMPLE VERIFICATION PIPELINE
          </span>

          <h2 className="aldrich-regular text-3xl font-bold tracking-tight text-[#1C1613] sm:text-4xl">
            How CheckTalent Works
          </h2>

          <p className="text-sm leading-relaxed text-[#756A62]">
            From raw repositories to verifiable proof in three simple steps.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div
                key={idx}
                className="relative rounded-3xl border border-[#1C1613]/10 bg-white p-7 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-2xl font-extrabold text-[#D9481E]">
                      {st.step}
                    </span>
                    <span className="rounded-full bg-[#FAF7F2] px-2.5 py-0.5 text-[10px] font-bold uppercase text-[#756A62]">
                      {st.badge}
                    </span>
                  </div>

                  <div className="mt-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D9481E]/10 text-[#D9481E]">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="aldrich-regular mt-5 text-xl font-bold text-[#1C1613]">
                    {st.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#756A62]">
                    {st.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
