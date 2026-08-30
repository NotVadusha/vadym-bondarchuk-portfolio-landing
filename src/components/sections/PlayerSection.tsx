import { Rich } from "@/components/Rich";
import { SectionHead } from "@/components/sections/SectionHead";
import { useI18n } from "@/i18n";

const PIP_TOTAL = 5;

export function PlayerSection() {
  const { c } = useI18n();
  const p = c.player;

  return (
    <section id="player" className="sec">
      <div className="wrap">
        <SectionHead tag={p.tag} title={p.title} aside={p.aside} />
        <div className="player">
          <div className="pcard rv">
            <div className="head">
              <div className="ava">
                {p.initials}
                <i>{p.level}</i>
              </div>
              <div>
                <h3>{p.name}</h3>
                <div className="cls">{p.cls}</div>
              </div>
            </div>
            <p>
              <Rich text={p.bio} />
            </p>
            <div className="sticks">
              {p.sticks.map((s, i) => (
                <span key={s} className={i === 0 ? "stick" : "stick b"}>
                  {s}
                </span>
              ))}
            </div>
            <div className="facts">
              {p.facts.map((f) => (
                <span key={f}>
                  <Rich text={f} />
                </span>
              ))}
            </div>
          </div>

          <div className="sheet rv">
            <header>{p.sheetHeader}</header>
            {p.sheetRows.map((row) => (
              <div className="srow" key={row.name}>
                <div className="nm">{row.name}</div>
                <div className="pips">
                  {Array.from({ length: PIP_TOTAL }, (_, i) => (
                    <i key={i} className={i < row.filled ? "f" : undefined} />
                  ))}
                </div>
                <div className="note">{row.proof}</div>
                <div className="note why">{row.why}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
