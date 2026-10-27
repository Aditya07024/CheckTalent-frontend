"use client";

import React, { useState } from "react";
import {
  Award,
  FileText,
  GitBranch,
  MessageSquareCode,
  ShieldCheck,
  Sparkles,
  UserCheck,
} from "lucide-react";
import { SOLUTION_SECTION_CONTENT } from "@/data/site-content";
import { SECTION_IDS } from "@/lib/constants";
import type { IconKey, PipelineStageItem } from "@/types/platform";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { EvidenceConnector } from "@/components/visuals/EvidenceConnector";
import { LanguageShowcase3D } from "@/components/visuals/LanguageShowcase3D";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const STAGE_PALETTE = [
  {
    activeCard:
      "border-yellow-500 bg-gradient-to-br from-yellow-50 via-amber-50/70 to-white shadow-[0_14px_34px_rgba(234,179,8,0.18)]",
    iconBox: "bg-yellow-100 border-yellow-300 text-yellow-800",
    stepColor: "text-yellow-800",
    dot: "bg-yellow-500",
  },
  {
    activeCard:
      "border-amber-500 bg-gradient-to-br from-amber-50 via-orange-50/60 to-white shadow-[0_14px_34px_rgba(245,158,11,0.18)]",
    iconBox: "bg-amber-100 border-amber-300 text-amber-800",
    stepColor: "text-amber-800",
    dot: "bg-amber-500",
  },
  {
    activeCard:
      "border-red-500 bg-gradient-to-br from-red-50 via-orange-50/60 to-white shadow-[0_14px_34px_rgba(239,68,68,0.18)]",
    iconBox: "bg-red-100 border-red-300 text-red-700",
    stepColor: "text-red-700",
    dot: "bg-red-500",
  },
  {
    activeCard:
      "border-orange-500 bg-gradient-to-br from-orange-50 via-amber-50/60 to-white shadow-[0_14px_34px_rgba(249,115,22,0.18)]",
    iconBox: "bg-orange-100 border-orange-300 text-orange-800",
    stepColor: "text-orange-800",
    dot: "bg-orange-500",
  },
  {
    activeCard:
      "border-orange-600 bg-gradient-to-br from-yellow-50 via-orange-50 to-white shadow-[0_14px_34px_rgba(234,88,12,0.20)]",
    iconBox: "bg-gradient-to-br from-yellow-400 to-orange-500 border-orange-400 text-white",
    stepColor: "text-orange-800",
    dot: "bg-orange-600",
  },
  {
    activeCard:
      "border-red-600 bg-gradient-to-br from-orange-50 via-red-50/70 to-white shadow-[0_14px_34px_rgba(220,38,38,0.18)]",
    iconBox: "bg-red-100 border-red-300 text-red-800",
    stepColor: "text-red-800",
    dot: "bg-red-600",
  },
] as const;

function StageIcon({ icon }: { icon: IconKey }) {
  switch (icon) {
    case "file-text":
      return <FileText className="h-4 w-4" />;
    case "git-branch":
      return <GitBranch className="h-4 w-4" />;
    case "message-square-code":
      return <MessageSquareCode className="h-4 w-4" />;
    case "shield-check":
      return <ShieldCheck className="h-4 w-4" />;
    case "award":
      return <Award className="h-4 w-4" />;
    case "user-check":
    default:
      return <UserCheck className="h-4 w-4" />;
  }
}

