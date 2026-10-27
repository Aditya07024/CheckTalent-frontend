"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { attachSolarLighting } from "@/lib/three/lighting";
import { buildPipelineStackScene } from "@/lib/three/pipeline-scene";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface PipelineEngine3DProps {
  activeStageIndex: number;
  className?: string;
}

export function PipelineEngine3D({
  activeStageIndex,
  className,
}: PipelineEngine3DProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const [webglSupported, setWebglSupported] = useState(true);

  const activeIndexRef = useRef(activeStageIndex);
  activeIndexRef.current = activeStageIndex;

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

    // High quality DPR up to 2.0 for Retina sharpness
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.0));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 60);
    camera.position.set(3.2, 1.4, 6.2);
    camera.lookAt(0, 0, 0);

    attachSolarLighting(scene, 22);

    // Extra warm accent directional light for metallic sheen
    const accentLight = new THREE.DirectionalLight(0xffedd5, 1.5);
    accentLight.position.set(-4, 3, 2);
    scene.add(accentLight);

    const pipeline = buildPipelineStackScene();
    scene.add(pipeline.rootGroup);

    const resize = () => {
      const w = container.clientWidth || 400;
      const h = container.clientHeight || 650;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.position.z = w < 540 ? 7.8 : 6.2;
      camera.position.x = w < 540 ? 2.2 : 3.2;
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
    };
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    // Subtle isometric mouse tilt tracking
    let targetRotY = -0.42;
    let targetRotX = 0.24;
    const baseRotY = -0.42;
    const baseRotX = 0.24;

    const onPointerMove = (e: PointerEvent) => {
      const r = container.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
      const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
      targetRotY = baseRotY + nx * 0.3;
      targetRotX = baseRotX + ny * 0.18;
    };

    const onPointerLeave = () => {
      targetRotY = baseRotY;
      targetRotX = baseRotX;
    };

    container.addEventListener("pointermove", onPointerMove, { passive: true });
    container.addEventListener("pointerleave", onPointerLeave, { passive: true });

    let isVisible = true;
    let isRunning = false;
    let frameId = 0;
    const clock = new THREE.Clock();

    const tick = () => {
      if (!isRunning) return;
      frameId = window.requestAnimationFrame(tick);
      const t = clock.getElapsedTime();
      const currentActive = activeIndexRef.current;

      if (!prefersReducedMotion) {
        // 1. Smoothly glide Scanner Carriage to current active stage slab
        const activeSlab = pipeline.slabs[currentActive];
        if (activeSlab) {
          const targetY = activeSlab.yPosition;
          pipeline.scannerBar.position.y +=
            (targetY - pipeline.scannerBar.position.y) * 0.085;

          // Pulse scanner light intensity
          pipeline.scannerLight.intensity = 2.8 + Math.sin(t * 3.8) * 1.0;
        }

        // 2. Animate each stage slab in the stack
        pipeline.slabs.forEach((slab, i) => {
          const isActive = i === currentActive;

          // Target forward offset in Z for active slab (projects out toward viewer)
          const targetZ = isActive ? 0.38 : 0;
          slab.group.position.z += (targetZ - slab.group.position.z) * 0.09;

          // Gentle floating wave
          const wave = Math.sin(t * 1.6 + i * 0.75) * 0.025;
          slab.group.position.y = slab.yPosition + wave;

          // Emissive glow highlighting
          const targetEmissive = isActive ? 0.7 : 0.15;
          slab.slabMaterial.emissiveIntensity = THREE.MathUtils.lerp(
            slab.slabMaterial.emissiveIntensity,
            targetEmissive,
            0.08
          );

          // Edge line brightness
          const targetOpacity = isActive ? 1.0 : 0.45;
          slab.edgeMaterial.opacity = THREE.MathUtils.lerp(
            slab.edgeMaterial.opacity,
            targetOpacity,
            0.08
          );

          // Subtle spin on the 3D feature on the active slab
          if (isActive && slab.featureGroup) {
            slab.featureGroup.rotation.y = Math.sin(t * 1.4) * 0.2;
          }
        });

        // 3. Ambient vertical data pulses drift up through the stack
        const posAttr = pipeline.dataPulses.geometry.getAttribute(
          "position"
        ) as THREE.BufferAttribute | undefined;
        if (posAttr && posAttr.array) {
          const arr = posAttr.array as Float32Array;
          const count = arr.length / 3;
          for (let p = 0; p < count; p++) {
            const idxY = p * 3 + 1;
            const currentY = arr[idxY];
            if (typeof currentY === "number") {
              const newY = currentY + 0.018;
              arr[idxY] = newY > 3.2 ? -3.2 : newY;
            }
          }
          posAttr.needsUpdate = true;
        }

        // 4. Smooth root group tilt to mouse pointer
        const root = pipeline.rootGroup;
        root.rotation.y += (targetRotY - root.rotation.y) * 0.06;
        root.rotation.x += (targetRotX - root.rotation.x) * 0.06;
      }

      renderer.render(scene, camera);
    };

    const startLoop = () => {
      if (isRunning || !isVisible || document.hidden) return;
      isRunning = true;
      clock.start();
      tick();
    };

    const stopLoop = () => {
      if (!isRunning) return;
      isRunning = false;
      window.cancelAnimationFrame(frameId);
      clock.stop();
    };

    const io = new IntersectionObserver((entries) => {
      isVisible = entries[0]?.isIntersecting ?? false;
      if (isVisible) {
        startLoop();
      } else {
        stopLoop();
      }
    });
    io.observe(container);

    const onVisibilityChange = () => {
      if (document.hidden) {
        stopLoop();
      } else if (isVisible) {
        startLoop();
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    startLoop();

    return () => {
      stopLoop();
      resizeObserver.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
      pipeline.dispose();
      renderer.dispose();
    };
  }, [prefersReducedMotion]);

  if (!webglSupported) return null;

  return (
    <div className={cn("relative w-full h-full min-h-[520px] sm:min-h-[600px] lg:min-h-[700px]", className)}>
      {/* Pure, borderless, open-air WebGL Canvas floating on screen */}
      <div
        ref={containerRef}
        aria-hidden="true"
        className="w-full h-full min-h-[520px] sm:min-h-[600px] lg:min-h-[700px] cursor-grab active:cursor-grabbing"
      />
    </div>
  );
}
