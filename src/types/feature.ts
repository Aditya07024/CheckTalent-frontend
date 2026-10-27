export type FeatureCategoryId =
  | "repository-intelligence"
  | "ai-technical-viva"
  | "skill-proof-cards"
  | "recruiter-intelligence"
  | "candidate-growth"
  | "fairness-trust";

export type FeatureAvailability =
  | "core-architecture"
  | "planned-phase-2"
  | "planned-phase-3"
  | "planned-phase-4";

export interface CodeTraceLine {
  lineNumber: number;
  code: string;
  highlight?: "lime" | "violet" | "none";
  annotation?: string;
}

export interface CodeTracePreview {
  kind: "code-trace";
  panelTitle: string;
  filePath: string;
  language: string;
  lines: CodeTraceLine[];
  extractedSignals: Array<{
    label: string;
    value: string;
    tone: "verified" | "neutral" | "caution";
  }>;
}

export interface VivaExchangePreview {
  kind: "viva-exchange";
  panelTitle: string;
  sourceReference: string;
  promptQuestion: string;
  candidateExcerpt: string;
  followUpOrFeedback: string;
  rubricChecks: Array<{
    criterion: string;
    status: "Demonstrated" | "Partial" | "Needs Probe";
  }>;
}

export interface LedgerCardPreview {
  kind: "ledger-card";
  panelTitle: string;
  artifactId: string;
  entries: Array<{
    label: string;
    detail: string;
    classification: "Verified Observation" | "Inferred Assessment" | "System Metadata";
    badge: string;
  }>;
}

export interface ComparisonMatrixPreview {
  kind: "comparison-matrix";
  panelTitle: string;
  columns: [string, string, string];
  rows: Array<{
    dimension: string;
    colA: string;
    colB: string;
    note: string;
    highlight?: boolean;
  }>;
}

export interface RoadmapActionPreview {
  kind: "roadmap-action";
  panelTitle: string;
  targetRole: string;
  currentGap: string;
  steps: Array<{
    stepCode: string;
    action: string;
    artifactProduced: string;
    status: "Recommended" | "Optional" | "Target Outcome";
  }>;
}

export interface GovernanceControlPreview {
  kind: "governance-control";
  panelTitle: string;
  policyCode: string;
  rules: Array<{
    rule: string;
    enforcement: string;
    state: "Enforced" | "Excluded Signal" | "Human Gate";
  }>;
  auditNote: string;
}

export type FeaturePreviewSpec =
  | CodeTracePreview
  | VivaExchangePreview
  | LedgerCardPreview
  | ComparisonMatrixPreview
  | RoadmapActionPreview
  | GovernanceControlPreview;

export interface PlatformFeature {
  id: string;
  number: number;
  code: string;
  categoryId: FeatureCategoryId;
  name: string;
  shortSummary: string;
  description: string;
  valueProposition: string;
  availability: FeatureAvailability;
  guardrailNote?: string;
  preview: FeaturePreviewSpec;
}

export interface FeatureCategory {
  id: FeatureCategoryId;
  code: string;
  shortLabel: string;
  title: string;
  summary: string;
  audienceTag: string;
  featureRangeLabel: string;
}
