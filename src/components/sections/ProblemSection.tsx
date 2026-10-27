import React from "react";
import { AlertOctagon, CopySlash, Scale, SearchCode } from "lucide-react";
import { PROBLEM_SECTION_CONTENT } from "@/data/site-content";
import { SECTION_IDS } from "@/lib/constants";
import type { IconKey } from "@/types/platform";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { TiltCard3D } from "@/components/visuals/TiltCard3D";

const CARD_WARM_STYLES = [
  {
    topBorder: "border-t-4 border-t-yellow-500",
    iconBox: "border-yellow-300 bg-yellow-100 text-yellow-800",
    cardTint: "from-yellow-50/75 via-white to-amber-50/40 border-yellow-200/90",
    glow: "rgba(234, 179, 8, 0.16)",
  },
  {
    topBorder: "border-t-4 border-t-orange-500",
    iconBox: "border-orange-300 bg-orange-100 text-orange-800",
    cardTint: "from-orange-50/75 via-white to-amber-50/40 border-orange-200/90",
    glow: "rgba(249, 115, 22, 0.16)",
  },
  {
    topBorder: "border-t-4 border-t-red-500",
    iconBox: "border-red-300 bg-red-100 text-red-800",
    cardTint: "from-red-50/75 via-white to-orange-50/40 border-red-200/90",
    glow: "rgba(239, 68, 68, 0.16)",
  },
] as const;

function ProblemIcon({ icon }: { icon: IconKey }) {
  switch (icon) {
    case "search-code":
      return <SearchCode className="h-5 w-5" />;
    case "copy-slash":
      return <CopySlash className="h-5 w-5" />;
    case "scale":
    default:
      return <Scale className="h-5 w-5" />;
  }
}

export function ProblemSection() {
  return (
    <AnimatedSection
      id={SECTION_IDS.problem}
      className="border-b border-orange-200/70 bg-gradient-to-b from-amber-50/50 via-transparent to-red-50/35 py-20 lg:py-28"
    >
      <div className="container">
        {/* Section Header */}
        <div data-animate-header className="max-w-3xl space-y-4">
          <span className="inline-block rounded-full border border-red-200 bg-red-50 px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-red-800">
            {PROBLEM_SECTION_CONTENT.eyebrow}
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-[42px] leading-[1.12]">
            {PROBLEM_SECTION_CONTENT.heading}
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-ink-secondary">
            {PROBLEM_SECTION_CONTENT.subheading}
          </p>
        </div>

        {/* Three 3D-Tilt Warm Color Problem Cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {PROBLEM_SECTION_CONTENT.problems.map((problem, index) => {
            const theme = CARD_WARM_STYLES[index % CARD_WARM_STYLES.length]!;
            return (
              <TiltCard3D
                key={problem.id}
                glowColor={theme.glow}
                data-animate-item
                className={`flex flex-col justify-between rounded-2xl border border-b-4 border-b-orange-300 bg-gradient-to-br p-6 shadow-[0_12px_32px_rgba(234,88,12,0.08)] ${theme.cardTint} ${theme.topBorder}`}
              >
                <div>
                  {/* Top Card Telemetry */}
                  <div className="flex items-center justify-between border-b border-orange-200/60 pb-4">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg border shadow-sm ${theme.iconBox}`}
                      >
                        <ProblemIcon icon={problem.icon} />
                      </div>
                      <div>
                        <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-orange-800">
                          {problem.code}
                        </span>
                        <span className="font-mono text-xs text-ink-secondary">
                          {problem.label}
                        </span>
                      </div>
                    </div>

                    <span className="rounded-full bg-white/80 px-2.5 py-0.5 font-mono text-xs font-semibold text-orange-900 border border-orange-200/70">
                      0{index + 1} / 03
                    </span>
                  </div>

                  {/* Problem Title & Explanation */}
                  <h3 className="mt-5 text-xl font-bold tracking-tight text-ink">
                    {problem.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-secondary">
                    {problem.description}
                  </p>

                  {/* Contrast Micro-Diagram: Claimed vs Uninspected Reality */}
                  <div className="mt-5 space-y-2 rounded-xl border border-orange-200/80 bg-white/90 p-3.5 font-mono text-xs shadow-sm">
                    <div className="rounded-lg border border-amber-200 bg-yellow-50/70 px-2.5 py-2 text-ink-secondary">
                      <span className="block text-[10px] font-bold uppercase text-amber-800">
                        Surface Signal
                      </span>
                      <span className="mt-0.5 block text-ink">
                        {problem.contrastArtifacts.claimed}
                      </span>
                    </div>
                    <div className="rounded-lg border border-red-200 bg-red-50/80 px-2.5 py-2 text-red-950">
                      <span className="block text-[10px] font-bold uppercase text-red-700">
                        Evaluation Blind Spot
                      </span>
                      <span className="mt-0.5 block">
                        {problem.contrastArtifacts.reality}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Failure Tag */}
                <div className="mt-5 flex items-center gap-2 border-t border-orange-200/60 pt-3.5 font-mono text-[11px] font-medium text-red-800">
                  <AlertOctagon className="h-3.5 w-3.5 shrink-0 text-red-600" />
                  <span>{problem.failureSignal}</span>
                </div>
              </TiltCard3D>
            );
          })}
        </div>

        {/* Concluding Editorial Statement */}
        <div
          data-animate-item
          className="mt-12 flex flex-col items-start justify-between gap-4 rounded-2xl border border-orange-400/40 bg-gradient-to-r from-[#1F140E] via-[#341A0F] to-[#461313] px-6 py-5 text-white shadow-[0_16px_40px_rgba(220,38,38,0.16)] sm:flex-row sm:items-center"
        >
          <div className="flex items-center gap-3">
            <span className="h-3 w-3 shrink-0 rounded-full bg-yellow-400 ring-4 ring-yellow-400/25" />
            <p className="text-base sm:text-lg font-semibold text-amber-50">
              {PROBLEM_SECTION_CONTENT.concludingStatement}
            </p>
          </div>
          <span className="rounded-full border border-amber-400/40 bg-orange-500/20 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-yellow-300">
            CLAIM → VERIFICATION
          </span>
        </div>
      </div>
    </AnimatedSection>
  );
}
