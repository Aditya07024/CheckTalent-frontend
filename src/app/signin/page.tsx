"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, googleProvider, githubProvider } from "@/lib/firebase";
import { ArrowRight, Eye, EyeOff, Github, Loader2 } from "lucide-react";

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function handleSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      router.replace("/dashboard");
    } catch (err) {
      const code = (err as { code?: string }).code;

      if (
        code === "auth/invalid-credential" ||
        code === "auth/user-not-found" ||
        code === "auth/wrong-password"
      ) {
        setError("Incorrect email or password.");
      } else if (code === "auth/too-many-requests") {
        setError("Too many attempts. Please try again later.");
      } else {
        setError("Unable to sign in. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    setError("");
    setMessage("");
    setLoading(true);

    try {
      await signInWithPopup(auth, googleProvider);
      router.replace("/dashboard");
    } catch {
      setError("Google sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  async function handleGitHubSignIn() {
  setError("");
  setMessage("");
  setLoading(true);

  try {
    await signInWithPopup(auth, githubProvider);
    router.replace("/dashboard");
  } catch (err) {
    const code = (err as { code?: string }).code;

    if (code === "auth/account-exists-with-different-credential") {
      setError(
        "An account already exists with this email using another sign-in method. Sign in with that method first."
      );
    } else if (code === "auth/popup-closed-by-user") {
      setError("GitHub sign-in was cancelled.");
    } else {
      setError("GitHub sign-in failed. Please try again.");
    }
  } finally {
    setLoading(false);
  }
}

  async function handleForgotPassword() {
    setError("");
    setMessage("");

    if (!email.trim()) {
      setError("Enter your email address first.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email.trim());
      setMessage("If an account exists, a password reset email will be sent.");
    } catch {
      setError("Unable to send the password reset email.");
    }
  }

  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#1C1613]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Link href="/" className="aldrich-regular text-2xl font-bold">
          CheckTalent<span className="text-[#D9481E]">.</span>
        </Link>

        <Link
          href="/signup"
          className="text-sm font-medium text-[#62564F] transition hover:text-[#D9481E]"
        >
          Create account <ArrowRight className="ml-1 inline h-4 w-4" />
        </Link>
      </nav>

      <section className="relative flex min-h-[calc(100vh-88px)] items-center justify-center overflow-hidden px-5 py-12">
        <div className="pos-grid-standard pointer-events-none absolute inset-0 opacity-60" />

        <div className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl border border-[#1C1613]/10 bg-white shadow-[0_24px_80px_rgba(28,22,19,0.08)] md:grid-cols-2">
          <div className="relative hidden flex-col justify-between overflow-hidden bg-[#E9A23B] p-10 md:flex">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-black/10" />
            <div className="absolute -right-10 -top-10 h-52 w-52 rounded-full border border-black/10" />

            <div className="relative">
              <span className="rounded-full border border-black/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]">
                Proof over promises
              </span>
            </div>

            <div className="relative">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em]">
                Welcome back
              </p>

              <h1 className="aldrich-regular text-5xl font-bold leading-tight">
                Your skills speak louder.
              </h1>

              <p className="mt-5 max-w-sm text-base leading-7 text-black/70">
                Your work, your knowledge, your evidence. Continue building a
                career based on what you can actually do.
              </p>

              <div className="mt-8 border-t border-black/15 pt-5">
                <p className="text-sm font-medium">
                  Real skills. Verifiable evidence.
                </p>
              </div>
            </div>

            <p className="relative text-xs text-black/60">
              CheckTalent © {new Date().getFullYear()}
            </p>
          </div>

          <div className="p-7 sm:p-10 lg:p-12">
            <div className="mb-8">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#D9481E]">
                Sign in
              </p>

              <h2 className="aldrich-regular mt-3 text-3xl font-bold">
                Good to see you again.
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#756A62]">
                Sign in to access your CheckTalent workspace.
              </p>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#1C1613]/15 bg-white px-4 py-3 text-sm font-semibold transition hover:bg-[#FAF7F2] disabled:opacity-50"
            >
              <GoogleIcon />
              Continue with Google
            </button>
            <button
  type="button"
  onClick={handleGitHubSignIn}
  disabled={loading}
  className="mt-3 flex w-full items-center justify-center gap-3 rounded-xl border border-[#1C1613]/15 bg-white px-4 py-3 text-sm font-semibold transition hover:bg-[#FAF7F2] disabled:cursor-not-allowed disabled:opacity-50"
>
  <Github className="h-5 w-5" />
  Continue with GitHub
</button>

            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#1C1613]/10" />
              <span className="text-xs uppercase tracking-wider text-[#9B9087]">
                Or use email
              </span>
              <div className="h-px flex-1 bg-[#1C1613]/10" />
            </div>

            <form onSubmit={handleSignIn} className="space-y-5">
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
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-xs font-semibold text-[#D9481E] hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
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

              {error && (
                <p
                  role="alert"
                  className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
                >
                  {error}
                </p>
              )}

              {message && (
                <p
                  role="status"
                  className="rounded-lg bg-green-50 p-3 text-sm text-green-700"
                >
                  {message}
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
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in to CheckTalent
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <p className="mt-7 text-center text-sm text-[#756A62]">
              New to CheckTalent?{" "}
              <Link
                href="/signup"
                className="font-semibold text-[#D9481E] hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>
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
