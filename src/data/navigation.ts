import type { FooterLinkGroup, NavItem } from "@/types/platform";
import { SECTION_IDS } from "@/lib/constants";

export const PRIMARY_NAV_ITEMS: ReadonlyArray<NavItem> = [
  { label: "Platform", href: `#${SECTION_IDS.solution}` },
  { label: "Proof Card", href: `#${SECTION_IDS.proofCard}` },
  { label: "For Candidates", href: `#${SECTION_IDS.candidates}` },
  { label: "For Recruiters", href: `#${SECTION_IDS.recruiters}` },
  { label: "Trust & Ethics", href: `#${SECTION_IDS.trust}` },
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
