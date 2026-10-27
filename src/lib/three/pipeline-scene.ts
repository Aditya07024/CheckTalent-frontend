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
 * Creates ultra-sharp 1024x256 high-resolution texture plates
 * with crisp typography, badge pill, and glowing border.
 */
function createHighResTextPlate(
  stageCode: string,
  title: string,
  tag: string,
  colorHex: string
): THREE.CanvasTexture {
  const width = 1024;
  const height = 256;
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
  ctx.lineWidth = 8;
  ctx.strokeRect(8, 8, width - 16, height - 16);

  // Inner subtle accent frame
  ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
  ctx.lineWidth = 2;
  ctx.strokeRect(20, 20, width - 40, height - 40);

  // Stage Number Badge on the left
  ctx.fillStyle = colorHex;
  ctx.beginPath();
  ctx.roundRect(40, 50, 110, 80, 16);
  ctx.fill();

  ctx.fillStyle = "#120B08";
  ctx.font = "bold 58px ui-monospace, SFMono-Regular, Menlo, monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(stageCode, 95, 90);

  // Stage Title
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 52px system-ui, -apple-system, sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText(title, 180, 88);

  // Tag Badge on bottom
  ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
  ctx.beginPath();
  ctx.roundRect(180, 142, 280, 48, 10);
  ctx.fill();

  ctx.fillStyle = colorHex;
  ctx.font = "bold 26px ui-monospace, SFMono-Regular, Menlo, monospace";
  ctx.fillText(`• ${tag}`, 198, 166);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}

