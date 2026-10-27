import type { FAQItem } from "@/types/platform";

export const FAQ_SECTION_CONTENT = {
  eyebrow: "FREQUENTLY ASKED QUESTIONS",
  heading: "Clear answers on methodology, boundaries, and trust.",
  subheading:
    "How TalentLens evaluates technical evidence, protects candidate work, and keeps hiring decisions accountable to people.",
} as const;

export const FAQ_ITEMS: ReadonlyArray<FAQItem> = [
  {
    id: "faq-what-is",
    index: "01",
    category: "Platform",
    question: "What is TalentLens?",
    answer:
      "TalentLens is an AI-powered developer intelligence and technical skill verification platform. It transforms source repositories, project artifacts, and structured technical assessments into inspectable Skill Proof Cards—allowing candidates to substantiate what they know and helping recruiters evaluate verifiable engineering evidence alongside resumes.",
  },
  {
    id: "faq-different-from-scanner",
    index: "02",
    category: "Platform",
    question: "How is it different from an AI resume scanner?",
    answer:
      "Traditional ATS and AI resume scanners score how well a document matches job-description keywords or formatting conventions. TalentLens inspects underlying engineering artifacts—such as component structure, error-handling patterns, API boundaries, and test coverage—and pairs static findings with an interactive technical viva where candidates explain their own implementation choices.",
  },
  {
    id: "faq-github-required",
    index: "03",
    category: "Verification",
    question: "Do candidates need a GitHub account?",
    answer:
      "No. While connecting GitHub is a fast way to submit public or explicitly authorized repositories, many capable engineers have worked primarily on private enterprise codebases, academic coursework, or local projects. TalentLens is designed with an Alternative Evidence Path that uses guided project submissions and targeted technical assessments when public repositories are unavailable.",
  },
  {
    id: "faq-commit-authorship",
    index: "04",
    category: "Verification",
    question: "Does repository analysis prove who wrote the code?",
    answer:
      "No—static repository inspection and Git commit history alone are never treated as conclusive proof of authorship. Commit metadata can be squashed, pair-authored, migrated, or copied. That is why TalentLens pairs static repository evidence with an interactive AI Technical Viva and code-defense questions that test whether the candidate genuinely understands the architecture, trade-offs, and implementation details.",
  },
  {
    id: "faq-how-viva-works",
    index: "05",
    category: "Verification",
    question: "How does the AI technical viva work?",
    answer:
      "After indexing a submitted repository or project artifact, the platform identifies concrete implementation points—such as state synchronization logic, database queries, middleware validation, or architectural trade-offs—and generates questions anchored to those exact files. Follow-up questions adapt to the candidate’s responses, and answers are evaluated against explicit rubrics covering correctness, reasoning depth, and code familiarity.",
  },
  {
    id: "faq-how-skills-evaluated",
    index: "06",
    category: "Verification",
    question: "How are skills evaluated?",
    answer:
      "Skills are evaluated by linking explicit rubric criteria to two distinct layers: Verified Observations (directly inspectable facts such as file structures, validation schemas, or recorded viva explanations) and Inferred Assessments (rubric-based judgments about proficiency level). When repository or assessment evidence is sparse—for example, missing test suites—the platform marks the skill as having insufficient evidence rather than guessing.",
  },
  {
    id: "faq-private-repos",
    index: "07",
    category: "Privacy & Fairness",
    question: "Can recruiters see private repositories?",
    answer:
      "Never without explicit candidate authorization. Repository analysis requires opt-in candidate consent, and candidates control which projects, summaries, and verification links are shared. Recruiters view structured evidence excerpts and assessment summaries permitted by the candidate—not unrestricted access to private source code.",
  },
  {
    id: "faq-data-protection",
    index: "08",
    category: "Privacy & Fairness",
    question: "How does the platform protect candidate information?",
    answer:
      "TalentLens is designed around explicit consent scopes, minimal data collection, controlled-access verification links, and clear separation between raw source code and shared assessment artifacts. Candidates decide which repositories or assessments are included in their shareable profile and can revoke shared verification access.",
  },
  {
    id: "faq-appeals",
    index: "09",
    category: "Privacy & Fairness",
    question: "Can candidates challenge incorrect findings?",
    answer:
      "Yes. Automated static analysis and AI-assisted evaluations have limitations—for example, unusual project layouts, monorepo conventions, or misclassified templates. Candidates can inspect the exact rationale behind their Proof Card, flag inaccurate findings for review, append clarifying context, or complete an additional assessment to supply stronger evidence.",
  },
  {
    id: "faq-auto-rejection",
    index: "10",
    category: "Privacy & Fairness",
    question: "Does the platform automatically reject candidates?",
    answer:
      "No. TalentLens is built strictly as decision-support tooling, not an autonomous hiring gatekeeper. Similarly, tutorial-clone similarity analysis reports structural overlap alongside supporting evidence and uncertainty—it never automatically accuses a candidate of plagiarism or disqualifies an applicant. Human recruiters and hiring managers remain responsible for all hiring decisions.",
  },
  {
    id: "faq-ranking",
    index: "11",
    category: "Privacy & Fairness",
    question: "How does candidate ranking work?",
    answer:
      "Explainable candidate matching compares verified skill evidence and rubric outcomes against job-specific technical criteria. By design, ranking logic excludes college name, gender, age, and location, works to prevent indirect proxy usage where feasible, and exposes the exact evidence behind every match so recruiters can inspect why a profile aligned—or where evidence is missing.",
  },
  {
    id: "faq-colleges",
    index: "12",
    category: "Adoption",
    question: "Can colleges use TalentLens?",
    answer:
      "Yes. College placement cells, faculty coordinators, and technical training programs can help students turn capstone repositories and coursework into evidence-backed skill profiles, identify practical skill gaps prior to placement season, and present employers with verifiable engineering substance beyond GPA or institution reputation.",
  },
];
