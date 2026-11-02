/**
 * Complete Demo Data Suite for CheckTalent Dashboards
 * (Candidate, Off-Campus Companies, and Campus Placement Cell)
 *
 * Designed for Phase 1 (UI/UX with complete interactive demo states).
 * In Phase 2, simply replace these initial demo collections with live API / Supabase queries.
 */

export interface CandidateRepoItem {
  id: string;
  name: string;
  language: string;
  commits: number;
  linesOfCode: number;
  lastAudit: string;
  score: number;
  status: string;
  authorship: string;
  aiPercent: number;
  tutorialMatchPercent: number;
  description: string;
  primaryFiles: string[];
}

export interface CandidateApplicationItem {
  id: string;
  company: string;
  logoText: string;
  type: "offcampus" | "campus";
  role: string;
  status: string;
  statusColor: string;
  date: string;
  matchScore: number;
  tag: string;
  location: string;
  ctc: string;
}

export interface OpenDriveItem {
  id: string;
  company: string;
  role: string;
  type: "offcampus" | "campus";
  location: string;
  ctc: string;
  minScore: number;
  deadline: string;
  requiredSkills: string[];
  description: string;
}

export interface MockVivaQuestion {
  id: string;
  repoName: string;
  fileAnchor: string;
  question: string;
  concept: string;
  suggestedPoints: string[];
}

export interface RecruiterJobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-Time" | "Internship" | "Contract";
  salary: string;
  applicants: number;
  shortlisted: number;
  avgScore: number;
  status: "Active" | "Paused" | "Closed";
  skills: string[];
  minScore: number;
  createdDate: string;
}

export interface RecruiterCandidateItem {
  id: string;
  name: string;
  email: string;
  institution: string;
  targetRole: string;
  proofScore: number;
  reposAudited: number;
  plagiarism: string;
  aiPercentage: string;
  topSkills: string[];
  highlightRepo: string;
  status: "Shortlisted" | "Interview Scheduled" | "Offer Extended" | "Under Review";
  matchedJob: string;
  avatarColor: string;
}

export interface InterviewScheduleItem {
  id: string;
  candidateName: string;
  candidateRole: string;
  date: string;
  time: string;
  roundType: "Technical Viva" | "System Architecture" | "Founder Fit" | "Code Pairing";
  interviewer: string;
  meetingLink: string;
  status: "Scheduled" | "Completed" | "Feedback Pending";
  scorecardNotes?: string;
}

export interface CampusStudentItem {
  id: string;
  name: string;
  usn: string;
  department: "CSE" | "IT" | "ECE" | "AI/DS";
  cgpa: string;
  proofScore: number;
  reposVerified: number;
  status: "Placed" | "Shortlisted" | "Drive Ready" | "Needs Skill Audit";
  statusClass: string;
  companyPlaced?: string;
  skills: string[];
}

export interface CampusDriveItem {
  id: string;
  company: string;
  visitDate: string;
  role: string;
  packageCtc: string;
  cgpaCutoff: number;
  proofScoreCutoff: number;
  eligibleBranches: string[];
  registeredStudents: number;
  shortlistedCount: number;
  placedCount: number;
  status: "Upcoming" | "Active Today" | "Completed";
}

export interface CampusPartnerRecruiter {
  id: string;
  company: string;
  contactPerson: string;
  contactEmail: string;
  tier: "Tier 1 Super Dream" | "Tier 1 Dream" | "Tier 2 Mass";
  avgCtc: string;
  hiredPastYears: number;
  status: "Confirmed for 2026" | "Invited" | "Under Discussion";
}

/* =====================================================================
 * CANDIDATE / STUDENT DEMO DATA
 * ===================================================================== */

