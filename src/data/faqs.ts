import type { FAQItem } from "@/types/platform";

export const FAQ_SECTION_CONTENT = {
  eyebrow: "FREQUENTLY ASKED QUESTIONS",
  heading: "Clear answers on methodology and trust.",
  subheading:
    "How TalentLens evaluates technical evidence, protects candidate code, and keeps hiring decisions accountable to people.",
} as const;

export const FAQ_ITEMS: ReadonlyArray<FAQItem> = [
  {
    id: "faq-what-is",
    index: "01",
    category: "Platform",
    question: "What is TalentLens?",
    answer:
      "TalentLens is an AI-powered developer skill verification platform. It connects source code repositories, adaptive technical viva defenses, and transparent rubrics into inspectable Skill Proof Cards that prove practical capability.",
  },
  {
    id: "faq-different-from-scanner",
    index: "02",
    category: "Platform",
    question: "How is it different from an AI resume scanner?",
    answer:
      "Resume scanners match keywords on a PDF. TalentLens inspects real codebase structure, error boundaries, and API designs—paired with an interactive technical viva where candidates defend their actual implementation choices.",
  },
  {
    id: "faq-github-required",
    index: "03",
    category: "Verification",
    question: "Do candidates need a public GitHub account?",
    answer:
      "No. While public GitHub repos can be connected via scoped OAuth, candidates with NDA or enterprise experience can use guided project assessments and alternative verification pathways.",
  },
  {
    id: "faq-commit-authorship",
    index: "04",
    category: "Verification",
    question: "Does repository analysis prove who wrote the code?",
    answer:
      "No. Static code inspection alone cannot prove authorship. That is why TalentLens pairs code mapping with an AI Technical Viva that probes candidate comprehension, architecture choices, and failure trade-offs.",
  },
  {
    id: "faq-private-repos",
    index: "05",
    category: "Privacy & Fairness",
    question: "Can recruiters view private repositories?",
    answer:
      "Never without explicit consent. Candidates maintain granular control over which repositories enter evaluation and what findings appear on their shared Skill Proof Card.",
  },
  {
    id: "faq-auto-rejection",
    index: "06",
    category: "Privacy & Fairness",
    question: "Does the platform automatically reject candidates?",
    answer:
      "No. TalentLens provides structured decision support to human reviewers. We never auto-reject applicants; our goal is to highlight verified strengths and focus live engineering interviews.",
  },
];
