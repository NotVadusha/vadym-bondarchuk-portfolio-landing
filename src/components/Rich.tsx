import { Fragment } from "react";

// *bold* → <b>, ~accent~ → <em> (orange, see index.css). No nesting.
const TOKEN = /(\*[^*]+\*|~[^~]+~)/g;

export function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(TOKEN).map((part, i) => {
        if (part.startsWith("*") && part.endsWith("*") && part.length > 2)
          return <b key={i}>{part.slice(1, -1)}</b>;
        if (part.startsWith("~") && part.endsWith("~") && part.length > 2)
          return <em key={i}>{part.slice(1, -1)}</em>;
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}
