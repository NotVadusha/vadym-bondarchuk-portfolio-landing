import { useEffect, useRef, useState } from "react";
import { Check, Copy, Github, Linkedin, Send } from "lucide-react";

import { Rich } from "@/components/Rich";
import { SectionHead } from "@/components/sections/SectionHead";
import { CONTACTS, prettyUrl } from "@/constants/contacts";
import { useI18n } from "@/i18n";

export function Party() {
  const { c } = useI18n();
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const copyEmail = async () => {
    if (!CONTACTS.email) return;
    try {
      await navigator.clipboard.writeText(CONTACTS.email);
    } catch {
      // clipboard blocked — the address is on screen anyway
    }
    setCopied(true);
    setToast(`${c.party.copied} ${CONTACTS.email}`);
    timers.current.push(
      window.setTimeout(() => setCopied(false), 1600),
      window.setTimeout(() => setToast(null), 1900),
    );
  };

  const links = [
    { key: "github", url: CONTACTS.github, Icon: Github },
    { key: "telegram", url: CONTACTS.telegram, Icon: Send },
    { key: "linkedin", url: CONTACTS.linkedin, Icon: Linkedin },
  ].filter((l) => l.url);

  return (
    <section id="party" className="sec party">
      <div className="wrap">
        <SectionHead tag={c.party.tag} aside={c.party.aside} />
        <h2 className="rv">
          <Rich text={c.party.title} />
        </h2>
        <p className="lead rv">{c.party.lead}</p>

        <div className="mailrow rv">
          {CONTACTS.email && (
            <button type="button" className="mailbig" onClick={copyEmail}>
              {copied ? <Check /> : <Copy />}
              <span>{CONTACTS.email}</span>
            </button>
          )}
          <span className="stick">{c.party.sticker}</span>
        </div>

        {links.length > 0 && (
          <div className="links rv">
            {links.map(({ key, url, Icon }) => (
              <a key={key} href={url} target="_blank" rel="noopener noreferrer">
                <Icon />
                {prettyUrl(url)}
              </a>
            ))}
          </div>
        )}

        <footer className="pfooter">
          <span>{c.party.footerLeft}</span>
          <a href="#world">{c.party.footerBack}</a>
        </footer>
      </div>

      {toast && (
        <div className="toast show" role="status">
          {toast}
        </div>
      )}
    </section>
  );
}
