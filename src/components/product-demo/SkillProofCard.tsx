"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Expand,
  FileCheck2,
  FolderGit2,
  Layers,
  User,
} from "lucide-react";
import { SAMPLE_PROOF_CARD } from "@/data/sample-proof-card";
import type { EvidenceStrength } from "@/types/proof-card";
import { EvidencePanel } from "@/components/product-demo/EvidencePanel";
import { useAnimationContext } from "@/components/animations/AnimationProvider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

function getStatusStyles(status: EvidenceStrength) {
  switch (status) {
    case "Strong evidence":
      return {
        badgeVariant: "default" as const,
        dotClass: "bg-lime",
        borderActive: "border-lime/50 bg-canvas-elevated",
        icon: CheckCircle2,
        iconClass: "text-lime",
      };
    case "Moderate evidence":
      return {
        badgeVariant: "neutral" as const,
        dotClass: "bg-ink",
        borderActive: "border-hairline-strong bg-canvas-elevated",
        icon: Layers,
        iconClass: "text-ink",
      };
    case "Insufficient evidence":
      return {
        badgeVariant: "amber" as const,
        dotClass: "bg-amber-600",
        borderActive: "border-amber-600/45 bg-canvas-elevated shadow-[0_8px_24px_rgba(217,119,6,0.08)]",
        icon: AlertCircle,
        iconClass: "text-amber-700",
      };
  }
}

