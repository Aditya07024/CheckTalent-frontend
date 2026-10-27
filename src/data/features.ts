import type { FeatureCategory, PlatformFeature } from "@/types/feature";

export const FEATURE_EXPLORER_HEADER = {
  eyebrow: "PLATFORM CAPABILITIES · 38 SYSTEM MODULES ACROSS 6 DOMAINS",
  heading: "Every layer required to verify, explain, and act on technical skill.",
  subheading:
    "Explore the complete TalentLens system architecture. Select a capability domain below, then inspect any module to view its engineering workflow, value proposition, and illustrative artifact preview.",
  previewDisclaimer:
    "Illustrative module inspector: Previews depict representative system structures and mock engineering artifacts.",
} as const;

export const FEATURE_CATEGORIES: ReadonlyArray<FeatureCategory> = [
  {
    id: "repository-intelligence",
    code: "CAT // A",
    shortLabel: "Repository Intelligence",
    title: "Repository Intelligence",
    summary:
      "Static source inspection, architecture mapping, evolution context, and file-anchored evidence extraction across submitted codebases.",
    audienceTag: "Static Code & Artifact Analysis",
    featureRangeLabel: "Features 01–07",
  },
  {
    id: "ai-technical-viva",
    code: "CAT // B",
    shortLabel: "AI Technical Viva",
    title: "AI Technical Viva",
    summary:
      "Interactive, repository-grounded technical questioning and code defense evaluated against explicit engineering rubrics.",
    audienceTag: "Comprehension & Code Defense",
    featureRangeLabel: "Features 08–13",
  },
  {
    id: "skill-proof-cards",
    code: "CAT // C",
    shortLabel: "Skill Proof Cards",
    title: "Skill Proof Cards",
    summary:
      "Structured, provenance-linked skill profiles separating direct code observations from rubric-based assessments.",
    audienceTag: "Verification Records & Sharing",
    featureRangeLabel: "Features 14–20",
  },
  {
    id: "recruiter-intelligence",
    code: "CAT // D",
    shortLabel: "Recruiter Intelligence",
    title: "Recruiter Intelligence",
    summary:
      "Role-criterion extraction, explainable candidate matching, consistent side-by-side comparison, and hiring decision support.",
    audienceTag: "Hiring Team Workflows",
    featureRangeLabel: "Features 21–27",
  },
  {
    id: "candidate-growth",
    code: "CAT // E",
    shortLabel: "Candidate Growth",
    title: "Candidate Growth",
    summary:
      "Actionable gap diagnosis, personalized learning paths, targeted challenges, and concrete recommendations to strengthen proof.",
    audienceTag: "Developer Progression",
    featureRangeLabel: "Features 28–32",
  },
  {
    id: "fairness-trust",
    code: "CAT // F",
    shortLabel: "Fairness & Trust",
    title: "Fairness & Trust",
    summary:
      "Explainability guarantees, bias-aware ranking exclusions, consent controls, candidate appeals, and mandatory human oversight.",
    audienceTag: "Governance & Accountability",
    featureRangeLabel: "Features 33–38",
  },
];

