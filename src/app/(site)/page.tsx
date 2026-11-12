import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowRight, Fingerprint, Mail, PenLine, Sprout } from "lucide-react";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { ProductCard } from "@/components/product/ProductCard";
import { PRODUCTS } from "@/products";
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
    text: "Apps collect only what they need. No ads, no tracking, and no selling of data. Tally, for example, never sends a child's name to the AI.",
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
  const single = PRODUCTS.length === 1;
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

      {/* Hero: the studio */}
      <section aria-labelledby="hero-title" className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 -top-40 size-[34rem] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--focus)_14%,transparent),transparent)]" />
          <div className="absolute -right-32 top-24 size-[30rem] rounded-full bg-[radial-gradient(closest-side,rgb(235_196_124/0.16),transparent)]" />
        </div>
        <Container className="relative grid items-center gap-14 pb-20 pt-16 sm:pt-24 lg:grid-cols-[1.15fr_1fr] lg:gap-20 lg:pb-28 lg:pt-28">
          <div className="rise">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-muted">Independent software studio</p>
            <h1 id="hero-title" className="mt-5 text-[2.6rem] font-semibold leading-[1.04] tracking-[-0.03em] sm:text-6xl lg:text-[4.4rem]">
              Thoughtful software for <span className="font-serif font-normal italic tracking-[-0.01em]">everyday life.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
              Discover thoughtfully designed applications that combine creativity, technology, and intelligent experiences.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="#apps" className="inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-paper transition-transform hover:-translate-y-0.5">
                Explore the apps <ArrowDown aria-hidden className="size-4" />
              </Link>
              <Link href="#about" className="inline-flex h-12 items-center rounded-full px-5 text-sm font-semibold text-ink-2 ring-1 ring-line transition-colors hover:bg-surface-2">
                About the studio
              </Link>
            </div>
          </div>

          {/* App index: every app, one row each */}
          <nav aria-labelledby="index-title" className="rise rounded-[2rem] bg-surface/80 p-3 shadow-[0_30px_80px_-40px_rgb(23_22_27/0.35)] ring-1 ring-line backdrop-blur sm:p-4">
            <div className="flex items-baseline justify-between px-4 pb-3 pt-3">
              <h2 id="index-title" className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">
                The apps
              </h2>
            </div>
            <ul className="divide-y divide-line overflow-hidden rounded-[1.4rem] ring-1 ring-line">
              {PRODUCTS.map(({ config }, i) => (
                <li key={config.slug}>
                  <Link href={`/${config.slug}/`} className="group flex items-center gap-4 bg-paper/60 px-4 py-4 transition-colors hover:bg-surface-2 sm:px-5">
                    <span aria-hidden className="w-6 font-serif text-lg italic text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={config.images.icon.src} alt="" width={48} height={48} className="size-12 rounded-xl ring-1 ring-line" />
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold">{config.name}</span>
                      <span className="block text-sm leading-5 text-muted">{config.category}</span>
                    </span>
                    <span className="hidden rounded-full bg-surface-2 px-2.5 py-1 text-xs font-medium text-ink-2 ring-1 ring-line sm:inline">{config.status.label}</span>
                    <ArrowRight aria-hidden className="size-4 shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-ink" />
                  </Link>
                </li>
              ))}
            </ul>
            <p className="px-4 pb-2 pt-4 text-sm leading-6 text-muted">
              Each app has its own page with details, screenshots, support and legal information.
            </p>
          </nav>
        </Container>
      </section>

      {/* Apps */}
      <section id="apps" aria-labelledby="apps-title" className="scroll-mt-20 border-t border-line py-20 sm:py-28">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-muted">Apps</p>
              <h2 id="apps-title" className="mt-4 text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">
                Choose an app <span className="font-serif font-normal italic">to explore.</span>
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted">Every app keeps its own look and personality. Open one to see what it does, how it looks, and what it costs.</p>
            </div>
          </div>
          <div className={`mt-12 grid gap-6 ${single ? "" : "lg:grid-cols-2"}`}>
            {PRODUCTS.map(({ config }) => (
              <ProductCard key={config.slug} product={config} wide={single} />
            ))}
          </div>
        </Container>
      </section>

      {/* Principles */}
      <section aria-labelledby="principles-title" className="border-t border-line py-20 sm:py-28">
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
            <p>Every app is designed, built and looked after end to end: from the idea and the interface to privacy, security and support.</p>
            <div id="contact" className="scroll-mt-24 pt-2">
              <a
                href={`mailto:${SITE.operator.email}`}
                className="inline-flex max-w-full items-center gap-2 rounded-full px-5 py-3 text-base font-medium text-ink ring-1 ring-line transition-colors hover:bg-surface-2"
              >
                <Mail aria-hidden className="size-4 shrink-0" />
                <span className="truncate">{SITE.operator.email}</span>
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
