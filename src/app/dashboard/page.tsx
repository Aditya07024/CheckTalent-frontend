"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { getUserProfile } from "@/lib/user-role";
import { DashboardRole, UserProfile } from "@/types/dashboard";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StudentDashboard } from "@/components/dashboard/StudentDashboard";
import { OffcampusDashboard } from "@/components/dashboard/OffcampusDashboard";
import { CampusDashboard } from "@/components/dashboard/CampusDashboard";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [currentRole, setCurrentRole] = useState<DashboardRole | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.replace("/signin");
        return;
      }

      setUser(currentUser);

      try {
        const userProfile = await getUserProfile(currentUser.uid);
        if (!userProfile?.role) {
          // No role selected yet -> send to onboarding role selection
          router.replace("/onboarding");
          return;
        }

        setProfile(userProfile);
        setCurrentRole(userProfile.role);
      } catch (err) {
        console.error("Error loading user profile:", err);
        // Fallback: if cannot get profile, send to onboarding
        router.replace("/onboarding");
        return;
      } finally {
        setChecking(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  function handleRoleChange(newRole: DashboardRole) {
    setCurrentRole(newRole);
    if (profile) {
      setProfile({ ...profile, role: newRole });
    }
  }

  if (checking || !user || !currentRole) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAF7F2] text-[#1C1613]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-[#D9481E]" />
          <p className="text-sm font-medium text-[#756A62]">
            Loading your personalized dashboard...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF7F2] pb-16 text-[#1C1613]">
      <DashboardHeader
        user={user}
        profile={profile}
        currentRole={currentRole}
        onRoleChange={handleRoleChange}
      />

      <div className="mx-auto mt-6 max-w-7xl px-5 sm:px-8">
        {currentRole === "student" && (
          <StudentDashboard user={user} profile={profile} />
        )}

        {currentRole === "offcampus" && (
          <OffcampusDashboard user={user} profile={profile} />
        )}

        {currentRole === "campus" && (
          <CampusDashboard user={user} profile={profile} />
        )}
      </div>
    </main>
  );
}
