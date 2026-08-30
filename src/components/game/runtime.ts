import * as THREE from "three";

import { DRONE_START } from "@/constants/gameData";

/**
 * Mutable per-frame game state that must never live in React state:
 * drone position/velocity, camera yaw/zoom, input, transition progress.
 */
export const runtime = {
  dronePos: new THREE.Vector3(DRONE_START[0], 0, DRONE_START[1]),
  droneVel: new THREE.Vector3(),
  bobT: 0,
  camYaw: 0,
  camDist: 14,
  /** Last camera look-at target, used as the transition start point. */
  lastLook: new THREE.Vector3(0, 2, -40),
  transition: {
    active: false,
    kind: "toPlay" as "toPlay" | "toIdle",
    t: 0,
    dur: 1.2,
    fromPos: new THREE.Vector3(),
    fromLook: new THREE.Vector3(),
  },
  keys: new Set<string>(),
  joy: { x: 0, y: 0 },
};

export function resetRuntime() {
  runtime.dronePos.set(DRONE_START[0], 0, DRONE_START[1]);
  runtime.droneVel.set(0, 0, 0);
  runtime.camYaw = 0;
  runtime.camDist = 14;
  runtime.keys.clear();
  runtime.joy.x = 0;
  runtime.joy.y = 0;
  runtime.transition.active = false;
}

/** Camera rig target hovering behind the drone. */
export function behindDroneTarget(
  out: THREE.Vector3,
  yaw: number,
  dist: number,
) {
  out.set(
    runtime.dronePos.x + Math.sin(yaw) * dist,
    2 + dist * 0.52,
    runtime.dronePos.z + Math.cos(yaw) * dist,
  );
  return out;
}

/** Orbit position for the attract mode around the map centre. */
export function idleOrbitTarget(out: THREE.Vector3, t: number) {
  const a = t * 0.08;
  out.set(Math.sin(a) * 46, 28, -40 + Math.cos(a) * 46);
  return out;
}

export function easeInOutCubic(x: number): number {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

// Dev/testing affordance: inspect the mutable game state from the console.
if (import.meta.env.DEV) {
  (window as unknown as { __runtime: typeof runtime }).__runtime = runtime;
}
