import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { LegalArticle } from "@/components/legal/LegalArticle";
import { PRODUCTS, getProduct } from "@/products";

export const dynamicParams = false;

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ product: p.config.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ product: string }> }): Promise<Metadata> {
  const entry = getProduct((await params).product);
  if (!entry) return {};
  const { config } = entry;
  return {
    title: `${config.name} Support`,
    description: `Help with ${config.name}: common questions, subscriptions, troubleshooting, and how to contact us.`,
    alternates: { canonical: `/${config.slug}/support/` },
  };
}

export default async function SupportPage({ params }: { params: Promise<{ product: string }> }) {
  const entry = getProduct((await params).product);
  if (!entry) notFound();
  if (entry.Support) return <entry.Support />;
  const doc = entry.config.legal.support;
  if (!doc) notFound();
  return (
    <Container size="text" className="py-14 sm:py-20">
      <LegalArticle doc={doc} tone={entry.config.tone} />
    </Container>
  );
}
