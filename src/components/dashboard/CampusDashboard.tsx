"use client";

import { useState } from "react";
import { User } from "firebase/auth";
import { UserProfile } from "@/types/dashboard";
import {
  Award,
  BarChart3,
  BookOpen,
  Building2,
  Calendar,
  CheckCircle2,
  Download,
  ExternalLink,
  GraduationCap,
  Mail,
  Plus,
  School,
  Search,
  Share2,
  ShieldCheck,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";

interface CampusDashboardProps {
  user: User;
  profile: UserProfile | null;
}

export function CampusDashboard({ user, profile }: CampusDashboardProps) {
  const [activeTab, setActiveTab] = useState<"students" | "drives" | "recruiters" | "analytics">("students");

  // State for students roster
  const [studentSearch, setStudentSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [students, setStudents] = useState([
    {
      id: "std-1",
      name: "Aditya Sharma",
      usn: "1AP22CS042",
      department: "CSE",
      cgpa: "9.2",
      proofScore: 94,
      reposVerified: 4,
      status: "Shortlisted - Morgan Stanley",
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
      status: "Placed - Amazon (₹28 LPA)",
      statusClass: "bg-emerald-100 text-emerald-800",
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
      status: "In Process - TCS Digital",
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
  ]);

  // State for campus drives
  const [drives, setDrives] = useState([
    {
      id: "drv-1",
      company: "Morgan Stanley",
      ctc: "₹25.5 LPA",
      date: "Nov 12, 2026",
      eligibleBranches: "CSE, IT",
      minCgpa: "8.0",
      minProofScore: 85,
      registeredStudents: 142,
      shortlisted: 28,
      currentRound: "Online Coding Assessment",
      day: "Day 1 Drive",
    },
    {
      id: "drv-2",
      company: "TCS Digital / Prime",
      ctc: "₹9 LPA - ₹12 LPA",
      date: "Nov 18, 2026",
      eligibleBranches: "All Branches",
      minCgpa: "7.0",
      minProofScore: 75,
      registeredStudents: 420,
      shortlisted: 110,
      currentRound: "Technical Interview Schedule",
      day: "Day 2 Drive",
    },
    {
      id: "drv-3",
      company: "Cisco Systems",
      ctc: "₹21 LPA",
      date: "Nov 24, 2026",
      eligibleBranches: "CSE, IT, ECE",
      minCgpa: "8.0",
      minProofScore: 80,
      registeredStudents: 198,
      shortlisted: 34,
      currentRound: "Pre-Placement Talk Completed",
      day: "Day 1 Drive",
    },
  ]);

  // Schedule Drive Modal
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [newCompanyName, setNewCompanyName] = useState("");
  const [newCtc, setNewCtc] = useState("");
  const [newDriveDate, setNewDriveDate] = useState("");
  const [newMinScore, setNewMinScore] = useState("80");

  function handleScheduleDrive(e: React.FormEvent) {
    e.preventDefault();
    if (!newCompanyName.trim()) return;

    setDrives((prev) => [
      {
        id: `drv-${Date.now()}`,
        company: newCompanyName.trim(),
        ctc: newCtc.trim() || "₹14 LPA",
        date: newDriveDate || "Nov 28, 2026",
        eligibleBranches: "CSE, IT, ECE",
        minCgpa: "7.5",
        minProofScore: parseInt(newMinScore, 10) || 75,
        registeredStudents: 85,
        shortlisted: 0,
        currentRound: "Drive Scheduled",
        day: "Upcoming Drive",
      },
      ...prev,
    ]);

    setNewCompanyName("");
    setNewCtc("");
    setNewDriveDate("");
    setShowScheduleModal(false);
  }

  const institutionDisplay =
    profile?.institution || user.displayName || "Apex Institute of Technology";

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
      s.usn.toLowerCase().includes(studentSearch.toLowerCase());
    const matchesDept = deptFilter === "all" || s.department === deptFilter;
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "placed" && s.status.includes("Placed")) ||
      (statusFilter === "process" && (s.status.includes("Shortlisted") || s.status.includes("In Process"))) ||
      (statusFilter === "ready" && s.status.includes("Ready"));
    return matchesSearch && matchesDept && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Campus Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl border border-[#1C1613]/10 bg-white p-6 shadow-sm sm:p-8">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-600/30 bg-blue-600/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
                <School className="h-3.5 w-3.5" />
                Campus Dashboard (Placement Cell / TPO)
              </span>

              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-700">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Batch of 2025–2026 Active
              </span>
            </div>

            <h1 className="aldrich-regular mt-3 text-3xl font-bold sm:text-4xl text-[#1C1613]">
              {institutionDisplay}
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#756A62]">
              {profile?.department ? `${profile.department} • ` : "Training & Placement Cell • "}
              Monitor student technical readiness, verify repository originality, schedule campus drives, and generate automated NIRF/NAAC placement audit reports.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowScheduleModal(true)}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              Schedule Campus Drive
            </button>

            <button
              onClick={() => setActiveTab("analytics")}
              className="flex items-center gap-2 rounded-xl border border-[#1C1613]/15 bg-[#FAF7F2] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#1C1613] transition hover:bg-white"
            >
              <BarChart3 className="h-4 w-4 text-blue-600" />
              Placement Analytics
            </button>
          </div>
        </div>

        {/* 4 TPO Metrics */}
        <div className="mt-8 grid grid-cols-2 gap-4 border-t border-[#1C1613]/10 pt-6 lg:grid-cols-4">
          <div className="rounded-2xl border border-[#1C1613]/5 bg-[#FAF7F2] p-4">
            <div className="flex items-center justify-between text-xs font-semibold text-[#756A62]">
              <span>Eligible Students</span>
              <Users className="h-4 w-4 text-blue-600" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="aldrich-regular text-2xl font-bold text-[#1C1613] sm:text-3xl">
                1,240
              </span>
              <span className="text-xs font-bold text-blue-600">Final Year</span>
            </div>
            <p className="mt-1 text-[11px] text-[#8C8077]">CSE, IT, ECE, Mech</p>
          </div>

          <div className="rounded-2xl border border-[#1C1613]/5 bg-[#FAF7F2] p-4">
            <div className="flex items-center justify-between text-xs font-semibold text-[#756A62]">
              <span>Drive Ready (&gt;75 Score)</span>
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="aldrich-regular text-2xl font-bold text-[#1C1613] sm:text-3xl">
                890
              </span>
              <span className="text-xs font-bold text-emerald-600">71.8%</span>
            </div>
            <p className="mt-1 text-[11px] text-[#8C8077]">Audited against plagiarism</p>
          </div>

          <div className="rounded-2xl border border-[#1C1613]/5 bg-[#FAF7F2] p-4">
            <div className="flex items-center justify-between text-xs font-semibold text-[#756A62]">
              <span>Students Placed</span>
              <GraduationCap className="h-4 w-4 text-[#D9481E]" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="aldrich-regular text-2xl font-bold text-[#1C1613] sm:text-3xl">
                548
              </span>
              <span className="text-xs font-bold text-[#D9481E]">44.2%</span>
            </div>
            <p className="mt-1 text-[11px] text-[#8C8077]">Avg CTC: ₹9.2 LPA</p>
          </div>

          <div className="rounded-2xl border border-[#1C1613]/5 bg-[#FAF7F2] p-4">
            <div className="flex items-center justify-between text-xs font-semibold text-[#756A62]">
              <span>Campus Drives</span>
              <Building2 className="h-4 w-4 text-purple-600" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="aldrich-regular text-2xl font-bold text-[#1C1613] sm:text-3xl">
                28
              </span>
              <span className="text-xs font-bold text-purple-600">This Season</span>
            </div>
            <p className="mt-1 text-[11px] text-[#8C8077]">12 Done, 16 Upcoming</p>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#1C1613]/10 pb-2">
        <button
          onClick={() => setActiveTab("students")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition ${
            activeTab === "students"
              ? "bg-blue-600 text-white shadow-sm"
              : "bg-white text-[#756A62] hover:bg-[#FAF7F2] hover:text-[#1C1613]"
          }`}
        >
          <Users className="h-4 w-4" />
          Batch Students ({students.length})
        </button>

        <button
          onClick={() => setActiveTab("drives")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition ${
            activeTab === "drives"
              ? "bg-blue-600 text-white shadow-sm"
              : "bg-white text-[#756A62] hover:bg-[#FAF7F2] hover:text-[#1C1613]"
          }`}
        >
          <Building2 className="h-4 w-4" />
          Campus Drives Schedule ({drives.length})
        </button>

        <button
          onClick={() => setActiveTab("recruiters")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition ${
            activeTab === "recruiters"
              ? "bg-blue-600 text-white shadow-sm"
              : "bg-white text-[#756A62] hover:bg-[#FAF7F2] hover:text-[#1C1613]"
          }`}
        >
          <UserCheck className="h-4 w-4" />
          Recruiter Collaboration
        </button>

        <button
          onClick={() => setActiveTab("analytics")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition ${
            activeTab === "analytics"
              ? "bg-blue-600 text-white shadow-sm"
              : "bg-white text-[#756A62] hover:bg-[#FAF7F2] hover:text-[#1C1613]"
          }`}
        >
          <BarChart3 className="h-4 w-4" />
          NIRF / NAAC Placement Reports
        </button>
      </div>

      {/* Tab 1: Students Roster */}
      {activeTab === "students" && (
        <div className="space-y-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h3 className="aldrich-regular text-2xl font-bold">
                Student Directory & Verified Readiness
              </h3>
              <p className="text-xs text-[#756A62]">
                Inspect student repository audits, AST scores, and placement milestones.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#756A62]" />
                <input
                  type="text"
                  placeholder="Search name or USN..."
                  value={studentSearch}
                  onChange={(e) => setStudentSearch(e.target.value)}
                  className="rounded-xl border border-[#1C1613]/15 bg-white py-2 pl-9 pr-4 text-xs outline-none focus:border-blue-600"
                />
              </div>

              <select
                value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value)}
                className="rounded-xl border border-[#1C1613]/15 bg-white px-3 py-2 text-xs font-semibold outline-none"
              >
                <option value="all">All Branches</option>
                <option value="CSE">CSE</option>
                <option value="IT">IT</option>
                <option value="ECE">ECE</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-xl border border-[#1C1613]/15 bg-white px-3 py-2 text-xs font-semibold outline-none"
              >
                <option value="all">All Status</option>
                <option value="placed">Placed</option>
                <option value="process">In Process</option>
                <option value="ready">Drive Ready</option>
              </select>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-[#1C1613]/10 bg-white shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[#1C1613]/10 bg-[#FAF7F2] font-mono text-[11px] uppercase tracking-wider text-[#756A62]">
                <tr>
                  <th className="p-4 pl-6">Student & USN</th>
                  <th className="p-4">Branch</th>
                  <th className="p-4">CGPA</th>
                  <th className="p-4">Proof Score</th>
                  <th className="p-4">Repos</th>
                  <th className="p-4">Placement Status</th>
                  <th className="p-4 pr-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1C1613]/5">
                {filteredStudents.map((std) => (
                  <tr key={std.id} className="hover:bg-[#FAF7F2]/50 transition">
                    <td className="p-4 pl-6">
                      <strong className="text-sm font-bold text-[#1C1613] block">
                        {std.name}
                      </strong>
                      <span className="font-mono text-[11px] text-[#756A62]">{std.usn}</span>
                    </td>
                    <td className="p-4 font-bold text-[#1C1613]">{std.department}</td>
                    <td className="p-4 font-mono font-bold text-[#1C1613]">{std.cgpa}</td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 font-bold text-blue-700">
                        <ShieldCheck className="h-3.5 w-3.5 text-blue-600" />
                        {std.proofScore}/100
                      </span>
                    </td>
                    <td className="p-4 text-[#52463F]">{std.reposVerified} verified</td>
                    <td className="p-4">
                      <span className={`inline-block rounded-md px-2.5 py-1 text-[11px] font-bold ${std.statusClass}`}>
                        {std.status}
                      </span>
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <button
                        onClick={() => alert(`Viewing verified dossier for ${std.name}`)}
                        className="rounded-lg border border-[#1C1613]/15 bg-white px-2.5 py-1 text-xs font-semibold text-[#1C1613] hover:bg-[#FAF7F2]"
                      >
                        View Dossier
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Campus Drives */}
      {activeTab === "drives" && (
        <div className="space-y-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h3 className="aldrich-regular text-2xl font-bold">
                Campus Placement Drives Schedule
              </h3>
              <p className="text-xs text-[#756A62]">
                Round progression tracking, eligible candidate rosters, and company visit schedules.
              </p>
            </div>

            <button
              onClick={() => setShowScheduleModal(true)}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              Add Scheduled Drive
            </button>
          </div>

          <div className="space-y-4">
            {drives.map((drv) => (
              <div
                key={drv.id}
                className="flex flex-col justify-between gap-5 rounded-3xl border border-[#1C1613]/10 bg-white p-6 shadow-sm transition hover:shadow-md lg:flex-row lg:items-center"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="aldrich-regular text-xl font-bold text-[#1C1613]">
                      {drv.company}
                    </h4>
                    <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-bold text-blue-700">
                      {drv.day}
                    </span>
                    <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
                      Package: {drv.ctc}
                    </span>
                  </div>

                  <p className="text-xs text-[#756A62]">
                    Drive Date: <strong className="text-[#1C1613]">{drv.date}</strong> • Eligible: {drv.eligibleBranches} (Min CGPA: {drv.minCgpa}, Min Proof: {drv.minProofScore}+)
                  </p>

                  <div className="flex items-center gap-2 pt-1 text-xs text-[#52463F]">
                    <span className="font-semibold text-blue-600">Active Stage:</span>
                    <span>{drv.currentRound}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-6 border-t border-[#1C1613]/10 pt-4 lg:border-t-0 lg:pt-0">
                  <div className="text-center">
                    <p className="text-xs text-[#756A62]">Registered</p>
                    <p className="aldrich-regular mt-0.5 text-2xl font-bold text-[#1C1613]">
                      {drv.registeredStudents}
                    </p>
                  </div>

                  <div className="text-center">
                    <p className="text-xs text-[#756A62]">Shortlisted</p>
                    <p className="aldrich-regular mt-0.5 text-2xl font-bold text-emerald-600">
                      {drv.shortlisted}
                    </p>
                  </div>

                  <button
                    onClick={() => alert(`Exporting candidate list for ${drv.company}`)}
                    className="flex items-center gap-1.5 rounded-xl bg-blue-50 px-4 py-2.5 text-xs font-bold text-blue-700 hover:bg-blue-100 transition"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Export Candidates
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Recruiter Collaboration */}
      {activeTab === "recruiters" && (
        <div className="space-y-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h3 className="aldrich-regular text-2xl font-bold">
                Visiting Recruiters & Corporate Partnerships
              </h3>
              <p className="text-xs text-[#756A62]">
                Companies invited to interview your college batch using verified CheckTalent skill dossiers.
              </p>
            </div>

            <button
              onClick={() => alert("Invite link copied to clipboard for visiting employers!")}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-blue-700"
            >
              <Mail className="h-4 w-4" />
              Invite New Recruiter
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                name: "Microsoft",
                slot: "Day 0 Campus Visit",
                roles: "SDE 1 (Azure Core)",
                status: "Slot Confirmed",
                color: "text-emerald-700 bg-emerald-50",
              },
              {
                name: "Amazon AWS",
                slot: "Day 1 Drive",
                roles: "Cloud Support & SDE Intern",
                status: "Completed (18 Offers)",
                color: "text-blue-700 bg-blue-50",
              },
              {
                name: "Cisco Systems",
                slot: "Day 1 Drive",
                roles: "Network Software Engineer",
                status: "Slot Confirmed",
                color: "text-purple-700 bg-purple-50",
              },
            ].map((rec, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-[#1C1613]/10 bg-white p-6 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-[#756A62]">{rec.slot}</span>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${rec.color}`}>
                      {rec.status}
                    </span>
                  </div>

                  <h4 className="aldrich-regular mt-3 text-xl font-bold text-[#1C1613]">
                    {rec.name}
                  </h4>
                  <p className="mt-1 text-xs text-[#756A62]">Roles: {rec.roles}</p>
                </div>

                <div className="mt-6 border-t border-[#1C1613]/10 pt-4 flex items-center justify-between">
                  <span className="text-xs text-[#52463F]">Dossier Access: Granted</span>
                  <button className="text-xs font-bold text-blue-600 hover:underline">
                    Manage Slot
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Analytics & Accreditation */}
      {activeTab === "analytics" && (
        <div className="space-y-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h3 className="aldrich-regular text-2xl font-bold">
                NIRF & NAAC Placement Accreditation Metrics
              </h3>
              <p className="text-xs text-[#756A62]">
                Real-time verified placement stats ready for institutional accreditation submissions.
              </p>
            </div>

            <button
              onClick={() => alert("Downloading verified accreditation report (PDF)...")}
              className="flex items-center gap-2 rounded-xl bg-[#1C1613] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-black"
            >
              <Download className="h-4 w-4" />
              Download Audit PDF
            </button>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-[#1C1613]/10 bg-white p-6 shadow-sm">
              <h4 className="aldrich-regular text-lg font-bold">
                Department Placement Progression
              </h4>

              <div className="mt-6 space-y-4">
                {[
                  { dept: "Computer Science & Engineering", placed: 84, total: 320, pct: "84%" },
                  { dept: "Information Technology", placed: 79, total: 240, pct: "79%" },
                  { dept: "Electronics & Communication", placed: 64, total: 280, pct: "64%" },
                  { dept: "Electrical / Mechanical", placed: 48, total: 400, pct: "48%" },
                ].map((d, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span>{d.dept}</span>
                      <strong className="text-blue-700">{d.pct} ({d.placed * 2} students)</strong>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-[#1C1613]/10 overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: `${d.placed}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-[#1C1613]/10 bg-white p-6 shadow-sm">
              <h4 className="aldrich-regular text-lg font-bold">
                Batch Skill Competency Audit
              </h4>
              <p className="text-xs text-[#756A62]">
                Synthesized across all 1,240 enrolled student repositories:
              </p>

              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between rounded-xl bg-[#FAF7F2] p-3 text-xs">
                  <div>
                    <strong className="text-[#1C1613]">High-Demand Competencies</strong>
                    <p className="text-[#756A62]">React/Next.js, Go, TypeScript, PostgreSQL</p>
                  </div>
                  <span className="font-bold text-emerald-600">82% Verified</span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-[#FAF7F2] p-3 text-xs">
                  <div>
                    <strong className="text-[#1C1613]">Recommended Training Focus</strong>
                    <p className="text-[#756A62]">Docker containers, Kubernetes, Rust concurrency</p>
                  </div>
                  <span className="font-bold text-amber-600">38% Verified</span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-[#FAF7F2] p-3 text-xs">
                  <div>
                    <strong className="text-[#1C1613]">Anti-Plagiarism Batch Score</strong>
                    <p className="text-[#756A62]">Audited against 1.2M public repositories</p>
                  </div>
                  <span className="font-bold text-emerald-600">99.4% Original</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Drive Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-3xl border border-[#1C1613]/10 bg-white p-6 shadow-2xl sm:p-8">
            <h3 className="aldrich-regular text-2xl font-bold text-[#1C1613]">
              Schedule Campus Placement Drive
            </h3>
            <p className="mt-1 text-xs text-[#756A62]">
              Set company visit date, package offered, and minimum skill proof threshold.
            </p>

            <form onSubmit={handleScheduleDrive} className="mt-6 space-y-4">
              <div>
                <label className="mb-1 block text-xs font-bold uppercase text-[#1C1613]">
                  Company Name
                </label>
                <input
                  type="text"
                  required
                  value={newCompanyName}
                  onChange={(e) => setNewCompanyName(e.target.value)}
                  placeholder="e.g. Google, Cisco, Razorpay"
                  className="w-full rounded-xl border border-[#1C1613]/15 bg-[#FAF7F2]/50 px-4 py-2.5 text-sm outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-bold uppercase text-[#1C1613]">
                    CTC Package Offered
                  </label>
                  <input
                    type="text"
                    value={newCtc}
                    onChange={(e) => setNewCtc(e.target.value)}
                    placeholder="e.g. ₹18 LPA"
                    className="w-full rounded-xl border border-[#1C1613]/15 bg-[#FAF7F2]/50 px-4 py-2.5 text-sm outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-bold uppercase text-[#1C1613]">
                    Drive Date
                  </label>
                  <input
                    type="date"
                    value={newDriveDate}
                    onChange={(e) => setNewDriveDate(e.target.value)}
                    className="w-full rounded-xl border border-[#1C1613]/15 bg-[#FAF7F2]/50 px-4 py-2.5 text-sm outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold uppercase text-[#1C1613]">
                  Minimum CheckTalent Proof Score Required
                </label>
                <select
                  value={newMinScore}
                  onChange={(e) => setNewMinScore(e.target.value)}
                  className="w-full rounded-xl border border-[#1C1613]/15 bg-[#FAF7F2]/50 px-4 py-2.5 text-sm outline-none focus:border-blue-600"
                >
                  <option value="70">70+ (Standard)</option>
                  <option value="75">75+ (High Package)</option>
                  <option value="80">80+ (Tier 1 Super Dream)</option>
                  <option value="85">85+ (Elite Research & Systems)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1C1613]/10">
                <button
                  type="button"
                  onClick={() => setShowScheduleModal(false)}
                  className="rounded-xl border border-[#1C1613]/15 px-4 py-2.5 text-xs font-bold uppercase text-[#756A62] hover:bg-[#FAF7F2]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold uppercase text-white hover:bg-blue-700"
                >
                  Confirm & Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
