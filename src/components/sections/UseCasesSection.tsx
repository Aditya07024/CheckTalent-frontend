import React from "react";
import {
  BookOpen,
  Briefcase,
  GraduationCap,
  Rocket,
  Terminal,
  Users,
} from "lucide-react";
import { USE_CASES_CONTENT } from "@/data/site-content";
import { SECTION_IDS } from "@/lib/constants";
import type { IconKey } from "@/types/platform";
import { AnimatedSection } from "@/components/animations/AnimatedSection";

function UseCaseIcon({ icon }: { icon: IconKey }) {
  switch (icon) {
    case "rocket":
      return <Rocket className="h-5 w-5 text-lime" />;
    case "users":
      return <Users className="h-5 w-5 text-lime" />;
    case "briefcase":
      return <Briefcase className="h-5 w-5 text-lime" />;
    case "graduation-cap":
      return <GraduationCap className="h-5 w-5 text-violet" />;
    case "terminal":
      return <Terminal className="h-5 w-5 text-lime" />;
    case "book-open":
    default:
      return <BookOpen className="h-5 w-5 text-violet" />;
  }
}

export function UseCasesSection() {
  return (
    <AnimatedSection
      id={SECTION_IDS.useCases}
      className="border-b border-hairline bg-canvas-secondary/45 py-20 lg:py-28"
    >
      <div className="container">
        <div data-animate-header className="max-w-3xl space-y-4">
          <span className="font-mono text-xs uppercase tracking-widest text-lime">
            {USE_CASES_CONTENT.eyebrow}
          </span>
          <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-[42px] leading-[1.12]">
            {USE_CASES_CONTENT.heading}
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-ink-secondary">
            {USE_CASES_CONTENT.subheading}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {USE_CASES_CONTENT.items.map((item) => (
            <article
              key={item.id}
              data-animate-item
              className="flex flex-col justify-between rounded-xl border border-hairline bg-canvas p-6 transition-colors hover:border-hairline-strong"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">
                      {item.code}
                    </span>
                    <p className="font-mono text-xs text-lime">{item.audience}</p>
                  </div>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-hairline bg-canvas-elevated">
                    <UseCaseIcon icon={item.icon} />
                  </div>
                </div>

                <h3 className="mt-4 text-lg font-semibold text-ink leading-snug">
                  {item.title}
                </h3>

                <p className="mt-2.5 text-sm leading-relaxed text-ink-secondary">
                  {item.description}
                </p>
              </div>

              <div className="mt-5 border-t border-hairline pt-3 font-mono text-[11px] text-ink-muted">
                KEY MECHANISM: <span className="text-ink">{item.primaryMechanism}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