export const INITIAL_CANDIDATE_REPOS: CandidateRepoItem[] = [
  {
    id: "repo-1",
    name: "distributed-event-mesh",
    language: "Go / Redis",
    commits: 342,
    linesOfCode: 12450,
    lastAudit: "2 hours ago",
    score: 95,
    status: "Verified Clean Architecture",
    authorship: "100% Original Commits",
    aiPercent: 4,
    tutorialMatchPercent: 0,
    description: "High-throughput pub/sub broker handling 80k msgs/sec with Raft consensus and disk WAL.",
    primaryFiles: ["broker.go", "raft/node.go", "wal/segment.go", "bench_test.go"],
  },
  {
    id: "repo-2",
    name: "talentlens-evaluator",
    language: "TypeScript / Next.js",
    commits: 184,
    linesOfCode: 8920,
    lastAudit: "Yesterday",
    score: 92,
    status: "Production Standard",
    authorship: "Verified Commits",
    aiPercent: 6,
    tutorialMatchPercent: 0,
    description: "Explainable candidate evaluation system through AST parsing and AST code analysis.",
    primaryFiles: ["src/lib/ast-parser.ts", "src/hooks/useMetrics.ts", "src/components/Card.tsx"],
  },
  {
    id: "repo-3",
    name: "zero-copy-kv-engine",
    language: "Rust / C++",
    commits: 98,
    linesOfCode: 5640,
    lastAudit: "3 days ago",
    score: 89,
    status: "Memory-Safe & Audited",
    authorship: "98% Original Commits",
    aiPercent: 3,
    tutorialMatchPercent: 0,
    description: "LSM tree storage engine with mmap zero-copy reads, lock-free concurrency, and SSTables.",
    primaryFiles: ["src/engine.rs", "src/memtable.rs", "src/sstable.rs", "benches/read_throughput.rs"],
  },
  {
    id: "repo-4",
    name: "autonomous-cache-proxy",
    language: "Python / AsyncIO",
    commits: 74,
    linesOfCode: 3820,
    lastAudit: "1 week ago",
    score: 87,
    status: "Verified Clean",
    authorship: "97% Original Commits",
    aiPercent: 5,
    tutorialMatchPercent: 0,
    description: "Distributed LRU/LFU cache proxy with consistent hashing ring and health gossip.",
    primaryFiles: ["proxy/ring.py", "proxy/cache.py", "tests/test_invalidation.py"],
  },
];

export const INITIAL_CANDIDATE_APPLICATIONS: CandidateApplicationItem[] = [
  {
    id: "app-1",
    company: "Razorpay",
    logoText: "RZ",
    type: "offcampus",
    role: "SDE-1 (Backend Core)",
    status: "Technical Round Scheduled",
    statusColor: "bg-emerald-500/15 text-emerald-800 border-emerald-500/20",
    date: "Nov 8, 2026 - 11:30 AM",
    matchScore: 94,
    tag: "Off-Campus Direct",
    location: "Bengaluru (Hybrid)",
    ctc: "₹22 LPA - ₹30 LPA",
  },
  {
    id: "app-2",
    company: "Morgan Stanley",
    logoText: "MS",
    type: "campus",
    role: "Technology Analyst 2026",
    status: "Shortlisted for On-Campus OA",
    statusColor: "bg-blue-500/15 text-blue-800 border-blue-500/20",
    date: "Nov 12, 2026",
    matchScore: 91,
    tag: "Campus Placement Drive",
    location: "Campus Day 1",
    ctc: "₹26 LPA",
  },
  {
    id: "app-3",
    company: "Postman",
    logoText: "PM",
    type: "offcampus",
    role: "Frontend Performance Engineer",
    status: "Code Evidence Under Review",
    statusColor: "bg-amber-500/15 text-amber-800 border-amber-500/20",
    date: "Applied 2 days ago",
    matchScore: 96,
    tag: "Off-Campus Direct",
    location: "Remote (India)",
    ctc: "₹24 LPA - ₹34 LPA",
  },
  {
    id: "app-4",
    company: "TCS Digital",
    logoText: "TC",
    type: "campus",
    role: "Systems Engineer (High Package)",
    status: "Interview Round Cleared",
    statusColor: "bg-purple-500/15 text-purple-800 border-purple-500/20",
    date: "Result Awaited",
    matchScore: 88,
    tag: "Campus Placement Drive",
    location: "On-Campus",
    ctc: "₹9 LPA - ₹12 LPA",
  },
];

