export type DashboardRole = "student" | "offcampus" | "campus";

export interface RoleConfig {
  id: DashboardRole;
  title: string;
  badgeLabel: string;
  subtitle: string;
  targetAudience: string;
  description: string;
  accentColor: string;
  iconName: string;
  highlights: string[];
}

export const ROLE_CONFIGS: Record<DashboardRole, RoleConfig> = {
  student: {
    id: "student",
    title: "Candidate Workspace",
    badgeLabel: "Job Seeker / Student",
    subtitle: "Candidate & Developer Workspace",
    targetAudience: "College Students, Job Seekers, Working Professionals",
    description:
      "Build verifiable skill proof, connect GitHub repositories, participate in campus & off-campus drives, and take AI technical interviews.",
    accentColor: "#D9481E",
    iconName: "GraduationCap",
    highlights: [
      "Verifiable Skill Proof Card & Code Audits",
      "Direct Applications to Off-Campus Companies",
      "Campus Placement Drive Schedules & Tests",
      "AI Technical Mock Interviews with Instant Feedback",
    ],
  },
  offcampus: {
    id: "offcampus",
    title: "Off-Campus Companies",
    badgeLabel: "Hiring Partner / Enterprise",
    subtitle: "Recruiter & Talent Discovery Portal",
    targetAudience: "Tech Startups, Enterprises, Off-Campus Recruiters",
    description:
      "Discover high-signal engineers through verified code evidence, post off-campus jobs, review deep repo analyses, and fast-track hiring.",
    accentColor: "#E9A23B",
    iconName: "Building2",
    highlights: [
      "Access pre-verified talent with audited GitHub repos",
      "Post off-campus job openings & paid internships",
      "Deep plagiarism & code authorship verification",
      "Technical interview scheduling & candidate pipeline",
    ],
  },
  campus: {
    id: "campus",
    title: "Campus",
    badgeLabel: "Placement Cell (TPO) / College",
    subtitle: "University & Placement Administration",
    targetAudience: "Universities, Engineering Colleges, Placement Officers",
    description:
      "Manage batch cohorts, track placement drive readiness, verify student technical skills at scale, and coordinate with visiting recruiters.",
    accentColor: "#DC2626",
    iconName: "School",
    highlights: [
      "Batch-wide skill audits and drive readiness scores",
      "Campus drive scheduling & round-by-round management",
      "Direct recruiter collaboration and slot management",
      "NIRF, NBA & NAAC accreditation placement reports",
    ],
  },
};

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
  role: DashboardRole | null;
  institution?: string;
  companyName?: string;
  headline?: string;
  department?: string;
  batchYear?: string;
  targetRole?: string;
  createdAt?: string;
  updatedAt?: string;
}
