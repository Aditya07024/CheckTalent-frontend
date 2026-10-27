"use client";

import React, { useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  CheckCircle2,
  FileCode2,
  FolderGit2,
  GitBranch,
  Loader2,
  MessageSquareCode,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { HERO_REPO_PREVIEW_DATA } from "@/data/site-content";
import { useAnimationContext } from "@/components/animations/AnimationProvider";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Animated counter that ticks from 0 → target                       */
/* ------------------------------------------------------------------ */
function AnimatedCounter({
  value,
  suffix = "",
  started,
}: {
  value: number;
  suffix?: string;
  started: boolean;
}) {
  const spanRef = useRef<HTMLSpanElement | null>(null);

  useGSAP(
    () => {
      if (!started || !spanRef.current) return;
      gsap.fromTo(
        spanRef.current,
        { textContent: 0 },
        {
          textContent: value,
          duration: 1.2,
          ease: "power1.out",
          snap: { textContent: 1 },
          onUpdate() {
            if (spanRef.current) {
              spanRef.current.textContent = `${Math.round(
                parseFloat(spanRef.current.textContent || "0")
              )}${suffix}`;
            }
          },
        }
      );
    },
    { dependencies: [started, value, suffix] }
  );

  return (
    <span ref={spanRef}>
      {started ? `0${suffix}` : `0${suffix}`}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Typing text effect                                                 */
/* ------------------------------------------------------------------ */
function TypedText({
  text,
  started,
  delay = 0,
  speed = 25,
}: {
  text: string;
  started: boolean;
  delay?: number;
  speed?: number;
}) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  React.useEffect(() => {
    if (!started) {
      setDisplayed("");
      setDone(false);
      return;
    }

    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [started, text, delay, speed]);

  return (
    <span>
      {displayed}
      {started && !done && (
        <span className="inline-block w-[2px] h-3 bg-orange-600 ml-0.5 animate-pulse align-middle" />
      )}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Progress bar that animates from 0 → target width                   */
/* ------------------------------------------------------------------ */
function AnimatedBar({
  percent,
  className,
  started,
  delay = 0,
}: {
  percent: number;
  className: string;
  started: boolean;
  delay?: number;
}) {
  const barRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!started || !barRef.current) return;
      gsap.fromTo(
        barRef.current,
        { width: "0%" },
        { width: `${percent}%`, duration: 1.4, delay, ease: "power2.out" }
      );
    },
    { dependencies: [started, percent, delay] }
  );

  return (
    <div
      ref={barRef}
      className={cn("h-full rounded-full", className)}
      style={{ width: started ? undefined : "0%" }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Main RepositoryPreview — phased scanning animation                 */
/* ------------------------------------------------------------------ */
export function RepositoryPreview() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const { prefersReducedMotion } = useAnimationContext();

  // Animation phases: 0=hidden, 1=header, 2=languages, 3=evidence, 4=skills, 5=viva
  const [phase, setPhase] = useState(prefersReducedMotion ? 5 : 0);

  const advancePhase = useCallback(
    (p: number) => {
      if (prefersReducedMotion) return;
      setPhase(p);
    },
    [prefersReducedMotion]
  );

  useGSAP(
    () => {
      if (prefersReducedMotion || !rootRef.current) return;

      // Trigger scanning when section scrolls into view
      ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top 85%",
        once: true,
        onEnter: () => {
          // Phase 1: Header appears
          advancePhase(1);

          // Phase 2: Languages scan (after header settles)
          gsap.delayedCall(0.6, () => advancePhase(2));

          // Phase 3: Evidence findings stream in
          gsap.delayedCall(1.8, () => advancePhase(3));

          // Phase 4: Skill assessment bars animate
          gsap.delayedCall(3.6, () => advancePhase(4));

          // Phase 5: Viva question types out
          gsap.delayedCall(5.0, () => advancePhase(5));
        },
      });
    },
    { scope: rootRef, dependencies: [prefersReducedMotion] }
  );

  // Animate evidence findings one by one
  const evidenceRef = useRef<HTMLUListElement | null>(null);
  useGSAP(
    () => {
      if (phase < 3 || !evidenceRef.current || prefersReducedMotion) return;
      const items = evidenceRef.current.querySelectorAll("[data-evidence-item]");
      gsap.from(items, {
        x: -20,
        opacity: 0,
        duration: 0.4,
        stagger: 0.35,
        ease: "power2.out",
        clearProps: "transform,opacity",
      });
    },
    { scope: evidenceRef, dependencies: [phase] }
  );

  // Animate skill assessment entries
  const skillsRef = useRef<HTMLDivElement | null>(null);
  useGSAP(
    () => {
      if (phase < 4 || !skillsRef.current || prefersReducedMotion) return;
      const items = skillsRef.current.querySelectorAll("[data-skill-item]");
      gsap.from(items, {
        y: 12,
        opacity: 0,
        duration: 0.4,
        stagger: 0.25,
        ease: "power2.out",
        clearProps: "transform,opacity",
      });
    },
    { scope: skillsRef, dependencies: [phase] }
  );

  const showAll = prefersReducedMotion;

  return (
    <div
      ref={rootRef}
      className="relative flex flex-col justify-between overflow-hidden rounded-xl border border-orange-200/90 bg-white shadow-sm"
    >
      {/* IDE Chrome Header */}
      <div
        className={cn(
          "flex flex-wrap items-center justify-between gap-2 bg-gradient-to-r from-[#1F140E] via-[#2F1A0F] to-[#3D1412] px-4 py-3 text-white transition-opacity duration-500",
          phase >= 1 || showAll ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="flex items-center gap-3">
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
              {phase >= 2 || showAll ? (
                <TypedText
                  text={HERO_REPO_PREVIEW_DATA.analysisStatus}
                  started={phase >= 2 || showAll}
                  speed={20}
                />
              ) : (
                <span className="inline-flex items-center gap-1.5">
                  <Loader2 className="h-2.5 w-2.5 animate-spin" />
                  Scanning repository…
                </span>
              )}
            </p>
          </div>
        </div>

        <span className="rounded border border-orange-300/25 bg-black/35 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-amber-200">
          {HERO_REPO_PREVIEW_DATA.illustrativeLabel}
        </span>
      </div>

      <div className="p-4 sm:p-4.5 space-y-3.5">
        {/* Language Breakdown Strip */}
        <div
          className={cn(
            "space-y-2 transition-all duration-500",
            phase >= 2 || showAll
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-3"
          )}
        >
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
                  <span className="text-ink-muted">
                    {phase >= 2 || showAll ? (
                      <AnimatedCounter
                        value={parseInt(lang.share)}
                        suffix="%"
                        started={phase >= 2 || showAll}
                      />
                    ) : (
                      "0%"
                    )}
                  </span>
                </span>
              ))}
            </div>
          </div>
          <div
            aria-hidden="true"
            className="flex h-2 w-full overflow-hidden rounded-full bg-amber-100"
          >
            <AnimatedBar
              percent={68}
              className="bg-gradient-to-r from-orange-500 to-orange-600"
              started={phase >= 2 || showAll}
            />
            <AnimatedBar
              percent={21}
              className="bg-yellow-400"
              started={phase >= 2 || showAll}
              delay={0.3}
            />
            <AnimatedBar
              percent={11}
              className="bg-red-500"
              started={phase >= 2 || showAll}
              delay={0.6}
            />
          </div>
        </div>

        {/* Middle Two-Column Grid: Extracted Evidence + Skill Assessment */}
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-12">
          {/* Extracted Repository Evidence */}
          <div
            className={cn(
              "sm:col-span-7 rounded-xl border border-orange-200/80 bg-gradient-to-br from-amber-50/70 via-white to-orange-50/60 p-3.5 transition-all duration-500",
              phase >= 3 || showAll
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            )}
          >
            <div className="mb-2.5 flex items-center justify-between">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-orange-900">
                Repository Evidence
              </span>
              <span className="rounded-full bg-orange-100 px-2 py-0.5 font-mono text-[10px] font-bold text-orange-800">
                {phase >= 3 || showAll ? (
                  <span className="inline-flex items-center gap-1">
                    <AnimatedCounter value={4} started={phase >= 3 || showAll} /> FINDINGS
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1">
                    <Loader2 className="h-2.5 w-2.5 animate-spin" />
                    SCANNING
                  </span>
                )}
              </span>
            </div>

            <ul ref={evidenceRef} className="space-y-2">
              {(phase >= 3 || showAll) &&
                HERO_REPO_PREVIEW_DATA.evidenceFindings.map((item) => (
                  <li
                    key={item.id}
                    data-evidence-item
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
              {phase < 3 && !showAll && (
                <li className="flex items-center justify-center gap-2 py-8 text-ink-muted">
                  <Loader2 className="h-4 w-4 animate-spin text-orange-500" />
                  <span className="font-mono text-xs">Indexing source modules…</span>
                </li>
              )}
            </ul>
          </div>

          {/* Skill Assessment + Confidence */}
          <div
            className={cn(
              "sm:col-span-5 flex flex-col justify-between gap-3 rounded-xl border border-amber-200/90 bg-gradient-to-br from-yellow-50/70 via-white to-red-50/45 p-3.5 transition-all duration-500",
              phase >= 4 || showAll
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            )}
          >
            <div>
              <div className="mb-2.5 flex items-center justify-between">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-amber-900">
                  Skill Assessment
                </span>
                <FileCode2 className="h-3.5 w-3.5 text-orange-600" />
              </div>

              <div ref={skillsRef} className="space-y-3">
                {(phase >= 4 || showAll) &&
                  HERO_REPO_PREVIEW_DATA.skillAssessments.map((item, idx) => (
                    <div key={item.skill} data-skill-item className="space-y-1">
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
                        <AnimatedBar
                          percent={item.barPercent}
                          className={cn(
                            item.tone === "strong" &&
                              "bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500",
                            item.tone === "moderate" &&
                              "bg-gradient-to-r from-yellow-400 to-amber-500",
                            item.tone === "limited" &&
                              "bg-gradient-to-r from-red-400 to-red-600"
                          )}
                          started={phase >= 4 || showAll}
                          delay={idx * 0.3}
                        />
                      </div>
                    </div>
                  ))}
                {phase < 4 && !showAll && (
                  <div className="flex items-center justify-center gap-2 py-6 text-ink-muted">
                    <Loader2 className="h-4 w-4 animate-spin text-amber-500" />
                    <span className="font-mono text-xs">Evaluating skills…</span>
                  </div>
                )}
              </div>
            </div>

            {/* Qualitative Confidence Indicator */}
            <div
              className={cn(
                "rounded-lg border border-orange-300/80 bg-gradient-to-r from-yellow-100/80 to-orange-100/70 p-2.5 transition-all duration-500",
                phase >= 4 || showAll ? "opacity-100" : "opacity-0"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-orange-900">
                  {HERO_REPO_PREVIEW_DATA.confidenceIndicator.label}
                </span>
                <span
                  className={cn(
                    "h-2 w-2 rounded-full transition-colors duration-700",
                    phase >= 4 || showAll ? "bg-orange-600" : "bg-gray-300"
                  )}
                />
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

        {/* Bottom Panel: Technical Viva Card */}
        <div
          className={cn(
            "rounded-xl border border-red-200 bg-gradient-to-r from-amber-50/90 via-orange-50/85 to-red-50/95 p-3.5 transition-all duration-600",
            phase >= 5 || showAll
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          )}
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
            &ldquo;
            {phase >= 5 || showAll ? (
              <TypedText
                text={HERO_REPO_PREVIEW_DATA.vivaCard.question}
                started={phase >= 5 || showAll}
                speed={18}
              />
            ) : (
              "…"
            )}
            &rdquo;
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