export const INITIAL_OPEN_DRIVES: OpenDriveItem[] = [
  {
    id: "drive-1",
    company: "CRED",
    role: "Backend Engineer (Go / Microservices)",
    type: "offcampus",
    location: "Bengaluru (On-Site)",
    ctc: "₹28 LPA - ₹40 LPA",
    minScore: 88,
    deadline: "Nov 15, 2026",
    requiredSkills: ["Go", "Distributed Systems", "Kafka", "PostgreSQL"],
    description: "Build ultra-low latency transaction processing systems handling 500k queries/sec with zero downtime.",
  },
  {
    id: "drive-2",
    company: "Swiggy",
    role: "Frontend Engineer (Next.js / Performance)",
    type: "offcampus",
    location: "Bengaluru / Remote",
    ctc: "₹20 LPA - ₹30 LPA",
    minScore: 85,
    deadline: "Nov 18, 2026",
    requiredSkills: ["React", "TypeScript", "Next.js", "Web Vitals"],
    description: "Architect high-performance consumer delivery web apps with sub-second LCP and edge rendering.",
  },
  {
    id: "drive-3",
    company: "Microsoft",
    role: "Software Development Engineer 2026",
    type: "campus",
    location: "Hyderabad / Noida",
    ctc: "₹45 LPA",
    minScore: 90,
    deadline: "Nov 22, 2026",
    requiredSkills: ["Data Structures", "C++ / Java", "System Design", "Cloud"],
    description: "Annual on-campus placement drive for Azure and Office365 engineering teams across India.",
  },
  {
    id: "drive-4",
    company: "Zerodha",
    role: "Systems & Infrastructure Associate",
    type: "offcampus",
    location: "Bengaluru",
    ctc: "₹18 LPA - ₹28 LPA",
    minScore: 86,
    deadline: "Nov 25, 2026",
    requiredSkills: ["Python", "Go", "Linux Internals", "Networking"],
    description: "Work on Kite trading platform internals, websockets, order matching pipelines, and zero-debt infrastructure.",
  },
];

export const MOCK_VIVA_QUESTIONS: MockVivaQuestion[] = [
  {
    id: "q-1",
    repoName: "distributed-event-mesh",
    fileAnchor: "broker.go:142",
    question: "In broker.go line 142, explain your Raft quorum handling when network partitions occur. How do you prevent split-brain elections?",
    concept: "Consensus & Split-Brain Prevention",
    suggestedPoints: [
      "Explicit majority quorum: (N/2)+1 votes required for leader election",
      "Term lease renewals and heartbeats over TCP channel",
      "Stale leaders stepped down immediately on seeing higher term counter",
    ],
  },
  {
    id: "q-2",
    repoName: "distributed-event-mesh",
    fileAnchor: "wal/segment.go:88",
    question: "Why did you implement mmap file memory mapping instead of standard buffered io.Writer in wal/segment.go?",
    concept: "OS File I/O & Memory Mapping",
    suggestedPoints: [
      "Avoids user-to-kernel memory buffer copies on disk commits",
      "OS handles page cache writeback asynchronously",
      "Crash recovery relies on fsync barrier before acknowledging client",
    ],
  },
  {
    id: "q-3",
    repoName: "talentlens-evaluator",
    fileAnchor: "src/lib/ast-parser.ts:65",
    question: "How does your AST visitor distinguish between auto-generated boilerplate and intentional custom logic in ast-parser.ts?",
    concept: "Static Code Analysis & Cyclomatic AST",
    suggestedPoints: [
      "Calculates branch depth and non-trivial variable mutations",
      "Identifies unedited schema definitions vs dynamic runtime logic",
      "Filters out framework-generated constructor patterns",
    ],
  },
];

/* =====================================================================
 * RECRUITER / OFFCAMPUS COMPANIES DEMO DATA
 * ===================================================================== */

