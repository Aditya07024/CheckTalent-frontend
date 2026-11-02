import type { FooterLinkGroup, NavItem } from "@/types/platform";
import { SECTION_IDS } from "@/lib/constants";

export const PRIMARY_NAV_ITEMS: ReadonlyArray<NavItem> = [
  { label: "3 Dashboards", href: "#dashboards" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "AI Forensics", href: "#forensics" },
  { label: "Proof Card", href: `#${SECTION_IDS.proofCard}` },
  { label: "FAQs", href: "#faq" },
];

export const FOOTER_LINK_GROUPS: ReadonlyArray<FooterLinkGroup> = [
  {
    heading: "Platform",
    links: [
      { label: "Verification Pipeline", href: `#${SECTION_IDS.solution}` },
      { label: "Sample Proof Card", href: `#${SECTION_IDS.proofCard}` },
      { label: "Trust & Governance", href: `#${SECTION_IDS.trust}` },
      { label: "Product Roadmap", href: `#${SECTION_IDS.roadmap}` },
      { label: "Frequently Asked Questions", href: `#${SECTION_IDS.faq}` },
    ],
  },
  {
    heading: "For Candidates",
    links: [
      { label: "Candidate Capabilities", href: `#${SECTION_IDS.candidates}` },
      { label: "Sample Proof Card", href: `#${SECTION_IDS.proofCard}` },
      { label: "Improvement Roadmap", href: `#${SECTION_IDS.roadmap}` },
      { label: "Alternative Evidence Path", href: `#${SECTION_IDS.faq}` },
      { label: "Join Early Access", href: `#${SECTION_IDS.earlyAccess}` },
    ],
  },
  {
    heading: "For Recruiters",
    links: [
      { label: "Recruiter Capabilities", href: `#${SECTION_IDS.recruiters}` },
      { label: "Verification Pipeline", href: `#${SECTION_IDS.solution}` },
      { label: "Fairness & Oversight", href: `#${SECTION_IDS.trust}` },
      { label: "Hiring Use Cases", href: `#${SECTION_IDS.useCases}` },
      { label: "Request Recruiter Access", href: `#${SECTION_IDS.earlyAccess}` },
    ],
  },
  {
    heading: "Governance & Legal",
    links: [
      {
        label: "Privacy Policy",
        href: "/privacy",
        },
      {
        label: "Terms of Use",
        href: "/terms",
        isPlaceholder: true,
        },
      {
        label: "Contact",
        href: "/contact",
        },
    ],
  },
];
