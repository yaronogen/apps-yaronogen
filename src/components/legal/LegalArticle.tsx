import type { ReactNode } from "react";
import type { LegalDocument } from "@/products/types";
import { Linkified } from "./Linkified";

/**
 * Renders a legal document exactly as written: title, version, summary, sections, paragraphs.
 * Nothing is added to or removed from the text. `embedded` demotes the headings by one level
 * (for a document shown inside another page).
 */
export function LegalArticle({
  doc,
  tone = "studio",
  eyebrow,
  note,
  embedded = false,
}: {
  doc: LegalDocument;
  tone?: "studio" | "night";
  eyebrow?: string;
  note?: ReactNode;
  embedded?: boolean;
}) {
  const night = tone === "night";
  const Title = embedded ? "h2" : "h1";
  const Heading = embedded ? "h3" : "h2";
  return (
    <article className={`prose-legal ${night ? "[&_a]:text-gold" : "[&_a]:text-ink"}`}>
      {eyebrow && <p className={`text-sm font-medium uppercase tracking-[0.16em] ${night ? "text-lilac" : "text-muted"}`}>{eyebrow}</p>}
      <Title
        className={`mt-3 font-semibold leading-tight tracking-[-0.02em] ${embedded ? "text-2xl" : "text-3xl sm:text-4xl"} ${night ? "font-tally text-cream" : ""}`}
      >
        {doc.title}
      </Title>
      {doc.version && <p className={`mt-2 text-sm ${night ? "text-lilac" : "text-muted"}`}>Version {doc.version}</p>}
      {doc.summary && (
        <p className={`mt-6 rounded-2xl px-5 py-4 font-semibold leading-7 ring-1 ${night ? "bg-gold/10 ring-gold/45" : "bg-surface-2 ring-line"}`}>
          <Linkified text={doc.summary} />
        </p>
      )}
      {doc.sections.map((s) => (
        <section key={s.heading}>
          <Heading
            className={`mt-9 font-semibold leading-snug ${embedded ? "text-base" : "text-xl"} ${night ? "font-tally text-gold" : ""}`}
          >
            {s.heading}
          </Heading>
          {s.paragraphs.map((p, i) => (
            <p key={i} className={night ? "text-cream/90" : "text-ink-2"}>
              <Linkified text={p} />
            </p>
          ))}
        </section>
      ))}
      {note && <div className={`mt-12 border-t pt-6 text-sm ${night ? "border-night-border text-lilac" : "border-line text-muted"}`}>{note}</div>}
    </article>
  );
}
