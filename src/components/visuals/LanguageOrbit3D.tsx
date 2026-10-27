"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { ORBIT_LANGUAGE_NODES } from "@/data/orbit-languages";
import { attachSolarLighting } from "@/lib/three/lighting";
import { buildOrbitConstellation } from "@/lib/three/orbit-scene";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface LanguageOrbit3DProps {
  className?: string;
}

/**
 * Borderless, open-air Three.js 3D Polyglot Orbit Constellation
 * floating freely on the right side of the Hero section.
 */
export function LanguageOrbit3D({ className }: LanguageOrbit3DProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      setWebglSupported(false);
      return;
    }

    const width = container.clientWidth || 580;
    const height = container.clientHeight || 540;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.35, 7.1);
    camera.lookAt(0, 0, 0);

    attachSolarLighting(scene, 16);
    const orbit = buildOrbitConstellation();
    scene.add(orbit.rootGroup);

    let targetRotX = 0.08;
    let targetRotY = 0;

    const handlePointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      targetRotY = nx * 0.48;
      targetRotX = 0.08 + ny * 0.28;
    };

    const handlePointerLeave = () => {
      targetRotX = 0.08;
      targetRotY = 0;
    };

    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerleave", handlePointerLeave);

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const w = entry.contentRect.width;
      const h = entry.contentRect.height;
      if (w > 0 && h > 0) {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    });
    resizeObserver.observe(container);

    let frameId = 0;
    const clock = new THREE.Clock();

    const renderScene = () => {
      const elapsed = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        orbit.coreMesh.rotation.y = elapsed * 0.7;
        orbit.coreMesh.rotation.x = Math.sin(elapsed * 0.5) * 0.25;
        orbit.haloMesh.rotation.y = -elapsed * 0.35;
        orbit.haloMesh.rotation.z = elapsed * 0.2;

        orbit.nodes.forEach(({ mesh, lineGeom, spec }, idx) => {
          const angle = spec.orbitAngle + elapsed * spec.speed;
          const x = Math.cos(angle) * spec.orbitRadius;
          const z = Math.sin(angle) * spec.orbitRadius;
          const y = spec.yOffset + Math.sin(elapsed * 1.4 + idx) * 0.14;

          mesh.position.set(x, y, z);
          mesh.rotation.y = -angle + Math.PI * 0.5;
          mesh.rotation.x = Math.sin(elapsed * 0.9 + idx) * 0.18;

          const posAttr = lineGeom.getAttribute("position") as THREE.BufferAttribute;
          posAttr.setXYZ(1, x, y, z);
          posAttr.needsUpdate = true;
        });

        orbit.rootGroup.rotation.y += (targetRotY - orbit.rootGroup.rotation.y) * 0.06;
        orbit.rootGroup.rotation.x += (targetRotX - orbit.rootGroup.rotation.x) * 0.06;

        renderer.render(scene, camera);
        frameId = window.requestAnimationFrame(renderScene);
      } else {
        renderer.render(scene, camera);
      }
    };

    renderScene();

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
      orbit.dispose();
      renderer.dispose();
    };
  }, [prefersReducedMotion]);

  if (!webglSupported) {
    return (
      <div className="flex h-80 flex-wrap items-center justify-center gap-2 p-4">
        {ORBIT_LANGUAGE_NODES.map((lang) => (
          <span
            key={lang.symbol}
            className="rounded-lg border border-orange-300 bg-white px-3 py-1.5 font-mono text-xs font-bold shadow-sm"
            style={{ color: lang.primaryHex }}
          >
            {lang.symbol} · {lang.name}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative h-[430px] sm:h-[510px] lg:h-[570px] w-full select-none",
        className
      )}
    >
      {/* Soft Open-Air Solar Ambient Halo Behind the Floating 3D Orbit */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-10 rounded-full bg-gradient-to-tr from-yellow-300/35 via-orange-300/25 to-red-300/20 blur-3xl"
      />

      {/* Transparent Floating Three.js Canvas */}
      <div
        ref={containerRef}
        aria-label="Floating 3D constellation of supported programming languages"
        className="relative z-10 h-full w-full cursor-grab active:cursor-grabbing"
      />
    </div>
  );
}
