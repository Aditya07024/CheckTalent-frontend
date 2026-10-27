import * as THREE from "three";
import {
  PAGE_3D_ARTIFACTS,
  type FloatingArtifactSpec,
} from "@/data/three-scene";
import { createLanguageCubeTexture } from "@/lib/three/canvas-textures";

export interface AnimatedWorldItem {
  group: THREE.Group;
  mesh: THREE.Mesh;
  cage: THREE.Mesh;
  spec: FloatingArtifactSpec;
}

export interface BuiltPageWorld {
  worldGroup: THREE.Group;
  items: AnimatedWorldItem[];
  particles: THREE.Points;
  dispose: () => void;
}

/**
 * Builds the 3D polyhedra, language cubes, and warm solar particles
 * distributed vertically across the entire landing page.
 */
export function buildPageWorldObjects(): BuiltPageWorld {
  const worldGroup = new THREE.Group();
  const boxGeo = new THREE.BoxGeometry(0.95, 0.95, 0.95);
  const octaGeo = new THREE.OctahedronGeometry(0.75, 0);
  const icosaGeo = new THREE.IcosahedronGeometry(0.78, 0);
  const dodecaGeo = new THREE.DodecahedronGeometry(0.74, 0);
  const torusGeo = new THREE.TorusGeometry(0.68, 0.18, 16, 48);
  const knotGeo = new THREE.TorusKnotGeometry(0.52, 0.14, 64, 12);
  const cageGeo = new THREE.IcosahedronGeometry(1.08, 1);

  const disposables: Array<{ dispose: () => void }> = [
    boxGeo,
    octaGeo,
    icosaGeo,
    dodecaGeo,
    torusGeo,
    knotGeo,
    cageGeo,
  ];

  const geomMap = {
    cube: boxGeo,
    octa: octaGeo,
    icosa: icosaGeo,
    dodeca: dodecaGeo,
    torus: torusGeo,
    knot: knotGeo,
  };

  const items: AnimatedWorldItem[] = PAGE_3D_ARTIFACTS.map((spec) => {
    const group = new THREE.Group();
    group.position.set(spec.x, spec.y, spec.z);
    group.scale.setScalar(spec.scale);
    worldGroup.add(group);

    let mat: THREE.MeshStandardMaterial;
    if (spec.kind === "cube" && spec.label) {
      const tex = createLanguageCubeTexture(
        spec.label,
        undefined,
        spec.primaryHex,
        spec.accentHex,
        "#9A3412"
      );
      disposables.push(tex);
      mat = new THREE.MeshStandardMaterial({
        map: tex,
        roughness: 0.26,
        metalness: 0.15,
        transparent: true,
        opacity: 0.88,
      });
    } else {
      mat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(spec.primaryHex),
        emissive: new THREE.Color(spec.primaryHex),
        emissiveIntensity: 0.2,
        roughness: 0.25,
        metalness: 0.28,
        transparent: true,
        opacity: 0.82,
      });
    }
    disposables.push(mat);

    const mesh = new THREE.Mesh(geomMap[spec.kind], mat);
    group.add(mesh);

    const cageMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(spec.primaryHex),
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    disposables.push(cageMat);

    const cage = new THREE.Mesh(cageGeo, cageMat);
    group.add(cage);

    return { group, mesh, cage, spec };
  });

  const count = 240;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const palette = [
    new THREE.Color("#F59E0B"),
    new THREE.Color("#EA580C"),
    new THREE.Color("#DC2626"),
    new THREE.Color("#EAB308"),
  ];

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 14;
    positions[i * 3 + 1] = 4 - (i / count) * 68;
    positions[i * 3 + 2] = -1.5 - Math.random() * 5.5;
    const c = palette[i % palette.length]!;
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }

  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  pGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  const pMat = new THREE.PointsMaterial({
    size: 0.085,
    vertexColors: true,
    transparent: true,
    opacity: 0.55,
  });
  disposables.push(pGeo, pMat);

  const particles = new THREE.Points(pGeo, pMat);
  worldGroup.add(particles);

  return {
    worldGroup,
    items,
    particles,
    dispose: () => disposables.forEach((d) => d.dispose()),
  };
}
