import type { RoadmapPhase } from "@/types/platform";

export const ROADMAP_SECTION_CONTENT = {
  eyebrow: "PRODUCT ROADMAP · PLANNED EVOLUTION",
  heading: "Deliberate architecture from core verification to hiring workflows.",
  subheading:
    "TalentLens is structured in four progressive phases. Phase 1 defines the foundational verification architecture; Phases 2 through 4 represent planned capabilities that are not yet live.",
  statusLegendNote:
    "Transparency notice: Planned phases describe architectural direction and upcoming milestones—not currently deployed production features.",
} as const;

export const ROADMAP_PHASES: ReadonlyArray<RoadmapPhase> = [
  {
    id: "phase-1",
    phaseLabel: "PHASE 01",
    title: "Core Skill Verification",
    status: "Core Architecture (Phase 1)",
    isCurrentFocus: true,
    summary:
      "Establish end-to-end evidence extraction from candidate artifacts, repository-grounded technical questioning, and inspectable skill profiles.",
    deliverables: [
      "Resume analysis & claim extraction",
      "Consent-scoped GitHub integration",
      "Static repository & code structure analysis",
      "Repository-grounded AI technical viva",
      "Inspectable Skill Proof Cards",
    ],
  },
  {
    id: "phase-2",
    phaseLabel: "PHASE 02",
    title: "Recruiter Intelligence",
    status: "Planned — Phase 2",
    isCurrentFocus: false,
    summary:
      "Connect verified candidate evidence to structured role criteria so hiring teams can compare applicants transparently.",
    deliverables: [
      "Job description skill & rubric extraction",
      "Side-by-side candidate comparison",
      "Explainable evidence-to-role ranking",
      "Collaborative shortlisting tools",
    ],
  },
  {
    id: "phase-3",
    phaseLabel: "PHASE 03",
    title: "Advanced Verification",
    status: "Planned — Phase 3",
    isCurrentFocus: false,
    summary:
      "Broaden verification pathways for candidates without public codebases and deepen similarity and fairness auditing.",
    deliverables: [
      "Improved tutorial similarity detection with uncertainty bounds",
      "Controlled fairness evaluation suites",
      "Alternative evidence pathways for non-public work",
      "Controlled-access evidence sharing & verification links",
    ],
  },
  {
    id: "phase-4",
    phaseLabel: "PHASE 04",
    title: "Ecosystem Expansion",
    status: "Planned — Phase 4",
    isCurrentFocus: false,
    summary:
      "Integrate structured skill evidence into broader engineering education, placement cohorts, and external hiring systems.",
    deliverables: [
      "Targeted coding assessments",
      "College placement cohort dashboards",
      "ATS & recruiter platform API integrations",
      "Advanced cohort & rubric analytics",
    ],
  },
];
