"use client";

import { useState } from "react";
import { User } from "firebase/auth";
import { UserProfile } from "@/types/dashboard";
import {
  ArrowRight,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  Code2,
  ExternalLink,
  Eye,
  Filter,
  GitBranch,
  Github,
  Mail,
  Plus,
  Search,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Users,
} from "lucide-react";

interface OffcampusDashboardProps {
  user: User;
  profile: UserProfile | null;
}

export function OffcampusDashboard({ user, profile }: OffcampusDashboardProps) {
  const [activeTab, setActiveTab] = useState<"jobs" | "candidates" | "inspection" | "interviews">("jobs");

  // State for Job Postings
  const [jobs, setJobs] = useState([
    {
      id: "job-1",
      title: "Senior Full-Stack Engineer (Next.js + Go)",
      location: "Bengaluru / Remote",
      type: "Full-Time",
      salary: "₹24 LPA - ₹38 LPA",
      applicants: 112,
      shortlisted: 19,
      avgScore: 89,
      status: "Active",
      skills: ["React", "Next.js", "Go", "PostgreSQL", "Docker"],
      minScore: 85,
    },
    {
      id: "job-2",
      title: "Backend Systems Engineer (Rust / Microservices)",
      location: "Hyderabad (Hybrid)",
      type: "Full-Time",
      salary: "₹28 LPA - ₹45 LPA",
      applicants: 78,
      shortlisted: 14,
      avgScore: 92,
      status: "Active",
      skills: ["Rust", "Distributed Systems", "gRPC", "Redis"],
      minScore: 88,
    },
    {
      id: "job-3",
      title: "Software Engineer Intern (Batch of 2026)",
      location: "Remote (India)",
      type: "Internship (PPO)",
      salary: "₹50k - ₹75k / month",
      applicants: 124,
      shortlisted: 22,
      avgScore: 86,
      status: "Active",
      skills: ["TypeScript", "React", "Node.js", "SQL"],
      minScore: 80,
    },
    {
      id: "job-4",
      title: "Frontend Performance Specialist",
      location: "Bengaluru",
      type: "Full-Time",
      salary: "₹20 LPA - ₹32 LPA",
      applicants: 28,
      shortlisted: 7,
      avgScore: 91,
      status: "Active",
      skills: ["React 19", "Web Vitals", "Canvas / WebGL", "Tailwind"],
      minScore: 85,
    },
  ]);

  // State for Candidates Discovery
  const [candidateFilter, setCandidateFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [candidates, setCandidates] = useState([
    {
      id: "cand-1",
      name: "Aditya Sharma",
      institution: "Apex Institute of Tech",
      targetRole: "Full-Stack Engineer",
      proofScore: 94,
      reposAudited: 4,
      plagiarism: "0.0%",
      topSkills: ["Go (95%)", "React 19 (96%)", "Rust (89%)"],
      highlightRepo: "distributed-event-mesh (Go, 342 commits)",
      status: "Shortlisted",
      matchedJob: "Senior Full-Stack Engineer",
    },
    {
      id: "cand-2",
      name: "Priya Nair",
      institution: "National Tech University",
      targetRole: "Backend Systems",
      proofScore: 91,
      reposAudited: 3,
      plagiarism: "0.0%",
      topSkills: ["Rust (94%)", "gRPC (90%)", "Kubernetes (86%)"],
      highlightRepo: "raft-consensus-engine (Rust, 210 commits)",
      status: "Under Review",
      matchedJob: "Backend Systems Engineer",
    },
    {
      id: "cand-3",
      name: "Rohan Varma",
      institution: "Delhi College of Engg",
      targetRole: "Frontend Specialist",
      proofScore: 89,
      reposAudited: 5,
      plagiarism: "1.2%",
      topSkills: ["Next.js (92%)", "TypeScript (90%)", "WebGL (85%)"],
      highlightRepo: "realtime-3d-dashboard (TypeScript, 160 commits)",
      status: "Interview Scheduled",
      matchedJob: "Frontend Performance Specialist",
    },
    {
      id: "cand-4",
      name: "Sneha Kulkarni",
      institution: "Pune Institute of Computer Tech",
      targetRole: "Software Engineer Intern",
      proofScore: 88,
      reposAudited: 3,
      plagiarism: "0.0%",
      topSkills: ["TypeScript (89%)", "Node.js (88%)", "PostgreSQL (85%)"],
      highlightRepo: "collaborative-kanban-api (Node, 115 commits)",
      status: "Shortlisted",
      matchedJob: "Software Engineer Intern (Batch of 2026)",
    },
  ]);

  // Modal for Posting Job
  const [showPostJob, setShowPostJob] = useState(false);
  const [newJobTitle, setNewJobTitle] = useState("");
  const [newJobLocation, setNewJobLocation] = useState("");
  const [newJobSalary, setNewJobSalary] = useState("");
  const [newJobMinScore, setNewJobMinScore] = useState("85");

  function handleCreateJob(e: React.FormEvent) {
    e.preventDefault();
    if (!newJobTitle.trim()) return;

    setJobs((prev) => [
      {
        id: `job-${Date.now()}`,
        title: newJobTitle.trim(),
        location: newJobLocation.trim() || "Remote",
        type: "Full-Time",
        salary: newJobSalary.trim() || "Competitive",
        applicants: 0,
        shortlisted: 0,
        avgScore: 0,
        status: "Active",
        skills: ["TypeScript", "Full-Stack", "Git"],
        minScore: parseInt(newJobMinScore, 10) || 80,
      },
      ...prev,
    ]);

    setNewJobTitle("");
    setNewJobLocation("");
    setNewJobSalary("");
    setShowPostJob(false);
  }

  function handleUpdateCandidateStatus(id: string, newStatus: string) {
    setCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
  }

  const filteredCandidates = candidates.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.topSkills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    if (candidateFilter === "all") return matchesSearch;
    if (candidateFilter === "shortlisted") return matchesSearch && c.status === "Shortlisted";
    if (candidateFilter === "interviews") return matchesSearch && c.status === "Interview Scheduled";
    return matchesSearch;
  });

  const companyDisplay =
    profile?.companyName || user.displayName || user.email?.split("@")[0] || "Acme Enterprises";

  return (
    <div className="space-y-8">
      {/* Company Recruiter Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl border border-[#1C1613]/10 bg-white p-6 shadow-sm sm:p-8">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#E9A23B]/10 blur-3xl pointer-events-none" />

        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E9A23B]/30 bg-[#E9A23B]/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#B8710B]">
                <Building2 className="h-3.5 w-3.5" />
                Off-Campus Companies Dashboard
              </span>

              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-700">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Verified Employer Workspace
              </span>
            </div>

            <h1 className="aldrich-regular mt-3 text-3xl font-bold sm:text-4xl text-[#1C1613]">
              {companyDisplay}
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#756A62]">
              {profile?.headline ? `${profile.headline} • ` : "Technical Recruiting Portal • "}
              Access off-campus software talent vetted by verifiable git commits, anti-plagiarism AST checks, and code architecture proofs.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowPostJob(true)}
              className="flex items-center gap-2 rounded-xl bg-[#D9481E] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-[#B93615]"
            >
              <Plus className="h-4 w-4" />
              Post Off-Campus Job
            </button>

            <button
              onClick={() => setActiveTab("candidates")}
              className="flex items-center gap-2 rounded-xl border border-[#1C1613]/15 bg-[#FAF7F2] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#1C1613] transition hover:bg-white"
            >
              <Search className="h-4 w-4 text-[#D9481E]" />
              Search Talent Pool
            </button>
          </div>
        </div>

        {/* 4 Company Metrics */}
        <div className="mt-8 grid grid-cols-2 gap-4 border-t border-[#1C1613]/10 pt-6 lg:grid-cols-4">
          <div className="rounded-2xl border border-[#1C1613]/5 bg-[#FAF7F2] p-4">
            <div className="flex items-center justify-between text-xs font-semibold text-[#756A62]">
              <span>Active Job Postings</span>
              <Briefcase className="h-4 w-4 text-[#E9A23B]" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="aldrich-regular text-2xl font-bold text-[#1C1613] sm:text-3xl">
                {jobs.length}
              </span>
              <span className="text-xs font-bold text-emerald-600">All Live</span>
            </div>
            <p className="mt-1 text-[11px] text-[#8C8077]">Off-campus hiring active</p>
          </div>

          <div className="rounded-2xl border border-[#1C1613]/5 bg-[#FAF7F2] p-4">
            <div className="flex items-center justify-between text-xs font-semibold text-[#756A62]">
              <span>Verified Candidates</span>
              <Users className="h-4 w-4 text-[#D9481E]" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="aldrich-regular text-2xl font-bold text-[#1C1613] sm:text-3xl">
                342
              </span>
              <span className="text-xs font-bold text-emerald-600">+28 this week</span>
            </div>
            <p className="mt-1 text-[11px] text-[#8C8077]">100% Repos audited</p>
          </div>

          <div className="rounded-2xl border border-[#1C1613]/5 bg-[#FAF7F2] p-4">
            <div className="flex items-center justify-between text-xs font-semibold text-[#756A62]">
              <span>High-Proof Shortlist</span>
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="aldrich-regular text-2xl font-bold text-[#1C1613] sm:text-3xl">
                56
              </span>
              <span className="text-xs font-bold text-blue-600">&gt;85 Skill Score</span>
            </div>
            <p className="mt-1 text-[11px] text-[#8C8077]">Zero tutorial replicas</p>
          </div>

          <div className="rounded-2xl border border-[#1C1613]/5 bg-[#FAF7F2] p-4">
            <div className="flex items-center justify-between text-xs font-semibold text-[#756A62]">
              <span>Interviews Scheduled</span>
              <Calendar className="h-4 w-4 text-purple-600" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="aldrich-regular text-2xl font-bold text-[#1C1613] sm:text-3xl">
                18
              </span>
              <span className="text-xs font-bold text-purple-600">This Round</span>
            </div>
            <p className="mt-1 text-[11px] text-[#8C8077]">Avg time-to-hire: 9 days</p>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#1C1613]/10 pb-2">
        <button
          onClick={() => setActiveTab("jobs")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition ${
            activeTab === "jobs"
              ? "bg-[#D9481E] text-white shadow-sm"
              : "bg-white text-[#756A62] hover:bg-[#FAF7F2] hover:text-[#1C1613]"
          }`}
        >
          <Briefcase className="h-4 w-4" />
          Active Job Postings ({jobs.length})
        </button>

        <button
          onClick={() => setActiveTab("candidates")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition ${
            activeTab === "candidates"
              ? "bg-[#D9481E] text-white shadow-sm"
              : "bg-white text-[#756A62] hover:bg-[#FAF7F2] hover:text-[#1C1613]"
          }`}
        >
          <UserCheck className="h-4 w-4" />
          Talent Pool & Candidates ({candidates.length})
        </button>

        <button
          onClick={() => setActiveTab("inspection")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition ${
            activeTab === "inspection"
              ? "bg-[#D9481E] text-white shadow-sm"
              : "bg-white text-[#756A62] hover:bg-[#FAF7F2] hover:text-[#1C1613]"
          }`}
        >
          <Code2 className="h-4 w-4" />
          Code Proof & Plagiarism Inspector
        </button>

        <button
          onClick={() => setActiveTab("interviews")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition ${
            activeTab === "interviews"
              ? "bg-[#D9481E] text-white shadow-sm"
              : "bg-white text-[#756A62] hover:bg-[#FAF7F2] hover:text-[#1C1613]"
          }`}
        >
          <Calendar className="h-4 w-4" />
          Technical Interviews
        </button>
      </div>

      {/* Tab 1: Job Postings */}
      {activeTab === "jobs" && (
        <div className="space-y-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h3 className="aldrich-regular text-2xl font-bold">
                Off-Campus Job Postings & Inbound Pipeline
              </h3>
              <p className="text-xs text-[#756A62]">
                Candidates apply with their verified CheckTalent Proof Cards. No resume spam.
              </p>
            </div>

            <button
              onClick={() => setShowPostJob(true)}
              className="flex items-center gap-2 rounded-xl bg-[#D9481E] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#B93615]"
            >
              <Plus className="h-4 w-4" />
              Create New Opening
            </button>
          </div>

          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="flex flex-col justify-between gap-5 rounded-3xl border border-[#1C1613]/10 bg-white p-6 shadow-sm transition hover:shadow-md lg:flex-row lg:items-center"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="aldrich-regular text-xl font-bold text-[#1C1613]">
                      {job.title}
                    </h4>
                    <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
                      {job.status}
                    </span>
                    <span className="rounded-full bg-[#FAF7F2] px-2.5 py-0.5 text-[11px] font-semibold text-[#756A62]">
                      Min Proof Score: {job.minScore}+
                    </span>
                  </div>

                  <p className="text-xs text-[#756A62]">
                    {job.location} • {job.type} • <strong className="text-[#1C1613]">{job.salary}</strong>
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {job.skills.map((s, idx) => (
                      <span
                        key={idx}
                        className="rounded-md bg-[#FAF7F2] px-2 py-0.5 text-[10px] font-semibold text-[#52463F]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-6 border-t border-[#1C1613]/10 pt-4 lg:border-t-0 lg:pt-0">
                  <div className="text-center">
                    <p className="text-xs text-[#756A62]">Total Applicants</p>
                    <p className="aldrich-regular mt-0.5 text-2xl font-bold text-[#1C1613]">
                      {job.applicants}
                    </p>
                  </div>

                  <div className="text-center">
                    <p className="text-xs text-[#756A62]">Shortlisted</p>
                    <p className="aldrich-regular mt-0.5 text-2xl font-bold text-emerald-600">
                      {job.shortlisted}
                    </p>
                  </div>

                  <div className="text-center">
                    <p className="text-xs text-[#756A62]">Avg Proof</p>
                    <p className="aldrich-regular mt-0.5 text-2xl font-bold text-[#D9481E]">
                      {job.avgScore}
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveTab("candidates")}
                    className="flex items-center gap-1 rounded-xl bg-[#FAF7F2] px-4 py-2.5 text-xs font-bold text-[#1C1613] hover:bg-[#D9481E] hover:text-white transition"
                  >
                    View Applicants <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Candidates Discovery */}
      {activeTab === "candidates" && (
        <div className="space-y-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h3 className="aldrich-regular text-2xl font-bold">
                Pre-Verified Software Talent
              </h3>
              <p className="text-xs text-[#756A62]">
                Ranked by demonstrated code quality, AST proof, and commit history rather than keyword buzzwords.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#756A62]" />
                <input
                  type="text"
                  placeholder="Search skill, candidate, college..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="rounded-xl border border-[#1C1613]/15 bg-white py-2 pl-9 pr-4 text-xs outline-none focus:border-[#D9481E]"
                />
              </div>

              <div className="flex items-center gap-1 rounded-xl border border-[#1C1613]/10 bg-white p-1">
                <button
                  onClick={() => setCandidateFilter("all")}
                  className={`rounded-lg px-2.5 py-1 text-xs font-bold ${
                    candidateFilter === "all" ? "bg-[#D9481E] text-white" : "text-[#756A62]"
                  }`}
                >
                  All ({candidates.length})
                </button>
                <button
                  onClick={() => setCandidateFilter("shortlisted")}
                  className={`rounded-lg px-2.5 py-1 text-xs font-bold ${
                    candidateFilter === "shortlisted" ? "bg-[#D9481E] text-white" : "text-[#756A62]"
                  }`}
                >
                  Shortlisted
                </button>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {filteredCandidates.map((cand) => (
              <div
                key={cand.id}
                className="flex flex-col justify-between rounded-3xl border border-[#1C1613]/10 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="aldrich-regular text-xl font-bold text-[#1C1613]">
                        {cand.name}
                      </h4>
                      <p className="text-xs text-[#756A62]">
                        {cand.targetRole} • <span className="text-[#52463F]">{cand.institution}</span>
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center gap-1 text-sm font-bold text-[#D9481E]">
                        <ShieldCheck className="h-4 w-4" />
                        <span>{cand.proofScore}/100</span>
                      </div>
                      <span className="text-[10px] text-emerald-600 font-semibold">
                        {cand.plagiarism} Plagiarism
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl bg-[#FAF7F2] p-3 text-xs">
                    <p className="font-semibold text-[#1C1613]">
                      Primary Verified Repository:
                    </p>
                    <p className="font-mono text-[11px] text-[#D9481E]">
                      {cand.highlightRepo}
                    </p>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {cand.topSkills.map((sk, idx) => (
                      <span
                        key={idx}
                        className="rounded-md border border-[#1C1613]/10 bg-white px-2 py-0.5 text-[11px] font-semibold text-[#1C1613]"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-[#1C1613]/10 pt-3 text-xs">
                    <span className="text-[#756A62]">Matching Role:</span>
                    <strong className="text-[#1C1613]">{cand.matchedJob}</strong>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-[#1C1613]/10 pt-4">
                  <span
                    className={`rounded-lg px-2.5 py-1 text-xs font-bold ${
                      cand.status === "Shortlisted"
                        ? "bg-emerald-100 text-emerald-800"
                        : cand.status === "Interview Scheduled"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {cand.status}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleUpdateCandidateStatus(cand.id, "Shortlisted")}
                      className="rounded-xl border border-[#1C1613]/15 bg-[#FAF7F2] px-3 py-1.5 text-xs font-bold text-[#1C1613] hover:bg-emerald-50 hover:text-emerald-700"
                    >
                      Shortlist
                    </button>
                    <button
                      onClick={() => handleUpdateCandidateStatus(cand.id, "Interview Scheduled")}
                      className="rounded-xl bg-[#D9481E] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#B93615]"
                    >
                      Invite to Interview
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Code Inspection */}
      {activeTab === "inspection" && (
        <div className="space-y-6">
          <div>
            <h3 className="aldrich-regular text-2xl font-bold">
              CheckTalent Code Forensics & Plagiarism Engine
            </h3>
            <p className="text-xs text-[#756A62]">
              See how our engine separates authentic engineering architects from tutorial clones and AI prompt copiers.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-[#1C1613]/10 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h4 className="aldrich-regular text-lg font-bold">
                  Live Audit Inspection: Aditya Sharma
                </h4>
                <span className="font-mono text-xs font-bold text-emerald-600">
                  SHA-256 VERIFIED
                </span>
              </div>

              <div className="mt-4 rounded-2xl bg-[#1C1613] p-4 text-xs font-mono text-emerald-400">
                <p className="text-white/60">// AST Tree Analysis & Authorship Log</p>
                <p className="mt-2 text-white">&gt; Repository: github.com/aditya/distributed-event-mesh</p>
                <p>&gt; Total Commits: 342 across 94 calendar days</p>
                <p>&gt; Organic Commit Curve: 98.4% (No single-day dump)</p>
                <p>&gt; Plagiarism vs 1.2M Open-Source Repos: 0.00% match</p>
                <p>&gt; Concurrency Safety: Channel-based synchronization verified</p>
                <p>&gt; Cyclomatic Complexity: Optimal (Avg 3.2 per method)</p>
                <p className="mt-2 text-yellow-400">&gt; VERDICT: Authentic High-Signal Contributor</p>
              </div>

              <div className="mt-4 space-y-2 text-xs text-[#52463F]">
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  Authorship verified: commit emails match GPG keys and GitHub user ID.
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  Original design: custom lock-free ring buffer implementation with benchmark suites.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-[#1C1613]/10 bg-white p-6 shadow-sm">
              <h4 className="aldrich-regular text-lg font-bold">
                Plagiarism & Red-Flag Detection Filters
              </h4>
              <p className="text-xs text-[#756A62]">
                CheckTalent automatically weeds out low-effort submissions:
              </p>

              <div className="mt-4 space-y-3">
                <div className="rounded-2xl border border-red-200 bg-red-50/60 p-3.5 text-xs">
                  <div className="flex items-center gap-2 text-red-700 font-bold">
                    <ShieldAlert className="h-4 w-4" />
                    Tutorial Clone Detector
                  </div>
                  <p className="mt-1 text-[#756A62]">
                    Catches identical variable names from popular Udemy/YouTube clones (e.g. standard Netflix/Spotify clones).
                  </p>
                </div>

                <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-3.5 text-xs">
                  <div className="flex items-center gap-2 text-amber-700 font-bold">
                    <GitBranch className="h-4 w-4" />
                    Commit Timestamp Velocity
                  </div>
                  <p className="mt-1 text-[#756A62]">
                    Flags repositories with 10,000 lines dumped in a single commit without natural development evolution.
                  </p>
                </div>

                <div className="rounded-2xl border border-blue-200 bg-blue-50/60 p-3.5 text-xs">
                  <div className="flex items-center gap-2 text-blue-700 font-bold">
                    <Code2 className="h-4 w-4" />
                    AI Code Explanation Verification
                  </div>
                  <p className="mt-1 text-[#756A62]">
                    Randomly prompts candidates during AI interviews to explain architectural tradeoffs in their committed lines.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Interviews */}
      {activeTab === "interviews" && (
        <div className="space-y-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h3 className="aldrich-regular text-2xl font-bold">
                Scheduled Technical Rounds
              </h3>
              <p className="text-xs text-[#756A62]">
                Off-campus candidates invited to live technical rounds with your engineering team.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              {
                candidate: "Aditya Sharma",
                role: "Senior Full-Stack Engineer",
                time: "Tomorrow, 11:30 AM IST",
                interviewers: "Tech Lead + Senior Staff Engineer",
                room: "meet.google.com/ct-offcampus-1",
              },
              {
                candidate: "Rohan Varma",
                role: "Frontend Performance Specialist",
                time: "Friday, 3:00 PM IST",
                interviewers: "Principal Frontend Architect",
                room: "meet.google.com/ct-offcampus-2",
              },
            ].map((round, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between gap-4 rounded-2xl border border-[#1C1613]/10 bg-white p-5 shadow-sm md:flex-row md:items-center"
              >
                <div>
                  <h4 className="aldrich-regular text-lg font-bold text-[#1C1613]">
                    {round.candidate}
                  </h4>
                  <p className="text-xs text-[#756A62]">
                    Role: <strong className="text-[#1C1613]">{round.role}</strong> • Interviewers: {round.interviewers}
                  </p>
                  <p className="mt-1 font-mono text-xs text-[#D9481E]">{round.time}</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => alert(`Opening interview room: ${round.room}`)}
                    className="rounded-xl bg-[#D9481E] px-4 py-2 text-xs font-bold text-white hover:bg-[#B93615]"
                  >
                    Enter Interview Room
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Post Job Modal */}
      {showPostJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-3xl border border-[#1C1613]/10 bg-white p-6 shadow-2xl sm:p-8">
            <h3 className="aldrich-regular text-2xl font-bold text-[#1C1613]">
              Post Off-Campus Opening
            </h3>
            <p className="mt-1 text-xs text-[#756A62]">
              Set your target role and minimum CheckTalent Skill Score threshold.
            </p>

            <form onSubmit={handleCreateJob} className="mt-6 space-y-4">
              <div>
                <label className="mb-1 block text-xs font-bold uppercase text-[#1C1613]">
                  Job Title
                </label>
                <input
                  type="text"
                  required
                  value={newJobTitle}
                  onChange={(e) => setNewJobTitle(e.target.value)}
                  placeholder="e.g. Backend Engineer (Go/Rust)"
                  className="w-full rounded-xl border border-[#1C1613]/15 bg-[#FAF7F2]/50 px-4 py-2.5 text-sm outline-none focus:border-[#D9481E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-bold uppercase text-[#1C1613]">
                    Location / Mode
                  </label>
                  <input
                    type="text"
                    value={newJobLocation}
                    onChange={(e) => setNewJobLocation(e.target.value)}
                    placeholder="e.g. Remote or Bengaluru"
                    className="w-full rounded-xl border border-[#1C1613]/15 bg-[#FAF7F2]/50 px-4 py-2.5 text-sm outline-none focus:border-[#D9481E]"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-bold uppercase text-[#1C1613]">
                    Salary Range
                  </label>
                  <input
                    type="text"
                    value={newJobSalary}
                    onChange={(e) => setNewJobSalary(e.target.value)}
                    placeholder="e.g. ₹18 LPA - ₹28 LPA"
                    className="w-full rounded-xl border border-[#1C1613]/15 bg-[#FAF7F2]/50 px-4 py-2.5 text-sm outline-none focus:border-[#D9481E]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold uppercase text-[#1C1613]">
                  Minimum Verified Proof Score Required
                </label>
                <select
                  value={newJobMinScore}
                  onChange={(e) => setNewJobMinScore(e.target.value)}
                  className="w-full rounded-xl border border-[#1C1613]/15 bg-[#FAF7F2]/50 px-4 py-2.5 text-sm outline-none focus:border-[#D9481E]"
                >
                  <option value="75">75+ (Competent Engineer)</option>
                  <option value="80">80+ (Strong Developer)</option>
                  <option value="85">85+ (Senior / Top Tier)</option>
                  <option value="90">90+ (Elite 5% Contributor)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1C1613]/10">
                <button
                  type="button"
                  onClick={() => setShowPostJob(false)}
                  className="rounded-xl border border-[#1C1613]/15 px-4 py-2.5 text-xs font-bold uppercase text-[#756A62] hover:bg-[#FAF7F2]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#D9481E] px-5 py-2.5 text-xs font-bold uppercase text-white hover:bg-[#B93615]"
                >
                  Publish Opening
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
