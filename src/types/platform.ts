export type IconKey =
  | "file-text"
  | "git-branch"
  | "message-square-code"
  | "shield-check"
  | "award"
  | "user-check"
  | "search-code"
  | "copy-slash"
  | "scale"
  | "rocket"
  | "users"
  | "briefcase"
  | "graduation-cap"
  | "terminal"
  | "book-open"
  | "eye"
  | "lock"
  | "sliders"
  | "user-cog"
  | "upload"
  | "cpu"
  | "check-circle";

export interface NavItem {
  label: string;
  href: string;
}

export interface FooterLinkGroup {
  heading: string;
  links: Array<{
    label: string;
    href: string;
    isPlaceholder?: boolean;
    placeholderNotice?: string;
  }>;
}

export interface ProblemCardItem {
  id: string;
  code: string;
  label: string;
  title: string;
  description: string;
  failureSignal: string;
  contrastArtifacts: {
    claimed: string;
    reality: string;
  };
  icon: IconKey;
}

export interface PipelineStageItem {
  id: string;
  stepNumber: string;
  title: string;
  shortDescription: string;
  inputArtifact: string;
  outputArtifact: string;
  verificationSignal: string;
  isAiAssisted?: boolean;
  icon: IconKey;
}

export interface HowItWorksStep {
  stepNumber: string;
  title: string;
  description: string;
  artifactTag: string;
  systemNote: string;
  details: string[];
  icon: IconKey;
}

export interface AudienceBenefit {
  id: string;
  title: string;
  detail: string;
}

export interface TrustPillar {
  id: string;
  code: string;
  title: string;
  summary: string;
  commitments: string[];
  boundaryNote: string;
  icon: IconKey;
}

export interface UseCaseItem {
  id: string;
  code: string;
  audience: string;
  title: string;
  description: string;
  primaryMechanism: string;
  icon: IconKey;
}

export type RoadmapPhaseStatus =
  | "Core Architecture (Phase 1)"
  | "Planned — Phase 2"
  | "Planned — Phase 3"
  | "Planned — Phase 4";

export interface RoadmapPhase {
  id: string;
  phaseLabel: string;
  title: string;
  status: RoadmapPhaseStatus;
  isCurrentFocus: boolean;
  summary: string;
  deliverables: string[];
}

export interface FAQItem {
  id: string;
  index: string;
  question: string;
  answer: string;
  category: "Platform" | "Verification" | "Privacy & Fairness" | "Adoption";
}

export type EarlyAccessRole = "Candidate" | "Recruiter" | "Placement Officer";

export interface EarlyAccessFormValues {
  name: string;
  email: string;
  role: EarlyAccessRole | "";
  message: string;
}
