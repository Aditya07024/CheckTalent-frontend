"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface LanguageNodeSpec {
  symbol: string;
  name: string;
  primaryHex: string;
  accentHex: string;
  orbitRadius: number;
  orbitAngle: number;
  yOffset: number;
  speed: number;
}

const LANGUAGE_NODES: ReadonlyArray<LanguageNodeSpec> = [
  {
    symbol: "TS",
    name: "TypeScript",
    primaryHex: "#EA580C",
    accentHex: "#FDE047",
    orbitRadius: 2.55,
    orbitAngle: 0,
    yOffset: 0.48,
    speed: 0.42,
  },
  {
    symbol: "JSX",
    name: "React",
    primaryHex: "#F59E0B",
    accentHex: "#FEF08A",
    orbitRadius: 2.65,
    orbitAngle: Math.PI * 0.25,
    yOffset: -0.42,
    speed: 0.42,
  },
  {
    symbol: "PY",
    name: "Python",
    primaryHex: "#EAB308",
    accentHex: "#FFFBEB",
    orbitRadius: 2.5,
    orbitAngle: Math.PI * 0.5,
    yOffset: 0.55,
    speed: 0.42,
  },
  {
    symbol: "NODE",
    name: "Node.js",
    primaryHex: "#DC2626",
    accentHex: "#FDBA74",
    orbitRadius: 2.7,
    orbitAngle: Math.PI * 0.75,
    yOffset: -0.35,
    speed: 0.42,
  },
  {
    symbol: "GO",
    name: "Go",
    primaryHex: "#D97706",
    accentHex: "#FDE68A",
    orbitRadius: 2.55,
    orbitAngle: Math.PI,
    yOffset: 0.42,
    speed: 0.42,
  },
  {
    symbol: "RS",
    name: "Rust",
    primaryHex: "#C2410C",
    accentHex: "#FED7AA",
    orbitRadius: 2.65,
    orbitAngle: Math.PI * 1.25,
    yOffset: -0.5,
    speed: 0.42,
  },
  {
    symbol: "SQL",
    name: "SQL Data",
    primaryHex: "#EF4444",
    accentHex: "#FEF08A",
    orbitRadius: 2.5,
    orbitAngle: Math.PI * 1.5,
    yOffset: 0.38,
    speed: 0.42,
  },
  {
    symbol: "GIT",
    name: "Git AST",
    primaryHex: "#B91C1C",
    accentHex: "#FCD34D",
    orbitRadius: 2.68,
    orbitAngle: Math.PI * 1.75,
    yOffset: -0.4,
    speed: 0.42,
  },
];

function createLanguageTileTexture(
  symbol: string,
  name: string,
  primaryHex: string,
  accentHex: string
): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    const grad = ctx.createLinearGradient(0, 0, size, size);
    grad.addColorStop(0, primaryHex);
    grad.addColorStop(1, "#23140D");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);

    ctx.strokeStyle = accentHex;
    ctx.lineWidth = 10;
    ctx.strokeRect(14, 14, size - 28, size - 28);

    // Top corner solar-yellow verification dot
    ctx.fillStyle = "#FACC15";
    ctx.beginPath();
    ctx.arc(size - 38, 38, 10, 0, Math.PI * 2);
    ctx.fill();

    // Bold monospace language symbol
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 74px ui-monospace, SFMono-Regular, Menlo, monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(symbol, size / 2, size / 2 - 12);

    // Subtitle label
    ctx.fillStyle = accentHex;
    ctx.font = "600 26px system-ui, -apple-system, sans-serif";
    ctx.fillText(name.toUpperCase(), size / 2, size - 48);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

interface LanguageOrbit3DProps {
  className?: string;
}

