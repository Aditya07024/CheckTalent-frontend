import React from "react";

export default function BaselinePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-canvas px-6 py-20 text-center">
      <div className="max-w-xl rounded-xl border border-hairline bg-canvas-secondary p-8">
        <span className="inline-block rounded border border-lime/30 bg-lime-dim px-2.5 py-1 font-mono text-xs text-lime">
          PROOF OF SKILL · ENVIRONMENT BASELINE
        </span>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          Branch-Managed Repository Baseline
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
          This deployment reflects the clean baseline branch (<code>main</code>,{" "}
          <code>staging-1</code>, or <code>staging-2</code>). The complete Proof
          of Skill product landing page lives on the{" "}
          <code className="text-lime">landing-page</code> branch and can be
          previewed directly or promoted via Pull Request.
        </p>
      </div>
    </main>
  );
}
