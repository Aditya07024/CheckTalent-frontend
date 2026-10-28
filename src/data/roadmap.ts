import type { RoadmapPhase } from "@/types/platform";

export const ROADMAP_SECTION_CONTENT = {
  eyebrow: "PRODUCT ROADMAP · PLANNED EVOLUTION",
  heading: "Deliberate architecture from verification to hiring.",
  subheading:
    "CheckTalent is structured in progressive phases. Phase 1 establishes the foundational verification engine; Phases 2–4 represent planned capabilities.",
  statusLegendNote:
    "Transparency notice: Planned phases describe architectural direction and upcoming milestones.",
} as const;

export const ROADMAP_PHASES: ReadonlyArray<RoadmapPhase> = [
  {
    id: "phase-1",
    phaseLabel: "PHASE 01",
    title: "Core Skill Verification",
    status: "Core Architecture (Phase 1)",
    isCurrentFocus: true,
    summary:
      "End-to-end evidence extraction from repository code, technical viva questioning, and inspectable Skill Proof Cards.",
    deliverables: [
      "Consent-scoped GitHub intake & AST mapping",
      "Repository-grounded AI technical viva",
      "Inspectable Skill Proof Cards with provenance",
    ],
  },
  {
    id: "phase-2",
    phaseLabel: "PHASE 02",
    title: "Recruiter Intelligence",
    status: "Planned — Phase 2",
    isCurrentFocus: false,
    summary:
      "Connecting verified candidate evidence to role criteria for objective, side-by-side technical evaluation.",
    deliverables: [
      "Job description skill & rubric extraction",
      "Side-by-side candidate comparison matrix",
      "Tailored engineering interview kits",
    ],
  },
  {
    id: "phase-3",
    phaseLabel: "PHASE 03",
    title: "Advanced Verification",
    status: "Planned — Phase 3",
    isCurrentFocus: false,
    summary:
      "Alternative evidence pathways for proprietary code and deeper template similarity auditing.",
    deliverables: [
      "Starter template similarity detection",
      "Controlled fairness evaluation suites",
      "Alternative assessment paths for NDA work",
    ],
  },
  {
    id: "phase-4",
    phaseLabel: "PHASE 04",
    title: "Ecosystem Expansion",
    status: "Planned — Phase 4",
    isCurrentFocus: false,
    summary:
      "Integrating structured skill proof into university placement cohorts and ATS partner ecosystems.",
    deliverables: [
      "College placement cohort dashboards",
      "ATS & HRIS webhook integrations",
      "Longitudinal developer progress tracking",
    ],
  },
];
