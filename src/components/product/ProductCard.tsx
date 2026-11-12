import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ProductConfig } from "@/products/types";
import { ResponsiveImage } from "../ResponsiveImage";
import { StatusBadge } from "./Availability";

const list = (items: string[]) => items.join(", ").replace(/, ([^,]*)$/, " and $1");

/**
 * An app on the homepage, in the app's own colors. `wide` is used when there is one app (a
 * full-width card); with several apps the cards sit in a grid.
 */
export function ProductCard({ product, wide }: { product: ProductConfig; wide: boolean }) {
  const night = product.tone === "night";
  const shot = product.images.screenshots?.[0];
  return (
    <article
      aria-labelledby={`card-${product.slug}`}
      className={`group relative overflow-hidden rounded-[2rem] ring-1 ${
        night ? "theme-night bg-gradient-to-br from-night-sky-top to-night-sky-bottom text-cream ring-night-border" : "bg-surface ring-line"
      }`}
    >
      {night && <div aria-hidden className="starfield pointer-events-none absolute inset-0 opacity-50" />}
      <div className={`relative grid gap-10 p-6 sm:p-10 ${wide ? "lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-14 lg:p-14" : ""}`}>
        <div>
          <div className="flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={product.images.icon.src} alt="" width={64} height={64} className="size-16 rounded-2xl shadow-lg ring-1 ring-white/10" />
            <div className="min-w-0">
              <h3 id={`card-${product.slug}`} className={`text-2xl font-semibold ${night ? "font-tally" : ""}`}>
                {product.name}
              </h3>
              <p className={`text-sm ${night ? "text-lilac" : "text-muted"}`}>{product.category}</p>
            </div>
          </div>
          <div className="mt-5">
            <StatusBadge status={product.status} />
          </div>
          <p className={`mt-5 text-lg leading-8 ${night ? "text-cream/85" : "text-ink-2"}`}>{product.summary}</p>
          {wide && (
            <ul className="mt-7 grid gap-4 sm:grid-cols-2">
              {product.highlights.map((h) => (
                <li key={h.title} className="flex gap-3">
                  <h.icon aria-hidden className={`mt-0.5 size-5 shrink-0 ${night ? "text-gold" : "text-ink-2"}`} />
                  <span className="text-sm leading-6">
                    <span className="font-semibold">{h.title}.</span>{" "}
                    <span className={night ? "text-lilac" : "text-muted"}>{h.text}</span>
                  </span>
                </li>
              ))}
            </ul>
          )}
          <p className={`mt-7 text-sm ${night ? "text-lilac" : "text-muted"}`}>
            {list(product.platforms)}. {product.status.detail}
          </p>
          <Link
            href={`/${product.slug}/`}
            className={`mt-7 inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm font-semibold transition-transform hover:-translate-y-0.5 ${
              night ? "bg-gold text-gold-ink" : "bg-ink text-paper"
            }`}
          >
            Explore {product.name} <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>

        <div className={`relative ${wide ? "pb-8 sm:pr-16 lg:pb-10" : "pb-8 sm:pr-16"}`}>
          <ResponsiveImage
            image={product.images.hero}
            sizes={wide ? "(min-width: 1024px) 560px, 100vw" : "(min-width: 1024px) 480px, 100vw"}
            className="aspect-[3/2] w-full rounded-3xl object-cover shadow-2xl ring-1 ring-white/10"
          />
          {shot && (
            <ResponsiveImage
              image={shot}
              sizes="180px"
              className="absolute -bottom-2 right-0 hidden aspect-[946/1944] w-[30%] max-w-[180px] rounded-[1.4rem] object-cover shadow-[0_24px_60px_-20px_rgb(0_0_0/0.85)] ring-4 ring-night-sky-bottom sm:block"
            />
          )}
        </div>
      </div>
    </article>
  );
}
