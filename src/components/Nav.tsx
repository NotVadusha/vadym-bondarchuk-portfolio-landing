import { useCallback, useEffect, useMemo, useState } from "react";

import { useScrollSpy } from "@/hooks/useReveal";
import { useI18n } from "@/i18n";

export function Nav() {
  const { c, lang, setLang } = useI18n();
  const [active, setActive] = useState<string | null>(null);
  const [clock, setClock] = useState("--:--");

  const ids = useMemo(() => c.nav.items.map((i) => i.id), [c.nav.items]);
  const onSpy = useCallback((id: string | null) => setActive(id), []);
  useScrollSpy(ids, onSpy);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat(lang === "uk" ? "uk-UA" : "en-GB", {
      timeZone: "Europe/Prague",
      hour: "2-digit",
      minute: "2-digit",
    });
    const tick = () => setClock(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, [lang]);

  return (
    <header className="nav">
      <a className="logo" href="#world">
        <b>{lang === "uk" ? "ВБ" : "VB"}</b>:dev<span className="cursor" />
      </a>
      <ul>
        {c.nav.items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} className={active === item.id ? "on" : undefined}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
      <div className="right">
        <div className="clock">
          <span className="dot" />
          {c.nav.location} · <span>{clock}</span>
        </div>
        <div className="langtoggle" role="group" aria-label="Language">
          {(["uk", "en"] as const).map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => setLang(code)}
              className={lang === code ? "on" : undefined}
              aria-pressed={lang === code}
            >
              {code}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
