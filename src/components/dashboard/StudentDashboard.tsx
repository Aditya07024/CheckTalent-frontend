"use client";

import { useState } from "react";
import { User } from "firebase/auth";
import { UserProfile } from "@/types/dashboard";
import { StudentRepoAiForensics } from "./StudentRepoAiForensics";
import { ForensicsAuditResult } from "@/lib/github-analyzer";
import {
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
  GitBranch,
  Github,
  GraduationCap,
  Plus,
  School,
  Search,
  Share2,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Terminal,
  TrendingUp,
  UploadCloud,
  UserCheck,
} from "lucide-react";

interface StudentDashboardProps {
  user: User;
  profile: UserProfile | null;
}

export function StudentDashboard({ user, profile }: StudentDashboardProps) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "forensics" | "repos" | "drives" | "assessments" | "proofcard"
  >("overview");

  // State for Add Repo modal
  const [showAddRepo, setShowAddRepo] = useState(false);
  const [newRepoUrl, setNewRepoUrl] = useState("");
  const [newRepoName, setNewRepoName] = useState("");
  const [repos, setRepos] = useState([
    {
      id: "1",
      name: "distributed-event-mesh",
      language: "Go / Redis",
      commits: 342,
      lastAudit: "2 hours ago",
      score: 95,
      status: "Verified Clean Architecture",
      authorship: "100% Original Commits",
      description: "High-throughput pub/sub broker handling 80k msgs/sec with Raft consensus.",
    },
    {
      id: "2",
      name: "talentlens-evaluator",
      language: "TypeScript / Next.js",
      commits: 184,
      lastAudit: "Yesterday",
      score: 92,
      status: "Production Standard",
      authorship: "Verified Commits",
      description: "Explainable candidate evaluation system through AST parsing and AST code analysis.",
    },
    {
      id: "3",
      name: "zero-copy-kv-engine",
      language: "Rust / C++",
      commits: 98,
      lastAudit: "3 days ago",
      score: 89,
      status: "Memory-Safe & Audited",
      authorship: "98% Original Commits",
      description: "LSM tree storage engine with mmap zero-copy reads and lock-free concurrency.",
    },
  ]);

  // State for Applications
  const [applicationFilter, setApplicationFilter] = useState<"all" | "offcampus" | "campus">("all");
  const [applications, setApplications] = useState([
    {
      id: "app-1",
      company: "Razorpay",
      type: "offcampus",
      role: "SDE-1 (Backend Core)",
      status: "Technical Round Scheduled",
      statusColor: "bg-emerald-500/15 text-emerald-700 border-emerald-500/20",
      date: "Nov 8, 2026 - 11:30 AM",
      matchScore: 94,
      tag: "Off-Campus Direct",
      location: "Bengaluru (Hybrid)",
    },
    {
      id: "app-2",
      company: "Morgan Stanley",
      type: "campus",
      role: "Technology Analyst 2026",
      status: "Shortlisted for On-Campus OA",
      statusColor: "bg-blue-500/15 text-blue-700 border-blue-500/20",
      date: "Nov 12, 2026",
      matchScore: 91,
      tag: "Campus Placement Drive",
      location: "Campus Day 1",
    },
    {
      id: "app-3",
      company: "Postman",
      type: "offcampus",
      role: "Frontend Performance Engineer",
      status: "Code Evidence Under Review",
      statusColor: "bg-amber-500/15 text-amber-700 border-amber-500/20",
      date: "Applied 2 days ago",
      matchScore: 96,
      tag: "Off-Campus Direct",
      location: "Remote (India)",
    },
    {
      id: "app-4",
      company: "TCS Digital",
      type: "campus",
      role: "Systems Engineer (High Package)",
      status: "Interview Round Cleared",
      statusColor: "bg-purple-500/15 text-purple-700 border-purple-500/20",
      date: "Result Awaited",
      matchScore: 88,
      tag: "Campus Placement Drive",
      location: "On-Campus",
    },
  ]);

  const [copiedLink, setCopiedLink] = useState(false);

  function handleAddRepoSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newRepoName.trim()) return;

    setRepos((prev) => [
      {
        id: Date.now().toString(),
        name: newRepoName.trim(),
        language: "TypeScript / Node",
        commits: 46,
        lastAudit: "Just now",
        score: 91,
        status: "Verification In-Progress",
        authorship: "Auditing authorship commits...",
        description: newRepoUrl || "Connected repository pending AST verification pipeline.",
      },
      ...prev,
    ]);

    setNewRepoName("");
    setNewRepoUrl("");
    setShowAddRepo(false);
  }

  function handleCopyProofUrl() {
    navigator.clipboard?.writeText("https://checktalent.dev/proof/aditya-2026");
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  }

  const filteredApps =
    applicationFilter === "all"
      ? applications
      : applications.filter((app) => app.type === applicationFilter);

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
                User / Student / Employee Dashboard
              </span>

              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-700">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Verified Candidate Profile
              </span>
            </div>

            <h1 className="aldrich-regular mt-3 text-3xl font-bold sm:text-4xl">
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
              <span>Active Drives</span>
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
            NEW
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
                  <h3 className="aldrich-regular text-lg font-bold">
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

            {/* Upcoming Interview Reminders */}
            <div className="rounded-3xl border border-[#1C1613]/10 bg-white p-6 shadow-sm">
              <h3 className="aldrich-regular text-lg font-bold">
                Upcoming Rounds & Schedules
              </h3>

              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between rounded-2xl border border-emerald-500/20 bg-emerald-50/50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#1C1613]">
                        Razorpay — Live Technical Architecture Round
                      </h4>
                      <p className="text-xs text-[#756A62]">
                        Off-Campus Direct • Friday, Nov 8 • 11:30 AM IST
                      </p>
                    </div>
                  </div>
                  <button className="rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-700">
                    Join Room
                  </button>
                </div>

                <div className="flex items-center justify-between rounded-2xl border border-blue-500/20 bg-blue-50/50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                      <School className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#1C1613]">
                        Morgan Stanley — On-Campus Assessment Day
                      </h4>
                      <p className="text-xs text-[#756A62]">
                        Campus Placement • Wednesday, Nov 12 • College Lab 4
                      </p>
                    </div>
                  </div>
                  <span className="rounded-lg bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-700">
                    Slot Confirmed
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Col: Live Activity Feed & Audit Status */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-[#1C1613]/10 bg-white p-6 shadow-sm">
              <h3 className="aldrich-regular text-lg font-bold">
                Verification Pipeline Status
              </h3>
              <p className="text-xs text-[#756A62]">
                Automated continuous evaluation checks
              </p>

              <div className="mt-5 space-y-3">
                <div className="flex items-center gap-3 rounded-xl border border-[#1C1613]/5 bg-[#FAF7F2] p-3 text-xs">
                  <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-bold text-[#1C1613]">AST Code Hygiene</span>
                    <p className="text-[#756A62]">Clean architecture, modular boundaries</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-[#1C1613]/5 bg-[#FAF7F2] p-3 text-xs">
                  <GitBranch className="h-5 w-5 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-bold text-[#1C1613]">Git Commit Lineage</span>
                    <p className="text-[#756A62]">Verified multi-month author progression</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-[#1C1613]/5 bg-[#FAF7F2] p-3 text-xs">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-bold text-[#1C1613]">Anti-Plagiarism Score</span>
                    <p className="text-[#756A62]">0% public mirror collisions detected</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recruiter Visibility */}
            <div className="rounded-3xl border border-[#1C1613]/10 bg-[#FAF7F2] p-6">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#D9481E]" />
                <h3 className="aldrich-regular text-base font-bold">
                  Who's Viewing Your Proof
                </h3>
              </div>
              <p className="mt-1 text-xs text-[#756A62]">
                Verified recruiters who inspected your repository evidence:
              </p>

              <div className="mt-4 space-y-2.5">
                {[
                  { name: "Zepto Recruiter", time: "2 hours ago", role: "Backend Team" },
                  { name: "Razorpay TA Lead", time: "5 hours ago", role: "Core Banking" },
                  { name: "TPO Placement Office", time: "1 day ago", role: "Campus Tier 1" },
                ].map((v, i) => (
                  <div key={i} className="flex items-center justify-between rounded-xl bg-white p-3 text-xs border border-[#1C1613]/5">
                    <div>
                      <strong className="text-[#1C1613]">{v.name}</strong>
                      <p className="text-[11px] text-[#756A62]">{v.role}</p>
                    </div>
                    <span className="text-[10px] text-[#8C8077]">{v.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Repositories */}
      {activeTab === "repos" && (
        <div className="space-y-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h3 className="aldrich-regular text-2xl font-bold">
                Connected & Audited Repositories
              </h3>
              <p className="text-xs text-[#756A62]">
                Code analysis engine reviews git commits, AST syntax trees, and algorithmic complexity.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveTab("forensics")}
                className="flex items-center gap-1.5 rounded-xl border border-[#D9481E]/30 bg-[#D9481E]/10 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#D9481E] hover:bg-[#D9481E] hover:text-white transition"
              >
                <Bot className="h-4 w-4" />
                Deep AI & Plagiarism Audit
              </button>

              <button
                onClick={() => setShowAddRepo(true)}
                className="flex items-center gap-2 rounded-xl bg-[#D9481E] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#B93615]"
              >
                <Plus className="h-4 w-4" />
                Connect Another Repository
              </button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {repos.map((repo) => (
              <div
                key={repo.id}
                className="flex flex-col justify-between rounded-3xl border border-[#1C1613]/10 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-[#FAF7F2] px-2.5 py-1 font-mono text-[11px] font-bold text-[#D9481E]">
                      {repo.language}
                    </span>
                    <div className="flex items-center gap-1 text-xs font-bold text-emerald-600">
                      <ShieldCheck className="h-4 w-4" />
                      <span>{repo.score}/100</span>
                    </div>
                  </div>

                  <h4 className="aldrich-regular mt-4 text-lg font-bold text-[#1C1613]">
                    {repo.name}
                  </h4>

                  <p className="mt-2 text-xs leading-relaxed text-[#756A62]">
                    {repo.description}
                  </p>

                  <div className="mt-4 space-y-1.5 border-t border-[#1C1613]/10 pt-4 text-xs">
                    <div className="flex items-center justify-between text-[#756A62]">
                      <span>Authorship:</span>
                      <strong className="text-emerald-700">{repo.authorship}</strong>
                    </div>
                    <div className="flex items-center justify-between text-[#756A62]">
                      <span>Commit Volume:</span>
                      <strong className="text-[#1C1613]">{repo.commits} commits</strong>
                    </div>
                    <div className="flex items-center justify-between text-[#756A62]">
                      <span>Last Audited:</span>
                      <span className="text-[#8C8077]">{repo.lastAudit}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-[#1C1613]/10 pt-4">
                  <span className="text-[11px] font-semibold text-[#D9481E]">
                    {repo.status}
                  </span>
                  <a
                    href={`https://github.com/aditya/${repo.name}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-xs font-bold text-[#1C1613] hover:text-[#D9481E]"
                  >
                    View Repo <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Drives & Applications */}
      {activeTab === "drives" && (
        <div className="space-y-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h3 className="aldrich-regular text-2xl font-bold">
                Drive Tracker: Campus & Off-Campus
              </h3>
              <p className="text-xs text-[#756A62]">
                Your unified dashboard for both on-campus placement cell drives and off-campus corporate openings.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-[#1C1613]/10 bg-white p-1">
              <button
                onClick={() => setApplicationFilter("all")}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                  applicationFilter === "all"
                    ? "bg-[#D9481E] text-white"
                    : "text-[#756A62] hover:text-[#1C1613]"
                }`}
              >
                All ({applications.length})
              </button>
              <button
                onClick={() => setApplicationFilter("offcampus")}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                  applicationFilter === "offcampus"
                    ? "bg-[#D9481E] text-white"
                    : "text-[#756A62] hover:text-[#1C1613]"
                }`}
              >
                Off-Campus Companies
              </button>
              <button
                onClick={() => setApplicationFilter("campus")}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                  applicationFilter === "campus"
                    ? "bg-[#D9481E] text-white"
                    : "text-[#756A62] hover:text-[#1C1613]"
                }`}
              >
                Campus Drives
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {filteredApps.map((app) => (
              <div
                key={app.id}
                className="flex flex-col justify-between gap-4 rounded-2xl border border-[#1C1613]/10 bg-white p-5 shadow-sm transition hover:shadow-md md:flex-row md:items-center"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl font-bold ${
                      app.type === "campus"
                        ? "bg-blue-50 text-blue-600 border border-blue-200"
                        : "bg-[#E9A23B]/15 text-[#B8710B] border border-[#E9A23B]/30"
                    }`}
                  >
                    {app.type === "campus" ? (
                      <School className="h-6 w-6" />
                    ) : (
                      <Building2 className="h-6 w-6" />
                    )}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="aldrich-regular text-lg font-bold text-[#1C1613]">
                        {app.company}
                      </h4>
                      <span className="rounded-full bg-[#FAF7F2] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#756A62]">
                        {app.tag}
                      </span>
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                        {app.matchScore}% Proof Match
                      </span>
                    </div>

                    <p className="mt-1 text-xs font-semibold text-[#52463F]">
                      {app.role} • <span className="font-normal text-[#756A62]">{app.location}</span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="text-right">
                    <span
                      className={`inline-block rounded-lg border px-3 py-1 text-xs font-bold ${app.statusColor}`}
                    >
                      {app.status}
                    </span>
                    <p className="mt-1 text-[11px] text-[#8C8077]">{app.date}</p>
                  </div>

                  <button className="rounded-xl border border-[#1C1613]/15 bg-[#FAF7F2] px-3.5 py-2 text-xs font-bold text-[#1C1613] hover:bg-white">
                    View Dossier
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: AI Mock Assessments */}
      {activeTab === "assessments" && (
        <div className="space-y-6">
          <div>
            <h3 className="aldrich-regular text-2xl font-bold">
              AI Technical Interview Simulator
            </h3>
            <p className="text-xs text-[#756A62]">
              Interactive adaptive evaluations: explain your code, handle scale bottlenecks, and prove engineering depth.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Distributed Systems & Scalability",
                duration: "45 mins",
                questions: "Raft consensus, Cache invalidation, Message queues",
                score: "Last: 89/100",
                badge: "High-Priority for Razorpay",
              },
              {
                title: "Data Structures & Concurrency",
                duration: "30 mins",
                questions: "Lock-free structures, Thread sync, Memory layout",
                score: "Last: 92/100",
                badge: "High-Priority for Morgan Stanley",
              },
              {
                title: "React 19 & Full-Stack Architecture",
                duration: "35 mins",
                questions: "Server Actions, RSC hydration, Optimistic UI",
                score: "Last: 96/100",
                badge: "High-Priority for Postman",
              },
            ].map((sim, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between rounded-3xl border border-[#1C1613]/10 bg-white p-6 shadow-sm"
              >
                <div>
                  <span className="rounded-full bg-[#D9481E]/10 px-2.5 py-1 text-[10px] font-bold text-[#D9481E]">
                    {sim.badge}
                  </span>
                  <h4 className="aldrich-regular mt-3 text-lg font-bold text-[#1C1613]">
                    {sim.title}
                  </h4>
                  <p className="mt-2 text-xs text-[#756A62]">
                    Focus: {sim.questions}
                  </p>

                  <div className="mt-4 flex items-center justify-between border-t border-[#1C1613]/10 pt-3 text-xs text-[#756A62]">
                    <span>Duration: {sim.duration}</span>
                    <strong className="text-emerald-600">{sim.score}</strong>
                  </div>
                </div>

                <button
                  onClick={() => alert(`Starting interactive simulation: ${sim.title}`)}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#D9481E] py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#B93615]"
                >
                  <Bot className="h-4 w-4" />
                  Launch AI Simulation
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Public Proof Card */}
      {activeTab === "proofcard" && (
        <div className="space-y-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h3 className="aldrich-regular text-2xl font-bold">
                Your Verifiable Proof-of-Skill Card
              </h3>
              <p className="text-xs text-[#756A62]">
                Share this immutable cryptographic link with recruiters, TPO cells, or on LinkedIn and Twitter.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleCopyProofUrl}
                className="flex items-center gap-2 rounded-xl border border-[#1C1613]/15 bg-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#1C1613] hover:bg-[#FAF7F2]"
              >
                {copiedLink ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    Copied URL!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 text-[#D9481E]" />
                    Copy Proof Link
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Render Proof Card Box */}
          <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl border-2 border-[#1C1613] bg-white shadow-[0_20px_60px_rgba(28,22,19,0.1)]">
            <div className="border-b-2 border-[#1C1613] bg-[#D9481E] p-6 text-white sm:p-8">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-white/80">
                  CheckTalent Verifiable Skill Proof
                </span>
                <span className="rounded-full border border-white/40 bg-white/10 px-3 py-1 font-mono text-xs font-semibold">
                  AUDIT ID: CT-2026-92A
                </span>
              </div>

              <h2 className="aldrich-regular mt-4 text-3xl font-bold sm:text-4xl">
                {user.displayName || user.email?.split("@")[0] || "Candidate"}
              </h2>
              <p className="mt-1 text-sm text-white/90">
                {profile?.targetRole || "Full-Stack Software Engineer"} • {profile?.institution || "Verified Developer"}
              </p>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-3 gap-4 border-b border-[#1C1613]/10 pb-6 text-center">
                <div>
                  <p className="text-xs text-[#756A62]">Skill Proof Score</p>
                  <p className="aldrich-regular mt-1 text-3xl font-bold text-[#D9481E]">92/100</p>
                </div>
                <div>
                  <p className="text-xs text-[#756A62]">Audited Repositories</p>
                  <p className="aldrich-regular mt-1 text-3xl font-bold text-[#1C1613]">4</p>
                </div>
                <div>
                  <p className="text-xs text-[#756A62]">Plagiarism Index</p>
                  <p className="aldrich-regular mt-1 text-3xl font-bold text-emerald-600">0.0%</p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C1613]">
                  Verified Technologies & Commits:
                </h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["React 19 (96%)", "Go (92%)", "TypeScript (94%)", "PostgreSQL (88%)", "Rust (85%)"].map(
                    (tag, idx) => (
                      <span
                        key={idx}
                        className="rounded-lg border border-[#1C1613]/10 bg-[#FAF7F2] px-3 py-1 text-xs font-bold text-[#1C1613]"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-dashed border-[#1C1613]/20 bg-[#FAF7F2] p-4 text-xs text-[#756A62]">
                <p>
                  <strong>Verification Signature:</strong>{" "}
                  <code className="font-mono text-[11px] text-[#1C1613]">
                    SHA256: 8f4a7c1b829e160a3d4f828bbcd191e48392ef
                  </code>
                </p>
                <p className="mt-1">
                  Issued by CheckTalent Code Integrity Service. Authenticated against GitHub commits.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Repo Modal */}
      {showAddRepo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-3xl border border-[#1C1613]/10 bg-white p-6 shadow-2xl sm:p-8">
            <h3 className="aldrich-regular text-2xl font-bold text-[#1C1613]">
              Connect Repository for Audit
            </h3>
            <p className="mt-1 text-xs text-[#756A62]">
              CheckTalent will analyze git commits, architectural layers, and authorship patterns.
            </p>

            <form onSubmit={handleAddRepoSubmit} className="mt-6 space-y-4">
              <div>
                <label className="mb-1 block text-xs font-bold uppercase text-[#1C1613]">
                  Repository Name
                </label>
                <input
                  type="text"
                  required
                  value={newRepoName}
                  onChange={(e) => setNewRepoName(e.target.value)}
                  placeholder="e.g. distributed-event-bus"
                  className="w-full rounded-xl border border-[#1C1613]/15 bg-[#FAF7F2]/50 px-4 py-2.5 text-sm outline-none focus:border-[#D9481E]"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold uppercase text-[#1C1613]">
                  GitHub Repository URL
                </label>
                <input
                  type="url"
                  value={newRepoUrl}
                  onChange={(e) => setNewRepoUrl(e.target.value)}
                  placeholder="https://github.com/your-username/your-repo"
                  className="w-full rounded-xl border border-[#1C1613]/15 bg-[#FAF7F2]/50 px-4 py-2.5 text-sm outline-none focus:border-[#D9481E]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1C1613]/10">
                <button
                  type="button"
                  onClick={() => setShowAddRepo(false)}
                  className="rounded-xl border border-[#1C1613]/15 px-4 py-2.5 text-xs font-bold uppercase text-[#756A62] hover:bg-[#FAF7F2]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#D9481E] px-5 py-2.5 text-xs font-bold uppercase text-white hover:bg-[#B93615]"
                >
                  Start Verification Audit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
