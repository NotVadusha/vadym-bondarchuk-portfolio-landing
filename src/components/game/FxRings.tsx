import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { useGameStore } from "@/store/gameStore";

const LIFETIME = 0.7;

function FxRing({ id, pos, color }: { id: number; pos: [number, number]; color: string }) {
  const mesh = useRef<THREE.Mesh>(null);
  const age = useRef(0);

  useFrame((_, dtRaw) => {
    const dt = Math.min(dtRaw, 0.05);
    age.current += dt;
    const k = Math.min(age.current / LIFETIME, 1);
    const m = mesh.current;
    if (!m) return;
    // Expand to ×7 over ~0.7s while fading out.
    m.scale.setScalar(1 + k * 6);
    (m.material as THREE.MeshBasicMaterial).opacity = (1 - k) * 0.85;
    if (k >= 1) useGameStore.getState().removeFx(id);
  });

  return (
    <mesh ref={mesh} rotation-x={-Math.PI / 2} position={[pos[0], 0.35, pos[1]]}>
      <ringGeometry args={[0.85, 1.05, 48]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.85}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

export function FxRings() {
  const fx = useGameStore((s) => s.fx);
  return (
    <group>
      {fx.map((ring) => (
        <FxRing key={ring.id} id={ring.id} pos={ring.pos} color={ring.color} />
      ))}
    </group>
  );
}
