import * as THREE from "three";

export interface SolarLightRig {
  orangeLight: THREE.PointLight;
  redLight: THREE.PointLight;
}

/**
 * Attaches warm Yellow, Amber, Orange, and Red studio lighting to a Three.js scene.
 */
export function attachSolarLighting(
  scene: THREE.Scene,
  pointDistance = 22
): SolarLightRig {
  const ambient = new THREE.AmbientLight(0xfffbeb, 1.85);
  scene.add(ambient);

  const keyLight = new THREE.DirectionalLight(0xfef08a, 2.0);
  keyLight.position.set(5, 8, 6);
  scene.add(keyLight);

  const orangeLight = new THREE.PointLight(0xf97316, 2.4, pointDistance);
  orangeLight.position.set(-5, 2, 4);
  scene.add(orangeLight);

  const redLight = new THREE.PointLight(0xdc2626, 2.1, pointDistance);
  redLight.position.set(5, -2, 4);
  scene.add(redLight);

  return { orangeLight, redLight };
}
