"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  AlertTriangle,
  CheckCircle2,
  Code2,
  FileSearch,
  Layers,
  MessageSquareCode,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { FeatureAvailability, PlatformFeature } from "@/types/feature";
import { useAnimationContext } from "@/components/animations/AnimationProvider";
import { Badge } from "@/components/ui/badge";
import { FEATURE_EXPLORER_HEADER } from "@/data/features";
import { cn } from "@/lib/utils";

interface FeaturePreviewProps {
  feature: PlatformFeature;
  categoryTitle: string;
}

const AVAILABILITY_META: Record<
  FeatureAvailability,
  { label: string; variant: "default" | "neutral" | "violet" | "amber" }
> = {
  "core-architecture": {
    label: "Phase 1 · Core Architecture",
    variant: "default",
  },
  "planned-phase-2": {
    label: "Planned · Phase 2",
    variant: "neutral",
  },
  "planned-phase-3": {
    label: "Planned · Phase 3",
    variant: "neutral",
  },
  "planned-phase-4": {
    label: "Planned · Phase 4",
    variant: "amber",
  },
};

export function FeaturePreview({ feature, categoryTitle }: FeaturePreviewProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const { prefersReducedMotion } = useAnimationContext();

  useGSAP(
    () => {
      if (prefersReducedMotion || !panelRef.current) return;

      gsap.fromTo(
        panelRef.current,
        { opacity: 0.35, y: 8 },
        {
          opacity: 1,
          y: 0,
          duration: 0.28,
          ease: "power2.out",
          clearProps: "transform,opacity",
        }
      );
    },
    { scope: panelRef, dependencies: [feature.id, prefersReducedMotion] }
  );

  const availability = AVAILABILITY_META[feature.availability];
  const { preview } = feature;

  return (
    <div
      ref={panelRef}
      aria-live="polite"
      className="flex h-full flex-col justify-between rounded-xl border border-hairline-strong bg-canvas-secondary p-5 sm:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
    >
      <div>
        {/* Top Metadata Strip */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hairline pb-4">
          <div className="flex items-center gap-2">
            <span className="rounded border border-lime-border bg-lime-dim px-2 py-0.5 font-mono text-xs font-semibold text-lime">
              {feature.code}
            </span>
            <span className="font-mono text-xs uppercase tracking-wider text-ink-muted">
              {categoryTitle}
            </span>
          </div>
          <Badge variant={availability.variant}>{availability.label}</Badge>
        </div>

        {/* Feature Title & Core Explanation */}
        <div className="mt-5">
          <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-ink">
            {feature.name}
          </h3>
          <p className="mt-2.5 text-sm sm:text-[15px] leading-relaxed text-ink-secondary">
            {feature.description}
          </p>
        </div>

        {/* Value Proposition Callout */}
        <div className="mt-4 rounded-lg border border-hairline bg-canvas-elevated/80 p-3.5">
          <p className="font-mono text-[10px] uppercase tracking-wider text-lime">
            Why It Matters
          </p>
          <p className="mt-1 text-xs sm:text-sm leading-relaxed text-ink">
            {feature.valueProposition}
          </p>
        </div>

        {/* Guardrail / Epistemic Note if present */}
        {feature.guardrailNote && (
          <div className="mt-3 flex items-start gap-2.5 rounded-lg border border-amber-400/25 bg-amber-400/[0.06] p-3">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
            <p className="text-xs leading-relaxed text-amber-100/90">
              {feature.guardrailNote}
            </p>
          </div>
        )}

        {/* Bespoke Visual Mockup Stage */}
        <div className="mt-5 rounded-lg border border-hairline bg-canvas p-4">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-hairline pb-2.5">
            <span className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-ink">
              {preview.kind === "code-trace" && <Code2 className="h-3.5 w-3.5 text-lime" />}
              {preview.kind === "viva-exchange" && (
                <Sparkles className="h-3.5 w-3.5 text-violet" />
              )}
              {preview.kind === "ledger-card" && (
                <FileSearch className="h-3.5 w-3.5 text-lime" />
              )}
              {preview.kind === "comparison-matrix" && (
                <Layers className="h-3.5 w-3.5 text-lime" />
              )}
              {preview.kind === "roadmap-action" && (
                <CheckCircle2 className="h-3.5 w-3.5 text-lime" />
              )}
              {preview.kind === "governance-control" && (
                <ShieldCheck className="h-3.5 w-3.5 text-lime" />
              )}
              {preview.panelTitle}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">
              ILLUSTRATIVE ARTIFACT
            </span>
          </div>

          {/* Variant 1: Code Trace */}
          {preview.kind === "code-trace" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between font-mono text-[11px] text-ink-muted">
                <span className="truncate text-ink-secondary">{preview.filePath}</span>
                <span>{preview.language}</span>
              </div>
              <div className="overflow-x-auto rounded border border-hairline bg-canvas-secondary p-2.5 font-mono text-xs">
                {preview.lines.map((line) => (
                  <div
                    key={line.lineNumber}
                    className={cn(
                      "px-2 py-1 rounded-sm",
                      line.highlight === "lime" && "bg-lime-dim/70 border-l-2 border-lime",
                      line.highlight === "violet" &&
                        "bg-violet-dim/70 border-l-2 border-violet"
                    )}
                  >
                    <div className="flex gap-3">
                      <span className="w-6 shrink-0 select-none text-right text-ink-muted">
                        {line.lineNumber}
                      </span>
                      <code className="whitespace-pre text-ink">{line.code}</code>
                    </div>
                    {line.annotation && (
                      <p className="mt-1 pl-9 text-[11px] text-lime">
                        ↳ {line.annotation}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {preview.extractedSignals.map((sig) => (
                  <div
                    key={sig.label}
                    className="rounded border border-hairline bg-canvas-secondary px-2.5 py-2"
                  >
                    <p className="font-mono text-[10px] uppercase text-ink-muted">
                      {sig.label}
                    </p>
                    <p
                      className={cn(
                        "mt-0.5 font-mono text-xs",
                        sig.tone === "verified" && "text-lime",
                        sig.tone === "neutral" && "text-ink",
                        sig.tone === "caution" && "text-amber-300"
                      )}
                    >
                      {sig.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Variant 2: Viva Exchange */}
          {preview.kind === "viva-exchange" && (
            <div className="space-y-3">
              <div className="rounded border border-violet-border bg-violet-dim/40 p-3">
                <div className="flex items-center justify-between gap-2 font-mono text-[10px] text-violet">
                  <span className="inline-flex items-center gap-1">
                    <MessageSquareCode className="h-3 w-3" />
                    VIVA PROMPT
                  </span>
                  <span className="truncate text-ink-secondary">{preview.sourceReference}</span>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-ink">
                  “{preview.promptQuestion}”
                </p>
              </div>

              <div className="rounded border border-hairline bg-canvas-secondary p-3">
                <span className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">
                  Sample Candidate Defense Excerpt
                </span>
                <p className="mt-1 text-xs leading-relaxed text-ink-secondary">
                  “{preview.candidateExcerpt}”
                </p>
              </div>

              <div className="space-y-1.5">
                {preview.rubricChecks.map((chk) => (
                  <div
                    key={chk.criterion}
                    className="flex items-center justify-between gap-2 rounded border border-hairline bg-canvas-secondary/70 px-3 py-1.5 text-xs"
                  >
                    <span className="text-ink-secondary">{chk.criterion}</span>
                    <span className="font-mono text-[11px] text-lime">{chk.status}</span>
                  </div>
                ))}
              </div>

              <p className="font-mono text-[11px] text-ink-secondary">
                {preview.followUpOrFeedback}
              </p>
            </div>
          )}

          {/* Variant 3: Ledger Card */}
          {preview.kind === "ledger-card" && (
            <div className="space-y-2.5">
              <div className="font-mono text-[10px] text-ink-muted">
                RECORD ID: {preview.artifactId}
              </div>
              {preview.entries.map((entry) => (
                <div
                  key={entry.label}
                  className="rounded border border-hairline bg-canvas-secondary p-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-medium text-ink">{entry.label}</span>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-[10px] text-ink-muted">
                        {entry.classification}
                      </span>
                      <span className="rounded border border-lime/30 bg-lime-dim px-1.5 py-0.5 font-mono text-[10px] text-lime">
                        {entry.badge}
                      </span>
                    </div>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-ink-secondary">
                    {entry.detail}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Variant 4: Comparison Matrix */}
          {preview.kind === "comparison-matrix" && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs">
                <thead>
                  <tr className="border-b border-hairline font-mono text-[10px] uppercase tracking-wider text-ink-muted">
                    <th className="py-2 pr-3">{preview.columns[0]}</th>
                    <th className="py-2 px-3">{preview.columns[1]}</th>
                    <th className="py-2 pl-3">{preview.columns[2]}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-hairline">
                  {preview.rows.map((row) => (
                    <tr
                      key={row.dimension}
                      className={cn(row.highlight && "bg-lime-dim/25")}
                    >
                      <td className="py-2.5 pr-3 font-medium text-ink">
                        <div>{row.dimension}</div>
                        <div className="font-mono text-[10px] text-ink-muted">
                          {row.note}
                        </div>
                      </td>
                      <td className="py-2.5 px-3 font-mono text-[11px] text-lime">
                        {row.colA}
                      </td>
                      <td className="py-2.5 pl-3 text-ink-secondary">{row.colB}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Variant 5: Roadmap Action */}
          {preview.kind === "roadmap-action" && (
            <div className="space-y-2.5">
              <div className="rounded border border-hairline bg-canvas-secondary px-3 py-2 text-xs">
                <span className="font-mono text-[10px] uppercase text-ink-muted">
                  Diagnosed Gap:{" "}
                </span>
                <span className="text-ink">{preview.currentGap}</span>
              </div>
              {preview.steps.map((step) => (
                <div
                  key={step.stepCode}
                  className="rounded border border-hairline bg-canvas-secondary p-3"
                >
                  <div className="flex items-center justify-between font-mono text-[10px]">
                    <span className="text-lime">{step.stepCode}</span>
                    <span className="text-ink-muted">{step.status}</span>
                  </div>
                  <p className="mt-1 text-xs font-medium text-ink">{step.action}</p>
                  <p className="mt-1 font-mono text-[11px] text-ink-secondary">
                    → {step.artifactProduced}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Variant 6: Governance Control */}
          {preview.kind === "governance-control" && (
            <div className="space-y-2.5">
              <div className="font-mono text-[10px] text-ink-muted">
                POLICY: {preview.policyCode}
              </div>
              {preview.rules.map((item) => (
                <div
                  key={item.rule}
                  className="flex flex-col gap-1 rounded border border-hairline bg-canvas-secondary p-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="text-xs font-medium text-ink">{item.rule}</p>
                    <p className="mt-0.5 text-xs text-ink-secondary">{item.enforcement}</p>
                  </div>
                  <span
                    className={cn(
                      "shrink-0 self-start sm:self-center rounded border px-2 py-0.5 font-mono text-[10px]",
                      item.state === "Enforced" &&
                        "border-lime/30 bg-lime-dim text-lime",
                      item.state === "Excluded Signal" &&
                        "border-red-400/30 bg-red-400/10 text-red-300",
                      item.state === "Human Gate" &&
                        "border-violet-border bg-violet-dim text-violet"
                    )}
                  >
                    {item.state}
                  </span>
                </div>
              ))}
              <p className="pt-1 font-mono text-[11px] text-ink-muted">
                {preview.auditNote}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer Disclaimer */}
      <p className="mt-4 border-t border-hairline pt-3 font-mono text-[11px] text-ink-muted">
        {FEATURE_EXPLORER_HEADER.previewDisclaimer}
      </p>
    </div>
  );
}
