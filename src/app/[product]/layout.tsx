import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ProductHeader } from "@/components/product/ProductHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PRODUCTS, getProduct } from "@/products";

export const dynamicParams = false;

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ product: p.config.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ product: string }> }): Promise<Metadata> {
  const entry = getProduct((await params).product);
  if (!entry) return {};
  return { icons: { icon: entry.config.images.icon.src, apple: "/apple-touch-icon.png" } };
}

export default async function ProductLayout({ children, params }: { children: ReactNode; params: Promise<{ product: string }> }) {
  const entry = getProduct((await params).product);
  if (!entry) notFound();
  const night = entry.config.tone === "night";
  return (
    <div className={night ? "theme-night min-h-dvh bg-night text-cream [color-scheme:dark]" : "min-h-dvh"}>
      <ProductHeader product={entry.config} />
      <main id="main">{children}</main>
      <SiteFooter tone={night ? "night" : "studio"} />
    </div>
  );
}
