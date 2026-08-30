import { RotateCcw, Send } from "lucide-react";

import { SKILLS } from "@/constants/gameData";
import { useI18n } from "@/i18n";
import { formatTime, useGameStore } from "@/store/gameStore";

interface CompleteModalProps {
  onRestart: () => void;
  onParty: () => void;
  onClose: () => void;
}

export function CompleteModal({ onRestart, onParty, onClose }: CompleteModalProps) {
  const { c } = useI18n();
  const elapsedMs = useGameStore((s) => s.elapsedMs);
  const collected = useGameStore((s) => s.collectedSkills);

  return (
    <div className="win">
      <div className="dcard">
        <h3>
          {c.complete.title} <em>{c.complete.titleAccent}</em>
        </h3>
        <div className="sub">{c.complete.sub}</div>
        <div className="rows">
          <div>
            <span>{c.complete.time}</span>
            <b>{formatTime(elapsedMs)}</b>
          </div>
          <div>
            <span>{c.complete.skills}</span>
            <b>
              {collected.length}/{SKILLS.length}
            </b>
          </div>
          <div>
            <span>{c.complete.nextLabel}</span>
            <b>{c.complete.nextValue}</b>
          </div>
        </div>
        <div className="btns">
          <button type="button" className="btn prime" onClick={onRestart}>
            <RotateCcw size={16} strokeWidth={2.4} />
            {c.complete.retry}
          </button>
          <button type="button" className="btn" onClick={onParty}>
            <Send size={16} strokeWidth={2.4} />
            {c.complete.toParty}
          </button>
          <button type="button" className="btn" onClick={onClose}>
            {c.complete.close}
          </button>
        </div>
      </div>
    </div>
  );
}
