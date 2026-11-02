"use client";

import { useState } from "react";
import { User } from "firebase/auth";
import { UserProfile } from "@/types/dashboard";
import { StudentRepoAiForensics } from "./StudentRepoAiForensics";
import { SkillProofCard } from "@/components/product-demo/SkillProofCard";
import {
  CandidateRepoItem,
  CandidateApplicationItem,
  OpenDriveItem,
  MockVivaQuestion,
  INITIAL_CANDIDATE_REPOS,
  INITIAL_CANDIDATE_APPLICATIONS,
  INITIAL_OPEN_DRIVES,
  MOCK_VIVA_QUESTIONS,
} from "@/data/dashboard-demo-data";
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  Award,
  Bot,
  BrainCircuit,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  Copy,
  ExternalLink,
  FileCode2,
  Filter,
  GitBranch,
  Github,
  GraduationCap,
  Play,
  Plus,
  RefreshCw,
  Search,
  Share2,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Terminal,
  TrendingUp,
  UploadCloud,
  X,
} from "lucide-react";

interface StudentDashboardProps {
  user: User;
  profile: UserProfile | null;
}

export function StudentDashboard({ user, profile }: StudentDashboardProps) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "forensics" | "repos" | "drives" | "assessments" | "proofcard"
  >("overview");

  // Repositories State
  const [repos, setRepos] = useState<CandidateRepoItem[]>(INITIAL_CANDIDATE_REPOS);
  const [showAddRepo, setShowAddRepo] = useState(false);
  const [newRepoUrl, setNewRepoUrl] = useState("");
  const [newRepoName, setNewRepoName] = useState("");
  const [selectedRepoForDetail, setSelectedRepoForDetail] = useState<CandidateRepoItem | null>(null);
  const [scanningRepoId, setScanningRepoId] = useState<string | null>(null);

  // Applications & Drives State
  const [applications, setApplications] = useState<CandidateApplicationItem[]>(INITIAL_CANDIDATE_APPLICATIONS);
  const [applicationFilter, setApplicationFilter] = useState<"all" | "offcampus" | "campus">("all");
  const [showBrowseDrives, setShowBrowseDrives] = useState(false);
  const [openDrives, setOpenDrives] = useState<OpenDriveItem[]>(INITIAL_OPEN_DRIVES);
  const [appliedDriveNotice, setAppliedDriveNotice] = useState<string | null>(null);

  // AI Viva Simulator State
  const [vivaRepo, setVivaRepo] = useState<string>("distributed-event-mesh");
  const [activeVivaQuestionIdx, setActiveVivaQuestionIdx] = useState<number>(0);
  const [candidateDefenseText, setCandidateDefenseText] = useState<string>("");
  const [isEvaluatingViva, setIsEvaluatingViva] = useState<boolean>(false);
  const [vivaEvaluationResult, setVivaEvaluationResult] = useState<{
    score: number;
    depth: number;
    tradeoff: number;
    originality: number;
    feedback: string;
  } | null>(null);

  // Proof Card Share State
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);

  // Handlers
  function handleAddRepoSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newRepoName.trim()) return;

    const newRepo: CandidateRepoItem = {
      id: `repo-${Date.now()}`,
      name: newRepoName.trim(),
      language: "TypeScript / Node.js",
      commits: 54,
      linesOfCode: 4210,
      lastAudit: "Just now",
      score: 91,
      status: "Verified Clean Architecture",
      authorship: "98% Original Commits",
      aiPercent: 5,
      tutorialMatchPercent: 0,
      description: newRepoUrl ? `Connected repository: ${newRepoUrl}` : "Custom verified engineering project.",
      primaryFiles: ["src/index.ts", "src/service.ts", "tests/unit.test.ts"],
    };

    setRepos((prev) => [newRepo, ...prev]);
    setNewRepoName("");
    setNewRepoUrl("");
    setShowAddRepo(false);
  }

  function handleRescanRepo(repoId: string) {
    setScanningRepoId(repoId);
    setTimeout(() => {
      setRepos((prev) =>
        prev.map((r) =>
          r.id === repoId ? { ...r, lastAudit: "Just now", score: Math.min(99, r.score + 1) } : r
        )
      );
      setScanningRepoId(null);
    }, 1500);
  }

  function handleApplyToDrive(drive: OpenDriveItem) {
    if (applications.some((app) => app.company.toLowerCase() === drive.company.toLowerCase())) {
      setAppliedDriveNotice(`You have already applied to ${drive.company}!`);
      setTimeout(() => setAppliedDriveNotice(null), 3000);
      return;
    }

    const newApp: CandidateApplicationItem = {
      id: `app-${Date.now()}`,
      company: drive.company,
      logoText: drive.company.slice(0, 2).toUpperCase(),
      type: drive.type,
      role: drive.role,
      status: "Proof Card Submitted",
      statusColor: "bg-emerald-500/15 text-emerald-800 border-emerald-500/20",
      date: "Just now",
      matchScore: 95,
      tag: drive.type === "campus" ? "Campus Placement Drive" : "Off-Campus Direct",
      location: drive.location,
      ctc: drive.ctc,
    };

    setApplications((prev) => [newApp, ...prev]);
    setAppliedDriveNotice(`Successfully applied to ${drive.company} for ${drive.role}!`);
    setTimeout(() => setAppliedDriveNotice(null), 3500);
  }

  function handleSubmitVivaDefense(e: React.FormEvent) {
    e.preventDefault();
    if (!candidateDefenseText.trim()) return;

    setIsEvaluatingViva(true);
    setTimeout(() => {
      setIsEvaluatingViva(false);
      setVivaEvaluationResult({
        score: 94,
        depth: 95,
        tradeoff: 92,
        originality: 98,
        feedback:
          "Exceptional technical depth. Correctly articulated quorum lease renewal and split-brain protection without generic AI boilerplate phrasing.",
      });
    }, 1400);
  }

  function handleCopyProofUrl() {
    navigator.clipboard?.writeText(`https://checktalent.dev/proof/${user.displayName || "candidate-2026"}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  }

  function handleCopyEmbed() {
    navigator.clipboard?.writeText(
      `<iframe src="https://checktalent.dev/embed/${user.displayName || "candidate-2026"}" width="480" height="320" frameborder="0"></iframe>`
    );
    setCopiedEmbed(true);
    setTimeout(() => setCopiedEmbed(false), 2000);
  }

  const filteredApps =
    applicationFilter === "all"
      ? applications
      : applications.filter((app) => app.type === applicationFilter);

  const activeVivaQuestion =
    MOCK_VIVA_QUESTIONS[activeVivaQuestionIdx] || MOCK_VIVA_QUESTIONS[0] || {
      id: "q-default",
      repoName: "distributed-event-mesh",
      fileAnchor: "broker.go:142",
      question: "In broker.go line 142, explain your Raft quorum handling when network partitions occur.",
      concept: "Consensus",
      suggestedPoints: [],
    };

  return (
    <div className="space-y-8">
      {/* Candidate Profile Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl border border-[#1C1613]/10 bg-white p-6 shadow-sm sm:p-8">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#D9481E]/5 blur-3xl pointer-events-none" />

        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D9481E]/20 bg-[#D9481E]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#D9481E]">
                <GraduationCap className="h-3.5 w-3.5" />
                Candidate Workspace
              </span>

              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-700">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Verified Candidate Profile
              </span>
            </div>

            <h1 className="aldrich-regular mt-3 text-3xl font-bold sm:text-4xl text-[#1C1613]">
              Welcome back, {user.displayName || user.email?.split("@")[0] || "Candidate"}!
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#756A62]">
              {profile?.institution ? `Student/Alum at ${profile.institution}` : "Active Developer & Candidate"}{" "}
              {profile?.targetRole ? `• Specializing in ${profile.targetRole}` : "• Proving skills through verifiable code"}.
              Your repository audits and interview evidence are active across campus and off-campus recruiters.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab("forensics")}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-[#E9A23B] to-[#D9481E] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:opacity-95"
            >
              <Bot className="h-4 w-4" />
              Upload Resume / Audit GitHub
            </button>

            <button
              onClick={() => setShowAddRepo(true)}
              className="flex items-center gap-2 rounded-xl bg-[#1C1613] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-black"
            >
              <Plus className="h-4 w-4" />
              Add Repository
            </button>

            <button
              onClick={() => setActiveTab("proofcard")}
              className="flex items-center gap-2 rounded-xl border border-[#1C1613]/15 bg-[#FAF7F2] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#1C1613] transition hover:bg-white"
            >
              <Share2 className="h-4 w-4 text-[#D9481E]" />
              Share Proof Card
            </button>
          </div>
        </div>

        {/* 4 Core Quick Metrics */}
        <div className="mt-8 grid grid-cols-2 gap-4 border-t border-[#1C1613]/10 pt-6 lg:grid-cols-4">
          <div className="rounded-2xl border border-[#1C1613]/5 bg-[#FAF7F2] p-4">
            <div className="flex items-center justify-between text-xs font-semibold text-[#756A62]">
              <span>Skill Proof Score</span>
              <Award className="h-4 w-4 text-[#D9481E]" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="aldrich-regular text-2xl font-bold text-[#1C1613] sm:text-3xl">92</span>
              <span className="text-xs font-bold text-emerald-600">Top 4%</span>
            </div>
            <p className="mt-1 text-[11px] text-[#8C8077]">Verified through 3,840 commits</p>
          </div>

          <div className="rounded-2xl border border-[#1C1613]/5 bg-[#FAF7F2] p-4">
            <div className="flex items-center justify-between text-xs font-semibold text-[#756A62]">
              <span>Audited Repositories</span>
              <Github className="h-4 w-4 text-[#1C1613]" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="aldrich-regular text-2xl font-bold text-[#1C1613] sm:text-3xl">{repos.length}</span>
              <span className="text-xs font-semibold text-emerald-600">All Passed</span>
            </div>
            <p className="mt-1 text-[11px] text-[#8C8077]">0% Plagiarism detected</p>
          </div>

          <div className="rounded-2xl border border-[#1C1613]/5 bg-[#FAF7F2] p-4">
            <div className="flex items-center justify-between text-xs font-semibold text-[#756A62]">
              <span>Active Applications</span>
              <Building2 className="h-4 w-4 text-[#E9A23B]" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="aldrich-regular text-2xl font-bold text-[#1C1613] sm:text-3xl">{applications.length}</span>
              <span className="text-xs font-semibold text-blue-600">2 In Final Rounds</span>
            </div>
            <p className="mt-1 text-[11px] text-[#8C8077]">2 Campus, 2 Off-Campus</p>
          </div>

          <div className="rounded-2xl border border-[#1C1613]/5 bg-[#FAF7F2] p-4">
            <div className="flex items-center justify-between text-xs font-semibold text-[#756A62]">
              <span>AI Technical Prep</span>
              <Bot className="h-4 w-4 text-purple-600" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="aldrich-regular text-2xl font-bold text-[#1C1613] sm:text-3xl">89%</span>
              <span className="text-xs font-semibold text-emerald-600">Ready</span>
            </div>
            <p className="mt-1 text-[11px] text-[#8C8077]">5 Mock sessions completed</p>
          </div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#1C1613]/10 pb-2">
        <button
          onClick={() => setActiveTab("overview")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition ${
            activeTab === "overview"
              ? "bg-[#D9481E] text-white shadow-sm"
              : "bg-white text-[#756A62] hover:bg-[#FAF7F2] hover:text-[#1C1613]"
          }`}
        >
          <TrendingUp className="h-4 w-4" />
          Overview & Skills
        </button>

        <button
          onClick={() => setActiveTab("forensics")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition ${
            activeTab === "forensics"
              ? "bg-[#D9481E] text-white shadow-sm"
              : "bg-white text-[#756A62] hover:bg-[#FAF7F2] hover:text-[#1C1613]"
          }`}
        >
          <Bot className="h-4 w-4" />
          <span>Resume & AI Forensics</span>
          <span className="rounded-full bg-emerald-500 px-1.5 py-0.2 text-[9px] font-extrabold text-white">
            AI Scanner
          </span>
        </button>

        <button
          onClick={() => setActiveTab("repos")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition ${
            activeTab === "repos"
              ? "bg-[#D9481E] text-white shadow-sm"
              : "bg-white text-[#756A62] hover:bg-[#FAF7F2] hover:text-[#1C1613]"
          }`}
        >
          <GitBranch className="h-4 w-4" />
          Audited Repositories ({repos.length})
        </button>

        <button
          onClick={() => setActiveTab("drives")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition ${
            activeTab === "drives"
              ? "bg-[#D9481E] text-white shadow-sm"
              : "bg-white text-[#756A62] hover:bg-[#FAF7F2] hover:text-[#1C1613]"
          }`}
        >
          <Building2 className="h-4 w-4" />
          Drives & Applications ({applications.length})
        </button>

        <button
          onClick={() => setActiveTab("assessments")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition ${
            activeTab === "assessments"
              ? "bg-[#D9481E] text-white shadow-sm"
              : "bg-white text-[#756A62] hover:bg-[#FAF7F2] hover:text-[#1C1613]"
          }`}
        >
          <BrainCircuit className="h-4 w-4" />
          AI Mock Interviews
        </button>

        <button
          onClick={() => setActiveTab("proofcard")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition ${
            activeTab === "proofcard"
              ? "bg-[#D9481E] text-white shadow-sm"
              : "bg-white text-[#756A62] hover:bg-[#FAF7F2] hover:text-[#1C1613]"
          }`}
        >
          <Award className="h-4 w-4" />
          Public Proof Card
        </button>
      </div>

      {/* Tab: Resume & AI Forensics Scanner */}
      {activeTab === "forensics" && (
        <StudentRepoAiForensics user={user} profile={profile} />
      )}

      {/* Tab 1: Overview */}
      {activeTab === "overview" && (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left 2 Cols: Verified Skills & Matrix */}
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-3xl border border-[#1C1613]/10 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="aldrich-regular text-lg font-bold text-ink">
                    Verified Competencies Matrix
                  </h3>
                  <p className="text-xs text-[#756A62]">
                    Synthesized from your committed code, AST inspection, and complexity graphs.
                  </p>
                </div>
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
                  Updated Today
                </span>
              </div>

              <div className="mt-6 space-y-4">
                {[
                  {
                    skill: "React & Next.js Ecosystem",
                    score: 96,
                    level: "Expert",
                    evidence: "Server Components, Suspense streams, Tailwind optimization in talentlens-evaluator",
                  },
                  {
                    skill: "Go & Distributed Systems",
                    score: 92,
                    level: "Advanced",
                    evidence: "Channel synchronization, lock-free queues, TCP socket buffers in distributed-event-mesh",
                  },
                  {
                    skill: "TypeScript Type Systems",
                    score: 94,
                    level: "Expert",
                    evidence: "Strict mode zero `any`, recursive mapped types, branded primitive types",
                  },
                  {
                    skill: "PostgreSQL & Database Design",
                    score: 88,
                    level: "Proficient",
                    evidence: "ACID transactions, composite index tuning, connection pool optimization",
                  },
                  {
                    skill: "Rust & Memory Safety",
                    score: 85,
                    level: "Proficient",
                    evidence: "Zero unsafe blocks, custom lifetime annotations, borrow-checker compliant",
                  },
                ].map((item, i) => (
                  <div key={i} className="rounded-2xl border border-[#1C1613]/5 bg-[#FAF7F2]/60 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#1C1613]">{item.skill}</span>
                        <span className="rounded-md bg-white px-2 py-0.5 text-[10px] font-bold uppercase text-[#D9481E]">
                          {item.level}
                        </span>
                      </div>
                      <span className="aldrich-regular text-sm font-bold text-[#D9481E]">
                        {item.score}/100
                      </span>
                    </div>

                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#1C1613]/10">
                      <div
                        className="h-full rounded-full bg-[#D9481E]"
                        style={{ width: `${item.score}%` }}
                      />
                    </div>

                    <p className="mt-2 text-xs text-[#756A62]">
                      <strong className="text-[#52463F]">Verified Evidence:</strong> {item.evidence}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity Timeline */}
            <div className="rounded-3xl border border-[#1C1613]/10 bg-white p-6 shadow-sm">
              <h3 className="aldrich-regular text-lg font-bold text-ink">Recent Verification Timeline</h3>
              <p className="text-xs text-[#756A62]">Automated events logged across git activity and recruiter actions.</p>

              <div className="mt-5 space-y-4">
                {[
                  {
                    time: "2 hours ago",
                    event: "Audited repository 'distributed-event-mesh'",
                    detail: "Raft consensus module passed AST syntax inspection. AI code ratio: 4%.",
                    icon: GitBranch,
                    color: "text-emerald-600 bg-emerald-50",
                  },
                  {
                    time: "Yesterday",
                    event: "Shortlisted by Morgan Stanley for Campus Drive",
                    detail: "Cleared proof score cutoff of 85+. OA scheduled for Nov 12.",
                    icon: Building2,
                    color: "text-blue-600 bg-blue-50",
                  },
                  {
                    time: "2 days ago",
                    event: "Completed AI Technical Viva on LSM Engine",
                    detail: "Evaluated 3 questions on memory-mapped file buffers. Score: 94/100.",
                    icon: Bot,
                    color: "text-purple-600 bg-purple-50",
                  },
                  {
                    time: "Nov 1, 2026",
                    event: "Generated SHA-256 Proof Card Signature",
                    detail: "Cryptographic credential signed and published for external verification.",
                    icon: ShieldCheck,
                    color: "text-orange-600 bg-orange-50",
                  },
                ].map((act, i) => {
                  const Icon = act.icon;
                  return (
                    <div key={i} className="flex items-start gap-3.5 border-b border-[#1C1613]/5 pb-3.5 last:border-0 last:pb-0">
                      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${act.color}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-ink">{act.event}</p>
                          <span className="text-[10px] font-mono text-[#8C8077]">{act.time}</span>
                        </div>
                        <p className="text-[11px] text-[#756A62] mt-0.5">{act.detail}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Col: Candidate Profile & Quick Actions */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-[#1C1613]/10 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3.5">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D9481E]/15 text-2xl font-bold text-[#D9481E]">
                  {(user.displayName || user.email || "C").charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-ink">{user.displayName || "Aditya Sharma"}</h3>
                  <p className="text-xs text-[#756A62]">{user.email}</p>
                  <span className="mt-1 inline-block rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                    Active Job Seeker
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-3 border-t border-[#1C1613]/10 pt-4 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#756A62]">Target Role</span>
                  <span className="font-semibold text-ink">
                    {profile?.targetRole || "Full-Stack Engineer"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#756A62]">Institution</span>
                  <span className="font-semibold text-ink">
                    {profile?.institution || "Apex Institute of Tech"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#756A62]">Passing Batch</span>
                  <span className="font-semibold text-ink">{profile?.batchYear || "Class of 2026"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#756A62]">Verified USN / ID</span>
                  <span className="font-mono font-semibold text-ink">1AP22CS042</span>
                </div>
              </div>

              <div className="mt-6 space-y-2.5">
                <button
                  onClick={() => setActiveTab("forensics")}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#D9481E] py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#B93615]"
                >
                  <UploadCloud className="h-4 w-4" />
                  Run AI Forensics Scanner
                </button>
                <button
                  onClick={() => setActiveTab("assessments")}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#1C1613]/15 bg-white py-2.5 text-xs font-bold uppercase tracking-wider text-ink transition hover:bg-[#FAF7F2]"
                >
                  <BrainCircuit className="h-4 w-4 text-[#D9481E]" />
                  Practice Code Defense Viva
                </button>
              </div>
            </div>

            {/* Quick Share Card */}
            <div className="rounded-3xl border border-orange-300/80 bg-gradient-to-br from-yellow-50/80 via-white to-orange-50/60 p-6 shadow-xs">
              <div className="flex items-center gap-2 text-orange-900 font-bold text-xs uppercase tracking-wider">
                <Sparkles className="h-4 w-4 text-[#D9481E]" />
                Public Verification Link
              </div>
              <p className="mt-2 text-xs text-[#756A62]">
                Include this verified credential in your resume header or LinkedIn to bypass keyword ATS screeners.
              </p>

              <div className="mt-4 flex items-center justify-between rounded-xl border border-orange-200 bg-white p-2.5 text-xs">
                <span className="truncate font-mono text-[11px] text-[#52463F] max-w-[190px]">
                  checktalent.dev/proof/{user.displayName || "candidate-2026"}
                </span>
                <button
                  onClick={handleCopyProofUrl}
                  className="flex items-center gap-1 font-bold text-[#D9481E] hover:underline"
                >
                  <Copy className="h-3.5 w-3.5" />
                  {copiedLink ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Audited Repositories Management */}
      {activeTab === "repos" && (
        <div className="space-y-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="aldrich-regular text-2xl font-bold text-ink">
                Audited GitHub Repositories ({repos.length})
              </h2>
              <p className="text-xs text-[#756A62]">
                Every connected repository is continuously inspected for genuine authorship, AI code ratio, and tutorial template overlap.
              </p>
            </div>

            <button
              onClick={() => setShowAddRepo(true)}
              className="flex items-center gap-2 rounded-xl bg-[#D9481E] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-[#B93615]"
            >
              <Plus className="h-4 w-4" />
              Connect Another Repo
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {repos.map((repo) => {
              const isScanning = scanningRepoId === repo.id;
              return (
                <div
                  key={repo.id}
                  className="flex flex-col justify-between rounded-3xl border border-[#1C1613]/10 bg-white p-6 shadow-sm transition hover:border-[#D9481E]/50"
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <Github className="h-4 w-4 text-ink" />
                          <h3 className="aldrich-regular text-lg font-bold text-ink">{repo.name}</h3>
                        </div>
                        <span className="mt-1 inline-block font-mono text-xs text-[#8C8077]">
                          {repo.language} • {repo.commits} commits • {repo.linesOfCode.toLocaleString()} LOC
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="aldrich-regular text-xl font-bold text-[#D9481E]">
                          {repo.score}/100
                        </span>
                        <p className="text-[10px] text-[#756A62]">Proof Score</p>
                      </div>
                    </div>

                    <p className="mt-3 text-xs leading-relaxed text-[#756A62]">{repo.description}</p>

                    {/* Forensics Metrics Grid */}
                    <div className="mt-4 grid grid-cols-2 gap-2 rounded-2xl bg-[#FAF7F2] p-3 text-xs">
                      <div>
                        <span className="text-[11px] text-[#756A62]">AI Code Ratio</span>
                        <p className="font-bold text-emerald-700">{repo.aiPercent}% (Human Driven)</p>
                      </div>
                      <div>
                        <span className="text-[11px] text-[#756A62]">Tutorial Match</span>
                        <p className="font-bold text-emerald-700">{repo.tutorialMatchPercent}% Plagiarism</p>
                      </div>
                      <div>
                        <span className="text-[11px] text-[#756A62]">Authorship</span>
                        <p className="font-bold text-ink">{repo.authorship}</p>
                      </div>
                      <div>
                        <span className="text-[11px] text-[#756A62]">Last Audited</span>
                        <p className="font-bold text-ink">{repo.lastAudit}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-[#1C1613]/10 pt-4 text-xs">
                    <button
                      onClick={() => setSelectedRepoForDetail(repo)}
                      className="font-bold text-[#D9481E] hover:underline flex items-center gap-1"
                    >
                      <FileCode2 className="h-3.5 w-3.5" />
                      Inspect Code Breakdown &rarr;
                    </button>

                    <button
                      onClick={() => handleRescanRepo(repo.id)}
                      disabled={isScanning}
                      className="flex items-center gap-1.5 rounded-lg border border-[#1C1613]/15 bg-white px-3 py-1.5 font-semibold text-ink hover:bg-[#FAF7F2]"
                    >
                      <RefreshCw className={`h-3 w-3 ${isScanning ? "animate-spin text-[#D9481E]" : ""}`} />
                      <span>{isScanning ? "Scanning..." : "Re-Scan"}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Drives & Job Applications */}
      {activeTab === "drives" && (
        <div className="space-y-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="aldrich-regular text-2xl font-bold text-ink">
                Hiring Drives & Applications ({applications.length})
              </h2>
              <p className="text-xs text-[#756A62]">
                Track direct applications to off-campus tech employers and visiting campus placement drives.
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setShowBrowseDrives(true)}
                className="flex items-center gap-2 rounded-xl bg-[#D9481E] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-[#B93615]"
              >
                <Search className="h-4 w-4" />
                Browse & Apply to Open Drives
              </button>
            </div>
          </div>

          {appliedDriveNotice && (
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-50 p-4 text-xs font-semibold text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>{appliedDriveNotice}</span>
            </div>
          )}

          {/* Filter Pills */}
          <div className="flex items-center gap-2">
            {(["all", "offcampus", "campus"] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setApplicationFilter(filter)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold capitalize transition ${
                  applicationFilter === filter
                    ? "bg-[#1C1613] text-white"
                    : "bg-white border border-[#1C1613]/10 text-[#756A62] hover:bg-[#FAF7F2]"
                }`}
              >
                {filter === "all" ? "All Drives" : filter === "offcampus" ? "Off-Campus Direct" : "Campus Drives"}
              </button>
            ))}
          </div>

          {/* Applications Grid */}
          <div className="grid gap-4 md:grid-cols-2">
            {filteredApps.map((app) => (
              <div
                key={app.id}
                className="flex flex-col justify-between rounded-3xl border border-[#1C1613]/10 bg-white p-6 shadow-sm"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FAF7F2] font-mono text-sm font-bold text-[#D9481E] border border-[#1C1613]/10">
                        {app.logoText}
                      </div>
                      <div>
                        <h3 className="font-bold text-ink">{app.company}</h3>
                        <p className="text-xs text-[#756A62]">{app.role}</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-[#D9481E]/10 px-2.5 py-1 text-[11px] font-bold text-[#D9481E]">
                      {app.matchScore}% Match
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px]">
                    <span className="rounded-md bg-[#FAF7F2] px-2 py-0.5 font-medium text-[#756A62]">
                      {app.location}
                    </span>
                    <span className="rounded-md bg-[#FAF7F2] px-2 py-0.5 font-medium text-[#756A62]">
                      {app.ctc}
                    </span>
                    <span className="rounded-md bg-stone-100 px-2 py-0.5 font-medium text-stone-700">
                      {app.tag}
                    </span>
                  </div>

                  <div className="mt-4 rounded-xl border border-[#1C1613]/5 bg-[#FAF7F2] p-3 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[#756A62]">Application Status:</span>
                      <span className={`rounded-md px-2 py-0.5 font-bold ${app.statusColor}`}>
                        {app.status}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center justify-between text-[11px] text-[#8C8077]">
                      <span>Timeline:</span>
                      <span>{app.date}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-[#1C1613]/10 pt-3 text-xs">
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5" /> Proof Card Attached
                  </span>
                  <button
                    onClick={() => setActiveTab("assessments")}
                    className="font-bold text-[#D9481E] hover:underline"
                  >
                    Prepare Technical Viva &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: AI Mock Technical Interview Simulator */}
      {activeTab === "assessments" && (
        <div className="space-y-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="aldrich-regular text-2xl font-bold text-ink">
                AI Technical Code Viva Simulator
              </h2>
              <p className="text-xs text-[#756A62]">
                Our AI inspects lines in your actual repositories and tests whether you can defend trade-offs, architecture, and edge cases.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-[#756A62]">Select Target Repository:</span>
              <select
                value={vivaRepo}
                onChange={(e) => {
                  setVivaRepo(e.target.value);
                  setVivaEvaluationResult(null);
                  setCandidateDefenseText("");
                }}
                className="rounded-xl border border-[#1C1613]/15 bg-white px-3 py-1.5 text-xs font-semibold text-ink"
              >
                <option value="distributed-event-mesh">distributed-event-mesh (Go)</option>
                <option value="talentlens-evaluator">talentlens-evaluator (TypeScript)</option>
                <option value="zero-copy-kv-engine">zero-copy-kv-engine (Rust)</option>
              </select>
            </div>
          </div>

          {/* Viva Stage Box */}
          <div className="rounded-3xl border border-orange-300 bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#1C1613]/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-800">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-ink text-sm sm:text-base">
                    AI Code Defense Prompt (Line-Anchored)
                  </h3>
                  <span className="font-mono text-xs text-[#D9481E]">
                    Anchor: {activeVivaQuestion.fileAnchor} • {activeVivaQuestion.concept}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {MOCK_VIVA_QUESTIONS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveVivaQuestionIdx(idx);
                      setVivaEvaluationResult(null);
                      setCandidateDefenseText("");
                    }}
                    className={`h-7 w-7 rounded-lg text-xs font-bold transition ${
                      activeVivaQuestionIdx === idx
                        ? "bg-[#D9481E] text-white"
                        : "bg-[#FAF7F2] text-[#756A62] hover:bg-stone-200"
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 rounded-2xl bg-[#FAF7F2] p-4 text-sm font-medium text-ink leading-relaxed">
              "{activeVivaQuestion.question}"
            </div>

            <form onSubmit={handleSubmitVivaDefense} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#52463F] mb-1.5">
                  Your Technical Defense & Architecture Explanation:
                </label>
                <textarea
                  rows={4}
                  value={candidateDefenseText}
                  onChange={(e) => setCandidateDefenseText(e.target.value)}
                  placeholder="Explain your trade-offs, how you avoided race conditions or split-brain states, and why this design choice was optimal..."
                  className="w-full rounded-2xl border border-[#1C1613]/15 p-3.5 text-xs leading-relaxed focus:border-[#D9481E] focus:outline-none"
                  required
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-[11px] text-[#8C8077]">
                  <Sparkles className="h-3.5 w-3.5 text-[#D9481E]" />
                  <span>Evaluates Trade-Off Reasoning, AST Depth, and Non-AI Authenticity</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setCandidateDefenseText(
                        "In this implementation, we enforce a strict majority quorum of (N/2)+1 nodes before accepting log commits. Split-brain is prevented because only one partition can ever assemble a majority. Stale leaders drop their lease as soon as a higher term counter is broadcasted over TCP."
                      )
                    }
                    className="text-xs text-[#756A62] hover:underline"
                  >
                    Insert Sample Strong Defense
                  </button>
                  <button
                    type="submit"
                    disabled={isEvaluatingViva || !candidateDefenseText.trim()}
                    className="flex items-center gap-2 rounded-xl bg-[#D9481E] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-[#B93615] disabled:opacity-50"
                  >
                    {isEvaluatingViva ? (
                      <>
                        <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                        Analyzing Defense...
                      </>
                    ) : (
                      <>
                        <Play className="h-3.5 w-3.5" />
                        Submit for AI Evaluation
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>

            {/* Viva Evaluation Results */}
            {vivaEvaluationResult && (
              <div className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-50/50 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    <h4 className="font-bold text-emerald-950 text-sm">
                      AI Code Defense Evaluation: Verified Pass
                    </h4>
                  </div>
                  <span className="aldrich-regular text-2xl font-bold text-emerald-700">
                    {vivaEvaluationResult.score}/100
                  </span>
                </div>

                <p className="text-xs leading-relaxed text-[#52463F]">
                  {vivaEvaluationResult.feedback}
                </p>

                <div className="grid grid-cols-3 gap-3 border-t border-emerald-500/20 pt-3 text-center text-xs">
                  <div>
                    <span className="text-[#756A62]">Architecture Depth</span>
                    <p className="font-bold text-emerald-800">{vivaEvaluationResult.depth}%</p>
                  </div>
                  <div>
                    <span className="text-[#756A62]">Trade-Off Reasoning</span>
                    <p className="font-bold text-emerald-800">{vivaEvaluationResult.tradeoff}%</p>
                  </div>
                  <div>
                    <span className="text-[#756A62]">Originality Confidence</span>
                    <p className="font-bold text-emerald-800">{vivaEvaluationResult.originality}%</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 5: Public Verifiable Skill Proof Card */}
      {activeTab === "proofcard" && (
        <div className="space-y-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="aldrich-regular text-2xl font-bold text-ink">
                Cryptographic Skill Proof Card
              </h2>
              <p className="text-xs text-[#756A62]">
                Your immutable, shareable credential cryptographically signed with SHA-256 for recruiter audits.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={handleCopyProofUrl}
                className="flex items-center gap-2 rounded-xl border border-[#1C1613]/15 bg-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-ink transition hover:bg-[#FAF7F2]"
              >
                <Copy className="h-3.5 w-3.5" />
                {copiedLink ? "Copied URL!" : "Copy Public Link"}
              </button>

              <button
                onClick={handleCopyEmbed}
                className="flex items-center gap-2 rounded-xl bg-[#D9481E] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-[#B93615]"
              >
                <Code2 className="h-3.5 w-3.5" />
                {copiedEmbed ? "Copied Embed Code!" : "Embed in Portfolio"}
              </button>
            </div>
          </div>

          {/* Proof Card Render */}
          <div className="rounded-3xl border border-[#1C1613]/10 bg-white p-6 sm:p-8 shadow-sm">
            <SkillProofCard />
          </div>
        </div>
      )}

      {/* MODAL 1: Connect Repository Modal */}
      {showAddRepo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-3xl border border-[#1C1613]/10 bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1C1613]/10 pb-3">
              <div className="flex items-center gap-2">
                <Github className="h-5 w-5 text-ink" />
                <h3 className="aldrich-regular text-lg font-bold text-ink">Connect GitHub Repo</h3>
              </div>
              <button
                onClick={() => setShowAddRepo(false)}
                className="rounded-lg p-1 text-[#756A62] hover:bg-[#FAF7F2]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleAddRepoSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#52463F] mb-1">Repository Name</label>
                <input
                  type="text"
                  placeholder="e.g. distributed-kv-store"
                  value={newRepoName}
                  onChange={(e) => setNewRepoName(e.target.value)}
                  className="w-full rounded-xl border border-[#1C1613]/15 px-3 py-2 text-xs focus:border-[#D9481E] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#52463F] mb-1">GitHub URL (Optional)</label>
                <input
                  type="url"
                  placeholder="https://github.com/username/repository"
                  value={newRepoUrl}
                  onChange={(e) => setNewRepoUrl(e.target.value)}
                  className="w-full rounded-xl border border-[#1C1613]/15 px-3 py-2 text-xs focus:border-[#D9481E] focus:outline-none"
                />
              </div>

              <p className="text-[11px] leading-relaxed text-[#756A62]">
                Our engine will clone the repo in sandbox, parse AST syntax trees, calculate cyclomatic complexity, and check against tutorial clone templates.
              </p>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddRepo(false)}
                  className="rounded-xl border border-[#1C1613]/15 px-4 py-2 text-xs font-semibold text-[#52463F] hover:bg-[#FAF7F2]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#D9481E] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#B93615]"
                >
                  Index & Audit Repo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Browse & 1-Click Apply to Open Drives */}
      {showBrowseDrives && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-[#1C1613]/10 bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1C1613]/10 pb-3">
              <div>
                <h3 className="aldrich-regular text-lg font-bold text-ink">Browse Open Hiring Drives</h3>
                <p className="text-xs text-[#756A62]">Apply directly with your cryptographically verified Proof Card.</p>
              </div>
              <button
                onClick={() => setShowBrowseDrives(false)}
                className="rounded-lg p-1 text-[#756A62] hover:bg-[#FAF7F2]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 space-y-4">
              {openDrives.map((drive) => {
                const isAlreadyApplied = applications.some(
                  (app) => app.company.toLowerCase() === drive.company.toLowerCase()
                );
                return (
                  <div
                    key={drive.id}
                    className="flex flex-col justify-between rounded-2xl border border-[#1C1613]/10 bg-[#FAF7F2]/60 p-4 transition hover:border-[#D9481E]"
                  >
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-ink">{drive.company}</span>
                            <span className="rounded-full bg-[#D9481E]/10 px-2 py-0.2 text-[10px] font-bold text-[#D9481E]">
                              {drive.type === "campus" ? "Campus Placement" : "Off-Campus Direct"}
                            </span>
                          </div>
                          <p className="text-xs font-semibold text-[#52463F] mt-0.5">{drive.role}</p>
                        </div>
                        <div className="text-right">
                          <span className="aldrich-regular text-sm font-bold text-[#D9481E]">
                            {drive.ctc}
                          </span>
                          <p className="text-[10px] text-[#756A62]">Min Score: {drive.minScore}</p>
                        </div>
                      </div>

                      <p className="mt-2 text-xs text-[#756A62]">{drive.description}</p>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {drive.requiredSkills.map((sk, i) => (
                          <span
                            key={i}
                            className="rounded-md border border-[#1C1613]/10 bg-white px-2 py-0.5 text-[10px] font-medium text-[#52463F]"
                          >
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-[#1C1613]/10 pt-3">
                      <span className="text-[11px] text-[#8C8077]">Deadline: {drive.deadline}</span>
                      <button
                        onClick={() => handleApplyToDrive(drive)}
                        disabled={isAlreadyApplied}
                        className={`rounded-xl px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition ${
                          isAlreadyApplied
                            ? "bg-emerald-100 text-emerald-800 cursor-not-allowed"
                            : "bg-[#D9481E] text-white hover:bg-[#B93615]"
                        }`}
                      >
                        {isAlreadyApplied ? "Applied ✓" : "1-Click Apply with Proof Card"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Repo Deep Dive Breakdown Drawer */}
      {selectedRepoForDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-xl rounded-3xl border border-[#1C1613]/10 bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1C1613]/10 pb-3">
              <div className="flex items-center gap-2">
                <FileCode2 className="h-5 w-5 text-[#D9481E]" />
                <h3 className="aldrich-regular text-lg font-bold text-ink">
                  Code Forensics Breakdown: {selectedRepoForDetail.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedRepoForDetail(null)}
                className="rounded-lg p-1 text-[#756A62] hover:bg-[#FAF7F2]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-3 gap-3 rounded-2xl bg-[#FAF7F2] p-3 text-center text-xs">
                <div>
                  <span className="text-[#756A62]">Proof Score</span>
                  <p className="aldrich-regular text-xl font-bold text-[#D9481E]">
                    {selectedRepoForDetail.score}/100
                  </p>
                </div>
                <div>
                  <span className="text-[#756A62]">AI Scaffolding</span>
                  <p className="text-xl font-bold text-emerald-700">{selectedRepoForDetail.aiPercent}%</p>
                </div>
                <div>
                  <span className="text-[#756A62]">Plagiarism</span>
                  <p className="text-xl font-bold text-emerald-700">0.0% Clean</p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-ink mb-2">Primary Module Files Audited:</h4>
                <div className="space-y-1.5 font-mono text-xs text-[#52463F]">
                  {selectedRepoForDetail.primaryFiles.map((file, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-lg border border-[#1C1613]/5 bg-[#FAF7F2] px-3 py-1.5"
                    >
                      <span>{file}</span>
                      <span className="text-[10px] font-bold text-emerald-600">Passed AST</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-emerald-500/20 bg-emerald-50/50 p-3 text-xs leading-relaxed text-emerald-950">
                <strong>AST Architecture Verification:</strong> Zero copied tutorial AST structures matched against 1.8M public repositories. Commits show progressive multi-week iterative development.
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setSelectedRepoForDetail(null)}
                  className="rounded-xl bg-[#1C1613] px-4 py-2 text-xs font-bold text-white hover:bg-black"
                >
                  Close Inspection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
