import React from "react";
import { cn } from "@/lib/utils";

interface GridBackgroundProps {
  className?: string;
  density?: "fine" | "standard";
  showRadialGlow?: boolean;
}

/**
 * Pure CSS/SVG architectural grid and subtle fractal noise layer.
 * Zero JavaScript overhead, Server Component safe.
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
      <div
        className={cn(
          "absolute inset-0",
          density === "fine" ? "pos-grid-fine" : "pos-grid-standard"
        )}
      />
      {showRadialGlow && (
        <div
          className="absolute -top-36 left-1/2 h-[540px] w-[960px] -translate-x-1/2 rounded-full opacity-90"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(197, 255, 74, 0.065) 0%, rgba(155, 140, 255, 0.035) 38%, rgba(8, 9, 13, 0) 72%)",
          }}
        />
      )}
    </div>
  );
}
