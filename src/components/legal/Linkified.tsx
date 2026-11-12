import { Fragment } from "react";

/**
 * Turns URLs and email addresses in legal text into links, without changing the text
 * (the same rule as the Tally server's public pages).
 */
const pattern = /(https:\/\/[^\s,)]+|[\w.+-]+@[\w-]+\.[\w.]+)/g;

export function Linkified({ text }: { text: string }) {
  const parts = text.split(pattern);
  return (
    <>
      {parts.map((part, i) => {
        if (i % 2 === 0) return <Fragment key={i}>{part}</Fragment>;
        // A trailing full stop belongs to the sentence, not the address.
        const trail = part.match(/\.+$/)?.[0] ?? "";
        const target = trail ? part.slice(0, -trail.length) : part;
        const href = target.startsWith("https://") ? target : `mailto:${target}`;
        return (
          <Fragment key={i}>
            <a href={href}>{target}</a>
            {trail}
          </Fragment>
        );
      })}
    </>
  );
}
