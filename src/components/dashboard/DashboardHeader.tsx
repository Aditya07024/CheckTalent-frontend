"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { DashboardRole, ROLE_CONFIGS, UserProfile } from "@/types/dashboard";
import {
  Building2,
  GraduationCap,
  Lock,
  LogOut,
  School,
} from "lucide-react";

interface DashboardHeaderProps {
  user: User;
  profile: UserProfile | null;
  currentRole: DashboardRole;
}

export function DashboardHeader({
  user,
  profile,
  currentRole,
}: DashboardHeaderProps) {
  const router = useRouter();

  async function handleSignOut() {
    await signOut(auth);
    router.replace("/signin");
  }

  const roleMeta = ROLE_CONFIGS[currentRole];

  return (
    <header className="sticky top-0 z-30 border-b border-[#1C1613]/10 bg-[#FAF7F2]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        {/* Left: Brand & Permanent Assigned Role Tag */}
        <div className="flex items-center gap-4">
          <Link href="/" className="aldrich-regular text-2xl font-bold">
            CheckTalent<span className="text-[#D9481E]">.</span>
          </Link>

          <span className="hidden h-5 w-px bg-[#1C1613]/15 sm:inline-block" />

          {/* Locked Dashboard Badge */}
          <div className="flex items-center gap-2">
            {currentRole === "student" && (
              <div className="flex items-center gap-2 rounded-xl border border-[#D9481E]/30 bg-[#D9481E]/10 px-3 py-1.5 text-xs font-bold text-[#D9481E]">
                <GraduationCap className="h-4 w-4" />
                <span>User / Student / Employee</span>
                <span className="flex items-center gap-1 rounded-md bg-white/90 px-1.5 py-0.5 text-[10px] font-semibold text-[#756A62]">
                  <Lock className="h-2.5 w-2.5" /> Locked ID
                </span>
              </div>
            )}

            {currentRole === "offcampus" && (
              <div className="flex items-center gap-2 rounded-xl border border-[#E9A23B]/40 bg-[#E9A23B]/15 px-3 py-1.5 text-xs font-bold text-[#B8710B]">
                <Building2 className="h-4 w-4" />
                <span>Off-Campus Companies</span>
                <span className="flex items-center gap-1 rounded-md bg-white/90 px-1.5 py-0.5 text-[10px] font-semibold text-[#756A62]">
                  <Lock className="h-2.5 w-2.5" /> Locked ID
                </span>
              </div>
            )}

            {currentRole === "campus" && (
              <div className="flex items-center gap-2 rounded-xl border border-blue-600/30 bg-blue-600/10 px-3 py-1.5 text-xs font-bold text-blue-700">
                <School className="h-4 w-4" />
                <span>Campus / TPO</span>
                <span className="flex items-center gap-1 rounded-md bg-white/90 px-1.5 py-0.5 text-[10px] font-semibold text-[#756A62]">
                  <Lock className="h-2.5 w-2.5" /> Locked ID
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right: User Information & Sign Out */}
        <div className="flex items-center gap-3">
          {/* User Email Pill */}
          <div className="flex items-center gap-2 rounded-xl border border-[#1C1613]/10 bg-white px-3 py-2 text-xs font-medium text-[#52463F] shadow-2xs">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#D9481E]/10 text-[10px] font-bold text-[#D9481E]">
              {(user.displayName || user.email || "U").charAt(0).toUpperCase()}
            </div>
            <span className="max-w-[160px] truncate font-semibold text-[#1C1613]">
              {user.displayName || user.email}
            </span>
          </div>

          {/* Sign Out */}
          <button
            onClick={handleSignOut}
            className="flex items-center gap-1.5 rounded-xl border border-[#1C1613]/15 bg-white px-3.5 py-2 text-xs font-semibold text-[#1C1613] transition hover:bg-red-50 hover:text-red-700 shadow-2xs"
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
