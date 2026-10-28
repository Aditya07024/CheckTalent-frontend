"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSignUp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const normalizedName = name.trim();

    if (normalizedName.length < 2) {
      setError("Please enter your full name.");
      return;
    }

    if (password.length < 8) {
      setError("Your password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Your passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      await updateProfile(credential.user, {
        displayName: normalizedName,
      });

      router.replace("/dashboard");
    } catch (err) {
      const code = (err as { code?: string }).code;

      if (code === "auth/email-already-in-use") {
        setError("An account already exists with this email.");
      } else if (code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (code === "auth/weak-password") {
        setError("Please choose a stronger password.");
      } else {
        setError("Unable to create your account. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignUp() {
    setError("");
    setLoading(true);

    try {
      await signInWithPopup(auth, googleProvider);
      router.replace("/dashboard");
    } catch {
      setError("Google registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#FAF7F2] px-5 py-8 text-[#1C1613]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="aldrich-regular text-2xl font-bold">
          CheckTalent<span className="text-[#D9481E]">.</span>
        </Link>

        <Link
          href="/signin"
          className="text-sm font-medium text-[#62564F] hover:text-[#D9481E]"
        >
          Already have an account?
        </Link>
      </nav>

      <section className="relative mx-auto mt-10 grid max-w-5xl overflow-hidden rounded-3xl border border-[#1C1613]/10 bg-white shadow-[0_24px_80px_rgba(28,22,19,0.08)] md:mt-14 md:grid-cols-2">
        <div className="relative hidden flex-col justify-between overflow-hidden bg-[#D9481E] p-10 text-white md:flex">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border border-white/20" />
          <div className="absolute -right-8 -top-8 h-44 w-44 rounded-full border border-white/20" />

          <div className="relative">
            <span className="rounded-full border border-white/30 px-3 py-1 text-xs uppercase tracking-[0.2em]">
              Build your proof
            </span>
          </div>

          <div className="relative">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-white/75">
              Your next chapter
            </p>

            <h1 className="aldrich-regular text-5xl font-bold leading-tight">
              Show what you can actually build.
            </h1>

            <p className="mt-5 max-w-sm leading-7 text-white/80">
              Turn your projects, technical knowledge, and experience into
              meaningful evidence of your skills.
            </p>

            <div className="mt-8 border-t border-white/20 pt-5">
              <p className="text-sm font-medium">
                Real skills. Verifiable evidence.
              </p>
            </div>
          </div>

          <p className="relative text-xs text-white/60">
            CheckTalent © {new Date().getFullYear()}
          </p>
        </div>

        <div className="p-7 sm:p-10 lg:p-12">
          <div className="mb-7">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#D9481E]">
              Get started
            </p>

            <h2 className="aldrich-regular mt-3 text-3xl font-bold">
              Create your account.
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#756A62]">
              Start building a profile that proves your abilities.
            </p>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignUp}
            disabled={loading}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#1C1613]/15 px-4 py-3 text-sm font-semibold transition hover:bg-[#FAF7F2] disabled:opacity-50"
          >
            <GoogleIcon />
            Continue with Google
          </button>

          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-[#1C1613]/10" />
            <span className="text-xs uppercase tracking-wider text-[#9B9087]">
              Or use email
            </span>
            <div className="h-px flex-1 bg-[#1C1613]/10" />
          </div>

          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold"
              >
                Full name
              </label>

              <input
                id="name"
                type="text"
                autoComplete="name"
                required
                minLength={2}
                maxLength={80}
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your full name"
                className="w-full rounded-xl border border-[#1C1613]/15 bg-[#FAF7F2]/50 px-4 py-3 text-sm outline-none transition placeholder:text-[#A69A91] focus:border-[#D9481E] focus:ring-2 focus:ring-[#D9481E]/10"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold"
              >
                Email address
              </label>

              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-[#1C1613]/15 bg-[#FAF7F2]/50 px-4 py-3 text-sm outline-none transition placeholder:text-[#A69A91] focus:border-[#D9481E] focus:ring-2 focus:ring-[#D9481E]/10"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="At least 8 characters"
                  className="w-full rounded-xl border border-[#1C1613]/15 bg-[#FAF7F2]/50 px-4 py-3 pr-12 text-sm outline-none transition placeholder:text-[#A69A91] focus:border-[#D9481E] focus:ring-2 focus:ring-[#D9481E]/10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#756A62]"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-semibold"
              >
                Confirm password
              </label>

              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                minLength={8}
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Re-enter your password"
                className="w-full rounded-xl border border-[#1C1613]/15 bg-[#FAF7F2]/50 px-4 py-3 text-sm outline-none transition placeholder:text-[#A69A91] focus:border-[#D9481E] focus:ring-2 focus:ring-[#D9481E]/10"
              />
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#D9481E] px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-[#B93615] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  Create your account
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>

            <p className="text-xs leading-5 text-[#8C8077]">
              By creating an account, you agree to provide accurate information
              about your skills and projects.
            </p>
          </form>

          <p className="mt-6 text-center text-sm text-[#756A62]">
            Already registered?{" "}
            <Link
              href="/signin"
              className="font-semibold text-[#D9481E] hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className="h-5 w-5">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.76 7.18l7.73 6C44.42 37.95 46.98 31.77 46.98 24.55Z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59a14.4 14.4 0 0 1 0-9.18l-7.98-6.19a24 24 0 0 0 0 21.56l7.98-6.19Z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.15 1.45-4.92 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
      />
    </svg>
  );
}
