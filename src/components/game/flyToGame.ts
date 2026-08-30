import { ensureAudio } from "@/components/game/sound";
import { useGameStore } from "@/store/gameStore";

/** Scroll the page back to the world, then start a run. */
export function flyToGame() {
  window.scrollTo({ top: 0, behavior: "smooth" });
  setTimeout(() => {
    ensureAudio();
    useGameStore.getState().requestStart();
  }, 650);
}
