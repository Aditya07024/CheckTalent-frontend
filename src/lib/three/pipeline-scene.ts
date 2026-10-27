import * as THREE from "three";

export interface PipelineStageSlab {
  index: number;
  id: string;
  label: string;
  group: THREE.Group;
  slabMesh: THREE.Mesh;
  slabMaterial: THREE.MeshStandardMaterial;
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
    label: "01 INTAKE",
    color: 0xeab308, // Yellow-500
    emissive: 0xca8a04,
  },
  {
    id: "stage-repo-intel",
    code: "02",
    label: "02 REPO INTEL",
    color: 0xf59e0b, // Amber-500
    emissive: 0xd97706,
  },
  {
    id: "stage-viva",
    code: "03",
    label: "03 TECH VIVA",
    color: 0xea580c, // Orange-600
    emissive: 0xc2410c,
  },
  {
    id: "stage-validation",
    code: "04",
    label: "04 VALIDATION",
    color: 0xdc2626, // Red-600
    emissive: 0xb91c1c,
  },
  {
    id: "stage-proof-card",
    code: "05",
    label: "05 PROOF CARD",
    color: 0xf97316, // Orange-500
    emissive: 0xea580c,
  },
  {
    id: "stage-recruiter",
    code: "06",
    label: "06 EVALUATION",
    color: 0xb91c1c, // Crimson Red
    emissive: 0x991b1b,
  },
] as const;

