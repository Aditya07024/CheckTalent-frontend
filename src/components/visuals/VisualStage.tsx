"use client";

import React, { Suspense } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

export interface VisualStageProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  stageLabel?: string;
  minHeightClass?: string;
  className?: string;
  framed?: boolean;
}

function DefaultVisualFallback({ minHeightClass }: { minHeightClass: string }) {
  return (
    <div
      role="status"
      aria-label="Loading visual demonstration"
      className={cn(
        "flex w-full flex-col justify-between rounded-lg border border-hairline bg-canvas-secondary p-6",
        minHeightClass
      )}
    >
      <div className="flex items-center justify-between border-b border-hairline pb-4">
        <div className="h-3 w-36 rounded bg-canvas-elevated" />
        <div className="h-3 w-20 rounded bg-canvas-elevated" />
      </div>
      <div className="space-y-3 py-8">
        <div className="h-4 w-3/4 rounded bg-canvas-elevated" />
        <div className="h-4 w-1/2 rounded bg-canvas-elevated" />
        <div className="h-24 w-full rounded border border-hairline bg-canvas/60" />
      </div>
      <div className="h-3 w-48 rounded bg-canvas-elevated" />
    </div>
  );
}

/**
 * Stable visual boundary container.
 * Currently hosts structured HTML/CSS/SVG product demonstrations while
 * reserving deterministic responsive geometry, Suspense fallback handling,
 * and reduced-motion signaling so an isolated client scene can replace
 * child visuals in a future release without altering page layouts.
 */
export function VisualStage({
  children,
  fallback,
  stageLabel = "Interactive Product Stage",
  minHeightClass = "min-h-[520px]",
  className,
  framed = true,
}: VisualStageProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      data-visual-stage="true"
      data-motion-mode={prefersReducedMotion ? "reduced" : "standard"}
      aria-label={stageLabel}
      className={cn(
        "relative w-full",
        minHeightClass,
        framed &&
          "rounded-xl border border-hairline-strong bg-canvas-secondary/85 p-1.5 sm:p-2 shadow-[0_20px_56px_rgba(15,23,42,0.09),0_2px_8px_rgba(15,23,42,0.04)]",
        className
      )}
    >
      {framed && (
        <>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -left-px -top-px h-3 w-3 border-l-2 border-t-2 border-lime/60 rounded-tl-[2px]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-px -top-px h-3 w-3 border-r-2 border-t-2 border-lime/60 rounded-tr-[2px]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-px -left-px h-3 w-3 border-b-2 border-l-2 border-hairline-strong rounded-bl-[2px]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-px -right-px h-3 w-3 border-b-2 border-r-2 border-hairline-strong rounded-br-[2px]"
          />
        </>
      )}

      <Suspense fallback={fallback ?? <DefaultVisualFallback minHeightClass={minHeightClass} />}>
        {children}
      </Suspense>
    </div>
  );
}
