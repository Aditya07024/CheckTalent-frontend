"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Loader2,
  RotateCcw,
  Terminal,
} from "lucide-react";
import { CTA_SECTION_CONTENT } from "@/data/site-content";
import { SECTION_IDS } from "@/lib/constants";
import type { EarlyAccessFormValues, EarlyAccessRole } from "@/types/platform";
import {
  demoEarlyAccessAdapter,
  validateEarlyAccessForm,
  type EarlyAccessSubmissionResult,
  type EarlyAccessValidationErrors,
} from "@/lib/early-access";
import { scrollToSection } from "@/lib/utils";
import { GridBackground } from "@/components/visuals/GridBackground";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const INITIAL_VALUES: EarlyAccessFormValues = {
  name: "",
  email: "",
  role: "",
  message: "",
};

export function CTASection() {
  const [values, setValues] = useState<EarlyAccessFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<EarlyAccessValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] =
    useState<EarlyAccessSubmissionResult | null>(null);

  const nameInputRef = useRef<HTMLInputElement | null>(null);

  // Listen for role preselection from Candidate or Recruiter sections
  useEffect(() => {
    const handleSelectRole = (event: Event) => {
      const customEvent = event as CustomEvent<{ role?: EarlyAccessRole }>;
      const incomingRole = customEvent.detail?.role;
      if (
        incomingRole === "Candidate" ||
        incomingRole === "Recruiter" ||
        incomingRole === "Placement Officer"
      ) {
        setSubmissionResult(null);
        setValues((prev) => ({ ...prev, role: incomingRole }));
        setErrors((prev) => ({ ...prev, role: undefined }));
      }
    };

    window.addEventListener("pos:select-role", handleSelectRole);
    return () => window.removeEventListener("pos:select-role", handleSelectRole);
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateEarlyAccessForm(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const result = await demoEarlyAccessAdapter.submitRequest({
        name: values.name.trim(),
        email: values.email.trim(),
        role: values.role as EarlyAccessRole,
        message: values.message.trim() || undefined,
        submittedAtIso: new Date().toISOString(),
      });
      setSubmissionResult(result);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmissionResult(null);
    setValues(INITIAL_VALUES);
    setErrors({});
  };

  return (
    <section
      id={SECTION_IDS.earlyAccess}
      className="relative overflow-hidden bg-gradient-to-b from-yellow-50/60 via-orange-50/50 to-red-50/50 py-20 lg:py-28"
    >
      <GridBackground density="fine" showRadialGlow />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 gap-12 rounded-3xl border-2 border-orange-300/90 bg-gradient-to-br from-yellow-50 via-white to-orange-50/90 p-6 sm:p-10 lg:grid-cols-12 lg:p-12 shadow-[0_28px_72px_rgba(234,88,12,0.14),0_6px_20px_rgba(239,68,68,0.08)]">
          {/* Left Column: Final Conversion Headline & CTAs */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
            <div className="space-y-5">
              <span className="font-mono text-xs uppercase tracking-widest text-lime">
                {CTA_SECTION_CONTENT.eyebrow}
              </span>

              <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-[44px] leading-[1.08]">
                {CTA_SECTION_CONTENT.headline}
              </h2>

              <p className="max-w-lg text-base sm:text-lg leading-relaxed text-ink-secondary">
                {CTA_SECTION_CONTENT.supportingText}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button
                  type="button"
                  size="lg"
                  onClick={() => {
                    if (submissionResult) {
                      handleReset();
                    }
                    setTimeout(() => nameInputRef.current?.focus(), 50);
                  }}
                >
                  {CTA_SECTION_CONTENT.primaryCtaLabel}
                  <ArrowRight className="h-4 w-4" />
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() =>
                    scrollToSection(CTA_SECTION_CONTENT.secondaryCtaHref)
                  }
                >
                  {CTA_SECTION_CONTENT.secondaryCtaLabel}
                </Button>
              </div>
            </div>

            {/* Role Summary Strip */}
            <div className="space-y-2.5 border-t border-hairline pt-6 font-mono text-xs text-ink-secondary">
              <p className="text-ink">EARLY-ACCESS TRACKS:</p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                <div className="rounded-xl border border-yellow-300 bg-yellow-50 px-3 py-2.5 shadow-sm">
                  <span className="block font-bold text-amber-900">Candidates</span>
                  <span className="text-[11px] text-amber-800/80">
                    Skill Proof Cards & Viva
                  </span>
                </div>
                <div className="rounded-xl border border-orange-300 bg-orange-50 px-3 py-2.5 shadow-sm">
                  <span className="block font-bold text-orange-900">Recruiters</span>
                  <span className="text-[11px] text-orange-800/80">
                    Explainable Rubrics
                  </span>
                </div>
                <div className="rounded-xl border border-red-300 bg-red-50 px-3 py-2.5 shadow-sm">
                  <span className="block font-bold text-red-900">Placement Cells</span>
                  <span className="text-[11px] text-red-800/80">
                    Cohort Readiness
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Validated Early-Access Form / Demo Submission State */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-orange-200 bg-white p-6 sm:p-7 shadow-[0_12px_36px_rgba(234,88,12,0.08)]">
              {submissionResult ? (
                <div role="status" aria-live="polite" className="space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hairline pb-4">
                    <Badge variant="default">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      DEMO SUBMISSION VALIDATED
                    </Badge>
                    <span className="font-mono text-xs text-ink-muted">
                      {submissionResult.referenceCode}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-ink">
                      Early-access request previewed for{" "}
                      <span className="text-lime">
                        {submissionResult.payload.name}
                      </span>
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
                      {submissionResult.notice}
                    </p>
                  </div>

                  {/* Inspectable Validated Payload Summary */}
                  <div className="rounded-lg border border-hairline bg-canvas-secondary p-4 font-mono text-xs space-y-1.5">
                    <div className="flex items-center gap-2 text-ink-muted pb-1 border-b border-hairline">
                      <Terminal className="h-3.5 w-3.5 text-lime" />
                      <span>VALIDATED CLIENT PAYLOAD (NOT PERSISTED TO DB)</span>
                    </div>
                    <p className="pt-1 text-ink-secondary">
                      <span className="text-ink-muted">name:</span>{" "}
                      <span className="text-ink">{submissionResult.payload.name}</span>
                    </p>
                    <p className="text-ink-secondary">
                      <span className="text-ink-muted">email:</span>{" "}
                      <span className="text-ink">{submissionResult.payload.email}</span>
                    </p>
                    <p className="text-ink-secondary">
                      <span className="text-ink-muted">role:</span>{" "}
                      <span className="text-lime">{submissionResult.payload.role}</span>
                    </p>
                    {submissionResult.payload.message && (
                      <p className="text-ink-secondary">
                        <span className="text-ink-muted">message:</span>{" "}
                        <span className="text-ink">
                          {submissionResult.payload.message}
                        </span>
                      </p>
                    )}
                  </div>

                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleReset}
                    className="w-full"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Submit Another Demo Entry
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="border-b border-hairline pb-4">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-lg font-semibold text-ink">
                        {CTA_SECTION_CONTENT.formHeading}
                      </h3>
                      <Badge variant="neutral">DEMO ADAPTER</Badge>
                    </div>
                    <p className="mt-1 text-xs text-ink-secondary">
                      {CTA_SECTION_CONTENT.formSubheading}
                    </p>
                  </div>

                  {/* Name Field */}
                  <div className="space-y-1.5">
                    <Label htmlFor="ea-name">Name *</Label>
                    <Input
                      id="ea-name"
                      ref={nameInputRef}
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Alex Morgan"
                      value={values.name}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "ea-name-error" : undefined}
                      onChange={(e) => {
                        const val = e.target.value;
                        setValues((prev) => ({ ...prev, name: val }));
                        if (errors.name) {
                          setErrors((prev) => ({ ...prev, name: undefined }));
                        }
                      }}
                    />
                    {errors.name && (
                      <p
                        id="ea-name-error"
                        role="alert"
                        className="flex items-center gap-1.5 font-mono text-xs text-red-600"
                      >
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="space-y-1.5">
                    <Label htmlFor="ea-email">Email *</Label>
                    <Input
                      id="ea-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="alex@company-or-university.edu"
                      value={values.email}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "ea-email-error" : undefined}
                      onChange={(e) => {
                        const val = e.target.value;
                        setValues((prev) => ({ ...prev, email: val }));
                        if (errors.email) {
                          setErrors((prev) => ({ ...prev, email: undefined }));
                        }
                      }}
                    />
                    {errors.email && (
                      <p
                        id="ea-email-error"
                        role="alert"
                        className="flex items-center gap-1.5 font-mono text-xs text-red-600"
                      >
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Role Select */}
                  <div className="space-y-1.5">
                    <Label htmlFor="ea-role">Role *</Label>
                    <Select
                      value={values.role || undefined}
                      onValueChange={(val: EarlyAccessRole) => {
                        setValues((prev) => ({ ...prev, role: val }));
                        if (errors.role) {
                          setErrors((prev) => ({ ...prev, role: undefined }));
                        }
                      }}
                    >
                      <SelectTrigger
                        id="ea-role"
                        aria-invalid={Boolean(errors.role)}
                        aria-describedby={errors.role ? "ea-role-error" : undefined}
                      >
                        <SelectValue placeholder="Select your primary role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Candidate">Candidate</SelectItem>
                        <SelectItem value="Recruiter">Recruiter</SelectItem>
                        <SelectItem value="Placement Officer">
                          Placement Officer
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.role && (
                      <p
                        id="ea-role-error"
                        role="alert"
                        className="flex items-center gap-1.5 font-mono text-xs text-red-600"
                      >
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        {errors.role}
                      </p>
                    )}
                  </div>

                  {/* Optional Message */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="ea-message">Optional Message</Label>
                      <span className="font-mono text-[10px] text-ink-muted">
                        {values.message.length}/500
                      </span>
                    </div>
                    <Textarea
                      id="ea-message"
                      name="message"
                      rows={3}
                      placeholder="Share your stack, hiring goals, or placement cohort context (optional)"
                      value={values.message}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={
                        errors.message ? "ea-message-error" : undefined
                      }
                      onChange={(e) => {
                        const val = e.target.value;
                        setValues((prev) => ({ ...prev, message: val }));
                        if (errors.message) {
                          setErrors((prev) => ({ ...prev, message: undefined }));
                        }
                      }}
                    />
                    {errors.message && (
                      <p
                        id="ea-message-error"
                        role="alert"
                        className="flex items-center gap-1.5 font-mono text-xs text-red-600"
                      >
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Validating Request...
                      </>
                    ) : (
                      <>
                        Get Early Access
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>

                  <p className="font-mono text-[11px] leading-relaxed text-ink-muted">
                    {CTA_SECTION_CONTENT.demoTransparencyNote}
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
