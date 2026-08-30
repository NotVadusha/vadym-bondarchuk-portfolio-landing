import * as THREE from "three";

export interface CareerNodeData {
  id: string;
  period: string;
  /** [x, z] on the map */
  pos: [number, number];
}

/**
 * Positions only. The display label, role and dossier bullets are localized
 * copy and live in `src/content` keyed by this `id`.
 */
export const CAREER_NODES: CareerNodeData[] = [
  { id: "quarnuts", period: "2021—2022", pos: [0, -14] },
  { id: "developstoday", period: "2022—2023", pos: [17, -30] },
  { id: "connectiveone", period: "2023", pos: [0, -46] },
  { id: "universe", period: "2023—2026", pos: [-17, -62] },
  { id: "next", period: "2026 → ∞", pos: [0, -78] },
];

export const SKILLS: string[] = [
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "Express",
  "PostgreSQL",
  "Docker",
  "Next.js",
  "Python",
  "NestJS",
  "Go",
  "Kafka",
  "AWS",
  "React Native",
  "Expo",
  "Stripe",
  "Redis",
  "WebSocket",
  "Kubernetes",
  "GCP",
  "OpenTelemetry",
  "Grafana",
  "Typesense",
  "LLM",
];

/** Catmull-Rom control points of the career path ([x, z]). */
export const SPLINE_POINTS: [number, number][] = [
  [0, 12],
  [0, 0],
  [0, -14],
  [9, -22],
  [17, -30],
  [11, -38],
  [0, -46],
  [-9, -54],
  [-17, -62],
  [-9, -70],
  [0, -78],
  [0, -92],
];

export const WORLD_BOUNDS = {
  minX: -52,
  maxX: 52,
  minZ: -98,
  maxZ: 18,
};

export const DRONE_START: [number, number] = [0, 8];
export const NODE_OPEN_RADIUS = 4.2;
export const SKILL_PICK_RADIUS = 1.9;
export const TILE_STEP = 2.6;

/** Colors of the (day-time) game world. */
export const GAME_COLORS = {
  sky: "#e9f1f8",
  ground: "#f1f5f9",
  grid: "#b9cddf",
  tile: "#ffffff",
  tileAlt: "#e4ecf4",
  ink: "#16233d",
  beacon: "#2f8fd6",
  beaconVisited: "#ff5c1c",
  beam: "#a9d9f5",
  beamVisited: "#ffb08a",
  crystal: "#ff5c1c",
  crystalDeep: "#7a2d0c",
  crystalPale: "#e6eef6",
  pylon: "#ffffff",
  pylonTip: "#ff5c1c",
};

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function buildCurve(): THREE.CatmullRomCurve3 {
  return new THREE.CatmullRomCurve3(
    SPLINE_POINTS.map(([x, z]) => new THREE.Vector3(x, 0, z)),
    false,
    "catmullrom",
    0.5,
  );
}

const splineCurve = buildCurve();

/** Distance from a point (x, z) to the career path spline. */
function distanceToSpline(x: number, z: number): number {
  const probe = new THREE.Vector3(x, 0, z);
  const p = splineCurve.getPoint(0);
  let best = probe.distanceTo(p);
  for (let i = 1; i <= 200; i++) {
    const q = splineCurve.getPoint(i / 200);
    const d = probe.distanceTo(q);
    if (d < best) best = d;
  }
  return best;
}

export interface SkillPickupData {
  name: string;
  pos: [number, number];
}

/**
 * Deterministic pickup placement: scattered perpendicular to the path
 * (±2.4–3.4 from the tiles), at least 3 units apart and 6 units from nodes.
 */
export function computeSkillPickups(): SkillPickupData[] {
  const rng = mulberry32(20260829);
  const result: SkillPickupData[] = [];
  let t = 0.06;
  let guard = 0;
  while (result.length < SKILLS.length && guard++ < 2000) {
    const u = t % 1;
    const p = splineCurve.getPointAt(u);
    const tangent = splineCurve.getTangentAt(u);
    const nx = -tangent.z;
    const nz = tangent.x;
    const side = rng() > 0.5 ? 1 : -1;
    const dist = 2.4 + rng() * 1.0;
    const x = p.x + nx * dist * side;
    const z = p.z + nz * dist * side;
    const farFromOthers = result.every(
      (s) => Math.hypot(s.pos[0] - x, s.pos[1] - z) >= 3,
    );
    const farFromNodes = CAREER_NODES.every(
      (n) => Math.hypot(n.pos[0] - x, n.pos[1] - z) >= 6,
    );
    const farFromStart =
      Math.hypot(x - DRONE_START[0], z - DRONE_START[1]) >= 5;
    if (farFromOthers && farFromNodes && farFromStart) {
      result.push({ name: SKILLS[result.length], pos: [x, z] });
      t += 0.036;
    } else {
      t += 0.008;
    }
  }
  // Fallback (should not happen with the fixed seed): line them along the path.
  while (result.length < SKILLS.length) {
    const u = 0.05 + (result.length / SKILLS.length) * 0.9;
    const p = splineCurve.getPointAt(u);
    result.push({ name: SKILLS[result.length], pos: [p.x + 2.9, p.z] });
  }
  return result;
}

export interface DecorItem {
  pos: [number, number];
  scale: number;
  rotation: number;
}

function scatterDecor(
  count: number,
  seed: number,
  minScale: number,
  maxScale: number,
): DecorItem[] {
  const rng = mulberry32(seed);
  const items: DecorItem[] = [];
  let guard = 0;
  while (items.length < count && guard++ < 5000) {
    const x = -50 + rng() * 100;
    const z = -96 + rng() * 112;
    if (Math.hypot(x - DRONE_START[0], z - DRONE_START[1]) < 6) continue;
    if (distanceToSpline(x, z) <= 6.5) continue;
    if (CAREER_NODES.some((n) => Math.hypot(n.pos[0] - x, n.pos[1] - z) < 8))
      continue;
    if (items.some((d) => Math.hypot(d.pos[0] - x, d.pos[1] - z) < 2.5))
      continue;
    items.push({
      pos: [x, z],
      scale: minScale + rng() * (maxScale - minScale),
      rotation: rng() * Math.PI * 2,
    });
  }
  return items;
}

/** ~50 pale background crystals, all further than 6.5 units from the path. */
export const DECOR_CRYSTALS: DecorItem[] = scatterDecor(50, 1337, 0.6, 1.7);
/** 9 white pylons with orange tips, also off the path. */
export const DECOR_PYLONS: DecorItem[] = scatterDecor(9, 424242, 3.6, 6.2);

/** Footprint tiles along the path, spaced ~2.6 units apart. */
export function computeTiles(): { pos: [number, number]; alt: boolean }[] {
  const length = splineCurve.getLength();
  const count = Math.ceil(length / TILE_STEP);
  const points = splineCurve.getSpacedPoints(count);
  return points.slice(0, -1).map((p, i) => ({
    pos: [p.x, p.z] as [number, number],
    alt: i % 3 === 2,
  }));
}

export const TILES = computeTiles();
export const SKILL_POSITIONS = computeSkillPickups();

// Dev/testing affordance: pickup coordinates for e2e scripts.
if (import.meta.env.DEV) {
  (window as unknown as { __skills: SkillPickupData[] }).__skills =
    SKILL_POSITIONS;
}
