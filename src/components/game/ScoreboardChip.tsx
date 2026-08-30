import { Map } from "lucide-react";

import { CAREER_NODES, SKILLS } from "@/constants/gameData";
import { flyToGame } from "@/components/game/flyToGame";
import { useI18n } from "@/i18n";
import { useGameStore } from "@/store/gameStore";

/**
 * Fixed scoreboard chip (bottom-right), shown outside the game once the
 * player has started a run. Click scrolls up and starts another one.
 */
export function ScoreboardChip() {
  const { c } = useI18n();
  const hasPlayed = useGameStore((s) => s.hasPlayed);
  const phase = useGameStore((s) => s.phase);
  const visited = useGameStore((s) => s.visitedNodes.length);
  const collected = useGameStore((s) => s.collectedSkills.length);

  if (!hasPlayed || phase !== "idle") return null;

  return (
    <button type="button" className="scorechip" onClick={flyToGame}>
      <Map size={16} strokeWidth={2.4} color="var(--orange)" />
      <span>
        <b>{visited}</b>/{CAREER_NODES.length} {c.scoreboard.nodes} ·{" "}
        <b>{collected}</b>/{SKILLS.length} {c.scoreboard.skills}
      </span>
    </button>
  );
}
