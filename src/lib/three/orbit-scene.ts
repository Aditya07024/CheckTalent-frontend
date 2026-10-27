import * as THREE from "three";
import {
  ORBIT_LANGUAGE_NODES,
  type OrbitLanguageSpec,
} from "@/data/orbit-languages";
import { createLanguageCubeTexture } from "@/lib/three/canvas-textures";

export interface BuiltOrbitNode {
  mesh: THREE.Mesh;
  lineGeom: THREE.BufferGeometry;
  spec: OrbitLanguageSpec;
}

export interface BuiltOrbitScene {
  rootGroup: THREE.Group;
  coreMesh: THREE.Mesh;
  haloMesh: THREE.Mesh;
  nodes: BuiltOrbitNode[];
  dispose: () => void;
}

/**
 * Constructs the open-air Hero 3D Orbit Constellation meshes in Yellow, Orange & Red.
 */
export function buildOrbitConstellation(): BuiltOrbitScene {
  const rootGroup = new THREE.Group();
  const disposables: Array<{ dispose: () => void }> = [];

  const coreGeo = new THREE.OctahedronGeometry(0.84, 0);
  const coreMat = new THREE.MeshStandardMaterial({
    color: 0xf97316,
    emissive: 0xea580c,
    emissiveIntensity: 0.45,
    roughness: 0.18,
    metalness: 0.35,
  });
  const coreMesh = new THREE.Mesh(coreGeo, coreMat);
  rootGroup.add(coreMesh);

  const haloGeo = new THREE.IcosahedronGeometry(1.22, 1);
  const haloMat = new THREE.MeshBasicMaterial({
    color: 0xd97706,
    wireframe: true,
    transparent: true,
    opacity: 0.55,
  });
  const haloMesh = new THREE.Mesh(haloGeo, haloMat);
  rootGroup.add(haloMesh);

  const ringGeo1 = new THREE.TorusGeometry(2.7, 0.02, 12, 96);
  const ringMat1 = new THREE.MeshBasicMaterial({
    color: 0xea580c,
    transparent: true,
    opacity: 0.48,
  });
  const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
  ring1.rotation.x = Math.PI * 0.42;
  ring1.rotation.y = Math.PI * 0.08;
  rootGroup.add(ring1);

  const ringGeo2 = new THREE.TorusGeometry(2.7, 0.018, 12, 96);
  const ringMat2 = new THREE.MeshBasicMaterial({
    color: 0xdc2626,
    transparent: true,
    opacity: 0.36,
  });
  const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
  ring2.rotation.x = -Math.PI * 0.42;
  ring2.rotation.y = -Math.PI * 0.1;
  rootGroup.add(ring2);

  const cubeGeo = new THREE.BoxGeometry(0.74, 0.74, 0.74);
  disposables.push(
    coreGeo,
    coreMat,
    haloGeo,
    haloMat,
    ringGeo1,
    ringMat1,
    ringGeo2,
    ringMat2,
    cubeGeo
  );

  const nodes: BuiltOrbitNode[] = ORBIT_LANGUAGE_NODES.map((spec) => {
    const tex = createLanguageCubeTexture(
      spec.symbol,
      spec.name,
      spec.primaryHex,
      spec.accentHex
    );
    const mat = new THREE.MeshStandardMaterial({
      map: tex,
      roughness: 0.22,
      metalness: 0.16,
    });

    const mesh = new THREE.Mesh(cubeGeo, mat);
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
      opacity: 0.55,
    });
    rootGroup.add(new THREE.Line(lineGeom, lineMat));

    disposables.push(tex, mat, lineGeom, lineMat);
    return { mesh, lineGeom, spec };
  });

  return {
    rootGroup,
    coreMesh,
    haloMesh,
    nodes,
    dispose: () => disposables.forEach((d) => d.dispose()),
  };
}
