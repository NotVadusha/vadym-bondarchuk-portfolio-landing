import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import {
  CAREER_NODES,
  GAME_COLORS,
  SKILL_POSITIONS,
  WORLD_BOUNDS,
} from "@/constants/gameData";
import { sound } from "@/components/game/sound";
import { runtime } from "@/components/game/runtime";
import { useGameStore } from "@/store/gameStore";

const TRAIL_COUNT = 26;
const SPEED = 11;
const DRONE_Y = 1.6;

/** Movement direction in the XZ plane, relative to the camera yaw. */
function getMoveInput(out: THREE.Vector2) {
  const k = runtime.keys;
  let forward =
    (k.has("KeyW") || k.has("ArrowUp") ? 1 : 0) -
    (k.has("KeyS") || k.has("ArrowDown") ? 1 : 0) +
    runtime.joy.y;
  let strafe =
    (k.has("KeyD") || k.has("ArrowRight") ? 1 : 0) -
    (k.has("KeyA") || k.has("ArrowLeft") ? 1 : 0) +
    runtime.joy.x;
  forward = Math.max(-1, Math.min(1, forward));
  strafe = Math.max(-1, Math.min(1, strafe));

  const sin = Math.sin(runtime.camYaw);
  const cos = Math.cos(runtime.camYaw);
  // forward = (-sin, -cos), right = (cos, -sin) — camera-relative WASD.
  out.set(-sin * forward + cos * strafe, -cos * forward - sin * strafe);
  if (out.lengthSq() > 1) out.normalize();
  return out;
}

export function Drone() {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const shadow = useRef<THREE.Mesh>(null);
  const trail = useRef<THREE.InstancedMesh>(null);
  const trailPoints = useRef(
    Array.from({ length: TRAIL_COUNT }, () => new THREE.Vector3(0, DRONE_Y, 8)),
  );
  const trailHead = useRef(0);
  const tmpVec = useRef(new THREE.Vector3());
  const tmpMat = useRef(new THREE.Matrix4());
  const moveDir = useRef(new THREE.Vector2());
  const targetColor = useRef(new THREE.Color());

  useFrame((_, dtRaw) => {
    const dt = Math.min(dtRaw, 0.05);
    const store = useGameStore.getState();
    const playing = store.phase === "playing";
    runtime.bobT += dt;

    if (playing) {
      const input = getMoveInput(moveDir.current);
      tmpVec.current.set(input.x * SPEED, 0, input.y * SPEED);
      runtime.droneVel.lerp(tmpVec.current, 1 - Math.exp(-dt * 7));
      runtime.dronePos.addScaledVector(runtime.droneVel, dt);
      runtime.dronePos.x = THREE.MathUtils.clamp(
        runtime.dronePos.x,
        WORLD_BOUNDS.minX,
        WORLD_BOUNDS.maxX,
      );
      runtime.dronePos.z = THREE.MathUtils.clamp(
        runtime.dronePos.z,
        WORLD_BOUNDS.minZ,
        WORLD_BOUNDS.maxZ,
      );

      // Skill pickups
      for (const skill of SKILL_POSITIONS) {
        if (store.collectedSkills.includes(skill.name)) continue;
        if (
          Math.hypot(runtime.dronePos.x - skill.pos[0], runtime.dronePos.z - skill.pos[1]) <
          1.9
        ) {
          if (useGameStore.getState().collectSkill(skill.name)) sound.pickup();
        }
      }

      // Career nodes
      for (const node of CAREER_NODES) {
        const d = Math.hypot(
          runtime.dronePos.x - node.pos[0],
          runtime.dronePos.z - node.pos[1],
        );
        if (d < 4.2) {
          if (useGameStore.getState().visitNode(node.id)) sound.nodeOpen();
        } else if (d > 6 && store.activeDossierId === node.id) {
          useGameStore.getState().closeDossier();
        }
      }
    } else {
      runtime.droneVel.multiplyScalar(Math.exp(-dt * 4));
      runtime.dronePos.addScaledVector(runtime.droneVel, dt);
    }

    // Hover bob (±0.12 @ 3.4 Hz) and idle pulse
    const bob = Math.sin(runtime.bobT * 3.4) * 0.12;
    group.current?.position.set(runtime.dronePos.x, DRONE_Y + bob, runtime.dronePos.z);
    if (inner.current) {
      const vx = runtime.droneVel.x;
      const vz = runtime.droneVel.z;
      inner.current.rotation.x = THREE.MathUtils.lerp(
        inner.current.rotation.x,
        vz * 0.045,
        1 - Math.exp(-dt * 6),
      );
      inner.current.rotation.z = THREE.MathUtils.lerp(
        inner.current.rotation.z,
        -vx * 0.045,
        1 - Math.exp(-dt * 6),
      );
    }
    if (core.current && !playing) {
      const pulse = 1 + Math.sin(runtime.bobT * 2.2) * 0.07;
      core.current.scale.setScalar(pulse);
    } else if (core.current) {
      core.current.scale.setScalar(1);
    }

    // Ground shadow blob
    if (shadow.current) {
      shadow.current.position.set(runtime.dronePos.x, 0.08, runtime.dronePos.z);
    }

    // Trail: advance the ring buffer and update instance matrices
    trailHead.current = (trailHead.current + 1) % TRAIL_COUNT;
    trailPoints.current[trailHead.current].set(
      runtime.dronePos.x,
      DRONE_Y + bob,
      runtime.dronePos.z,
    );
    if (trail.current) {
      for (let i = 0; i < TRAIL_COUNT; i++) {
        const p =
          trailPoints.current[
            (trailHead.current - i + TRAIL_COUNT * 2) % TRAIL_COUNT
          ];
        const s = Math.max(0.02, (1 - i / TRAIL_COUNT) * 0.34);
        tmpMat.current.makeScale(s, s, s).setPosition(p);
        trail.current.setMatrixAt(i, tmpMat.current);
      }
      trail.current.instanceMatrix.needsUpdate = true;
    }
    void targetColor;
  });

  return (
    <>
      <group ref={group} position={[runtime.dronePos.x, DRONE_Y, runtime.dronePos.z]}>
        <group ref={inner}>
          <mesh ref={core} castShadow>
            <icosahedronGeometry args={[0.55, 0]} />
            <meshStandardMaterial
              color={GAME_COLORS.crystal}
              emissive={GAME_COLORS.crystal}
              emissiveIntensity={0.55}
              flatShading
              roughness={0.4}
            />
          </mesh>
          <mesh>
            <icosahedronGeometry args={[0.85, 0]} />
            <meshBasicMaterial color={GAME_COLORS.ink} wireframe transparent opacity={0.5} />
          </mesh>
        </group>
      </group>
      <instancedMesh
        ref={trail}
        args={[undefined, undefined, TRAIL_COUNT]}
        frustumCulled={false}
      >
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color={GAME_COLORS.crystal} transparent opacity={0.45} depthWrite={false} />
      </instancedMesh>
      <mesh ref={shadow} rotation-x={-Math.PI / 2}>
        <circleGeometry args={[0.7, 24]} />
        <meshBasicMaterial color={GAME_COLORS.ink} transparent opacity={0.12} depthWrite={false} />
      </mesh>
    </>
  );
}
