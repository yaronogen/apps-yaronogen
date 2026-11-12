import Link from "next/link";
import { PRODUCTS } from "@/products";
import { SITE } from "@/lib/site";
import { Container } from "./Container";

/**
 * One footer for the whole site. `tone="night"` is used on product pages with a dark identity.
 */
export function SiteFooter({ tone = "studio" }: { tone?: "studio" | "night" }) {
  const night = tone === "night";
  const muted = night ? "text-lilac" : "text-muted";
  const link = night ? "text-cream/90 hover:text-gold" : "text-ink-2 hover:text-ink";
  const year = new Date().getFullYear();
  return (
    <footer className={night ? "border-t border-night-border bg-night-sky-bottom text-cream" : "border-t border-line bg-surface-2/60"}>
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <p className="font-serif text-2xl italic">{SITE.name}</p>
          <p className={`mt-3 max-w-xs text-sm leading-6 ${muted}`}>Thoughtful software for everyday life, made independently in Germany.</p>
        </div>
        {PRODUCTS.map(({ config }) => (
          <nav key={config.slug} aria-label={`${config.name} links`}>
            <h2 className="text-sm font-semibold">{config.name}</h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link className={link} href={`/${config.slug}/`}>About {config.name}</Link></li>
              <li><Link className={link} href={`/${config.slug}/support/`}>Support</Link></li>
              {config.legal.terms && <li><Link className={link} href={`/${config.slug}/terms/`}>Terms of Use</Link></li>}
              {config.legal.privacy && <li><Link className={link} href={`/${config.slug}/privacy/`}>{config.name} Privacy Policy</Link></li>}
              {config.legal["delete-account"] && <li><Link className={link} href={`/${config.slug}/delete-account/`}>Delete your account</Link></li>}
            </ul>
          </nav>
        ))}
        <nav aria-label="Legal">
          <h2 className="text-sm font-semibold">Legal</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link className={link} href="/imprint/">Impressum (Legal notice)</Link></li>
            <li><Link className={link} href="/privacy/">Website privacy</Link></li>
            <li><a className={link} href={`mailto:${SITE.operator.email}`}>Contact</a></li>
          </ul>
        </nav>
      </Container>
      <Container className={`flex flex-col gap-2 border-t py-6 text-xs sm:flex-row sm:justify-between ${night ? "border-night-border" : "border-line"} ${muted}`}>
        <p>© {year} {SITE.operator.name}. All rights reserved.</p>
        <p>No cookies. No tracking.</p>
      </Container>
    </footer>
  );
}