export function buildPipelineStackScene(): BuiltPipelineStackScene {
  const rootGroup = new THREE.Group();
  const disposables: Array<{ dispose: () => void }> = [];

  const slabWidth = 3.6;
  const slabHeight = 0.22;
  const slabDepth = 2.2;
  const ySpacing = 0.95;
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

    const hexString = `#${meta.color.toString(16).padStart(6, "0")}`;

    // Slab body: High quality MeshPhysicalMaterial with clearcoat and transmission
    const slabMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.15,
      metalness: 0.1,
      transmission: 0.45,
      ior: 1.5,
      thickness: 0.5,
      emissive: meta.color,
      emissiveIntensity: 0.22,
      transparent: true,
      opacity: 0.96,
    });
    const slabMesh = new THREE.Mesh(slabGeometry, slabMaterial);
    stageGroup.add(slabMesh);
    disposables.push(slabMaterial);

    // Razor-sharp glowing slab edges
    const edgeMaterial = new THREE.LineBasicMaterial({
      color: meta.color,
      transparent: true,
      opacity: 0.75,
      linewidth: 2,
    });
    const edgeLine = new THREE.LineSegments(slabEdgesGeometry, edgeMaterial);
    stageGroup.add(edgeLine);
    disposables.push(edgeMaterial);

    // High-res Front label plate
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

    const labelPlaneGeo = new THREE.PlaneGeometry(2.0, 0.5);
    disposables.push(labelPlaneGeo);
    const labelPlane = new THREE.Mesh(labelPlaneGeo, labelMaterial);
    labelPlane.position.set(0, 0, slabDepth / 2 + 0.015);
    stageGroup.add(labelPlane);

    // Miniature 3D architectural feature on top of each slab
    const featureGroup = new THREE.Group();
    featureGroup.position.set(0, slabHeight / 2 + 0.05, 0);

    if (idx === 0) {
      // Stage 01: Intake — Sleek stacked document / repo cards
      const docGeo = new THREE.BoxGeometry(0.9, 0.05, 1.1);
      const docMat = new THREE.MeshStandardMaterial({
        color: meta.color,
        roughness: 0.3,
        metalness: 0.6,
      });
      disposables.push(docGeo, docMat);
      for (let d = 0; d < 3; d++) {
        const doc = new THREE.Mesh(docGeo, docMat);
        doc.position.set((d - 1) * 0.22, d * 0.06, (d - 1) * 0.1);
        doc.rotation.y = (d - 1) * 0.15;
        featureGroup.add(doc);
      }
    } else if (idx === 1) {
      // Stage 02: Repo Intel — AST nodes hierarchy with metallic links
      const nodeGeo = new THREE.BoxGeometry(0.16, 0.16, 0.16);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: meta.color,
        emissive: meta.emissive,
        emissiveIntensity: 0.8,
        roughness: 0.2,
        metalness: 0.8,
      });
      disposables.push(nodeGeo, nodeMat);
      const coords: Array<[number, number, number]> = [
        [0, 0.28, 0],
        [-0.55, 0.14, -0.25],
        [0.55, 0.14, -0.25],
        [-0.9, 0.04, 0.3],
        [0, 0.04, 0.35],
        [0.9, 0.04, 0.3],
      ];
      coords.forEach(([x, y, z]) => {
        const node = new THREE.Mesh(nodeGeo, nodeMat);
        node.position.set(x, y, z);
        featureGroup.add(node);
      });
    } else if (idx === 2) {
      // Stage 03: Technical Viva — Pulsing 3D voice frequency spectrum bars
      const barGeo = new THREE.BoxGeometry(0.09, 0.38, 0.09);
      const barMat = new THREE.MeshStandardMaterial({
        color: meta.color,
        emissive: meta.emissive,
        emissiveIntensity: 0.9,
        roughness: 0.2,
        metalness: 0.7,
      });
      disposables.push(barGeo, barMat);
      for (let b = -5; b <= 5; b++) {
        const bar = new THREE.Mesh(barGeo, barMat);
        const heightScale = Math.sin((b + 5) * 0.35) * 0.85 + 0.35;
        bar.scale.y = heightScale;
        bar.position.set(b * 0.18, (heightScale * 0.38) / 2, 0);
        featureGroup.add(bar);
      }
    } else if (idx === 3) {
      // Stage 04: Validation — Verification rubric grid with bevels
      const gridBoxGeo = new THREE.BoxGeometry(0.24, 0.06, 0.24);
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
          gbox.position.set(gx * 0.45, 0.05, gz * 0.45);
          featureGroup.add(gbox);
        }
      }
    } else if (idx === 4) {
      // Stage 05: Skill Proof Card — Holographic diamond crest
      const prismGeo = new THREE.OctahedronGeometry(0.36, 0);
      const prismMat = new THREE.MeshStandardMaterial({
        color: meta.color,
        emissive: meta.emissive,
        emissiveIntensity: 0.95,
        roughness: 0.1,
        metalness: 0.95,
      });
      disposables.push(prismGeo, prismMat);
      const prism = new THREE.Mesh(prismGeo, prismMat);
      prism.position.set(0, 0.28, 0);
      featureGroup.add(prism);
    } else if (idx === 5) {
      // Stage 06: Human Review — Architectural human review gate
      const gateGeo = new THREE.BoxGeometry(1.1, 0.35, 0.16);
      const gateMat = new THREE.MeshStandardMaterial({
        color: meta.color,
        roughness: 0.2,
        metalness: 0.85,
        emissive: meta.emissive,
        emissiveIntensity: 0.5,
      });
      disposables.push(gateGeo, gateMat);
      const gate = new THREE.Mesh(gateGeo, gateMat);
      gate.position.set(0, 0.22, 0);
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

  // 4 Corner Architectural Pillars (Polished bronze/gold rails)
  const guidePillars = new THREE.Group();
  const pillarHeight = totalStages * ySpacing + 0.8;
  const pillarGeo = new THREE.CylinderGeometry(0.028, 0.028, pillarHeight, 16);
  const pillarMat = new THREE.MeshStandardMaterial({
    color: 0xd97706,
    metalness: 0.95,
    roughness: 0.15,
    emissive: 0x92400e,
    emissiveIntensity: 0.45,
  });
  disposables.push(pillarGeo, pillarMat);

  const cornerOffsets: Array<[number, number]> = [
    [-slabWidth / 2 + 0.12, -slabDepth / 2 + 0.12],
    [slabWidth / 2 - 0.12, -slabDepth / 2 + 0.12],
    [-slabWidth / 2 + 0.12, slabDepth / 2 - 0.12],
    [slabWidth / 2 - 0.12, slabDepth / 2 - 0.12],
  ];

  cornerOffsets.forEach(([cx, cz]) => {
    const pillar = new THREE.Mesh(pillarGeo, pillarMat);
    pillar.position.set(cx, 0, cz);
    guidePillars.add(pillar);
  });
  rootGroup.add(guidePillars);

  // Active Laser Scanner Carriage
  const scannerBar = new THREE.Group();
  const scannerFrameGeo = new THREE.BoxGeometry(
    slabWidth + 0.35,
    0.07,
    slabDepth + 0.35
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
  const laserBeamGeo = new THREE.BoxGeometry(slabWidth + 0.3, 0.025, 0.025);
  const laserBeamMat = new THREE.MeshBasicMaterial({ color: 0xffedd5 });
  disposables.push(laserBeamGeo, laserBeamMat);
  const laserBeam = new THREE.Mesh(laserBeamGeo, laserBeamMat);
  laserBeam.position.set(0, 0, 0);
  scannerBar.add(laserBeam);

  const scannerLight = new THREE.PointLight(0xf97316, 3.2, 4.5);
  scannerLight.position.set(0, 0.2, 0);
  scannerBar.add(scannerLight);

  scannerBar.position.set(0, topY - ySpacing, 0);
  rootGroup.add(scannerBar);

  // Ambient Data Stream Particles
  const particleCount = 75;
  const particlePositions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    particlePositions[i * 3] = (Math.random() - 0.5) * (slabWidth + 0.8);
    particlePositions[i * 3 + 1] = (Math.random() - 0.5) * pillarHeight;
    particlePositions[i * 3 + 2] = (Math.random() - 0.5) * (slabDepth + 0.8);
  }
  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute(
    "position",
    new THREE.BufferAttribute(particlePositions, 3)
  );
  const particleMat = new THREE.PointsMaterial({
    color: 0xf59e0b,
    size: 0.055,
    transparent: true,
    opacity: 0.75,
  });
  disposables.push(particleGeo, particleMat);
  const dataPulses = new THREE.Points(particleGeo, particleMat);
  rootGroup.add(dataPulses);

  // Default Isometric tilt angle
  rootGroup.rotation.y = -0.42;
  rootGroup.rotation.x = 0.24;

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
