import { Rich } from "@/components/Rich";
import { SectionHead } from "@/components/sections/SectionHead";
import { flyToGame } from "@/components/game/flyToGame";
import { useI18n } from "@/i18n";

export function Achievements() {
  const { c } = useI18n();

  return (
    <section id="achv" className="sec">
      <div className="wrap">
        <SectionHead tag={c.achievements.tag} title={c.achievements.title} />
        <div className="agrid rv">
          {c.achievements.items.map((a) => {
            const body = (
              <>
                <span className="xpp">{a.xp}</span>
                <div className="num">
                  <Rich text={a.num} />
                </div>
                <p>{a.text}</p>
              </>
            );
            return a.play ? (
              <button
                type="button"
                key={a.num + a.xp}
                className="acell link"
                onClick={flyToGame}
              >
                {body}
              </button>
            ) : (
              <div key={a.num + a.xp} className={`acell${a.big ? " big" : ""}`}>
                {body}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
