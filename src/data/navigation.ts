import type { FooterLinkGroup, NavItem } from "@/types/platform";
import { SECTION_IDS } from "@/lib/constants";

export const PRIMARY_NAV_ITEMS: ReadonlyArray<NavItem> = [
  { label: "Platform", href: `#${SECTION_IDS.solution}` },
  { label: "Features", href: `#${SECTION_IDS.features}` },
  { label: "How It Works", href: `#${SECTION_IDS.howItWorks}` },
  { label: "For Recruiters", href: `#${SECTION_IDS.recruiters}` },
  { label: "For Candidates", href: `#${SECTION_IDS.candidates}` },
];

export const FOOTER_LINK_GROUPS: ReadonlyArray<FooterLinkGroup> = [
  {
    heading: "Platform",
    links: [
      { label: "Verification Pipeline", href: `#${SECTION_IDS.solution}` },
      { label: "Feature Explorer (38)", href: `#${SECTION_IDS.features}` },
      { label: "Sample Proof Card", href: `#${SECTION_IDS.proofCard}` },
      { label: "How It Works", href: `#${SECTION_IDS.howItWorks}` },
      { label: "Product Roadmap", href: `#${SECTION_IDS.roadmap}` },
    ],
  },
  {
    heading: "For Candidates",
    links: [
      { label: "Candidate Capabilities", href: `#${SECTION_IDS.candidates}` },
      { label: "Repository Intelligence", href: `#${SECTION_IDS.features}` },
      { label: "AI Technical Viva", href: `#${SECTION_IDS.features}` },
      { label: "Alternative Evidence Path", href: `#${SECTION_IDS.faq}` },
      { label: "Join Early Access", href: `#${SECTION_IDS.earlyAccess}` },
    ],
  },
  {
    heading: "For Recruiters",
    links: [
      { label: "Recruiter Capabilities", href: `#${SECTION_IDS.recruiters}` },
      { label: "Explainable Matching", href: `#${SECTION_IDS.features}` },
      { label: "Fairness & Oversight", href: `#${SECTION_IDS.trust}` },
      { label: "Hiring Use Cases", href: `#${SECTION_IDS.useCases}` },
      { label: "Request Recruiter Access", href: `#${SECTION_IDS.earlyAccess}` },
    ],
  },
  {
    heading: "Governance & Legal",
    links: [
      {
        label: "Privacy Policy (Placeholder)",
        href: "#privacy-placeholder",
        isPlaceholder: true,
        placeholderNotice:
          "Privacy documentation placeholder: Prior to launch, this policy will specify repository consent scopes, token revocation controls, retention windows, and candidate data deletion rights.",
      },
      {
        label: "Terms of Use (Placeholder)",
        href: "#terms-placeholder",
        isPlaceholder: true,
        placeholderNotice:
          "Terms of Use placeholder: Formal service terms governing candidate submissions, recruiter workspaces, and acceptable assessment usage will be published before general availability.",
      },
      {
        label: "Contact (Placeholder)",
        href: `#${SECTION_IDS.earlyAccess}`,
        isPlaceholder: true,
        placeholderNotice:
          "Contact channel placeholder: Use the early-access inquiry form above to reach the project team during the pre-release development phase.",
      },
    ],
  },
];
