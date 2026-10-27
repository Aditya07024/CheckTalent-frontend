import * as THREE from "three";

export interface PipelineStageSlab {
  index: number;
  id: string;
  label: string;
  group: THREE.Group;
  slabMesh: THREE.Mesh;
  slabMaterial: THREE.MeshPhysicalMaterial;
  edgeLine: THREE.LineSegments;
  edgeMaterial: THREE.LineBasicMaterial;
  featureGroup: THREE.Group;
  yPosition: number;
  baseX: number;
  baseZ: number;
}

export interface BuiltPipelineStackScene {
  rootGroup: THREE.Group;
  slabs: PipelineStageSlab[];
  scannerBar: THREE.Group;
  scannerLight: THREE.PointLight;
  guidePillars: THREE.Group;
  dataPulses: THREE.Points;
  dispose: () => void;
}

const STAGE_METADATA = [
  {
    id: "stage-inputs",
    code: "01",
    tag: "CONSENT INTAKE",
    label: "STAGE 01 · RESUME & PROJECTS",
    color: 0xf59e0b, // Amber-500
    emissive: 0xd97706,
  },
  {
    id: "stage-repo-intel",
    code: "02",
    tag: "AST CODE MAP",
    label: "STAGE 02 · REPO INTELLIGENCE",
    color: 0xea580c, // Orange-600
    emissive: 0xc2410c,
  },
  {
    id: "stage-viva",
    code: "03",
    tag: "CODE DEFENSE",
    label: "STAGE 03 · AI TECHNICAL VIVA",
    color: 0xdc2626, // Red-600
    emissive: 0xb91c1c,
  },
  {
    id: "stage-validation",
    code: "04",
    tag: "EVIDENCE CHECK",
    label: "STAGE 04 · EVIDENCE VALIDATION",
    color: 0xf97316, // Orange-500
    emissive: 0xea580c,
  },
  {
    id: "stage-proof-card",
    code: "05",
    tag: "PROOF RECORD",
    label: "STAGE 05 · SKILL PROOF CARD",
    color: 0xeab308, // Gold-500
    emissive: 0xca8a04,
  },
  {
    id: "stage-recruiter",
    code: "06",
    tag: "HUMAN GATE",
    label: "STAGE 06 · RECRUITER REVIEW",
    color: 0xb91c1c, // Crimson Red
    emissive: 0x991b1b,
  },
] as const;

/**
 * Creates ultra-sharp high-resolution texture plates with exact 10:1 aspect ratio
 * matching the 3D plane geometry (zero horizontal stretching/distortion).
 */
