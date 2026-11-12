import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ProductConfig } from "@/products/types";
import { Container } from "../Container";
import { SkipLink } from "../SkipLink";

export function ProductHeader({ product }: { product: ProductConfig }) {
  const night = product.tone === "night";
  return (
    <header className={`sticky top-0 z-40 border-b backdrop-blur-md ${night ? "border-night-border/70 bg-night-sky-top/85 text-cream" : "border-line/70 bg-paper/80"}`}>
      <SkipLink className={night ? "focus:bg-gold focus:text-gold-ink" : "focus:bg-ink focus:text-paper"} />
      <div className={`border-b text-xs ${night ? "border-night-border/60 text-lilac" : "border-line/60 text-muted"}`}>
        <Container className="flex h-8 items-center">
          <Link href="/" className={`inline-flex items-center gap-1.5 rounded ${night ? "hover:text-cream" : "hover:text-ink"}`}>
            <ArrowLeft aria-hidden className="size-3.5" /> Apps by Yaron Ogen
          </Link>
        </Container>
      </div>
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href={`/${product.slug}/`} className="flex items-center gap-3 rounded-lg" aria-label={`${product.name} home`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={product.images.icon.src} alt="" width={36} height={36} className="size-9 rounded-[10px] ring-1 ring-white/10" />
          {product.images.wordmark ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={product.images.wordmark.src} alt="" width={product.images.wordmark.width} height={product.images.wordmark.height} className="h-8 w-auto" />
          ) : (
            <span className="text-lg font-semibold">{product.name}</span>
          )}
        </Link>
        <nav aria-label={product.name}>
          <ul className="flex items-center gap-0.5 text-sm font-medium">
            {product.nav.map((item, i) => (
              <li key={item.href} className={i < 2 ? "hidden md:block" : "hidden sm:block"}>
                <Link
                  href={item.href}
                  className={`rounded-full px-3 py-2 transition-colors ${night ? "text-cream/85 hover:bg-white/5 hover:text-cream" : "text-ink-2 hover:bg-surface-2"}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={`/${product.slug}/support/`}
                className={`ml-1 inline-flex h-10 items-center rounded-full px-4 font-semibold ${night ? "bg-gold/12 text-gold ring-1 ring-gold/40 hover:bg-gold/20" : "bg-ink text-paper"}`}
              >
                Support
              </Link>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}
