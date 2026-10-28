import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Mail,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | CheckTalent",
  description:
    "Contact the CheckTalent team for support, privacy questions, partnership inquiries, and general assistance.",
  alternates: {
    canonical: "https://www.checktalent.tech/contact",
  },
};

const SUPPORT_EMAIL = "adityakumar07024@gmail.com";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#1C1613]">
      {/* Header */}
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-xl font-bold">
            CheckTalent<span className="text-[#D9481E]">.</span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 transition hover:text-[#D9481E]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>
      </header>

      {/* Accent line */}
      <div
        aria-hidden="true"
        className="h-1 w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600"
      />

      {/* Main content */}
      <section className="relative overflow-hidden px-5 py-16 sm:py-24">
        <div
          aria-hidden="true"
          className="pos-grid-standard pointer-events-none absolute inset-0 opacity-40"
        />

        <div className="relative mx-auto max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#D9481E]">
              <MessageSquare className="h-4 w-4" />
              Get in touch
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
              Let's start a
              <span className="text-[#D9481E]"> conversation.</span>
            </h1>

            <p className="mt-6 text-base leading-8 text-stone-600 sm:text-lg">
              Have a question about CheckTalent, need help with your account,
              or want to explore a partnership? We'd love to hear from you.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2">
            {/* Email contact card */}
            <div className="rounded-3xl border border-stone-200 bg-white p-7 shadow-[0_16px_50px_rgba(28,22,19,0.05)] sm:p-9">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-[#D9481E]">
                <Mail className="h-6 w-6" />
              </div>

              <h2 className="mt-6 text-2xl font-bold">Email support</h2>

              <p className="mt-3 leading-7 text-stone-600">
                Contact us for general questions, technical assistance,
                account issues, or partnership inquiries.
              </p>

              <a
                href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
                  "CheckTalent Support Inquiry"
                )}`}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#D9481E] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#B93615] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9481E] focus-visible:ring-offset-2"
              >
                Send us an email
                <ArrowUpRight className="h-4 w-4" />
              </a>

              <p className="mt-4 break-all text-center text-sm text-stone-500">
                {SUPPORT_EMAIL}
              </p>
            </div>

            {/* Privacy contact card */}
            <div className="rounded-3xl border border-stone-200 bg-white p-7 shadow-[0_16px_50px_rgba(28,22,19,0.05)] sm:p-9">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-[#D9481E]">
                <ShieldCheck className="h-6 w-6" />
              </div>

              <h2 className="mt-6 text-2xl font-bold">Privacy & legal</h2>

              <p className="mt-3 leading-7 text-stone-600">
                Have questions about personal information, account privacy,
                or our terms? Review our policies or contact us directly.
              </p>

              <div className="mt-6 flex flex-col gap-3">
                <Link
                  href="/privacy"
                  className="flex items-center justify-between rounded-xl border border-stone-200 px-4 py-3 text-sm font-semibold transition hover:border-orange-300 hover:bg-orange-50"
                >
                  Privacy Policy
                  <ArrowUpRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/terms"
                  className="flex items-center justify-between rounded-xl border border-stone-200 px-4 py-3 text-sm font-semibold transition hover:border-orange-300 hover:bg-orange-50"
                >
                  Terms of Service
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Additional information */}
          <div className="mx-auto mt-10 max-w-4xl rounded-2xl border border-orange-200/70 bg-orange-50/60 p-6 sm:p-8">
            <h2 className="text-lg font-bold">How can we help?</h2>

            <div className="mt-5 grid gap-5 sm:grid-cols-3">
              <div>
                <h3 className="text-sm font-semibold">Account support</h3>
                <p className="mt-2 text-sm leading-6 text-stone-600">
                  Help with sign-in, account access, and authentication.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold">Product inquiries</h3>
                <p className="mt-2 text-sm leading-6 text-stone-600">
                  Questions about skill verification and Proof Cards.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold">Privacy requests</h3>
                <p className="mt-2 text-sm leading-6 text-stone-600">
                  Questions about your information or data deletion.
                </p>
              </div>
            </div>
          </div>

          <p className="mt-10 text-center text-sm leading-6 text-stone-500">
            When contacting us about your account, please describe the issue.
            Never send your password, authentication codes, or private API keys.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="text-lg font-bold">
            CheckTalent<span className="text-[#D9481E]">.</span>
          </Link>

          <nav
            aria-label="Legal navigation"
            className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-stone-600"
          >
            <Link href="/privacy" className="hover:text-[#D9481E]">
              Privacy Policy
            </Link>

            <Link href="/terms" className="hover:text-[#D9481E]">
              Terms of Service
            </Link>

            <Link href="/contact" className="hover:text-[#D9481E]">
              Contact
            </Link>
          </nav>

          <p className="text-xs text-stone-500">
            © {new Date().getFullYear()} CheckTalent
          </p>
        </div>
      </footer>
    </main>
  );
}