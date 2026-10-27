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
      className="border-b border-hairline bg-canvas-secondary/35 py-20 lg:py-28"
    >
      <div className="container">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Sticky Header & Filter */}
          <div data-animate-header className="lg:col-span-4 space-y-5 lg:sticky lg:top-24 lg:self-start">
            <span className="font-mono text-xs uppercase tracking-widest text-lime">
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
              <span className="block font-mono text-[10px] uppercase tracking-wider text-ink-muted mb-2.5">
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
                        "rounded-md border px-3 py-1.5 font-mono text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime",
                        isSelected
                          ? "border-lime bg-lime-dim text-lime"
                          : "border-hairline bg-canvas text-ink-secondary hover:border-hairline-strong hover:text-ink"
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
            <div className="overflow-hidden rounded-xl border border-hairline bg-canvas">
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
                        <span className="font-mono text-xs text-lime">
                          {faq.index}
                        </span>
                        <span className="text-sm sm:text-base font-medium text-ink">
                          {faq.question}
                        </span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-5 sm:px-6 sm:pl-14 text-sm leading-relaxed text-ink-secondary">
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