export const INITIAL_RECRUITER_JOBS: RecruiterJobPosting[] = [
  {
    id: "job-1",
    title: "Senior Full-Stack Engineer (Next.js + Go)",
    department: "Core Engineering",
    location: "Bengaluru / Remote",
    type: "Full-Time",
    salary: "₹24 LPA - ₹38 LPA",
    applicants: 112,
    shortlisted: 19,
    avgScore: 89,
    status: "Active",
    skills: ["React", "Next.js", "Go", "PostgreSQL", "Docker"],
    minScore: 85,
    createdDate: "Oct 24, 2026",
  },
  {
    id: "job-2",
    title: "Backend Systems Engineer (Rust / Microservices)",
    department: "Platform Infrastructure",
    location: "Hyderabad (Hybrid)",
    type: "Full-Time",
    salary: "₹28 LPA - ₹45 LPA",
    applicants: 78,
    shortlisted: 14,
    avgScore: 92,
    status: "Active",
    skills: ["Rust", "Distributed Systems", "gRPC", "Redis"],
    minScore: 88,
    createdDate: "Oct 28, 2026",
  },
  {
    id: "job-3",
    title: "Software Engineer Intern (Batch of 2026)",
    department: "Product Engineering",
    location: "Remote (India)",
    type: "Internship",
    salary: "₹50k - ₹75k / month",
    applicants: 124,
    shortlisted: 22,
    avgScore: 86,
    status: "Active",
    skills: ["TypeScript", "React", "Node.js", "SQL"],
    minScore: 80,
    createdDate: "Nov 1, 2026",
  },
  {
    id: "job-4",
    title: "Frontend Performance Specialist",
    department: "Web Experience",
    location: "Bengaluru",
    type: "Full-Time",
    salary: "₹20 LPA - ₹32 LPA",
    applicants: 28,
    shortlisted: 7,
    avgScore: 91,
    status: "Active",
    skills: ["React 19", "Web Vitals", "Canvas / WebGL", "Tailwind"],
    minScore: 85,
    createdDate: "Nov 2, 2026",
  },
];

export const INITIAL_RECRUITER_CANDIDATES: RecruiterCandidateItem[] = [
  {
    id: "cand-1",
    name: "Aditya Sharma",
    email: "aditya.sharma@apex.edu",
    institution: "Apex Institute of Tech",
    targetRole: "Full-Stack Engineer",
    proofScore: 94,
    reposAudited: 4,
    plagiarism: "0.0%",
    aiPercentage: "4.2%",
    topSkills: ["Go (95%)", "React (96%)", "TypeScript (94%)", "PostgreSQL (88%)"],
    highlightRepo: "distributed-event-mesh (Go, 342 commits)",
    status: "Interview Scheduled",
    matchedJob: "Senior Full-Stack Engineer (Next.js + Go)",
    avatarColor: "bg-orange-500",
  },
  {
    id: "cand-2",
    name: "Ananya Iyer",
    email: "ananya.iyer@rvce.edu",
    institution: "RV College of Engineering",
    targetRole: "Backend Systems Engineer",
    proofScore: 96,
    reposAudited: 6,
    plagiarism: "0.0%",
    aiPercentage: "2.8%",
    topSkills: ["Rust (97%)", "Distributed Systems (94%)", "gRPC (92%)"],
    highlightRepo: "distributed-consensus-kv (Rust, 420 commits)",
    status: "Shortlisted",
    matchedJob: "Backend Systems Engineer (Rust / Microservices)",
    avatarColor: "bg-purple-500",
  },
  {
    id: "cand-3",
    name: "Rohan Varma",
    email: "rohan.varma@dce.edu",
    institution: "Delhi Technological University",
    targetRole: "Frontend Specialist",
    proofScore: 89,
    reposAudited: 5,
    plagiarism: "1.2%",
    aiPercentage: "6.5%",
    topSkills: ["Next.js (92%)", "TypeScript (90%)", "WebGL (85%)"],
    highlightRepo: "realtime-3d-dashboard (TypeScript, 160 commits)",
    status: "Under Review",
    matchedJob: "Frontend Performance Specialist",
    avatarColor: "bg-blue-500",
  },
  {
    id: "cand-4",
    name: "Sneha Kulkarni",
    email: "sneha.k@pict.edu",
    institution: "Pune Institute of Computer Tech",
    targetRole: "Software Engineer Intern",
    proofScore: 88,
    reposAudited: 3,
    plagiarism: "0.0%",
    aiPercentage: "5.1%",
    topSkills: ["TypeScript (89%)", "Node.js (88%)", "PostgreSQL (85%)"],
    highlightRepo: "collaborative-kanban-api (Node, 115 commits)",
    status: "Shortlisted",
    matchedJob: "Software Engineer Intern (Batch of 2026)",
    avatarColor: "bg-emerald-500",
  },
  {
    id: "cand-5",
    name: "Karan Patel",
    email: "karan.patel@nirma.edu",
    institution: "Nirma University",
    targetRole: "Full-Stack Developer",
    proofScore: 83,
    reposAudited: 2,
    plagiarism: "2.1%",
    aiPercentage: "11.4%",
    topSkills: ["React (85%)", "Python (82%)", "Django (80%)"],
    highlightRepo: "fintech-ledger-api (Python, 85 commits)",
    status: "Under Review",
    matchedJob: "Senior Full-Stack Engineer (Next.js + Go)",
    avatarColor: "bg-amber-500",
  },
];

