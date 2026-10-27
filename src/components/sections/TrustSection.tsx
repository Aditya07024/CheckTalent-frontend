import React from "react";
import { Eye, Info, Lock, Sliders, UserCog } from "lucide-react";
import { TRUST_SECTION_CONTENT } from "@/data/site-content";
import { SECTION_IDS } from "@/lib/constants";
import type { IconKey } from "@/types/platform";
import { AnimatedSection } from "@/components/animations/AnimatedSection";

const PILLAR_STYLES = [
  {
    topBar: "border-t-4 border-t-yellow-500",
    iconBox: "bg-yellow-100 border-yellow-300 text-yellow-800",
    dot: "bg-yellow-500",
  },
  {
    topBar: "border-t-4 border-t-amber-500",
    iconBox: "bg-amber-100 border-amber-300 text-amber-800",
    dot: "bg-amber-500",
  },
  {
    topBar: "border-t-4 border-t-orange-500",
    iconBox: "bg-orange-100 border-orange-300 text-orange-800",
    dot: "bg-orange-500",
  },
  {
    topBar: "border-t-4 border-t-red-500",
    iconBox: "bg-red-100 border-red-300 text-red-800",
    dot: "bg-red-500",
  },
] as const;

function TrustIcon({ icon }: { icon: IconKey }) {
  switch (icon) {
    case "eye":
      return <Eye className="h-5 w-5" />;
    case "lock":
      return <Lock className="h-5 w-5" />;
    case "sliders":
      return <Sliders className="h-5 w-5" />;
    case "user-cog":
    default:
      return <UserCog className="h-5 w-5" />;
  }
}

export function TrustSection() {
  return (
    <AnimatedSection
      id={SECTION_IDS.trust}
      className="border-b border-orange-200/70 bg-gradient-to-b from-[#FAF7F2] via-amber-50/45 to-orange-50/40 py-20 lg:py-28"
    >
      <div className="container">
        {/* Heading */}
        <div data-animate-header className="max-w-3xl space-y-4">
          <span className="inline-block rounded-full border border-orange-300 bg-orange-50 px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-orange-800">
            {TRUST_SECTION_CONTENT.eyebrow}
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-[42px] leading-[1.12]">
            {TRUST_SECTION_CONTENT.heading}
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-ink-secondary">
            {TRUST_SECTION_CONTENT.subheading}
          </p>
        </div>

        {/* Four Compact Governance Pillars */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {TRUST_SECTION_CONTENT.pillars.map((pillar, idx) => {
            const theme = PILLAR_STYLES[idx % PILLAR_STYLES.length]!;
            return (
              <article
                key={pillar.id}
                data-animate-item
                className={`flex flex-col justify-between rounded-2xl border border-orange-200/85 bg-white p-6 shadow-[0_8px_24px_rgba(234,88,12,0.06)] ${theme.topBar}`}
              >
                <div>
                  <div className="flex items-center justify-between border-b border-orange-100 pb-4">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-orange-900">
                      {pillar.code}
                    </span>
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-lg border ${theme.iconBox}`}
                    >
                      <TrustIcon icon={pillar.icon} />
                    </div>
                  </div>

                  <h3 className="mt-4 text-lg font-bold text-ink">
                    {pillar.title}
                  </h3>
                  <p className="mt-1.5 text-sm font-medium text-ink-secondary">
                    {pillar.summary}
                  </p>

                  <ul className="mt-4 space-y-2.5 border-t border-orange-100 pt-4">
                    {pillar.commitments.map((commitment) => (
                      <li
                        key={commitment}
                        className="flex items-start gap-2 text-xs leading-relaxed text-ink-secondary"
                      >
                        <span
                          className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${theme.dot}`}
                        />
                        <span>{commitment}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50/70 px-3 py-2 font-mono text-[11px] text-amber-950">
                  {pillar.boundaryNote}
                </div>
              </article>
            );
          })}
        </div>

        {/* Methodological Precision & Non-Overclaim Notice */}
        <div
          data-animate-item
          className="mt-8 flex items-start gap-3.5 rounded-2xl border border-orange-300/80 bg-gradient-to-r from-yellow-50 via-amber-50/80 to-orange-50 p-5 shadow-sm"
        >
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-orange-600" />
          <p className="text-xs sm:text-sm font-medium leading-relaxed text-ink-secondary">
            {TRUST_SECTION_CONTENT.methodologicalDisclaimer}
          </p>
        </div>
      </div>
    </AnimatedSection>
  );
}
