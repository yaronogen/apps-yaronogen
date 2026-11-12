import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { LegalArticle } from "@/components/legal/LegalArticle";
import { LEGAL_PAGES, PRODUCTS, getProduct } from "@/products";

export const dynamicParams = false;

/** /<product>/terms/, /privacy/, /imprint/, /delete-account/: for every document the product has. */
export function generateStaticParams() {
  return PRODUCTS.flatMap((p) =>
    LEGAL_PAGES.filter(({ kind }) => p.config.legal[kind]).map(({ kind }) => ({ product: p.config.slug, doc: kind })),
  );
}

type Params = Promise<{ product: string; doc: string }>;

async function resolve(params: Params) {
  const { product, doc } = await params;
  const entry = getProduct(product);
  const page = LEGAL_PAGES.find((l) => l.kind === doc);
  const document = page ? entry?.config.legal[page.kind] : undefined;
  return entry && page && document ? { entry, page, document } : null;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const r = await resolve(params);
  if (!r) return {};
  const { entry, page, document } = r;
  return {
    title: document.title,
    description: `${document.title}${document.version ? ` (version ${document.version})` : ""}: the same text as in the ${entry.config.name} app.`,
    alternates: { canonical: `/${entry.config.slug}/${page.kind}/` },
    robots: document.index ? undefined : { index: false, follow: true },
  };
}

export default async function LegalPage({ params }: { params: Params }) {
  const r = await resolve(params);
  if (!r) notFound();
  const { entry, page, document } = r;
  const { config } = entry;
  const linkClass = config.tone === "night" ? "text-gold underline underline-offset-4" : "text-ink underline underline-offset-4";
  const others = LEGAL_PAGES.filter((l) => l.kind !== page.kind && config.legal[l.kind]);
  return (
    <Container size="text" className="py-14 sm:py-20">
      <LegalArticle
        doc={document}
        tone={config.tone}
        eyebrow={config.name}
        note={
          <>
            {config.legalSource && <p>{config.legalSource}</p>}
            <nav aria-label="Other documents" className="mt-4">
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {others.map((o) => (
                  <li key={o.kind}>
                    <Link className={linkClass} href={`/${config.slug}/${o.kind}/`}>
                      {o.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link className={linkClass} href={`/${config.slug}/support/`}>
                    Support
                  </Link>
                </li>
              </ul>
            </nav>
          </>
        }
      />
    </Container>
  );
}
