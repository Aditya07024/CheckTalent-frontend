"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { attachSolarLighting } from "@/lib/three/lighting";
import { buildPageWorldObjects } from "@/lib/three/page-world-builder";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Full-Viewport Scroll-Driven Three.js 3D Background World spanning all sections.
 */
export function PageCanvas3D() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      44,
      window.innerWidth / window.innerHeight,
      0.1,
      120
    );
    camera.position.set(0, 0, 8.2);

    const lights = attachSolarLighting(scene, 28);
    const world = buildPageWorldObjects();
    scene.add(world.worldGroup);

    let scrollProgress = 0;
    let targetCamY = 0;
    let pointerX = 0;
    let pointerY = 0;

    const updateScroll = () => {
      const max = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      scrollProgress = Math.min(1, Math.max(0, window.scrollY / max));
      targetCamY = -scrollProgress * 60;
    };

    const onPointerMove = (e: PointerEvent) => {
      pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      pointerY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.position.z = window.innerWidth < 1024 ? 11.2 : 8.2;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      updateScroll();
    };

    onResize();
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("resize", onResize);

    let frameId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      camera.position.y += (targetCamY - camera.position.y) * 0.08;
      lights.orangeLight.position.y = camera.position.y + 2;
      lights.redLight.position.y = camera.position.y - 2;

      if (!prefersReducedMotion) {
        camera.position.x += (pointerX * 0.42 - camera.position.x) * 0.05;
        camera.rotation.y = -pointerX * 0.03;
        camera.rotation.x = -pointerY * 0.02;

        world.items.forEach(({ group, mesh, cage, spec }, idx) => {
          mesh.rotation.x = elapsed * spec.rotSpeedX + scrollProgress * 4.2;
          mesh.rotation.y = elapsed * spec.rotSpeedY + scrollProgress * 5.0;
          cage.rotation.x = -elapsed * spec.rotSpeedX * 0.5;
          cage.rotation.y = -elapsed * spec.rotSpeedY * 0.5;
          group.position.y = spec.y + Math.sin(elapsed * 1.15 + idx * 0.8) * 0.24;
        });

        world.particles.rotation.y = Math.sin(elapsed * 0.12) * 0.06;
      }

      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      world.dispose();
      renderer.dispose();
    };
  }, [prefersReducedMotion]);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden opacity-85"
    />
  );
}
