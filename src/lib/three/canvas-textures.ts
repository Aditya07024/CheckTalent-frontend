import * as THREE from "three";

/**
 * Generates a crisp 2D CanvasTexture for 3D programming-language cubes
 * in warm Yellow, Orange, and Red tones.
 */
export function createLanguageCubeTexture(
  symbol: string,
  subtitle: string | undefined,
  primaryHex: string,
  accentHex: string,
  darkStopHex = "#23140D"
): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    const grad = ctx.createLinearGradient(0, 0, size, size);
    grad.addColorStop(0, primaryHex);
    grad.addColorStop(1, darkStopHex);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);

    ctx.strokeStyle = accentHex;
    ctx.lineWidth = 12;
    ctx.strokeRect(14, 14, size - 28, size - 28);

    ctx.fillStyle = "#FACC15";
    ctx.beginPath();
    ctx.arc(size - 38, 38, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 76px ui-monospace, SFMono-Regular, Menlo, monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(symbol, size / 2, subtitle ? size / 2 - 12 : size / 2 + 4);

    if (subtitle) {
      ctx.fillStyle = accentHex;
      ctx.font = "600 25px system-ui, -apple-system, sans-serif";
      ctx.fillText(subtitle.toUpperCase(), size / 2, size - 46);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}
