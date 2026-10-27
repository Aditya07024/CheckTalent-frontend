"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useAnimationContext } from "@/components/animations/AnimationProvider";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedSectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: "section" | "div";
  staggerSelector?: string;
  yOffset?: number;
}

/**
 * Applies restrained scroll-triggered entrance transitions via GSAP while
 * keeping SSR HTML fully visible (no initial CSS opacity:0) so content
 * remains accessible without JavaScript or under prefers-reduced-motion.
 */
export function AnimatedSection({
  as: Tag = "section",
  staggerSelector = "[data-animate-item]",
  yOffset = 20,
  className,
  children,
  ...props
}: AnimatedSectionProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const { prefersReducedMotion } = useAnimationContext();

  useGSAP(
    () => {
      if (prefersReducedMotion || !containerRef.current) return;

      const headerItems = containerRef.current.querySelectorAll("[data-animate-header]");
      const items = containerRef.current.querySelectorAll(staggerSelector);

      if (headerItems.length > 0) {
        gsap.from(headerItems, {
          y: 16,
          opacity: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 84%",
            once: true,
          },
        });
      }

      if (items.length > 0) {
        gsap.from(items, {
          y: yOffset,
          opacity: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: items[0],
            start: "top 88%",
            once: true,
          },
        });
      }
    },
    { scope: containerRef, dependencies: [prefersReducedMotion, staggerSelector, yOffset] }
  );

  return (
    <Tag
      ref={containerRef as React.RefObject<never>}
      className={cn("relative", className)}
      {...props}
    >
      {children}
    </Tag>
  );
}
