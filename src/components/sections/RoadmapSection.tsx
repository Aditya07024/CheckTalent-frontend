import React from "react";
import { CheckCircle2, CircleDashed, Compass } from "lucide-react";
import { ROADMAP_PHASES, ROADMAP_SECTION_CONTENT } from "@/data/roadmap";
import { SECTION_IDS } from "@/lib/constants";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function RoadmapSection() {
  return (
    <AnimatedSection
      id={SECTION_IDS.roadmap}
      className="border-b border-hairline py-20 lg:py-28"
    >
      <div className="container">
        {/* Heading + Status Legend */}
        <div
          data-animate-header
          className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end"
        >
          <div className="max-w-3xl space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-lime">
              {ROADMAP_SECTION_CONTENT.eyebrow}
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-[42px] leading-[1.12]">
              {ROADMAP_SECTION_CONTENT.heading}
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-ink-secondary">
              {ROADMAP_SECTION_CONTENT.subheading}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 rounded-lg border border-hairline bg-canvas-secondary px-4 py-2.5 font-mono text-xs">
            <span className="inline-flex items-center gap-1.5 text-lime">
              <span className="h-2 w-2 rounded-full bg-lime" />
              Core Architecture (Phase 1)
            </span>
            <span className="text-hairline-strong">|</span>
            <span className="inline-flex items-center gap-1.5 text-ink-secondary">
              <CircleDashed className="h-3.5 w-3.5 text-ink-muted" />
              Planned Future Phases (2–4)
            </span>
          </div>
        </div>

        {/* Four-Phase Roadmap Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {ROADMAP_PHASES.map((phase) => (
            <article
              key={phase.id}
              data-animate-item
              className={cn(
                "relative flex flex-col justify-between rounded-xl border p-6",
                phase.isCurrentFocus
                  ? "border-lime/50 bg-canvas-elevated shadow-[0_16px_48px_rgba(197,255,74,0.08)]"
                  : "border-hairline bg-canvas-secondary/80"
              )}
            >
              <div>
                <div className="flex items-center justify-between gap-2 border-b border-hairline pb-4">
                  <span
                    className={cn(
                      "font-mono text-xs font-semibold",
                      phase.isCurrentFocus ? "text-lime" : "text-ink-muted"
                    )}
                  >
                    {phase.phaseLabel}
                  </span>
                  <Badge variant={phase.isCurrentFocus ? "default" : "muted"}>
                    {phase.isCurrentFocus ? "FOUNDATIONAL FOCUS" : "PLANNED"}
                  </Badge>
                </div>

                <h3 className="mt-4 text-lg font-semibold text-ink">
                  {phase.title}
                </h3>

                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-ink-secondary">
                  {phase.summary}
                </p>

                <ul className="mt-5 space-y-2.5 border-t border-hairline pt-4">
                  {phase.deliverables.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-xs sm:text-[13px] text-ink"
                    >
                      {phase.isCurrentFocus ? (
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-lime" />
                      ) : (
                        <CircleDashed className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink-muted" />
                      )}
                      <span
                        className={cn(
                          !phase.isCurrentFocus && "text-ink-secondary"
                        )}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 border-t border-hairline pt-3 font-mono text-[11px] text-ink-muted">
                STATUS: {phase.status}
              </div>
            </article>
          ))}
        </div>

        {/* Transparency Footnote */}
        <div
          data-animate-item
          className="mt-8 flex items-center gap-3 rounded-lg border border-hairline bg-canvas-secondary/70 px-4 py-3 font-mono text-xs text-ink-muted"
        >
          <Compass className="h-4 w-4 shrink-0 text-lime" />
          <span>{ROADMAP_SECTION_CONTENT.statusLegendNote}</span>
        </div>
      </div>
    </AnimatedSection>
  );
}