function createHighResTextPlate(
  stageCode: string,
  title: string,
  tag: string,
  colorHex: string
): THREE.CanvasTexture {
  const width = 1280;
  const height = 128;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Background: Deep espresso glass slab with gradient
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, "#1F1713");
  bgGrad.addColorStop(1, "#120B08");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Outer border with soft glow
  ctx.strokeStyle = colorHex;
  ctx.lineWidth = 4;
  ctx.strokeRect(3, 3, width - 6, height - 6);

  // Inner subtle accent frame
  ctx.strokeStyle = "rgba(255, 255, 255, 0.10)";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(8, 8, width - 16, height - 16);

  // Stage Number Badge on the left
  ctx.fillStyle = colorHex;
  ctx.beginPath();
  ctx.roundRect(16, 16, 68, 96, 10);
  ctx.fill();

  ctx.fillStyle = "#120B08";
  ctx.font = "bold 44px ui-monospace, SFMono-Regular, Menlo, monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(stageCode, 50, 64);

  // Stage Title in Kanit / clean sans
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "600 32px 'Kanit', system-ui, -apple-system, sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText(title, 102, 44);

  // Tag Badge on bottom
  ctx.fillStyle = "rgba(255, 255, 255, 0.12)";
  ctx.beginPath();
  ctx.roundRect(102, 70, 240, 36, 8);
  ctx.fill();

  ctx.fillStyle = colorHex;
  ctx.font = "bold 18px ui-monospace, SFMono-Regular, Menlo, monospace";
  ctx.fillText(`• ${tag}`, 118, 88);

  // Right telemetry indicator
  ctx.fillStyle = colorHex;
  ctx.beginPath();
  ctx.arc(width - 120, 64, 5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgba(255, 255, 255, 0.70)";
  ctx.font = "bold 18px ui-monospace, SFMono-Regular, Menlo, monospace";
  ctx.textAlign = "left";
  ctx.fillText("ACTIVE", width - 106, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}

/**
 * Creates high-res 1344x96 front console screen for the bottom chassis bar (exact 14:1 ratio).
 */
function createBaseConsoleTexture(): THREE.CanvasTexture {
  const width = 1344;
  const height = 96;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const grad = ctx.createLinearGradient(0, 0, width, height);
  grad.addColorStop(0, "#19110D");
  grad.addColorStop(1, "#0E0907");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Border frame
  ctx.strokeStyle = "#F59E0B";
  ctx.lineWidth = 3;
  ctx.strokeRect(3, 3, width - 6, height - 6);

  // Status LED circle
  ctx.fillStyle = "#F59E0B";
  ctx.beginPath();
  ctx.arc(32, 48, 6, 0, Math.PI * 2);
  ctx.fill();

  // Status text
  ctx.fillStyle = "#F59E0B";
  ctx.font = "bold 18px ui-monospace, SFMono-Regular, Menlo, monospace";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText("CHASSIS // BASE", 48, 48);

  // Center title
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "600 22px 'Kanit', system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("TALENTLENS VERIFICATION PIPELINE", width / 2, 48);

  // Right telemetry
  ctx.fillStyle = "#FBBF24";
  ctx.font = "bold 18px ui-monospace, SFMono-Regular, Menlo, monospace";
  ctx.textAlign = "right";
  ctx.fillText("STAGES 01–06 • ACTIVE", width - 24, 48);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
}

export function buildPipelineStackScene(): BuiltPipelineStackScene {
  const rootGroup = new THREE.Group();
  const disposables: Array<{ dispose: () => void }> = [];

  // Compact, sleek front-facing server stack (reduced width for clean 40% column framing)
  const slabWidth = 1.95;
  const slabHeight = 0.20;
  const slabDepth = 1.15;
  const ySpacing = 0.48; // Balanced vertical length
  const totalStages = 6;
  const topY = ((totalStages - 1) * ySpacing) / 2; // (5 * 0.48) / 2 = 1.20

  const slabGeometry = new THREE.BoxGeometry(slabWidth, slabHeight, slabDepth);
  const slabEdgesGeometry = new THREE.EdgesGeometry(slabGeometry);
  disposables.push(slabGeometry, slabEdgesGeometry);

  const slabs: PipelineStageSlab[] = [];

  // Build each stage slab
  STAGE_METADATA.forEach((meta, idx) => {
    const stageGroup = new THREE.Group();
    const yPos = topY - idx * ySpacing;
    stageGroup.position.set(0, yPos, 0);

    const hexString = `#${meta.color.toString(16).padStart(6, "0")}`;

    // Slab body: High quality MeshPhysicalMaterial
    const slabMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.15,
      metalness: 0.1,
      transmission: 0.45,
      ior: 1.5,
      thickness: 0.4,
      emissive: meta.color,
      emissiveIntensity: 0.2,
      transparent: true,
      opacity: 0.96,
    });
    const slabMesh = new THREE.Mesh(slabGeometry, slabMaterial);
    stageGroup.add(slabMesh);
    disposables.push(slabMaterial);

    // Glowing slab edges
    const edgeMaterial = new THREE.LineBasicMaterial({
      color: meta.color,
      transparent: true,
      opacity: 0.75,
      linewidth: 2,
    });
    const edgeLine = new THREE.LineSegments(slabEdgesGeometry, edgeMaterial);
    stageGroup.add(edgeLine);
    disposables.push(edgeMaterial);

    // Front label plate — fits cleanly across the front face
    const labelTexture = createHighResTextPlate(
      meta.code,
      meta.label.replace(`STAGE ${meta.code} · `, ""),
      meta.tag,
      hexString
    );
    disposables.push(labelTexture);

    const labelMaterial = new THREE.MeshBasicMaterial({
      map: labelTexture,
      transparent: true,
    });
    disposables.push(labelMaterial);

    const labelPlaneGeo = new THREE.PlaneGeometry(1.80, 0.18);
    disposables.push(labelPlaneGeo);
    const labelPlane = new THREE.Mesh(labelPlaneGeo, labelMaterial);
    labelPlane.position.set(0, 0, slabDepth / 2 + 0.012);
    stageGroup.add(labelPlane);

    // Compact 3D architectural feature on top of each slab
    const featureGroup = new THREE.Group();
    featureGroup.position.set(0, slabHeight / 2 + 0.02, 0);

    if (idx === 0) {
      // Stage 01: Intake — Stacked document / repo cards
      const docGeo = new THREE.BoxGeometry(0.40, 0.025, 0.50);
      const docMat = new THREE.MeshStandardMaterial({
        color: meta.color,
        roughness: 0.3,
        metalness: 0.6,
      });
      disposables.push(docGeo, docMat);
      for (let d = 0; d < 3; d++) {
        const doc = new THREE.Mesh(docGeo, docMat);
        doc.position.set((d - 1) * 0.09, d * 0.03, (d - 1) * 0.04);
        doc.rotation.y = (d - 1) * 0.1;
        featureGroup.add(doc);
      }
    } else if (idx === 1) {
      // Stage 02: Repo Intel — AST nodes hierarchy
      const nodeGeo = new THREE.BoxGeometry(0.08, 0.08, 0.08);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: meta.color,
        emissive: meta.emissive,
        emissiveIntensity: 0.8,
        roughness: 0.2,
        metalness: 0.8,
      });
      disposables.push(nodeGeo, nodeMat);
      const coords: Array<[number, number, number]> = [
        [0, 0.12, 0],
        [-0.24, 0.06, -0.12],
        [0.24, 0.06, -0.12],
        [-0.38, 0.02, 0.12],
        [0, 0.02, 0.15],
        [0.38, 0.02, 0.12],
      ];
      coords.forEach(([x, y, z]) => {
        const node = new THREE.Mesh(nodeGeo, nodeMat);
        node.position.set(x, y, z);
        featureGroup.add(node);
      });
    } else if (idx === 2) {
      // Stage 03: Technical Viva — Pulsing 3D voice frequency spectrum bars
      const barGeo = new THREE.BoxGeometry(0.05, 0.16, 0.05);
      const barMat = new THREE.MeshStandardMaterial({
        color: meta.color,
        emissive: meta.emissive,
        emissiveIntensity: 0.9,
        roughness: 0.2,
        metalness: 0.7,
      });
      disposables.push(barGeo, barMat);
      for (let b = -3; b <= 3; b++) {
        const bar = new THREE.Mesh(barGeo, barMat);
        const heightScale = Math.sin((b + 3) * 0.5) * 0.8 + 0.35;
        bar.scale.y = heightScale;
        bar.position.set(b * 0.09, (heightScale * 0.16) / 2, 0);
        featureGroup.add(bar);
      }
    } else if (idx === 3) {
      // Stage 04: Validation — Verification rubric grid
      const gridBoxGeo = new THREE.BoxGeometry(0.12, 0.03, 0.12);
      const gridBoxMat = new THREE.MeshStandardMaterial({
        color: meta.color,
        roughness: 0.25,
        metalness: 0.8,
        emissive: meta.emissive,
        emissiveIntensity: 0.4,
      });
      disposables.push(gridBoxGeo, gridBoxMat);
      for (let gx = -1; gx <= 1; gx++) {
        for (let gz = -1; gz <= 1; gz++) {
          const gbox = new THREE.Mesh(gridBoxGeo, gridBoxMat);
          gbox.position.set(gx * 0.20, 0.02, gz * 0.20);
          featureGroup.add(gbox);
        }
      }
    } else if (idx === 4) {
      // Stage 05: Skill Proof Card — Holographic diamond crest
      const prismGeo = new THREE.OctahedronGeometry(0.15, 0);
      const prismMat = new THREE.MeshStandardMaterial({
        color: meta.color,
        emissive: meta.emissive,
        emissiveIntensity: 0.95,
        roughness: 0.1,
        metalness: 0.95,
      });
      disposables.push(prismGeo, prismMat);
      const prism = new THREE.Mesh(prismGeo, prismMat);
      prism.position.set(0, 0.12, 0);
      featureGroup.add(prism);
    } else if (idx === 5) {
      // Stage 06: Human Review — Architectural review gate
      const gateGeo = new THREE.BoxGeometry(0.50, 0.13, 0.07);
      const gateMat = new THREE.MeshStandardMaterial({
        color: meta.color,
        roughness: 0.2,
        metalness: 0.85,
        emissive: meta.emissive,
        emissiveIntensity: 0.5,
      });
      disposables.push(gateGeo, gateMat);
      const gate = new THREE.Mesh(gateGeo, gateMat);
      gate.position.set(0, 0.1, 0);
      featureGroup.add(gate);
    }

    stageGroup.add(featureGroup);
    rootGroup.add(stageGroup);

    slabs.push({
      index: idx,
      id: meta.id,
      label: meta.label,
      group: stageGroup,
      slabMesh,
      slabMaterial,
      edgeLine,
      edgeMaterial,
      featureGroup,
      yPosition: yPos,
      baseX: 0,
      baseZ: 0,
    });
  });

  // =========================================================================
  // ARCHITECTURAL MULTI-TIER BOTTOM BAR & FOUNDATION CHASSIS
  // =========================================================================
  const baseBarGroup = new THREE.Group();

  const mainBarWidth = slabWidth + 0.35; // 2.30
  const mainBarHeight = 0.18;
  const mainBarDepth = slabDepth + 0.25; // 1.40
  const mainBarY = -topY - slabHeight / 2 - 0.20 - mainBarHeight / 2; // ~ -1.59
  const baseBarTopY = mainBarY + mainBarHeight / 2; // ~ -1.50
  baseBarGroup.position.set(0, mainBarY, 0);

  // Tier 1: Sub-Base Footing Plinth (Wider, beveled foundation plate)
  const plinthWidth = mainBarWidth + 0.25; // 2.55
  const plinthHeight = 0.08;
  const plinthDepth = mainBarDepth + 0.20; // 1.60
  const plinthGeo = new THREE.BoxGeometry(plinthWidth, plinthHeight, plinthDepth);
  const plinthEdgesGeo = new THREE.EdgesGeometry(plinthGeo);
  disposables.push(plinthGeo, plinthEdgesGeo);

  const plinthMat = new THREE.MeshStandardMaterial({
    color: 0x140d0a,
    roughness: 0.3,
    metalness: 0.9,
    emissive: 0x78350f,
    emissiveIntensity: 0.2,
  });
  disposables.push(plinthMat);
  const plinthMesh = new THREE.Mesh(plinthGeo, plinthMat);
  plinthMesh.position.set(0, -mainBarHeight / 2 - plinthHeight / 2, 0);
  baseBarGroup.add(plinthMesh);

  const plinthEdgeMat = new THREE.LineBasicMaterial({
    color: 0xd97706,
    transparent: true,
    opacity: 0.6,
  });
  disposables.push(plinthEdgeMat);
  const plinthEdgeLine = new THREE.LineSegments(plinthEdgesGeo, plinthEdgeMat);
  plinthEdgeLine.position.copy(plinthMesh.position);
  baseBarGroup.add(plinthEdgeLine);

  // Tier 2: Main Machined Chassis Bar
  const mainBarGeo = new THREE.BoxGeometry(mainBarWidth, mainBarHeight, mainBarDepth);
  const mainBarEdgesGeo = new THREE.EdgesGeometry(mainBarGeo);
  disposables.push(mainBarGeo, mainBarEdgesGeo);

  const mainBarMat = new THREE.MeshStandardMaterial({
    color: 0x1f1713,
    roughness: 0.2,
    metalness: 0.92,
    emissive: 0xd97706,
    emissiveIntensity: 0.15,
  });
  disposables.push(mainBarMat);
  const mainBarMesh = new THREE.Mesh(mainBarGeo, mainBarMat);
  baseBarGroup.add(mainBarMesh);

  // Luminous Perimeter Edges for the Main Chassis Bar
  const mainBarEdgeMat = new THREE.LineBasicMaterial({
    color: 0xf59e0b,
    transparent: true,
    opacity: 0.85,
    linewidth: 2,
  });
  disposables.push(mainBarEdgeMat);
  const mainBarEdgeLine = new THREE.LineSegments(mainBarEdgesGeo, mainBarEdgeMat);
  baseBarGroup.add(mainBarEdgeLine);

  // Front Console Screen with Exact 14:1 High-Res Texture (Zero Distortion)
  const consoleTexture = createBaseConsoleTexture();
  disposables.push(consoleTexture);
  const consoleMat = new THREE.MeshBasicMaterial({
    map: consoleTexture,
    transparent: true,
  });
  disposables.push(consoleMat);
  const consoleGeo = new THREE.PlaneGeometry(2.10, 0.15);
  disposables.push(consoleGeo);
  const consolePlane = new THREE.Mesh(consoleGeo, consoleMat);
  consolePlane.position.set(0, 0, mainBarDepth / 2 + 0.012);
  baseBarGroup.add(consolePlane);

  // Left & Right Flank Cooling Heat Sink Fins (Precision industrial detail)
  const finGeo = new THREE.BoxGeometry(0.02, mainBarHeight - 0.04, 0.07);
  const finMat = new THREE.MeshStandardMaterial({
    color: 0xd97706,
    metalness: 0.95,
    roughness: 0.2,
  });
  disposables.push(finGeo, finMat);
  for (let f = -4; f <= 4; f++) {
    // Left side fins
    const leftFin = new THREE.Mesh(finGeo, finMat);
    leftFin.position.set(-mainBarWidth / 2 - 0.01, 0, f * 0.10);
    baseBarGroup.add(leftFin);

    // Right side fins
    const rightFin = new THREE.Mesh(finGeo, finMat);
    rightFin.position.set(mainBarWidth / 2 + 0.01, 0, f * 0.10);
    baseBarGroup.add(rightFin);
  }

  // Tier 3: Top Inset Collar Tray
  const trayGeo = new THREE.BoxGeometry(mainBarWidth - 0.2, 0.025, mainBarDepth - 0.2);
  const trayMat = new THREE.MeshStandardMaterial({
    color: 0x2b1e17,
    roughness: 0.25,
    metalness: 0.9,
    emissive: 0xb45309,
    emissiveIntensity: 0.25,
  });
  disposables.push(trayGeo, trayMat);
  const trayMesh = new THREE.Mesh(trayGeo, trayMat);
  trayMesh.position.set(0, mainBarHeight / 2 + 0.012, 0);
  baseBarGroup.add(trayMesh);

  // 4 Heavy Machined Flanged Pillar Sockets
  const socketBaseGeo = new THREE.CylinderGeometry(0.065, 0.075, 0.035, 16);
  const socketCollarGeo = new THREE.CylinderGeometry(0.042, 0.048, 0.055, 16);
  const socketMat = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    metalness: 0.95,
    roughness: 0.15,
    emissive: 0xd97706,
    emissiveIntensity: 0.35,
  });
  disposables.push(socketBaseGeo, socketCollarGeo, socketMat);

  const cornerOffsets: Array<[number, number]> = [
    [-slabWidth / 2 + 0.08, -slabDepth / 2 + 0.08],
    [slabWidth / 2 - 0.08, -slabDepth / 2 + 0.08],
    [-slabWidth / 2 + 0.08, slabDepth / 2 - 0.08],
    [slabWidth / 2 - 0.08, slabDepth / 2 - 0.08],
  ];

  cornerOffsets.forEach(([cx, cz]) => {
    // Socket Base Flange
    const socketBase = new THREE.Mesh(socketBaseGeo, socketMat);
    socketBase.position.set(cx, mainBarHeight / 2 + 0.02, cz);
    baseBarGroup.add(socketBase);

    // Upper Socket Collar
    const socketCollar = new THREE.Mesh(socketCollarGeo, socketMat);
    socketCollar.position.set(cx, mainBarHeight / 2 + 0.055, cz);
    baseBarGroup.add(socketCollar);
  });

  rootGroup.add(baseBarGroup);

  // 4 Guide Pillars that stand firmly on top of the bottom bar sockets
  const pillarTopY = topY + slabHeight / 2 + 0.18; // ~ 1.48
  const pillarHeight = pillarTopY - baseBarTopY; // ~ 2.98 units
  const pillarCenterY = (pillarTopY + baseBarTopY) / 2; // ~ -0.01

  const guidePillars = new THREE.Group();
  const pillarGeo = new THREE.CylinderGeometry(0.02, 0.02, pillarHeight, 16);
  const pillarMat = new THREE.MeshStandardMaterial({
    color: 0xd97706,
    metalness: 0.95,
    roughness: 0.15,
    emissive: 0x92400e,
    emissiveIntensity: 0.45,
  });
  disposables.push(pillarGeo, pillarMat);

  cornerOffsets.forEach(([cx, cz]) => {
    const pillar = new THREE.Mesh(pillarGeo, pillarMat);
    pillar.position.set(cx, pillarCenterY, cz);
    guidePillars.add(pillar);
  });
  rootGroup.add(guidePillars);

  // Active Laser Scanner Carriage
  const scannerBar = new THREE.Group();
  const scannerFrameGeo = new THREE.BoxGeometry(
    slabWidth + 0.16,
    0.038,
    slabDepth + 0.16
  );
  const scannerFrameMat = new THREE.MeshStandardMaterial({
    color: 0xf97316,
    emissive: 0xea580c,
    emissiveIntensity: 1.2,
    roughness: 0.15,
    metalness: 0.85,
  });
  disposables.push(scannerFrameGeo, scannerFrameMat);
  const scannerMesh = new THREE.Mesh(scannerFrameGeo, scannerFrameMat);
  scannerBar.add(scannerMesh);

  // Intense central laser beam
  const laserBeamGeo = new THREE.BoxGeometry(slabWidth + 0.12, 0.016, 0.016);
  const laserBeamMat = new THREE.MeshBasicMaterial({ color: 0xffedd5 });
  disposables.push(laserBeamGeo, laserBeamMat);
  const laserBeam = new THREE.Mesh(laserBeamGeo, laserBeamMat);
  laserBeam.position.set(0, 0, 0);
  scannerBar.add(laserBeam);

  const scannerLight = new THREE.PointLight(0xf97316, 2.5, 3.0);
  scannerLight.position.set(0, 0.12, 0);
  scannerBar.add(scannerLight);

  scannerBar.position.set(0, topY - ySpacing, 0);
  rootGroup.add(scannerBar);

  // Ambient Data Stream Particles
  const particleCount = 45;
  const particlePositions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    particlePositions[i * 3] = (Math.random() - 0.5) * (slabWidth + 0.3);
    particlePositions[i * 3 + 1] = (Math.random() - 0.5) * pillarHeight;
    particlePositions[i * 3 + 2] = (Math.random() - 0.5) * (slabDepth + 0.3);
  }
  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute(
    "position",
    new THREE.BufferAttribute(particlePositions, 3)
  );
  const particleMat = new THREE.PointsMaterial({
    color: 0xf59e0b,
    size: 0.04,
    transparent: true,
    opacity: 0.75,
  });
  disposables.push(particleGeo, particleMat);
  const dataPulses = new THREE.Points(particleGeo, particleMat);
  rootGroup.add(dataPulses);

  // Completely straight front-facing alignment
  rootGroup.rotation.y = 0;
  rootGroup.rotation.x = 0;
  rootGroup.rotation.z = 0;

  const dispose = () => {
    disposables.forEach((d) => d.dispose());
  };

  return {
    rootGroup,
    slabs,
    scannerBar,
    scannerLight,
    guidePillars,
    dataPulses,
    dispose,
  };
}
