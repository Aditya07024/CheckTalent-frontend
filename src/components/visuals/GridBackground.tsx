import React from "react";
import { cn } from "@/lib/utils";

interface GridBackgroundProps {
  className?: string;
  density?: "fine" | "standard";
  showRadialGlow?: boolean;
}

/**
 * Pure CSS/SVG architectural grid and subtle ambient wash on the light canvas.
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
          className="absolute -top-36 left-1/2 h-[540px] w-[960px] -translate-x-1/2 rounded-full opacity-95"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(163, 230, 53, 0.16) 0%, rgba(85, 56, 238, 0.055) 40%, rgba(248, 249, 251, 0) 72%)",
          }}
        />
      )}
    </div>
  );
}
