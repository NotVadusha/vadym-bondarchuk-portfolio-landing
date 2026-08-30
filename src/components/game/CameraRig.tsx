import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

import {
  behindDroneTarget,
  easeInOutCubic,
  idleOrbitTarget,
  runtime,
} from "@/components/game/runtime";
import { useGameStore } from "@/store/gameStore";

const IDLE_LOOK = new THREE.Vector3(0, 2, -40);
const DRONE_LOOK_Y = 2.2;

export function CameraRig() {
  const { camera } = useThree();
  const look = useRef(new THREE.Vector3(0, 2, -40));
  const target = useRef(new THREE.Vector3());

  useFrame((state, dtRaw) => {
    const dt = Math.min(dtRaw, 0.05);
    const t = state.clock.elapsedTime;
    const phase = useGameStore.getState().phase;
    const damp = 1 - Math.exp(-dt * 5.5);

    if (phase === "idle") {
      camera.position.lerp(idleOrbitTarget(target.current, t), 1 - Math.exp(-dt * 2.5));
      look.current.lerp(IDLE_LOOK, 1 - Math.exp(-dt * 3));
      camera.lookAt(look.current);
      runtime.lastLook.copy(look.current);
      return;
    }

    if (phase === "transition") {
      const tr = runtime.transition;
      if (!tr.active) {
        tr.active = true;
        tr.t = 0;
        tr.fromPos.copy(camera.position);
        tr.fromLook.copy(look.current);
      }
      tr.t += dt;
      const k = easeInOutCubic(Math.min(tr.t / tr.dur, 1));
      if (tr.kind === "toPlay") {
        behindDroneTarget(target.current, runtime.camYaw, runtime.camDist);
        look.current.lerpVectors(
          tr.fromLook,
          target.current.set(
            runtime.dronePos.x,
            DRONE_LOOK_Y,
            runtime.dronePos.z,
          ),
          k,
        );
        // Position must interpolate toward the behind-drone point.
        const posTarget = new THREE.Vector3().lerpVectors(
          tr.fromPos,
          behindDroneTarget(
            new THREE.Vector3(),
            runtime.camYaw,
            runtime.camDist,
          ),
          k,
        );
        camera.position.copy(posTarget);
      } else {
        camera.position.lerpVectors(
          tr.fromPos,
          idleOrbitTarget(target.current, t),
          k,
        );
        look.current.lerpVectors(tr.fromLook, IDLE_LOOK, k);
      }
      camera.lookAt(look.current);
      runtime.lastLook.copy(look.current);
      if (tr.t >= tr.dur) {
        tr.active = false;
        useGameStore.getState().transitionDone();
      }
      return;
    }

    // playing / complete: follow the drone
    behindDroneTarget(target.current, runtime.camYaw, runtime.camDist);
    camera.position.lerp(target.current, damp);
    look.current.lerp(
      target.current.set(runtime.dronePos.x, DRONE_LOOK_Y, runtime.dronePos.z),
      damp,
    );
    camera.lookAt(look.current);
    runtime.lastLook.copy(look.current);
  });

  return null;
}
