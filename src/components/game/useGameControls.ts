import { useEffect } from "react";
import type { RefObject } from "react";

import { ensureAudio } from "@/components/game/sound";
import { runtime } from "@/components/game/runtime";
import { useGameStore } from "@/store/gameStore";

export interface JoyVisual {
  active: boolean;
  cx: number;
  cy: number;
  dx: number;
  dy: number;
}

const JOY_RADIUS = 48;
const YAW_SENSITIVITY = 0.005;

/**
 * Input layer: WASD/arrows (camera-relative), mouse/touch drag = camera yaw,
 * wheel = zoom, ESC = exit, Enter = start. Touch: left half = virtual
 * joystick, right half = camera. Writes into the mutable `runtime` singleton.
 */
export function useGameControls(
  containerRef: RefObject<HTMLElement | null>,
  onJoy: (joy: JoyVisual) => void,
) {
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const pointers = new Map<
      number,
      { mode: "joy" | "cam"; lastX: number; lastY: number }
    >();
    let joyBase = { x: 0, y: 0 };

    const setJoy = (dx: number, dy: number) => {
      const len = Math.hypot(dx, dy);
      const clamped =
        len > JOY_RADIUS ? { x: (dx / len) * JOY_RADIUS, y: (dy / len) * JOY_RADIUS } : { x: dx, y: dy };
      runtime.joy.x = clamped.x / JOY_RADIUS;
      runtime.joy.y = -clamped.y / JOY_RADIUS;
      onJoy({ active: true, cx: joyBase.x, cy: joyBase.y, dx: clamped.x, dy: clamped.y });
    };
    const clearJoy = () => {
      runtime.joy.x = 0;
      runtime.joy.y = 0;
      onJoy({ active: false, cx: 0, cy: 0, dx: 0, dy: 0 });
    };

    const onPointerDown = (e: PointerEvent) => {
      const { phase } = useGameStore.getState();
      if (phase !== "playing") return;
      const rect = el.getBoundingClientRect();
      const localX = e.clientX - rect.left;
      const isTouch = e.pointerType !== "mouse";
      const mode: "joy" | "cam" =
        isTouch && localX < rect.width / 2 ? "joy" : "cam";
      pointers.set(e.pointerId, { mode, lastX: e.clientX, lastY: e.clientY });
      if (mode === "joy") {
        joyBase = { x: e.clientX, y: e.clientY };
        setJoy(0, 0);
      }
      try {
        el.setPointerCapture?.(e.pointerId);
      } catch {
        // synthetic/unowned pointers can't be captured — drag still works via window listeners
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      const p = pointers.get(e.pointerId);
      if (!p) return;
      if (p.mode === "joy") {
        setJoy(e.clientX - joyBase.x, e.clientY - joyBase.y);
      } else {
        runtime.camYaw += (e.clientX - p.lastX) * YAW_SENSITIVITY;
      }
      p.lastX = e.clientX;
      p.lastY = e.clientY;
    };

    const onPointerUp = (e: PointerEvent) => {
      const p = pointers.get(e.pointerId);
      if (!p) return;
      pointers.delete(e.pointerId);
      if (p.mode === "joy") clearJoy();
    };

    const onWheel = (e: WheelEvent) => {
      const { phase } = useGameStore.getState();
      if (phase !== "playing") return;
      e.preventDefault();
      runtime.camDist = Math.min(26, Math.max(8, runtime.camDist + e.deltaY * 0.012));
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      const store = useGameStore.getState();
      if (e.code === "Escape") {
        if (store.phase === "playing") store.requestExit();
        return;
      }
      if (e.code === "Enter") {
        if (store.phase === "idle") {
          ensureAudio();
          store.requestStart();
        }
        return;
      }
      if (store.phase === "playing") runtime.keys.add(e.code);
    };

    const onKeyUp = (e: KeyboardEvent) => {
      runtime.keys.delete(e.code);
    };

    const onBlur = () => runtime.keys.clear();

    el.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    el.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", onBlur);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      el.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", onBlur);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
