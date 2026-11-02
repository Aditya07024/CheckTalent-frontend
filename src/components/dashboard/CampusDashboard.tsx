"use client";

import { useState } from "react";
import { User } from "firebase/auth";
import { UserProfile } from "@/types/dashboard";
import {
  CampusStudentItem,
  CampusDriveItem,
  CampusPartnerRecruiter,
  INITIAL_CAMPUS_STUDENTS,
  INITIAL_CAMPUS_DRIVES,
  INITIAL_CAMPUS_RECRUITERS,
} from "@/data/dashboard-demo-data";
import {
  Award,
  BarChart3,
  BookOpen,
  Building2,
  Calendar,
  CheckCircle2,
  Download,
  ExternalLink,
  Eye,
  FileSpreadsheet,
  FileText,
  Filter,
  GraduationCap,
  Mail,
  Plus,
  School,
  Search,
  Share2,
  ShieldCheck,
  TrendingUp,
  Upload,
  UserCheck,
  Users,
  X,
} from "lucide-react";

interface CampusDashboardProps {
  user: User;
  profile: UserProfile | null;
}

export function CampusDashboard({ user, profile }: CampusDashboardProps) {
  const [activeTab, setActiveTab] = useState<"students" | "drives" | "recruiters" | "analytics">("students");

  // State for students roster
  const [students, setStudents] = useState<CampusStudentItem[]>(INITIAL_CAMPUS_STUDENTS);
  const [studentSearch, setStudentSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // State for Add Student modal
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentUsn, setNewStudentUsn] = useState("");
  const [newStudentDept, setNewStudentDept] = useState<"CSE" | "IT" | "ECE" | "AI/DS">("CSE");
  const [newStudentCgpa, setNewStudentCgpa] = useState("8.8");
  const [newStudentScore, setNewStudentScore] = useState("88");

  // State for Campus Drives
  const [drives, setDrives] = useState<CampusDriveItem[]>(INITIAL_CAMPUS_DRIVES);
  const [showScheduleDriveModal, setShowScheduleDriveModal] = useState(false);
  const [newDriveCompany, setNewDriveCompany] = useState("");
  const [newDriveDate, setNewDriveDate] = useState("2026-11-28");
  const [newDriveRole, setNewDriveRole] = useState("Associate Software Engineer");
  const [newDrivePackage, setNewDrivePackage] = useState("₹18 LPA");
  const [newDriveCgpa, setNewDriveCgpa] = useState("7.5");
  const [newDriveScore, setNewDriveScore] = useState("80");

  // State for Partner Recruiters
  const [recruiters, setRecruiters] = useState<CampusPartnerRecruiter[]>(INITIAL_CAMPUS_RECRUITERS);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteCompany, setInviteCompany] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");

  // State for NIRF / NAAC Export Modal
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportFormat, setExportFormat] = useState<"nirf" | "naac" | "csv">("nirf");

  // State for action feedback
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Handlers
  function handleAddStudent(e: React.FormEvent) {
    e.preventDefault();
    if (!newStudentName.trim() || !newStudentUsn.trim()) return;

    const newStudent: CampusStudentItem = {
      id: `std-${Date.now()}`,
      name: newStudentName.trim(),
      usn: newStudentUsn.trim().toUpperCase(),
      department: newStudentDept,
      cgpa: newStudentCgpa,
      proofScore: parseInt(newStudentScore) || 85,
      reposVerified: 3,
      status: "Drive Ready",
      statusClass: "bg-amber-100 text-amber-800",
      skills: ["React", "TypeScript", "SQL"],
    };

    setStudents((prev) => [newStudent, ...prev]);
    setShowAddStudentModal(false);
    setNewStudentName("");
    setNewStudentUsn("");
    setActionNotice(`Student ${newStudent.name} (${newStudent.usn}) added to cohort roster!`);
    setTimeout(() => setActionNotice(null), 3500);
  }

  function handleScheduleDrive(e: React.FormEvent) {
    e.preventDefault();
    if (!newDriveCompany.trim()) return;

    const newDrive: CampusDriveItem = {
      id: `cdrive-${Date.now()}`,
      company: newDriveCompany.trim(),
      visitDate: newDriveDate,
      role: newDriveRole,
      packageCtc: newDrivePackage,
      cgpaCutoff: parseFloat(newDriveCgpa) || 7.0,
      proofScoreCutoff: parseInt(newDriveScore) || 80,
      eligibleBranches: ["CSE", "IT", "ECE"],
      registeredStudents: 45,
      shortlistedCount: 0,
      placedCount: 0,
      status: "Upcoming",
    };

    setDrives((prev) => [newDrive, ...prev]);
    setShowScheduleDriveModal(false);
    setNewDriveCompany("");
    setActionNotice(`Campus drive for ${newDrive.company} scheduled on ${newDrive.visitDate}!`);
    setTimeout(() => setActionNotice(null), 3500);
  }

  function handleInviteRecruiter(e: React.FormEvent) {
    e.preventDefault();
    if (!inviteCompany.trim()) return;

    const newRecruiter: CampusPartnerRecruiter = {
      id: `rec-${Date.now()}`,
      company: inviteCompany.trim(),
      contactPerson: "Recruiting Coordinator",
      contactEmail: inviteEmail || "campus@company.com",
      tier: "Tier 1 Dream",
      avgCtc: "₹18 LPA - ₹25 LPA",
      hiredPastYears: 0,
      status: "Invited",
    };

    setRecruiters((prev) => [newRecruiter, ...prev]);
    setShowInviteModal(false);
    setInviteCompany("");
    setInviteEmail("");
    setActionNotice(`Campus placement invite sent to ${newRecruiter.company}!`);
    setTimeout(() => setActionNotice(null), 3500);
  }

  function handleDownloadExport() {
    let filename = `CheckTalent_${exportFormat.toUpperCase()}_Placement_Report_2026.csv`;
    let content =
      "USN,StudentName,Department,CGPA,ProofScore,VerifiedRepos,Status,CompanyPlaced\n" +
      students
        .map(
          (s) =>
            `"${s.usn}","${s.name}","${s.department}",${s.cgpa},${s.proofScore},${s.reposVerified},"${s.status}","${s.companyPlaced || "N/A"}"`
        )
        .join("\n");

    const encodedUri = encodeURI("data:text/csv;charset=utf-8," + content);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setShowExportModal(false);
    setActionNotice(`Downloaded official ${exportFormat.toUpperCase()} placement dossier!`);
    setTimeout(() => setActionNotice(null), 3500);
  }

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
      s.usn.toLowerCase().includes(studentSearch.toLowerCase()) ||
      s.skills.some((sk) => sk.toLowerCase().includes(studentSearch.toLowerCase()));
    const matchesDept = deptFilter === "all" || s.department === deptFilter;
    const matchesStatus = statusFilter === "all" || s.status === statusFilter;
    return matchesSearch && matchesDept && matchesStatus;
  });

  const institutionDisplay =
    profile?.institution || user.displayName || "Apex Institute of Technology";

  return (
    <div className="space-y-8">
      {/* College TPO Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl border border-[#1C1613]/10 bg-white p-6 shadow-sm sm:p-8">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-red-600/10 blur-3xl pointer-events-none" />

        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-red-600/30 bg-red-600/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-700">
                <School className="h-3.5 w-3.5" />
                Campus & Placement Cell Workspace
              </span>

              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-700">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Verified Institutional Portal
              </span>
            </div>

            <h1 className="aldrich-regular mt-3 text-3xl font-bold sm:text-4xl text-[#1C1613]">
              {institutionDisplay}
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#756A62]">
              Training & Placement Cell (TPO) • Batch of 2026. Monitor verified
              student skill readiness, schedule visiting company drives, and export
              NIRF/NAAC compliant technical placement dossiers.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowScheduleDriveModal(true)}
              className="flex items-center gap-2 rounded-xl bg-[#D9481E] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-[#B93615]"
            >
              <Calendar className="h-4 w-4" />
              Schedule Campus Drive
            </button>

            <button
              onClick={() => setShowAddStudentModal(true)}
              className="flex items-center gap-2 rounded-xl bg-[#1C1613] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-black"
            >
              <Plus className="h-4 w-4" />
              Add Student to Cohort
            </button>

            <button
              onClick={() => setShowExportModal(true)}
              className="flex items-center gap-2 rounded-xl border border-[#1C1613]/15 bg-[#FAF7F2] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#1C1613] transition hover:bg-white"
            >
              <Download className="h-4 w-4 text-[#D9481E]" />
              Export NIRF / NAAC Report
            </button>
          </div>
        </div>

        {/* 4 Core Quick Metrics */}
        <div className="mt-8 grid grid-cols-2 gap-4 border-t border-[#1C1613]/10 pt-6 lg:grid-cols-4">
          <div className="rounded-2xl border border-[#1C1613]/5 bg-[#FAF7F2] p-4">
            <div className="flex items-center justify-between text-xs font-semibold text-[#756A62]">
              <span>Batch Placement Rate</span>
              <Award className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="aldrich-regular text-2xl font-bold text-[#1C1613] sm:text-3xl">78.4%</span>
              <span className="text-xs font-semibold text-emerald-600">318 / 480 Placed</span>
            </div>
            <p className="mt-1 text-[11px] text-[#8C8077]">Batch of 2026 Graduating Class</p>
          </div>

          <div className="rounded-2xl border border-[#1C1613]/5 bg-[#FAF7F2] p-4">
            <div className="flex items-center justify-between text-xs font-semibold text-[#756A62]">
              <span>Average Package CTC</span>
              <TrendingUp className="h-4 w-4 text-[#D9481E]" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="aldrich-regular text-2xl font-bold text-[#1C1613] sm:text-3xl">₹14.2 LPA</span>
              <span className="text-xs font-semibold text-emerald-600">+18% YoY</span>
            </div>
            <p className="mt-1 text-[11px] text-[#8C8077]">Highest: ₹48 LPA (Microsoft)</p>
          </div>

          <div className="rounded-2xl border border-[#1C1613]/5 bg-[#FAF7F2] p-4">
            <div className="flex items-center justify-between text-xs font-semibold text-[#756A62]">
              <span>Verified Repositories</span>
              <ShieldCheck className="h-4 w-4 text-purple-600" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="aldrich-regular text-2xl font-bold text-[#1C1613] sm:text-3xl">1,420</span>
              <span className="text-xs font-semibold text-purple-600">AST Audited</span>
            </div>
            <p className="mt-1 text-[11px] text-[#8C8077]">Zero tutorial plagiarism guarantee</p>
          </div>

          <div className="rounded-2xl border border-[#1C1613]/5 bg-[#FAF7F2] p-4">
            <div className="flex items-center justify-between text-xs font-semibold text-[#756A62]">
              <span>Campus Drives Scheduled</span>
              <Building2 className="h-4 w-4 text-[#E9A23B]" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="aldrich-regular text-2xl font-bold text-[#1C1613] sm:text-3xl">{drives.length}</span>
              <span className="text-xs font-semibold text-[#E9A23B]">This Season</span>
            </div>
            <p className="mt-1 text-[11px] text-[#8C8077]">Morgan Stanley, MS, TCS, Razorpay</p>
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

      {/* Tabs Navigation */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#1C1613]/10 pb-2">
        <button
          onClick={() => setActiveTab("students")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition ${
            activeTab === "students"
              ? "bg-[#D9481E] text-white shadow-sm"
              : "bg-white text-[#756A62] hover:bg-[#FAF7F2] hover:text-[#1C1613]"
          }`}
        >
          <GraduationCap className="h-4 w-4" />
          Student Cohort Directory ({students.length})
        </button>

        <button
          onClick={() => setActiveTab("drives")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition ${
            activeTab === "drives"
              ? "bg-[#D9481E] text-white shadow-sm"
              : "bg-white text-[#756A62] hover:bg-[#FAF7F2] hover:text-[#1C1613]"
          }`}
        >
          <Calendar className="h-4 w-4" />
          Visiting Campus Drives ({drives.length})
        </button>

        <button
          onClick={() => setActiveTab("recruiters")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition ${
            activeTab === "recruiters"
              ? "bg-[#D9481E] text-white shadow-sm"
              : "bg-white text-[#756A62] hover:bg-[#FAF7F2] hover:text-[#1C1613]"
          }`}
        >
          <Building2 className="h-4 w-4" />
          Corporate Recruiters ({recruiters.length})
        </button>

        <button
          onClick={() => setActiveTab("analytics")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition ${
            activeTab === "analytics"
              ? "bg-[#D9481E] text-white shadow-sm"
              : "bg-white text-[#756A62] hover:bg-[#FAF7F2] hover:text-[#1C1613]"
          }`}
        >
          <BarChart3 className="h-4 w-4" />
          Branch & Skill Analytics
        </button>
      </div>

      {/* Tab 1: Student Cohort Directory */}
      {activeTab === "students" && (
        <div className="space-y-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="aldrich-regular text-2xl font-bold text-ink">
                Batch of 2026 Student Directory ({filteredStudents.length})
              </h2>
              <p className="text-xs text-[#756A62]">
                Filter students by department, CGPA, and verifiable Proof Score to assemble drive rosters.
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setShowAddStudentModal(true)}
                className="flex items-center gap-2 rounded-xl bg-[#D9481E] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-[#B93615]"
              >
                <Plus className="h-4 w-4" />
                Add Student
              </button>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col gap-3 rounded-2xl border border-[#1C1613]/10 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#8C8077]" />
              <input
                type="text"
                placeholder="Search by student name, USN (e.g. 1AP22CS042), or skill..."
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
                className="w-full rounded-xl border border-[#1C1613]/15 pl-9 pr-4 py-2 text-xs focus:border-[#D9481E] focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value)}
                className="rounded-xl border border-[#1C1613]/15 bg-white px-3 py-2 text-xs font-semibold text-ink"
              >
                <option value="all">All Departments</option>
                <option value="CSE">CSE</option>
                <option value="IT">IT</option>
                <option value="ECE">ECE</option>
                <option value="AI/DS">AI/DS</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-xl border border-[#1C1613]/15 bg-white px-3 py-2 text-xs font-semibold text-ink"
              >
                <option value="all">All Statuses</option>
                <option value="Placed">Placed</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Drive Ready">Drive Ready</option>
                <option value="Needs Skill Audit">Needs Skill Audit</option>
              </select>
            </div>
          </div>

          {/* Student Table */}
          <div className="overflow-hidden rounded-3xl border border-[#1C1613]/10 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-[#1C1613]/10 bg-[#FAF7F2] font-mono text-[11px] uppercase tracking-wider text-[#756A62]">
                  <tr>
                    <th className="px-5 py-3.5">Student Details</th>
                    <th className="px-4 py-3.5">USN & Dept</th>
                    <th className="px-4 py-3.5">CGPA</th>
                    <th className="px-4 py-3.5">Proof Score</th>
                    <th className="px-4 py-3.5">Status</th>
                    <th className="px-4 py-3.5">Audited Repos</th>
                    <th className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1C1613]/5">
                  {filteredStudents.map((std) => (
                    <tr key={std.id} className="hover:bg-[#FAF7F2]/50 transition">
                      <td className="px-5 py-4">
                        <div className="font-bold text-ink">{std.name}</div>
                        <div className="text-[11px] text-[#756A62]">
                          {std.skills.join(" • ")}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="font-mono font-semibold text-ink">{std.usn}</div>
                        <div className="text-[11px] text-[#756A62]">{std.department}</div>
                      </td>
                      <td className="px-4 py-4 font-bold text-ink">{std.cgpa}</td>
                      <td className="px-4 py-4">
                        <span className="aldrich-regular text-sm font-bold text-[#D9481E]">
                          {std.proofScore}/100
                        </span>
                        <div className="h-1.5 w-16 rounded-full bg-[#1C1613]/10 mt-1">
                          <div
                            className="h-full rounded-full bg-[#D9481E]"
                            style={{ width: `${std.proofScore}%` }}
                          />
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${std.statusClass}`}>
                          {std.status}
                        </span>
                        {std.companyPlaced && (
                          <div className="text-[10px] font-semibold text-emerald-800 mt-1">
                            {std.companyPlaced}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-4 font-semibold text-ink">
                        {std.reposVerified} Verified
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => {
                            setActionNotice(`Endorsed ${std.name} for upcoming visiting campus drives!`);
                            setTimeout(() => setActionNotice(null), 3000);
                          }}
                          className="font-bold text-[#D9481E] hover:underline text-xs"
                        >
                          Endorse &rarr;
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Campus Placement Drives */}
      {activeTab === "drives" && (
        <div className="space-y-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="aldrich-regular text-2xl font-bold text-ink">
                Visiting Campus Drives ({drives.length})
              </h2>
              <p className="text-xs text-[#756A62]">
                Scheduled on-campus technical placement schedules, branch eligibility criteria, and candidate progression.
              </p>
            </div>

            <button
              onClick={() => setShowScheduleDriveModal(true)}
              className="flex items-center gap-2 rounded-xl bg-[#D9481E] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-[#B93615]"
            >
              <Calendar className="h-4 w-4" />
              Schedule Drive
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {drives.map((drive) => (
              <div
                key={drive.id}
                className="flex flex-col justify-between rounded-3xl border border-[#1C1613]/10 bg-white p-6 shadow-sm"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-ink text-lg">{drive.company}</h3>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                            drive.status === "Completed"
                              ? "bg-stone-100 text-stone-700"
                              : "bg-emerald-50 text-emerald-700"
                          }`}
                        >
                          {drive.status}
                        </span>
                      </div>
                      <p className="text-xs text-[#756A62] mt-0.5">{drive.role}</p>
                    </div>

                    <div className="text-right">
                      <span className="aldrich-regular text-base font-bold text-[#D9481E]">
                        {drive.packageCtc}
                      </span>
                      <p className="text-[10px] text-[#756A62]">Package CTC</p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2 rounded-2xl bg-[#FAF7F2] p-3 text-center text-xs">
                    <div>
                      <span className="text-[11px] text-[#756A62]">Visit Date</span>
                      <p className="font-bold text-ink mt-0.5">{drive.visitDate}</p>
                    </div>
                    <div>
                      <span className="text-[11px] text-[#756A62]">Min Proof Score</span>
                      <p className="font-bold text-[#D9481E] mt-0.5">{drive.proofScoreCutoff}+</p>
                    </div>
                    <div>
                      <span className="text-[11px] text-[#756A62]">Min CGPA</span>
                      <p className="font-bold text-ink mt-0.5">{drive.cgpaCutoff}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-xs text-[#52463F]">
                    <span>Eligible Branches: {drive.eligibleBranches.join(", ")}</span>
                    <span className="font-semibold">{drive.registeredStudents} Registered</span>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-[#1C1613]/10 pt-3 text-xs">
                  <span className="text-emerald-700 font-bold">
                    {drive.placedCount > 0 ? `${drive.placedCount} Students Placed ✓` : `${drive.shortlistedCount} Shortlisted`}
                  </span>

                  <button
                    onClick={() => {
                      setActionNotice(`Opening round management console for ${drive.company}...`);
                      setTimeout(() => setActionNotice(null), 3000);
                    }}
                    className="font-bold text-[#D9481E] hover:underline"
                  >
                    Manage Rounds &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Corporate Recruiters */}
      {activeTab === "recruiters" && (
        <div className="space-y-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="aldrich-regular text-2xl font-bold text-ink">
                Visiting Corporate Recruiters ({recruiters.length})
              </h2>
              <p className="text-xs text-[#756A62]">
                Manage relationships and send verified student cohort portfolios to enterprise hiring teams.
              </p>
            </div>

            <button
              onClick={() => setShowInviteModal(true)}
              className="flex items-center gap-2 rounded-xl bg-[#D9481E] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-[#B93615]"
            >
              <Mail className="h-4 w-4" />
              Invite New Recruiter
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {recruiters.map((rec) => (
              <div
                key={rec.id}
                className="flex flex-col justify-between rounded-3xl border border-[#1C1613]/10 bg-white p-6 shadow-sm"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-ink text-lg">{rec.company}</h3>
                      <span className="mt-1 inline-block rounded-md bg-orange-50 px-2 py-0.5 text-[10px] font-bold text-orange-900 border border-orange-200">
                        {rec.tier}
                      </span>
                    </div>

                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                      {rec.status}
                    </span>
                  </div>

                  <div className="mt-4 space-y-2 rounded-2xl bg-[#FAF7F2] p-3 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[#756A62]">Contact Person:</span>
                      <span className="font-bold text-ink">{rec.contactPerson}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#756A62]">Official Email:</span>
                      <span className="font-mono text-[#52463F]">{rec.contactEmail}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#756A62]">Avg CTC Offered:</span>
                      <span className="font-bold text-[#D9481E]">{rec.avgCtc}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#756A62]">Hired in Past 3 Yrs:</span>
                      <span className="font-bold text-ink">{rec.hiredPastYears} alumni</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-[#1C1613]/10 pt-3 text-xs">
                  <span className="text-[#756A62]">Slot: Slot 1 (Day 1)</span>
                  <button
                    onClick={() => {
                      setActionNotice(`Cohort briefing sent to ${rec.contactEmail}!`);
                      setTimeout(() => setActionNotice(null), 3000);
                    }}
                    className="font-bold text-[#D9481E] hover:underline flex items-center gap-1"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    Send Cohort Dossier
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Branch & Skill Analytics */}
      {activeTab === "analytics" && (
        <div className="space-y-6">
          <div className="rounded-3xl border border-[#1C1613]/10 bg-white p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <h2 className="aldrich-regular text-2xl font-bold text-ink">
                Departmental Placement & Skill Analytics
              </h2>
              <p className="text-xs text-[#756A62]">
                Aggregated statistics compliant with NAAC Criterion 5 and NIRF student progression standards.
              </p>
            </div>

            {/* Department Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-[#1C1613]/10 bg-[#FAF7F2] font-mono text-[11px] uppercase tracking-wider text-[#756A62]">
                  <tr>
                    <th className="px-4 py-3">Department</th>
                    <th className="px-4 py-3">Total Batch</th>
                    <th className="px-4 py-3">Verified Skills</th>
                    <th className="px-4 py-3">Avg Proof Score</th>
                    <th className="px-4 py-3">Placed Count</th>
                    <th className="px-4 py-3">Placement %</th>
                    <th className="px-4 py-3 text-right">Avg Package</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1C1613]/5">
                  {[
                    { dept: "Computer Science & Engg (CSE)", total: 180, verified: 172, score: 92, placed: 154, pct: "85.5%", ctc: "₹16.8 LPA" },
                    { dept: "Information Technology (IT)", total: 120, verified: 114, score: 89, placed: 98, pct: "81.6%", ctc: "₹14.5 LPA" },
                    { dept: "Electronics & Comm (ECE)", total: 110, verified: 96, score: 85, placed: 72, pct: "65.4%", ctc: "₹11.2 LPA" },
                    { dept: "Artificial Intelligence & DS", total: 70, verified: 60, score: 91, placed: 58, pct: "82.8%", ctc: "₹15.2 LPA" },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-[#FAF7F2]/50">
                      <td className="px-4 py-3.5 font-bold text-ink">{row.dept}</td>
                      <td className="px-4 py-3.5">{row.total}</td>
                      <td className="px-4 py-3.5 text-emerald-700 font-semibold">{row.verified}</td>
                      <td className="px-4 py-3.5 aldrich-regular font-bold text-[#D9481E]">{row.score}/100</td>
                      <td className="px-4 py-3.5 font-bold text-ink">{row.placed}</td>
                      <td className="px-4 py-3.5">
                        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                          {row.pct}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-right font-bold text-ink">{row.ctc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Quick Export CTA */}
            <div className="rounded-2xl border border-orange-200 bg-orange-50/50 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-orange-950">
                  Ready to submit annual institutional placement filings?
                </h4>
                <p className="text-xs text-[#52463F]">
                  Download one-click NIRF and NAAC formatted reports with all student roll numbers and verified proof scores.
                </p>
              </div>
              <button
                onClick={() => setShowExportModal(true)}
                className="flex items-center gap-2 rounded-xl bg-[#D9481E] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-[#B93615] shrink-0"
              >
                <Download className="h-4 w-4" />
                Generate Official Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 1: Add Student */}
      {showAddStudentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-3xl border border-[#1C1613]/10 bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1C1613]/10 pb-3">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-[#D9481E]" />
                <h3 className="aldrich-regular text-lg font-bold text-ink">Add Student to Cohort</h3>
              </div>
              <button
                onClick={() => setShowAddStudentModal(false)}
                className="rounded-lg p-1 text-[#756A62] hover:bg-[#FAF7F2]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleAddStudent} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-[#52463F] mb-1">Student Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Arjun Sharma"
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  className="w-full rounded-xl border border-[#1C1613]/15 px-3 py-2 text-xs focus:border-[#D9481E] focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#52463F] mb-1">USN / Roll Number</label>
                  <input
                    type="text"
                    placeholder="1AP22CS105"
                    value={newStudentUsn}
                    onChange={(e) => setNewStudentUsn(e.target.value)}
                    className="w-full rounded-xl border border-[#1C1613]/15 px-3 py-2 text-xs focus:border-[#D9481E] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#52463F] mb-1">Department</label>
                  <select
                    value={newStudentDept}
                    onChange={(e) => setNewStudentDept(e.target.value as any)}
                    className="w-full rounded-xl border border-[#1C1613]/15 px-3 py-2 text-xs focus:border-[#D9481E] focus:outline-none"
                  >
                    <option value="CSE">CSE</option>
                    <option value="IT">IT</option>
                    <option value="ECE">ECE</option>
                    <option value="AI/DS">AI/DS</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#52463F] mb-1">CGPA</label>
                  <input
                    type="text"
                    value={newStudentCgpa}
                    onChange={(e) => setNewStudentCgpa(e.target.value)}
                    className="w-full rounded-xl border border-[#1C1613]/15 px-3 py-2 text-xs focus:border-[#D9481E] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#52463F] mb-1">Initial Proof Score</label>
                  <input
                    type="number"
                    min="50"
                    max="99"
                    value={newStudentScore}
                    onChange={(e) => setNewStudentScore(e.target.value)}
                    className="w-full rounded-xl border border-[#1C1613]/15 px-3 py-2 text-xs focus:border-[#D9481E] focus:outline-none"
                  />
                </div>
              </div>

              <p className="text-[11px] text-[#756A62]">
                Student will receive an automated invitation to link their GitHub profile for continuous AST and plagiarism audits.
              </p>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddStudentModal(false)}
                  className="rounded-xl border border-[#1C1613]/15 px-4 py-2 text-xs font-semibold text-[#52463F] hover:bg-[#FAF7F2]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#D9481E] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#B93615]"
                >
                  Add Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Schedule Campus Drive */}
      {showScheduleDriveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-3xl border border-[#1C1613]/10 bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1C1613]/10 pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-[#D9481E]" />
                <h3 className="aldrich-regular text-lg font-bold text-ink">Schedule Campus Drive</h3>
              </div>
              <button
                onClick={() => setShowScheduleDriveModal(false)}
                className="rounded-lg p-1 text-[#756A62] hover:bg-[#FAF7F2]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleScheduleDrive} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-[#52463F] mb-1">Company Name</label>
                <input
                  type="text"
                  placeholder="e.g. Goldman Sachs"
                  value={newDriveCompany}
                  onChange={(e) => setNewDriveCompany(e.target.value)}
                  className="w-full rounded-xl border border-[#1C1613]/15 px-3 py-2 text-xs focus:border-[#D9481E] focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#52463F] mb-1">Visit Date</label>
                  <input
                    type="date"
                    value={newDriveDate}
                    onChange={(e) => setNewDriveDate(e.target.value)}
                    className="w-full rounded-xl border border-[#1C1613]/15 px-3 py-2 text-xs focus:border-[#D9481E] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#52463F] mb-1">Package CTC</label>
                  <input
                    type="text"
                    value={newDrivePackage}
                    onChange={(e) => setNewDrivePackage(e.target.value)}
                    className="w-full rounded-xl border border-[#1C1613]/15 px-3 py-2 text-xs focus:border-[#D9481E] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#52463F] mb-1">Role Title</label>
                <input
                  type="text"
                  value={newDriveRole}
                  onChange={(e) => setNewDriveRole(e.target.value)}
                  className="w-full rounded-xl border border-[#1C1613]/15 px-3 py-2 text-xs focus:border-[#D9481E] focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#52463F] mb-1">Min CGPA Cutoff</label>
                  <input
                    type="number"
                    step="0.1"
                    min="5"
                    max="10"
                    value={newDriveCgpa}
                    onChange={(e) => setNewDriveCgpa(e.target.value)}
                    className="w-full rounded-xl border border-[#1C1613]/15 px-3 py-2 text-xs focus:border-[#D9481E] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#52463F] mb-1">Min Proof Score</label>
                  <input
                    type="number"
                    min="50"
                    max="99"
                    value={newDriveScore}
                    onChange={(e) => setNewDriveScore(e.target.value)}
                    className="w-full rounded-xl border border-[#1C1613]/15 px-3 py-2 text-xs focus:border-[#D9481E] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowScheduleDriveModal(false)}
                  className="rounded-xl border border-[#1C1613]/15 px-4 py-2 text-xs font-semibold text-[#52463F] hover:bg-[#FAF7F2]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#D9481E] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#B93615]"
                >
                  Confirm Drive Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: Invite Corporate Recruiter */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-3xl border border-[#1C1613]/10 bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1C1613]/10 pb-3">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-[#D9481E]" />
                <h3 className="aldrich-regular text-lg font-bold text-ink">Invite Corporate Recruiter</h3>
              </div>
              <button
                onClick={() => setShowInviteModal(false)}
                className="rounded-lg p-1 text-[#756A62] hover:bg-[#FAF7F2]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleInviteRecruiter} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-[#52463F] mb-1">Company Name</label>
                <input
                  type="text"
                  placeholder="e.g. Atlassian"
                  value={inviteCompany}
                  onChange={(e) => setInviteCompany(e.target.value)}
                  className="w-full rounded-xl border border-[#1C1613]/15 px-3 py-2 text-xs focus:border-[#D9481E] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#52463F] mb-1">Recruiter / HR Contact Email</label>
                <input
                  type="email"
                  placeholder="university.hiring@atlassian.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full rounded-xl border border-[#1C1613]/15 px-3 py-2 text-xs focus:border-[#D9481E] focus:outline-none"
                  required
                />
              </div>

              <p className="text-[11px] leading-relaxed text-[#756A62]">
                An invitation with your institution's verified technical cohort portfolio and Day 1 slot booking calendar will be dispatched.
              </p>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="rounded-xl border border-[#1C1613]/15 px-4 py-2 text-xs font-semibold text-[#52463F]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#D9481E] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#B93615]"
                >
                  Dispatch Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: Export NIRF / NAAC Report */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-3xl border border-[#1C1613]/10 bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1C1613]/10 pb-3">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="h-5 w-5 text-[#D9481E]" />
                <h3 className="aldrich-regular text-lg font-bold text-ink">Generate Official Report</h3>
              </div>
              <button
                onClick={() => setShowExportModal(false)}
                className="rounded-lg p-1 text-[#756A62] hover:bg-[#FAF7F2]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#52463F] mb-1">Select Report Filing Format:</label>
                <div className="space-y-2">
                  {[
                    { id: "nirf", label: "NIRF Student Progression Report (Table 5)", desc: "Compliant with National Institutional Ranking Framework" },
                    { id: "naac", label: "NAAC Criterion 5.2 (Placement of Outgoing Students)", desc: "Official metric breakdown for NAAC accreditation" },
                    { id: "csv", label: "Complete Student Placement Roster (Raw CSV)", desc: "All columns including verified repository proof scores" },
                  ].map((fmt) => (
                    <label
                      key={fmt.id}
                      className={`flex items-start gap-3 rounded-2xl border p-3 cursor-pointer transition ${
                        exportFormat === fmt.id ? "border-[#D9481E] bg-[#D9481E]/5" : "border-[#1C1613]/10"
                      }`}
                    >
                      <input
                        type="radio"
                        name="exportFormat"
                        checked={exportFormat === fmt.id}
                        onChange={() => setExportFormat(fmt.id as any)}
                        className="mt-0.5"
                      />
                      <div>
                        <p className="text-xs font-bold text-ink">{fmt.label}</p>
                        <p className="text-[11px] text-[#756A62]">{fmt.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowExportModal(false)}
                  className="rounded-xl border border-[#1C1613]/15 px-4 py-2 text-xs font-semibold text-[#52463F]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDownloadExport}
                  className="flex items-center gap-1.5 rounded-xl bg-[#D9481E] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#B93615]"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download Report File
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
