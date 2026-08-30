import { useEffect, useRef, useState } from "react";

import { useI18n } from "@/i18n";

const reduced = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Terminal-style boot overlay. Self-destructs after the log finishes, on a
 * click, or after a 5s safety timeout — it must never trap the page.
 */
export function BootScreen() {
  const { c } = useI18n();
  const [shown, setShown] = useState(0);
  const [off, setOff] = useState(false);
  const [gone, setGone] = useState(reduced);
  const done = useRef(false);

  useEffect(() => {
    if (reduced()) {
      document.body.classList.add("ready");
      return;
    }
    const finish = () => {
      if (done.current) return;
      done.current = true;
      setOff(true);
      document.body.classList.add("ready");
      setTimeout(() => setGone(true), 500);
    };

    let i = 0;
    const step = setInterval(() => {
      i += 1;
      setShown(i);
      if (i >= c.boot.length) {
        clearInterval(step);
        setTimeout(finish, 260);
      }
    }, 130);
    const safety = setTimeout(finish, 5000);
    const onClick = () => finish();
    window.addEventListener("pointerdown", onClick);

    return () => {
      clearInterval(step);
      clearTimeout(safety);
      window.removeEventListener("pointerdown", onClick);
    };
    // Boot runs once; a language switch mid-boot shouldn't restart it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (gone) return null;

  return (
    <div id="boot" className={off ? "off" : undefined} aria-hidden="true">
      <pre>
        {c.boot.slice(0, shown).map((line, i) => (
          <span key={i} className={line.cls}>
            {line.text}
            {"\n"}
          </span>
        ))}
      </pre>
    </div>
  );
}
