"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
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
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const PipelineEngine3D = dynamic(
  () =>
    import("@/components/visuals/PipelineEngine3D").then(
      (mod) => mod.PipelineEngine3D
    ),
  { ssr: false }
);

const STAGE_PALETTE = [
  {
    activeCard:
      "border-yellow-500 bg-gradient-to-br from-yellow-50 via-amber-50/70 to-white shadow-[0_10px_24px_rgba(234,179,8,0.16)]",
    iconBox: "bg-yellow-100 border-yellow-300 text-yellow-800",
    stepColor: "text-yellow-800",
    dot: "bg-yellow-500",
  },
  {
    activeCard:
      "border-amber-500 bg-gradient-to-br from-amber-50 via-orange-50/60 to-white shadow-[0_10px_24px_rgba(245,158,11,0.16)]",
    iconBox: "bg-amber-100 border-amber-300 text-amber-800",
    stepColor: "text-amber-800",
    dot: "bg-amber-500",
  },
  {
    activeCard:
      "border-red-500 bg-gradient-to-br from-red-50 via-orange-50/60 to-white shadow-[0_10px_24px_rgba(239,68,68,0.16)]",
    iconBox: "bg-red-100 border-red-300 text-red-700",
    stepColor: "text-red-700",
    dot: "bg-red-500",
  },
  {
    activeCard:
      "border-orange-500 bg-gradient-to-br from-orange-50 via-amber-50/60 to-white shadow-[0_10px_24px_rgba(249,115,22,0.16)]",
    iconBox: "bg-orange-100 border-orange-300 text-orange-800",
    stepColor: "text-orange-800",
    dot: "bg-orange-500",
  },
  {
    activeCard:
      "border-orange-600 bg-gradient-to-br from-yellow-50 via-orange-50 to-white shadow-[0_10px_24px_rgba(234,88,12,0.18)]",
    iconBox:
      "bg-gradient-to-br from-yellow-400 to-orange-500 border-orange-400 text-white",
    stepColor: "text-orange-800",
    dot: "bg-orange-600",
  },
  {
    activeCard:
      "border-red-600 bg-gradient-to-br from-orange-50 via-red-50/70 to-white shadow-[0_10px_24px_rgba(220,38,38,0.16)]",
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

  const activeStageIndex = Math.max(
    0,
    SOLUTION_SECTION_CONTENT.stages.findIndex((s) => s.id === activeStageId)
  );

  const activeStage: PipelineStageItem =
    SOLUTION_SECTION_CONTENT.stages[activeStageIndex] ??
    SOLUTION_SECTION_CONTENT.stages[0]!;

  return (
    <AnimatedSection
      id={SECTION_IDS.solution}
      className="relative overflow-hidden border-b border-orange-200/70 bg-gradient-to-b from-transparent via-yellow-50/40 to-orange-50/40 py-16 lg:py-24"
    >
      <div className="container relative z-10">
        {/* Section Header */}
        <div data-animate-header className="max-w-3xl space-y-3">
          <span className="inline-block rounded-full border border-orange-300 bg-orange-50 px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-orange-800">
            {SOLUTION_SECTION_CONTENT.eyebrow}
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-[40px] leading-[1.12]">
            {SOLUTION_SECTION_CONTENT.heading}
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-ink-secondary">
            {SOLUTION_SECTION_CONTENT.subheading}
          </p>
        </div>

        {/* 60% / 40% Screen Split: Pipeline Stages on Left (60%), Open-Air Floating 3D Stack on Right (40%) */}
        <div className="mt-10 flex flex-col lg:flex-row lg:items-center lg:gap-10 xl:gap-14">
          {/* Left Column: 60% width */}
          <div className="w-full lg:w-[60%] space-y-4">
            {/* Stage Selector Grid */}
            <div
              role="tablist"
              aria-label="TalentLens verification pipeline stages"
              className="grid grid-cols-1 gap-2.5 sm:grid-cols-2"
            >
              {SOLUTION_SECTION_CONTENT.stages.map((stage, index) => {
                const isSelected = stage.id === activeStage.id;
                const palette = STAGE_PALETTE[index % STAGE_PALETTE.length]!;

                return (
                  <button
                    key={stage.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    data-animate-item
                    onClick={() => setActiveStageId(stage.id)}
                    className={cn(
                      "group flex flex-col justify-between rounded-xl border-2 p-3.5 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500",
                      isSelected
                        ? `${palette.activeCard} border-orange-600 -translate-y-0.5`
                        : "border-orange-200/80 bg-white/95 hover:border-orange-400 hover:bg-amber-50/45"
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
                            "flex h-7 w-7 items-center justify-center rounded-lg border",
                            palette.iconBox
                          )}
                        >
                          <StageIcon icon={stage.icon} />
                        </div>
                      </div>

                      <h3 className="mt-2 text-sm font-bold text-ink">
                        {stage.title}
                      </h3>

                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-ink-secondary">
                        {stage.shortDescription}
                      </p>
                    </div>

                    <div className="mt-3 flex items-center justify-between border-t border-orange-200/60 pt-2">
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
                );
              })}
            </div>

            {/* Active Stage Deep-Dive Card */}
            <div
              aria-live="polite"
              className="rounded-2xl border-2 border-orange-300/80 bg-white p-5 shadow-[0_8px_24px_rgba(234,88,12,0.08)]"
            >
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Badge variant={activeStage.isAiAssisted ? "violet" : "default"}>
                    {activeStage.isAiAssisted && <Sparkles className="h-3 w-3" />}
                    STAGE {activeStage.stepNumber} · {activeStage.title.toUpperCase()}
                  </Badge>
                  <span className="font-mono text-xs text-orange-800">
                    {activeStage.verificationSignal}
                  </span>
                </div>

                <p className="text-sm leading-relaxed text-ink-secondary">
                  {activeStage.shortDescription}
                </p>

                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 pt-1">
                  <div className="rounded-xl border border-amber-300 bg-gradient-to-br from-yellow-50 to-amber-50/70 p-3">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-amber-900">
                      Stage Input
                    </span>
                    <p className="mt-0.5 font-mono text-xs font-medium text-ink">
                      {activeStage.inputArtifact}
                    </p>
                  </div>
                  <div className="rounded-xl border border-orange-300 bg-gradient-to-br from-orange-50 to-red-50/70 p-3">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-orange-900">
                      Verified Output
                    </span>
                    <p className="mt-0.5 font-mono text-xs font-medium text-ink">
                      {activeStage.outputArtifact}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 40% width — Open-air floating 3D Pipeline Stack (NO box) */}
          <div className="relative w-full lg:w-[40%] flex items-center justify-center">
            {/* Ambient Warm Glow behind the floating 3D stack */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute h-[420px] w-[420px] rounded-full bg-gradient-to-tr from-yellow-300/25 via-orange-300/20 to-red-300/15 blur-3xl transform-gpu will-change-transform"
            />

            {/* Unboxed 3D Canvas */}
            <PipelineEngine3D
              activeStageIndex={activeStageIndex}
              className="relative z-10"
            />
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
