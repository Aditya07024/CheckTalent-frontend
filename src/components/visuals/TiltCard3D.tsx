"use client";

import React, { useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface TiltCard3DProps extends React.HTMLAttributes<HTMLDivElement> {
  maxTiltDeg?: number;
  glowColor?: string;
}

/**
 * Interactive 3D perspective card container with cursor-tracked specular
 * color sheen and smooth spring-back reset. Respects prefers-reduced-motion.
 */
export function TiltCard3D({
  maxTiltDeg = 5.5,
  glowColor = "rgba(249, 115, 22, 0.16)",
  className,
  children,
  ...props
}: TiltCard3DProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const [transformStyle, setTransformStyle] = useState<string>(
    "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)"
  );
  const [glarePos, setGlarePos] = useState<{ x: number; y: number; active: boolean }>({
    x: 50,
    y: 50,
    active: false,
  });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (event.clientX - rect.left) / rect.width;
    const yPct = (event.clientY - rect.top) / rect.height;

    const rotateY = (xPct - 0.5) * (maxTiltDeg * 2);
    const rotateX = (0.5 - yPct) * (maxTiltDeg * 2);

    setTransformStyle(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(4px)`
    );
    setGlarePos({
      x: Math.round(xPct * 100),
      y: Math.round(yPct * 100),
      active: true,
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle(
      "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)"
    );
    setGlarePos((prev) => ({ ...prev, active: false }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: prefersReducedMotion ? undefined : transformStyle,
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
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
          style={{
            opacity: glarePos.active ? 1 : 0,
            background: `radial-gradient(360px circle at ${glarePos.x}% ${glarePos.y}%, ${glowColor}, transparent 75%)`,
          }}
        />
      )}
      {children}
    </div>
  );
}