export const PLATFORM_FEATURES: ReadonlyArray<PlatformFeature> = [
  // ============================================================================
  // CATEGORY A: REPOSITORY INTELLIGENCE (Features 1–7)
  // ============================================================================
  {
    id: "github-integration",
    number: 1,
    code: "F-01",
    categoryId: "repository-intelligence",
    name: "GitHub Integration",
    shortSummary:
      "Connect GitHub with granular, opt-in repository selection for analysis.",
    description:
      "Candidates connect their GitHub account via scoped OAuth permissions or submit selected repository URLs for structured inspection, retaining explicit control over which projects enter evaluation.",
    valueProposition:
      "Eliminates manual zip uploads while ensuring candidates authorize only the exact repositories they want evaluated.",
    availability: "core-architecture",
    preview: {
      kind: "ledger-card",
      panelTitle: "Consent-Scoped Repository Intake",
      artifactId: "INTAKE // GH-SCOPE-READ",
      entries: [
        {
          label: "Selected Repository",
          detail: "alex-morgan/order-dispatch-workspace (branch: main)",
          classification: "Verified Observation",
          badge: "Authorized",
        },
        {
          label: "Permission Boundary",
          detail: "Read-only tree & commit metadata for 1 explicitly selected repo; private unchosen repos excluded",
          classification: "System Metadata",
          badge: "Scoped OAuth",
        },
        {
          label: "Indexed Manifest",
          detail: "package.json, tsconfig.json, 48 source files queued for static adapters",
          classification: "Verified Observation",
          badge: "48 Files",
        },
      ],
    },
  },
  {
    id: "code-structure-analysis",
    number: 2,
    code: "F-02",
    categoryId: "repository-intelligence",
    name: "Code Structure Analysis",
    shortSummary:
      "Inspect modules, functions, classes, components, dependencies, and patterns.",
    description:
      "Parses source files to map module boundaries, component hierarchies, API route layers, state management patterns, validation logic, and dependency coupling across the project.",
    valueProposition:
      "Reveals how a developer organizes real software rather than relying on self-described architectural buzzwords.",
    availability: "core-architecture",
    preview: {
      kind: "code-trace",
      panelTitle: "AST & Module Boundary Inspection",
      filePath: "src/server/services/dispatchService.ts",
      language: "TypeScript",
      lines: [
        {
          lineNumber: 14,
          code: "export class DispatchCoordinator {",
          highlight: "none",
        },
        {
          lineNumber: 15,
          code: "  constructor(private readonly repo: OrderRepository, private readonly bus: EventBus) {}",
          highlight: "lime",
          annotation: "Constructor dependency injection enables isolated testing",
        },
        {
          lineNumber: 16,
          code: "  async assignCourier(orderId: OrderId, courierId: CourierId): Promise<Result<Assignment>> {",
          highlight: "lime",
          annotation: "Explicit Result<T> return type avoids untyped exception leaks",
        },
        {
          lineNumber: 17,
          code: "    return this.repo.withTransaction((tx) => this.applyAssignment(tx, orderId, courierId));",
          highlight: "none",
        },
      ],
      extractedSignals: [
        { label: "Layer Separation", value: "Route → Service → Repository", tone: "verified" },
        { label: "Type Strictness", value: "strict: true · 0 explicit any", tone: "verified" },
        { label: "Coupling Note", value: "Clean interface boundary", tone: "neutral" },
      ],
    },
  },
  {
    id: "development-evolution-timeline",
    number: 3,
    code: "F-03",
    categoryId: "repository-intelligence",
    name: "Development Evolution Timeline",
    shortSummary:
      "Examine commit progression and iterative refactors to understand project history.",
    description:
      "Analyzes available commit history, feature progression, bug-fix iterations, and structural refactorings to provide context on how the codebase evolved over time.",
    valueProposition:
      "Helps distinguish iterative engineering problem-solving—such as schema migrations or error-handling improvements—from a single uncontextualized code dump, while pairing findings with live viva verification.",
    availability: "core-architecture",
    guardrailNote:
      "Epistemic boundary: Commit history is never treated as conclusive proof of authorship (commits can be squashed, migrated, or pair-written). Authorship and comprehension are probed via the Technical Viva.",
    preview: {
      kind: "ledger-card",
      panelTitle: "Iterative Commit & Refactor Context",
      artifactId: "GIT-TIMELINE // 34 COMMITS",
      entries: [
        {
          label: "Initial Scaffolding → Domain Layer",
          detail: "Commits 01–09: Initialized schema & Express/Next route skeletons",
          classification: "Verified Observation",
          badge: "Phase 1",
        },
        {
          label: "Refactor: Error Envelope Normalization",
          detail: "Commit 21 (c84f19a): Replaced ad-hoc try/catch blocks with centralized error middleware",
          classification: "Verified Observation",
          badge: "Refactor",
        },
        {
          label: "Authorship Interpretation Guardrail",
          detail: "Git log informs Viva question selection only; does not establish sole authorship",
          classification: "System Metadata",
          badge: "Non-Conclusive",
        },
      ],
    },
  },
  {
    id: "project-complexity-analysis",
    number: 4,
    code: "F-04",
    categoryId: "repository-intelligence",
    name: "Project Complexity Analysis",
    shortSummary:
      "Examine architecture, integrations, state flows, testing, and measurable depth.",
    description:
      "Evaluates measurable structural characteristics including multi-module orchestration, asynchronous state handling, data validation schemas, external API error recovery, and test suite presence.",
    valueProposition:
      "Contextualizes skill claims: building a CRUD form and building a fault-tolerant event workflow both use TypeScript, yet represent markedly different engineering scope.",
    availability: "core-architecture",
    preview: {
      kind: "comparison-matrix",
      panelTitle: "Structural Scope & Complexity Breakdown",
      columns: ["Dimension", "Observed Implementation", "Evidence Signal"],
      rows: [
        {
          dimension: "Data Flow & State",
          colA: "Optimistic UI + SSE event reconciliation",
          colB: "Multi-component async coordination",
          note: "Observed in src/hooks/useOrderStream.ts",
          highlight: true,
        },
        {
          dimension: "Boundary Validation",
          colA: "Runtime Zod schemas on 6 API endpoints",
          colB: "Deterministic 422 payload handling",
          note: "Observed in src/server/routes/",
        },
        {
          dimension: "Automated Verification",
          colA: "1 unit spec · 0 integration specs",
          colB: "Sparse test sophistication",
          note: "Flagged for supplemental assessment",
        },
      ],
    },
  },
  {
    id: "tutorial-clone-similarity-analysis",
    number: 5,
    code: "F-05",
    categoryId: "repository-intelligence",
    name: "Tutorial-Clone Similarity Analysis",
    shortSummary:
      "Compare structure against permitted reference templates with transparent uncertainty.",
    description:
      "Compares directory layouts, boilerplate signatures, and implementation patterns against permitted reference projects and common starter templates—highlighting both shared scaffolding and custom candidate extensions.",
    valueProposition:
      "Helps recruiters focus on genuine custom engineering work beyond starter boilerplate while protecting candidates from unfair, automated plagiarism accusations.",
    availability: "planned-phase-3",
    guardrailNote:
      "Strict fairness rule: Similarity reports always include supporting evidence, custom-divergent files, and uncertainty notes. The system never automatically accuses a candidate of plagiarism.",
    preview: {
      kind: "ledger-card",
      panelTitle: "Template Overlap & Custom Divergence Report",
      artifactId: "SIM-CHECK // UNCERTAINTY-BOUNDED",
      entries: [
        {
          label: "Matched Starter Baseline",
          detail: "Auth & Next.js config structure resembles standard T3/create-next-app scaffolding",
          classification: "Verified Observation",
          badge: "Boilerplate",
        },
        {
          label: "Custom Divergent Modules (Candidate Focus)",
          detail: "19 modules in `src/features/orders/*` and `useOrderStream.ts` show custom domain logic",
          classification: "Verified Observation",
          badge: "Custom Work",
        },
        {
          label: "Interpretation & Uncertainty Notice",
          detail: "Shared scaffolding is normal engineering practice; Viva targets custom modules for comprehension",
          classification: "Inferred Assessment",
          badge: "Human Review",
        },
      ],
    },
  },
  {
    id: "multi-language-analysis",
    number: 6,
    code: "F-06",
    categoryId: "repository-intelligence",
    name: "Multi-Language Analysis",
    shortSummary:
      "Modular language-specific parsers and analysis adapters across ecosystems.",
    description:
      "Architected around pluggable language adapters and syntax analyzers so repositories combining TypeScript/JavaScript, Python, Java, Go, or SQL schemas can be inspected through consistent evidence contracts.",
    valueProposition:
      "Supports polyglot full-stack and backend repositories without forcing candidates into a single framework stack.",
    availability: "core-architecture",
    preview: {
      kind: "comparison-matrix",
      panelTitle: "Language Adapter Pipeline Registry",
      columns: ["Adapter", "Inspected Constructs", "Output Contract"],
      rows: [
        {
          dimension: "TypeScript / React",
          colA: "Components, hooks, strict types, route handlers",
          colB: "Normalized Evidence Nodes",
          note: "Core Phase 1 adapter",
          highlight: true,
        },
        {
          dimension: "Python (FastAPI / Core)",
          colA: "Pydantic models, async routers, pytest modules",
          colB: "Normalized Evidence Nodes",
          note: "Modular parser interface",
        },
        {
          dimension: "Java / SQL Artifacts",
          colA: "Service layers, schema migrations, query parameterization",
          colB: "Normalized Evidence Nodes",
          note: "Extensible adapter contract",
        },
      ],
    },
  },
  {
    id: "evidence-extraction",
    number: 7,
    code: "F-07",
    categoryId: "repository-intelligence",
    name: "Evidence Extraction",
    shortSummary:
      "Anchor every technical finding to exact files, line ranges, and inspectable code.",
    description:
      "Connects every static analysis observation directly to concrete file paths, line spans, symbol identifiers, and repository commits so no claim floats without an inspectable reference.",
    valueProposition:
      "Turns vague assertions like 'good error handling' into verifiable citations a hiring manager can read in seconds.",
    availability: "core-architecture",
    preview: {
      kind: "code-trace",
      panelTitle: "File- & Line-Anchored Evidence Citation",
      filePath: "src/server/routes/orders.route.ts",
      language: "TypeScript",
      lines: [
        {
          lineNumber: 41,
          code: "const parsed = PatchOrderStatusSchema.safeParse(await req.json());",
          highlight: "lime",
          annotation: "EVIDENCE #E-104: Input validated prior to domain mutation",
        },
        {
          lineNumber: 42,
          code: "if (!parsed.success) {",
          highlight: "none",
        },
        {
          lineNumber: 43,
          code: "  return NextResponse.json(toErrorResponse(parsed.error), { status: 422 });",
          highlight: "lime",
          annotation: "EVIDENCE #E-105: Deterministic 422 validation envelope",
        },
      ],
      extractedSignals: [
        { label: "Citation Anchor", value: "orders.route.ts:L41–L43", tone: "verified" },
        { label: "Linked Skill", value: "API Design · Input Validation", tone: "verified" },
        { label: "Traceability", value: "100% file-referenced", tone: "neutral" },
      ],
    },
  },

  // ============================================================================
  // CATEGORY B: AI TECHNICAL VIVA (Features 8–13)
  // ============================================================================
  {
    id: "repository-specific-questions",
    number: 8,
    code: "F-08",
    categoryId: "ai-technical-viva",
    name: "Repository-Specific Questions",
    shortSummary:
      "Generate interview prompts directly from the candidate’s own source files.",
    description:
      "Instead of generic textbook trivia, the AI Technical Viva synthesizes questions referencing specific functions, state hooks, schemas, and architectural decisions inside the candidate’s submitted codebase.",
    valueProposition:
      "Tests authentic understanding of submitted work while letting candidates shine on software they genuinely built.",
    availability: "core-architecture",
    preview: {
      kind: "viva-exchange",
      panelTitle: "Code-Anchored Question Generation",
      sourceReference: "src/hooks/useOrderStream.ts:L38–L56",
      promptQuestion:
        "In `useOrderStream`, why did you route `onEvent` through `latestHandlerRef.current` rather than including `onEvent` in the `useEffect` dependency list?",
      candidateExcerpt:
        "Because callers pass inline arrow functions on render; putting `onEvent` in dependencies tore down and reopened the event stream on every filter keystroke.",
      followUpOrFeedback:
        "Rubric match: Accurately links React render referential identity to network subscription stability.",
      rubricChecks: [
        { criterion: "Identifies stale-closure vs. reconnect trade-off", status: "Demonstrated" },
        { criterion: "References actual hook lifecycle behavior", status: "Demonstrated" },
      ],
    },
  },
  {
    id: "adaptive-follow-up-questions",
    number: 9,
    code: "F-09",
    categoryId: "ai-technical-viva",
    name: "Adaptive Follow-Up Questions",
    shortSummary:
      "Dynamically probe edge cases and consequences based on prior answers.",
    description:
      "Adjusts subsequent questions according to the candidate’s reasoning—probing deeper into concurrency, failure recovery, or complexity trade-offs when surface explanations are strong, or clarifying fundamentals when answers are partial.",
    valueProposition:
      "Mirrors how an attentive senior engineer conducts a technical walkthrough rather than stepping through a rigid static questionnaire.",
    availability: "core-architecture",
    preview: {
      kind: "viva-exchange",
      panelTitle: "Context-Aware Follow-Up Probe",
      sourceReference: "Follow-up to VIVA-Q-02 (Stream Reconnection)",
      promptQuestion:
        "Follow-up: When `stream` reconnects after a 5-second network drop, how could missed order updates leave `OrderBoard` out of sync, and how would you reconcile state?",
      candidateExcerpt:
        "Right now missed events between disconnect and reconnect aren't replayed. Adding a `lastEventSequenceId` query param or triggering a snapshot refetch on reconnect would close that gap.",
      followUpOrFeedback:
        "Adaptive outcome: Candidate recognized an unimplemented edge case honestly and proposed a sound sequence-cursor recovery pattern.",
      rubricChecks: [
        { criterion: "Recognizes distributed state gap on reconnect", status: "Demonstrated" },
        { criterion: "Proposes viable reconciliation mechanism", status: "Demonstrated" },
      ],
    },
  },
  {
    id: "technical-answer-evaluation",
    number: 10,
    code: "F-10",
    categoryId: "ai-technical-viva",
    name: "Technical Answer Evaluation",
    shortSummary:
      "Assess correctness, reasoning clarity, and code alignment against explicit rubrics.",
    description:
      "Evaluates candidate responses against structured, multi-criteria technical rubrics—scoring technical accuracy, consistency with the actual repository code, awareness of edge cases, and trade-off reasoning.",
    valueProposition:
      "Replaces subjective 'gut feel' with transparent, criterion-by-criterion evaluation notes that both candidates and recruiters can inspect.",
    availability: "core-architecture",
    preview: {
      kind: "comparison-matrix",
      panelTitle: "Explicit Viva Rubric Evaluation Matrix",
      columns: ["Rubric Dimension", "Evaluation Outcome", "Recorded Basis"],
      rows: [
        {
          dimension: "Code Consistency",
          colA: "Consistent with repo",
          colB: "Accurately cited `AbortController` teardown in L51",
          note: "Verified against AST",
          highlight: true,
        },
        {
          dimension: "Conceptual Accuracy",
          colA: "Demonstrated",
          colB: "Correct explanation of HTTP 409 vs 422 semantics",
          note: "Rubric RUB-BE-API-02",
        },
        {
          dimension: "Edge-Case Depth",
          colA: "Partial",
          colB: "Noted missing DB optimistic lock in code",
          note: "Recorded transparently",
        },
      ],
    },
  },
  {
    id: "code-defense",
    number: 11,
    code: "F-11",
    categoryId: "ai-technical-viva",
    name: "Code Defense",
    shortSummary:
      "Invite candidates to justify architecture, algorithms, and design trade-offs.",
    description:
      "Gives candidates structured prompts to defend why they selected specific data structures, state patterns, validation libraries, or database queries—and what they would change under higher scale or stricter latency constraints.",
    valueProposition:
      "Separates pasted or AI-generated boilerplate that a candidate cannot explain from deliberate, understood engineering decisions.",
    availability: "core-architecture",
    preview: {
      kind: "viva-exchange",
      panelTitle: "Architectural Trade-Off Defense",
      sourceReference: "src/server/routes/orders.route.ts · Architecture Review",
      promptQuestion:
        "You chose server-sent polling/streaming over full bidirectional WebSockets for order board updates. Walk through the trade-offs behind that choice.",
      candidateExcerpt:
        "Operators only consume live status pushes while mutations go through validated REST PATCH requests, so unidirectional SSE avoided sticky WebSocket auth complexity.",
      followUpOrFeedback:
        "Defense verified: Articulates pragmatic protocol selection aligned with read-push / REST-write architecture.",
      rubricChecks: [
        { criterion: "Justifies protocol choice against workload", status: "Demonstrated" },
        { criterion: "Articulates operational trade-offs", status: "Demonstrated" },
      ],
    },
  },
  {
    id: "personalized-assessment",
    number: 12,
    code: "F-12",
    categoryId: "ai-technical-viva",
    name: "Personalized Assessment",
    shortSummary:
      "Tailor viva emphasis to the competencies required by a target engineering role.",
    description:
      "Adapts question selection and rubric weighting to match a candidate’s target role—focusing more deeply on component accessibility and state flows for Frontend roles, or API contracts, transactions, and resilience for Backend roles.",
    valueProposition:
      "Keeps evaluation time focused on role-relevant engineering signal rather than unrelated peripheral topics.",
    availability: "core-architecture",
    preview: {
      kind: "comparison-matrix",
      panelTitle: "Role-Calibrated Question Allocation",
      columns: ["Target Track", "Primary Viva Probe Areas", "Weighting"],
      rows: [
        {
          dimension: "Full Stack Developer",
          colA: "React state sync, API validation, DB boundaries",
          colB: "Balanced UI + Server",
          note: "Active profile calibration",
          highlight: true,
        },
        {
          dimension: "Backend Engineer",
          colA: "Idempotency, transaction isolation, error envelopes",
          colB: "Server & Data focus",
          note: "Role template",
        },
        {
          dimension: "Frontend Engineer",
          colA: "Rendering lifecycle, accessibility, state architecture",
          colB: "Client & UX focus",
          note: "Role template",
        },
      ],
    },
  },
  {
    id: "feedback-and-improvement",
    number: 13,
    code: "F-13",
    categoryId: "ai-technical-viva",
    name: "Feedback & Improvement",
    shortSummary:
      "Surface conceptual blind spots and constructive technical recommendations.",
    description:
      "Provides candidates with post-viva diagnostic notes identifying specific misconceptions, incomplete explanations, or unverified edge cases—along with concrete concepts and code refinements to study.",
    valueProposition:
      "Turns every assessment into a high-signal learning loop for candidates instead of a silent pass/fail black box.",
    availability: "core-architecture",
    preview: {
      kind: "roadmap-action",
      panelTitle: "Post-Viva Diagnostic Feedback Brief",
      targetRole: "Full Stack Developer Viva Session #1",
      currentGap: "Concurrent write race condition in PATCH /api/orders/:id/status",
      steps: [
        {
          stepCode: "DIAG-01",
          action: "Review optimistic concurrency control using a `version` column in conditional SQL updates",
          artifactProduced: "Eliminates read-then-write status overwrite window",
          status: "Recommended",
        },
        {
          stepCode: "DIAG-02",
          action: "Add integration test simulating two simultaneous PATCH requests expecting one HTTP 409",
          artifactProduced: "Converts conceptual viva answer into committed code proof",
          status: "Target Outcome",
        },
      ],
    },
  },

  // ============================================================================
  // CATEGORY C: SKILL PROOF CARDS (Features 14–20)
  // ============================================================================
  {
    id: "evidence-backed-skill-profiles",
    number: 14,
    code: "F-14",
    categoryId: "skill-proof-cards",
    name: "Evidence-Backed Skill Profiles",
    shortSummary:
      "Present technical skills side-by-side with the exact artifacts supporting them.",
    description:
      "Synthesizes repository observations and technical viva outcomes into structured Skill Proof Cards where every listed technology is paired with inspectable code citations, verification notes, and status labels.",
    valueProposition:
      "Gives candidates and recruiters a shared, verifiable artifact that replaces unsupported skill progress bars or self-rated 5-star resume charts.",
    availability: "core-architecture",
    preview: {
      kind: "ledger-card",
      panelTitle: "Structured Skill Claim-to-Evidence Binding",
      artifactId: "PROOF-CARD // SKILL-SUMMARY",
      entries: [
        {
          label: "React · Strong evidence",
          detail: "Backed by 14 typed components, `useOrderStream.ts`, and verified Viva Q-02 defense",
          classification: "Inferred Assessment",
          badge: "Strong",
        },
        {
          label: "API Design · Moderate evidence",
          detail: "Backed by 6 Zod-validated routes & `errorEnvelope.ts`; concurrency lock noted as gap",
          classification: "Inferred Assessment",
          badge: "Moderate",
        },
        {
          label: "Testing · Insufficient evidence",
          detail: "Only 1 unit test file detected; supplemental testing challenge recommended",
          classification: "Verified Observation",
          badge: "Insufficient",
        },
      ],
    },
  },
  {
    id: "confidence-levels",
    number: 15,
    code: "F-15",
    categoryId: "skill-proof-cards",
    name: "Confidence Levels",
    shortSummary:
      "Reflect the quality, quantity, and consistency of supporting evidence.",
    description:
      "Displays qualitative evidence-consistency indicators derived from how many independent signals align—such as multiple non-trivial modules corroborated by clear viva explanations versus a single isolated file.",
    valueProposition:
      "Helps reviewers distinguish well-corroborated competencies from tentative findings based on thin artifacts.",
    availability: "core-architecture",
    guardrailNote:
      "Methodological precision: Confidence indicators summarize qualitative evidence breadth and consistency; they are never presented as statistically calibrated probabilities unless empirically validated.",
    preview: {
      kind: "comparison-matrix",
      panelTitle: "Qualitative Evidence Consistency Matrix",
      columns: ["Consistency Band", "Required Signal Alignment", "Interpretation"],
      rows: [
        {
          dimension: "High Consistency",
          colA: "Multiple repo modules + strong code defense",
          colB: "Corroborated across static & interactive layers",
          note: "Qualitative indicator",
          highlight: true,
        },
        {
          dimension: "Moderate Consistency",
          colA: "Partial code coverage or mixed viva depth",
          colB: "Warrants targeted follow-up in interview",
          note: "Qualitative indicator",
        },
        {
          dimension: "Low Availability",
          colA: "Minimal or absent artifacts in submission",
          colB: "Cannot substantiate claim without added proof",
          note: "Non-probabilistic label",
        },
      ],
    },
  },
  {
    id: "skill-gap-identification",
    number: 16,
    code: "F-16",
    categoryId: "skill-proof-cards",
    name: "Skill Gap Identification",
    shortSummary:
      "Explicitly surface skills that lack sufficient supporting evidence.",
    description:
      "Flags claimed or role-relevant competencies where repository inspection and viva responses do not yet provide enough evidence—preventing silent assumptions while guiding next verification steps.",
    valueProposition:
      "Honest about what is unknown: missing evidence is surfaced transparently as an actionable gap rather than fabricated or guessed.",
    availability: "core-architecture",
    preview: {
      kind: "ledger-card",
      panelTitle: "Unverified Claim & Missing Evidence Ledger",
      artifactId: "GAP-SCAN // HONEST-UNKNOWNS",
      entries: [
        {
          label: "Resume Claim: Automated Testing (Jest / Vitest)",
          detail: "Only 34 lines of unit tests found across 48 files; 0 async route or component specs",
          classification: "Verified Observation",
          badge: "Insufficient Evidence",
        },
        {
          label: "Resume Claim: Containerized Deployment (Docker)",
          detail: "No Dockerfile, compose manifest, or CI workflow present in evaluated repository",
          classification: "Verified Observation",
          badge: "Unverified in Repo",
        },
        {
          label: "Recommended Resolution",
          detail: "Attach second repository with CI/test suite or complete targeted testing assessment",
          classification: "System Metadata",
          badge: "Actionable",
        },
      ],
    },
  },
  {
    id: "evidence-provenance",
    number: 17,
    code: "F-17",
    categoryId: "skill-proof-cards",
    name: "Evidence Provenance",
    shortSummary:
      "Trace every finding to its origin artifact, rubric version, and evaluation timestamp.",
    description:
      "Records a complete audit chain for each Proof Card item: which repository commit or assessment produced the signal, which rubric criteria were applied, when evaluation ran, and whether a claim is a direct observation or an inference.",
    valueProposition:
      "Ensures every assessment artifact can be audited end-to-end by candidates, hiring managers, and fairness reviewers.",
    availability: "core-architecture",
    preview: {
      kind: "ledger-card",
      panelTitle: "End-to-End Provenance Audit Record",
      artifactId: "PROV // SHA-9F31C8 · RUB-FE-REACT-04",
      entries: [
        {
          label: "Artifact Origin",
          detail: "Repo `order-dispatch-workspace` @ commit `9f31c8b` + Viva Session #1",
          classification: "System Metadata",
          badge: "Immutable Ref",
        },
        {
          label: "Applied Rubric & Timestamp",
          detail: "Rubric `RUB-FE-REACT-04` (v1.2) · Evaluated 2026-10-18T14:20Z",
          classification: "System Metadata",
          badge: "Versioned",
        },
        {
          label: "Observation vs. Inference Split",
          detail: "3 direct file observations separated explicitly from 1 rubric synthesis statement",
          classification: "Verified Observation",
          badge: "Auditable",
        },
      ],
    },
  },
  {
    id: "shareable-verification-pages",
    number: 18,
    code: "F-18",
    categoryId: "skill-proof-cards",
    name: "Shareable Verification Pages",
    shortSummary:
      "Share selected skill proof with recruiters via controlled-access links.",
    description:
      "Allows candidates to generate permissioned, revocable verification links showcasing selected Skill Proof Cards, code-defense summaries, and approved excerpts alongside job applications.",
    valueProposition:
      "Lets candidates attach verifiable proof to any application while maintaining strict control over visibility and expiration.",
    availability: "planned-phase-3",
    preview: {
      kind: "governance-control",
      panelTitle: "Controlled-Access Verification Link Settings",
      policyCode: "SHARE-LINK // CANDIDATE-CONTROLLED",
      rules: [
        {
          rule: "Selected Proof Scope",
          enforcement: "Shares React & API Design cards + approved snippets; raw private repo stays hidden",
          state: "Enforced",
        },
        {
          rule: "Link Expiration & Revocation",
          enforcement: "30-day expiry window with instant one-click candidate revocation",
          state: "Enforced",
        },
        {
          rule: "Viewer Transparency",
          enforcement: "Displays provenance timestamps and rubric definitions to reviewing hiring teams",
          state: "Human Gate",
        },
      ],
      auditNote: "Planned Phase 3 capability: Candidate retains ownership of shared verification views.",
    },
  },
  {
    id: "assessment-history",
    number: 19,
    code: "F-19",
    categoryId: "skill-proof-cards",
    name: "Assessment History",
    shortSummary:
      "Track longitudinal skill evidence and verification improvements over time.",
    description:
      "Maintains a chronological record of previous repository evaluations, completed technical vivas, and resolved skill gaps so candidates and training programs can observe concrete engineering progression.",
    valueProposition:
      "Rewards genuine growth: adding test suites or refactoring error boundaries visibly upgrades evidence strength across snapshots.",
    availability: "core-architecture",
    preview: {
      kind: "comparison-matrix",
      panelTitle: "Longitudinal Proof Snapshot Progression",
      columns: ["Snapshot Date", "API Design Evidence", "Delta Cause"],
      rows: [
        {
          dimension: "2026-09-04 (v1)",
          colA: "Insufficient evidence",
          colB: "Unvalidated req.body access; raw 500 errors",
          note: "Initial baseline",
        },
        {
          dimension: "2026-10-18 (v2)",
          colA: "Moderate evidence",
          colB: "Added Zod schemas + `errorEnvelope.ts` + Viva defense",
          note: "Current snapshot",
          highlight: true,
        },
      ],
    },
  },
  {
    id: "alternative-evidence-path",
    number: 20,
    code: "F-20",
    categoryId: "skill-proof-cards",
    name: "Alternative Evidence Path",
    shortSummary:
      "Guided project evaluations and assessments for candidates without public GitHub repos.",
    description:
      "Provides structured mini-project submissions, architecture walkthrough prompts, and scoped technical assessments for candidates whose prior work lives in private employer codebases, coursework, or offline environments.",
    valueProposition:
      "Ensures engineers without public open-source profiles are never locked out of demonstrating verifiable capability.",
    availability: "planned-phase-3",
    preview: {
      kind: "roadmap-action",
      panelTitle: "Non-GitHub Verification Pathway",
      targetRole: "Candidates with Proprietary / Offline Prior Work",
      currentGap: "No public GitHub repositories available to share",
      steps: [
        {
          stepCode: "ALT-01",
          action: "Select role-aligned scoped reference problem or upload sanitized standalone module",
          artifactProduced: "Self-contained inspectable source artifact",
          status: "Recommended",
        },
        {
          stepCode: "ALT-02",
          action: "Complete interactive code defense & modification prompt on the submitted artifact",
          artifactProduced: "Rubric-backed Skill Proof Card without requiring public GitHub history",
          status: "Target Outcome",
        },
      ],
    },
  },

  // ============================================================================
  // CATEGORY D: RECRUITER INTELLIGENCE (Features 21–27)
  // ============================================================================
  {
    id: "job-description-analysis",
    number: 21,
    code: "F-21",
    categoryId: "recruiter-intelligence",
    name: "Job Description Analysis",
    shortSummary:
      "Parse job descriptions into structured required skills and evaluation rubrics.",
    description:
      "Extracts core technical competencies, must-have vs. preferred engineering capabilities, and concrete verification criteria from raw job descriptions—allowing recruiters to review and refine requirements before matching.",
    valueProposition:
      "Translates prose job postings into explicit, inspectable technical criteria rather than opaque keyword clouds.",
    availability: "planned-phase-2",
    preview: {
      kind: "ledger-card",
      panelTitle: "JD-to-Rubric Requirement Extraction",
      artifactId: "JD-PARSE // ROLE-FS-204",
      entries: [
        {
          label: "Core Requirement: React & Stateful UI",
          detail: "Mapped to Rubric `RUB-FE-REACT-04` (component boundaries, async hooks, state hygiene)",
          classification: "System Metadata",
          badge: "Required",
        },
        {
          label: "Core Requirement: REST API & Validation",
          detail: "Mapped to Rubric `RUB-BE-API-02` (schema validation, HTTP status contracts, error handling)",
          classification: "System Metadata",
          badge: "Required",
        },
        {
          label: "Preferred Criterion: Integration Testing",
          detail: "Mapped to Rubric `RUB-QA-TEST-01` (flagged as interview probe if repo lacks specs)",
          classification: "System Metadata",
          badge: "Preferred",
        },
      ],
    },
  },
  {
    id: "explainable-candidate-matching",
    number: 22,
    code: "F-22",
    categoryId: "recruiter-intelligence",
    name: "Explainable Candidate Matching",
    shortSummary:
      "Align candidate evidence with job criteria and explain every match or gap.",
    description:
      "Compares verified candidate Proof Cards against structured role requirements and generates a clear rationale showing which requirements have strong evidence, which have moderate evidence, and which remain unverified.",
    valueProposition:
      "Every alignment indicator comes with plain-language evidence citations—never an unexplained percentage score.",
    availability: "planned-phase-2",
    preview: {
      kind: "comparison-matrix",
      panelTitle: "Explainable Role-to-Evidence Alignment",
      columns: ["Role Requirement", "Candidate Evidence", "Match Rationale"],
      rows: [
        {
          dimension: "React Frontend Architecture",
          colA: "Strong evidence",
          colB: "14 typed components + verified stream hook defense",
          note: "Aligned",
          highlight: true,
        },
        {
          dimension: "Typed Backend API Contracts",
          colA: "Moderate evidence",
          colB: "Zod validation verified; concurrency lock probe advised",
          note: "Partial alignment",
        },
        {
          dimension: "Automated Integration Suite",
          colA: "Insufficient evidence",
          colB: "Only 1 unit test file in submitted repository",
          note: "Explicit interview focus",
        },
      ],
    },
  },
  {
    id: "side-by-side-candidate-comparison",
    number: 23,
    code: "F-23",
    categoryId: "recruiter-intelligence",
    name: "Side-by-Side Candidate Comparison",
    shortSummary:
      "Compare applicants for the same role across identical rubric dimensions.",
    description:
      "Displays multiple candidates side-by-side against uniform role rubrics—contrasting verified repository artifacts, viva comprehension notes, and missing evidence areas consistently.",
    valueProposition:
      "Reduces reviewer inconsistency by anchoring hiring comparisons to the same explicit technical evidence dimensions.",
    availability: "planned-phase-2",
    preview: {
      kind: "comparison-matrix",
      panelTitle: "Uniform Rubric Candidate Matrix (Illustrative)",
      columns: ["Rubric Dimension", "Profile A (Repo + Viva)", "Profile B (Repo + Viva)"],
      rows: [
        {
          dimension: "React State & Hooks",
          colA: "Strong (Custom SSE hook + viva)",
          colB: "Moderate (Standard CRUD state)",
          note: "Same rubric applied",
          highlight: true,
        },
        {
          dimension: "API Validation & Errors",
          colA: "Moderate (Zod + error envelope)",
          colB: "Strong (OpenAPI + idempotent keys)",
          note: "Same rubric applied",
        },
        {
          dimension: "Automated Testing",
          colA: "Insufficient (1 unit file)",
          colB: "Strong (24 route & UI integration tests)",
          note: "Clear trade-off visibility",
        },
      ],
    },
  },
  {
    id: "custom-assessment-rubrics",
    number: 24,
    code: "F-24",
    categoryId: "recruiter-intelligence",
    name: "Custom Assessment Rubrics",
    shortSummary:
      "Configure role-specific technical criteria, priorities, and viva focus areas.",
    description:
      "Enables engineering managers and recruiters to define custom rubric dimensions—specifying which architectural practices, testing standards, or domain trade-offs matter most for their team.",
    valueProposition:
      "Aligns automated repository inspection and viva prompts with your engineering organization’s actual technical bar.",
    availability: "planned-phase-2",
    preview: {
      kind: "governance-control",
      panelTitle: "Hiring Team Custom Rubric Configuration",
      policyCode: "RUBRIC-CFG // TEAM-BACKEND-CORE",
      rules: [
        {
          rule: "Priority Weight: Input Validation & Error Contracts",
          enforcement: "Require runtime schema parsing + non-leaking HTTP error responses",
          state: "Enforced",
        },
        {
          rule: "Viva Mandatory Probe: Failure Recovery",
          enforcement: "Generate 1 viva question on database transactions or network retry behavior",
          state: "Enforced",
        },
        {
          rule: "Non-Penalized Styling / Framework Choice",
          enforcement: "Accept Express, Fastify, or Next.js Route Handlers equivalently",
          state: "Human Gate",
        },
      ],
      auditNote: "Custom rubrics standardize evaluation across every applicant for the role.",
    },
  },
  {
    id: "shortlisting-workspace",
    number: 25,
    code: "F-25",
    categoryId: "recruiter-intelligence",
    name: "Shortlisting Workspace",
    shortSummary:
      "Organize reviewed Proof Cards, hiring manager notes, and interview stages.",
    description:
      "Provides a structured workspace where recruiters and hiring managers can save candidate Proof Cards, attach human review notes, flag open technical questions for live interviews, and track review status.",
    valueProposition:
      "Keeps technical evidence and human reviewer context connected from initial screen through final engineering debrief.",
    availability: "planned-phase-2",
    preview: {
      kind: "ledger-card",
      panelTitle: "Collaborative Review & Shortlist Queue",
      artifactId: "WORKSPACE // ROLE-FS-Q4",
      entries: [
        {
          label: "Alex Morgan · Full Stack Track",
          detail: "Status: Shortlisted for HM Live Pairing · Focus live session on integration testing",
          classification: "System Metadata",
          badge: "HM Review",
        },
        {
          label: "Priya Nair · Full Stack Track",
          detail: "Status: Awaiting Viva Completion · Strong static API & test suite detected",
          classification: "System Metadata",
          badge: "Pending Viva",
        },
        {
          label: "Decision Ownership",
          detail: "Stage transitions require explicit recruiter or hiring manager action",
          classification: "System Metadata",
          badge: "Human Owned",
        },
      ],
    },
  },
  {
    id: "assessment-reports",
    number: 26,
    code: "F-26",
    categoryId: "recruiter-intelligence",
    name: "Assessment Reports",
    shortSummary:
      "Export structured briefs detailing evidence, viva outcomes, and explicit limitations.",
    description:
      "Generates clean, shareable engineering review briefs summarizing verified observations, viva rubric outcomes, suggested live-interview follow-up questions, and known evidence limitations.",
    valueProposition:
      "Equips interviewing engineers with a concise, factual 2-minute briefing before stepping into a live candidate conversation.",
    availability: "planned-phase-2",
    preview: {
      kind: "ledger-card",
      panelTitle: "Interviewer Briefing Packet Summary",
      artifactId: "BRIEF // INT-PACKET-8492",
      entries: [
        {
          label: "Verified Strengths (Skip Repetitive Trivia)",
          detail: "React hook lifecycles & Zod API validation already substantiated with code + viva",
          classification: "Verified Observation",
          badge: "Substantiated",
        },
        {
          label: "Recommended Live Interview Probes",
          detail: "Explore database transaction locking and write 1 async route test live",
          classification: "Inferred Assessment",
          badge: "Probe Live",
        },
        {
          label: "Explicit Scope Limitation",
          detail: "Single repository evaluated; CI/CD & cloud infra claims remain unverified",
          classification: "System Metadata",
          badge: "Limitation",
        },
      ],
    },
  },
  {
    id: "recruitment-integrations",
    number: 27,
    code: "F-27",
    categoryId: "recruiter-intelligence",
    name: "Recruitment Integrations",
    shortSummary:
      "Planned webhook and API connectors for applicant tracking and hiring platforms.",
    description:
      "Designed with clean webhook events and REST API schemas to attach Proof Card links, structured assessment statuses, and interviewer briefs into external applicant tracking systems (ATS) in future releases.",
    valueProposition:
      "Allows hiring teams to adopt evidence-backed verification alongside existing recruiting pipelines as ecosystem connectors roll out.",
    availability: "planned-phase-4",
    guardrailNote:
      "Roadmap status: External ATS connectors are architected as Phase 4 integrations and are not active in the current release.",
    preview: {
      kind: "code-trace",
      panelTitle: "Planned Outbound Verification Webhook Contract",
      filePath: "schemas/webhooks/proof-card-ready.schema.ts",
      language: "TypeScript",
      lines: [
        {
          lineNumber: 1,
          code: "export interface ProofCardWebhookEvent {",
          highlight: "none",
        },
        {
          lineNumber: 2,
          code: '  event: "proof_card.completed";',
          highlight: "violet",
          annotation: "Planned Phase 4 ATS integration contract",
        },
        {
          lineNumber: 3,
          code: "  verificationUrl: string; // Controlled-access candidate proof view",
          highlight: "lime",
        },
        {
          lineNumber: 4,
          code: "  requiresHumanReview: true; // Never triggers automated ATS rejection",
          highlight: "lime",
          annotation: "Enforces human-in-the-loop review downstream",
        },
      ],
      extractedSignals: [
        { label: "Delivery Phase", value: "Planned — Phase 4", tone: "caution" },
        { label: "Contract Guarantee", value: "requiresHumanReview: true", tone: "verified" },
      ],
    },
  },

  // ============================================================================
  // CATEGORY E: CANDIDATE GROWTH (Features 28–32)
  // ============================================================================
  {
    id: "skill-gap-analysis-growth",
    number: 28,
    code: "F-28",
    categoryId: "candidate-growth",
    name: "Skill Gap Analysis",
    shortSummary:
      "Pinpoint which target-role competencies lack supporting technical evidence.",
    description:
      "Compares a candidate’s current Proof Card against target engineering role profiles—explaining whether a gap stems from missing repository artifacts (e.g., no tests) or incomplete conceptual defense during the viva.",
    valueProposition:
      "Gives candidates clarity on what stands between their current project portfolio and the technical bar of their target role.",
    availability: "core-architecture",
    preview: {
      kind: "comparison-matrix",
      panelTitle: "Role Readiness Evidence Gap Diagnostic",
      columns: ["Target Competency", "Current Proof Status", "Root Cause of Gap"],
      rows: [
        {
          dimension: "Integration Testing",
          colA: "Insufficient evidence",
          colB: "Missing route/hook test files in submitted repo",
          note: "Artifact gap",
          highlight: true,
        },
        {
          dimension: "Concurrent Data Safety",
          colA: "Moderate evidence",
          colB: "Discussed in viva, not yet implemented in SQL update",
          note: "Implementation gap",
        },
        {
          dimension: "Component Architecture",
          colA: "Strong evidence",
          colB: "Substantiated in code + viva",
          note: "No gap",
        },
      ],
    },
  },
  {
    id: "personalized-learning-roadmap",
    number: 29,
    code: "F-29",
    categoryId: "candidate-growth",
    name: "Personalized Learning Roadmap",
    shortSummary:
      "Recommend concrete engineering topics, refactors, and exercises from real gaps.",
    description:
      "Generates a structured, prioritized study and implementation plan directly tied to observed code and viva gaps—skipping generic beginner tutorials on topics the candidate has already proven.",
    valueProposition:
      "Saves candidates weeks of unfocused prep by targeting exact engineering blind spots revealed in their own code.",
    availability: "core-architecture",
    preview: {
      kind: "roadmap-action",
      panelTitle: "Evidence-Driven Engineering Study Plan",
      targetRole: "Full Stack Developer Progression",
      currentGap: "Testing Verification & Transactional API Consistency",
      steps: [
        {
          stepCode: "STEP-01",
          action: "Build Vitest + Supertest integration suite covering 200, 409, and 422 responses in `orders.route.ts`",
          artifactProduced: "Verifiable async API test coverage artifact",
          status: "Recommended",
        },
        {
          stepCode: "STEP-02",
          action: "Implement optimistic locking (`WHERE id = $1 AND version = $2`) in order status mutations",
          artifactProduced: "Concurrency-safe domain mutation pattern",
          status: "Recommended",
        },
        {
          stepCode: "STEP-03",
          action: "Re-index repository & complete 2-question delta viva",
          artifactProduced: "Upgraded Proof Card snapshot",
          status: "Target Outcome",
        },
      ],
    },
  },
  {
    id: "targeted-coding-challenges",
    number: 30,
    code: "F-30",
    categoryId: "candidate-growth",
    name: "Targeted Coding Challenges",
    shortSummary:
      "Assign focused, practical engineering tasks to verify specific unproved skills.",
    description:
      "Offers compact, practical implementation challenges—such as writing integration tests for an API handler, fixing a race condition, or designing an error boundary—rather than abstract algorithmic riddles.",
    valueProposition:
      "Lets candidates quickly supply missing evidence for a single unverified skill without building a brand-new repository from scratch.",
    availability: "planned-phase-4",
    preview: {
      kind: "code-trace",
      panelTitle: "Scoped Skill-Verification Micro-Challenge",
      filePath: "challenges/api-idempotency-spec/task.ts",
      language: "TypeScript",
      lines: [
        {
          lineNumber: 1,
          code: "// Task: Add integration tests verifying duplicate Idempotency-Key behavior",
          highlight: "violet",
          annotation: "Targeted 35-min practical verification task",
        },
        {
          lineNumber: 2,
          code: 'it("returns cached 201 payload without double-charging on retry", async () => {',
          highlight: "lime",
        },
        {
          lineNumber: 3,
          code: '  const res1 = await postPayment({ key: "idem_99", amountCents: 4500 });',
          highlight: "none",
        },
        {
          lineNumber: 4,
          code: '  const res2 = await postPayment({ key: "idem_99", amountCents: 4500 });',
          highlight: "lime",
          annotation: "Directly resolves 'Testing: Insufficient evidence' flag",
        },
      ],
      extractedSignals: [
        { label: "Target Skill", value: "Integration Testing & API Safety", tone: "verified" },
        { label: "Roadmap Stage", value: "Planned — Phase 4", tone: "caution" },
      ],
    },
  },
  {
    id: "developer-portfolio",
    number: 31,
    code: "F-31",
    categoryId: "candidate-growth",
    name: "Developer Portfolio",
    shortSummary:
      "Showcase inspected projects, verified competencies, and code-defense highlights.",
    description:
      "Organizes a candidate’s evaluated repositories, architectural highlights, and selected Skill Proof Cards into a structured engineering profile focused on inspectable substance over visual flash.",
    valueProposition:
      "Gives candidates a clean technical portfolio where every featured project carries traceable engineering context.",
    availability: "core-architecture",
    preview: {
      kind: "ledger-card",
      panelTitle: "Evidence-Centered Developer Profile View",
      artifactId: "PORTFOLIO // ALEX-MORGAN",
      entries: [
        {
          label: "Featured Project: Order Dispatch Workspace",
          detail: "TypeScript · React · Node.js — 48 indexed files, 3 architectural citations",
          classification: "Verified Observation",
          badge: "Inspected",
        },
        {
          label: "Highlighted Code Defense",
          detail: "SSE subscription lifecycle & HTTP error envelope normalization",
          classification: "Verified Observation",
          badge: "Viva Logged",
        },
        {
          label: "Visibility Control",
          detail: "Candidate selects which Proof Cards and project summaries appear publicly",
          classification: "System Metadata",
          badge: "Opt-In",
        },
      ],
    },
  },
  {
    id: "evidence-improvement-recommendations",
    number: 32,
    code: "F-32",
    categoryId: "candidate-growth",
    name: "Evidence Improvement Recommendations",
    shortSummary:
      "Suggest high-leverage repository or assessment steps to strengthen proof.",
    description:
      "Advises candidates on concrete ways to make existing projects more inspectable—such as adding integration tests, documenting architectural trade-offs, separating configuration from logic, or completing a targeted viva.",
    valueProposition:
      "Helps strong builders ensure their repositories actually surface the engineering quality they are capable of.",
    availability: "core-architecture",
    preview: {
      kind: "roadmap-action",
      panelTitle: "High-Leverage Repository Proof Upgrades",
      targetRole: "Strengthening `order-dispatch-workspace` Evidence",
      currentGap: "Strong UI & route structure, thin verification & concurrency artifacts",
      steps: [
        {
          stepCode: "UPG-01",
          action: "Add 4–6 route integration tests covering validation errors and conflict states",
          artifactProduced: "Upgrades Testing from Insufficient → Moderate/Strong evidence",
          status: "Recommended",
        },
        {
          stepCode: "UPG-02",
          action: "Document architecture & trade-offs in `ARCHITECTURE.md` or complete API Viva follow-up",
          artifactProduced: "Clarifies deliberate design boundaries for human reviewers",
          status: "Optional",
        },
      ],
    },
  },

  // ============================================================================
  // CATEGORY F: FAIRNESS & TRUST (Features 33–38)
  // ============================================================================
  {
    id: "explainable-assessments",
    number: 33,
    code: "F-33",
    categoryId: "fairness-trust",
    name: "Explainable Assessments",
    shortSummary:
      "Every material skill finding includes human-readable reasoning and citations.",
    description:
      "Requires every important evaluation output to present a plain-language rationale alongside links to the exact source files, code excerpts, viva answers, and rubric criteria that produced it.",
    valueProposition:
      "Eliminates inscrutable AI scores—both candidates and hiring teams can read and question the exact reasoning chain.",
    availability: "core-architecture",
    preview: {
      kind: "ledger-card",
      panelTitle: "Mandatory Reasoning & Citation Chain",
      artifactId: "EXPLAIN // AUDIT-CHAIN-01",
      entries: [
        {
          label: "Human-Readable Claim Rationale",
          detail: "API Design rated Moderate: Zod schemas validate inputs cleanly, while concurrent PATCH locking remains unimplemented in SQL.",
          classification: "Inferred Assessment",
          badge: "Explained",
        },
        {
          label: "Inspectable Supporting Artifacts",
          detail: "`orders.route.ts:L41–L43`, `errorEnvelope.ts:L19–L37`, and Viva response `VIVA-Q-04`",
          classification: "Verified Observation",
          badge: "3 Citations",
        },
        {
          label: "Opaque Score Prohibition",
          detail: "System blocks unreferenced numeric skill scores without linked evidence items",
          classification: "System Metadata",
          badge: "Policy Rule",
        },
      ],
    },
  },
  {
    id: "fairness-audits",
    number: 34,
    code: "F-34",
    categoryId: "fairness-trust",
    name: "Fairness Audits",
    shortSummary:
      "Test scoring and ranking stability across controlled evaluation scenarios.",
    description:
      "Evaluates whether rubric scoring, viva evaluations, or candidate matching shift across controlled perturbation benchmarks and relevant test groups—identifying and mitigating unintended scoring disparities.",
    valueProposition:
      "Treats fairness as an ongoing empirical engineering discipline rather than an untested assumption.",
    availability: "planned-phase-3",
    guardrailNote:
      "Credibility boundary: Fairness audits surface potential disparities under controlled test scenarios; they do not guarantee zero bias across all real-world contexts.",
    preview: {
      kind: "governance-control",
      panelTitle: "Controlled Counterfactual & Perturbation Audit",
      policyCode: "AUDIT-SUITE // COUNTERFACTUAL-EVAL",
      rules: [
        {
          rule: "Profile Metadata Invariance Check",
          enforcement: "Verify identical Proof Card & match outputs when non-technical profile metadata varies",
          state: "Enforced",
        },
        {
          rule: "Coding Style & Framework Neutrality Check",
          enforcement: "Audit rubric consistency across equivalent implementations using different valid idioms",
          state: "Enforced",
        },
        {
          rule: "Disparity Escalation Gate",
          enforcement: "Flag rubric variance above threshold for human methodological review",
          state: "Human Gate",
        },
      ],
      auditNote: "Planned Phase 3 evaluation suite for ongoing rubric invariance testing.",
    },
  },
  {
    id: "bias-aware-candidate-ranking",
    number: 35,
    code: "F-35",
    categoryId: "fairness-trust",
    name: "Bias-Aware Candidate Ranking",
    shortSummary:
      "Exclude college name, gender, age, and location from ranking features.",
    description:
      "Explicitly excludes college/university name, gender, age, and geographic location from candidate matching and ranking inputs, strips institutional identifiers from ranking pipelines where feasible to reduce indirect proxy usage, and evaluates outputs for unintended bias.",
    valueProposition:
      "Focuses candidate ordering on demonstrated engineering evidence rather than institutional prestige or demographic proxies.",
    availability: "planned-phase-2",
    guardrailNote:
      "Design commitment: Directly excludes college name, gender, age, and location from ranking features, works to prevent indirect proxy leakage where feasible, and pairs ranking with human oversight.",
    preview: {
      kind: "governance-control",
      panelTitle: "Ranking Feature Exclusion & Proxy Guardrails",
      policyCode: "RANK-GUARD // DEMOGRAPHIC-BLIND",
      rules: [
        {
          rule: "College / Institution Name",
          enforcement: "Hard-excluded from matching & ranking feature vectors",
          state: "Excluded Signal",
        },
        {
          rule: "Gender, Age & Geographic Location",
          enforcement: "Hard-excluded from matching & ranking feature vectors",
          state: "Excluded Signal",
        },
        {
          rule: "Indirect Proxy Mitigation",
          enforcement: "Strip graduation/campus tokens from resume text before rubric matching where feasible",
          state: "Enforced",
        },
      ],
      auditNote: "Ranking operates exclusively on rubric-verified skill evidence and role criteria.",
    },
  },
  {
    id: "candidate-review-and-appeals",
    number: 36,
    code: "F-36",
    categoryId: "fairness-trust",
    name: "Candidate Review and Appeals",
    shortSummary:
      "Empower candidates to contest inaccurate findings and attach clarifying proof.",
    description:
      "Gives candidates full visibility into their generated Proof Card before sharing, along with a structured mechanism to dispute misclassified files, add architectural context, or submit additional evidence.",
    valueProposition:
      "Protects candidates when static parsers miss unconventional project setups, monorepo layouts, or external test repositories.",
    availability: "core-architecture",
    preview: {
      kind: "ledger-card",
      panelTitle: "Candidate Dispute & Context Amendment Flow",
      artifactId: "APPEAL // REV-REQ-19",
      entries: [
        {
          label: "Flagged Finding",
          detail: "Candidate contested 'Zero E2E Tests'—noted Playwright suite lives in sibling repo `order-e2e-specs`",
          classification: "System Metadata",
          badge: "Contested",
        },
        {
          label: "Submitted Supplemental Evidence",
          detail: "Attached authorized link to `order-e2e-specs` + architectural context note",
          classification: "Verified Observation",
          badge: "Supplemented",
        },
        {
          label: "Resolution Path",
          detail: "Triggers re-indexing or attaches candidate context banner directly to Proof Card",
          classification: "System Metadata",
          badge: "Transparent",
        },
      ],
    },
  },
  {
    id: "privacy-controls",
    number: 37,
    code: "F-37",
    categoryId: "fairness-trust",
    name: "Privacy Controls",
    shortSummary:
      "Require explicit consent before repo analysis and govern shared artifacts.",
    description:
      "Requires explicit opt-in consent before accessing or analyzing any candidate repository, separates raw source files from generated Proof Card summaries, and gives candidates granular toggles over what recruiters can view.",
    valueProposition:
      "Candidates prove capability from real engineering work without surrendering ownership or indiscriminate access to their source code.",
    availability: "core-architecture",
    preview: {
      kind: "governance-control",
      panelTitle: "Candidate Consent & Visibility Governance",
      policyCode: "PRIVACY // OPT-IN-ONLY",
      rules: [
        {
          rule: "Pre-Analysis Repository Consent",
          enforcement: "Zero repository cloning or indexing without explicit candidate authorization",
          state: "Enforced",
        },
        {
          rule: "Snippet & File Visibility Toggle",
          enforcement: "Candidate approves whether short evidence snippets appear on shared Proof Cards",
          state: "Enforced",
        },
        {
          rule: "Access Revocation",
          enforcement: "Candidates can disconnect GitHub tokens and revoke shared Proof links at any time",
          state: "Enforced",
        },
      ],
      auditNote: "Private repository contents are never exposed directly to recruiters.",
    },
  },
  {
    id: "human-oversight",
    number: 38,
    code: "F-38",
    categoryId: "fairness-trust",
    name: "Human Oversight",
    shortSummary:
      "Frame all assessments strictly as decision support—never automatic rejection.",
    description:
      "Presents Proof Cards, match explanations, and similarity analyses strictly as structured decision-support context for human recruiters and hiring managers, prohibiting autonomous candidate rejection.",
    valueProposition:
      "Preserves human judgment, contextual empathy, and accountability across every hiring decision.",
    availability: "core-architecture",
    preview: {
      kind: "governance-control",
      panelTitle: "Human-in-the-Loop Decision Architecture",
      policyCode: "OVERSIGHT // NO-AUTO-REJECT",
      rules: [
        {
          rule: "Prohibition on Autonomous Disqualification",
          enforcement: "System cannot auto-reject applicants; 'Insufficient evidence' prompts inquiry, not rejection",
          state: "Human Gate",
        },
        {
          rule: "Similarity Report Handling",
          enforcement: "Template overlap requires human context review alongside Viva comprehension",
          state: "Human Gate",
        },
        {
          rule: "Accountable Stage Progression",
          enforcement: "Shortlisting and interview outcomes require named human reviewer confirmation",
          state: "Enforced",
        },
      ],
      auditNote: "TalentLens informs human engineering reviewers—it never replaces them.",
    },
  },
];
