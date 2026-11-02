"use client";

import { useState } from "react";
import Link from "next/link";
import { User } from "firebase/auth";
import { DashboardRole, ROLE_CONFIGS, UserProfile } from "@/types/dashboard";
import { StudentDashboard } from "@/components/dashboard/StudentDashboard";
import { OffcampusDashboard } from "@/components/dashboard/OffcampusDashboard";
import { CampusDashboard } from "@/components/dashboard/CampusDashboard";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Building2,
  CheckCircle2,
  ExternalLink,
  Eye,
  GraduationCap,
  Layers,
  RefreshCw,
  School,
  Sparkles,
  UserCheck,
  Wrench,
} from "lucide-react";

// Mock user profiles for frictionless test suite exploration
const TEST_PERSONAS: Record<
  DashboardRole,
  { user: User; profile: UserProfile; label: string }
> = {
  student: {
    label: "Aditya Sharma (Candidate / Student)",
    user: {
      uid: "test-student-uid-01",
      email: "aditya.sharma@apex.edu",
      displayName: "Aditya Sharma",
      emailVerified: true,
      isAnonymous: false,
      metadata: {},
      providerData: [],
      refreshToken: "",
      tenantId: null,
      delete: async () => {},
      getIdToken: async () => "mock-token",
      getIdTokenResult: async () => ({} as any),
      reload: async () => {},
      toJSON: () => ({}),
      phoneNumber: null,
      photoURL: null,
      providerId: "firebase",
    } as unknown as User,
    profile: {
      uid: "test-student-uid-01",
      email: "aditya.sharma@apex.edu",
      displayName: "Aditya Sharma",
      role: "student",
      institution: "Apex Institute of Technology",
      targetRole: "Full-Stack Software Engineer (Next.js + Go)",
      headline: "Distributed Systems & React Specialist",
      department: "Computer Science & Engineering",
      batchYear: "2026",
    },
  },
  offcampus: {
    label: "Zepto / Acme Corp (Off-Campus Recruiter)",
    user: {
      uid: "test-company-uid-02",
      email: "talent@zepto-enterprise.com",
      displayName: "Zepto Talent Acquisition",
      emailVerified: true,
      isAnonymous: false,
      metadata: {},
      providerData: [],
      refreshToken: "",
      tenantId: null,
      delete: async () => {},
      getIdToken: async () => "mock-token",
      getIdTokenResult: async () => ({} as any),
      reload: async () => {},
      toJSON: () => ({}),
      phoneNumber: null,
      photoURL: null,
      providerId: "firebase",
    } as unknown as User,
    profile: {
      uid: "test-company-uid-02",
      email: "talent@zepto-enterprise.com",
      displayName: "Zepto Talent Acquisition",
      role: "offcampus",
      companyName: "Zepto Technologies",
      headline: "Head of Engineering Talent",
      targetRole: "Hiring: Senior Backend & Full-Stack",
    },
  },
  campus: {
    label: "Apex Institute of Tech (Campus / TPO)",
    user: {
      uid: "test-campus-uid-03",
      email: "tpo@apexinstitute.edu.in",
      displayName: "Training & Placement Cell",
      emailVerified: true,
      isAnonymous: false,
      metadata: {},
      providerData: [],
      refreshToken: "",
      tenantId: null,
      delete: async () => {},
      getIdToken: async () => "mock-token",
      getIdTokenResult: async () => ({} as any),
      reload: async () => {},
      toJSON: () => ({}),
      phoneNumber: null,
      photoURL: null,
      providerId: "firebase",
    } as unknown as User,
    profile: {
      uid: "test-campus-uid-03",
      email: "tpo@apexinstitute.edu.in",
      displayName: "Training & Placement Cell",
      role: "campus",
      institution: "Apex Institute of Technology",
      department: "TPO Directorate / Academic Affairs",
      headline: "Director of Corporate Relations & Placements",
    },
  },
};

export default function TestDashboardsPage() {
  const [selectedRole, setSelectedRole] = useState<DashboardRole>("student");

  const currentPersona = TEST_PERSONAS[selectedRole];
  const roleMeta = ROLE_CONFIGS[selectedRole];

  return (
    <main className="min-h-screen bg-[#FAF7F2] pb-20 text-[#1C1613]">
      {/* Test Suite Control Ribbon */}
      <section className="sticky top-0 z-40 border-b border-[#1C1613]/15 bg-[#1C1613] text-white shadow-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
          {/* Left: Suite Badge & Title */}
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-2.5 py-1 text-xs font-semibold text-white/90 hover:bg-white/20"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Live Dashboard
            </Link>

            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                Dashboard Test Suite (3-in-1 Preview)
              </span>
            </div>
          </div>

          {/* Center: 3 Direct Switcher Buttons */}
          <div className="flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/5 p-1">
            <button
              onClick={() => setSelectedRole("student")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                selectedRole === "student"
                  ? "bg-[#D9481E] text-white shadow-sm"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <GraduationCap className="h-3.5 w-3.5" />
              1. User / Student / Employee
            </button>

            <button
              onClick={() => setSelectedRole("offcampus")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                selectedRole === "offcampus"
                  ? "bg-[#E9A23B] text-black shadow-sm font-extrabold"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Building2 className="h-3.5 w-3.5" />
              2. Off-Campus Companies
            </button>

            <button
              onClick={() => setSelectedRole("campus")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                selectedRole === "campus"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <School className="h-3.5 w-3.5" />
              3. Campus
            </button>
          </div>

          {/* Right: Quick Verification Links */}
          <div className="flex items-center gap-2 text-xs">
            <Link
              href="/onboarding"
              className="flex items-center gap-1 rounded-lg border border-white/20 px-2.5 py-1 text-white/80 hover:bg-white/10 hover:text-white"
            >
              Test Onboarding <ExternalLink className="h-3 w-3" />
            </Link>
            <Link
              href="/signup"
              className="flex items-center gap-1 rounded-lg border border-white/20 px-2.5 py-1 text-white/80 hover:bg-white/10 hover:text-white"
            >
              Test Signup <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* Sub-bar showing active persona test details */}
        <div className="border-t border-white/10 bg-black/30 px-5 py-2 text-[11px] text-white/80 sm:px-8">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2">
            <span>
              <strong>Active Testing Persona:</strong> {currentPersona.label} (ID:{" "}
              <code>{currentPersona.user.uid}</code>)
            </span>
            <span className="text-[#E9A23B]">
              Role: <strong>{roleMeta.title}</strong> • Click any tab or button above to toggle instantly without logging out.
            </span>
          </div>
        </div>
      </section>

      {/* Main Testing View */}
      <section className="mx-auto mt-6 max-w-7xl px-5 sm:px-8">
        {selectedRole === "student" && (
          <StudentDashboard
            user={currentPersona.user}
            profile={currentPersona.profile}
          />
        )}

        {selectedRole === "offcampus" && (
          <OffcampusDashboard
            user={currentPersona.user}
            profile={currentPersona.profile}
          />
        )}

        {selectedRole === "campus" && (
          <CampusDashboard
            user={currentPersona.user}
            profile={currentPersona.profile}
          />
        )}
      </section>
    </main>
  );
}
