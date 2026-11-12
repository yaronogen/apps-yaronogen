import Link from "next/link";
import { PRODUCTS } from "@/products";
import type { ProductConfig } from "@/products/types";
import { SITE } from "@/lib/site";
import { Container } from "./Container";

/**
 * One footer for the whole site: the studio, every app, and the site's legal pages. On an app's
 * pages (`product`), it also lists that app's support and legal documents, in the app's colors.
 */
export function SiteFooter({ product }: { product?: ProductConfig }) {
  const night = product?.tone === "night";
  const muted = night ? "text-lilac" : "text-muted";
  const link = night ? "text-cream/90 hover:text-gold" : "text-ink-2 hover:text-ink";
  const year = new Date().getFullYear();
  return (
    <footer className={night ? "border-t border-night-border bg-night-sky-bottom text-cream" : "border-t border-line bg-surface-2/60"}>
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <Link href="/" className="font-serif text-2xl italic">
            {SITE.name}
          </Link>
          <p className={`mt-3 max-w-xs text-sm leading-6 ${muted}`}>Thoughtful software for everyday life, made independently in Germany.</p>
        </div>

        <nav aria-label="Apps">
          <h2 className="text-sm font-semibold">Apps</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {PRODUCTS.map(({ config }) => (
              <li key={config.slug}>
                <Link className={link} href={`/${config.slug}/`}>
                  {config.name}
                </Link>
              </li>
            ))}
            <li>
              <Link className={link} href="/#apps">
                All apps
              </Link>
            </li>
          </ul>
        </nav>

        {product ? (
          <nav aria-label={`${product.name} help and legal`}>
            <h2 className="text-sm font-semibold">{product.name}</h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link className={link} href={`/${product.slug}/support/`}>Support</Link></li>
              {product.legal.terms && <li><Link className={link} href={`/${product.slug}/terms/`}>Terms of Use</Link></li>}
              {product.legal.privacy && <li><Link className={link} href={`/${product.slug}/privacy/`}>Privacy Policy</Link></li>}
              {product.legal.imprint && <li><Link className={link} href={`/${product.slug}/imprint/`}>Legal notice</Link></li>}
              {product.legal["delete-account"] && <li><Link className={link} href={`/${product.slug}/delete-account/`}>Delete your account</Link></li>}
            </ul>
          </nav>
        ) : (
          <nav aria-label="Studio">
            <h2 className="text-sm font-semibold">Studio</h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link className={link} href="/#about">About</Link></li>
              <li><a className={link} href={`mailto:${SITE.operator.email}`}>Contact</a></li>
            </ul>
          </nav>
        )}

        <nav aria-label="Legal">
          <h2 className="text-sm font-semibold">Legal</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link className={link} href="/imprint/">Impressum (Legal notice)</Link></li>
            <li><Link className={link} href="/privacy/">Website privacy</Link></li>
            {product && <li><a className={link} href={`mailto:${SITE.operator.email}`}>Contact</a></li>}
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
