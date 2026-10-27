"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface Floating3DCubeProps {
  label: string;
  tone?: "gold" | "orange" | "crimson";
  size?: number;
  className?: string;
}

const CUBE_TONES = {
  gold: "border-amber-400/85 bg-gradient-to-br from-yellow-200/80 to-amber-400/70 text-amber-950 shadow-[0_10px_24px_rgba(245,158,11,0.25)]",
  orange:
    "border-orange-400/85 bg-gradient-to-br from-amber-200/80 to-orange-500/75 text-white shadow-[0_10px_24px_rgba(234,88,12,0.28)]",
  crimson:
    "border-red-400/85 bg-gradient-to-br from-orange-300/80 to-red-600/75 text-white shadow-[0_10px_24px_rgba(220,38,38,0.26)]",
} as const;

/**
 * Genuine 6-face CSS `preserve-3d` rotating solar cube accent.
 */
export function Floating3DCube({
  label,
  tone = "orange",
  size = 52,
  className,
}: Floating3DCubeProps) {
  const half = size / 2;
  const faces = [
    `rotateY(0deg) translateZ(${half}px)`,
    `rotateY(90deg) translateZ(${half}px)`,
    `rotateY(180deg) translateZ(${half}px)`,
    `rotateY(-90deg) translateZ(${half}px)`,
    `rotateX(90deg) translateZ(${half}px)`,
    `rotateX(-90deg) translateZ(${half}px)`,
  ];

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none select-none animate-float-slow", className)}
      style={{ perspective: "600px", width: size, height: size }}
    >
      <div
        className="relative h-full w-full animate-spin-3d"
        style={{ transformStyle: "preserve-3d" }}
      >
        {faces.map((transform, idx) => (
          <div
            key={idx}
            style={{ transform, width: size, height: size }}
            className={cn(
              "absolute inset-0 flex items-center justify-center rounded-md border-2 font-mono text-[10px] font-extrabold backdrop-blur-[2px]",
              CUBE_TONES[tone]
            )}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
