import { Rich } from "@/components/Rich";
import { SectionHead } from "@/components/sections/SectionHead";
import { SKILLS } from "@/constants/gameData";
import { useI18n } from "@/i18n";
import { useGameStore } from "@/store/gameStore";

export function Inventory() {
  const { c } = useI18n();
  const collected = useGameStore((s) => s.collectedSkills);
  const inv = c.inventory;

  return (
    <section id="inv" className="sec">
      <div className="wrap">
        <SectionHead tag={inv.tag} title={inv.title} aside={inv.aside} />

        <div className="legend rv">
          {inv.rarity.map((label, i) => (
            <span key={label} className={`c${i + 1}`}>
              <i />
              {label}
            </span>
          ))}
          <span className="found">
            {inv.found} <b>{collected.length}</b>/{SKILLS.length}
          </span>
        </div>

        <div className="rv">
          {inv.stacks.map((stack) => (
            <div className="stk" key={stack.label}>
              <div className="lab">{stack.label}</div>
              <div className="toks">
                {stack.tokens.map((tok) => {
                  const got = !!tok.skill && collected.includes(tok.skill);
                  const rarity = tok.rarity > 1 ? ` r${tok.rarity}` : "";
                  return (
                    <span
                      key={tok.label}
                      className={`tok${rarity}${got ? " got" : ""}`}
                    >
                      {tok.label}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="invnote rv">
          <Rich text={inv.note} />
        </div>

      </div>
    </section>
  );
}
