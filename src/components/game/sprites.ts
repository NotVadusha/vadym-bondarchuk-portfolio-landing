import * as THREE from "three";

interface LabelOptions {
  fontSize?: number;
  bg?: string;
  fg?: string;
  stroke?: string;
  /** World units per canvas pixel — 0.018 for nodes, 0.014 for pickups. */
  scale?: number;
}

/**
 * Canvas-texture label plate in the mockup's style: white card, 5px ink
 * border, monospace ink text. No font files, full Cyrillic via system fonts.
 */
export function makeLabelSprite(text: string, opts: LabelOptions = {}) {
  const {
    fontSize = 46,
    bg = "#ffffff",
    fg = "#16233d",
    stroke = "#16233d",
    scale = 0.018,
  } = opts;

  const dpr = 2;
  const font = `700 ${fontSize}px "JetBrains Mono", ui-monospace, Menlo, Consolas, monospace`;
  const measure = document.createElement("canvas").getContext("2d")!;
  measure.font = font;
  const w = Math.ceil(measure.measureText(text).width) + 30;
  const h = fontSize + 24;

  const canvas = document.createElement("canvas");
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  const ctx = canvas.getContext("2d")!;
  ctx.scale(dpr, dpr);
  ctx.font = font;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.beginPath();
  if (ctx.roundRect) ctx.roundRect(2.5, 2.5, w - 5, h - 5, 12);
  else ctx.rect(2.5, 2.5, w - 5, h - 5);
  ctx.fillStyle = bg;
  ctx.fill();
  ctx.lineWidth = 5;
  ctx.strokeStyle = stroke;
  ctx.stroke();

  ctx.fillStyle = fg;
  ctx.fillText(text, w / 2, h / 2 + 1);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;

  const sprite = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false }),
  );
  sprite.scale.set(w * scale, h * scale, 1);
  sprite.renderOrder = 3;
  return sprite;
}

/** Free the canvas texture + material of a sprite built above. */
export function disposeLabelSprite(sprite: THREE.Sprite) {
  const mat = sprite.material as THREE.SpriteMaterial;
  mat.map?.dispose();
  mat.dispose();
}
