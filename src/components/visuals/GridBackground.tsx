import React from "react";
import { cn } from "@/lib/utils";

interface GridBackgroundProps {
  className?: string;
  density?: "fine" | "standard";
  showRadialGlow?: boolean;
}

/**
 * Warm solar yellow, tangerine orange, and vermilion red ambient light pools
 * paired with crisp architectural drafting grids.
 */
export function GridBackground({
  className,
  density = "standard",
  showRadialGlow = false,
}: GridBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {showRadialGlow && (
        <>
          <div
            className="absolute -left-24 -top-28 h-[460px] w-[620px] rounded-full opacity-95 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(250, 204, 21, 0.28) 0%, rgba(245, 158, 11, 0.16) 45%, transparent 72%)",
            }}
          />
          <div
            className="absolute -right-20 top-0 h-[500px] w-[640px] rounded-full opacity-95 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(249, 115, 22, 0.24) 0%, rgba(239, 68, 68, 0.16) 48%, transparent 74%)",
            }}
          />
          <div
            className="absolute bottom-0 left-1/3 h-[340px] w-[540px] rounded-full opacity-80 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(251, 146, 60, 0.18) 0%, rgba(234, 179, 8, 0.12) 52%, transparent 75%)",
            }}
          />
        </>
      )}
      <div
        className={cn(
          "absolute inset-0",
          density === "fine" ? "pos-grid-fine" : "pos-grid-standard"
        )}
      />
    </div>
  );
}
