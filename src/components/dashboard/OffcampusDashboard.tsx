"use client";

import { useState, useEffect } from "react";
import { User } from "firebase/auth";
import { UserProfile } from "@/types/dashboard";
import {
  RecruiterJobPosting,
  RecruiterCandidateItem,
  InterviewScheduleItem,
} from "@/data/dashboard-demo-data";
import {
  getFirebaseIdToken,
  fetchJobs,
  createJobPosting,
  fetchVerifiedCandidates,
  fetchInterviews,
  scheduleInterview,
} from "@/lib/api-client";
import {
  AlertTriangle,
  ArrowRight,
  Award,
  Bot,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  Code2,
  Download,
  ExternalLink,
  Eye,
  FileCode2,
  Filter,
  GitBranch,
  Github,
  Mail,
  Plus,
  Search,
  Share2,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Users,
  Video,
  X,
} from "lucide-react";

interface OffcampusDashboardProps {
  user: User;
  profile: UserProfile | null;
}

export function OffcampusDashboard({ user, profile }: OffcampusDashboardProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "jobs" | "candidates" | "inspection" | "interviews">("overview");

  // State for Job Postings (Live from Supabase)
  const [jobs, setJobs] = useState<RecruiterJobPosting[]>([]);
  const [showPostJobModal, setShowPostJobModal] = useState(false);
  const [newJobTitle, setNewJobTitle] = useState("");
  const [newJobDept, setNewJobDept] = useState("Engineering");
  const [newJobLocation, setNewJobLocation] = useState("Bengaluru / Remote");
  const [newJobType, setNewJobType] = useState<"Full-Time" | "Internship">("Full-Time");
  const [newJobSalary, setNewJobSalary] = useState("₹22 LPA - ₹35 LPA");
  const [newJobMinScore, setNewJobMinScore] = useState("85");
  const [newJobSkills, setNewJobSkills] = useState("React, TypeScript, Go, PostgreSQL");

  // State for Candidates Discovery & Talent Pool (Live from Supabase)
  const [candidates, setCandidates] = useState<RecruiterCandidateItem[]>([]);
  const [candidateFilter, setCandidateFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [minScoreFilter, setMinScoreFilter] = useState<number>(80);

  // State for Code Inspection Drawer
  const [selectedCandidateForAudit, setSelectedCandidateForAudit] = useState<RecruiterCandidateItem | null>(null);

  // State for Interview Scheduling (Live from Supabase)
  const [interviews, setInterviews] = useState<InterviewScheduleItem[]>([]);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedCandidateForInterview, setSelectedCandidateForInterview] = useState<string>("");
  const [interviewDate, setInterviewDate] = useState("2026-11-10");
  const [interviewTime, setInterviewTime] = useState("03:00 PM IST");
  const [interviewRound, setInterviewRound] = useState<"Technical Viva" | "System Architecture" | "Founder Fit">("Technical Viva");
  const [interviewerName, setInterviewerName] = useState("Staff Architect");

  // State for action feedback
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Load Recruiter Data from Supabase Backend
  useEffect(() => {
    async function loadData() {
      try {
        const token = await getFirebaseIdToken();
        if (token) {
          // 1. Load Jobs
          const liveJobs = await fetchJobs(token, user.uid);
          if (Array.isArray(liveJobs)) {
            setJobs(
              liveJobs.map((j: any) => ({
                id: j.id,
                title: j.title,
                department: j.department || "Engineering",
                location: j.location || "Remote",
                type: j.type || "Full-Time",
                salary: j.salary || "Competitive",
                applicants: j.applicants || 0,
                shortlisted: j.shortlisted || 0,
                avgScore: j.min_score || 85,
                status: j.status || "Active",
                skills: j.skills || ["React", "TypeScript", "Node.js"],
                minScore: j.min_score || 80,
                createdDate: j.created_at ? new Date(j.created_at).toLocaleDateString() : "Recently",
              }))
            );
          }

          // 2. Load Candidates
          const liveCandidates = await fetchVerifiedCandidates(token);
          if (Array.isArray(liveCandidates)) {
            setCandidates(liveCandidates);
            if (liveCandidates.length > 0 && !selectedCandidateForInterview) {
              setSelectedCandidateForInterview(liveCandidates[0]!.name);
            }
          }

          // 3. Load Interviews
          const liveInterviews = await fetchInterviews(token);
          if (Array.isArray(liveInterviews)) {
            setInterviews(
              liveInterviews.map((i: any) => ({
                id: i.id,
                candidateName: i.candidate_name,
                candidateRole: i.candidate_role,
                date: i.date,
                time: i.time,
                roundType: i.round_type,
                interviewer: i.interviewer,
                meetingLink: `https://meet.google.com/ckt-${(i.id || "live").slice(-6)}`,
                status: i.status || "Scheduled",
              }))
            );
          }
        }
      } catch (err) {
        console.warn("Failed to load recruiter data:", err);
      }
    }

    loadData();
  }, [user.uid]);

  // Handlers
  async function handleCreateJob(e: React.FormEvent) {
    e.preventDefault();
    if (!newJobTitle.trim()) return;

    const payload = {
      company_name: profile?.companyName || "Hiring Company",
      title: newJobTitle.trim(),
      department: newJobDept,
      location: newJobLocation,
      type: newJobType,
      salary: newJobSalary,
      min_score: parseInt(newJobMinScore) || 80,
      skills: newJobSkills.split(",").map((s) => s.trim()).filter(Boolean),
      status: "Active" as const,
    };

    const token = await getFirebaseIdToken();
    if (token) {
      const saved = await createJobPosting(token, payload);
      if (saved) {
        setJobs((prev) => [
          {
            id: saved.id || `job-${Date.now()}`,
            title: saved.title,
            department: saved.department || "Engineering",
            location: saved.location || "Remote",
            type: saved.type || "Full-Time",
            salary: saved.salary || "Competitive",
            applicants: 0,
            shortlisted: 0,
            avgScore: saved.min_score || 85,
            status: "Active",
            skills: saved.skills || ["React", "TypeScript"],
            minScore: saved.min_score || 80,
            createdDate: "Just now",
          },
          ...prev,
        ]);
      }
    } else {
      setJobs((prev) => [
        {
          id: `job-${Date.now()}`,
          ...payload,
          applicants: 0,
          shortlisted: 0,
          avgScore: payload.min_score,
          minScore: payload.min_score,
          createdDate: "Just now",
        },
        ...prev,
      ]);
    }

    setShowPostJobModal(false);
    setNewJobTitle("");
    setActionNotice(`Job posting '${newJobTitle}' published successfully!`);
    setTimeout(() => setActionNotice(null), 3500);
  }

  async function handleScheduleInterviewSubmit(e: React.FormEvent) {
    e.preventDefault();
    const candidateName = selectedCandidateForInterview || "Candidate";
    const payload = {
      candidate_name: candidateName,
      candidate_role: "Senior Engineer",
      date: interviewDate,
      time: interviewTime,
      round_type: interviewRound,
      interviewer: interviewerName,
    };

    const token = await getFirebaseIdToken();
    if (token) {
      const saved = await scheduleInterview(token, payload);
      const newInterview: InterviewScheduleItem = {
        id: saved?.id || `int-${Date.now()}`,
        candidateName: payload.candidate_name,
        candidateRole: payload.candidate_role,
        date: payload.date,
        time: payload.time,
        roundType: payload.round_type as any,
        interviewer: payload.interviewer,
        meetingLink: `https://meet.google.com/ckt-${Date.now().toString().slice(-6)}`,
        status: "Scheduled",
      };
      setInterviews((prev) => [newInterview, ...prev]);
    }

    setShowScheduleModal(false);
    setActionNotice(`Interview scheduled for ${candidateName} on ${interviewDate}!`);
    setTimeout(() => setActionNotice(null), 3500);
  }

  function handleCandidateStatusChange(candidateId: string, newStatus: RecruiterCandidateItem["status"]) {
    setCandidates((prev) =>
      prev.map((c) => (c.id === candidateId ? { ...c, status: newStatus } : c))
    );
    setActionNotice(`Candidate status updated to '${newStatus}'!`);
    setTimeout(() => setActionNotice(null), 3000);
  }

  function handleExportShortlist() {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Name,Email,Institution,Role,ProofScore,AI_Percent,Plagiarism,Status\n" +
      candidates
        .map(
          (c) =>
            `"${c.name}","${c.email}","${c.institution}","${c.targetRole}",${c.proofScore},"${c.aiPercentage}","${c.plagiarism}","${c.status}"`
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `CheckTalent_Shortlisted_Candidates_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setActionNotice("Exported shortlisted candidates to CSV!");
    setTimeout(() => setActionNotice(null), 3000);
  }

  const filteredCandidates = candidates.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.topSkills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesScore = c.proofScore >= minScoreFilter;
    if (candidateFilter === "all") return matchesSearch && matchesScore;
    return matchesSearch && matchesScore && c.status === candidateFilter;
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
                Off-Campus Companies Portal
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
              {profile?.headline ? `${profile.headline} • ` : "Technical Recruiting Workspace • "}
              Access off-campus software talent vetted by verifiable git commits, anti-plagiarism AST checks, and code architecture proofs.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowPostJobModal(true)}
              className="flex items-center gap-2 rounded-xl bg-[#D9481E] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-[#B93615]"
            >
              <Plus className="h-4 w-4" />
              Post Off-Campus Job
            </button>

            <button
              onClick={() => {
                setSelectedCandidateForInterview(candidates[0]?.name || "Aditya Sharma");
                setShowScheduleModal(true);
              }}
              className="flex items-center gap-2 rounded-xl border border-[#1C1613]/15 bg-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-ink transition hover:bg-[#FAF7F2]"
            >
              <Calendar className="h-4 w-4 text-[#D9481E]" />
              Schedule Interview
            </button>

            <button
              onClick={handleExportShortlist}
              className="flex items-center gap-2 rounded-xl border border-[#1C1613]/15 bg-[#FAF7F2] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#1C1613] transition hover:bg-white"
            >
              <Download className="h-4 w-4 text-[#D9481E]" />
              Export Shortlist (CSV)
            </button>
          </div>
        </div>

        {/* 4 Core Quick Metrics */}
        <div className="mt-8 grid grid-cols-2 gap-4 border-t border-[#1C1613]/10 pt-6 lg:grid-cols-4">
          <div className="rounded-2xl border border-[#1C1613]/5 bg-[#FAF7F2] p-4">
            <div className="flex items-center justify-between text-xs font-semibold text-[#756A62]">
              <span>Active Job Openings</span>
              <Briefcase className="h-4 w-4 text-[#D9481E]" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="aldrich-regular text-2xl font-bold text-[#1C1613] sm:text-3xl">
                {jobs.filter((j) => j.status === "Active").length}
              </span>
              <span className="text-xs font-semibold text-emerald-600">All Live</span>
            </div>
            <p className="mt-1 text-[11px] text-[#8C8077]">342 verified candidates applied</p>
          </div>

          <div className="rounded-2xl border border-[#1C1613]/5 bg-[#FAF7F2] p-4">
            <div className="flex items-center justify-between text-xs font-semibold text-[#756A62]">
              <span>Shortlisted Talent</span>
              <Users className="h-4 w-4 text-[#E9A23B]" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="aldrich-regular text-2xl font-bold text-[#1C1613] sm:text-3xl">
                {candidates.filter((c) => c.status === "Shortlisted" || c.status === "Interview Scheduled").length}
              </span>
              <span className="text-xs font-semibold text-blue-600">High Proof Score</span>
            </div>
            <p className="mt-1 text-[11px] text-[#8C8077]">Average Proof Score: 92/100</p>
          </div>

          <div className="rounded-2xl border border-[#1C1613]/5 bg-[#FAF7F2] p-4">
            <div className="flex items-center justify-between text-xs font-semibold text-[#756A62]">
              <span>Plagiarism Auto-Rejected</span>
              <ShieldAlert className="h-4 w-4 text-red-600" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="aldrich-regular text-2xl font-bold text-red-700 sm:text-3xl">34%</span>
              <span className="text-xs font-semibold text-red-700">Flagged Clones</span>
            </div>
            <p className="mt-1 text-[11px] text-[#8C8077]">128 engineering interview hours saved</p>
          </div>

          <div className="rounded-2xl border border-[#1C1613]/5 bg-[#FAF7F2] p-4">
            <div className="flex items-center justify-between text-xs font-semibold text-[#756A62]">
              <span>Interviews Scheduled</span>
              <Video className="h-4 w-4 text-purple-600" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="aldrich-regular text-2xl font-bold text-[#1C1613] sm:text-3xl">
                {interviews.filter((i) => i.status === "Scheduled").length}
              </span>
              <span className="text-xs font-semibold text-purple-600">This Week</span>
            </div>
            <p className="mt-1 text-[11px] text-[#8C8077]">Google Meet links generated</p>
          </div>
        </div>
      </section>

      {/* Action Notification Toast */}
      {actionNotice && (
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-50 p-4 text-xs font-semibold text-emerald-800 flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#1C1613]/10 pb-2">
        <button
          onClick={() => setActiveTab("overview")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition ${
            activeTab === "overview"
              ? "bg-[#D9481E] text-white shadow-sm"
              : "bg-white text-[#756A62] hover:bg-[#FAF7F2] hover:text-[#1C1613]"
          }`}
        >
          <Award className="h-4 w-4" />
          Hiring Pipeline Overview
        </button>

        <button
          onClick={() => setActiveTab("jobs")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition ${
            activeTab === "jobs"
              ? "bg-[#D9481E] text-white shadow-sm"
              : "bg-white text-[#756A62] hover:bg-[#FAF7F2] hover:text-[#1C1613]"
          }`}
        >
          <Briefcase className="h-4 w-4" />
          Job Postings ({jobs.length})
        </button>

        <button
          onClick={() => setActiveTab("candidates")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition ${
            activeTab === "candidates"
              ? "bg-[#D9481E] text-white shadow-sm"
              : "bg-white text-[#756A62] hover:bg-[#FAF7F2] hover:text-[#1C1613]"
          }`}
        >
          <Users className="h-4 w-4" />
          Pre-Verified Talent Pool ({candidates.length})
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
          Interview Rounds ({interviews.length})
        </button>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === "overview" && (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left 2 Cols: Pipeline & Recent Activity */}
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-3xl border border-[#1C1613]/10 bg-white p-6 shadow-sm">
              <h3 className="aldrich-regular text-lg font-bold text-ink">
                Hiring Pipeline Funnel
              </h3>
              <p className="text-xs text-[#756A62]">
                Candidates filtered by cryptographic Proof Score, zero tutorial overlap, and code defense vivas.
              </p>

              <div className="mt-6 grid grid-cols-4 gap-3 text-center">
                <div className="rounded-2xl border border-[#1C1613]/10 bg-[#FAF7F2] p-4">
                  <span className="text-xs font-semibold text-[#756A62]">Applied</span>
                  <p className="aldrich-regular mt-1 text-2xl font-bold text-ink">342</p>
                  <span className="text-[10px] text-[#8C8077]">100% Code Audited</span>
                </div>
                <div className="rounded-2xl border border-amber-300 bg-amber-50/60 p-4">
                  <span className="text-xs font-semibold text-amber-900">Passed Cutoff</span>
                  <p className="aldrich-regular mt-1 text-2xl font-bold text-amber-900">62</p>
                  <span className="text-[10px] text-amber-800">Score &ge; 85</span>
                </div>
                <div className="rounded-2xl border border-blue-300 bg-blue-50/60 p-4">
                  <span className="text-xs font-semibold text-blue-900">Interviews</span>
                  <p className="aldrich-regular mt-1 text-2xl font-bold text-blue-900">18</p>
                  <span className="text-[10px] text-blue-800">Technical Viva</span>
                </div>
                <div className="rounded-2xl border border-emerald-300 bg-emerald-50/60 p-4">
                  <span className="text-xs font-semibold text-emerald-900">Offers</span>
                  <p className="aldrich-regular mt-1 text-2xl font-bold text-emerald-900">7</p>
                  <span className="text-[10px] text-emerald-800">High Match</span>
                </div>
              </div>
            </div>

            {/* Plagiarism & AI Forensics Protection Spotlight */}
            <div className="rounded-3xl border border-red-300/80 bg-gradient-to-br from-red-50/80 via-white to-orange-50/60 p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-red-800">
                  <ShieldAlert className="h-5 w-5" />
                  <h3 className="aldrich-regular text-lg font-bold">
                    Automated Plagiarism & AI Dump Filter Active
                  </h3>
                </div>
                <span className="rounded-full bg-red-100 px-3 py-1 font-mono text-xs font-bold text-red-900">
                  116 Clones Filtered
                </span>
              </div>

              <p className="mt-2 text-xs text-[#756A62] leading-relaxed">
                CheckTalent automatically scans applicant ASTs against 1.8M public YouTube starters (Netflix clone, Spotify clone, MERN courses) and unedited ChatGPT prompt dumps before your engineers ever open their resume.
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-3 text-xs">
                <div className="rounded-xl border border-red-200 bg-white p-3">
                  <span className="font-bold text-red-800">62 Tutorial Clones</span>
                  <p className="text-[11px] text-[#756A62] mt-0.5">Single commit copied YouTube code.</p>
                </div>
                <div className="rounded-xl border border-red-200 bg-white p-3">
                  <span className="font-bold text-red-800">38 AI Prompt Dumps</span>
                  <p className="text-[11px] text-[#756A62] mt-0.5">100% boilerplate with zero tests.</p>
                </div>
                <div className="rounded-xl border border-red-200 bg-white p-3">
                  <span className="font-bold text-red-800">16 Fake Timelines</span>
                  <p className="text-[11px] text-[#756A62] mt-0.5">Artificially generated git backdates.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Col: Top Candidates Spotlight */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-[#1C1613]/10 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="aldrich-regular text-base font-bold text-ink">
                  Top Recommended Engineers
                </h3>
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                  Proof Score 90+
                </span>
              </div>

              <div className="mt-4 space-y-3.5">
                {candidates.slice(0, 3).map((cand) => (
                  <div
                    key={cand.id}
                    className="flex flex-col justify-between rounded-2xl border border-[#1C1613]/10 bg-[#FAF7F2] p-4 transition hover:border-[#D9481E]"
                  >
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-bold text-ink text-sm">{cand.name}</h4>
                          <p className="text-xs text-[#756A62]">{cand.institution}</p>
                        </div>
                        <span className="aldrich-regular text-sm font-bold text-[#D9481E]">
                          {cand.proofScore}/100
                        </span>
                      </div>

                      <p className="mt-2 text-xs font-medium text-emerald-800">
                        Highlight: {cand.highlightRepo}
                      </p>
                    </div>

                    <div className="mt-3 flex items-center justify-between border-t border-[#1C1613]/10 pt-2 text-xs">
                      <span className="text-[11px] text-[#8C8077]">{cand.plagiarism} Plagiarism</span>
                      <button
                        onClick={() => setSelectedCandidateForAudit(cand)}
                        className="font-bold text-[#D9481E] hover:underline"
                      >
                        Inspect Dossier &rarr;
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setActiveTab("candidates")}
                className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl border border-[#1C1613]/15 py-2.5 text-xs font-bold uppercase tracking-wider text-ink transition hover:bg-[#FAF7F2]"
              >
                <span>View Full Talent Pool</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Job Postings Management */}
      {activeTab === "jobs" && (
        <div className="space-y-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="aldrich-regular text-2xl font-bold text-ink">
                Active Job Postings ({jobs.length})
              </h2>
              <p className="text-xs text-[#756A62]">
                Configure required skills and minimum cryptographic Proof Score cutoffs for inbound applications.
              </p>
            </div>

            <button
              onClick={() => setShowPostJobModal(true)}
              className="flex items-center gap-2 rounded-xl bg-[#D9481E] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-[#B93615]"
            >
              <Plus className="h-4 w-4" />
              Create Job Posting
            </button>
          </div>

          {jobs.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-[#1C1613]/20 bg-white p-12 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D9481E]/10 text-[#D9481E]">
                <Briefcase className="h-7 w-7" />
              </div>
              <h3 className="aldrich-regular mt-4 text-lg font-bold text-ink">No Job Postings Published Yet</h3>
              <p className="mt-1 max-w-md text-xs text-[#756A62]">
                Create your first opening to receive applications pre-audited with AST scores, AI detection, and genuine authorship verification.
              </p>
              <button
                onClick={() => setShowPostJobModal(true)}
                className="mt-5 flex items-center gap-2 rounded-xl bg-[#D9481E] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-[#B93615]"
              >
                <Plus className="h-4 w-4" />
                Publish Your First Job
              </button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="flex flex-col justify-between rounded-3xl border border-[#1C1613]/10 bg-white p-6 shadow-sm transition hover:border-[#D9481E]"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-ink text-lg">{job.title}</h3>
                        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                          {job.status}
                        </span>
                      </div>
                      <p className="text-xs text-[#756A62] mt-0.5">
                        {job.department} • {job.location} • {job.type}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="aldrich-regular text-sm font-bold text-[#D9481E]">
                        Cutoff: {job.minScore}+
                      </span>
                      <p className="text-[10px] text-[#756A62]">Proof Score</p>
                    </div>
                  </div>

                  <p className="mt-3 font-semibold text-xs text-[#52463F]">Salary: {job.salary}</p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {job.skills.map((sk, idx) => (
                      <span
                        key={idx}
                        className="rounded-md border border-[#1C1613]/10 bg-[#FAF7F2] px-2 py-0.5 text-[10px] font-medium text-[#52463F]"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2 rounded-2xl bg-[#FAF7F2] p-3 text-center text-xs">
                    <div>
                      <span className="text-[11px] text-[#756A62]">Total Applicants</span>
                      <p className="font-bold text-ink mt-0.5">{job.applicants}</p>
                    </div>
                    <div>
                      <span className="text-[11px] text-[#756A62]">Shortlisted</span>
                      <p className="font-bold text-emerald-700 mt-0.5">{job.shortlisted}</p>
                    </div>
                    <div>
                      <span className="text-[11px] text-[#756A62]">Avg Proof Score</span>
                      <p className="font-bold text-[#D9481E] mt-0.5">{job.avgScore}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-[#1C1613]/10 pt-3 text-xs">
                  <span className="text-[11px] text-[#8C8077]">Posted: {job.createdDate}</span>
                  <button
                    onClick={() => {
                      setSearchQuery(job.skills[0] || "");
                      setActiveTab("candidates");
                    }}
                    className="font-bold text-[#D9481E] hover:underline"
                  >
                    View Matching Candidates &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
          )}
        </div>
      )}

      {/* Tab 3: Pre-Verified Talent Pool */}
      {activeTab === "candidates" && (
        <div className="space-y-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="aldrich-regular text-2xl font-bold text-ink">
                Pre-Verified Talent Pool ({filteredCandidates.length})
              </h2>
              <p className="text-xs text-[#756A62]">
                Explore developers whose repositories are already audited for genuine commits, AI ratios, and Viva defenses.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleExportShortlist}
                className="flex items-center gap-2 rounded-xl border border-[#1C1613]/15 bg-white px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-ink transition hover:bg-[#FAF7F2]"
              >
                <Download className="h-4 w-4" />
                Export Shortlist
              </button>
            </div>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="flex flex-col gap-3 rounded-2xl border border-[#1C1613]/10 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#8C8077]" />
              <input
                type="text"
                placeholder="Search candidates by name, college, or skill (e.g. Go, React, Rust)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-[#1C1613]/15 pl-9 pr-4 py-2 text-xs focus:border-[#D9481E] focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-[#756A62]">Min Proof Score:</span>
              <select
                value={minScoreFilter}
                onChange={(e) => setMinScoreFilter(parseInt(e.target.value))}
                className="rounded-xl border border-[#1C1613]/15 bg-white px-3 py-2 text-xs font-semibold text-ink"
              >
                <option value={75}>75+ (All Verified)</option>
                <option value={85}>85+ (High Quality)</option>
                <option value={90}>90+ (Top Tier 5%)</option>
              </select>

              <select
                value={candidateFilter}
                onChange={(e) => setCandidateFilter(e.target.value)}
                className="rounded-xl border border-[#1C1613]/15 bg-white px-3 py-2 text-xs font-semibold text-ink"
              >
                <option value="all">All Statuses</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Interview Scheduled">Interview Scheduled</option>
                <option value="Under Review">Under Review</option>
              </select>
            </div>
          </div>

          {/* Candidates Grid */}
          {filteredCandidates.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-[#1C1613]/20 bg-white p-12 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E9A23B]/10 text-[#E9A23B]">
                <Users className="h-7 w-7" />
              </div>
              <h3 className="aldrich-regular mt-4 text-lg font-bold text-ink">No Candidates in Discovery Pool Yet</h3>
              <p className="mt-1 max-w-md text-xs text-[#756A62]">
                As candidate students connect repositories and complete AI code audits, verified developers matching your criteria will populate here.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
            {filteredCandidates.map((cand) => (
              <div
                key={cand.id}
                className="flex flex-col justify-between rounded-3xl border border-[#1C1613]/10 bg-white p-6 shadow-sm transition hover:border-[#D9481E]"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${cand.avatarColor} text-white font-bold text-sm`}>
                        {cand.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-ink">{cand.name}</h3>
                        <p className="text-xs text-[#756A62]">{cand.institution} • {cand.targetRole}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="aldrich-regular text-xl font-bold text-[#D9481E]">
                        {cand.proofScore}/100
                      </span>
                      <p className="text-[10px] text-emerald-700 font-bold">Top 5%</p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2 rounded-2xl bg-[#FAF7F2] p-2.5 text-center text-xs">
                    <div>
                      <span className="text-[11px] text-[#756A62]">Plagiarism</span>
                      <p className="font-bold text-emerald-700">{cand.plagiarism} Clean</p>
                    </div>
                    <div>
                      <span className="text-[11px] text-[#756A62]">AI Ratio</span>
                      <p className="font-bold text-ink">{cand.aiPercentage}</p>
                    </div>
                    <div>
                      <span className="text-[11px] text-[#756A62]">Audited Repos</span>
                      <p className="font-bold text-ink">{cand.reposAudited}</p>
                    </div>
                  </div>

                  <p className="mt-3 text-xs text-[#52463F]">
                    <strong>Flagship Project:</strong> {cand.highlightRepo}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1">
                    {cand.topSkills.map((sk, i) => (
                      <span
                        key={i}
                        className="rounded-md border border-[#1C1613]/10 bg-white px-2 py-0.5 text-[10px] font-medium text-[#52463F]"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-[#1C1613]/10 pt-3 text-xs">
                  <button
                    onClick={() => setSelectedCandidateForAudit(cand)}
                    className="font-bold text-[#D9481E] hover:underline flex items-center gap-1"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    Inspect Full Code Dossier
                  </button>

                  <div className="flex items-center gap-1.5">
                    {cand.status !== "Shortlisted" && cand.status !== "Interview Scheduled" && (
                      <button
                        onClick={() => handleCandidateStatusChange(cand.id, "Shortlisted")}
                        className="rounded-lg border border-emerald-500/30 bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-800 hover:bg-emerald-100"
                      >
                        Shortlist
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setSelectedCandidateForInterview(cand.name);
                        setShowScheduleModal(true);
                      }}
                      className="rounded-lg bg-[#1C1613] px-2.5 py-1 text-[11px] font-bold text-white hover:bg-black"
                    >
                      Schedule Interview
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          )}
        </div>
      )}

      {/* Tab 4: Interview Rounds & Pipeline */}
      {activeTab === "interviews" && (
        <div className="space-y-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="aldrich-regular text-2xl font-bold text-ink">
                Interview Pipeline & Video Rounds ({interviews.length})
              </h2>
              <p className="text-xs text-[#756A62]">
                Technical code vivas and system architecture defense sessions scheduled with shortlisted candidates.
              </p>
            </div>

            <button
              onClick={() => setShowScheduleModal(true)}
              className="flex items-center gap-2 rounded-xl bg-[#D9481E] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-[#B93615]"
            >
              <Plus className="h-4 w-4" />
              Schedule New Interview
            </button>
          </div>

          {interviews.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-[#1C1613]/20 bg-white p-12 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-purple-700">
                <Video className="h-7 w-7" />
              </div>
              <h3 className="aldrich-regular mt-4 text-lg font-bold text-ink">No Interviews Scheduled Yet</h3>
              <p className="mt-1 max-w-md text-xs text-[#756A62]">
                Select a candidate from the talent pool or click 'Schedule New Interview' to coordinate technical code defense or system architecture sessions.
              </p>
              <button
                onClick={() => setShowScheduleModal(true)}
                className="mt-5 flex items-center gap-2 rounded-xl bg-[#1C1613] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-[#3D352E]"
              >
                <Plus className="h-4 w-4" />
                Schedule First Interview
              </button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-3">
            {interviews.map((item) => (
              <div
                key={item.id}
                className="flex flex-col justify-between rounded-3xl border border-[#1C1613]/10 bg-white p-6 shadow-sm"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-ink text-base">{item.candidateName}</h3>
                      <p className="text-xs text-[#756A62]">{item.candidateRole}</p>
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                        item.status === "Scheduled"
                          ? "bg-blue-50 text-blue-800"
                          : "bg-emerald-50 text-emerald-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <div className="mt-4 space-y-2 rounded-2xl bg-[#FAF7F2] p-3 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[#756A62]">Round Type:</span>
                      <span className="font-bold text-ink">{item.roundType}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#756A62]">Date & Time:</span>
                      <span className="font-bold text-ink">{item.date} • {item.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#756A62]">Interviewer:</span>
                      <span className="font-semibold text-[#52463F]">{item.interviewer}</span>
                    </div>
                  </div>

                  {item.scorecardNotes && (
                    <div className="mt-3 rounded-xl border border-emerald-500/20 bg-emerald-50/50 p-2.5 text-[11px] text-emerald-950">
                      <strong>Notes:</strong> {item.scorecardNotes}
                    </div>
                  )}
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-[#1C1613]/10 pt-3 text-xs">
                  <a
                    href={item.meetingLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 font-bold text-[#D9481E] hover:underline"
                  >
                    <Video className="h-3.5 w-3.5" />
                    Join Video Call
                  </a>

                  <span className="font-mono text-[11px] text-[#8C8077]">
                    Google Meet
                  </span>
                </div>
              </div>
            ))}
          </div>
          )}
        </div>
      )}

      {/* MODAL 1: Create Job Posting */}
      {showPostJobModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-3xl border border-[#1C1613]/10 bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1C1613]/10 pb-3">
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-[#D9481E]" />
                <h3 className="aldrich-regular text-lg font-bold text-ink">Post Off-Campus Job</h3>
              </div>
              <button
                onClick={() => setShowPostJobModal(false)}
                className="rounded-lg p-1 text-[#756A62] hover:bg-[#FAF7F2]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreateJob} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-[#52463F] mb-1">Job Title</label>
                <input
                  type="text"
                  placeholder="e.g. Backend Systems Engineer"
                  value={newJobTitle}
                  onChange={(e) => setNewJobTitle(e.target.value)}
                  className="w-full rounded-xl border border-[#1C1613]/15 px-3 py-2 text-xs focus:border-[#D9481E] focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#52463F] mb-1">Location</label>
                  <input
                    type="text"
                    value={newJobLocation}
                    onChange={(e) => setNewJobLocation(e.target.value)}
                    className="w-full rounded-xl border border-[#1C1613]/15 px-3 py-2 text-xs focus:border-[#D9481E] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#52463F] mb-1">Type</label>
                  <select
                    value={newJobType}
                    onChange={(e) => setNewJobType(e.target.value as "Full-Time" | "Internship")}
                    className="w-full rounded-xl border border-[#1C1613]/15 px-3 py-2 text-xs focus:border-[#D9481E] focus:outline-none"
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Internship">Internship (PPO)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#52463F] mb-1">Salary / CTC</label>
                  <input
                    type="text"
                    value={newJobSalary}
                    onChange={(e) => setNewJobSalary(e.target.value)}
                    className="w-full rounded-xl border border-[#1C1613]/15 px-3 py-2 text-xs focus:border-[#D9481E] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#52463F] mb-1">Min Proof Score Cutoff</label>
                  <input
                    type="number"
                    min="50"
                    max="99"
                    value={newJobMinScore}
                    onChange={(e) => setNewJobMinScore(e.target.value)}
                    className="w-full rounded-xl border border-[#1C1613]/15 px-3 py-2 text-xs focus:border-[#D9481E] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#52463F] mb-1">Required Skills (Comma separated)</label>
                <input
                  type="text"
                  value={newJobSkills}
                  onChange={(e) => setNewJobSkills(e.target.value)}
                  className="w-full rounded-xl border border-[#1C1613]/15 px-3 py-2 text-xs focus:border-[#D9481E] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowPostJobModal(false)}
                  className="rounded-xl border border-[#1C1613]/15 px-4 py-2 text-xs font-semibold text-[#52463F] hover:bg-[#FAF7F2]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#D9481E] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#B93615]"
                >
                  Publish Job
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Schedule Interview */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-3xl border border-[#1C1613]/10 bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1C1613]/10 pb-3">
              <div className="flex items-center gap-2">
                <Video className="h-5 w-5 text-[#D9481E]" />
                <h3 className="aldrich-regular text-lg font-bold text-ink">Schedule Technical Interview</h3>
              </div>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="rounded-lg p-1 text-[#756A62] hover:bg-[#FAF7F2]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleScheduleInterviewSubmit} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-[#52463F] mb-1">Candidate</label>
                <select
                  value={selectedCandidateForInterview}
                  onChange={(e) => setSelectedCandidateForInterview(e.target.value)}
                  className="w-full rounded-xl border border-[#1C1613]/15 px-3 py-2 text-xs focus:border-[#D9481E] focus:outline-none"
                >
                  {candidates.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name} ({c.targetRole} • Proof Score: {c.proofScore})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#52463F] mb-1">Date</label>
                  <input
                    type="date"
                    value={interviewDate}
                    onChange={(e) => setInterviewDate(e.target.value)}
                    className="w-full rounded-xl border border-[#1C1613]/15 px-3 py-2 text-xs focus:border-[#D9481E] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#52463F] mb-1">Time</label>
                  <input
                    type="text"
                    value={interviewTime}
                    onChange={(e) => setInterviewTime(e.target.value)}
                    className="w-full rounded-xl border border-[#1C1613]/15 px-3 py-2 text-xs focus:border-[#D9481E] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#52463F] mb-1">Round Type</label>
                <select
                  value={interviewRound}
                  onChange={(e) => setInterviewRound(e.target.value as any)}
                  className="w-full rounded-xl border border-[#1C1613]/15 px-3 py-2 text-xs focus:border-[#D9481E] focus:outline-none"
                >
                  <option value="Technical Viva">Technical Viva (Line-Anchored Code Defense)</option>
                  <option value="System Architecture">System Architecture & Trade-Offs</option>
                  <option value="Founder Fit">Founder / Cultural Alignment</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#52463F] mb-1">Lead Interviewer</label>
                <input
                  type="text"
                  value={interviewerName}
                  onChange={(e) => setInterviewerName(e.target.value)}
                  className="w-full rounded-xl border border-[#1C1613]/15 px-3 py-2 text-xs focus:border-[#D9481E] focus:outline-none"
                  required
                />
              </div>

              <p className="text-[11px] text-[#756A62]">
                A Google Meet link and technical briefing dossier with the candidate's AST flags will be emailed automatically.
              </p>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowScheduleModal(false)}
                  className="rounded-xl border border-[#1C1613]/15 px-4 py-2 text-xs font-semibold text-[#52463F] hover:bg-[#FAF7F2]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#D9481E] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#B93615]"
                >
                  Confirm & Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: Candidate Code Audit Dossier Drawer */}
      {selectedCandidateForAudit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-[#1C1613]/10 bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1C1613]/10 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
                <div>
                  <h3 className="aldrich-regular text-lg font-bold text-ink">
                    Candidate Code Audit: {selectedCandidateForAudit.name}
                  </h3>
                  <p className="text-xs text-[#756A62]">{selectedCandidateForAudit.institution} • {selectedCandidateForAudit.targetRole}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCandidateForAudit(null)}
                className="rounded-lg p-1 text-[#756A62] hover:bg-[#FAF7F2]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-3 gap-3 rounded-2xl bg-[#FAF7F2] p-4 text-center">
                <div>
                  <span className="text-xs text-[#756A62]">Proof Score</span>
                  <p className="aldrich-regular text-2xl font-bold text-[#D9481E]">
                    {selectedCandidateForAudit.proofScore}/100
                  </p>
                </div>
                <div>
                  <span className="text-xs text-[#756A62]">AI Scaffolding</span>
                  <p className="text-2xl font-bold text-emerald-700">{selectedCandidateForAudit.aiPercentage}</p>
                </div>
                <div>
                  <span className="text-xs text-[#756A62]">Plagiarism</span>
                  <p className="text-2xl font-bold text-emerald-700">{selectedCandidateForAudit.plagiarism} Clean</p>
                </div>
              </div>

              {/* Verified Git Timeline */}
              <div className="rounded-2xl border border-[#1C1613]/10 p-4">
                <h4 className="text-xs font-bold text-ink mb-2">Organic Git Commit Chronology:</h4>
                <div className="space-y-2 text-xs text-[#52463F]">
                  <div className="flex items-center justify-between border-b border-[#1C1613]/5 pb-1.5">
                    <span>Repository: {selectedCandidateForAudit.highlightRepo}</span>
                    <span className="font-bold text-emerald-700">Verified Authorship</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-[#1C1613]/5 pb-1.5">
                    <span>Commit Cadence:</span>
                    <span>14 weeks organic commits (Zero single-commit dumps)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>AST Cyclomatic Uniformity:</span>
                    <span>Natural human branching patterns (94% confidence)</span>
                  </div>
                </div>
              </div>

              {/* Recorded Viva Transcript */}
              <div className="rounded-2xl border border-orange-200 bg-orange-50/40 p-4">
                <h4 className="text-xs font-bold text-orange-950 mb-1">
                  Recorded AI Code Defense Viva (Pass)
                </h4>
                <p className="text-xs text-[#52463F] italic">
                  "Candidate successfully defended quorum lease renewal in network partitions with 95% depth and zero reliance on copied generic prompt structures."
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-[#1C1613]/10 pt-3">
                <button
                  onClick={() => setSelectedCandidateForAudit(null)}
                  className="rounded-xl border border-[#1C1613]/15 px-4 py-2 text-xs font-semibold text-[#52463F]"
                >
                  Close Dossier
                </button>

                <button
                  onClick={() => {
                    handleCandidateStatusChange(selectedCandidateForAudit.id, "Shortlisted");
                    setSelectedCandidateForAudit(null);
                  }}
                  className="rounded-xl bg-[#D9481E] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#B93615]"
                >
                  Accept & Shortlist Candidate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
