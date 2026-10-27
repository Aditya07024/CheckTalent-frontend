import React from "react";
import { Eye, Info, Lock, Sliders, UserCog } from "lucide-react";
import { TRUST_SECTION_CONTENT } from "@/data/site-content";
import { SECTION_IDS } from "@/lib/constants";
import type { IconKey } from "@/types/platform";
import { AnimatedSection } from "@/components/animations/AnimatedSection";

function TrustIcon({ icon }: { icon: IconKey }) {
  switch (icon) {
    case "eye":
      return <Eye className="h-5 w-5 text-lime" />;
    case "lock":
      return <Lock className="h-5 w-5 text-lime" />;
    case "sliders":
      return <Sliders className="h-5 w-5 text-violet" />;
    case "user-cog":
    default:
      return <UserCog className="h-5 w-5 text-lime" />;
  }
}

export function TrustSection() {
  return (
    <AnimatedSection
      id={SECTION_IDS.trust}
      className="border-b border-hairline py-20 lg:py-28"
    >
      <div className="container">
        {/* Heading */}
        <div data-animate-header className="max-w-3xl space-y-4">
          <span className="font-mono text-xs uppercase tracking-widest text-lime">
            {TRUST_SECTION_CONTENT.eyebrow}
          </span>
          <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-[42px] leading-[1.12]">
            {TRUST_SECTION_CONTENT.heading}
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-ink-secondary">
            {TRUST_SECTION_CONTENT.subheading}
          </p>
        </div>

        {/* Four Compact Governance Pillars */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {TRUST_SECTION_CONTENT.pillars.map((pillar) => (
            <article
              key={pillar.id}
              data-animate-item
              className="flex flex-col justify-between rounded-xl border border-hairline bg-canvas-secondary p-6"
            >
              <div>
                <div className="flex items-center justify-between border-b border-hairline pb-4">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-ink-muted">
                    {pillar.code}
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-md border border-hairline bg-canvas">
                    <TrustIcon icon={pillar.icon} />
                  </div>
                </div>

                <h3 className="mt-4 text-lg font-semibold text-ink">
                  {pillar.title}
                </h3>
                <p className="mt-1.5 text-sm font-medium text-ink-secondary">
                  {pillar.summary}
                </p>

                <ul className="mt-4 space-y-2.5 border-t border-hairline pt-4">
                  {pillar.commitments.map((commitment) => (
                    <li
                      key={commitment}
                      className="flex items-start gap-2 text-xs leading-relaxed text-ink-secondary"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lime" />
                      <span>{commitment}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 rounded border border-hairline bg-canvas px-3 py-2 font-mono text-[11px] text-ink-muted">
                {pillar.boundaryNote}
              </div>
            </article>
          ))}
        </div>

        {/* Methodological Precision & Non-Overclaim Notice */}
        <div
          data-animate-item
          className="mt-8 flex items-start gap-3.5 rounded-xl border border-hairline-strong bg-canvas-secondary/90 p-5"
        >
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-lime" />
          <p className="text-xs sm:text-sm leading-relaxed text-ink-secondary">
            {TRUST_SECTION_CONTENT.methodologicalDisclaimer}
          </p>
        </div>
      </div>
    </AnimatedSection>
  );
}
