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
      className="relative flex flex-col justify-between overflow-hidden rounded-xl border border-orange-200/90 bg-white shadow-sm"
    >
      {/* Rich Warm Espresso IDE Chrome Header */}
      <div
        data-hero-panel
        className="flex flex-wrap items-center justify-between gap-2 bg-gradient-to-r from-[#1F140E] via-[#2F1A0F] to-[#3D1412] px-4 py-3 text-white"
      >
        <div className="flex items-center gap-3">
          {/* Warm Traffic Dots (Red · Orange · Yellow) */}
          <div aria-hidden="true" className="hidden sm:flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
            <span className="h-2.5 w-2.5 rounded-full bg-orange-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          </div>

          <div className="flex h-7 w-7 items-center justify-center rounded-md border border-orange-400/35 bg-orange-500/20 text-amber-300">
            <FolderGit2 className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-semibold text-white">
                {HERO_REPO_PREVIEW_DATA.repositoryName}
              </span>
              <span className="inline-flex items-center gap-1 rounded border border-amber-400/30 bg-amber-400/15 px-1.5 py-0.5 font-mono text-[10px] text-amber-200">
                <GitBranch className="h-2.5 w-2.5 text-yellow-300" />
                {HERO_REPO_PREVIEW_DATA.branch}
              </span>
            </div>
            <p className="mt-0.5 font-mono text-[10px] text-orange-200/80">
              {HERO_REPO_PREVIEW_DATA.analysisStatus}
            </p>
          </div>
        </div>

        <span className="rounded border border-orange-300/25 bg-black/35 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-amber-200">
          {HERO_REPO_PREVIEW_DATA.illustrativeLabel}
        </span>
      </div>

      <div className="p-4 sm:p-4.5 space-y-3.5">
        {/* Language Breakdown Strip */}
        <div data-hero-panel className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[11px]">
            <span className="font-semibold uppercase tracking-wider text-orange-800">
              Language Adapters
            </span>
            <div className="flex flex-wrap items-center gap-3">
              {HERO_REPO_PREVIEW_DATA.languages.map((lang) => (
                <span
                  key={lang.name}
                  className="inline-flex items-center gap-1.5 text-ink-secondary"
                >
                  <span className={cn("h-2.5 w-2.5 rounded-full", lang.colorClass)} />
                  <span className="font-semibold text-ink">{lang.name}</span>
                  <span className="text-ink-muted">{lang.share}</span>
                </span>
              ))}
            </div>
          </div>
          <div
            aria-hidden="true"
            className="flex h-2 w-full overflow-hidden rounded-full bg-amber-100"
          >
            <div className="h-full w-[68%] bg-gradient-to-r from-orange-500 to-orange-600" />
            <div className="h-full w-[21%] bg-yellow-400" />
            <div className="h-full w-[11%] bg-red-500" />
          </div>
        </div>

        {/* Middle Two-Column Grid: Extracted Evidence + Skill Assessment */}
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-12">
          {/* Extracted Repository Evidence */}
          <div
            data-hero-panel
            className="sm:col-span-7 rounded-xl border border-orange-200/80 bg-gradient-to-br from-amber-50/70 via-white to-orange-50/60 p-3.5"
          >
            <div className="mb-2.5 flex items-center justify-between">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-orange-900">
                Repository Evidence
              </span>
              <span className="rounded-full bg-orange-100 px-2 py-0.5 font-mono text-[10px] font-bold text-orange-800">
                4 FINDINGS
              </span>
            </div>

            <ul className="space-y-2">
              {HERO_REPO_PREVIEW_DATA.evidenceFindings.map((item) => (
                <li
                  key={item.id}
                  className="flex items-start gap-2 rounded-lg border border-orange-200/60 bg-white px-2.5 py-2 shadow-[0_1px_2px_rgba(234,88,12,0.05)]"
                >
                  {item.tone === "verified" ? (
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-orange-600" />
                  ) : (
                    <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-600" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-ink leading-tight">
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
            className="sm:col-span-5 flex flex-col justify-between gap-3 rounded-xl border border-amber-200/90 bg-gradient-to-br from-yellow-50/70 via-white to-red-50/45 p-3.5"
          >
            <div>
              <div className="mb-2.5 flex items-center justify-between">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-amber-900">
                  Skill Assessment
                </span>
                <FileCode2 className="h-3.5 w-3.5 text-orange-600" />
              </div>

              <div className="space-y-3">
                {HERO_REPO_PREVIEW_DATA.skillAssessments.map((item) => (
                  <div key={item.skill} className="space-y-1">
                    <div className="flex items-center justify-between gap-1 text-xs">
                      <span className="font-semibold text-ink">{item.skill}</span>
                      <span
                        className={cn(
                          "font-mono text-[10px] font-bold",
                          item.tone === "strong" && "text-orange-700",
                          item.tone === "moderate" && "text-amber-700",
                          item.tone === "limited" && "text-red-700"
                        )}
                      >
                        {item.rating}
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-orange-100/80">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all",
                          item.tone === "strong" &&
                            "bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500",
                          item.tone === "moderate" &&
                            "bg-gradient-to-r from-yellow-400 to-amber-500",
                          item.tone === "limited" &&
                            "bg-gradient-to-r from-red-400 to-red-600"
                        )}
                        style={{ width: `${item.barPercent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Qualitative Confidence Indicator */}
            <div className="rounded-lg border border-orange-300/80 bg-gradient-to-r from-yellow-100/80 to-orange-100/70 p-2.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-orange-900">
                  {HERO_REPO_PREVIEW_DATA.confidenceIndicator.label}
                </span>
                <span className="h-2 w-2 rounded-full bg-orange-600" />
              </div>
              <p className="mt-1 text-xs font-semibold text-ink">
                {HERO_REPO_PREVIEW_DATA.confidenceIndicator.status}
              </p>
              <p className="mt-0.5 font-mono text-[10px] text-orange-900/80">
                {HERO_REPO_PREVIEW_DATA.confidenceIndicator.note}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Panel: Technical Viva Card (Warm Crimson-Amber Accent) */}
        <div
          data-hero-panel
          className="rounded-xl border border-red-200 bg-gradient-to-r from-amber-50/90 via-orange-50/85 to-red-50/95 p-3.5"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Badge variant="violet" className="text-[10px]">
              <Sparkles className="h-3 w-3 text-orange-600" />
              {HERO_REPO_PREVIEW_DATA.vivaCard.badge}
            </Badge>
            <span className="inline-flex items-center gap-1 font-mono text-[11px] font-medium text-red-800">
              <MessageSquareCode className="h-3.5 w-3.5 text-red-600" />
              {HERO_REPO_PREVIEW_DATA.vivaCard.fileAnchor}
            </span>
          </div>

          <p className="mt-2 text-xs sm:text-[13px] font-medium leading-relaxed text-ink">
            “{HERO_REPO_PREVIEW_DATA.vivaCard.question}”
          </p>

          <div className="mt-2 flex items-center justify-between border-t border-red-200/70 pt-2 font-mono text-[10px] text-ink-muted">
            <span>RUBRIC TARGET: {HERO_REPO_PREVIEW_DATA.vivaCard.rubricFocus}</span>
            <span className="font-bold text-red-700">CODE DEFENSE PROMPT</span>
          </div>
        </div>
      </div>
    </div>
  );
}
