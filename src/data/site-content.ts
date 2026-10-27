import type {
  AudienceBenefit,
  HowItWorksStep,
  PipelineStageItem,
  ProblemCardItem,
  TrustPillar,
  UseCaseItem,
} from "@/types/platform";
import { SECTION_IDS } from "@/lib/constants";

export const HERO_CONTENT = {
  eyebrow: "DEVELOPER INTELLIGENCE · AI-POWERED SKILL VERIFICATION",
  headlineLead: "Your code tells a ",
  headlineAccent: "better story",
  headlineTail: " than your resume.",
  supportingParagraph:
    "Proof of Skill analyzes real repositories, tests technical understanding, and turns project evidence into skill profiles recruiters can actually evaluate.",
  primaryCta: {
    label: "Explore the Platform",
    href: `#${SECTION_IDS.features}`,
  },
  secondaryCta: {
    label: "See How It Works",
    href: `#${SECTION_IDS.howItWorks}`,
  },
  supportingLine:
    "Built for candidates who can do the work—and recruiters who want to see the proof.",
} as const;

export const HERO_REPO_PREVIEW_DATA = {
  illustrativeLabel: "ILLUSTRATIVE UI EXAMPLE · NON-LIVE PREVIEW",
  repositoryName: "candidate-project",
  branch: "main",
  analysisStatus: "Inspection Complete · 38 source modules indexed",
  languages: [
    { name: "TypeScript", share: "68%", colorClass: "bg-lime" },
    { name: "React", share: "21%", colorClass: "bg-[#0284C7]" },
    { name: "Node.js", share: "11%", colorClass: "bg-violet" },
  ],
  evidenceFindings: [
    {
      id: "ev-arch",
      label: "Component architecture identified",
      reference: "src/components/workspace/* · 11 modular boundaries",
      tone: "verified" as const,
    },
    {
      id: "ev-api",
      label: "API integration detected",
      reference: "src/services/apiClient.ts · Typed fetch + retry policy",
      tone: "verified" as const,
    },
    {
      id: "ev-err",
      label: "Error handling reviewed",
      reference: "src/server/errorBoundary.ts · Structured HTTP envelopes",
      tone: "verified" as const,
    },
    {
      id: "ev-test",
      label: "Tests identified",
      reference: "src/__tests__/ · 2 unit specs (integration coverage sparse)",
      tone: "limited" as const,
    },
  ],
  skillAssessments: [
    {
      skill: "React",
      rating: "Strong evidence" as const,
      barPercent: 86,
      tone: "strong" as const,
    },
    {
      skill: "API design",
      rating: "Moderate evidence" as const,
      barPercent: 62,
      tone: "moderate" as const,
    },
    {
      skill: "Testing",
      rating: "Limited evidence" as const,
      barPercent: 28,
      tone: "limited" as const,
    },
  ],
  vivaCard: {
    badge: "AI TECHNICAL VIVA · GENERATED FROM REPO",
    fileAnchor: "src/services/apiClient.ts:L44–L63",
    question:
      "In `fetchWithRetry`, why do you abort retry attempts on HTTP 4xx responses while keeping exponential backoff for 503 statuses?",
    rubricFocus: "Idempotency · HTTP semantics · Fault isolation",
  },
  confidenceIndicator: {
    label: "Evidence Consistency",
    status: "High across code + viva",
    note: "Qualitative alignment indicator (illustrative mockup)",
  },
} as const;

