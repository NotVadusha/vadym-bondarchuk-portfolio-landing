import { useEffect, useState } from "react";

import { CAREER_NODES } from "@/constants/gameData";
import { useI18n } from "@/i18n";
import { useGameStore } from "@/store/gameStore";

export function AchievementPopup() {
  const { c } = useI18n();
  const popup = useGameStore((s) => s.popup);
  const clearPopup = useGameStore((s) => s.clearPopup);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!popup) {
      setShown(false);
      return;
    }
    // Mount hidden for one frame so the slide-in transition actually runs.
    const raf = requestAnimationFrame(() => setShown(true));
    const hide = setTimeout(() => setShown(false), 2300);
    const clear = setTimeout(clearPopup, 2700);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(hide);
      clearTimeout(clear);
    };
  }, [popup, clearPopup]);

  if (!popup) return null;

  const [title, sub] =
    popup.kind === "done"
      ? [c.achievement.worldDone, c.achievement.worldDoneSub]
      : [
          c.achievement.nodeOpened(popup.count, CAREER_NODES.length),
          c.nodes[popup.nodeId]?.label ?? "",
        ];

  return (
    <div className={`achvpop${shown ? " show" : ""}`}>
      <b>★ {title}</b>
      <span>{sub}</span>
    </div>
  );
}
