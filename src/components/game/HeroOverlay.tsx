import { useEffect, useState } from "react";
import { ArrowDown, Play } from "lucide-react";

import { Rich } from "@/components/Rich";
import { useI18n } from "@/i18n";

const reduced = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function useTypewriter(text: string, speed = 24) {
  const [shown, setShown] = useState(() => (reduced() ? text : ""));
  useEffect(() => {
    if (reduced()) {
      setShown(text);
      return;
    }
    setShown("");
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return shown;
}

export function HeroOverlay({
  hidden,
  onPlay,
}: {
  hidden: boolean;
  onPlay: () => void;
}) {
  const { c } = useI18n();
  const h = c.hero;
  const typed = useTypewriter(h.typed);

  return (
    <div className={`hero${hidden ? " hidden" : ""}`} aria-hidden={hidden}>
      <div className="hero-in">
        <div className="overline rvh">
          {h.prompt} <b>{typed}</b>
          <span className="caret" />
        </div>
        <h1 className="rvh">
          {h.firstName}
          <br />
          <span className="l2">{h.lastName}</span>
        </h1>
        <div className="role rvh">
          <strong>{h.role}</strong>
          <span>{h.stack}</span>
        </div>
        <div className="stats rvh">
          {h.stats.map((s) => (
            <div key={s.label}>
              <b>
                <Rich text={s.value} />
              </b>
              <small>{s.label}</small>
            </div>
          ))}
        </div>
        <div className="cta rvh">
          <button type="button" className="btn prime" onClick={onPlay}>
            <Play size={16} strokeWidth={2.4} />
            {h.play}
          </button>
          <a className="btn" href="#player">
            <ArrowDown size={16} strokeWidth={2.4} />
            {h.specs}
          </a>
        </div>
      </div>
      <div className="wmeta">
        <Rich text={h.metaTop} />
        <br />
        <Rich text={h.metaBottom} />
      </div>
      <div className="hint">
        <b>{h.hintTitle}</b>
        <br />
        {h.hintLines.map((line, i) => (
          <span key={i}>
            {line}
            {i < h.hintLines.length - 1 && <br />}
          </span>
        ))}
      </div>
    </div>
  );
}