export const PROBLEM_SECTION_CONTENT = {
  eyebrow: "THE SIGNAL GAP IN TECHNICAL HIRING",
  heading: "Resumes tell you what candidates claim. Not what they can prove.",
  subheading:
    "Conventional screening compresses months of engineering decisions into self-reported bullet points—rewarding surface polish while obscuring real technical capability.",
  concludingStatement:
    "Technical hiring needs evidence, not just better-looking resumes.",
  problems: [
    {
      id: "problem-keywords",
      code: "PROBLEM // 01",
      label: "Problem A",
      title: "Keyword-driven screening",
      description:
        "Candidates can list technologies without demonstrating practical understanding. Automated filters reward dense buzzword lists while overlooking developers who build clean, maintainable systems without resume-optimized phrasing.",
      failureSignal: "SIGNAL NOISE: Unverified keyword density ≠ working fluency",
      contrastArtifacts: {
        claimed: 'Resume: "Expert in React, Distributed Systems, Microservices, GraphQL"',
        reality: "Unanswered: Can the candidate reason about state lifecycles or failure modes?",
      },
      icon: "search-code",
    },
    {
      id: "problem-tutorials",
      code: "PROBLEM // 02",
      label: "Problem B",
      title: "Tutorial projects look alike",
      description:
        "Recruiters struggle to distinguish superficial project copies from projects candidates genuinely understand. Two portfolio links with identical README screenshots can mask vastly different levels of architectural comprehension.",
      failureSignal: "AMBIGUITY: Surface UI parity hides authorship & comprehension depth",
      contrastArtifacts: {
        claimed: 'Portfolio: "Full-Stack E-Commerce Platform with Auth & Payments"',
        reality: "Uninspected: Template scaffolding vs. deliberate custom trade-offs",
      },
      icon: "copy-slash",
    },
    {
      id: "problem-interviews",
      code: "PROBLEM // 03",
      label: "Problem C",
      title: "Interviews lack consistent evidence",
      description:
        "Generic questions and inconsistent assessments make it difficult to compare candidates fairly. Disconnected trivia prompts rarely connect back to the actual software a candidate has designed or debugged.",
      failureSignal: "DRIFT: Unstructured prompts produce non-comparable hiring notes",
      contrastArtifacts: {
        claimed: 'Interview Note: "Seemed confident, struggled on abstract puzzle"',
        reality: "Missing: Rubric-anchored evidence tied to real implementation artifacts",
      },
      icon: "scale",
    },
  ] satisfies ReadonlyArray<ProblemCardItem>,
} as const;

export const SOLUTION_SECTION_CONTENT = {
  eyebrow: "THE PROOF OF SKILL ARCHITECTURE",
  heading: "Turn technical claims into inspectable evidence.",
  subheading:
    "Proof of Skill replaces opaque resume scoring with an auditable verification pipeline—connecting source artifacts, adaptive technical questioning, and explicit rubrics into a structured Skill Proof Card.",
  stages: [
    {
      id: "stage-inputs",
      stepNumber: "01",
      title: "Resume & Projects",
      shortDescription:
        "Ingest claimed skills alongside authorized repositories or structured project artifacts.",
      inputArtifact: "Resume claims + GitHub link / project submission",
      outputArtifact: "Normalized claim-to-project inventory",
      verificationSignal: "Consent-scoped intake",
      icon: "file-text",
    },
    {
      id: "stage-repo-intel",
      stepNumber: "02",
      title: "Repository Intelligence",
      shortDescription:
        "Inspect module boundaries, AST patterns, error handling, tests, and structural evolution.",
      inputArtifact: "Source tree, dependencies & commit history",
      outputArtifact: "File-anchored code observations",
      verificationSignal: "Static code mapping",
      icon: "git-branch",
    },
    {
      id: "stage-viva",
      stepNumber: "03",
      title: "Technical Viva",
      shortDescription:
        "Challenge understanding with adaptive questions anchored directly to the candidate’s code.",
      inputArtifact: "Selected implementation anchors & role criteria",
      outputArtifact: "Evaluated code-defense responses",
      verificationSignal: "AI-assisted comprehension probe",
      isAiAssisted: true,
      icon: "message-square-code",
    },
    {
      id: "stage-validation",
      stepNumber: "04",
      title: "Evidence Validation",
      shortDescription:
        "Cross-check static code observations with viva explanations against explicit rubrics.",
      inputArtifact: "Static findings + viva rubric outcomes",
      outputArtifact: "Verified observations & gap flags",
      verificationSignal: "Provenance & consistency check",
      icon: "shield-check",
    },
    {
      id: "stage-proof-card",
      stepNumber: "05",
      title: "Skill Proof Card",
      shortDescription:
        "Assemble an inspectable profile separating direct observations from inferred assessments.",
      inputArtifact: "Validated evidence ledger & provenance",
      outputArtifact: "Shareable Skill Proof Card",
      verificationSignal: "Inspectable evidence record",
      icon: "award",
    },
    {
      id: "stage-recruiter",
      stepNumber: "06",
      title: "Recruiter Evaluation",
      shortDescription:
        "Support human hiring teams with explainable role alignment and interview focus areas.",
      inputArtifact: "Skill Proof Card + job rubric criteria",
      outputArtifact: "Decision-support review brief",
      verificationSignal: "Human-in-the-loop review",
      icon: "user-check",
    },
  ] satisfies ReadonlyArray<PipelineStageItem>,
} as const;

