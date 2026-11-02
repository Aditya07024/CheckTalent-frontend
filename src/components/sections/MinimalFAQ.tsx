"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

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
      a: "1) 'User / Student / Employee' for candidates proving skills; 2) 'Off-Campus Companies' for employers recruiting pre-verified talent; and 3) 'Campus' for colleges and placement cells managing batch cohorts.",
    },
    {
      q: "Can users switch dashboards after selecting one?",
      a: "No. Once a user completes signup and chooses their role in onboarding, the dashboard is permanently locked to their account ID to ensure data integrity and security across the platform.",
    },
  ];

  return (
    <section id="faq" className="border-b border-[#1C1613]/10 bg-[#FAF7F2] py-16 lg:py-24">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="font-mono text-xs uppercase tracking-widest text-[#D9481E] font-bold">
            COMMON QUESTIONS
          </span>

          <h2 className="aldrich-regular text-3xl font-bold tracking-tight text-[#1C1613] sm:text-4xl">
            Frequently Asked Questions
          </h2>
        </div>

        {/* 4 Accordion FAQs */}
        <div className="mt-10 space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="overflow-hidden rounded-2xl border border-[#1C1613]/10 bg-white transition"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between p-5 text-left text-sm font-bold text-[#1C1613]"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className="h-4 w-4 text-[#D9481E] shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-[#756A62] transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-[#1C1613]/5 px-5 pb-5 pt-3 text-xs sm:text-sm leading-relaxed text-[#756A62]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
