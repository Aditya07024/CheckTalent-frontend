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
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

function StageIcon({ icon, isAi }: { icon: IconKey; isAi?: boolean }) {
  const colorClass = isAi ? "text-violet" : "text-lime";
  switch (icon) {
    case "file-text":
      return <FileText className={cn("h-4 w-4", colorClass)} />;
    case "git-branch":
      return <GitBranch className={cn("h-4 w-4", colorClass)} />;
    case "message-square-code":
      return <MessageSquareCode className={cn("h-4 w-4", colorClass)} />;
    case "shield-check":
      return <ShieldCheck className={cn("h-4 w-4", colorClass)} />;
    case "award":
      return <Award className={cn("h-4 w-4", colorClass)} />;
    case "user-check":
    default:
      return <UserCheck className={cn("h-4 w-4", colorClass)} />;
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
      className="border-b border-hairline py-20 lg:py-28"
    >
      <div className="container">
        {/* Section Header */}
        <div data-animate-header className="max-w-3xl space-y-4">
          <span className="font-mono text-xs uppercase tracking-widest text-lime">
            {SOLUTION_SECTION_CONTENT.eyebrow}
          </span>
          <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-[42px] leading-[1.12]">
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
                      "group relative flex flex-1 flex-col justify-between rounded-xl border p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime",
                      isSelected
                        ? stage.isAiAssisted
                          ? "border-violet-border bg-canvas-elevated shadow-[0_12px_36px_rgba(155,140,255,0.10)]"
                          : "border-lime/45 bg-canvas-elevated shadow-[0_12px_36px_rgba(197,255,74,0.08)]"
                        : "border-hairline bg-canvas-secondary hover:border-hairline-strong hover:bg-canvas-elevated/60"
                    )}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={cn(
                            "font-mono text-[11px] font-semibold",
                            isSelected
                              ? stage.isAiAssisted
                                ? "text-violet"
                                : "text-lime"
                              : "text-ink-muted"
                          )}
                        >
                          STAGE {stage.stepNumber}
                        </span>
                        <div className="flex h-8 w-8 items-center justify-center rounded-md border border-hairline bg-canvas">
                          <StageIcon icon={stage.icon} isAi={stage.isAiAssisted} />
                        </div>
                      </div>

                      <h3 className="mt-3.5 text-base font-semibold text-ink">
                        {stage.title}
                      </h3>

                      <p className="mt-1.5 text-xs leading-relaxed text-ink-secondary">
                        {stage.shortDescription}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-hairline pt-2.5">
                      <span className="truncate font-mono text-[10px] text-ink-muted">
                        {stage.verificationSignal}
                      </span>
                      <span
                        className={cn(
                          "h-1.5 w-1.5 shrink-0 rounded-full transition-colors",
                          isSelected
                            ? stage.isAiAssisted
                              ? "bg-violet"
                              : "bg-lime"
                            : "bg-hairline-strong"
                        )}
                      />
                    </div>
                  </button>

                  {!isLast && (
                    <>
                      {/* Horizontal Connector on XL Desktop */}
                      <EvidenceConnector
                        orientation="horizontal"
                        active={isSelected}
                        accent={stage.isAiAssisted ? "violet" : "lime"}
                      />
                      {/* Vertical Connector on Mobile/Tablet */}
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
            className="mt-6 rounded-xl border border-hairline-strong bg-canvas-secondary p-5 sm:p-6"
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
                <div className="rounded-lg border border-hairline bg-canvas px-3.5 py-2.5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">
                    Stage Input
                  </span>
                  <p className="mt-1 font-mono text-xs text-ink">
                    {activeStage.inputArtifact}
                  </p>
                </div>
                <div className="rounded-lg border border-lime/30 bg-lime-dim/30 px-3.5 py-2.5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-lime">
                    Verified Output
                  </span>
                  <p className="mt-1 font-mono text-xs text-ink">
                    {activeStage.outputArtifact}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
