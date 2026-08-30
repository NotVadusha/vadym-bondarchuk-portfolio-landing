import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import {
  DECOR_CRYSTALS,
  DECOR_PYLONS,
  GAME_COLORS,
  TILES,
} from "@/constants/gameData";

/** Stable pseudo-random in [0,1) — no Math.random, layout must not jitter. */
const rng = (i: number) => (((Math.sin(i * 127.1) * 43758.5453) % 1) + 1) % 1;

function Clouds() {
  const group = useRef<THREE.Group>(null);
  const clouds = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        pos: [-70 + rng(i) * 140, 10 + rng(i + 10) * 8, 18 - rng(i + 20) * 130] as [
          number,
          number,
          number,
        ],
        speed: 0.25 + rng(i + 30) * 0.5,
        puffs: Array.from({ length: 2 + Math.round(rng(i + 40)) }, (_, j) => {
          const s = 1.1 + rng(i * 7 + j) * 1.4;
          return {
            offset: [j * s * 1.1 - s, (rng(i + j + 5) - 0.5) * 0.4, (rng(i + j + 9) - 0.5) * s] as [
              number,
              number,
              number,
            ],
            scale: [s * 1.5, s * 0.75, s] as [number, number, number],
          };
        }),
      })),
    [],
  );

  useFrame((_, dtRaw) => {
    const dt = Math.min(dtRaw, 0.05);
    if (!group.current) return;
    for (const child of group.current.children) {
      child.position.x += (child.userData.speed as number) * dt;
      if (child.position.x > 85) child.position.x = -85;
    }
  });

  return (
    <group ref={group}>
      {clouds.map((cloud, i) => (
        <group key={i} position={cloud.pos} userData={{ speed: cloud.speed }}>
          {cloud.puffs.map((puff, j) => (
            <mesh key={j} position={puff.offset} scale={puff.scale}>
              <icosahedronGeometry args={[1, 0]} />
              <meshStandardMaterial color="#ffffff" flatShading roughness={1} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

/** Slow-drifting motes that keep the empty sky from reading as dead space. */
function Drift() {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const base = useMemo(
    () =>
      Array.from({ length: 70 }, (_, i) => ({
        x: (rng(i) - 0.5) * 110,
        y: 2 + rng(i + 100) * 11,
        z: 16 - rng(i + 200) * 124,
        ph: rng(i + 300) * 6.28,
      })),
    [],
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const m = mesh.current;
    if (!m) return;
    base.forEach((b, i) => {
      dummy.position.set(b.x, b.y + Math.sin(t * 0.6 + b.ph) * 0.8, b.z);
      dummy.rotation.set(t * 0.3 + b.ph, b.ph, 0);
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
    });
    m.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, base.length]} frustumCulled={false}>
      <tetrahedronGeometry args={[0.17, 0]} />
      <meshBasicMaterial color="#9db8d6" />
    </instancedMesh>
  );
}

function Ground() {
  return (
    <>
      <mesh rotation-x={-Math.PI / 2} position={[0, -0.02, -40]} receiveShadow>
        <planeGeometry args={[440, 440]} />
        <meshStandardMaterial color={GAME_COLORS.ground} roughness={1} />
      </mesh>
      <gridHelper
        args={[330, 108, GAME_COLORS.grid, "#dde7f0"]}
        position={[0, 0.01, -40]}
      />
    </>
  );
}

/** Hexagonal stepping stones along the career spline; every 11th glows orange. */
function PathTiles() {
  return (
    <group>
      {TILES.map((tile, i) => (
        <group key={i} position={[tile.pos[0], 0, tile.pos[1]]}>
          <mesh position-y={0.11} receiveShadow>
            <cylinderGeometry args={[2.6, 2.6, 0.22, 6]} />
            <meshStandardMaterial
              color={tile.alt ? GAME_COLORS.tileAlt : GAME_COLORS.tile}
              flatShading
              roughness={0.9}
            />
          </mesh>
          {i % 11 === 5 && (
            <mesh position-y={0.24}>
              <cylinderGeometry args={[2.2, 2.2, 0.22, 6]} />
              <meshStandardMaterial
                color={GAME_COLORS.crystalDeep}
                emissive={GAME_COLORS.crystal}
                emissiveIntensity={0.75}
                flatShading
              />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
}

function Decor() {
  return (
    <group>
      {DECOR_CRYSTALS.map((c, i) => (
        <mesh
          key={`c${i}`}
          position={[c.pos[0], c.scale * 0.55, c.pos[1]]}
          rotation-y={c.rotation}
          scale={[c.scale, c.scale * 1.9, c.scale]}
        >
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={GAME_COLORS.crystalPale}
            emissive="#d8e5f1"
            emissiveIntensity={0.3}
            flatShading
            roughness={0.85}
          />
        </mesh>
      ))}
      {DECOR_PYLONS.map((p, i) => (
        <group key={`p${i}`} position={[p.pos[0], 0, p.pos[1]]}>
          <mesh position-y={p.scale / 2} castShadow>
            <cylinderGeometry args={[0.09, 0.16, p.scale, 5]} />
            <meshStandardMaterial color={GAME_COLORS.pylon} roughness={0.9} />
          </mesh>
          <mesh position-y={p.scale + 0.35}>
            <octahedronGeometry args={[0.34, 0]} />
            <meshStandardMaterial
              color={GAME_COLORS.crystalDeep}
              emissive={GAME_COLORS.pylonTip}
              emissiveIntensity={1}
              flatShading
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export function World() {
  return (
    <group>
      <Ground />
      <PathTiles />
      <Decor />
      <Clouds />
      <Drift />
    </group>
  );
}
