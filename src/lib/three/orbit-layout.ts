/** Radius (world units) the orbit + cubes need to stay fully on screen. */
const ORBIT_EXTENT = 3.25;
const BASE_DISTANCE = 8.3;
const DESKTOP_MIN_WIDTH = 1024;
/** How far (world units) to pull the desktop orbit left from the right edge. */
const LEFT_NUDGE = 0.7;
/** How far (world units) to nudge the orbit downward. */
const DOWN_NUDGE = -0.65;

/**
 * Computes camera distance and horizontal/vertical anchor so the hero orbit
 * fills the background: right-anchored on desktop, centered on mobile.
 */
export function fitOrbitCamera(
  width: number,
  height: number,
  fovDeg: number
): { distance: number; offsetX: number; offsetY: number } {
  const aspect = width / height;
  const tanHalf = Math.tan((fovDeg * Math.PI) / 360);

  if (width < DESKTOP_MIN_WIDTH) {
    const distance = Math.max(BASE_DISTANCE, ORBIT_EXTENT / (tanHalf * aspect));
    return { distance, offsetX: 0, offsetY: DOWN_NUDGE * 0.7 };
  }

  const halfWidth = BASE_DISTANCE * tanHalf * aspect;
  const rightAnchor = Math.min(halfWidth * 0.5, halfWidth - ORBIT_EXTENT);
  const offsetX = Math.max(0, rightAnchor - LEFT_NUDGE);
  return { distance: BASE_DISTANCE, offsetX, offsetY: DOWN_NUDGE };
}
