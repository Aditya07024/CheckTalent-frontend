"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { assignUserRole, getUserProfile } from "@/lib/user-role";
import { DashboardRole, ROLE_CONFIGS } from "@/types/dashboard";
import {
  ArrowRight,
  Briefcase,
  Building2,
  CheckCircle2,
  GraduationCap,
  Loader2,
  School,
  Sparkles,
} from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [authChecking, setAuthChecking] = useState(true);
  const [selectedRole, setSelectedRole] = useState<DashboardRole>("student");
  const [saving, setSaving] = useState(false);

  // Role-specific form fields
  const [institution, setInstitution] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [headline, setHeadline] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [department, setDepartment] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.replace("/signin");
        return;
      }

      setUser(currentUser);

      // Check if user already has a role
      const profile = await getUserProfile(currentUser.uid);
      if (profile?.role) {
        // Pre-select existing role or redirect if already configured
        setSelectedRole(profile.role);
        if (profile.institution) setInstitution(profile.institution);
        if (profile.companyName) setCompanyName(profile.companyName);
        if (profile.headline) setHeadline(profile.headline);
        if (profile.targetRole) setTargetRole(profile.targetRole);
      }

      setAuthChecking(false);
    });

    return () => unsubscribe();
  }, [router]);

  async function handleConfirmRole() {
    if (!user) return;
    setSaving(true);

    try {
      await assignUserRole(user.uid, selectedRole, {
        email: user.email,
        displayName: user.displayName || user.email?.split("@")[0] || "User",
        institution,
        companyName,
        headline,
        targetRole,
        department,
      });

      router.replace("/dashboard");
    } catch (err) {
      console.error("Error saving role:", err);
      // Still proceed to dashboard since localStorage fallback succeeded
      router.replace("/dashboard");
    } finally {
      setSaving(false);
    }
  }

  if (authChecking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAF7F2] text-[#1C1613]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-[#D9481E]" />
          <p className="text-sm font-medium text-[#756A62]">
            Preparing your CheckTalent onboarding...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF7F2] px-5 py-8 text-[#1C1613]">
      {/* Top Navigation */}
      <header className="mx-auto flex max-w-6xl items-center justify-between border-b border-[#1C1613]/10 pb-6">
        <Link href="/" className="aldrich-regular text-2xl font-bold">
          CheckTalent<span className="text-[#D9481E]">.</span>
        </Link>

        <div className="flex items-center gap-3 text-xs font-medium text-[#756A62]">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Signed in as <strong className="text-[#1C1613]">{user?.email}</strong></span>
        </div>
      </header>

      {/* Main Content */}
      <section className="mx-auto mt-10 max-w-6xl">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D9481E]/20 bg-[#D9481E]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#D9481E]">
            <Sparkles className="h-3.5 w-3.5" />
            Account Setup & Personalization
          </div>

          <h1 className="aldrich-regular mt-4 text-3xl font-bold sm:text-5xl">
            Choose Your Dashboard Type
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-base text-[#756A62]">
            Select how you want to use CheckTalent. We will configure your
            workspace with tailored tools, metrics, and workflows.
          </p>
        </div>

        {/* 3 Dashboard Role Cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {/* Option 1: Student / User / Employee */}
          <div
            onClick={() => setSelectedRole("student")}
            className={`group relative flex cursor-pointer flex-col justify-between rounded-3xl border-2 p-7 transition-all duration-200 ${
              selectedRole === "student"
                ? "border-[#D9481E] bg-white shadow-[0_16px_40px_rgba(217,72,30,0.12)] ring-4 ring-[#D9481E]/10"
                : "border-[#1C1613]/10 bg-white/70 hover:border-[#D9481E]/40 hover:bg-white"
            }`}
          >
            {selectedRole === "student" && (
              <div className="absolute right-5 top-5 flex h-7 w-7 items-center justify-center rounded-full bg-[#D9481E] text-white">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            )}

            <div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D9481E]/10 text-[#D9481E]">
                <GraduationCap className="h-7 w-7" />
              </div>

              <div className="mt-5">
                <span className="rounded-md bg-[#FAF7F2] px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#756A62]">
                  For Candidates
                </span>
                <h3 className="aldrich-regular mt-2 text-2xl font-bold text-[#1C1613]">
                  User / Student / Employee
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#756A62]">
                  {ROLE_CONFIGS.student.description}
                </p>
              </div>

              <div className="mt-6 space-y-2.5 border-t border-[#1C1613]/10 pt-5">
                <p className="text-xs font-bold uppercase tracking-wider text-[#1C1613]">
                  What's inside:
                </p>
                {ROLE_CONFIGS.student.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-[#52463F]">
                    <span className="mt-0.5 text-[#D9481E]">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4">
              <span
                className={`block w-full rounded-xl py-2.5 text-center text-xs font-bold uppercase tracking-wider transition ${
                  selectedRole === "student"
                    ? "bg-[#D9481E] text-white"
                    : "bg-[#FAF7F2] text-[#756A62] group-hover:bg-[#D9481E]/10 group-hover:text-[#D9481E]"
                }`}
              >
                {selectedRole === "student" ? "Selected" : "Select this role"}
              </span>
            </div>
          </div>

          {/* Option 2: Off-Campus Companies */}
          <div
            onClick={() => setSelectedRole("offcampus")}
            className={`group relative flex cursor-pointer flex-col justify-between rounded-3xl border-2 p-7 transition-all duration-200 ${
              selectedRole === "offcampus"
                ? "border-[#E9A23B] bg-white shadow-[0_16px_40px_rgba(233,162,59,0.18)] ring-4 ring-[#E9A23B]/15"
                : "border-[#1C1613]/10 bg-white/70 hover:border-[#E9A23B]/50 hover:bg-white"
            }`}
          >
            {selectedRole === "offcampus" && (
              <div className="absolute right-5 top-5 flex h-7 w-7 items-center justify-center rounded-full bg-[#E9A23B] text-white">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            )}

            <div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E9A23B]/15 text-[#B8710B]">
                <Building2 className="h-7 w-7" />
              </div>

              <div className="mt-5">
                <span className="rounded-md bg-[#FAF7F2] px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#756A62]">
                  For Recruiters & Startups
                </span>
                <h3 className="aldrich-regular mt-2 text-2xl font-bold text-[#1C1613]">
                  Off-Campus Companies
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#756A62]">
                  {ROLE_CONFIGS.offcampus.description}
                </p>
              </div>

              <div className="mt-6 space-y-2.5 border-t border-[#1C1613]/10 pt-5">
                <p className="text-xs font-bold uppercase tracking-wider text-[#1C1613]">
                  What's inside:
                </p>
                {ROLE_CONFIGS.offcampus.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-[#52463F]">
                    <span className="mt-0.5 text-[#E9A23B]">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4">
              <span
                className={`block w-full rounded-xl py-2.5 text-center text-xs font-bold uppercase tracking-wider transition ${
                  selectedRole === "offcampus"
                    ? "bg-[#E9A23B] text-black font-extrabold"
                    : "bg-[#FAF7F2] text-[#756A62] group-hover:bg-[#E9A23B]/15 group-hover:text-[#B8710B]"
                }`}
              >
                {selectedRole === "offcampus" ? "Selected" : "Select this role"}
              </span>
            </div>
          </div>

          {/* Option 3: Campus */}
          <div
            onClick={() => setSelectedRole("campus")}
            className={`group relative flex cursor-pointer flex-col justify-between rounded-3xl border-2 p-7 transition-all duration-200 ${
              selectedRole === "campus"
                ? "border-blue-600 bg-white shadow-[0_16px_40px_rgba(37,99,235,0.12)] ring-4 ring-blue-600/10"
                : "border-[#1C1613]/10 bg-white/70 hover:border-blue-600/40 hover:bg-white"
            }`}
          >
            {selectedRole === "campus" && (
              <div className="absolute right-5 top-5 flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            )}

            <div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600">
                <School className="h-7 w-7" />
              </div>

              <div className="mt-5">
                <span className="rounded-md bg-[#FAF7F2] px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#756A62]">
                  For Universities & TPO
                </span>
                <h3 className="aldrich-regular mt-2 text-2xl font-bold text-[#1C1613]">
                  Campus
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#756A62]">
                  {ROLE_CONFIGS.campus.description}
                </p>
              </div>

              <div className="mt-6 space-y-2.5 border-t border-[#1C1613]/10 pt-5">
                <p className="text-xs font-bold uppercase tracking-wider text-[#1C1613]">
                  What's inside:
                </p>
                {ROLE_CONFIGS.campus.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-[#52463F]">
                    <span className="mt-0.5 text-blue-600">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4">
              <span
                className={`block w-full rounded-xl py-2.5 text-center text-xs font-bold uppercase tracking-wider transition ${
                  selectedRole === "campus"
                    ? "bg-blue-600 text-white"
                    : "bg-[#FAF7F2] text-[#756A62] group-hover:bg-blue-50 group-hover:text-blue-600"
                }`}
              >
                {selectedRole === "campus" ? "Selected" : "Select this role"}
              </span>
            </div>
          </div>
        </div>

        {/* Customized Details Form (Based on selection) */}
        <div className="mx-auto mt-10 max-w-2xl rounded-3xl border border-[#1C1613]/10 bg-white p-7 shadow-sm sm:p-9">
          <h2 className="aldrich-regular text-xl font-bold">
            Step 2: Quick Information
          </h2>
          <p className="mt-1 text-xs text-[#756A62]">
            Help us personalize your {ROLE_CONFIGS[selectedRole].title} dashboard.
          </p>

          <div className="mt-6 space-y-4">
            {selectedRole === "student" && (
              <>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#1C1613]">
                    College / University / Organization
                  </label>
                  <input
                    type="text"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    placeholder="e.g. Apex Institute of Technology or Self-Taught"
                    className="w-full rounded-xl border border-[#1C1613]/15 bg-[#FAF7F2]/50 px-4 py-3 text-sm outline-none transition placeholder:text-[#A69A91] focus:border-[#D9481E] focus:ring-2 focus:ring-[#D9481E]/10"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#1C1613]">
                    Target Role or Specialty
                  </label>
                  <input
                    type="text"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    placeholder="e.g. Full-Stack Engineer, Backend (Go/Rust), DevOps"
                    className="w-full rounded-xl border border-[#1C1613]/15 bg-[#FAF7F2]/50 px-4 py-3 text-sm outline-none transition placeholder:text-[#A69A91] focus:border-[#D9481E] focus:ring-2 focus:ring-[#D9481E]/10"
                  />
                </div>
              </>
            )}

            {selectedRole === "offcampus" && (
              <>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#1C1613]">
                    Company / Organization Name
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Acme Tech, Stripe, High-Growth Startup"
                    className="w-full rounded-xl border border-[#1C1613]/15 bg-[#FAF7F2]/50 px-4 py-3 text-sm outline-none transition placeholder:text-[#E9A23B] focus:border-[#E9A23B] focus:ring-2 focus:ring-[#E9A23B]/10"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#1C1613]">
                    Your Title / Hiring Role
                  </label>
                  <input
                    type="text"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    placeholder="e.g. Engineering Lead, Technical Recruiter, VP of Engineering"
                    className="w-full rounded-xl border border-[#1C1613]/15 bg-[#FAF7F2]/50 px-4 py-3 text-sm outline-none transition placeholder:text-[#A69A91] focus:border-[#E9A23B] focus:ring-2 focus:ring-[#E9A23B]/10"
                  />
                </div>
              </>
            )}

            {selectedRole === "campus" && (
              <>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#1C1613]">
                    University / College / Institute Name
                  </label>
                  <input
                    type="text"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    placeholder="e.g. Delhi Technological University, NIT, Apex College of Engg."
                    className="w-full rounded-xl border border-[#1C1613]/15 bg-[#FAF7F2]/50 px-4 py-3 text-sm outline-none transition placeholder:text-[#A69A91] focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#1C1613]">
                    Department / TPO Office Designation
                  </label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="e.g. Training & Placement Officer, HOD Computer Science, Dean Academics"
                    className="w-full rounded-xl border border-[#1C1613]/15 bg-[#FAF7F2]/50 px-4 py-3 text-sm outline-none transition placeholder:text-[#A69A91] focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10"
                  />
                </div>
              </>
            )}

            <button
              onClick={handleConfirmRole}
              disabled={saving}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#D9481E] px-5 py-4 font-semibold text-white transition hover:bg-[#B93615] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Assigning Dashboard to ID...
                </>
              ) : (
                <>
                  Enter {ROLE_CONFIGS[selectedRole].title} Dashboard
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>

            <p className="text-center text-xs text-[#8C8077]">
              You can switch between role views anytime from your dashboard header.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
