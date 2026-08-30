import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { GAME_COLORS, SKILL_POSITIONS } from "@/constants/gameData";
import type { SkillPickupData } from "@/constants/gameData";
import { disposeLabelSprite, makeLabelSprite } from "@/components/game/sprites";
import { useGameStore } from "@/store/gameStore";

export function SkillPickup({ skill, index }: { skill: SkillPickupData; index: number }) {
  const collected = useGameStore((s) => s.collectedSkills.includes(skill.name));
  const group = useRef<THREE.Group>(null);
  const label = useMemo(
    () => makeLabelSprite(skill.name, { fontSize: 26, scale: 0.014 }),
    [skill.name],
  );
  useEffect(() => () => disposeLabelSprite(label), [label]);

  useFrame((state, dtRaw) => {
    const dt = Math.min(dtRaw, 0.05);
    const t = state.clock.elapsedTime;
    const g = group.current;
    if (!g) return;
    const target = collected ? 0.001 : 1;
    const cur = g.scale.x;
    const next = THREE.MathUtils.lerp(cur, target, 1 - Math.exp(-dt * (collected ? 14 : 10)));
    g.scale.setScalar(next);
    g.visible = next > 0.02;
    if (!g.visible) return;
    g.position.y = 1.1 + Math.sin(t * 2 + index * 1.3) * 0.25;
    g.rotation.y += dt * 1.4;
  });

  return (
    <group ref={group} position={[skill.pos[0], 1.1, skill.pos[1]]}>
      <mesh>
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial
          color={GAME_COLORS.crystalDeep}
          emissive={GAME_COLORS.crystal}
          emissiveIntensity={0.9}
          flatShading
          roughness={0.3}
        />
      </mesh>
      <primitive object={label} position-y={1.05} />
    </group>
  );
}

export function SkillPickups() {
  return (
    <group>
      {SKILL_POSITIONS.map((skill, i) => (
        <SkillPickup key={skill.name} skill={skill} index={i} />
      ))}
    </group>
  );
}
