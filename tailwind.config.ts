import type { Config } from "tailwindcss";

/**
 * exp.world is a single light theme; colours live as CSS custom properties in
 * index.css and are mirrored here so utilities like `text-ink` work too.
 */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "var(--paper)",
        sky: "var(--sky)",
        panel: "var(--panel)",
        soft: "var(--soft)",
        ink: "var(--ink)",
        mut: "var(--mut)",
        dim: "var(--dim)",
        orange: "var(--orange)",
        orange2: "var(--orange2)",
        osoft: "var(--osoft)",
        blue: "var(--blue)",
        bsoft: "var(--bsoft)",
      },
      fontFamily: {
        disp: ["Unbounded", "sans-serif"],
        body: ["Golos Text", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;
