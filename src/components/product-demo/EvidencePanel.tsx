"use client";

import React from "react";
import {
  Calendar,
  CheckCircle2,
  Code2,
  FileCode,
  Info,
  MessageSquareCode,
  Scale,
  Sparkles,
} from "lucide-react";
import type { ProofSkillEntry } from "@/types/proof-card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface EvidencePanelProps {
  skill: ProofSkillEntry;
  compact?: boolean;
}

export function EvidencePanel({ skill, compact = false }: EvidencePanelProps) {
  return (
    <div className="space-y-5">
      {/* Top Provenance & Confidence Strip */}
      <div className="grid grid-cols-1 gap-3 rounded-lg border border-hairline bg-canvas p-4 sm:grid-cols-3">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">
            Qualitative Confidence
          </span>
          <p className="mt-1 font-mono text-xs font-medium text-lime">
            {skill.confidenceLabel}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-ink-secondary">
            {skill.confidenceRationale}
          </p>
        </div>

        <div className="border-t border-hairline pt-3 sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0">
          <span className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">
            Rubric & Verification
          </span>
          <p className="mt-1 font-mono text-xs text-ink">{skill.rubricId}</p>
          <p className="mt-1 text-xs text-ink-secondary">{skill.verificationMethod}</p>
        </div>

        <div className="border-t border-hairline pt-3 sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0">
          <span className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">
            Evaluation Timestamp
          </span>
          <p className="mt-1 inline-flex items-center gap-1.5 font-mono text-xs text-ink">
            <Calendar className="h-3.5 w-3.5 text-lime" />
            {skill.evaluatedDate}
          </p>
          <p className="mt-1 font-mono text-[11px] text-ink-muted">
            Sample snapshot · Non-calibrated demo
          </p>
        </div>
      </div>

      {/* Explicit Distinction: Verified Observations vs Inferred Assessments */}
      <div className="rounded-lg border border-hairline bg-canvas p-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-ink">
            <Scale className="h-3.5 w-3.5 text-lime" />
            Observation vs. Inference Separation
          </span>
          <span className="font-mono text-[10px] text-ink-muted">
            EPISTEMIC TRANSPARENCY
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {skill.distinctions.map((item) => {
            const isVerified = item.classification === "Verified Observation";
            return (
              <div
                key={item.statement}
                className={cn(
                  "rounded-md border p-3.5",
                  isVerified
                    ? "border-lime/30 bg-lime-dim/35"
                    : "border-violet-border bg-violet-dim/30"
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <Badge variant={isVerified ? "default" : "violet"}>
                    {isVerified ? (
                      <CheckCircle2 className="h-3 w-3" />
                    ) : (
                      <Info className="h-3 w-3" />
                    )}
                    {item.classification}
                  </Badge>
                  <span className="font-mono text-[10px] text-ink-muted">
                    {isVerified ? "DIRECT ARTIFACT" : "RUBRIC SYNTHESIS"}
                  </span>
                </div>
                <p className="mt-2.5 text-xs sm:text-[13px] leading-relaxed text-ink">
                  {item.statement}
                </p>
                <p className="mt-2 border-t border-hairline pt-2 font-mono text-[11px] text-ink-secondary">
                  Basis: {item.basis}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Supporting Repository Files & Code Snippet */}
      <div className={cn("grid grid-cols-1 gap-4", !compact && "lg:grid-cols-12")}>
        {/* Supporting Files List */}
        <div
          className={cn(
            "rounded-lg border border-hairline bg-canvas p-4",
            !compact && "lg:col-span-5"
          )}
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-ink">
              <FileCode className="h-3.5 w-3.5 text-lime" />
              Supporting Repository Files
            </span>
            <span className="font-mono text-[10px] text-ink-muted">
              {skill.supportingFiles.length} FILE(S)
            </span>
          </div>

          <div className="space-y-2.5">
            {skill.supportingFiles.map((file) => (
              <div
                key={file.path}
                className="rounded border border-hairline bg-canvas-secondary p-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-1 font-mono text-xs">
                  <span className="truncate font-medium text-lime">{file.path}</span>
                  <span className="text-[10px] text-ink-muted">{file.lineRange}</span>
                </div>
                <p className="mt-1 font-mono text-[11px] text-ink">{file.role}</p>
                <p className="mt-1 text-xs leading-relaxed text-ink-secondary">
                  {file.observation}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Code Reference + Viva Reference */}
        <div className={cn("space-y-4", !compact && "lg:col-span-7")}>
          {/* Code Snippet */}
          <div className="rounded-lg border border-hairline bg-canvas p-4">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-ink">
                <Code2 className="h-3.5 w-3.5 text-lime" />
                Example Code Reference
              </span>
              <span className="font-mono text-[11px] text-ink-secondary">
                {skill.codeReference.file}:{skill.codeReference.lineRange}
              </span>
            </div>
            <p className="mb-2.5 text-xs text-ink-secondary">
              {skill.codeReference.caption}
            </p>
            <pre className="overflow-x-auto rounded-lg border border-orange-900/30 bg-[#1F1510] p-3.5 font-mono text-xs leading-relaxed text-amber-50 shadow-inner">
              <code>{skill.codeReference.snippet}</code>
            </pre>
          </div>

          {/* Viva Question Reference */}
          <div className="rounded-lg border border-violet-border bg-canvas p-4">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <Badge variant="violet">
                <Sparkles className="h-3 w-3" />
                Viva Reference · {skill.vivaReference.id}
              </Badge>
              <span className="font-mono text-[11px] text-ink-muted">
                {skill.vivaReference.evaluatedAt}
              </span>
            </div>

            <p className="font-mono text-[11px] text-ink-secondary">
              Anchor: {skill.vivaReference.referencedCode}
            </p>

            <div className="mt-2 rounded border border-hairline bg-canvas-secondary p-3">
              <p className="flex items-start gap-2 text-xs font-medium text-ink">
                <MessageSquareCode className="mt-0.5 h-3.5 w-3.5 shrink-0 text-violet" />
                <span>“{skill.vivaReference.question}”</span>
              </p>
              <p className="mt-2 text-xs leading-relaxed text-ink-secondary">
                <strong className="font-mono text-[10px] uppercase tracking-wider text-ink">
                  Candidate Response Summary:{" "}
                </strong>
                {skill.vivaReference.candidateResponseSummary}
              </p>
            </div>

            <p className="mt-2.5 font-mono text-[11px] text-lime">
              Rubric Outcome: {skill.vivaReference.rubricOutcome}
            </p>
          </div>
        </div>
      </div>

      {/* Optional Recommended Next Action for Insufficient Evidence */}
      {skill.recommendedNextAction && (
        <div className="rounded-lg border border-amber-600/30 bg-amber-500/[0.08] p-3.5">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-amber-800">
            Recommended Next Verification Step
          </p>
          <p className="mt-1 text-xs sm:text-sm text-ink">
            {skill.recommendedNextAction}
          </p>
        </div>
      )}
    </div>
  );
}
