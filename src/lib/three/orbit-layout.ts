/** Radius (world units) the orbit + cubes need to stay fully on screen. */
const ORBIT_EXTENT = 3.25;
const BASE_DISTANCE = 8.3;
const DESKTOP_MIN_WIDTH = 1024;

/**
 * Computes camera distance and horizontal anchor so the hero orbit
 * fills the background: right-anchored on desktop, centered on mobile.
 */
export function fitOrbitCamera(
  width: number,
  height: number,
  fovDeg: number
): { distance: number; offsetX: number } {
  const aspect = width / height;
  const tanHalf = Math.tan((fovDeg * Math.PI) / 360);

  if (width < DESKTOP_MIN_WIDTH) {
    const distance = Math.max(BASE_DISTANCE, ORBIT_EXTENT / (tanHalf * aspect));
    return { distance, offsetX: 0 };
  }

  const halfWidth = BASE_DISTANCE * tanHalf * aspect;
  const offsetX = Math.max(0, Math.min(halfWidth * 0.5, halfWidth - ORBIT_EXTENT));
  return { distance: BASE_DISTANCE, offsetX };
}
