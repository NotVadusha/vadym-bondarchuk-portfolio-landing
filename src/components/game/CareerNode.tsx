import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { CAREER_NODES, GAME_COLORS } from "@/constants/gameData";
import type { CareerNodeData } from "@/constants/gameData";
import { disposeLabelSprite, makeLabelSprite } from "@/components/game/sprites";
import { useI18n } from "@/i18n";
import { useGameStore } from "@/store/gameStore";

const BLUE = new THREE.Color(GAME_COLORS.beacon);
const ORANGE = new THREE.Color(GAME_COLORS.beaconVisited);
const BEAM_BLUE = new THREE.Color(GAME_COLORS.beam);
const BEAM_ORANGE = new THREE.Color(GAME_COLORS.beamVisited);

function CareerNode({ node, index }: { node: CareerNodeData; index: number }) {
  const { c } = useI18n();
  const visited = useGameStore((s) => s.visitedNodes.includes(node.id));
  const beacon = useRef<THREE.Mesh>(null);
  const beam = useRef<THREE.Mesh>(null);
  const label = c.nodes[node.id].label;

  // Visited nodes get an orange plate with a star, like the mockup.
  const sprite = useMemo(
    () =>
      makeLabelSprite(visited ? `${label.toUpperCase()} ★` : label.toUpperCase(), {
        bg: visited ? GAME_COLORS.beaconVisited : "#ffffff",
        fg: visited ? "#ffffff" : GAME_COLORS.ink,
      }),
    [label, visited],
  );
  useEffect(() => () => disposeLabelSprite(sprite), [sprite]);

  useFrame((state, dtRaw) => {
    const dt = Math.min(dtRaw, 0.05);
    const t = state.clock.elapsedTime;
    if (beacon.current) {
      beacon.current.rotation.y += dt * (visited ? 1.6 : 0.9);
      beacon.current.position.y = 3 + Math.sin(t * 1.5 + index) * 0.25;
      const target = visited ? ORANGE : BLUE;
      const mat = beacon.current.material as THREE.MeshStandardMaterial;
      mat.color.lerp(target, 1 - Math.exp(-dt * 5));
      mat.emissive.lerp(target, 1 - Math.exp(-dt * 5));
    }
    if (beam.current) {
      const mat = beam.current.material as THREE.MeshBasicMaterial;
      mat.color.lerp(visited ? BEAM_ORANGE : BEAM_BLUE, 1 - Math.exp(-dt * 5));
      mat.opacity = 0.3 + Math.sin(t * 2.4 + index) * 0.05 + (visited ? 0.14 : 0);
    }
  });

  return (
    <group position={[node.pos[0], 0, node.pos[1]]}>
      <mesh position-y={0.25} castShadow receiveShadow>
        <cylinderGeometry args={[3.1, 3.5, 0.5, 6]} />
        <meshStandardMaterial color="#ffffff" flatShading roughness={0.85} />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position-y={0.55}>
        <torusGeometry args={[2.9, 0.09, 8, 48]} />
        <meshBasicMaterial
          color={visited ? GAME_COLORS.beaconVisited : GAME_COLORS.beacon}
          transparent
          opacity={0.85}
        />
      </mesh>
      <mesh ref={beacon} position-y={3} castShadow>
        <octahedronGeometry args={[1.05, 0]} />
        <meshStandardMaterial
          color={GAME_COLORS.beacon}
          emissive={GAME_COLORS.beacon}
          emissiveIntensity={0.55}
          flatShading
          roughness={0.35}
        />
      </mesh>
      <mesh position-y={3.4}>
        <octahedronGeometry args={[1.7, 0]} />
        <meshBasicMaterial color={GAME_COLORS.ink} wireframe transparent opacity={0.55} />
      </mesh>
      <mesh ref={beam} position-y={13}>
        <cylinderGeometry args={[0.55, 0.55, 26, 12, 1, true]} />
        <meshBasicMaterial
          color={GAME_COLORS.beam}
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
      <primitive object={sprite} position-y={6.6} />
    </group>
  );
}

export function CareerNodes() {
  return (
    <group>
      {CAREER_NODES.map((node, i) => (
        <CareerNode key={node.id} node={node} index={i} />
      ))}
    </group>
  );
}