/**
 * Interactive Three.js 3D Polyglot Verification Constellation in
 * warm Solar Yellow, Tangerine Orange, and Vermilion Red.
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

    const width = container.clientWidth || 540;
    const height = container.clientHeight || 245;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.35, 6.9);
    camera.lookAt(0, 0, 0);

    // Warm solar studio lighting (yellow, orange, red)
    const ambientLight = new THREE.AmbientLight(0xfff7ed, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfef08a, 1.9);
    keyLight.position.set(4, 6, 5);
    scene.add(keyLight);

    const orangeRim = new THREE.PointLight(0xf97316, 2.6, 12);
    orangeRim.position.set(-3.5, 2, 3);
    scene.add(orangeRim);

    const redRim = new THREE.PointLight(0xef4444, 2.4, 12);
    redRim.position.set(3.5, -2, 3);
    scene.add(redRim);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Central Solar-Orange Verification Core + Golden Wireframe Halo
    const coreGeo = new THREE.OctahedronGeometry(0.72, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xf97316,
      emissive: 0xea580c,
      emissiveIntensity: 0.42,
      roughness: 0.2,
      metalness: 0.35,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    rootGroup.add(coreMesh);

    const haloGeo = new THREE.IcosahedronGeometry(1.04, 1);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xfacc15,
      wireframe: true,
      transparent: true,
      opacity: 0.42,
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    rootGroup.add(haloMesh);

    // Two tilted warm orbital rings (Gold + Vermilion Red)
    const ringGeo1 = new THREE.TorusGeometry(2.6, 0.015, 12, 96);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.4,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI * 0.42;
    ring1.rotation.y = Math.PI * 0.08;
    rootGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(2.6, 0.013, 12, 96);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xef4444,
      transparent: true,
      opacity: 0.3,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI * 0.42;
    ring2.rotation.y = -Math.PI * 0.1;
    rootGroup.add(ring2);

    const cubeGeo = new THREE.BoxGeometry(0.66, 0.66, 0.66);
    const disposables: Array<{ dispose: () => void }> = [
      coreGeo,
      coreMat,
      haloGeo,
      haloMat,
      ringGeo1,
      ringMat1,
      ringGeo2,
      ringMat2,
      cubeGeo,
    ];

    const languageMeshes: Array<{
      mesh: THREE.Mesh;
      lineGeom: THREE.BufferGeometry;
      spec: LanguageNodeSpec;
    }> = [];

    LANGUAGE_NODES.forEach((spec) => {
      const faceTexture = createLanguageTileTexture(
        spec.symbol,
        spec.name,
        spec.primaryHex,
        spec.accentHex
      );
      const tileMat = new THREE.MeshStandardMaterial({
        map: faceTexture,
        roughness: 0.24,
        metalness: 0.16,
      });

      const mesh = new THREE.Mesh(cubeGeo, tileMat);
      const x = Math.cos(spec.orbitAngle) * spec.orbitRadius;
      const z = Math.sin(spec.orbitAngle) * spec.orbitRadius;
      mesh.position.set(x, spec.yOffset, z);
      rootGroup.add(mesh);

      const lineGeom = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        mesh.position.clone(),
      ]);
      const lineMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(spec.primaryHex),
        transparent: true,
        opacity: 0.42,
      });
      const beam = new THREE.Line(lineGeom, lineMat);
      rootGroup.add(beam);

      disposables.push(faceTexture, tileMat, lineGeom, lineMat);
      languageMeshes.push({ mesh, lineGeom, spec });
    });

    let targetRotX = 0.08;
    let targetRotY = 0;

    const handlePointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      targetRotY = nx * 0.45;
      targetRotX = 0.08 + ny * 0.25;
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
        coreMesh.rotation.y = elapsed * 0.7;
        coreMesh.rotation.x = Math.sin(elapsed * 0.5) * 0.25;
        haloMesh.rotation.y = -elapsed * 0.35;
        haloMesh.rotation.z = elapsed * 0.2;

        languageMeshes.forEach(({ mesh, lineGeom, spec }, idx) => {
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

        rootGroup.rotation.y += (targetRotY - rootGroup.rotation.y) * 0.06;
        rootGroup.rotation.x += (targetRotX - rootGroup.rotation.x) * 0.06;

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
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
    };
  }, [prefersReducedMotion]);

  if (!webglSupported) {
    return (
      <div
        className={cn(
          "flex h-52 items-center justify-center rounded-lg border border-orange-200 bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 p-4",
          className
        )}
      >
        <div className="flex flex-wrap justify-center gap-2">
          {LANGUAGE_NODES.map((lang) => (
            <span
              key={lang.symbol}
              className="rounded-md border border-orange-200 bg-white px-3 py-1.5 font-mono text-xs font-bold shadow-sm"
              style={{ color: lang.primaryHex }}
            >
              {lang.symbol} · {lang.name}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative h-[225px] sm:h-[245px] w-full overflow-hidden rounded-xl border border-orange-300/80 bg-gradient-to-br from-[#1F140D] via-[#2E190E] to-[#3B1310] shadow-inner",
        className
      )}
    >
      {/* Top 3D Stage Telemetry Overlay */}
      <div className="pointer-events-none absolute inset-x-3 top-2.5 z-10 flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-black/55 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-amber-300 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
          3D POLYGLOT ADAPTER CONSTELLATION
        </span>
        <span className="hidden sm:inline-block rounded-full border border-orange-300/25 bg-black/50 px-2.5 py-0.5 font-mono text-[10px] text-orange-200 backdrop-blur-sm">
          MOVE CURSOR TO ORBIT · 8 LANGUAGES
        </span>
      </div>

      {/* Three.js Canvas Mount */}
      <div
        ref={containerRef}
        aria-label="Interactive 3D constellation of supported programming languages orbiting the Proof of Skill verification core"
        className="h-full w-full cursor-grab active:cursor-grabbing"
      />

      {/* Bottom Language Pills Legend */}
      <div className="pointer-events-none absolute inset-x-3 bottom-2 z-10 flex flex-wrap items-center justify-center gap-1.5">
        {LANGUAGE_NODES.map((node) => (
          <span
            key={node.symbol}
            className="inline-flex items-center gap-1 rounded border border-orange-200/20 bg-black/55 px-1.5 py-0.5 font-mono text-[9px] font-semibold text-amber-50 backdrop-blur-sm"
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: node.accentHex }}
            />
            {node.name}
          </span>
        ))}
      </div>
    </div>
  );
}
