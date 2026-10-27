"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { attachSolarLighting } from "@/lib/three/lighting";
import { buildPipelineStackScene } from "@/lib/three/pipeline-scene";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface PipelineEngine3DProps {
  activeStageIndex: number;
  onSelectStage?: (index: number) => void;
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

  const onSelectRef = useRef(onSelectStage);
  onSelectRef.current = onSelectStage;

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
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 50);
    // Centered framing with balanced top & bottom margins for the bottom plate
    camera.position.set(0, -0.10, 5.4);
    camera.lookAt(0, -0.10, 0);

    attachSolarLighting(scene, 22);

    const accentLight = new THREE.DirectionalLight(0xffedd5, 1.5);
    accentLight.position.set(-3, 3, 3);
    scene.add(accentLight);

    const frontFillLight = new THREE.DirectionalLight(0xffffff, 1.2);
    frontFillLight.position.set(0, 0, 4);
    scene.add(frontFillLight);

    const pipeline = buildPipelineStackScene();
    scene.add(pipeline.rootGroup);

    // Completely straight alignment
    pipeline.rootGroup.rotation.y = 0;
    pipeline.rootGroup.rotation.x = 0;
    pipeline.rootGroup.rotation.z = 0;

    const resize = () => {
      const w = container.clientWidth || 380;
      const h = container.clientHeight || 560;
      renderer.setSize(w, h);
      const aspect = w / h;
      camera.aspect = aspect;

      // Frame the entire stack (spread height ~3.5 units with expanded slab, width ~2.65 units)
      const fovRad = THREE.MathUtils.degToRad(camera.fov / 2);
      const requiredZForHeight = (3.5 / 2) / Math.tan(fovRad); // ~ 5.55
      const requiredZForWidth = (2.65 / 2) / (aspect * Math.tan(fovRad));
      camera.position.x = 0;
      camera.position.y = -0.10;
      camera.position.z = Math.max(requiredZForHeight, requiredZForWidth, 5.3);
      camera.lookAt(0, -0.10, 0);
      camera.updateProjectionMatrix();
    };
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    // Interactive pointer selection on 3D slabs
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (event: MouseEvent) => {
      if (!onSelectRef.current) return;
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      for (let i = 0; i < pipeline.slabs.length; i++) {
        const slab = pipeline.slabs[i]!;
        const targets = [slab.slabMesh, slab.compactPlate, slab.expandedPlate];
        const intersects = raycaster.intersectObjects(targets, true);
        if (intersects.length > 0) {
          onSelectRef.current(i);
          break;
        }
      }
    };
    renderer.domElement.addEventListener("pointerdown", handlePointerDown);

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
          const targetY = activeSlab.group.position.y;
          pipeline.scannerBar.position.y +=
            (targetY - pipeline.scannerBar.position.y) * 0.085;

          // Follow active slab in Z
          const targetZ = activeSlab.group.position.z;
          pipeline.scannerBar.position.z +=
            (targetZ - pipeline.scannerBar.position.z) * 0.085;

          // Pulse scanner light intensity
          pipeline.scannerLight.intensity = 2.4 + Math.sin(t * 3.8) * 0.8;
        }

        // 2. Base Bar offset when lower slabs push down
        const baseBarTargetY = -1.40 - (currentActive < 5 ? 0.24 : 0.26);
        pipeline.baseBar.position.y +=
          (baseBarTargetY - pipeline.baseBar.position.y) * 0.08;

        // 3. Animate each stage slab in the stack
        pipeline.slabs.forEach((slab, i) => {
          const isActive = i === currentActive;

          // Accordion spacing: slabs above shift up, slabs below shift down
          let targetYOffset = 0;
          if (i < currentActive) {
            targetYOffset = 0.24; // Push upper slabs up
          } else if (i > currentActive) {
            targetYOffset = -0.24; // Push lower slabs down
          }

          // Subtle breathing wave
          const wave = Math.sin(t * 1.5 + i * 0.7) * 0.006;
          const targetY = slab.yPosition + targetYOffset + wave;
          slab.group.position.y += (targetY - slab.group.position.y) * 0.09;

          // Forward offset in Z for active slab (projects straight toward viewer)
          const targetZ = isActive ? 0.38 : 0;
          slab.group.position.z += (targetZ - slab.group.position.z) * 0.09;

          // Expand / contract physical slab mesh and wireframe
          const targetScaleX = isActive ? 1.21 : 1.0;
          const targetScaleY = isActive ? 3.7 : 1.0;
          slab.slabMesh.scale.x += (targetScaleX - slab.slabMesh.scale.x) * 0.09;
          slab.slabMesh.scale.y += (targetScaleY - slab.slabMesh.scale.y) * 0.09;
          slab.edgeLine.scale.x = slab.slabMesh.scale.x;
          slab.edgeLine.scale.y = slab.slabMesh.scale.y;

          // Compact plate transition: fade out when active, in when inactive
          const targetCompactOpacity = isActive ? 0.0 : 0.95;
          slab.compactMaterial.opacity = THREE.MathUtils.lerp(
            slab.compactMaterial.opacity,
            targetCompactOpacity,
            0.12
          );
          slab.compactPlate.visible = slab.compactMaterial.opacity > 0.02;

          // Expanded plate transition: unfold vertically and fade in when active
          const targetExpandedOpacity = isActive ? 1.0 : 0.0;
          slab.expandedMaterial.opacity = THREE.MathUtils.lerp(
            slab.expandedMaterial.opacity,
            targetExpandedOpacity,
            0.12
          );
          const targetExpandedScaleY = isActive ? 1.0 : 0.001;
          slab.expandedPlate.scale.y = THREE.MathUtils.lerp(
            slab.expandedPlate.scale.y,
            targetExpandedScaleY,
            0.12
          );
          slab.expandedPlate.visible = slab.expandedMaterial.opacity > 0.02;

          // Move featureGroup to stay on top of the expanding slab
          if (slab.featureGroup) {
            const currentMeshHeight = 0.20 * slab.slabMesh.scale.y;
            slab.featureGroup.position.y = currentMeshHeight / 2 + 0.03;
            if (isActive) {
              slab.featureGroup.rotation.y = Math.sin(t * 1.2) * 0.15;
            }
          }

          // Emissive glow highlighting
          const targetEmissive = isActive ? 0.65 : 0.15;
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
        });

        // 4. Ambient vertical data pulses drift up through the stack
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
              const newY = currentY + 0.012;
              arr[idxY] = newY > 1.7 ? -1.7 : newY;
            }
          }
          posAttr.needsUpdate = true;
        }
      } else {
        // Snappy positioning for reduced motion
        const activeSlab = pipeline.slabs[currentActive];
        if (activeSlab) {
          pipeline.scannerBar.position.y = activeSlab.yPosition;
          pipeline.scannerBar.position.z = 0.38;
        }
        const baseBarTargetY = -1.40 - (currentActive < 5 ? 0.24 : 0.26);
        pipeline.baseBar.position.y = baseBarTargetY;

        pipeline.slabs.forEach((slab, i) => {
          const isActive = i === currentActive;
          let targetYOffset = 0;
          if (i < currentActive) targetYOffset = 0.24;
          else if (i > currentActive) targetYOffset = -0.24;

          slab.group.position.y = slab.yPosition + targetYOffset;
          slab.group.position.z = isActive ? 0.38 : 0;
          slab.slabMesh.scale.x = isActive ? 1.21 : 1.0;
          slab.slabMesh.scale.y = isActive ? 3.7 : 1.0;
          slab.edgeLine.scale.x = slab.slabMesh.scale.x;
          slab.edgeLine.scale.y = slab.slabMesh.scale.y;

          slab.compactMaterial.opacity = isActive ? 0.0 : 0.95;
          slab.compactPlate.visible = !isActive;

          slab.expandedMaterial.opacity = isActive ? 1.0 : 0.0;
          slab.expandedPlate.scale.y = isActive ? 1.0 : 0.001;
          slab.expandedPlate.visible = isActive;

          if (slab.featureGroup) {
            slab.featureGroup.position.y = (0.20 * slab.slabMesh.scale.y) / 2 + 0.03;
          }
          slab.slabMaterial.emissiveIntensity = isActive ? 0.65 : 0.15;
          slab.edgeMaterial.opacity = isActive ? 1.0 : 0.45;
        });
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
      renderer.domElement.removeEventListener("pointerdown", handlePointerDown);
      pipeline.dispose();
      renderer.dispose();
    };
  }, [prefersReducedMotion]);

  if (!webglSupported) return null;

  return (
    <div
      className={cn(
        "relative w-full h-[520px] sm:h-[560px] lg:h-[600px] select-none",
        className
      )}
    >
      {/* Pure, straight front-facing WebGL Canvas with expanding stage plates */}
      <div
        ref={containerRef}
        aria-label="Interactive 3D verification pipeline stack"
        className="w-full h-full cursor-pointer"
      />
    </div>
  );
}
