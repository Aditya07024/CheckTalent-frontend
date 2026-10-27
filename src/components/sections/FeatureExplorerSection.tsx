"use client";

import React, { useState } from "react";
import {
  Code2,
  FileCheck2,
  GitBranch,
  Layers,
  MessageSquareCode,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserCheck,
} from "lucide-react";
import { SECTION_IDS } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CapabilityDomain {
  id: string;
  code: string;
  title: string;
  summary: string;
  icon: React.ElementType;
  highlights: string[];
  audience: string;
}

const CAPABILITY_DOMAINS: CapabilityDomain[] = [
  {
    id: "repo-intel",
    code: "CAT // A",
    title: "Repository Intelligence",
    summary:
      "Static source inspection, AST architecture mapping, and file-anchored evidence extraction across submitted codebases.",
    icon: GitBranch,
    highlights: [
      "Consent-Scoped GitHub Intake",
      "AST Structural Mapping",
      "Template & Boilerplate Detection",
    ],
    audience: "Static Code Analysis",
  },
  {
    id: "viva",
    code: "CAT // B",
    title: "AI Technical Viva",
    summary:
      "Interactive, repository-grounded technical questioning and code defense evaluated against explicit engineering rubrics.",
    icon: MessageSquareCode,
    highlights: [
      "Code-Anchored Probing",
      "Adaptive Follow-Up Questions",
      "Rubric-Evaluated Reasoning",
    ],
    audience: "Comprehension & Defense",
  },
  {
    id: "proof-cards",
    code: "CAT // C",
    title: "Skill Proof Cards",
    summary:
      "Structured, provenance-linked skill profiles separating direct code observations from rubric-based assessments.",
    icon: FileCheck2,
    highlights: [
      "Observation vs Inference Separation",
      "Qualitative Confidence Ratings",
      "Audit-Traceable Provenance",
    ],
    audience: "Verification Records",
  },
  {
    id: "recruiter-intel",
    code: "CAT // D",
    title: "Recruiter Intelligence",
    summary:
      "Role-criterion extraction, explainable candidate matching, and structured hiring decision support.",
    icon: UserCheck,
    highlights: [
      "Explainable Role Alignment",
      "Side-by-Side Candidate Comparison",
      "Code-Grounded Interview Kits",
    ],
    audience: "Hiring Team Workflows",
  },
  {
    id: "candidate-growth",
    code: "CAT // E",
    title: "Candidate Growth",
    summary:
      "Actionable gap diagnosis, personalized learning paths, and concrete recommendations to strengthen proof.",
    icon: TrendingUp,
    highlights: [
      "Specific Skill Gap Diagnosis",
      "Targeted Practice Challenges",
      "Longitudinal Skill Evolution",
    ],
    audience: "Developer Progression",
  },
  {
    id: "fairness-trust",
    code: "CAT // F",
    title: "Fairness & Trust",
    summary:
      "Explainability guarantees, bias-aware ranking exclusions, candidate consent controls, and human oversight.",
    icon: ShieldCheck,
    highlights: [
      "Demographic Signal Exclusion",
      "Zero Automated Rejections",
      "Candidate Revocation & Privacy",
    ],
    audience: "Governance & Accountability",
  },
];

export function FeatureExplorerSection() {
  const [selectedDomainId, setSelectedDomainId] = useState<string>("repo-intel");

  return (
    <section
      id={SECTION_IDS.features}
      className="border-b border-orange-200/70 bg-gradient-to-b from-orange-50/40 via-transparent to-amber-50/45 py-16 lg:py-24"
    >
      <div className="container">
        {/* Section Heading */}
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div className="max-w-2xl space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-lime">
              PLATFORM CAPABILITIES · 6 CORE DOMAINS
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-[40px] leading-[1.12]">
              Every layer required to verify technical skill.
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-ink-secondary">
              A complete verification architecture connecting code inspection, comprehension defense, and explainable hiring support.
            </p>
          </div>

          <Badge variant="default" className="self-start lg:self-end">
            <Layers className="h-3.5 w-3.5" />
            6 DOMAINS · CORE ARCHITECTURE
          </Badge>
        </div>

        {/* 6 Clean Capability Cards */}
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {CAPABILITY_DOMAINS.map((domain) => {
            const Icon = domain.icon;
            const isSelected = domain.id === selectedDomainId;

            return (
              <div
                key={domain.id}
                onClick={() => setSelectedDomainId(domain.id)}
                className={cn(
                  "group flex flex-col justify-between rounded-2xl border-2 p-5 transition-all duration-200 cursor-pointer",
                  isSelected
                    ? "border-orange-500 bg-gradient-to-br from-yellow-50/80 via-white to-orange-50/60 shadow-[0_10px_28px_rgba(234,88,12,0.12)] -translate-y-1"
                    : "border-orange-200/80 bg-white hover:border-orange-400 hover:bg-amber-50/30 hover:-translate-y-0.5"
                )}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-lime">
                      {domain.code}
                    </span>
                    <span className="rounded-full border border-orange-200 bg-orange-50/60 px-2.5 py-0.5 font-mono text-[10px] text-orange-900">
                      {domain.audience}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-orange-300 bg-gradient-to-br from-amber-100 to-orange-100 text-orange-800">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-bold text-ink">
                      {domain.title}
                    </h3>
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-ink-secondary">
                    {domain.summary}
                  </p>
                </div>

                <div className="mt-5 border-t border-orange-200/60 pt-3">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink-muted">
                    Core Capabilities
                  </span>
                  <ul className="mt-2 space-y-1.5">
                    {domain.highlights.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 font-mono text-[11px] text-ink"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
