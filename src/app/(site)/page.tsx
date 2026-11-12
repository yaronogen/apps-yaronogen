import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Fingerprint, PenLine, Sprout } from "lucide-react";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { StatusBadge } from "@/components/product/Availability";
import { PRODUCTS } from "@/products";
import type { ProductConfig } from "@/products/types";
import { SITE, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${SITE.name} – Thoughtful software for everyday life` },
  description: SITE.description,
  alternates: { canonical: "/" },
  openGraph: { url: "/", title: SITE.name, description: SITE.description },
};

const principles = [
  {
    icon: Fingerprint,
    title: "Private by design",
    text: "Apps collect only what they need. No ads, no tracking, and no selling of data. Tally never even sends a child's name to the AI.",
  },
  {
    icon: PenLine,
    title: "Honest about technology",
    text: "Where AI is used, the apps say so plainly, explain what it can and can't do, and leave the final judgement with you.",
  },
  {
    icon: Sprout,
    title: "Calm, careful craft",
    text: "Few features, done well. Interfaces that respect your attention, read beautifully, and work for everyone.",
  },
];

export default function HomePage() {
  const featured = PRODUCTS[0]!.config;
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: SITE.name,
          url: absoluteUrl("/"),
          description: SITE.description,
          publisher: { "@type": "Person", name: SITE.operator.name },
        }}
      />

      {/* Hero */}
      <section aria-labelledby="hero-title" className="relative overflow-hidden">
        <Container className="grid items-center gap-12 pb-16 pt-14 sm:pt-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-24 lg:pt-24">
          <div className="rise">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-muted">Independent software studio</p>
            <h1 id="hero-title" className="mt-5 text-[2.6rem] font-semibold leading-[1.04] tracking-[-0.03em] sm:text-6xl lg:text-[4.25rem]">
              Thoughtful software for <span className="font-serif font-normal italic tracking-[-0.01em]">everyday life.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
              Discover thoughtfully designed applications that combine creativity, technology, and intelligent experiences.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href={`/${featured.slug}/`}
                className="inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-paper transition-transform hover:-translate-y-0.5"
              >
                Meet {featured.name} <ArrowRight aria-hidden className="size-4" />
              </Link>
              <Link href="#about" className="inline-flex h-12 items-center rounded-full px-5 text-sm font-semibold text-ink-2 ring-1 ring-line transition-colors hover:bg-surface-2">
                About the studio
              </Link>
            </div>
          </div>

          {/* Featured product window */}
          <Link
            href={`/${featured.slug}/`}
            className="theme-night group relative block rounded-[2rem] bg-gradient-to-b from-night-sky-top to-night-sky-bottom p-3 shadow-[0_30px_80px_-30px_rgb(14_21_51/0.6)] ring-1 ring-night-border/80 transition-transform duration-500 hover:-translate-y-1 sm:p-4"
          >
            <div aria-hidden className="starfield twinkle pointer-events-none absolute inset-0 rounded-[2rem] opacity-70" />
            <div className="relative overflow-hidden rounded-[1.5rem]">
              <ResponsiveImage image={{ ...featured.images.hero, alt: "" }} sizes="(min-width: 1024px) 560px, 100vw" priority className="aspect-[3/2] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
            </div>
            <div className="relative flex items-center gap-4 px-2 pb-1 pt-4 text-cream">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={featured.images.icon.src} alt="" width={56} height={56} className="size-14 rounded-2xl ring-1 ring-white/10" />
              <div className="min-w-0">
                <p className="font-tally text-xl font-semibold">{featured.name}</p>
                <p className="text-sm leading-5 text-lilac">{featured.tagline}</p>
              </div>
              <ArrowRight aria-hidden className="ml-auto size-5 shrink-0 text-gold transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        </Container>
      </section>

      {/* Featured application */}
      {PRODUCTS.map(({ config }) => (
        <section key={config.slug} aria-labelledby={`${config.slug}-title`} className="px-2 sm:px-4">
          <div className="theme-night relative mx-auto max-w-[88rem] overflow-hidden rounded-[2rem] bg-gradient-to-b from-night-sky-top to-night-sky-bottom text-cream sm:rounded-[2.5rem]">
            <div aria-hidden className="starfield twinkle pointer-events-none absolute inset-0 opacity-60" />
            <Container className="relative grid gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16 lg:py-24">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-sm font-medium uppercase tracking-[0.16em] text-lilac">Featured app</p>
                  <StatusBadge status={config.status} />
                </div>
                {config.images.wordmark && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={config.images.wordmark.src} alt={config.images.wordmark.alt} width={config.images.wordmark.width} height={config.images.wordmark.height} className="mt-6 h-16 w-auto sm:h-20" />
                )}
                <h2 id={`${config.slug}-title`} className="mt-5 font-tally text-3xl font-semibold leading-tight sm:text-4xl">
                  {config.tagline}
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-8 text-cream/85">{config.summary}</p>
                <ul className="mt-8 grid gap-5 sm:grid-cols-2">
                  {config.highlights.map((h) => (
                    <li key={h.title} className="flex gap-3">
                      <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl bg-gold/12 text-gold ring-1 ring-gold/30">
                        <h.icon aria-hidden className="size-[18px]" />
                      </span>
                      <span>
                        <span className="block font-semibold">{h.title}</span>
                        <span className="mt-1 block text-sm leading-6 text-lilac">{h.text}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-8 text-sm text-lilac">
                  For {config.platforms.join(", ").replace(/, ([^,]*)$/, " and $1")}. {config.status.detail}
                </p>
                <Link
                  href={`/${config.slug}/`}
                  className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-gold px-6 text-sm font-semibold text-gold-ink transition-transform hover:-translate-y-0.5"
                >
                  Explore {config.name} <ArrowRight aria-hidden className="size-4" />
                </Link>
              </div>
              <ShowcaseCollage product={config} />
            </Container>
          </div>
        </section>
      ))}

      {/* Principles */}
      <section aria-labelledby="principles-title" className="py-20 sm:py-28">
        <Container>
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-muted">How the apps are made</p>
            <h2 id="principles-title" className="mt-4 text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">
              Quality over quantity, <span className="font-serif font-normal italic">by intention.</span>
            </h2>
          </div>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-3xl bg-line ring-1 ring-line md:grid-cols-3">
            {principles.map((p) => (
              <li key={p.title} className="bg-surface p-8">
                <p.icon aria-hidden className="size-6 text-ink-2" strokeWidth={1.6} />
                <h3 className="mt-6 text-lg font-semibold">{p.title}</h3>
                <p className="mt-3 leading-7 text-muted">{p.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* About */}
      <section id="about" aria-labelledby="about-title" className="scroll-mt-20 border-t border-line py-20 sm:py-28">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-muted">About</p>
            <h2 id="about-title" className="mt-4 text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">
              An independent <span className="font-serif font-normal italic">software initiative.</span>
            </h2>
          </div>
          <div className="space-y-5 text-lg leading-8 text-ink-2">
            <p>
              Apps by Yaron Ogen is an independent software development initiative based in Halle (Saale), Germany. It designs and builds mobile and
              desktop applications that are useful, calm and respectful of the people who use them.
            </p>
            <p>
              Every app is designed, built and looked after end to end: from the idea and the interface to privacy, security and support. Tally, a
              bedtime-story app for families, is the first.
            </p>
            <p className="text-base text-muted">
              Questions or feedback? Write to{" "}
              <a className="font-medium text-ink underline underline-offset-4" href={`mailto:${SITE.operator.email}`}>
                {SITE.operator.email}
              </a>
              .
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}

/** Two real pictures from the product, e.g. Tally's sample stories in two languages and scripts. */
function ShowcaseCollage({ product }: { product: ProductConfig }) {
  const [main, second] = product.images.gallery;
  if (!main) return null;
  return (
    <div className="relative mx-auto w-full max-w-xl pb-6 sm:pb-10 lg:max-w-none">
      <figure className="relative overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/10">
        <ResponsiveImage image={main} sizes="(min-width: 1024px) 600px, 100vw" className="aspect-[3/2] w-full object-cover" />
        <figcaption className="absolute inset-x-0 top-0 bg-gradient-to-b from-night-sky-bottom/90 via-night-sky-bottom/50 to-transparent px-5 pb-12 pt-4">
          <span lang={main.lang} dir={main.dir} className="font-story text-base font-bold text-cream">{main.caption}</span>
          {main.captionNote && <span className="ml-2 text-xs text-lilac">{main.captionNote}</span>}
        </figcaption>
      </figure>
      {second && (
        <figure className="absolute -bottom-4 -right-2 hidden w-[46%] overflow-hidden rounded-2xl shadow-2xl ring-4 ring-night-sky-bottom sm:block lg:-right-8">
          <ResponsiveImage image={second} sizes="280px" className="aspect-[3/2] w-full object-cover" />
          <figcaption lang={second.lang} dir={second.dir} className={`bg-night-surface px-3 py-2 text-sm text-cream ${second.dir === "rtl" ? "font-hebrew" : "font-story"}`}>
            {second.caption}
          </figcaption>
        </figure>
      )}
    </div>
  );
}
