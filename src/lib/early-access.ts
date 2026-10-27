import type { EarlyAccessFormValues, EarlyAccessRole } from "@/types/platform";

export interface EarlyAccessValidationErrors {
  name?: string;
  email?: string;
  role?: string;
  message?: string;
}

export interface EarlyAccessSubmissionPayload {
  name: string;
  email: string;
  role: EarlyAccessRole;
  message?: string;
  submittedAtIso: string;
}

export interface EarlyAccessSubmissionResult {
  ok: boolean;
  mode: "demo-preview";
  referenceCode: string;
  payload: EarlyAccessSubmissionPayload;
  notice: string;
}

export interface EarlyAccessServiceAdapter {
  submitRequest: (
    payload: EarlyAccessSubmissionPayload
  ) => Promise<EarlyAccessSubmissionResult>;
}

const VALID_ROLES: ReadonlyArray<EarlyAccessRole> = [
  "Candidate",
  "Recruiter",
  "Placement Officer",
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateEarlyAccessForm(
  values: EarlyAccessFormValues
): EarlyAccessValidationErrors {
  const errors: EarlyAccessValidationErrors = {};

  const trimmedName = values.name.trim();
  if (!trimmedName) {
    errors.name = "Please enter your full name.";
  } else if (trimmedName.length < 2) {
    errors.name = "Name must be at least 2 characters.";
  } else if (trimmedName.length > 80) {
    errors.name = "Name must be 80 characters or fewer.";
  }

  const trimmedEmail = values.email.trim();
  if (!trimmedEmail) {
    errors.email = "Please enter a valid work, academic, or personal email.";
  } else if (!EMAIL_PATTERN.test(trimmedEmail)) {
    errors.email = "Enter a valid email address (for example, alex@domain.com).";
  }

  if (!values.role || !VALID_ROLES.includes(values.role)) {
    errors.role = "Select how you plan to use TalentLens.";
  }

  if (values.message.trim().length > 500) {
    errors.message = "Optional message must be 500 characters or fewer.";
  }

  return errors;
}

/**
 * Clean client-side adapter interface. When a backend API route is connected
 * in a future milestone, swap `demoEarlyAccessAdapter` for an HTTP transport
 * without modifying form presentation or validation logic.
 */
export const demoEarlyAccessAdapter: EarlyAccessServiceAdapter = {
  async submitRequest(payload: EarlyAccessSubmissionPayload) {
    await new Promise((resolve) => setTimeout(resolve, 450));

    const hashSeed = Array.from(payload.email).reduce(
      (acc, ch) => (acc * 31 + ch.charCodeAt(0)) % 9000 + 1000,
      1024
    );

    return {
      ok: true,
      mode: "demo-preview",
      referenceCode: `POS-DEMO-${hashSeed}`,
      payload,
      notice:
        "Demo Preview Mode: Form validation succeeded on the client. No backend database or mailing endpoint is connected in this frontend preview, so your details were not persisted externally.",
    };
  },
};
