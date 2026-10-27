import React from "react";
import {
  BookOpen,
  Briefcase,
  GraduationCap,
  Rocket,
  Terminal,
  Users,
} from "lucide-react";
import { USE_CASES_CONTENT } from "@/data/site-content";
import { SECTION_IDS } from "@/lib/constants";
import type { IconKey } from "@/types/platform";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { TiltCard3D } from "@/components/visuals/TiltCard3D";

const USE_CASE_BADGES = [
  "bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-[0_6px_16px_rgba(234,88,12,0.28)]",
  "bg-gradient-to-br from-yellow-400 to-amber-600 text-white shadow-[0_6px_16px_rgba(245,158,11,0.28)]",
  "bg-gradient-to-br from-red-500 to-red-700 text-white shadow-[0_6px_16px_rgba(220,38,38,0.28)]",
  "bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-[0_6px_16px_rgba(249,115,22,0.28)]",
  "bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 text-white shadow-[0_6px_16px_rgba(234,88,12,0.28)]",
  "bg-gradient-to-br from-red-600 to-orange-500 text-white shadow-[0_6px_16px_rgba(220,38,38,0.28)]",
] as const;

function UseCaseIcon({ icon }: { icon: IconKey }) {
  switch (icon) {
    case "rocket":
      return <Rocket className="h-5 w-5" />;
    case "users":
      return <Users className="h-5 w-5" />;
    case "briefcase":
      return <Briefcase className="h-5 w-5" />;
    case "graduation-cap":
      return <GraduationCap className="h-5 w-5" />;
    case "terminal":
      return <Terminal className="h-5 w-5" />;
    case "book-open":
    default:
      return <BookOpen className="h-5 w-5" />;
  }
}

export function UseCasesSection() {
  return (
    <AnimatedSection
      id={SECTION_IDS.useCases}
      className="border-b border-orange-200/70 bg-gradient-to-b from-yellow-50/45 via-transparent to-red-50/30 py-20 lg:py-28"
    >
      <div className="container">
        <div data-animate-header className="max-w-3xl space-y-4">
          <span className="inline-block rounded-full border border-amber-300 bg-yellow-50 px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-amber-900">
            {USE_CASES_CONTENT.eyebrow}
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-[42px] leading-[1.12]">
            {USE_CASES_CONTENT.heading}
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-ink-secondary">
            {USE_CASES_CONTENT.subheading}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {USE_CASES_CONTENT.items.map((item, idx) => (
            <TiltCard3D
              key={item.id}
              data-animate-item
              className="flex flex-col justify-between rounded-2xl border border-orange-200/85 border-b-4 border-b-orange-400 bg-white/95 p-6 shadow-[0_10px_28px_rgba(234,88,12,0.07)] hover:border-orange-400"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink-muted">
                      {item.code}
                    </span>
                    <p className="font-mono text-xs font-semibold text-orange-700">
                      {item.audience}
                    </p>
                  </div>
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                      USE_CASE_BADGES[idx % USE_CASE_BADGES.length]
                    }`}
                  >
                    <UseCaseIcon icon={item.icon} />
                  </div>
                </div>

                <h3 className="mt-4 text-lg font-bold text-ink leading-snug">
                  {item.title}
                </h3>

                <p className="mt-2.5 text-sm leading-relaxed text-ink-secondary">
                  {item.description}
                </p>
              </div>

              <div className="mt-5 rounded-lg border border-orange-100 bg-gradient-to-r from-yellow-50/70 to-orange-50/70 px-3 py-2 font-mono text-[11px] text-ink-muted">
                KEY MECHANISM:{" "}
                <span className="font-semibold text-orange-900">
                  {item.primaryMechanism}
                </span>
              </div>
            </TiltCard3D>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
