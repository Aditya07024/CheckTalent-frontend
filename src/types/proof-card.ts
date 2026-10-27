export type EvidenceStrength =
  | "Strong evidence"
  | "Moderate evidence"
  | "Insufficient evidence";

export type ClaimClassification =
  | "Verified Observation"
  | "Inferred Assessment";

export interface RepositoryFileEvidence {
  path: string;
  lineRange: string;
  role: string;
  observation: string;
  classification: "Verified Observation";
}

export interface CodeReferenceSnippet {
  file: string;
  lineRange: string;
  caption: string;
  snippet: string;
}

export interface VivaQuestionReference {
  id: string;
  referencedCode: string;
  question: string;
  candidateResponseSummary: string;
  rubricOutcome: string;
  evaluatedAt: string;
}

export interface DistinctionItem {
  statement: string;
  classification: ClaimClassification;
  basis: string;
}

export interface ProofSkillEntry {
  id: string;
  name: string;
  status: EvidenceStrength;
  confidenceLabel: string;
  confidenceRationale: string;
  evidenceSummary: string;
  verificationMethod: string;
  rubricId: string;
  evaluatedDate: string;
  supportingFiles: RepositoryFileEvidence[];
  codeReference: CodeReferenceSnippet;
  vivaReference: VivaQuestionReference;
  distinctions: DistinctionItem[];
  recommendedNextAction?: string;
}

export interface SampleProofCardData {
  simulationBanner: string;
  methodologyDisclaimer: string;
  profileId: string;
  candidateName: string;
  targetRole: string;
  evaluatedRepository: string;
  lastEvaluatedDate: string;
  evidenceSourcesCount: {
    repositories: number;
    indexedFiles: number;
    vivaResponses: number;
  };
  skills: ProofSkillEntry[];
}
