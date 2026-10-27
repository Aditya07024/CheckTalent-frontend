"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  CheckCircle2,
  Clock,
  Cpu,
  MessageSquareCode,
  Upload,
} from "lucide-react";
import { HOW_IT_WORKS_CONTENT } from "@/data/site-content";
import { SECTION_IDS } from "@/lib/constants";
import type { IconKey } from "@/types/platform";
import { useAnimationContext } from "@/components/animations/AnimationProvider";

function WorkflowIcon({ icon }: { icon: IconKey }) {
  switch (icon) {
    case "upload":
      return <Upload className="h-5 w-5 text-lime" />;
    case "cpu":
      return <Cpu className="h-5 w-5 text-lime" />;
    case "message-square-code":
      return <MessageSquareCode className="h-5 w-5 text-violet" />;
    case "check-circle":
    default:
      return <CheckCircle2 className="h-5 w-5 text-lime" />;
  }
}

export function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const { prefersReducedMotion } = useAnimationContext();

  useGSAP(
    () => {
      if (prefersReducedMotion || !sectionRef.current) return;

      gsap.registerPlugin(ScrollTrigger);

      const stepCards = sectionRef.current.querySelectorAll("[data-workflow-step]");
      gsap.from(stepCards, {
        y: 22,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        clearProps: "transform,opacity",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      if (progressBarRef.current) {
        gsap.fromTo(
          progressBarRef.current,
          { scaleX: 0.15 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 72%",
              end: "bottom 65%",
              scrub: 0.35,
            },
          }
        );
      }
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <section
      id={SECTION_IDS.howItWorks}
      ref={sectionRef}
      className="border-b border-hairline bg-canvas-secondary/45 py-20 lg:py-28"
    >
      <div className="container">
        {/* Heading */}
        <div className="max-w-3xl space-y-4">
          <span className="font-mono text-xs uppercase tracking-widest text-lime">
            {HOW_IT_WORKS_CONTENT.eyebrow}
          </span>
          <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-[42px] leading-[1.12]">
            {HOW_IT_WORKS_CONTENT.heading}
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-ink-secondary">
            {HOW_IT_WORKS_CONTENT.subheading}
          </p>
        </div>

        {/* Scroll-Linked Progress Indicator Rail */}
        <div className="mt-10 hidden lg:block">
          <div className="flex items-center justify-between font-mono text-[11px] text-ink-muted mb-2">
            <span>VERIFICATION SEQUENCE</span>
            <span>01 → 02 → 03 → 04</span>
          </div>
          <div className="h-1 w-full overflow-hidden rounded-full bg-canvas-elevated">
            <div
              ref={progressBarRef}
              className="h-full w-full origin-left rounded-full bg-gradient-to-r from-lime via-lime to-violet"
            />
          </div>
        </div>

        {/* Four-Step Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {HOW_IT_WORKS_CONTENT.steps.map((step) => (
            <article
              key={step.stepNumber}
              data-workflow-step
              className="flex flex-col justify-between rounded-xl border border-hairline bg-canvas p-6 transition-colors hover:border-hairline-strong"
            >
              <div>
                <div className="flex items-center justify-between border-b border-hairline pb-4">
                  <span className="font-mono text-xs font-semibold text-lime">
                    {step.stepNumber}
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-md border border-hairline bg-canvas-elevated">
                    <WorkflowIcon icon={step.icon} />
                  </div>
                </div>

                <span className="mt-4 inline-block font-mono text-[10px] uppercase tracking-wider text-ink-muted">
                  {step.artifactTag}
                </span>

                <h3 className="mt-1.5 text-lg font-semibold text-ink">
                  {step.title}
                </h3>

                <p className="mt-2.5 text-sm leading-relaxed text-ink-secondary">
                  {step.description}
                </p>

                <ul className="mt-4 space-y-2 border-t border-hairline pt-4">
                  {step.details.map((detail) => (
                    <li
                      key={detail}
                      className="flex items-start gap-2 text-xs leading-relaxed text-ink-secondary"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-lime" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 rounded border border-hairline bg-canvas-secondary px-3 py-2 font-mono text-[11px] text-ink-muted">
                {step.systemNote}
              </div>
            </article>
          ))}
        </div>

        {/* Explicit Operational Timing & Evidence Scope Notice */}
        <div className="mt-8 flex items-start gap-3 rounded-xl border border-hairline bg-canvas p-4 sm:items-center sm:px-5">
          <Clock className="mt-0.5 h-4 w-4 shrink-0 text-lime sm:mt-0" />
          <p className="text-xs sm:text-sm leading-relaxed text-ink-secondary">
            {HOW_IT_WORKS_CONTENT.methodologyFootnote}
          </p>
        </div>
      </div>
    </section>
  );
}
