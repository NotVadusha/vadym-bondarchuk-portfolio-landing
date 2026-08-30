import { X } from "lucide-react";

import { CAREER_NODES } from "@/constants/gameData";
import { useI18n } from "@/i18n";
import { useGameStore } from "@/store/gameStore";

export function DossierPanel() {
  const { c } = useI18n();
  const activeId = useGameStore((s) => s.activeDossierId);
  const closeDossier = useGameStore((s) => s.closeDossier);

  const index = CAREER_NODES.findIndex((n) => n.id === activeId);
  const node = index >= 0 ? CAREER_NODES[index] : null;
  const copy = node ? c.nodes[node.id] : null;

  return (
    <aside className={`np${node ? " show" : ""}`} aria-hidden={!node}>
      {node && copy && (
        <>
          <button
            type="button"
            className="x"
            onClick={closeDossier}
            aria-label={c.dossier.close}
          >
            <X size={14} strokeWidth={2.6} />
          </button>
          <div className="top">
            <span>{c.dossier.quest(index + 1, CAREER_NODES.length)}</span>
            <span>{node.period}</span>
          </div>
          <h3>{copy.label}</h3>
          <div className="nrole">{copy.role}</div>
          <ul>
            {copy.bullets.map((b) => (
              <li key={b}>
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div className="tags">
            {copy.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </>
      )}
    </aside>
  );
}