export const INITIAL_INTERVIEW_SCHEDULE: InterviewScheduleItem[] = [
  {
    id: "int-1",
    candidateName: "Aditya Sharma",
    candidateRole: "Senior Full-Stack Engineer",
    date: "Nov 8, 2026",
    time: "11:30 AM IST",
    roundType: "Technical Viva",
    interviewer: "Siddharth Mehta (Principal Architect)",
    meetingLink: "https://meet.google.com/ckt-viva-102",
    status: "Scheduled",
  },
  {
    id: "int-2",
    candidateName: "Ananya Iyer",
    candidateRole: "Backend Systems Engineer",
    date: "Nov 9, 2026",
    time: "02:00 PM IST",
    roundType: "System Architecture",
    interviewer: "Pooja Reddy (Engineering Director)",
    meetingLink: "https://meet.google.com/ckt-arch-304",
    status: "Scheduled",
  },
  {
    id: "int-3",
    candidateName: "Rohan Varma",
    candidateRole: "Frontend Performance Specialist",
    date: "Nov 4, 2026",
    time: "04:30 PM IST",
    roundType: "Code Pairing",
    interviewer: "Arun Nair (Staff Frontend Eng)",
    meetingLink: "https://meet.google.com/ckt-pair-881",
    status: "Completed",
    scorecardNotes: "Strong mental model on SSR hydration & canvas loops. Score: 92/100.",
  },
];

/* =====================================================================
 * CAMPUS / PLACEMENT CELL (TPO) DEMO DATA
 * ===================================================================== */

export const INITIAL_CAMPUS_STUDENTS: CampusStudentItem[] = [
  {
    id: "std-1",
    name: "Aditya Sharma",
    usn: "1AP22CS042",
    department: "CSE",
    cgpa: "9.2",
    proofScore: 94,
    reposVerified: 4,
    status: "Shortlisted",
    statusClass: "bg-blue-100 text-blue-800",
    skills: ["React", "Go", "PostgreSQL"],
  },
  {
    id: "std-2",
    name: "Ananya Iyer",
    usn: "1AP22CS018",
    department: "CSE",
    cgpa: "9.5",
    proofScore: 96,
    reposVerified: 5,
    status: "Placed",
    statusClass: "bg-emerald-100 text-emerald-800",
    companyPlaced: "Amazon (₹28 LPA)",
    skills: ["Java", "Distributed Systems", "AWS"],
  },
  {
    id: "std-3",
    name: "Rohan Varma",
    usn: "1AP22IT089",
    department: "IT",
    cgpa: "8.6",
    proofScore: 89,
    reposVerified: 3,
    status: "Shortlisted",
    statusClass: "bg-purple-100 text-purple-800",
    skills: ["TypeScript", "Next.js", "Docker"],
  },
  {
    id: "std-4",
    name: "Sneha Kulkarni",
    usn: "1AP22EC034",
    department: "ECE",
    cgpa: "8.8",
    proofScore: 88,
    reposVerified: 3,
    status: "Drive Ready",
    statusClass: "bg-amber-100 text-amber-800",
    skills: ["C++", "Embedded Linux", "Python"],
  },
  {
    id: "std-5",
    name: "Karan Patel",
    usn: "1AP22IT102",
    department: "IT",
    cgpa: "7.9",
    proofScore: 78,
    reposVerified: 2,
    status: "Needs Skill Audit",
    statusClass: "bg-stone-200 text-stone-700",
    skills: ["Python", "Django", "SQL"],
  },
  {
    id: "std-6",
    name: "Priya Nair",
    usn: "1AP22CS076",
    department: "CSE",
    cgpa: "9.1",
    proofScore: 93,
    reposVerified: 4,
    status: "Placed",
    statusClass: "bg-emerald-100 text-emerald-800",
    companyPlaced: "Microsoft (₹44 LPA)",
    skills: ["C++", "System Architecture", "Azure"],
  },
  {
    id: "std-7",
    name: "Vikram Sengupta",
    usn: "1AP22AI012",
    department: "AI/DS",
    cgpa: "8.9",
    proofScore: 91,
    reposVerified: 3,
    status: "Drive Ready",
    statusClass: "bg-amber-100 text-amber-800",
    skills: ["PyTorch", "FastAPI", "NLP"],
  },
];