export function SkillProofCard() {
  const [selectedSkillId, setSelectedSkillId] = useState<string>(
    SAMPLE_PROOF_CARD.skills[0]?.id ?? "skill-react"
  );
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [auditModalOpen, setAuditModalOpen] = useState<boolean>(false);

  const expansionRef = useRef<HTMLDivElement | null>(null);
  const { prefersReducedMotion } = useAnimationContext();

  const activeSkill =
    SAMPLE_PROOF_CARD.skills.find((s) => s.id === selectedSkillId) ??
    SAMPLE_PROOF_CARD.skills[0]!;

  useGSAP(
    () => {
      if (!expansionRef.current) return;

      if (prefersReducedMotion) {
        gsap.set(expansionRef.current, {
          height: isExpanded ? "auto" : 0,
          opacity: isExpanded ? 1 : 0,
        });
        return;
      }

      if (isExpanded) {
        gsap.fromTo(
          expansionRef.current,
          { height: 0, opacity: 0 },
          {
            height: "auto",
            opacity: 1,
            duration: 0.42,
            ease: "power3.out",
          }
        );
      } else {
        gsap.to(expansionRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut",
        });
      }
    },
    { dependencies: [isExpanded, prefersReducedMotion] }
  );

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-hairline-strong bg-canvas-elevated shadow-[0_20px_60px_rgba(15,23,42,0.08),0_2px_8px_rgba(15,23,42,0.04)]">
        {/* Sample Demonstration Top Warning/Identification Banner */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hairline bg-canvas-secondary px-4 py-2.5 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-lime" />
            <span className="font-mono text-[11px] font-medium uppercase tracking-wider text-lime">
              {SAMPLE_PROOF_CARD.simulationBanner}
            </span>
          </div>
          <span className="font-mono text-[11px] text-ink-muted">
            RECORD ID: {SAMPLE_PROOF_CARD.profileId} · EVALUATED{" "}
            {SAMPLE_PROOF_CARD.lastEvaluatedDate}
          </span>
        </div>

        {/* Candidate Profile Header */}
        <div className="border-b border-hairline p-5 sm:p-7">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-lime/35 bg-canvas-elevated font-mono text-base font-semibold text-lime">
                AM
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-ink">
                    {SAMPLE_PROOF_CARD.candidateName}
                  </h3>
                  <Badge variant="neutral">
                    <User className="h-3 w-3" />
                    {SAMPLE_PROOF_CARD.targetRole}
                  </Badge>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-ink-secondary">
                  <span className="inline-flex items-center gap-1.5">
                    <FolderGit2 className="h-3.5 w-3.5 text-lime" />
                    {SAMPLE_PROOF_CARD.evaluatedRepository}
                  </span>
                  <span className="text-ink-muted">
                    {SAMPLE_PROOF_CARD.evidenceSourcesCount.indexedFiles} indexed files ·{" "}
                    {SAMPLE_PROOF_CARD.evidenceSourcesCount.vivaResponses} viva exchanges
                  </span>
                </div>
              </div>
            </div>

            {/* Primary Proof Card Action Controls */}
            <div className="flex flex-wrap items-center gap-3">
              <Button
                type="button"
                variant={isExpanded ? "secondary" : "default"}
                onClick={() => setIsExpanded((prev) => !prev)}
                aria-expanded={isExpanded}
                aria-controls="proof-card-expanded-evidence"
              >
                <FileCheck2 className="h-4 w-4" />
                {isExpanded ? "Collapse Evidence View" : "Explore the Proof Card"}
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => setAuditModalOpen(true)}
              >
                <Expand className="h-4 w-4" />
                Open Full Audit Modal
              </Button>
            </div>
          </div>
        </div>

        {/* Three Core Evaluated Skills Grid */}
        <div className="p-5 sm:p-7">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <span className="font-mono text-xs uppercase tracking-wider text-ink-secondary">
              Evaluated Skill Claims — Select a skill to inspect supporting artifacts
            </span>
            <span className="font-mono text-[11px] text-ink-muted">
              3 RUBRIC-EVALUATED SKILLS
            </span>
          </div>

          <div
            role="tablist"
            aria-label="Evaluated candidate skills"
            className="grid grid-cols-1 gap-4 lg:grid-cols-3"
          >
            {SAMPLE_PROOF_CARD.skills.map((skill) => {
              const isSelected = skill.id === activeSkill.id;
              const style = getStatusStyles(skill.status);
              const StatusIcon = style.icon;

              return (
                <button
                  key={skill.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => {
                    setSelectedSkillId(skill.id);
                    if (!isExpanded) {
                      setIsExpanded(true);
                    }
                  }}
                  className={cn(
                    "group flex flex-col justify-between rounded-lg border p-4 sm:p-5 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime",
                    isSelected
                      ? style.borderActive
                      : "border-hairline bg-canvas/70 hover:border-hairline-strong hover:bg-canvas-elevated/60"
                  )}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-lg font-semibold text-ink">
                        {skill.name}
                      </span>
                      <Badge variant={style.badgeVariant}>
                        <StatusIcon className={cn("h-3 w-3", style.iconClass)} />
                        {skill.status}
                      </Badge>
                    </div>

                    <dl className="mt-4 space-y-2.5 text-xs">
                      <div>
                        <dt className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">
                          Evidence
                        </dt>
                        <dd className="mt-0.5 text-ink">{skill.evidenceSummary}</dd>
                      </div>
                      <div>
                        <dt className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">
                          Verification
                        </dt>
                        <dd className="mt-0.5 text-ink-secondary">
                          {skill.verificationMethod}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-hairline pt-3 font-mono text-[11px]">
                    <span className="text-ink-muted">{skill.confidenceLabel}</span>
                    <span
                      className={cn(
                        "transition-colors",
                        isSelected
                          ? "text-lime"
                          : "text-ink-secondary group-hover:text-ink"
                      )}
                    >
                      {isSelected && isExpanded ? "Inspecting ↓" : "Inspect proof →"}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Preview Strip When Collapsed (Always shows clear summary + prompt to expand) */}
          {!isExpanded && (
            <div className="mt-5 flex flex-col items-start justify-between gap-4 rounded-lg border border-dashed border-hairline-strong bg-canvas/60 p-4 sm:flex-row sm:items-center">
              <div className="space-y-1">
                <p className="font-mono text-xs text-ink">
                  Selected:{" "}
                  <span className="text-lime">{activeSkill.name}</span> ·{" "}
                  {activeSkill.supportingFiles.length} repository file citation(s) +{" "}
                  Viva {activeSkill.vivaReference.id}
                </p>
                <p className="text-xs text-ink-secondary">
                  Click “Explore the Proof Card” or any skill card above to inspect
                  file ranges, code snippets, viva responses, and Verified Observation
                  vs. Inferred Assessment distinctions.
                </p>
              </div>
              <Button
                type="button"
                variant="limeOutline"
                size="sm"
                onClick={() => setIsExpanded(true)}
              >
                Expand {activeSkill.name} Evidence
              </Button>
            </div>
          )}

          {/* Animated Expandable Evidence Ledger */}
          <div
            id="proof-card-expanded-evidence"
            ref={expansionRef}
            className="overflow-hidden"
            style={{ height: 0, opacity: 0 }}
          >
            <div className="mt-6 border-t border-hairline pt-6">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-lime">
                    INSPECTING SKILL EVIDENCE
                  </span>
                  <h4 className="text-lg font-semibold text-ink">
                    {activeSkill.name} — {activeSkill.status}
                  </h4>
                </div>
                <span className="font-mono text-xs text-ink-muted">
                  Switch tabs above to inspect React, API Design, or Testing
                </span>
              </div>

              <EvidencePanel skill={activeSkill} />
            </div>
          </div>
        </div>

        {/* Bottom Methodological Disclaimer */}
        <div className="border-t border-hairline bg-canvas px-5 py-3.5 sm:px-7">
          <p className="font-mono text-[11px] leading-relaxed text-ink-muted">
            {SAMPLE_PROOF_CARD.methodologyDisclaimer}
          </p>
        </div>
      </div>

      {/* Full Audit Modal Dialog for Deep Inspection */}
      <Dialog open={auditModalOpen} onOpenChange={setAuditModalOpen}>
        <DialogContent className="max-h-[88vh] max-w-4xl overflow-y-auto p-5 sm:p-7">
          <DialogHeader>
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <Badge variant="default">SAMPLE PROOF CARD AUDIT</Badge>
              <span className="font-mono text-xs text-ink-muted">
                {SAMPLE_PROOF_CARD.profileId}
              </span>
            </div>
            <DialogTitle className="text-xl">
              {SAMPLE_PROOF_CARD.candidateName} — {SAMPLE_PROOF_CARD.targetRole}
            </DialogTitle>
            <DialogDescription>
              Full simulated provenance ledger across repository source files, code
              excerpts, viva defense responses, and observation-vs-inference
              classifications.
            </DialogDescription>
          </DialogHeader>

          <Tabs
            value={selectedSkillId}
            onValueChange={setSelectedSkillId}
            className="mt-2"
          >
            <TabsList className="grid w-full grid-cols-3">
              {SAMPLE_PROOF_CARD.skills.map((skill) => (
                <TabsTrigger key={skill.id} value={skill.id}>
                  {skill.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {SAMPLE_PROOF_CARD.skills.map((skill) => (
              <TabsContent key={skill.id} value={skill.id} className="mt-5">
                <EvidencePanel skill={skill} compact />
              </TabsContent>
            ))}
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
}
