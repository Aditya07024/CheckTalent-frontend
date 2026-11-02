"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { assignUserRole } from "@/lib/user-role";
import { DashboardRole, ROLE_CONFIGS, UserProfile } from "@/types/dashboard";
import {
  ArrowRight,
  Briefcase,
  Building2,
  Check,
  ChevronDown,
  GraduationCap,
  LogOut,
  RefreshCw,
  School,
  ShieldCheck,
  User as UserIcon,
} from "lucide-react";

interface DashboardHeaderProps {
  user: User;
  profile: UserProfile | null;
  currentRole: DashboardRole;
  onRoleChange: (newRole: DashboardRole) => void;
}

export function DashboardHeader({
  user,
  profile,
  currentRole,
  onRoleChange,
}: DashboardHeaderProps) {
  const router = useRouter();
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);
  const [switching, setSwitching] = useState(false);

  async function handleSignOut() {
    await signOut(auth);
    router.replace("/signin");
  }

  async function handleSwitchRole(role: DashboardRole) {
    if (role === currentRole) {
      setRoleSwitcherOpen(false);
      return;
    }

    setSwitching(true);
    try {
      await assignUserRole(user.uid, role, {
        email: user.email,
        displayName: user.displayName || user.email?.split("@")[0],
      });
      onRoleChange(role);
      setRoleSwitcherOpen(false);
    } catch (e) {
      console.error("Failed to switch role:", e);
      onRoleChange(role);
      setRoleSwitcherOpen(false);
    } finally {
      setSwitching(false);
    }
  }

  const roleMeta = ROLE_CONFIGS[currentRole];

  return (
    <header className="sticky top-0 z-30 border-b border-[#1C1613]/10 bg-[#FAF7F2]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        {/* Left: Brand & Dashboard Indicator */}
        <div className="flex items-center gap-4">
          <Link href="/" className="aldrich-regular text-2xl font-bold">
            CheckTalent<span className="text-[#D9481E]">.</span>
          </Link>

          <span className="hidden h-5 w-px bg-[#1C1613]/15 sm:inline-block" />

          {/* Active Role Tag */}
          <div className="hidden items-center gap-2 rounded-full border border-[#1C1613]/10 bg-white px-3 py-1 text-xs font-semibold sm:flex">
            {currentRole === "student" && (
              <span className="flex items-center gap-1.5 text-[#D9481E]">
                <GraduationCap className="h-3.5 w-3.5" />
                Student / Employee
              </span>
            )}
            {currentRole === "offcampus" && (
              <span className="flex items-center gap-1.5 text-[#B8710B]">
                <Building2 className="h-3.5 w-3.5" />
                Off-Campus Companies
              </span>
            )}
            {currentRole === "campus" && (
              <span className="flex items-center gap-1.5 text-blue-600">
                <School className="h-3.5 w-3.5" />
                Campus / University
              </span>
            )}
          </div>
        </div>

        {/* Right: Role Switcher & User Profile & Sign Out */}
        <div className="flex items-center gap-3">
          {/* Quick Role Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setRoleSwitcherOpen(!roleSwitcherOpen)}
              className="flex items-center gap-2 rounded-xl border border-[#1C1613]/15 bg-white px-3 py-2 text-xs font-semibold text-[#1C1613] shadow-sm transition hover:bg-[#FAF7F2]"
              title="Switch between the 3 dashboards"
            >
              <RefreshCw className={`h-3.5 w-3.5 text-[#D9481E] ${switching ? "animate-spin" : ""}`} />
              <span className="hidden md:inline">Dashboard:</span>
              <span className="font-bold text-[#D9481E]">{roleMeta.title}</span>
              <ChevronDown className="h-3.5 w-3.5 text-[#756A62]" />
            </button>

            {roleSwitcherOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setRoleSwitcherOpen(false)}
                />
                <div className="absolute right-0 top-full z-50 mt-2 w-80 rounded-2xl border border-[#1C1613]/15 bg-white p-3 shadow-xl">
                  <div className="mb-2 border-b border-[#1C1613]/10 px-3 pb-2">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#756A62]">
                      Switch Assigned Dashboard
                    </p>
                    <p className="text-xs text-[#52463F]">
                      Choose any role to switch your view instantly:
                    </p>
                  </div>

                  <div className="space-y-1">
                    {(["student", "offcampus", "campus"] as DashboardRole[]).map((r) => {
                      const meta = ROLE_CONFIGS[r];
                      const isCurrent = r === currentRole;
                      return (
                        <button
                          key={r}
                          onClick={() => handleSwitchRole(r)}
                          disabled={switching}
                          className={`flex w-full items-start gap-3 rounded-xl p-2.5 text-left transition ${
                            isCurrent
                              ? "bg-[#D9481E]/10 font-bold text-[#D9481E]"
                              : "hover:bg-[#FAF7F2] text-[#1C1613]"
                          }`}
                        >
                          <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-lg bg-white shadow-xs">
                            {r === "student" && <GraduationCap className="h-4 w-4 text-[#D9481E]" />}
                            {r === "offcampus" && <Building2 className="h-4 w-4 text-[#B8710B]" />}
                            {r === "campus" && <School className="h-4 w-4 text-blue-600" />}
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold">{meta.title}</span>
                              {isCurrent && <Check className="h-4 w-4 text-[#D9481E]" />}
                            </div>
                            <span className="text-[11px] font-normal text-[#756A62]">
                              {meta.targetAudience}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-2 flex flex-col gap-1 border-t border-[#1C1613]/10 pt-2 text-center">
                    <Link
                      href="/dashboard/test"
                      onClick={() => setRoleSwitcherOpen(false)}
                      className="rounded-lg bg-[#FAF7F2] py-1.5 text-xs font-bold text-[#D9481E] hover:bg-[#D9481E] hover:text-white transition"
                    >
                      Open 3-in-1 Test Suite →
                    </Link>
                    <Link
                      href="/onboarding"
                      onClick={() => setRoleSwitcherOpen(false)}
                      className="text-xs font-medium text-[#756A62] hover:text-[#D9481E]"
                    >
                      Reconfigure details in Onboarding
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* User Email Pill */}
          <div className="hidden items-center gap-2 rounded-xl border border-[#1C1613]/10 bg-white/80 px-3 py-2 text-xs font-medium text-[#52463F] lg:flex">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#D9481E]/10 text-[10px] font-bold text-[#D9481E]">
              {(user.displayName || user.email || "U").charAt(0).toUpperCase()}
            </div>
            <span className="max-w-[140px] truncate">{user.displayName || user.email}</span>
          </div>

          {/* Sign Out */}
          <button
            onClick={handleSignOut}
            className="flex items-center gap-1.5 rounded-xl border border-[#1C1613]/15 bg-white px-3 py-2 text-xs font-semibold text-[#1C1613] transition hover:bg-red-50 hover:text-red-700"
            title="Sign out of CheckTalent"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </div>
    </header>
  );
}
