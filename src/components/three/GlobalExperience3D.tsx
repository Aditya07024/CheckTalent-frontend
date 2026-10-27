"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ScrollProgress3D } from "@/components/three/ScrollProgress3D";

const PageCanvas3D = dynamic(
  () => import("@/components/three/PageCanvas3D").then((m) => m.PageCanvas3D),
  { ssr: false }
);

/**
 * Mounts the full-page scroll-driven Three.js 3D world + 3D scroll HUD.
 */
export function GlobalExperience3D() {
  return (
    <>
      <PageCanvas3D />
      <ScrollProgress3D />
    </>
  );
}