export const HOW_IT_WORKS_CONTENT = {
  eyebrow: "WORKFLOW · STEP-BY-STEP VERIFICATION",
  heading: "From repository to evidence-backed skills.",
  subheading:
    "A structured four-step workflow designed to respect candidate context while giving hiring teams traceable technical signal.",
  methodologyFootnote:
    "Operational note: Repository indexing and analysis take time proportional to codebase size and language adapters, and every finding depends strictly on the depth and quality of evidence available.",
  steps: [
    {
      stepNumber: "STEP 01",
      title: "Connect Your Work",
      description:
        "The candidate uploads a resume, connects GitHub with explicit repository permissions, or chooses an alternative evidence pathway when code cannot be shared publicly.",
      artifactTag: "INPUT // CONSENT-SCOPED ARTIFACTS",
      systemNote: "Supports public repos, authorized selections, or guided non-GitHub assessments.",
      details: [
        "Select specific repositories rather than exposing unrelated personal work",
        "Extract claimed technologies from resume for targeted verification",
        "Use guided project & assessment path if prior code is proprietary",
      ],
      icon: "upload",
    },
    {
      stepNumber: "STEP 02",
      title: "Analyze the Evidence",
      description:
        "The platform examines available source code, project structure, development history, dependencies, and testing artifacts—linking observations to concrete files and line ranges.",
      artifactTag: "ANALYSIS // ASYNCHRONOUS INDEXING",
      systemNote: "Analysis duration varies with repository scope; commit logs inform context, not authorship proof.",
      details: [
        "Map components, API handlers, validation schemas, and error boundaries",
        "Identify structural overlap with common starter templates transparently",
        "Flag areas where code artifacts are absent so gaps remain explicit",
      ],
      icon: "cpu",
    },
    {
      stepNumber: "STEP 03",
      title: "Demonstrate Understanding",
      description:
        "The candidate completes repository-specific technical questions or targeted assessments that probe design choices, trade-offs, and failure modes in their own work.",
      artifactTag: "VIVA // CODE DEFENSE & RUBRICS",
      systemNote: "Adaptive follow-up prompts adjust to answer depth and target role skills.",
      details: [
        "Questions reference real functions and architectural boundaries in the project",
        "Candidates articulate why specific patterns or dependencies were chosen",
        "Responses are evaluated against explicit, inspectable technical criteria",
      ],
      icon: "message-square-code",
    },
    {
      stepNumber: "STEP 04",
      title: "Generate the Proof Card",
      description:
        "The system connects findings to supporting evidence, evaluates skills against a transparent rubric, and produces an inspectable skill profile ready for candidate review and controlled sharing.",
      artifactTag: "OUTPUT // INSPECTABLE SKILL PROOF CARD",
      systemNote: "Findings reflect available evidence only and distinguish direct observations from inferences.",
      details: [
        "Displays Strong, Moderate, or Insufficient evidence per evaluated skill",
        "Preserves provenance: source files, viva references, rubric ID, and date",
        "Highlights concrete next steps to strengthen thin or missing evidence",
      ],
      icon: "check-circle",
    },
  ] satisfies ReadonlyArray<HowItWorksStep>,
} as const;

export const CANDIDATES_SECTION_CONTENT = {
  eyebrow: "FOR CANDIDATES · MERIT OVER BUZZWORDS",
  heading: "Let your work speak for itself.",
  subheading:
    "Whether you are self-taught, graduating from a lesser-known college, or building serious side projects, Proof of Skill turns genuine engineering effort into structured proof recruiters can inspect.",
  ctaLabel: "Build Your Skill Profile",
  ctaHref: `#${SECTION_IDS.earlyAccess}`,
  benefits: [
    {
      id: "cand-1",
      title: "Demonstrate skills beyond resume keywords",
      detail:
        "Show how you structure real components, APIs, and data flows instead of hoping automated keyword filters parse your PDF.",
    },
    {
      id: "cand-2",
      title: "Explain real projects rather than answer only generic questions",
      detail:
        "Defend architectural trade-offs and implementation decisions in software you actually built and understand.",
    },
    {
      id: "cand-3",
      title: "Identify technical knowledge gaps",
      detail:
        "See precisely which role expectations—such as integration testing, validation, or concurrency safety—lack supporting evidence.",
    },
    {
      id: "cand-4",
      title: "Receive specific feedback",
      detail:
        "Get actionable technical feedback on misconceptions and concrete ways to strengthen both code quality and conceptual clarity.",
    },
    {
      id: "cand-5",
      title: "Build an evidence-backed developer profile",
      detail:
        "Compile verified observations, code defenses, and project competencies into a structured, credible engineering portfolio.",
    },
    {
      id: "cand-6",
      title: "Share selected results with recruiters",
      detail:
        "Control what you share via permissioned verification links without exposing private repositories indiscriminately.",
    },
    {
      id: "cand-7",
      title: "Demonstrate skills without relying exclusively on public repositories",
      detail:
        "Use guided project evaluations and targeted technical assessments when NDA work or academic constraints limit public GitHub history.",
    },
  ] satisfies ReadonlyArray<AudienceBenefit>,
} as const;

