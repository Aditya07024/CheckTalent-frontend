import type { SampleProofCardData } from "@/types/proof-card";

export const SAMPLE_PROOF_CARD: SampleProofCardData = {
  simulationBanner: "SAMPLE DEMONSTRATION · FICTIONAL CANDIDATE PROFILE",
  methodologyDisclaimer:
    "Illustrative product demonstration using fictional candidate data. Confidence indicators reflect qualitative consistency across mock artifacts and have not been statistically calibrated against live candidate cohorts.",
  profileId: "PRF-DEMO-8492",
  candidateName: "Alex Morgan",
  targetRole: "Full Stack Developer",
  evaluatedRepository: "alex-morgan/order-dispatch-workspace",
  lastEvaluatedDate: "2026-10-18",
  evidenceSourcesCount: {
    repositories: 1,
    indexedFiles: 48,
    vivaResponses: 6,
  },
  skills: [
    {
      id: "skill-react",
      name: "React",
      status: "Strong evidence",
      confidenceLabel: "High evidence consistency",
      confidenceRationale:
        "Consistent alignment between modular component tree, custom state-synchronization hooks, and accurate trade-off explanation during code defense.",
      evidenceSummary: "Components, hooks, and state management.",
      verificationMethod: "Candidate explains a selected implementation.",
      rubricId: "RUB-FE-REACT-04",
      evaluatedDate: "2026-10-18",
      supportingFiles: [
        {
          path: "src/features/orders/OrderBoard.tsx",
          lineRange: "L24–L118",
          role: "Feature container & optimistic UI boundary",
          observation:
            "Separates presentational row rendering from filter state and handles concurrent status transitions cleanly.",
          classification: "Verified Observation",
        },
        {
          path: "src/hooks/useOrderStream.ts",
          lineRange: "L12–L89",
          role: "Custom subscription & cleanup hook",
          observation:
            "Uses AbortController teardown, reconnect backoff, and stable ref callbacks to avoid stale closures.",
          classification: "Verified Observation",
        },
        {
          path: "src/components/ui/DataDrawer.tsx",
          lineRange: "L10–L74",
          role: "Accessible compound UI component",
          observation:
            "Implements keyboard Escape handling, aria-labelledby linkage, and controlled/uncontrolled state support.",
          classification: "Verified Observation",
        },
      ],
      codeReference: {
        file: "src/hooks/useOrderStream.ts",
        lineRange: "L38–L56",
        caption:
          "Inspected hook cleanup and stale-closure prevention referenced during interactive viva:",
        snippet: `useEffect(() => {
  const controller = new AbortController();
  const stream = connectOrderEvents(workspaceId, {
    signal: controller.signal,
    onEvent: (evt) => latestHandlerRef.current(evt),
  });
  return () => {
    controller.abort();
    stream.dispose();
  };
}, [workspaceId]);`,
      },
      vivaReference: {
        id: "VIVA-Q-02",
        referencedCode: "src/hooks/useOrderStream.ts:L38–L56",
        question:
          "Why did you store `onEvent` inside `latestHandlerRef` instead of listing it in the `useEffect` dependency array?",
        candidateResponseSummary:
          "Explained that inline parent callbacks would retrigger stream teardown and reconnect on every render; storing the latest callback in a ref keeps the WebSocket/SSE subscription stable across renders unless `workspaceId` changes.",
        rubricOutcome:
          "Meets rubric criteria for React effect lifecycle mechanics, referential stability, and subscription cleanup.",
        evaluatedAt: "2026-10-18 · Session #1",
      },
      distinctions: [
        {
          classification: "Verified Observation",
          statement:
            "Repository contains 14 typed React components, 3 custom hooks, and explicit `AbortController` effect cleanup in `useOrderStream.ts`.",
          basis: "Direct AST & file inspection + recorded viva walkthrough.",
        },
        {
          classification: "Inferred Assessment",
          statement:
            "Candidate demonstrates strong practical command of React state lifecycles and asynchronous UI synchronization for Full Stack product work.",
          basis: "Synthesized against rubric RUB-FE-REACT-04 from code + viva consistency.",
        },
      ],
    },
    {
      id: "skill-api-design",
      name: "API Design",
      status: "Moderate evidence",
      confidenceLabel: "Moderate evidence consistency",
      confidenceRationale:
        "Clear schema validation and structured error responses observed in route handlers; pagination cursor edge cases and rate-limiting trade-offs were only partially addressed.",
      evidenceSummary: "Routes, request validation, and error-handling patterns.",
      verificationMethod: "Repository analysis and viva.",
      rubricId: "RUB-BE-API-02",
      evaluatedDate: "2026-10-18",
      supportingFiles: [
        {
          path: "src/server/routes/orders.route.ts",
          lineRange: "L15–L104",
          role: "RESTful resource endpoints",
          observation:
            "Defines typed GET/POST/PATCH handlers with Zod payload parsing before service invocation.",
          classification: "Verified Observation",
        },
        {
          path: "src/server/middleware/errorEnvelope.ts",
          lineRange: "L08–L61",
          role: "Centralized HTTP error mapping",
          observation:
            "Normalizes domain exceptions into deterministic status codes and machine-readable error codes without leaking stack traces.",
          classification: "Verified Observation",
        },
      ],
      codeReference: {
        file: "src/server/middleware/errorEnvelope.ts",
        lineRange: "L19–L37",
        caption:
          "Centralized domain-to-HTTP error boundary inspected during static repository review:",
        snippet: `export function toErrorResponse(err: unknown): ApiErrorEnvelope {
  if (err instanceof ZodError) {
    return { status: 422, code: "VALIDATION_FAILED", issues: err.flatten() };
  }
  if (err instanceof OrderConflictError) {
    return { status: 409, code: "ORDER_STATE_CONFLICT", message: err.message };
  }
  return { status: 500, code: "INTERNAL_ERROR", message: "Unexpected fault" };
}`,
      },
      vivaReference: {
        id: "VIVA-Q-04",
        referencedCode: "src/server/routes/orders.route.ts:L68–L92",
        question:
          "How does your `PATCH /api/orders/:id/status` endpoint prevent lost updates if two operators modify the same order concurrently?",
        candidateResponseSummary:
          "Correctly identified where `OrderConflictError` is thrown via status checks, acknowledged that the current read-then-write lacks a database-level version column or transaction lock, and outlined optimistic concurrency via a `version` integer.",
        rubricOutcome:
          "Demonstrates solid validation and error-contract hygiene; concurrency control exists conceptually in viva discussion rather than committed code.",
        evaluatedAt: "2026-10-18 · Session #1",
      },
      distinctions: [
        {
          classification: "Verified Observation",
          statement:
            "6 route handlers enforce runtime schema validation (`ZodError` -> HTTP 422) and consistent JSON error envelopes.",
          basis: "Direct static route & middleware inspection.",
        },
        {
          classification: "Inferred Assessment",
          statement:
            "Candidate shows solid foundational API contract design, with room to substantiate concurrency safety and pagination scalability in code.",
          basis: "Synthesized against rubric RUB-BE-API-02 combining route artifacts and viva response.",
        },
      ],
    },
    {
      id: "skill-testing",
      name: "Testing",
      status: "Insufficient evidence",
      confidenceLabel: "Low evidence availability",
      confidenceRationale:
        "Absence of integration and component test coverage means automated verification cannot substantiate testing proficiency from this repository alone.",
      evidenceSummary: "Limited test files identified.",
      verificationMethod: "Additional assessment recommended.",
      rubricId: "RUB-QA-TEST-01",
      evaluatedDate: "2026-10-18",
      supportingFiles: [
        {
          path: "src/utils/__tests__/pricing.test.ts",
          lineRange: "L01–L34",
          role: "Unit test for pure calculation helper",
          observation:
            "Contains 3 synchronous assertions for tax/discount arithmetic; no async route, hook, or error-path tests found.",
          classification: "Verified Observation",
        },
      ],
      codeReference: {
        file: "src/utils/__tests__/pricing.test.ts",
        lineRange: "L06–L20",
        caption:
          "Only test file present in repository—covers happy-path arithmetic helper:",
        snippet: `describe("calculateNetTotal", () => {
  it("applies percentage discount before tax", () => {
    const total = calculateNetTotal({ subtotalCents: 10000, discountPct: 10, taxPct: 8 });
    expect(total).toBe(9720);
  });
});`,
      },
      vivaReference: {
        id: "VIVA-Q-06",
        referencedCode: "Repository test coverage scan (1 test file across 48 source files)",
        question:
          "Which failure mode in `orders.route.ts` or `useOrderStream.ts` would you prioritize testing first, and how would you structure that test?",
        candidateResponseSummary:
          "Described testing 422 validation rejections and stream reconnect behavior using mock event emitters, noting tests were omitted due to time constraints when building the project.",
        rubricOutcome:
          "Conceptual awareness noted, but insufficient committed test artifacts to verify practical testing execution.",
        evaluatedAt: "2026-10-18 · Session #1",
      },
      distinctions: [
        {
          classification: "Verified Observation",
          statement:
            "Only 1 unit test file (`pricing.test.ts`, 34 lines) was detected; 0 integration tests cover API routes or React hooks.",
          basis: "Direct repository file tree and test-runner config scan.",
        },
        {
          classification: "Inferred Assessment",
          statement:
            "Insufficient evidence does not prove inability—it indicates recruiters should request a targeted testing challenge or inspect another repository.",
          basis: "Rubric RUB-QA-TEST-01 policy: missing artifacts yield 'Insufficient evidence', never a fabricated score.",
        },
      ],
      recommendedNextAction:
        "Complete Targeted Challenge: Write integration tests for `PATCH /api/orders/:id` validation & conflict states, or attach a repository containing an active test suite.",
    },
  ],
};
