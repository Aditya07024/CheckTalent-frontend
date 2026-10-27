"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { attachSolarLighting } from "@/lib/three/lighting";
import { buildOrbitConstellation } from "@/lib/three/orbit-scene";
import { fitOrbitCamera } from "@/lib/three/orbit-layout";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface LanguageOrbit3DProps {
  className?: string;
}

/**
 * Full-bleed background Three.js 3D Polyglot Orbit. Fills its parent,
 * anchors to the right on desktop, and lets hero text sit on top of it.
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

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    attachSolarLighting(scene, 18);

    const orbit = buildOrbitConstellation();
    const anchor = new THREE.Group();
    anchor.add(orbit.rootGroup);
    scene.add(anchor);

    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      renderer.setSize(w, h);
      const { distance, offsetX, offsetY } = fitOrbitCamera(w, h, camera.fov);
      camera.aspect = w / h;
      camera.position.set(0, 1.2, distance);
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
      anchor.position.x = offsetX;
      anchor.position.y = offsetY;
    };
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    // Canvas sits behind text, so track the pointer on the window instead.
    let targetRotX = 0.08;
    let targetRotY = 0;
    const onPointerMove = (e: PointerEvent) => {
      const r = container.getBoundingClientRect();
      if (e.clientY < r.top || e.clientY > r.bottom) return;
      targetRotY = (((e.clientX - r.left) / r.width) * 2 - 1) * 0.45;
      targetRotX = 0.08 + (((e.clientY - r.top) / r.height) * 2 - 1) * 0.25;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    let isVisible = true;
    const io = new IntersectionObserver((entries) => {
      isVisible = entries[0]?.isIntersecting ?? true;
    });
    io.observe(container);

    let frameId = 0;
    const clock = new THREE.Clock();

    const renderScene = () => {
      frameId = window.requestAnimationFrame(renderScene);
      if (!isVisible) return;
      const t = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        orbit.coreMesh.rotation.y = t * 0.7;
        orbit.coreMesh.rotation.x = Math.sin(t * 0.5) * 0.25;
        orbit.haloMesh.rotation.y = -t * 0.35;
        orbit.haloMesh.rotation.z = t * 0.2;

        orbit.nodes.forEach(({ mesh, lineGeom, spec }, idx) => {
          const angle = spec.orbitAngle + t * spec.speed;
          const x = Math.cos(angle) * spec.orbitRadius;
          const z = Math.sin(angle) * spec.orbitRadius;
          const y = spec.yOffset + Math.sin(t * 1.4 + idx) * 0.14;
          mesh.position.set(x, y, z);
          mesh.rotation.y = -angle + Math.PI * 0.5;
          mesh.rotation.x = Math.sin(t * 0.9 + idx) * 0.18;
          const pos = lineGeom.getAttribute("position") as THREE.BufferAttribute;
          pos.setXYZ(1, x, y, z);
          pos.needsUpdate = true;
        });

        const g = orbit.rootGroup;
        g.rotation.y += (targetRotY - g.rotation.y) * 0.06;
        g.rotation.x += (targetRotX - g.rotation.x) * 0.06;
      }

      renderer.render(scene, camera);
    };
    renderScene();

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      orbit.dispose();
      renderer.dispose();
    };
  }, [prefersReducedMotion]);

  if (!webglSupported) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0", className)}
    />
  );
}
