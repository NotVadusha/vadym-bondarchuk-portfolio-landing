import { Volume2, VolumeX, X } from "lucide-react";

import { Rich } from "@/components/Rich";
import { CAREER_NODES, SKILLS } from "@/constants/gameData";
import type { JoyVisual } from "@/components/game/useGameControls";
import { useI18n } from "@/i18n";
import { useGameStore, xpPercent } from "@/store/gameStore";

const MAX_CHIPS = 12;

export function Hud({ joy, visible }: { joy: JoyVisual; visible: boolean }) {
  const { c } = useI18n();
  const visited = useGameStore((s) => s.visitedNodes);
  const collected = useGameStore((s) => s.collectedSkills);
  const muted = useGameStore((s) => s.muted);
  const toggleMute = useGameStore((s) => s.toggleMute);
  const requestExit = useGameStore((s) => s.requestExit);
  const xp = xpPercent(visited.length, collected.length);

  return (
    <div className={`hud${visible ? " on" : ""}`}>
      <div className="hud-tl hpanel">
        <div className="lab">{c.hud.questLabel}</div>
        <div className="mission">
          <Rich text={c.hud.mission} />
        </div>
        <div className="dots">
          {CAREER_NODES.map((node, i) => (
            <i key={node.id} className={i < visited.length ? "on" : undefined} />
          ))}
          <span className="cnt">
            {visited.length}/{CAREER_NODES.length} {c.hud.nodes}
          </span>
        </div>
      </div>

      <div className="hud-tr hpanel">
        <div className="lab">{c.hud.lootLabel}</div>
        <div className="cnt">
          {collected.length}/{SKILLS.length}
        </div>
        <div className="chips">
          {collected
            .slice(-MAX_CHIPS)
            .reverse()
            .map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
        </div>
      </div>

      <div className="hud-xp hpanel">
        <div className="row">
          <span>{c.hud.progress}</span>
          <b>{xp}%</b>
        </div>
        <div className="bar">
          <i style={{ width: `${xp}%` }} />
        </div>
      </div>

      <div className="hud-bl">
        <button type="button" className="icobtn" onClick={requestExit}>
          <X size={14} strokeWidth={2.6} />
          {c.hud.exit}
        </button>
        <button type="button" className="icobtn" onClick={toggleMute}>
          {muted ? (
            <VolumeX size={14} strokeWidth={2.6} />
          ) : (
            <Volume2 size={14} strokeWidth={2.6} />
          )}
          {muted ? c.hud.soundOff : c.hud.sound}
        </button>
      </div>

      <div className="hud-br">
        {c.hud.hints.map((line, i) => (
          <span key={i}>
            <Rich text={line} />
            {i < c.hud.hints.length - 1 && <br />}
          </span>
        ))}
      </div>

      {joy.active && (
        <div className="joy" style={{ left: joy.cx, top: joy.cy }}>
          <i style={{ transform: `translate(${joy.dx}px, ${joy.dy}px)` }} />
        </div>
      )}
    </div>
  );
}
