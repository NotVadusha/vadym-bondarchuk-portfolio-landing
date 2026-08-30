import { Check } from "lucide-react";

import { Rich } from "@/components/Rich";
import { SectionHead } from "@/components/sections/SectionHead";
import { useI18n } from "@/i18n";

export function QuestLog() {
  const { c } = useI18n();

  return (
    <section id="quests" className="sec">
      <div className="wrap">
        <SectionHead tag={c.quests.tag} title={c.quests.title} />
        <div className="quests">
          {c.quests.items.map((q) => (
            <article className={`q rv${q.active ? " act" : ""}`} key={q.code}>
              <div className="qhead">
                <span className="qn">{q.code}</span>
                <span className={`st ${q.active ? "on" : "done"}`}>
                  {q.active ? <i /> : <Check size={12} strokeWidth={3} />}
                  {q.status}
                </span>
              </div>
              <h3>{q.title}</h3>
              <div className="meta">{q.meta}</div>
              <ul>
                {q.bullets.map((b, i) => (
                  <li key={i}>
                    <span>
                      <Rich text={b} />
                    </span>
                  </li>
                ))}
              </ul>
              <div className="tags">
                {q.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