export const RECRUITERS_SECTION_CONTENT = {
  eyebrow: "FOR RECRUITERS & HIRING MANAGERS · SIGNAL CLARITY",
  heading: "Evaluate evidence. Make better-informed decisions.",
  subheading:
    "Move past surface-level resume claims and uncalibrated screening calls. Inspect verifiable code evidence, comprehension outcomes, and explicit gaps before committing engineering interview hours.",
  ctaLabel: "Explore Recruiter Features",
  ctaHref: `#${SECTION_IDS.features}`,
  benefits: [
    {
      id: "rec-1",
      title: "Evaluate technical evidence at scale",
      detail:
        "Review structured repository findings and code-defense summaries without manually cloning and auditing dozens of repositories from scratch.",
    },
    {
      id: "rec-2",
      title: "Understand the reasoning behind skill assessments",
      detail:
        "Inspect the exact files, line references, viva exchanges, and rubric criteria behind every skill status—never an unexplained score.",
    },
    {
      id: "rec-3",
      title: "Generate repository-specific interview questions",
      detail:
        "Equip hiring managers with tailored follow-up prompts grounded in the candidate’s actual codebase and architectural decisions.",
    },
    {
      id: "rec-4",
      title: "Compare candidates against consistent rubrics",
      detail:
        "Evaluate applicants for the same role using uniform technical criteria rather than ad-hoc reviewer impressions.",
    },
    {
      id: "rec-5",
      title: "Identify missing evidence",
      detail:
        "Spot unverified requirements early—knowing immediately where to focus live technical interviews or supplemental challenges.",
    },
    {
      id: "rec-6",
      title: "Reduce dependence on resume keywords",
      detail:
        "Surface capable builders whose resumes understate their engineering depth while filtering out unsupported buzzword claims.",
    },
    {
      id: "rec-7",
      title: "Review tutorial-like project similarities",
      detail:
        "See transparent structural similarity comparisons against known starter templates—presented with supporting context and uncertainty rather than automatic accusations.",
    },
    {
      id: "rec-8",
      title: "Maintain human oversight of hiring decisions",
      detail:
        "Use structured assessments as transparent decision support while keeping shortlisting and hiring judgment firmly in human hands.",
    },
  ] satisfies ReadonlyArray<AudienceBenefit>,
} as const;

export const TRUST_SECTION_CONTENT = {
  eyebrow: "FAIRNESS, PRIVACY & ACCOUNTABILITY",
  heading: "Evidence should be inspectable. Decisions should be accountable.",
  subheading:
    "Automated technical assessment carries real responsibility. Proof of Skill is architected around inspectable provenance, strict consent boundaries, bias-aware design, and human decision ownership.",
  methodologicalDisclaimer:
    "Methodological note: Proof of Skill does not claim guaranteed accuracy, zero bias, or automated legal compliance. Confidence indicators represent qualitative evidence consistency and are meaningful only when supported by an appropriate evaluation methodology and human review.",
  pillars: [
    {
      id: "trust-explainability",
      code: "PILLAR // 01",
      title: "Explainability",
      summary: "Show the evidence and reasoning behind assessments.",
      commitments: [
        "Every skill assessment links back to specific files, code ranges, or viva responses.",
        "Explicitly separates Verified Observations from rubric-based Inferred Assessments.",
        "Candidates can review findings and submit appeals or supplemental context.",
      ],
      boundaryNote: "No opaque black-box readiness percentages.",
      icon: "eye",
    },
    {
      id: "trust-privacy",
      code: "PILLAR // 02",
      title: "Privacy",
      summary:
        "Require consent for repository analysis and protect sensitive candidate information.",
      commitments: [
        "Opt-in candidate authorization required before indexing any repository.",
        "Granular sharing controls over which Proof Card artifacts recruiters can view.",
        "Private source code is never exposed to third parties without explicit permission.",
      ],
      boundaryNote: "Candidate-controlled visibility and revocable verification links.",
      icon: "lock",
    },
    {
      id: "trust-fairness",
      code: "PILLAR // 03",
      title: "Fairness",
      summary:
        "Test for unintended disparities and exclude prohibited features from ranking models.",
      commitments: [
        "Excludes college name, gender, age, and location from candidate ranking logic.",
        "Designed to mitigate indirect proxy reliance where technically feasible.",
        "Uses controlled evaluation scenarios to audit scoring consistency across groups.",
      ],
      boundaryNote: "Ongoing empirical evaluation rather than unsubstantiated 'zero-bias' claims.",
      icon: "sliders",
    },
    {
      id: "trust-oversight",
      code: "PILLAR // 04",
      title: "Human Oversight",
      summary: "Recruiters remain responsible for hiring decisions.",
      commitments: [
        "Assessments operate strictly as structured decision support, never auto-rejection.",
        "Template similarity reports include uncertainty and require human interpretation.",
        "Missing evidence is labeled 'Insufficient evidence' rather than penalized as failure.",
      ],
      boundaryNote: "Final hiring judgment always rests with accountable human reviewers.",
      icon: "user-cog",
    },
  ] satisfies ReadonlyArray<TrustPillar>,
} as const;