export const INITIAL_CAMPUS_DRIVES: CampusDriveItem[] = [
  {
    id: "cdrive-1",
    company: "Morgan Stanley",
    visitDate: "Nov 12, 2026",
    role: "Technology Analyst",
    packageCtc: "₹26 LPA",
    cgpaCutoff: 8.0,
    proofScoreCutoff: 85,
    eligibleBranches: ["CSE", "IT", "ECE"],
    registeredStudents: 142,
    shortlistedCount: 28,
    placedCount: 6,
    status: "Upcoming",
  },
  {
    id: "cdrive-2",
    company: "Microsoft India",
    visitDate: "Nov 20, 2026",
    role: "Software Development Engineer",
    packageCtc: "₹45 LPA",
    cgpaCutoff: 8.5,
    proofScoreCutoff: 90,
    eligibleBranches: ["CSE", "IT"],
    registeredStudents: 98,
    shortlistedCount: 16,
    placedCount: 4,
    status: "Upcoming",
  },
  {
    id: "cdrive-3",
    company: "TCS Digital / Prime",
    visitDate: "Oct 18, 2026",
    role: "Systems Specialist",
    packageCtc: "₹9 LPA - ₹12 LPA",
    cgpaCutoff: 7.0,
    proofScoreCutoff: 75,
    eligibleBranches: ["CSE", "IT", "ECE", "AI/DS"],
    registeredStudents: 310,
    shortlistedCount: 84,
    placedCount: 48,
    status: "Completed",
  },
  {
    id: "cdrive-4",
    company: "Razorpay",
    visitDate: "Nov 15, 2026",
    role: "Software Engineer - Backend Core",
    packageCtc: "₹24 LPA",
    cgpaCutoff: 7.5,
    proofScoreCutoff: 85,
    eligibleBranches: ["CSE", "IT", "AI/DS"],
    registeredStudents: 115,
    shortlistedCount: 21,
    placedCount: 0,
    status: "Upcoming",
  },
];

export const INITIAL_CAMPUS_RECRUITERS: CampusPartnerRecruiter[] = [
  {
    id: "rec-1",
    company: "Morgan Stanley",
    contactPerson: "Arjun Venkat",
    contactEmail: "campus.india@morganstanley.com",
    tier: "Tier 1 Super Dream",
    avgCtc: "₹26 LPA",
    hiredPastYears: 24,
    status: "Confirmed for 2026",
  },
  {
    id: "rec-2",
    company: "Amazon Web Services",
    contactPerson: "Divya Nambiar",
    contactEmail: "aws-campus-recruit@amazon.com",
    tier: "Tier 1 Super Dream",
    avgCtc: "₹28 LPA - ₹42 LPA",
    hiredPastYears: 36,
    status: "Confirmed for 2026",
  },
  {
    id: "rec-3",
    company: "Razorpay Software",
    contactPerson: "Rohit Malhotra",
    contactEmail: "earlytalent@razorpay.com",
    tier: "Tier 1 Dream",
    avgCtc: "₹22 LPA - ₹30 LPA",
    hiredPastYears: 18,
    status: "Confirmed for 2026",
  },
  {
    id: "rec-4",
    company: "Goldman Sachs",
    contactPerson: "Shalini Kapoor",
    contactEmail: "gs-india-campus@gs.com",
    tier: "Tier 1 Super Dream",
    avgCtc: "₹25 LPA - ₹32 LPA",
    hiredPastYears: 12,
    status: "Invited",
  },
];
