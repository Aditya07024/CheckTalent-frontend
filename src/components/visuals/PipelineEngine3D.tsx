"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { attachSolarLighting } from "@/lib/three/lighting";
import { buildPipelineStackScene } from "@/lib/three/pipeline-scene";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Layers3, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface PipelineEngine3DProps {
  activeStageIndex: number;
  onSelectStage?: (stageId: string) => void;
  className?: string;
}

export function PipelineEngine3D({
  activeStageIndex,
  onSelectStage,
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

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 50);
    camera.position.set(2.8, 1.2, 5.8);
    camera.lookAt(0, 0, 0);

    attachSolarLighting(scene, 18);

    const pipeline = buildPipelineStackScene();
    scene.add(pipeline.rootGroup);

    const resize = () => {
      const w = container.clientWidth || 320;
      const h = container.clientHeight || 460;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.position.z = w < 480 ? 6.8 : 5.8;
      camera.position.x = w < 480 ? 2.0 : 2.8;
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
    };
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    // Pointer-driven isometric tilt
    let targetRotY = -0.45;
    let targetRotX = 0.22;
    const baseRotY = -0.45;
    const baseRotX = 0.22;

    const onPointerMove = (e: PointerEvent) => {
      const r = container.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
      const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
      targetRotY = baseRotY + nx * 0.35;
      targetRotX = baseRotX + ny * 0.22;
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
            (targetY - pipeline.scannerBar.position.y) * 0.08;

          // Pulse scanner light intensity
          pipeline.scannerLight.intensity = 2.0 + Math.sin(t * 3.5) * 0.8;
        }

        // 2. Animate each stage slab in the stack
        pipeline.slabs.forEach((slab, i) => {
          const isActive = i === currentActive;

          // Target forward offset in Z for active slab (projects out toward viewer)
          const targetZ = isActive ? 0.32 : 0;
          slab.group.position.z += (targetZ - slab.group.position.z) * 0.08;

          // Gentle floating wave
          const wave = Math.sin(t * 1.8 + i * 0.7) * 0.02;
          slab.group.position.y = slab.yPosition + wave;

          // Emissive glow highlighting
          const targetEmissive = isActive ? 0.55 : 0.12;
          slab.slabMaterial.emissiveIntensity = THREE.MathUtils.lerp(
            slab.slabMaterial.emissiveIntensity,
            targetEmissive,
            0.08
          );

          // Edge line brightness
          const targetOpacity = isActive ? 0.95 : 0.35;
          slab.edgeMaterial.opacity = THREE.MathUtils.lerp(
            slab.edgeMaterial.opacity,
            targetOpacity,
            0.08
          );

          // Subtle spin on the 3D feature on the active slab
          if (isActive && slab.featureGroup) {
            slab.featureGroup.rotation.y = Math.sin(t * 1.2) * 0.15;
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
              const newY = currentY + 0.015;
              arr[idxY] = newY > 2.8 ? -2.8 : newY;
            }
          }
          posAttr.needsUpdate = true;
        }

        // 4. Smooth root group tilt to mouse pointer (isometric)
        const root = pipeline.rootGroup;
        root.rotation.y += (targetRotY - root.rotation.y) * 0.05;
        root.rotation.x += (targetRotX - root.rotation.x) * 0.05;
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
    <div className={cn("relative flex flex-col justify-between overflow-hidden rounded-2xl", className)}>
      {/* Top HUD Label */}
      <div className="pointer-events-none absolute left-4 right-4 top-4 z-10 flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-300/80 bg-white/95 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-orange-950 shadow-sm backdrop-blur-sm">
          <Layers3 className="h-3.5 w-3.5 text-orange-600" />
          PIPELINE STACK ARCHITECTURE · 3D
        </span>
        <span className="inline-flex items-center gap-1 rounded-full border border-amber-300/80 bg-amber-50/95 px-2.5 py-1 font-mono text-[10px] font-bold text-amber-900 shadow-sm backdrop-blur-sm">
          <Sparkles className="h-2.5 w-2.5 text-amber-600" />
          STAGE 0{activeStageIndex + 1} SCANNING
        </span>
      </div>

      {/* WebGL Canvas */}
      <div
        ref={containerRef}
        aria-hidden="true"
        className="h-[440px] w-full cursor-grab active:cursor-grabbing sm:h-[480px] lg:h-[500px]"
      />

      {/* Bottom Stage Switcher Strip */}
      <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between rounded-xl border border-orange-200/90 bg-white/95 px-3.5 py-2 shadow-sm backdrop-blur-md">
        <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink-muted">
          STACK LAYERS
        </span>
        <div className="flex items-center gap-1.5">
          {["01", "02", "03", "04", "05", "06"].map((num, idx) => {
            const isCurrent = idx === activeStageIndex;
            return (
              <button
                key={num}
                type="button"
                onClick={() => {
                  const stageIds = [
                    "stage-inputs",
                    "stage-repo-intel",
                    "stage-viva",
                    "stage-validation",
                    "stage-proof-card",
                    "stage-recruiter",
                  ];
                  onSelectStage?.(stageIds[idx]!);
                }}
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-lg font-mono text-xs font-bold transition-all",
                  isCurrent
                    ? "bg-gradient-to-br from-amber-500 via-orange-600 to-red-600 text-white shadow-sm scale-110"
                    : "border border-orange-200 bg-orange-50/80 text-orange-900 hover:bg-orange-100"
                )}
                aria-label={`Select Stage ${num}`}
              >
                {num}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
