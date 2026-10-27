"use client";

import React, { useState } from "react";
import { Code2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface LanguageCubeItem {
  id: string;
  symbol: string;
  name: string;
  gradientClass: string;
  shadowColor: string;
  badgeBg: string;
  inspectedConstructs: string;
  vivaProbeExample: string;
  testEcosystem: string;
}

const POLYGLOT_CUBES: ReadonlyArray<LanguageCubeItem> = [
  {
    id: "lang-ts",
    symbol: "TS",
    name: "TypeScript",
    gradientClass: "from-orange-500 via-orange-600 to-red-600",
    shadowColor: "rgba(234, 88, 12, 0.34)",
    badgeBg: "bg-orange-50 text-orange-900 border-orange-300",
    inspectedConstructs:
      "Discriminated unions, strict generics, Zod/runtime boundary schemas, async error envelopes",
    vivaProbeExample:
      "Explain why a discriminated union prevents invalid intermediate UI states in your reducer.",
    testEcosystem: "Vitest · Jest · Playwright",
  },
  {
    id: "lang-react",
    symbol: "JSX",
    name: "React & Next.js",
    gradientClass: "from-amber-500 via-orange-500 to-red-500",
    shadowColor: "rgba(245, 158, 11, 0.34)",
    badgeBg: "bg-amber-50 text-amber-900 border-amber-300",
    inspectedConstructs:
      "Server/Client component boundaries, effect cleanup lifecycles, custom hooks, accessible ARIA patterns",
    vivaProbeExample:
      "Why did you isolate this stateful subtree into a client component while keeping parent data fetching on the server?",
    testEcosystem: "React Testing Library · Cypress",
  },
  {
    id: "lang-py",
    symbol: "PY",
    name: "Python",
    gradientClass: "from-yellow-500 via-amber-500 to-orange-600",
    shadowColor: "rgba(234, 179, 8, 0.34)",
    badgeBg: "bg-yellow-50 text-yellow-900 border-yellow-400",
    inspectedConstructs:
      "FastAPI/Django routers, Pydantic validation models, async I/O concurrency, dependency injection",
    vivaProbeExample:
      "How does your async endpoint avoid blocking the event loop during CPU-bound or synchronous DB calls?",
    testEcosystem: "pytest · httpx · unittest",
  },
  {
    id: "lang-node",
    symbol: "NODE",
    name: "Node.js",
    gradientClass: "from-red-500 via-orange-600 to-amber-500",
    shadowColor: "rgba(239, 68, 68, 0.32)",
    badgeBg: "bg-red-50 text-red-900 border-red-300",
    inspectedConstructs:
      "Stream backpressure, middleware chains, graceful shutdown hooks, idempotent REST/webhook handlers",
    vivaProbeExample:
      "What happens to in-flight transactions when your Node process receives SIGTERM during deploy?",
    testEcosystem: "Supertest · Node Test Runner",
  },
  {
    id: "lang-java",
    symbol: "JVM",
    name: "Java & Spring",
    gradientClass: "from-red-600 via-red-500 to-orange-500",
    shadowColor: "rgba(220, 38, 38, 0.32)",
    badgeBg: "bg-red-50 text-red-900 border-red-300",
    inspectedConstructs:
      "Service/repository layering, @Transactional isolation boundaries, DTO validation, exception advice",
    vivaProbeExample:
      "Why did you configure read-committed vs. repeatable-read transaction semantics on this service method?",
    testEcosystem: "JUnit 5 · Testcontainers · Mockito",
  },
  {
    id: "lang-go",
    symbol: "GO",
    name: "Go",
    gradientClass: "from-amber-600 via-yellow-500 to-orange-500",
    shadowColor: "rgba(217, 119, 6, 0.32)",
    badgeBg: "bg-amber-50 text-amber-900 border-amber-300",
    inspectedConstructs:
      "Goroutine context cancellation, channel lifecycle safety, explicit error wrapping, interface boundaries",
    vivaProbeExample:
      "How does `ctx.Done()` prevent goroutine leaks if the upstream HTTP client disconnects early?",
    testEcosystem: "go test · table-driven specs",
  },
  {
    id: "lang-rust",
    symbol: "RS",
    name: "Rust",
    gradientClass: "from-orange-700 via-red-600 to-amber-600",
    shadowColor: "rgba(194, 65, 12, 0.34)",
    badgeBg: "bg-orange-50 text-orange-900 border-orange-300",
    inspectedConstructs:
      "Ownership & borrowing boundaries, Result/Option error propagation, Tokio async task safety",
    vivaProbeExample:
      "Why did you choose `Arc<RwLock<T>>` over message passing via `mpsc` channels for shared state here?",
    testEcosystem: "cargo test · integration crates",
  },
  {
    id: "lang-sql",
    symbol: "SQL",
    name: "SQL & Data",
    gradientClass: "from-red-600 via-orange-500 to-yellow-500",
    shadowColor: "rgba(220, 38, 38, 0.30)",
    badgeBg: "bg-red-50 text-red-900 border-red-300",
    inspectedConstructs:
      "Parameterized queries, composite indexing alignment, migration safety, optimistic version locking",
    vivaProbeExample:
      "Which composite index supports your filtered cursor query without triggering a full sequential scan?",
    testEcosystem: "Migration & seed verification",
  },
];

export function LanguageShowcase3D() {
  const [selectedId, setSelectedId] = useState<string>("lang-ts");

  const activeLang =
    POLYGLOT_CUBES.find((item) => item.id === selectedId) ?? POLYGLOT_CUBES[0]!;

  return (
    <div className="mt-10 rounded-2xl border border-orange-200/90 bg-gradient-to-br from-yellow-50/75 via-orange-50/55 to-red-50/55 p-5 sm:p-7 shadow-[0_14px_40px_rgba(234,88,12,0.08)]">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h3 className="mt-1 text-lg sm:text-xl font-bold text-ink">
            Inspect how TalentLens analyzes real code across languages
          </h3>
        </div>
      </div>

      {/* 8 Interactive 3D Extruded Language Tiles */}
      <div
        role="tablist"
        aria-label="Supported language analysis adapters"
        className="mt-6 grid grid-cols-2 gap-3.5 sm:grid-cols-4 lg:grid-cols-8"
      >
        {POLYGLOT_CUBES.map((cube) => {
          const isSelected = cube.id === activeLang.id;
          return (
            <button
              key={cube.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => setSelectedId(cube.id)}
              style={{
                transform: isSelected
                  ? "perspective(700px) rotateX(8deg) rotateY(-8deg) translateY(-6px)"
                  : "perspective(700px) rotateX(0deg) rotateY(0deg) translateY(0px)",
                boxShadow: isSelected
                  ? `0 16px 28px -6px ${cube.shadowColor}, 0 5px 0 0 rgba(124,45,18,0.28)`
                  : "0 4px 0 0 rgba(120,53,15,0.12), 0 6px 14px rgba(28,22,19,0.06)",
              }}
              className={cn(
                "group relative flex flex-col items-center justify-center rounded-xl border p-3.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500",
                isSelected
                  ? "border-amber-200/80 text-white bg-gradient-to-br " + cube.gradientClass
                  : "border-orange-200/80 bg-white text-ink hover:-translate-y-1 hover:border-orange-300"
              )}
            >
              <span
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg font-mono text-xs font-extrabold tracking-tight shadow-sm transition-transform group-hover:scale-105",
                  isSelected
                    ? "bg-white/20 text-white backdrop-blur-sm"
                    : "text-white bg-gradient-to-br " + cube.gradientClass
                )}
              >
                {cube.symbol}
              </span>
              <span
                className={cn(
                  "mt-2 text-xs font-semibold",
                  isSelected ? "text-white" : "text-ink"
                )}
              >
                {cube.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Language Inspector Strip */}
      <div
        aria-live="polite"
        className="mt-6 grid grid-cols-1 gap-4 rounded-xl border border-orange-200/80 bg-white p-4 sm:p-5 lg:grid-cols-12 shadow-sm"
      >
        <div className="lg:col-span-5 space-y-1.5">
          <span
            className={cn(
              "inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase",
              activeLang.badgeBg
            )}
          >
            {activeLang.name} Static AST Adapter
          </span>
          <p className="pt-1 text-xs sm:text-sm leading-relaxed text-ink-secondary">
            <strong className="text-ink">Inspected Constructs: </strong>
            {activeLang.inspectedConstructs}
          </p>
          <p className="font-mono text-[11px] font-medium text-orange-700">
            Test Runners Detected: {activeLang.testEcosystem}
          </p>
        </div>

        <div className="lg:col-span-7 rounded-lg border border-red-200 bg-gradient-to-r from-amber-50/80 via-orange-50/75 to-red-50/80 p-3.5">
          <span className="inline-flex items-center gap-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-red-700">
            <Sparkles className="h-3 w-3 text-orange-600" />
            Sample {activeLang.name} Viva Defense Prompt
          </span>
          <p className="mt-1.5 text-xs sm:text-sm font-medium leading-relaxed text-ink">
            “{activeLang.vivaProbeExample}”
          </p>
        </div>
      </div>
    </div>
  );
}