function createTextPlateTexture(text: string, colorHex: string): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 384;
  canvas.height = 96;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.fillStyle = "#1C1613";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Border outline
  ctx.strokeStyle = colorHex;
  ctx.lineWidth = 4;
  ctx.strokeRect(4, 4, canvas.width - 8, canvas.height - 8);

  // Label text
  ctx.font = "bold 32px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = colorHex;
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export function buildPipelineStackScene(): BuiltPipelineStackScene {
  const rootGroup = new THREE.Group();
  const disposables: Array<{ dispose: () => void }> = [];

  const slabWidth = 3.0;
  const slabHeight = 0.2;
  const slabDepth = 1.9;
  const ySpacing = 0.82;
  const totalStages = 6;
  const topY = ((totalStages - 1) * ySpacing) / 2;

  const slabGeometry = new THREE.BoxGeometry(slabWidth, slabHeight, slabDepth);
  const slabEdgesGeometry = new THREE.EdgesGeometry(slabGeometry);
  disposables.push(slabGeometry, slabEdgesGeometry);

  const slabs: PipelineStageSlab[] = [];

  // Build each stage slab
  STAGE_METADATA.forEach((meta, idx) => {
    const stageGroup = new THREE.Group();
    const yPos = topY - idx * ySpacing;
    stageGroup.position.set(0, yPos, 0);

    // Slab body
    const slabMaterial = new THREE.MeshStandardMaterial({
      color: 0xfaf7f2,
      roughness: 0.28,
      metalness: 0.65,
      emissive: meta.color,
      emissiveIntensity: 0.15,
      transparent: true,
      opacity: 0.92,
    });
    const slabMesh = new THREE.Mesh(slabGeometry, slabMaterial);
    stageGroup.add(slabMesh);
    disposables.push(slabMaterial);

    // Glowing slab edges
    const edgeMaterial = new THREE.LineBasicMaterial({
      color: meta.color,
      transparent: true,
      opacity: 0.45,
      linewidth: 2,
    });
    const edgeLine = new THREE.LineSegments(slabEdgesGeometry, edgeMaterial);
    stageGroup.add(edgeLine);
    disposables.push(edgeMaterial);

    // Front label plate
    const labelTexture = createTextPlateTexture(
      meta.label,
      `#${meta.color.toString(16).padStart(6, "0")}`
    );
    disposables.push(labelTexture);
    const labelMaterial = new THREE.MeshBasicMaterial({
      map: labelTexture,
      transparent: true,
    });
    disposables.push(labelMaterial);
    const labelPlaneGeo = new THREE.PlaneGeometry(1.4, 0.35);
    disposables.push(labelPlaneGeo);
    const labelPlane = new THREE.Mesh(labelPlaneGeo, labelMaterial);
    labelPlane.position.set(0, 0, slabDepth / 2 + 0.01);
    stageGroup.add(labelPlane);

    // Unique miniature 3D architectural feature on top of each slab
    const featureGroup = new THREE.Group();
    featureGroup.position.set(0, slabHeight / 2 + 0.04, 0);

    if (idx === 0) {
      // Stage 01: Intake — Stacked document / repo cards
      const docGeo = new THREE.BoxGeometry(0.7, 0.04, 0.9);
      const docMat = new THREE.MeshStandardMaterial({
        color: meta.color,
        roughness: 0.4,
        metalness: 0.5,
      });
      disposables.push(docGeo, docMat);
      for (let d = 0; d < 3; d++) {
        const doc = new THREE.Mesh(docGeo, docMat);
        doc.position.set((d - 1) * 0.18, d * 0.05, (d - 1) * 0.08);
        doc.rotation.y = (d - 1) * 0.2;
        featureGroup.add(doc);
      }
    } else if (idx === 1) {
      // Stage 02: Repo Intel — AST nodes hierarchy
      const nodeGeo = new THREE.BoxGeometry(0.12, 0.12, 0.12);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: meta.color,
        emissive: meta.emissive,
        emissiveIntensity: 0.5,
      });
      disposables.push(nodeGeo, nodeMat);
      const coords: Array<[number, number, number]> = [
        [0, 0.22, 0],
        [-0.45, 0.1, -0.2],
        [0.45, 0.1, -0.2],
        [-0.75, 0.02, 0.25],
        [0, 0.02, 0.3],
        [0.75, 0.02, 0.25],
      ];
      coords.forEach(([x, y, z]) => {
        const node = new THREE.Mesh(nodeGeo, nodeMat);
        node.position.set(x, y, z);
        featureGroup.add(node);
      });
    } else if (idx === 2) {
      // Stage 03: Technical Viva — 3D Audio / Voice frequency bars
      const barGeo = new THREE.BoxGeometry(0.08, 0.3, 0.08);
      const barMat = new THREE.MeshStandardMaterial({
        color: meta.color,
        emissive: meta.emissive,
        emissiveIntensity: 0.6,
      });
      disposables.push(barGeo, barMat);
      for (let b = -4; b <= 4; b++) {
        const bar = new THREE.Mesh(barGeo, barMat);
        const heightScale = Math.sin((b + 4) * 0.4) * 0.8 + 0.4;
        bar.scale.y = heightScale;
        bar.position.set(b * 0.16, (heightScale * 0.3) / 2, 0);
        featureGroup.add(bar);
      }
    } else if (idx === 3) {
      // Stage 04: Validation — Verification rubric grid
      const gridBoxGeo = new THREE.BoxGeometry(0.2, 0.05, 0.2);
      const gridBoxMat = new THREE.MeshStandardMaterial({
        color: meta.color,
        roughness: 0.3,
        metalness: 0.7,
      });
      disposables.push(gridBoxGeo, gridBoxMat);
      for (let gx = -1; gx <= 1; gx++) {
        for (let gz = -1; gz <= 1; gz++) {
          const gbox = new THREE.Mesh(gridBoxGeo, gridBoxMat);
          gbox.position.set(gx * 0.38, 0.04, gz * 0.38);
          featureGroup.add(gbox);
        }
      }
    } else if (idx === 4) {
      // Stage 05: Skill Proof Card — Holographic prism badge / crest
      const prismGeo = new THREE.OctahedronGeometry(0.28, 0);
      const prismMat = new THREE.MeshStandardMaterial({
        color: meta.color,
        emissive: meta.emissive,
        emissiveIntensity: 0.8,
        roughness: 0.1,
        metalness: 0.9,
      });
      disposables.push(prismGeo, prismMat);
      const prism = new THREE.Mesh(prismGeo, prismMat);
      prism.position.set(0, 0.22, 0);
      featureGroup.add(prism);
    } else if (idx === 5) {
      // Stage 06: Human Review — Review Gate Monolith
      const gateGeo = new THREE.BoxGeometry(0.9, 0.28, 0.14);
      const gateMat = new THREE.MeshStandardMaterial({
        color: meta.color,
        roughness: 0.2,
        metalness: 0.8,
        emissive: meta.emissive,
        emissiveIntensity: 0.4,
      });
      disposables.push(gateGeo, gateMat);
      const gate = new THREE.Mesh(gateGeo, gateMat);
      gate.position.set(0, 0.18, 0);
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

  // 4 Corner Vertical Guide Rails (Architectural Structure Pillars)
  const guidePillars = new THREE.Group();
  const pillarHeight = totalStages * ySpacing + 0.6;
  const pillarGeo = new THREE.CylinderGeometry(0.022, 0.022, pillarHeight, 8);
  const pillarMat = new THREE.MeshStandardMaterial({
    color: 0xd97706,
    metalness: 0.9,
    roughness: 0.2,
    emissive: 0x92400e,
    emissiveIntensity: 0.35,
  });
  disposables.push(pillarGeo, pillarMat);

  const cornerOffsets: Array<[number, number]> = [
    [-slabWidth / 2 + 0.1, -slabDepth / 2 + 0.1],
    [slabWidth / 2 - 0.1, -slabDepth / 2 + 0.1],
    [-slabWidth / 2 + 0.1, slabDepth / 2 - 0.1],
    [slabWidth / 2 - 0.1, slabDepth / 2 - 0.1],
  ];

  cornerOffsets.forEach(([cx, cz]) => {
    const pillar = new THREE.Mesh(pillarGeo, pillarMat);
    pillar.position.set(cx, 0, cz);
    guidePillars.add(pillar);
  });
  rootGroup.add(guidePillars);

  // Active Laser Scanner Carriage (Floats and tracks current active stage)
  const scannerBar = new THREE.Group();
  const scannerFrameGeo = new THREE.BoxGeometry(
    slabWidth + 0.25,
    0.06,
    slabDepth + 0.25
  );
  const scannerFrameMat = new THREE.MeshStandardMaterial({
    color: 0xf97316,
    emissive: 0xea580c,
    emissiveIntensity: 0.9,
    roughness: 0.2,
    metalness: 0.8,
  });
  disposables.push(scannerFrameGeo, scannerFrameMat);
  const scannerMesh = new THREE.Mesh(scannerFrameGeo, scannerFrameMat);
  scannerBar.add(scannerMesh);

  // Glowing laser beam line running through the center
  const laserBeamGeo = new THREE.BoxGeometry(slabWidth + 0.2, 0.02, 0.02);
  const laserBeamMat = new THREE.MeshBasicMaterial({ color: 0xffedd5 });
  disposables.push(laserBeamGeo, laserBeamMat);
  const laserBeam = new THREE.Mesh(laserBeamGeo, laserBeamMat);
  laserBeam.position.set(0, 0, 0);
  scannerBar.add(laserBeam);

  const scannerLight = new THREE.PointLight(0xf97316, 2.2, 3.5);
  scannerLight.position.set(0, 0.15, 0);
  scannerBar.add(scannerLight);

  scannerBar.position.set(0, topY - ySpacing, 0);
  rootGroup.add(scannerBar);

  // Ambient Data Particles drifting vertically along the stack
  const particleCount = 60;
  const particlePositions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    particlePositions[i * 3] = (Math.random() - 0.5) * (slabWidth + 0.6);
    particlePositions[i * 3 + 1] = (Math.random() - 0.5) * pillarHeight;
    particlePositions[i * 3 + 2] = (Math.random() - 0.5) * (slabDepth + 0.6);
  }
  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute(
    "position",
    new THREE.BufferAttribute(particlePositions, 3)
  );
  const particleMat = new THREE.PointsMaterial({
    color: 0xf59e0b,
    size: 0.05,
    transparent: true,
    opacity: 0.6,
  });
  disposables.push(particleGeo, particleMat);
  const dataPulses = new THREE.Points(particleGeo, particleMat);
  rootGroup.add(dataPulses);

  // Set default isometric tilt for the rootGroup
  rootGroup.rotation.y = -0.45;
  rootGroup.rotation.x = 0.22;

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
