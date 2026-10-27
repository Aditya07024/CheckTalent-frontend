import React from "react";
import { AlertOctagon, CopySlash, Scale, SearchCode } from "lucide-react";
import { PROBLEM_SECTION_CONTENT } from "@/data/site-content";
import { SECTION_IDS } from "@/lib/constants";
import type { IconKey } from "@/types/platform";
import { AnimatedSection } from "@/components/animations/AnimatedSection";

function ProblemIcon({ icon }: { icon: IconKey }) {
  switch (icon) {
    case "search-code":
      return <SearchCode className="h-5 w-5 text-lime" />;
    case "copy-slash":
      return <CopySlash className="h-5 w-5 text-amber-300" />;
    case "scale":
    default:
      return <Scale className="h-5 w-5 text-violet" />;
  }
}

export function ProblemSection() {
  return (
    <AnimatedSection
      id={SECTION_IDS.problem}
      className="border-b border-hairline bg-canvas-secondary/50 py-20 lg:py-28"
    >
      <div className="container">
        {/* Section Header */}
        <div data-animate-header className="max-w-3xl space-y-4">
          <span className="font-mono text-xs uppercase tracking-widest text-lime">
            {PROBLEM_SECTION_CONTENT.eyebrow}
          </span>
          <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-[42px] leading-[1.12]">
            {PROBLEM_SECTION_CONTENT.heading}
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-ink-secondary">
            {PROBLEM_SECTION_CONTENT.subheading}
          </p>
        </div>

        {/* Three Distinct Problem Cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {PROBLEM_SECTION_CONTENT.problems.map((problem, index) => (
            <article
              key={problem.id}
              data-animate-item
              className="group relative flex flex-col justify-between rounded-xl border border-hairline bg-canvas p-6 transition-colors hover:border-hairline-strong"
            >
              <div>
                {/* Top Card Telemetry */}
                <div className="flex items-center justify-between border-b border-hairline pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md border border-hairline bg-canvas-elevated">
                      <ProblemIcon icon={problem.icon} />
                    </div>
                    <div>
                      <span className="block font-mono text-[10px] uppercase tracking-wider text-ink-muted">
                        {problem.code}
                      </span>
                      <span className="font-mono text-xs text-ink-secondary">
                        {problem.label}
                      </span>
                    </div>
                  </div>

                  <span className="font-mono text-xs text-ink-muted">
                    0{index + 1} / 03
                  </span>
                </div>

                {/* Problem Title & Explanation */}
                <h3 className="mt-5 text-xl font-semibold tracking-tight text-ink">
                  {problem.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-secondary">
                  {problem.description}
                </p>

                {/* Contrast Micro-Diagram: Claimed vs Uninspected Reality */}
                <div className="mt-5 space-y-2 rounded-lg border border-hairline bg-canvas-secondary p-3.5 font-mono text-xs">
                  <div className="rounded border border-hairline bg-canvas px-2.5 py-2 text-ink-secondary">
                    <span className="block text-[10px] uppercase text-ink-muted">
                      Surface Signal
                    </span>
                    <span className="mt-0.5 block text-ink">
                      {problem.contrastArtifacts.claimed}
                    </span>
                  </div>
                  <div className="rounded border border-amber-400/20 bg-amber-400/[0.05] px-2.5 py-2 text-amber-100/90">
                    <span className="block text-[10px] uppercase text-amber-300">
                      Evaluation Blind Spot
                    </span>
                    <span className="mt-0.5 block">
                      {problem.contrastArtifacts.reality}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Failure Tag */}
              <div className="mt-5 flex items-center gap-2 border-t border-hairline pt-3.5 font-mono text-[11px] text-ink-muted">
                <AlertOctagon className="h-3.5 w-3.5 shrink-0 text-amber-300/80" />
                <span>{problem.failureSignal}</span>
              </div>
            </article>
          ))}
        </div>

        {/* Concluding Editorial Statement */}
        <div
          data-animate-item
          className="mt-12 flex flex-col items-start justify-between gap-4 rounded-xl border border-lime/30 bg-canvas-elevated/80 px-6 py-5 sm:flex-row sm:items-center"
        >
          <div className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-lime" />
            <p className="text-base sm:text-lg font-medium text-ink">
              {PROBLEM_SECTION_CONTENT.concludingStatement}
            </p>
          </div>
          <span className="font-mono text-xs uppercase tracking-wider text-lime">
            CLAIM → VERIFICATION
          </span>
        </div>
      </div>
    </AnimatedSection>
  );
}
