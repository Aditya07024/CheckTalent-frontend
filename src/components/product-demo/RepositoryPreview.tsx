"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  CheckCircle2,
  FileCode2,
  FolderGit2,
  GitBranch,
  MessageSquareCode,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { HERO_REPO_PREVIEW_DATA } from "@/data/site-content";
import { useAnimationContext } from "@/components/animations/AnimationProvider";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function RepositoryPreview() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const { prefersReducedMotion } = useAnimationContext();

  useGSAP(
    () => {
      if (prefersReducedMotion || !rootRef.current) return;

      const panels = rootRef.current.querySelectorAll("[data-hero-panel]");
      gsap.from(panels, {
        y: 14,
        opacity: 0,
        duration: 0.55,
        stagger: 0.09,
        delay: 0.15,
        ease: "power2.out",
        clearProps: "transform,opacity",
      });
    },
    { scope: rootRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <div
      ref={rootRef}
      className="relative flex h-full flex-col justify-between overflow-hidden rounded-lg border border-hairline bg-canvas p-4 sm:p-5"
    >
      {/* Subtle non-intrusive scanning highlight line (disabled under reduced motion) */}
      {!prefersReducedMotion && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-20 animate-scan-sweep bg-gradient-to-b from-transparent via-lime/[0.035] to-transparent"
        />
      )}

      {/* Top Window Header & Illustrative Disclaimer */}
      <div
        data-hero-panel
        className="flex flex-wrap items-center justify-between gap-2 border-b border-hairline pb-3.5"
      >
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded border border-hairline bg-canvas-elevated text-lime">
            <FolderGit2 className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-semibold text-ink">
                {HERO_REPO_PREVIEW_DATA.repositoryName}
              </span>
              <span className="inline-flex items-center gap-1 rounded border border-hairline bg-canvas-secondary px-1.5 py-0.5 font-mono text-[10px] text-ink-secondary">
                <GitBranch className="h-2.5 w-2.5 text-lime" />
                {HERO_REPO_PREVIEW_DATA.branch}
              </span>
            </div>
            <p className="mt-0.5 font-mono text-[11px] text-ink-secondary">
              {HERO_REPO_PREVIEW_DATA.analysisStatus}
            </p>
          </div>
        </div>

        <span className="rounded border border-hairline bg-canvas-secondary px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-ink-muted">
          {HERO_REPO_PREVIEW_DATA.illustrativeLabel}
        </span>
      </div>

      {/* Language Breakdown Strip */}
      <div data-hero-panel className="mt-3.5 space-y-2">
        <div className="flex items-center justify-between font-mono text-[11px]">
          <span className="uppercase tracking-wider text-ink-muted">
            Language Adapters
          </span>
          <div className="flex flex-wrap items-center gap-3">
            {HERO_REPO_PREVIEW_DATA.languages.map((lang) => (
              <span key={lang.name} className="inline-flex items-center gap-1.5 text-ink-secondary">
                <span className={cn("h-2 w-2 rounded-full", lang.colorClass)} />
                <span className="text-ink">{lang.name}</span>
                <span className="text-ink-muted">{lang.share}</span>
              </span>
            ))}
          </div>
        </div>
        <div
          aria-hidden="true"
          className="flex h-1.5 w-full overflow-hidden rounded-full bg-canvas-elevated"
        >
          <div className="h-full w-[68%] bg-lime" />
          <div className="h-full w-[21%] bg-[#61DAFB]" />
          <div className="h-full w-[11%] bg-violet" />
        </div>
      </div>

      {/* Middle Two-Column Grid: Extracted Evidence + Skill Assessment */}
      <div className="mt-4 grid grid-cols-1 gap-3.5 sm:grid-cols-12">
        {/* Extracted Repository Evidence */}
        <div
          data-hero-panel
          className="sm:col-span-7 rounded-md border border-hairline bg-canvas-secondary p-3.5"
        >
          <div className="mb-2.5 flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-wider text-ink-secondary">
              Repository Evidence
            </span>
            <span className="font-mono text-[10px] text-lime">4 FINDINGS</span>
          </div>

          <ul className="space-y-2">
            {HERO_REPO_PREVIEW_DATA.evidenceFindings.map((item) => (
              <li
                key={item.id}
                className="flex items-start gap-2 rounded border border-hairline/70 bg-canvas/70 px-2.5 py-2"
              >
                {item.tone === "verified" ? (
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-lime" />
                ) : (
                  <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-300" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-ink leading-tight">
                    {item.label}
                  </p>
                  <p className="mt-0.5 truncate font-mono text-[10px] text-ink-muted">
                    {item.reference}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Skill Assessment + Confidence */}
        <div
          data-hero-panel
          className="sm:col-span-5 flex flex-col justify-between gap-3 rounded-md border border-hairline bg-canvas-secondary p-3.5"
        >
          <div>
            <div className="mb-2.5 flex items-center justify-between">
              <span className="font-mono text-[11px] uppercase tracking-wider text-ink-secondary">
                Skill Assessment
              </span>
              <FileCode2 className="h-3.5 w-3.5 text-ink-muted" />
            </div>

            <div className="space-y-3">
              {HERO_REPO_PREVIEW_DATA.skillAssessments.map((item) => (
                <div key={item.skill} className="space-y-1">
                  <div className="flex items-center justify-between gap-1 text-xs">
                    <span className="font-medium text-ink">{item.skill}</span>
                    <span
                      className={cn(
                        "font-mono text-[10px]",
                        item.tone === "strong" && "text-lime",
                        item.tone === "moderate" && "text-ink",
                        item.tone === "limited" && "text-amber-300"
                      )}
                    >
                      {item.rating}
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-canvas-elevated">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all",
                        item.tone === "strong" && "bg-lime",
                        item.tone === "moderate" && "bg-ink-secondary",
                        item.tone === "limited" && "bg-amber-300/80"
                      )}
                      style={{ width: `${item.barPercent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Qualitative Confidence Indicator */}
          <div className="rounded border border-lime/25 bg-lime-dim/60 p-2.5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-wider text-lime">
                {HERO_REPO_PREVIEW_DATA.confidenceIndicator.label}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-lime" />
            </div>
            <p className="mt-1 text-xs font-medium text-ink">
              {HERO_REPO_PREVIEW_DATA.confidenceIndicator.status}
            </p>
            <p className="mt-0.5 font-mono text-[10px] text-ink-secondary">
              {HERO_REPO_PREVIEW_DATA.confidenceIndicator.note}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Panel: Technical Viva Card (Subtle Violet AI Accent) */}
      <div
        data-hero-panel
        className="mt-3.5 rounded-md border border-violet-border bg-canvas-elevated/90 p-3.5"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Badge variant="violet" className="text-[10px]">
            <Sparkles className="h-3 w-3" />
            {HERO_REPO_PREVIEW_DATA.vivaCard.badge}
          </Badge>
          <span className="inline-flex items-center gap-1 font-mono text-[11px] text-ink-secondary">
            <MessageSquareCode className="h-3.5 w-3.5 text-violet" />
            {HERO_REPO_PREVIEW_DATA.vivaCard.fileAnchor}
          </span>
        </div>

        <p className="mt-2.5 text-xs sm:text-[13px] leading-relaxed text-ink">
          “{HERO_REPO_PREVIEW_DATA.vivaCard.question}”
        </p>

        <div className="mt-2.5 flex items-center justify-between border-t border-hairline pt-2 font-mono text-[10px] text-ink-muted">
          <span>RUBRIC TARGET: {HERO_REPO_PREVIEW_DATA.vivaCard.rubricFocus}</span>
          <span className="text-violet">CODE DEFENSE PROMPT</span>
        </div>
      </div>
    </div>
  );
}
