"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { attachSolarLighting } from "@/lib/three/lighting";
import {
  buildSculptureByVariant,
  type SculptureVariant,
} from "@/lib/three/sculpture-builders";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface SectionSculpture3DProps {
  variant: SculptureVariant;
  className?: string;
}

/**
 * Viewport-gated open-air Three.js 3D floating sculpture for section headers.
 */
export function SectionSculpture3D({
  variant,
  className,
}: SectionSculpture3DProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let frameId = 0;
    let disposeGeometry: (() => void) | null = null;
    let detachPointer: (() => void) | null = null;

    const mount = () => {
      if (renderer || !container) return;
      try {
        renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        });
      } catch {
        return;
      }

      const w = container.clientWidth || 200;
      const h = container.clientHeight || 200;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(w, h);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      container.innerHTML = "";
      container.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(38, w / h, 0.1, 50);
      camera.position.set(0, 0.2, 4.6);

      attachSolarLighting(scene, 14);
      const sculpture = buildSculptureByVariant(variant);
      scene.add(sculpture.group);
      disposeGeometry = sculpture.dispose;

      let tx = 0;
      let ty = 0;
      const onMove = (e: PointerEvent) => {
        const r = container.getBoundingClientRect();
        ty = (((e.clientX - r.left) / r.width) * 2 - 1) * 0.6;
        tx = (((e.clientY - r.top) / r.height) * 2 - 1) * 0.4;
      };
      const onLeave = () => {
        tx = 0;
        ty = 0;
      };
      container.addEventListener("pointermove", onMove);
      container.addEventListener("pointerleave", onLeave);
      detachPointer = () => {
        container.removeEventListener("pointermove", onMove);
        container.removeEventListener("pointerleave", onLeave);
      };

      const clock = new THREE.Clock();
      const tick = () => {
        if (!renderer) return;
        const t = clock.getElapsedTime();
        if (!prefersReducedMotion) {
          sculpture.mainMesh.rotation.y = t * 0.65;
          sculpture.mainMesh.rotation.x = Math.sin(t * 0.5) * 0.35;
          sculpture.rings.forEach((ring, i) => {
            ring.rotation.x += 0.008 * (i % 2 === 0 ? 1 : -1);
            ring.rotation.y += 0.011 * (i % 2 === 0 ? -1 : 1);
          });
          sculpture.group.rotation.y += (ty - sculpture.group.rotation.y) * 0.08;
          sculpture.group.rotation.x += (tx - sculpture.group.rotation.x) * 0.08;
          sculpture.group.position.y = Math.sin(t * 1.4) * 0.08;
        }
        renderer.render(scene, camera);
        frameId = window.requestAnimationFrame(tick);
      };
      tick();
    };

    const unmount = () => {
      window.cancelAnimationFrame(frameId);
      detachPointer?.();
      detachPointer = null;
      disposeGeometry?.();
      disposeGeometry = null;
      renderer?.dispose();
      renderer = null;
      if (container) container.innerHTML = "";
    };

    const io = new IntersectionObserver(
      (entries) => (entries[0]?.isIntersecting ? mount() : unmount()),
      { rootMargin: "260px" }
    );
    io.observe(container);

    return () => {
      io.disconnect();
      unmount();
    };
  }, [variant, prefersReducedMotion]);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className={cn(
        "relative h-40 w-40 sm:h-48 sm:w-48 shrink-0 select-none cursor-grab active:cursor-grabbing",
        className
      )}
    />
  );
}
