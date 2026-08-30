import { Check } from "lucide-react";

import { SectionHead } from "@/components/sections/SectionHead";
import { useI18n } from "@/i18n";

const MAX_STARS = 5;

export function Missions() {
  const { c } = useI18n();
  const m = c.missions;

  return (
    <section id="missions" className="sec">
      <div className="wrap">
        <SectionHead tag={m.tag} title={m.title} />
        <div className="mgrid rv">
          {m.items.map((item) => (
            <div className="m" key={item.code}>
              <div className="mh">
                <span className="mcode">
                  <Check size={12} strokeWidth={3} />
                  {item.code} · {m.done}
                </span>
                <span className="mdiff">
                  {m.difficulty}
                  <span
                    className="stars"
                    aria-label={`${item.stars}/${MAX_STARS}`}
                  >
                    {"★".repeat(item.stars)}
                    <span className="off">
                      {"★".repeat(MAX_STARS - item.stars)}
                    </span>
                  </span>
                </span>
              </div>
              <h3>{item.title}</h3>
              <pre className="dgm">{item.diagram}</pre>
              <span className="rew">
                {m.lootPrefix} {item.reward}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
