import * as THREE from "three";

export type SculptureVariant = "knot" | "crystal" | "molecule" | "gyroscope";

export interface BuiltSculpture {
  group: THREE.Group;
  mainMesh: THREE.Object3D;
  rings: THREE.Mesh[];
  dispose: () => void;
}

/**
 * Constructs open-air Three.js section sculptures in Yellow, Orange, and Red.
 */
export function buildSculptureByVariant(
  variant: SculptureVariant
): BuiltSculpture {
  const group = new THREE.Group();
  const rings: THREE.Mesh[] = [];
  const disposables: Array<{ dispose: () => void }> = [];
  let mainMesh: THREE.Object3D = new THREE.Group();

  if (variant === "knot") {
    const geo = new THREE.TorusKnotGeometry(0.82, 0.23, 96, 16);
    const mat = new THREE.MeshStandardMaterial({
      color: 0xf97316,
      emissive: 0xea580c,
      emissiveIntensity: 0.28,
      roughness: 0.2,
      metalness: 0.35,
    });
    mainMesh = new THREE.Mesh(geo, mat);
    group.add(mainMesh);

    const wireGeo = new THREE.IcosahedronGeometry(1.42, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      wireframe: true,
      transparent: true,
      opacity: 0.38,
    });
    const wire = new THREE.Mesh(wireGeo, wireMat);
    group.add(wire);
    rings.push(wire);
    disposables.push(geo, mat, wireGeo, wireMat);
  } else if (variant === "crystal") {
    const coreGeo = new THREE.DodecahedronGeometry(0.95, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xea580c,
      emissive: 0xdc2626,
      emissiveIntensity: 0.25,
      roughness: 0.16,
      metalness: 0.32,
    });
    mainMesh = new THREE.Mesh(coreGeo, coreMat);
    group.add(mainMesh);

    const outerGeo = new THREE.OctahedronGeometry(1.38, 0);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0xeab308,
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    });
    const outer = new THREE.Mesh(outerGeo, outerMat);
    group.add(outer);
    rings.push(outer);

    const ringGeo = new THREE.TorusGeometry(1.5, 0.035, 16, 64);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xfacc15,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.3,
      roughness: 0.25,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI * 0.38;
    group.add(ring);
    rings.push(ring);
    disposables.push(coreGeo, coreMat, outerGeo, outerMat, ringGeo, ringMat);
  } else if (variant === "molecule") {
    const cluster = new THREE.Group();
    group.add(cluster);
    mainMesh = cluster;

    const hubGeo = new THREE.IcosahedronGeometry(0.55, 0);
    const hubMat = new THREE.MeshStandardMaterial({
      color: 0xdc2626,
      emissive: 0xb91c1c,
      emissiveIntensity: 0.25,
      roughness: 0.22,
      metalness: 0.3,
    });
    cluster.add(new THREE.Mesh(hubGeo, hubMat));

    const satGeo = new THREE.SphereGeometry(0.24, 20, 20);
    const satColors = [0xeab308, 0xf97316, 0xdc2626, 0xf59e0b, 0xea580c, 0xfacc15];
    const satCoords: Array<[number, number, number]> = [
      [1.25, 0.4, 0.2],
      [-1.2, 0.5, -0.3],
      [0.3, 1.25, -0.4],
      [-0.4, -1.2, 0.4],
      [0.95, -0.85, -0.5],
      [-0.85, 0.1, 1.1],
    ];
    disposables.push(hubGeo, hubMat, satGeo);

    satCoords.forEach((coords, i) => {
      const sMat = new THREE.MeshStandardMaterial({
        color: satColors[i % satColors.length],
        roughness: 0.22,
        metalness: 0.25,
      });
      const sMesh = new THREE.Mesh(satGeo, sMat);
      sMesh.position.set(coords[0], coords[1], coords[2]);
      cluster.add(sMesh);

      const lGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        sMesh.position.clone(),
      ]);
      const lMat = new THREE.LineBasicMaterial({
        color: 0xea580c,
        transparent: true,
        opacity: 0.6,
      });
      cluster.add(new THREE.Line(lGeo, lMat));
      disposables.push(sMat, lGeo, lMat);
    });
  } else {
    const dGeo = new THREE.OctahedronGeometry(0.62, 0);
    const dMat = new THREE.MeshStandardMaterial({
      color: 0xf97316,
      emissive: 0xea580c,
      emissiveIntensity: 0.32,
      roughness: 0.18,
      metalness: 0.35,
    });
    mainMesh = new THREE.Mesh(dGeo, dMat);
    group.add(mainMesh);

    const specs: Array<[number, number, number, number]> = [
      [1.02, 0xeab308, 0, 0],
      [1.26, 0xf97316, Math.PI / 3, 0],
      [1.48, 0xdc2626, 0, Math.PI / 3],
    ];
    disposables.push(dGeo, dMat);

    specs.forEach(([radius, color, rx, ry]) => {
      const gGeo = new THREE.TorusGeometry(radius, 0.045, 16, 64);
      const gMat = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.25,
        metalness: 0.4,
      });
      const gMesh = new THREE.Mesh(gGeo, gMat);
      gMesh.rotation.set(rx, ry, 0);
      group.add(gMesh);
      rings.push(gMesh);
      disposables.push(gGeo, gMat);
    });
  }

  return {
    group,
    mainMesh,
    rings,
    dispose: () => disposables.forEach((d) => d.dispose()),
  };
}
