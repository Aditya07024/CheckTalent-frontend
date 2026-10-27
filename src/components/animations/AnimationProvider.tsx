"use client";

import React, { createContext, useContext, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface AnimationContextValue {
  prefersReducedMotion: boolean;
}

const AnimationContext = createContext<AnimationContextValue>({
  prefersReducedMotion: false,
});

let isGsapRegistered = false;

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!isGsapRegistered) {
      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.config({
        ignoreMobileResize: true,
      });
      isGsapRegistered = true;
    }

    if (prefersReducedMotion) {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    } else {
      ScrollTrigger.refresh();
    }
  }, [prefersReducedMotion]);

  return (
    <AnimationContext.Provider value={{ prefersReducedMotion }}>
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimationContext(): AnimationContextValue {
  return useContext(AnimationContext);
}
