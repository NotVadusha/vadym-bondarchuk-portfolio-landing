import { Canvas } from "@react-three/fiber";

import { GAME_COLORS } from "@/constants/gameData";
import { CameraRig } from "@/components/game/CameraRig";
import { CareerNodes } from "@/components/game/CareerNode";
import { Drone } from "@/components/game/Drone";
import { FxRings } from "@/components/game/FxRings";
import { SkillPickups } from "@/components/game/SkillPickup";
import { World } from "@/components/game/World";

export function GameCanvas() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ fov: 55, near: 0.1, far: 400, position: [0, 28, 6] }}
      gl={{ antialias: true }}
    >
      <color attach="background" args={[GAME_COLORS.sky]} />
      <fog attach="fog" args={[GAME_COLORS.sky, 42, 165]} />
      <hemisphereLight args={["#ffffff", "#d6e0ea", 1.1]} />
      <directionalLight
        position={[40, 70, 30]}
        intensity={1.1}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-90}
        shadow-camera-right={90}
        shadow-camera-top={90}
        shadow-camera-bottom={-90}
        shadow-camera-near={1}
        shadow-camera-far={200}
        shadow-bias={-0.0004}
      />
      <World />
      <CareerNodes />
      <SkillPickups />
      <Drone />
      <FxRings />
      <CameraRig />
    </Canvas>
  );
}