export const USE_CASES_CONTENT = {
  eyebrow: "APPLICATIONS · WHERE EVIDENCE MATTERS MOST",
  heading: "Designed for real technical evaluation workflows.",
  subheading:
    "From early-stage engineering teams to campus placement cohorts, Proof of Skill adapts to wherever practical capability needs to be demonstrated and inspected.",
  items: [
    {
      id: "uc-startups",
      code: "USE CASE 01",
      audience: "Early-Stage Engineering Teams",
      title: "Startups hiring their first engineers",
      description:
        "Founding teams cannot afford mis-hires masked by polished resumes. Inspect how applicants actually structure code, handle edge cases, and reason about trade-offs before final-round pairing.",
      primaryMechanism: "Repository Intelligence + Code Defense",
      icon: "rocket",
    },
    {
      id: "uc-freshers",
      code: "USE CASE 02",
      audience: "High-Volume Graduate Hiring",
      title: "Companies screening large fresher cohorts",
      description:
        "Look beyond institution tier and identical coursework bullet points. Differentiate entry-level applicants through verifiable project substance and structured technical comprehension.",
      primaryMechanism: "Bias-Aware Matching + Standardized Rubrics",
      icon: "users",
    },
    {
      id: "uc-recruiters",
      code: "USE CASE 03",
      audience: "Talent Acquisition & Sourcers",
      title: "Technical recruiters assessing project claims",
      description:
        "Bridge the gap between recruiter screening and engineering review with clear evidence summaries, template-similarity context, and tailored interview questions.",
      primaryMechanism: "Skill Proof Cards + Assessment Reports",
      icon: "briefcase",
    },
    {
      id: "uc-colleges",
      code: "USE CASE 04",
      audience: "University Placement Offices",
      title: "College placement cells helping students demonstrate practical skills",
      description:
        "Help graduating students convert capstone repositories and lab work into credible, inspectable skill profiles that stand on engineering merit with visiting employers.",
      primaryMechanism: "Portfolio Proof + Skill Gap Identification",
      icon: "graduation-cap",
    },
    {
      id: "uc-candidates",
      code: "USE CASE 05",
      audience: "Software Engineering Candidates",
      title: "Candidates preparing for technical interviews",
      description:
        "Practice defending your own repositories against adaptive technical questions, uncover blind spots in your codebase, and build stronger evidence before interviewing.",
      primaryMechanism: "AI Technical Viva + Improvement Roadmap",
      icon: "terminal",
    },
    {
      id: "uc-training",
      code: "USE CASE 06",
      audience: "Bootcamps & Engineering Academies",
      title: "Training programs evaluating project-based learning",
      description:
        "Assess whether learners genuinely understand the capstone applications they build through structured code reviews, viva rubrics, and longitudinal assessment history.",
      primaryMechanism: "Rubric Evaluation + Assessment History",
      icon: "book-open",
    },
  ] satisfies ReadonlyArray<UseCaseItem>,
} as const;

export const CTA_SECTION_CONTENT = {
  eyebrow: "EARLY ACCESS · JOIN THE PRE-RELEASE PROGRAM",
  headline: "Stop competing on claims. Start proving capability.",
  supportingText:
    "Build a clearer picture of what you can do—and give recruiters the evidence to see it.",
  primaryCtaLabel: "Get Early Access",
  secondaryCtaLabel: "Explore the Platform",
  secondaryCtaHref: `#${SECTION_IDS.features}`,
  formHeading: "Request Early Access",
  formSubheading:
    "Tell us your role so we can share relevant platform updates as verification workflows roll out.",
  demoTransparencyNote:
    "Frontend preview notice: Submissions validate locally using our client adapter interface and display a simulated confirmation state without transmitting personal data to an external database.",
} as const;
