"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useAnimationContext } from "@/components/animations/AnimationProvider";
import { cn } from "@/lib/utils";

interface EvidenceConnectorProps {
  active?: boolean;
  accent?: "lime" | "violet";
  orientation?: "horizontal" | "vertical";
  className?: string;
}

/**
 * Crisp SVG connector linking pipeline stages horizontally on desktop
 * and vertically on smaller screens, with subtle GSAP signal traversal.
 */
export function EvidenceConnector({
  active = false,
  accent = "lime",
  orientation = "horizontal",
  className,
}: EvidenceConnectorProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const pulseRef = useRef<SVGLineElement | null>(null);
  const { prefersReducedMotion } = useAnimationContext();

  const strokeColor = accent === "violet" ? "#9B8CFF" : "#C5FF4A";

  useGSAP(
    () => {
      if (prefersReducedMotion || !pulseRef.current) return;

      gsap.fromTo(
        pulseRef.current,
        { strokeDashoffset: 36 },
        {
          strokeDashoffset: 0,
          duration: 1.8,
          repeat: -1,
          ease: "none",
        }
      );
    },
    { scope: svgRef, dependencies: [prefersReducedMotion, orientation] }
  );

  if (orientation === "vertical") {
    return (
      <div
        aria-hidden="true"
        className={cn("flex justify-start pl-6 py-1", className)}
      >
        <svg
          ref={svgRef}
          width="16"
          height="28"
          viewBox="0 0 16 28"
          fill="none"
          className="overflow-visible"
        >
          <line
            x1="8"
            y1="0"
            x2="8"
            y2="24"
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="1"
          />
          <line
            ref={pulseRef}
            x1="8"
            y1="0"
            x2="8"
            y2="24"
            stroke={strokeColor}
            strokeOpacity={active ? "0.9" : "0.4"}
            strokeWidth="1.25"
            strokeDasharray="6 12"
          />
          <path
            d="M4.5 21L8 25.5L11.5 21"
            stroke={active ? strokeColor : "rgba(255,255,255,0.35)"}
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={cn("hidden xl:flex items-center justify-center px-0.5", className)}
    >
      <svg
        ref={svgRef}
        width="32"
        height="16"
        viewBox="0 0 32 16"
        fill="none"
        className="w-7 overflow-visible"
      >
        <line
          x1="0"
          y1="8"
          x2="27"
          y2="8"
          stroke="rgba(255,255,255,0.14)"
          strokeWidth="1"
        />
        <line
          ref={pulseRef}
          x1="0"
          y1="8"
          x2="27"
          y2="8"
          stroke={strokeColor}
          strokeOpacity={active ? "0.95" : "0.45"}
          strokeWidth="1.25"
          strokeDasharray="6 12"
        />
        <path
          d="M24 4.5L28.5 8L24 11.5"
          stroke={active ? strokeColor : "rgba(255,255,255,0.38)"}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
