"use client";

import React, { useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface TiltCard3DProps extends React.HTMLAttributes<HTMLDivElement> {
  maxTiltDeg?: number;
  glowColor?: string;
}

/**
 * High-performance 3D perspective card container using direct DOM transform
 * updates to bypass React reconciliation overhead during mouse move.
 */
export function TiltCard3D({
  maxTiltDeg = 5.5,
  glowColor = "rgba(249, 115, 22, 0.16)",
  className,
  children,
  ...props
}: TiltCard3DProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const glareRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (event.clientX - rect.left) / rect.width;
    const yPct = (event.clientY - rect.top) / rect.height;

    const rotateY = (xPct - 0.5) * (maxTiltDeg * 2);
    const rotateX = (0.5 - yPct) * (maxTiltDeg * 2);

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(
      2
    )}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(4px)`;

    if (glareRef.current) {
      glareRef.current.style.opacity = "1";
      glareRef.current.style.background = `radial-gradient(360px circle at ${Math.round(
        xPct * 100
      )}% ${Math.round(yPct * 100)}%, ${glowColor}, transparent 75%)`;
    }
  };

  const handleMouseLeave = () => {
    if (prefersReducedMotion || !cardRef.current) return;
    cardRef.current.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
    if (glareRef.current) {
      glareRef.current.style.opacity = "0";
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "relative transition-transform duration-200 ease-out will-change-transform",
        className
      )}
      {...props}
    >
      {!prefersReducedMotion && (
        <div
          ref={glareRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300"
        />
      )}
      {children}
    </div>
  );
}
