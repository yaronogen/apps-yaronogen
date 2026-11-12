import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCTS, getProduct } from "@/products";

export const dynamicParams = false;

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ product: p.config.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ product: string }> }): Promise<Metadata> {
  const entry = getProduct((await params).product);
  if (!entry) return {};
  const { config } = entry;
  const url = `/${config.slug}/`;
  return {
    title: { absolute: config.seo.title },
    description: config.seo.description,
    alternates: { canonical: url },
    openGraph: {
      url,
      title: config.seo.title,
      description: config.seo.description,
      images: [{ url: config.images.og, width: 1200, height: 630, alt: config.name }],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ product: string }> }) {
  const entry = getProduct((await params).product);
  if (!entry) notFound();
  const { Landing } = entry;
  return <Landing />;
}
