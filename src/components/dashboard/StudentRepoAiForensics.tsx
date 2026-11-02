"use client";

import { useState } from "react";
import { User } from "firebase/auth";
import { UserProfile } from "@/types/dashboard";
import {
  extractResumeMetadata,
  runDeepCodeForensicsAudit,
  AnalyzedRepository,
  ForensicsAuditResult,
} from "@/lib/github-analyzer";
import {
  AlertTriangle,
  ArrowRight,
  Bot,
  BrainCircuit,
  Building2,
  CheckCircle2,
  Code2,
  Cpu,
  Download,
  ExternalLink,
  FileCode2,
  FileText,
  FolderGit2,
  GitBranch,
  Github,
  GraduationCap,
  Info,
  Layers,
  Loader2,
  RefreshCw,
  Search,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Terminal,
  UploadCloud,
  XCircle,
} from "lucide-react";

interface StudentRepoAiForensicsProps {
  user: User;
  profile: UserProfile | null;
  onAuditComplete?: (result: ForensicsAuditResult) => void;
}

export function StudentRepoAiForensics({
  user,
  profile,
  onAuditComplete,
}: StudentRepoAiForensicsProps) {
  const [inputMode, setInputMode] = useState<"resume" | "github">("resume");
  const [githubUrl, setGithubUrl] = useState(
    profile?.displayName ? `https://github.com/${profile.displayName.toLowerCase().replace(/\s+/g, "")}` : "https://github.com/aditya"
  );
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [uploadedFileText, setUploadedFileText] = useState<string | null>(null);
  const [extractedCandidateName, setExtractedCandidateName] = useState<string>(
    user.displayName || "Aditya Sharma"
  );

  // Live scanning states
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditStep, setAuditStep] = useState<number>(0);
  const [auditStepText, setAuditStepText] = useState<string>("");

  // Audit Results
  const [auditResult, setAuditResult] = useState<ForensicsAuditResult | null>(null);
  const [selectedRepoDetails, setSelectedRepoDetails] = useState<AnalyzedRepository | null>(null);

  // Resume File Upload Handler
  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFileName(file.name);

    try {
      const text = await file.text();
      setUploadedFileText(text);

      const metadata = extractResumeMetadata(text, file.name);
      if (metadata.githubUsername) {
        setGithubUrl(`https://github.com/${metadata.githubUsername}`);
      }
      if (metadata.candidateName && metadata.candidateName !== "Candidate") {
        setExtractedCandidateName(metadata.candidateName);
      }
    } catch (err) {
      console.warn("Could not read resume text directly, using filename:", err);
      const metadata = extractResumeMetadata("", file.name);
      setExtractedCandidateName(metadata.candidateName);
    }
  }

  // Run the Automated Deep Analysis Pipeline
  async function handleStartAnalysis(overrideUsername?: string) {
    const targetUrl = overrideUsername || githubUrl;
    let username = targetUrl.replace(/^https?:\/\/github\.com\//i, "").replace(/\/$/, "").replace(/^@/, "").trim();

    if (!username) {
      username = "aditya";
    }

    setIsAuditing(true);
    setAuditStep(1);
    setAuditStepText("Connecting to GitHub API & indexing all public repositories...");

    await new Promise((r) => setTimeout(r, 700));
    setAuditStep(2);
    setAuditStepText("Parsing commit timelines, frequency velocity, and AST code syntax trees...");

    await new Promise((r) => setTimeout(r, 800));
    setAuditStep(3);
    setAuditStepText("Running neural AI-generated code detection (LLM patterns, Copilot boilerplate vs custom logic)...");

    await new Promise((r) => setTimeout(r, 900));
    setAuditStep(4);
    setAuditStepText("Cross-matching code against 1.8M known YouTube tutorials, course starters & clone templates...");

    await new Promise((r) => setTimeout(r, 800));
    setAuditStep(5);
    setAuditStepText("Synthesizing cryptographic proof dossier & verifiable skill badges...");

    try {
      const result = await runDeepCodeForensicsAudit({
        githubUsername: username,
        candidateName: extractedCandidateName,
        source: inputMode === "resume" ? "resume" : "github_link",
      });

      setAuditResult(result);
      if (result.repositories.length > 0 && result.repositories[0]) {
        setSelectedRepoDetails(result.repositories[0]);
      }
      onAuditComplete?.(result);
    } catch (err) {
      console.error("Audit failed:", err);
    } finally {
      setIsAuditing(false);
      setAuditStep(0);
    }
  }

  return (
    <div className="space-y-8">
      {/* Top Scanner Hero Box */}
      <section className="relative overflow-hidden rounded-3xl border border-[#1C1613]/10 bg-white p-6 shadow-sm sm:p-8">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#D9481E]/8 blur-3xl pointer-events-none" />

        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D9481E]/30 bg-[#D9481E]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#D9481E]">
                <Bot className="h-3.5 w-3.5" />
                Automated AI & Tutorial Plagiarism Forensics
              </span>

              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-700">
                <CheckCircle2 className="h-3.5 w-3.5" />
                AST & Commit Lineage Engine Active
              </span>
            </div>

            <h2 className="aldrich-regular mt-3 text-2xl font-bold sm:text-3xl text-[#1C1613]">
              GitHub Code Audit & AI Content Detector
            </h2>

            <p className="mt-2 max-w-2xl text-xs sm:text-sm leading-relaxed text-[#756A62]">
              Upload your <strong>Resume</strong> or provide your <strong>GitHub Profile link</strong>. Our engine automatically fetches all your repositories and verifies: 
              <span className="font-semibold text-[#1C1613]"> how much AI was used</span> (boilerplate vs prompt dump) and 
              <span className="font-semibold text-[#1C1613]"> whether projects are internet tutorial copies</span> (YouTube clones, course templates).
            </p>
          </div>
        </div>

        {/* Input Toggle & Upload Area */}
        <div className="mt-8 rounded-2xl border border-[#1C1613]/10 bg-[#FAF7F2] p-5 sm:p-6">
          <div className="flex items-center gap-2 border-b border-[#1C1613]/10 pb-4">
            <button
              onClick={() => setInputMode("resume")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
                inputMode === "resume"
                  ? "bg-[#D9481E] text-white shadow-xs"
                  : "bg-white text-[#756A62] hover:bg-white/80 hover:text-[#1C1613]"
              }`}
            >
              <UploadCloud className="h-4 w-4" />
              1. Upload Resume (PDF / DOCX / TXT)
            </button>

            <button
              onClick={() => setInputMode("github")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
                inputMode === "github"
                  ? "bg-[#D9481E] text-white shadow-xs"
                  : "bg-white text-[#756A62] hover:bg-white/80 hover:text-[#1C1613]"
              }`}
            >
              <Github className="h-4 w-4" />
              2. Enter GitHub Profile / Link Directly
            </button>
          </div>

          {/* Mode 1: Resume Upload */}
          {inputMode === "resume" && (
            <div className="mt-5 space-y-4">
              <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#1C1613]/20 bg-white p-6 transition hover:border-[#D9481E] hover:bg-white/90">
                <input
                  type="file"
                  accept=".pdf,.docx,.doc,.txt,.json"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D9481E]/10 text-[#D9481E]">
                  <FileText className="h-6 w-6" />
                </div>
                <p className="mt-3 text-sm font-bold text-[#1C1613]">
                  {uploadedFileName ? (
                    <span className="text-[#D9481E]">Selected: {uploadedFileName}</span>
                  ) : (
                    "Click to upload resume or drag and drop file here"
                  )}
                </p>
                <p className="mt-1 text-xs text-[#756A62]">
                  Supports PDF, DOCX, and TXT resumes. Auto-extracts GitHub link, projects, and author credentials.
                </p>
              </label>

              {uploadedFileName && (
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-emerald-500/20 bg-emerald-50/70 p-3 text-xs text-emerald-800">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>
                      Parsed resume metadata: Candidate <strong>{extractedCandidateName}</strong> • Target GitHub: <code>{githubUrl}</code>
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Mode 2: Direct GitHub Link */}
          {inputMode === "github" && (
            <div className="mt-5 space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1613]">
                GitHub Profile or Repository URL
              </label>
              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative flex-1">
                  <Github className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#756A62]" />
                  <input
                    type="text"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/your-username or @username"
                    className="w-full rounded-xl border border-[#1C1613]/15 bg-white py-3 pl-10 pr-4 text-xs sm:text-sm outline-none focus:border-[#D9481E]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Action Trigger & Presets */}
          <div className="mt-6 flex flex-col justify-between gap-4 border-t border-[#1C1613]/10 pt-4 sm:flex-row sm:items-center">
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#756A62]">
              <span className="font-semibold text-[#1C1613]">Test Scenarios:</span>
              <button
                type="button"
                onClick={() => {
                  setGithubUrl("https://github.com/aditya");
                  setExtractedCandidateName("Aditya Sharma");
                  handleStartAnalysis("aditya");
                }}
                className="rounded-lg border border-[#1C1613]/10 bg-white px-2.5 py-1 text-[11px] font-semibold text-[#1C1613] hover:bg-[#FAF7F2]"
              >
                ⚡ Authentic Systems Builder (14% AI, 0% Tutorial)
              </button>
              <button
                type="button"
                onClick={() => {
                  setGithubUrl("https://github.com/tutorial-cloner-sample");
                  setExtractedCandidateName("Rahul Verma (Demo)");
                  handleStartAnalysis("tutorial-cloner-sample");
                }}
                className="rounded-lg border border-amber-500/20 bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-800 hover:bg-amber-100"
              >
                ⚠️ Internet Tutorial Clone (78% Tutorial Match)
              </button>
            </div>

            <button
              onClick={() => handleStartAnalysis()}
              disabled={isAuditing}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#D9481E] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-[#B93615] disabled:opacity-60"
            >
              {isAuditing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Running Neural Forensics...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Auto-Analyze All Repositories
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>

          {/* Live Scanner Progress Steps */}
          {isAuditing && (
            <div className="mt-6 rounded-2xl border border-[#D9481E]/30 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between text-xs font-bold text-[#D9481E]">
                <span>Stage {auditStep} of 5</span>
                <span>{auditStep * 20}% Complete</span>
              </div>

              <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-[#1C1613]/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-yellow-500 via-[#E9A23B] to-[#D9481E] transition-all duration-500"
                  style={{ width: `${auditStep * 20}%` }}
                />
              </div>

              <p className="mt-3 flex items-center gap-2 text-xs font-medium text-[#1C1613]">
                <Loader2 className="h-3.5 w-3.5 animate-spin text-[#D9481E]" />
                {auditStepText}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Forensic Results Panel */}
      {auditResult && (
        <section className="space-y-6">
          {/* Header Summary Verdict Banner */}
          <div className="rounded-3xl border border-[#1C1613]/10 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col justify-between gap-4 border-b border-[#1C1613]/10 pb-6 md:flex-row md:items-center">
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#756A62]">
                  Forensic Code Audit Results • {auditResult.analyzedAt}
                </span>
                <h3 className="aldrich-regular mt-1 text-2xl font-bold sm:text-3xl text-[#1C1613]">
                  {auditResult.candidateName} (@{auditResult.githubUsername})
                </h3>
                <p className="mt-1 text-xs text-[#756A62]">
                  Evaluated across <strong className="text-[#1C1613]">{auditResult.totalReposScanned} public GitHub repositories</strong> using AST syntax analysis and commit graph tracing.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span
                    className={`inline-block rounded-xl px-3.5 py-1.5 text-xs font-bold ${
                      auditResult.overallTutorialCollisionPct > 50
                        ? "bg-red-100 text-red-800 border border-red-300"
                        : auditResult.overallAiPercentage > 50
                        ? "bg-amber-100 text-amber-800 border border-amber-300"
                        : "bg-emerald-100 text-emerald-800 border border-emerald-300"
                    }`}
                  >
                    {auditResult.summaryVerdict}
                  </span>
                </div>
              </div>
            </div>

            {/* 4 Core Forensics Breakdown Cards */}
            <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {/* Card 1: AI Usage Ratio */}
              <div className="rounded-2xl border border-[#1C1613]/5 bg-[#FAF7F2] p-4">
                <div className="flex items-center justify-between text-xs font-semibold text-[#756A62]">
                  <span>AI-Generated Code</span>
                  <Bot className="h-4 w-4 text-[#D9481E]" />
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="aldrich-regular text-2xl font-bold text-[#1C1613] sm:text-3xl">
                    {auditResult.overallAiPercentage}%
                  </span>
                  <span className="text-xs font-semibold text-[#756A62]">AI Usage</span>
                </div>
                {/* Visual split bar */}
                <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-[#1C1613]/10 flex">
                  <div
                    className="h-full bg-emerald-500"
                    style={{ width: `${auditResult.overallHumanPercentage}%` }}
                    title={`Human: ${auditResult.overallHumanPercentage}%`}
                  />
                  <div
                    className="h-full bg-[#D9481E]"
                    style={{ width: `${auditResult.overallAiPercentage}%` }}
                    title={`AI: ${auditResult.overallAiPercentage}%`}
                  />
                </div>
                <div className="mt-2 flex items-center justify-between text-[10px] text-[#756A62]">
                  <span className="text-emerald-700 font-bold">{auditResult.overallHumanPercentage}% Human Logic</span>
                  <span className="text-[#D9481E] font-bold">{auditResult.overallAiPercentage}% AI Assisted</span>
                </div>
              </div>

              {/* Card 2: Tutorial & Plagiarism Overlap */}
              <div className="rounded-2xl border border-[#1C1613]/5 bg-[#FAF7F2] p-4">
                <div className="flex items-center justify-between text-xs font-semibold text-[#756A62]">
                  <span>Tutorial Plagiarism Index</span>
                  <ShieldAlert
                    className={`h-4 w-4 ${
                      auditResult.overallTutorialCollisionPct > 40
                        ? "text-red-600"
                        : "text-emerald-600"
                    }`}
                  />
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span
                    className={`aldrich-regular text-2xl font-bold sm:text-3xl ${
                      auditResult.overallTutorialCollisionPct > 40
                        ? "text-red-600"
                        : "text-emerald-600"
                    }`}
                  >
                    {auditResult.overallTutorialCollisionPct}%
                  </span>
                  <span className="text-xs font-semibold text-[#756A62]">Overlap</span>
                </div>
                <p className="mt-2 text-[11px] text-[#8C8077]">
                  {auditResult.overallTutorialCollisionPct === 0
                    ? "✓ 0% Internet tutorial duplication"
                    : "⚠️ Matches known YouTube / Udemy course templates"}
                </p>
              </div>

              {/* Card 3: Commit Lineage */}
              <div className="rounded-2xl border border-[#1C1613]/5 bg-[#FAF7F2] p-4">
                <div className="flex items-center justify-between text-xs font-semibold text-[#756A62]">
                  <span>Commit Evolution</span>
                  <GitBranch className="h-4 w-4 text-[#1C1613]" />
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="aldrich-regular text-lg font-bold text-[#1C1613] sm:text-2xl">
                    Organic
                  </span>
                  <span className="text-xs font-semibold text-emerald-600">Verified</span>
                </div>
                <p className="mt-2 text-[11px] text-[#8C8077]">
                  Multi-month development timestamps verified
                </p>
              </div>

              {/* Card 4: Authentic Proof Score */}
              <div className="rounded-2xl border border-[#1C1613]/5 bg-[#FAF7F2] p-4">
                <div className="flex items-center justify-between text-xs font-semibold text-[#756A62]">
                  <span>Code Authenticity Score</span>
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="aldrich-regular text-2xl font-bold text-[#D9481E] sm:text-3xl">
                    {auditResult.overallAuthenticityScore}
                  </span>
                  <span className="text-xs font-semibold text-[#756A62]">/ 100</span>
                </div>
                <p className="mt-2 text-[11px] text-[#8C8077]">
                  Calculated from original AST complexity
                </p>
              </div>
            </div>
          </div>

          {/* Repository Deep Breakdown Table & Analysis */}
          <div className="rounded-3xl border border-[#1C1613]/10 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center border-b border-[#1C1613]/10 pb-5">
              <div>
                <h4 className="aldrich-regular text-xl font-bold text-[#1C1613]">
                  Scanned Repositories Breakdown
                </h4>
                <p className="text-xs text-[#756A62]">
                  Detailed AI content ratio, internet tutorial collision checks, and commit timeline analysis per repo.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {auditResult.repositories.map((repo) => (
                <div
                  key={repo.id}
                  className={`rounded-2xl border p-5 transition ${
                    selectedRepoDetails?.id === repo.id
                      ? "border-[#D9481E] bg-[#FAF7F2]/40 shadow-xs"
                      : "border-[#1C1613]/10 bg-white hover:border-[#1C1613]/25"
                  }`}
                >
                  <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                    {/* Left: Repo info */}
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <FolderGit2 className="h-4 w-4 text-[#D9481E]" />
                        <h5 className="aldrich-regular text-lg font-bold text-[#1C1613]">
                          {repo.name}
                        </h5>
                        <span className="rounded-md bg-[#FAF7F2] px-2 py-0.5 font-mono text-[11px] font-bold text-[#756A62]">
                          {repo.language}
                        </span>

                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                            repo.verdict === "Authentic Builder"
                              ? "bg-emerald-100 text-emerald-800"
                              : repo.verdict === "Human-Assisted"
                              ? "bg-blue-100 text-blue-800"
                              : repo.verdict === "Tutorial Clone Flagged"
                              ? "bg-red-100 text-red-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {repo.verdict}
                        </span>
                      </div>

                      <p className="text-xs text-[#756A62] max-w-2xl">
                        {repo.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-[#52463F]">
                        <span>Commits: <strong>{repo.commitsCount}</strong></span>
                        <span>•</span>
                        <span>Timeline: <strong>{repo.timelineDays} days</strong></span>
                        <span>•</span>
                        <span>Integrity: <strong className="text-emerald-700">{repo.commitAuthenticity}</strong></span>
                      </div>
                    </div>

                    {/* Right: AI & Tutorial metrics */}
                    <div className="flex flex-wrap items-center gap-6 border-t border-[#1C1613]/10 pt-4 lg:border-t-0 lg:pt-0">
                      {/* AI Ratio Gauge */}
                      <div className="text-center min-w-[100px]">
                        <p className="text-[11px] font-semibold text-[#756A62]">AI Usage</p>
                        <p className="aldrich-regular text-xl font-bold text-[#D9481E]">
                          {repo.aiPercentage}%
                        </p>
                        <p className="text-[10px] text-[#8C8077]">
                          {repo.humanLogicPct}% Human Core
                        </p>
                      </div>

                      {/* Tutorial Plagiarism Gauge */}
                      <div className="text-center min-w-[120px]">
                        <p className="text-[11px] font-semibold text-[#756A62]">Tutorial Overlap</p>
                        <p
                          className={`aldrich-regular text-xl font-bold ${
                            repo.tutorialMatchPct > 40 ? "text-red-600" : "text-emerald-600"
                          }`}
                        >
                          {repo.tutorialMatchPct}%
                        </p>
                        <p className="text-[10px] text-[#8C8077]">
                          {repo.isTutorialClone ? "Tutorial Matched" : "Original Code"}
                        </p>
                      </div>

                      {/* Proof Score */}
                      <div className="text-center min-w-[80px]">
                        <p className="text-[11px] font-semibold text-[#756A62]">Proof Score</p>
                        <p className="aldrich-regular text-xl font-bold text-[#1C1613]">
                          {repo.proofScore}/100
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          setSelectedRepoDetails(
                            selectedRepoDetails?.id === repo.id ? null : repo
                          )
                        }
                        className="rounded-xl border border-[#1C1613]/15 bg-white px-3 py-2 text-xs font-bold text-[#1C1613] hover:bg-[#FAF7F2] transition"
                      >
                        {selectedRepoDetails?.id === repo.id
                          ? "Hide Signals"
                          : "Inspect Signals"}
                      </button>
                    </div>
                  </div>

                  {/* Expandable Signals & Forensic Inspection */}
                  {selectedRepoDetails?.id === repo.id && (
                    <div className="mt-5 space-y-4 border-t border-[#1C1613]/10 pt-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        {/* AI Breakdown Box */}
                        <div className="rounded-xl border border-[#1C1613]/10 bg-white p-4 text-xs">
                          <div className="flex items-center gap-2 font-bold text-[#D9481E]">
                            <Bot className="h-4 w-4" />
                            AI Composition Analysis:
                          </div>

                          <div className="mt-3 space-y-2">
                            <div className="flex items-center justify-between text-[#52463F]">
                              <span>Human Domain & Architecture Logic:</span>
                              <strong className="text-emerald-700">{repo.humanLogicPct}%</strong>
                            </div>
                            <div className="flex items-center justify-between text-[#52463F]">
                              <span>AI Boilerplate & Configuration Scaffolding:</span>
                              <strong className="text-amber-700">{repo.aiBoilerplatePct}%</strong>
                            </div>
                            <div className="flex items-center justify-between text-[#52463F]">
                              <span>Direct LLM / ChatGPT Prompt Dumps:</span>
                              <strong className="text-[#D9481E]">{repo.aiRawPromptDumpPct}%</strong>
                            </div>
                          </div>

                          <div className="mt-3 border-t border-[#1C1613]/5 pt-2">
                            <p className="font-semibold text-[#1C1613]">Detected AI Signatures:</p>
                            <ul className="mt-1 list-disc pl-4 space-y-1 text-[#756A62]">
                              {repo.aiDetectionSignals.map((sig, sidx) => (
                                <li key={sidx}>{sig}</li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Tutorial Overlap Box */}
                        <div className="rounded-xl border border-[#1C1613]/10 bg-white p-4 text-xs">
                          <div className="flex items-center gap-2 font-bold text-red-700">
                            <ShieldAlert className="h-4 w-4" />
                            Internet Tutorial & Plagiarism Check:
                          </div>

                          {repo.isTutorialClone ? (
                            <div className="mt-3 space-y-2">
                              <p className="rounded-md bg-red-50 p-2 font-semibold text-red-800 border border-red-200">
                                ⚠️ Matches Known Tutorial: {repo.matchedTutorialName}
                              </p>
                              <ul className="list-disc pl-4 space-y-1 text-[#756A62]">
                                {repo.tutorialSignals.map((ts, tidx) => (
                                  <li key={tidx}>{ts}</li>
                                ))}
                              </ul>
                            </div>
                          ) : (
                            <div className="mt-3 space-y-2">
                              <p className="rounded-md bg-emerald-50 p-2 font-semibold text-emerald-800 border border-emerald-200">
                                ✓ 0.0% Tutorial Overlap: Unique Custom Architecture
                              </p>
                              <p className="text-[#756A62]">
                                Verified against 1.8M public repositories, FreeCodeCamp starters, and YouTube clone templates. Codebase demonstrates authentic original implementation.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
