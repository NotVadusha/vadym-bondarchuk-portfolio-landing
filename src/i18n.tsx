import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

import { CONTENT } from "@/content";
import type { Content, Lang } from "@/content";

const STORAGE_KEY = "exp-lang";

function initialLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "uk" || stored === "en") return stored;
  } catch {
    // private mode — fall through to the browser locale
  }
  return navigator.language?.toLowerCase().startsWith("uk") ? "uk" : "en";
}

interface I18n {
  lang: Lang;
  setLang: (lang: Lang) => void;
  c: Content;
}

const I18nContext = createContext<I18n | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // not persisting is fine
    }
  }, []);

  const value = useMemo<I18n>(
    () => ({ lang, setLang, c: CONTENT[lang] }),
    [lang, setLang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18n {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}
