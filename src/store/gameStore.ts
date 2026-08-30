import { create } from "zustand";

import { CAREER_NODES, GAME_COLORS, SKILLS } from "@/constants/gameData";
import { runtime, resetRuntime } from "@/components/game/runtime";

export type GamePhase = "idle" | "transition" | "playing" | "complete";

export interface FxRing {
  id: number;
  pos: [number, number];
  color: string;
}

/** Structured so the copy can be localized at render time. */
export type PopupData =
  | { id: number; kind: "node"; nodeId: string; count: number }
  | { id: number; kind: "done" };

let fxId = 0;
let popupId = 0;

interface GameStore {
  phase: GamePhase;
  visitedNodes: string[];
  collectedSkills: string[];
  activeDossierId: string | null;
  muted: boolean;
  hasPlayed: boolean;
  startedAt: number | null;
  elapsedMs: number;
  fx: FxRing[];
  popup: PopupData | null;

  requestStart: () => void;
  requestExit: () => void;
  transitionDone: () => void;
  setPhase: (phase: GamePhase) => void;
  visitNode: (id: string) => boolean;
  collectSkill: (name: string) => boolean;
  openDossier: (id: string) => void;
  closeDossier: () => void;
  addFx: (pos: [number, number], color: string) => void;
  removeFx: (id: number) => void;
  showDonePopup: () => void;
  clearPopup: () => void;
  toggleMute: () => void;
  restart: () => void;
  finish: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  phase: "idle",
  visitedNodes: [],
  collectedSkills: [],
  activeDossierId: null,
  muted: false,
  hasPlayed: false,
  startedAt: null,
  elapsedMs: 0,
  fx: [],
  popup: null,

  requestStart: () => {
    const { phase } = get();
    if (phase !== "idle") return;
    runtime.transition.kind = "toPlay";
    set({ phase: "transition" });
  },

  requestExit: () => {
    const { phase } = get();
    if (phase !== "playing" && phase !== "complete") return;
    runtime.transition.kind = "toIdle";
    set({ phase: "transition", activeDossierId: null });
  },

  transitionDone: () => {
    const { phase } = get();
    // Only enter these states from a transition; ignore stray calls.
    if (phase !== "transition") return;
    if (runtime.transition.kind === "toIdle") {
      set({ phase: "idle" });
      return;
    }
    set({ phase: "playing" });
    if (!get().hasPlayed) set({ hasPlayed: true, startedAt: Date.now() });
  },

  setPhase: (phase) => set({ phase }),

  visitNode: (id) => {
    const { visitedNodes, phase } = get();
    if (phase !== "playing" || visitedNodes.includes(id)) return false;
    const node = CAREER_NODES.find((n) => n.id === id);
    if (!node) return false;
    const count = visitedNodes.length + 1;
    set({
      visitedNodes: [...visitedNodes, id],
      activeDossierId: id,
      popup: { id: ++popupId, kind: "node", nodeId: id, count },
      fx: [
        ...get().fx,
        { id: ++fxId, pos: node.pos, color: GAME_COLORS.beaconVisited },
      ],
    });
    return true;
  },

  collectSkill: (name) => {
    const { collectedSkills, phase } = get();
    if (phase !== "playing" || collectedSkills.includes(name)) return false;
    set({ collectedSkills: [...collectedSkills, name] });
    return true;
  },

  openDossier: (id) => set({ activeDossierId: id }),
  closeDossier: () => set({ activeDossierId: null }),
  addFx: (pos, color) =>
    set({ fx: [...get().fx, { id: ++fxId, pos, color }] }),
  removeFx: (id) => set({ fx: get().fx.filter((f) => f.id !== id) }),
  showDonePopup: () => set({ popup: { id: ++popupId, kind: "done" } }),
  clearPopup: () => set({ popup: null }),
  toggleMute: () => set({ muted: !get().muted }),

  restart: () => {
    resetRuntime();
    set({
      phase: "playing",
      visitedNodes: [],
      collectedSkills: [],
      activeDossierId: null,
      fx: [],
      popup: null,
      startedAt: Date.now(),
      elapsedMs: 0,
      hasPlayed: true,
    });
  },

  finish: () => {
    const { startedAt, elapsedMs } = get();
    set({
      phase: "complete",
      elapsedMs: startedAt ? Date.now() - startedAt : elapsedMs,
      activeDossierId: null,
    });
  },
}));

export const xpPercent = (visited: number, collected: number) =>
  Math.round(
    (visited / CAREER_NODES.length) * 50 + (collected / SKILLS.length) * 50,
  );

// Dev/testing affordance: reach the store from the console or e2e scripts.
if (import.meta.env.DEV) {
  (window as unknown as { __game: typeof useGameStore }).__game = useGameStore;
}

export const formatTime = (ms: number) => {
  const total = Math.floor(ms / 1000);
  const mm = String(Math.floor(total / 60)).padStart(2, "0");
  const ss = String(total % 60).padStart(2, "0");
  return `${mm}:${ss}`;
};
