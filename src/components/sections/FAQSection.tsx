"use client";

import React, { useState } from "react";
import { FAQ_ITEMS, FAQ_SECTION_CONTENT } from "@/data/faqs";
import type { FAQItem } from "@/types/platform";
import { SECTION_IDS } from "@/lib/constants";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

type FAQFilter = "All" | FAQItem["category"];

const FILTER_OPTIONS: ReadonlyArray<FAQFilter> = [
  "All",
  "Platform",
  "Verification",
  "Privacy & Fairness",
  "Adoption",
];

export function FAQSection() {
  const [activeFilter, setActiveFilter] = useState<FAQFilter>("All");

  const filteredFaqs =
    activeFilter === "All"
      ? FAQ_ITEMS
      : FAQ_ITEMS.filter((item) => item.category === activeFilter);

  return (
    <AnimatedSection
      id={SECTION_IDS.faq}
      className="relative overflow-hidden border-b border-orange-200/80 bg-gradient-to-b from-amber-50/65 via-[#FAF7F2] to-orange-50/55 py-20 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-yellow-300/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 bottom-12 h-72 w-72 rounded-full bg-red-400/15 blur-3xl"
      />
      <div className="container relative">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Sticky Header & Filter */}
          <div data-animate-header className="lg:col-span-4 space-y-5 lg:sticky lg:top-24 lg:self-start">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-300 bg-gradient-to-r from-yellow-100 to-orange-100 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-widest text-orange-900">
              {FAQ_SECTION_CONTENT.eyebrow}
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl leading-[1.12]">
              {FAQ_SECTION_CONTENT.heading}
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-ink-secondary">
              {FAQ_SECTION_CONTENT.subheading}
            </p>

            {/* Topic Filter Pills */}
            <div className="pt-2">
              <span className="block font-mono text-[10px] font-semibold uppercase tracking-wider text-orange-800/80 mb-2.5">
                Filter by Topic ({filteredFaqs.length} shown)
              </span>
              <div className="flex flex-wrap gap-2">
                {FILTER_OPTIONS.map((filter) => {
                  const isSelected = activeFilter === filter;
                  return (
                    <button
                      key={filter}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => setActiveFilter(filter)}
                      className={cn(
                        "rounded-lg border px-3 py-1.5 font-mono text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500",
                        isSelected
                          ? "border-orange-500 bg-gradient-to-r from-yellow-100 via-amber-100 to-orange-100 text-orange-950 font-semibold shadow-[0_4px_12px_rgba(234,88,12,0.16)]"
                          : "border-orange-200/80 bg-white text-ink-secondary hover:border-orange-400 hover:bg-amber-50/70 hover:text-orange-950"
                      )}
                    >
                      {filter}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Accessible Radix Accordion */}
          <div className="lg:col-span-8">
            <div className="overflow-hidden rounded-2xl border border-orange-200/85 bg-white shadow-[0_12px_36px_rgba(234,88,12,0.08)]">
              <Accordion
                type="single"
                collapsible
                defaultValue={FAQ_ITEMS[0]?.id}
                className="w-full"
              >
                {filteredFaqs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger className="px-5 sm:px-6">
                      <span className="flex items-baseline gap-3.5 pr-2">
                        <span className="rounded bg-gradient-to-br from-amber-100 to-orange-100 px-1.5 py-0.5 font-mono text-xs font-semibold text-orange-800 border border-orange-200/80">
                          {faq.index}
                        </span>
                        <span className="text-sm sm:text-base font-medium text-ink">
                          {faq.question}
                        </span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-5 sm:px-6 sm:pl-16 text-sm leading-relaxed text-ink-secondary">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
