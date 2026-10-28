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
        "flex w-full flex-col justify-between rounded-xl border border-orange-200 bg-white p-6",
        minHeightClass
      )}
    >
      <div className="flex items-center justify-between border-b border-orange-100 pb-4">
        <div className="h-3 w-36 rounded bg-amber-100" />
        <div className="h-3 w-20 rounded bg-orange-100" />
      </div>
      <div className="space-y-3 py-8">
        <div className="h-36 w-full rounded-lg bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50" />
        <div className="h-24 w-full rounded-lg border border-orange-100 bg-amber-50/40" />
      </div>
      <div className="h-3 w-48 rounded bg-orange-100" />
    </div>
  );
}

/**
 * Multi-layered VisualStage container hosting interactive WebGL Three.js 3D
 * visuals and structured repository intelligence previews inside a vibrant
 * yellow-orange-red frame.
 */
export function VisualStage({
  children,
  fallback,
  stageLabel = "Interactive 3D & Repository Product Stage",
  minHeightClass = "min-h-[540px]",
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
          "rounded-2xl bg-gradient-to-br from-yellow-400/80 via-orange-500/75 to-red-500/80 p-[2px] shadow-[0_24px_64px_rgba(234,88,12,0.18),0_8px_24px_rgba(239,68,68,0.12)]",
        className
      )}
    >
      <div className="h-full w-full rounded-[14px] bg-white/95 p-2.5 sm:p-3 backdrop-blur-md">
        <Suspense
          fallback={fallback ?? <DefaultVisualFallback minHeightClass={minHeightClass} />}
        >
          {children}
        </Suspense>
      </div>
    </div>
  );
}
