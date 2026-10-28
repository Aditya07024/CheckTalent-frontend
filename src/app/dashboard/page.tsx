"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { ArrowRight, LogOut, ShieldCheck } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setChecking(false);

      if (!currentUser) {
        router.replace("/signin");
      }
    });

    return unsubscribe;
  }, [router]);

  async function handleSignOut() {
    await signOut(auth);
    router.replace("/signin");
  }

  if (checking || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAF7F2] text-[#1C1613]">
        Checking your session...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF7F2] px-6 py-8 text-[#1C1613]">
      <header className="mx-auto flex max-w-7xl items-center justify-between">
        <a href="/" className="aldrich-regular text-2xl font-bold">
          CheckTalent<span className="text-[#D9481E]">.</span>
        </a>

        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 rounded-xl border border-[#1C1613]/15 px-4 py-2.5 text-sm font-semibold transition hover:bg-white"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </header>

      <section className="mx-auto mt-16 max-w-7xl">
        <div className="rounded-3xl border border-[#1C1613]/10 bg-white p-8 shadow-sm sm:p-12">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E9A23B]/20 text-[#D9481E]">
            <ShieldCheck className="h-6 w-6" />
          </div>

          <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-[#D9481E]">
            Your workspace
          </p>

          <h1 className="aldrich-regular mt-3 text-3xl font-bold sm:text-5xl">
            Welcome, {user.displayName || user.email}.
          </h1>

          <p className="mt-5 max-w-2xl leading-7 text-[#756A62]">
            Your CheckTalent account is authenticated. Next, we'll connect your
            profile, repositories, skill evidence, and technical assessments.
          </p>

          <button
            onClick={() => router.push("/")}
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#D9481E] px-5 py-3 font-semibold text-white transition hover:bg-[#B93615]"
          >
            Explore CheckTalent
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>
    </main>
  );
}