export function SolutionSection() {
  const [activeStageId, setActiveStageId] = useState<string>(
    SOLUTION_SECTION_CONTENT.stages[1]?.id ?? "stage-repo-intel"
  );

  const activeStage: PipelineStageItem =
    SOLUTION_SECTION_CONTENT.stages.find((s) => s.id === activeStageId) ??
    SOLUTION_SECTION_CONTENT.stages[0]!;

  return (
    <AnimatedSection
      id={SECTION_IDS.solution}
      className="border-b border-orange-200/70 bg-gradient-to-b from-[#FAF7F2] via-yellow-50/45 to-orange-50/45 py-20 lg:py-28"
    >
      <div className="container">
        {/* Section Header */}
        <div data-animate-header className="max-w-3xl space-y-4">
          <span className="inline-block rounded-full border border-orange-300 bg-orange-50 px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-orange-800">
            {SOLUTION_SECTION_CONTENT.eyebrow}
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-[42px] leading-[1.12]">
            {SOLUTION_SECTION_CONTENT.heading}
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-ink-secondary">
            {SOLUTION_SECTION_CONTENT.subheading}
          </p>
        </div>

        {/* Desktop Horizontal / Mobile Vertical Verification Pipeline */}
        <div className="mt-12">
          <div
            role="tablist"
            aria-label="Proof of Skill verification pipeline stages"
            className="flex flex-col xl:flex-row xl:items-stretch"
          >
            {SOLUTION_SECTION_CONTENT.stages.map((stage, index) => {
              const isSelected = stage.id === activeStage.id;
              const isLast = index === SOLUTION_SECTION_CONTENT.stages.length - 1;
              const palette = STAGE_PALETTE[index % STAGE_PALETTE.length]!;

              return (
                <React.Fragment key={stage.id}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    data-animate-item
                    onClick={() => setActiveStageId(stage.id)}
                    onMouseEnter={() => setActiveStageId(stage.id)}
                    className={cn(
                      "group relative flex flex-1 flex-col justify-between rounded-xl border p-4 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500",
                      isSelected
                        ? `${palette.activeCard} -translate-y-1`
                        : "border-orange-200/75 bg-white/90 hover:border-orange-300 hover:bg-amber-50/40"
                    )}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={cn(
                            "font-mono text-[11px] font-bold",
                            isSelected ? palette.stepColor : "text-ink-muted"
                          )}
                        >
                          STAGE {stage.stepNumber}
                        </span>
                        <div
                          className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-lg border",
                            palette.iconBox
                          )}
                        >
                          <StageIcon icon={stage.icon} />
                        </div>
                      </div>

                      <h3 className="mt-3.5 text-base font-bold text-ink">
                        {stage.title}
                      </h3>

                      <p className="mt-1.5 text-xs leading-relaxed text-ink-secondary">
                        {stage.shortDescription}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-orange-200/60 pt-2.5">
                      <span className="truncate font-mono text-[10px] font-medium text-ink-muted">
                        {stage.verificationSignal}
                      </span>
                      <span
                        className={cn(
                          "h-2 w-2 shrink-0 rounded-full transition-colors",
                          isSelected ? palette.dot : "bg-orange-200"
                        )}
                      />
                    </div>
                  </button>

                  {!isLast && (
                    <>
                      <EvidenceConnector
                        orientation="horizontal"
                        active={isSelected}
                        accent={stage.isAiAssisted ? "violet" : "lime"}
                      />
                      <EvidenceConnector
                        orientation="vertical"
                        active={isSelected}
                        accent={stage.isAiAssisted ? "violet" : "lime"}
                        className="xl:hidden"
                      />
                    </>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Interactive Selected Stage Telemetry Strip */}
          <div
            aria-live="polite"
            className="mt-6 rounded-2xl border border-orange-300/80 bg-white p-5 sm:p-6 shadow-[0_12px_32px_rgba(234,88,12,0.08)]"
          >
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant={activeStage.isAiAssisted ? "violet" : "default"}>
                    {activeStage.isAiAssisted && <Sparkles className="h-3 w-3" />}
                    STAGE {activeStage.stepNumber} · {activeStage.title.toUpperCase()}
                  </Badge>
                  <span className="font-mono text-xs text-ink-muted">
                    Click or hover any pipeline stage above to inspect its artifact contract
                  </span>
                </div>
                <p className="pt-1 text-sm text-ink-secondary">
                  {activeStage.shortDescription}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:min-w-[460px]">
                <div className="rounded-xl border border-amber-300 bg-gradient-to-br from-yellow-50 to-amber-50/70 px-3.5 py-2.5">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-amber-900">
                    Stage Input
                  </span>
                  <p className="mt-1 font-mono text-xs font-medium text-ink">
                    {activeStage.inputArtifact}
                  </p>
                </div>
                <div className="rounded-xl border border-orange-300 bg-gradient-to-br from-orange-50 to-red-50/70 px-3.5 py-2.5">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-orange-900">
                    Verified Output
                  </span>
                  <p className="mt-1 font-mono text-xs font-medium text-ink">
                    {activeStage.outputArtifact}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive 3D Extruded Polyglot Language Adapter Dock */}
        <LanguageShowcase3D />
      </div>
    </AnimatedSection>
  );
}
