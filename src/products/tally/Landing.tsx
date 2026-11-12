import Link from "next/link";
import { ArrowDown, Check, Info, Moon } from "lucide-react";
import type { ReactNode } from "react";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { StatusBadge, StoreLinks } from "@/components/product/Availability";
import { Faq } from "@/components/product/Faq";
import { absoluteUrl } from "@/lib/site";
import { tally } from "./config";
import {
  billingNotes,
  endings,
  faq,
  features,
  languages,
  modes,
  moods,
  plans,
  privacyPoints,
  samples,
  steps,
  subscriptionDisclosure,
  themes,
} from "./content";
import { SampleStories, type SampleView } from "./SampleStories";

const euro = (n: number) => (n === 0 ? "€0" : `€${n.toFixed(2)}`);

function SectionHeading({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return (
    <div className="max-w-2xl">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">{eyebrow}</p>
      <h2 id={id} className="mt-3 font-tally text-3xl font-semibold leading-tight text-cream sm:text-[2.6rem]">
        {title}
      </h2>
      {children && <p className="mt-4 text-lg leading-8 text-lilac">{children}</p>}
    </div>
  );
}

export function TallyLanding() {
  const sampleViews: SampleView[] = samples.map((s) => {
    const l = languages.find((x) => x.code === s.language)!;
    return { ...s, bcp47: l.bcp47, dir: l.dir as "ltr" | "rtl", languageName: l.name, nativeName: l.nativeName };
  });
  const paid = plans.filter((p) => p.priceEur);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "MobileApplication",
          name: tally.name,
          description: tally.seo.description,
          url: absoluteUrl(`/${tally.slug}/`),
          image: absoluteUrl(tally.images.og),
          applicationCategory: "LifestyleApplication",
          operatingSystem: "iOS, iPadOS, Android",
          inLanguage: languages.map((l) => l.bcp47),
          author: { "@type": "Person", name: "Yaron Ogen" },
          offers: paid.map((p) => ({ "@type": "Offer", name: p.name, price: p.priceEur!.toFixed(2), priceCurrency: "EUR", category: "subscription" })),
        }}
      />

      {/* Hero */}
      <section aria-labelledby="tally-hero" className="relative overflow-hidden bg-gradient-to-b from-night-sky-top to-night">
        <div aria-hidden className="starfield twinkle pointer-events-none absolute inset-0 opacity-80" />
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 size-[28rem] rounded-full bg-gold/10 blur-3xl" />
        <Container className="relative grid items-center gap-12 pb-14 pt-14 sm:pt-20 lg:grid-cols-[1fr_1.05fr] lg:gap-14 lg:pb-20">
          <div className="rise">
            <StatusBadge status={tally.status} />
            <h1 id="tally-hero" className="mt-6 font-tally text-[2.6rem] font-semibold leading-[1.08] text-cream sm:text-6xl">
              Every bedtime deserves a <span className="text-gold">magical story.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-cream/85">
              Tally writes a brand-new bedtime story for your child: with their name, for their age and tonight&apos;s mood, in one of{" "}
              {languages.length} languages, and with a picture for every story.
            </p>
            <p className="mt-4 font-story text-base italic text-lilac">“{tally.tagline}”</p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="#samples" className="inline-flex h-12 items-center gap-2 rounded-full bg-gold px-6 text-sm font-semibold text-gold-ink transition-transform hover:-translate-y-0.5">
                Read a sample story <ArrowDown aria-hidden className="size-4" />
              </Link>
              <Link href="#how" className="inline-flex h-12 items-center rounded-full px-5 text-sm font-semibold text-cream ring-1 ring-night-border transition-colors hover:bg-white/5">
                How it works
              </Link>
            </div>
            <p className="mt-6 text-sm text-lilac">{tally.status.detail} For {tally.platforms.join(", ").replace(/, ([^,]*)$/, " and $1")}.</p>
          </div>

          <div className="relative">
            <figure className="relative overflow-hidden rounded-[2rem] shadow-[0_40px_100px_-30px_rgb(0_0_0/0.7)] ring-1 ring-gold/25">
              <ResponsiveImage image={tally.images.hero} sizes="(min-width: 1024px) 600px, 100vw" priority className="aspect-[3/2] w-full object-cover" />
            </figure>
            <div className="relative -mt-10 ml-auto mr-3 max-w-xs rounded-2xl bg-night-surface/95 p-4 shadow-2xl ring-1 ring-night-border backdrop-blur sm:-mt-14 sm:mr-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-lilac">Sample story</p>
              <p className="mt-1 font-tally text-lg font-semibold text-cream">{samples[0]?.title}</p>
              <p className="mt-2 flex items-start gap-2 font-story text-sm leading-6 text-cream/85">
                <Moon aria-hidden className="mt-1 size-4 shrink-0 text-gold" />
                {samples[0]?.moral}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Three ways */}
      <section id="features" aria-labelledby="modes-title" className="scroll-mt-28 py-20 sm:py-28">
        <Container>
          <SectionHeading id="modes-title" eyebrow="Three ways to make it" title="How shall we make tonight's story?">
            Quick when you need it, or something you and your child make together.
          </SectionHeading>
          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {modes.map((m, i) => (
              <li key={m.title} className="relative rounded-3xl bg-night-surface/70 p-7 ring-1 ring-night-border">
                <span className="absolute right-6 top-6 font-tally text-5xl font-semibold text-white/5" aria-hidden>
                  {i + 1}
                </span>
                <span className="grid size-12 place-items-center rounded-2xl bg-gold/12 text-gold ring-1 ring-gold/30">
                  <m.icon aria-hidden className="size-6" />
                </span>
                <h3 className="mt-6 font-tally text-xl font-semibold text-cream">{m.title}</h3>
                <p className="mt-2 leading-7 text-lilac">{m.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Screenshots */}
      {tally.images.screenshots && (
        <section aria-labelledby="screens-title" className="pb-20 sm:pb-28">
          <Container>
            <SectionHeading id="screens-title" eyebrow="Inside the app" title="Calm screens for the end of the day.">
              Real screenshots from Tally on iPhone.
            </SectionHeading>
          </Container>
          <ul
            aria-label="Tally screenshots"
            tabIndex={0}
            className="mx-auto mt-12 flex max-w-6xl snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:px-6 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-8"
          >
            {tally.images.screenshots.map((s) => (
              <li key={s.caption} className="w-[62vw] max-w-[260px] shrink-0 snap-center lg:w-auto lg:max-w-none">
                <figure>
                  <ResponsiveImage
                    image={s}
                    sizes="(min-width: 1024px) 210px, 62vw"
                    className="aspect-[946/1944] w-full rounded-[1.75rem] object-cover shadow-[0_24px_60px_-24px_rgb(0_0_0/0.8)] ring-1 ring-night-border"
                  />
                  <figcaption className="mt-4 text-center text-sm font-medium text-lilac">{s.caption}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Made for your child */}
      <section aria-labelledby="features-title" className="border-y border-night-border/60 bg-night-sky-bottom/40 py-20 sm:py-28">
        <Container>
          <SectionHeading id="features-title" eyebrow="Made for your child" title="A story that fits tonight.">
            Every story is new, written for your child and for how the day went.
          </SectionHeading>
          <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <li key={f.title}>
                <f.icon aria-hidden className="size-6 text-gold" strokeWidth={1.75} />
                <h3 className="mt-4 text-lg font-semibold text-cream">{f.title}</h3>
                <p className="mt-2 leading-7 text-lilac">{f.text}</p>
              </li>
            ))}
          </ul>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            <ChipPanel title="Tonight's mood" items={moods.map((m) => `${m.emoji} ${m.label}`)} />
            <ChipPanel title={`${themes.length} themes`} items={themes} />
            <ChipPanel title={`${endings.length} endings`} items={endings} />
          </div>
        </Container>
      </section>

      {/* Languages */}
      <section aria-labelledby="languages-title" className="py-20 sm:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-[1fr_1.2fr]">
          <SectionHeading id="languages-title" eyebrow="Languages" title={`Stories in ${languages.length} languages.`}>
            Choose the story language for each story. Hebrew stories read right to left. The app itself is in English.
          </SectionHeading>
          <ul className="flex flex-wrap gap-3" aria-label="Story languages">
            {languages.map((l) => (
              <li key={l.code} className="rounded-2xl bg-night-surface/70 px-5 py-4 ring-1 ring-night-border">
                <span lang={l.bcp47} dir={l.dir} className={`block text-xl text-cream ${l.dir === "rtl" ? "font-hebrew" : "font-tally font-semibold"}`}>
                  {l.nativeName}
                </span>
                <span className="mt-0.5 block text-xs text-lilac">{l.name}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Samples */}
      <section id="samples" aria-labelledby="samples-title" className="scroll-mt-28 border-y border-night-border/60 bg-night-sky-bottom/40 py-20 sm:py-28">
        <Container>
          <SectionHeading id="samples-title" eyebrow="Read a sample" title="See what a Tally story looks like.">
            These are Tally&apos;s built-in sample stories, one in each language, as anyone can read them in the app before subscribing.
          </SectionHeading>
          <div className="mt-10">
            <SampleStories samples={sampleViews} />
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section id="how" aria-labelledby="how-title" className="scroll-mt-28 py-20 sm:py-28">
        <Container>
          <SectionHeading id="how-title" eyebrow="How it works" title="From setup to sleepy eyes." />
          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title} className="rounded-3xl bg-night-surface/70 p-7 ring-1 ring-night-border">
                <span className="grid size-10 place-items-center rounded-full bg-gold font-tally text-lg font-semibold text-gold-ink" aria-hidden>
                  {i + 1}
                </span>
                <h3 className="mt-5 text-lg font-semibold text-cream">
                  <span className="sr-only">Step {i + 1}: </span>
                  {s.title}
                </h3>
                <p className="mt-2 leading-7 text-lilac">{s.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 flex max-w-3xl items-start gap-3 rounded-2xl bg-night-surface/50 p-5 text-sm leading-6 text-lilac ring-1 ring-night-border">
            <Info aria-hidden className="mt-0.5 size-5 shrink-0 text-gold" />
            <span>
              Stories and pictures are created by AI and checked automatically, not by a person. Please read each story yourself before or while sharing
              it with your child, and report anything that seems wrong; there&apos;s a report option under every story.
            </span>
          </p>
        </Container>
      </section>

      {/* Privacy */}
      <section aria-labelledby="privacy-title" className="border-y border-night-border/60 bg-night-sky-bottom/40 py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <SectionHeading id="privacy-title" eyebrow="Privacy for families" title="Built to protect your child.">
              Tally collects only what it needs to write bedtime stories for your child.
            </SectionHeading>
            <Link href="/tally/privacy/" className="mt-6 inline-flex text-sm font-semibold text-gold underline underline-offset-4">
              Read the Privacy Policy
            </Link>
          </div>
          <ul className="grid gap-5 sm:grid-cols-2">
            {privacyPoints.map((p) => (
              <li key={p.title} className="rounded-2xl bg-night-surface/70 p-6 ring-1 ring-night-border sm:last:odd:col-span-2">
                <p.icon aria-hidden className="size-5 text-gold" />
                <h3 className="mt-3 font-semibold text-cream">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-lilac">{p.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Pricing */}
      <section id="pricing" aria-labelledby="pricing-title" className="scroll-mt-28 py-20 sm:py-28">
        <Container>
          <SectionHeading id="pricing-title" eyebrow="Plans" title="Simple monthly plans.">
            Read the sample stories for free. Subscribe to create your own.
          </SectionHeading>
          <ul className="mt-12 grid gap-5 lg:grid-cols-3">
            {plans.map((p) => (
              <li
                key={p.id}
                className={`flex flex-col rounded-3xl p-7 ring-1 ${p.featured ? "bg-gradient-to-b from-night-raised to-night-surface ring-gold/50" : "bg-night-surface/70 ring-night-border"}`}
              >
                <h3 className="font-tally text-xl font-semibold text-cream">{p.name}</h3>
                <p className="mt-5 flex items-baseline gap-1.5">
                  <span className="font-tally text-4xl font-semibold text-cream">{euro(p.priceEur ?? 0)}</span>
                  <span className="text-sm text-lilac">{p.period ? `per ${p.period}, incl. VAT` : "free"}</span>
                </p>
                {p.storiesPerMonth && <p className="mt-1 text-sm text-gold">{p.storiesPerMonth} stories a month · renews monthly</p>}
                <ul className="mt-6 space-y-3 text-sm leading-6 text-cream/90">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-3">
                      <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-gold" />
                      {f}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <div className="mt-8 rounded-3xl bg-night-surface/50 p-6 ring-1 ring-night-border sm:p-8">
            <p className="mb-6 border-b border-night-border pb-6 text-sm font-semibold leading-6 text-cream/90">{subscriptionDisclosure}</p>
            <h3 className="font-semibold text-cream">Good to know before you subscribe</h3>
            <ul className="mt-4 grid gap-3 text-sm leading-6 text-lilac md:grid-cols-2">
              {billingNotes.map((n) => (
                <li key={n} className="flex gap-3">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-gold" />
                  {n}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-lilac">
              Full details: <Link href="/tally/terms/" className="text-gold underline underline-offset-4">Terms of Use</Link>, section 5.
            </p>
          </div>
        </Container>
      </section>

      {/* Download */}
      <section aria-labelledby="download-title" className="relative overflow-hidden border-y border-night-border/60 bg-gradient-to-b from-night to-night-sky-top py-20 sm:py-24">
        <div aria-hidden className="starfield twinkle pointer-events-none absolute inset-0 opacity-70" />
        <Container className="relative flex flex-col items-center text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/products/tally/icon-192.webp" alt="" width={96} height={96} className="size-24 rounded-[1.6rem] shadow-2xl ring-1 ring-white/10" />
          <h2 id="download-title" className="mt-8 font-tally text-3xl font-semibold text-cream sm:text-4xl">
            Get Tally
          </h2>
          <p className="mt-3 max-w-lg text-lg leading-8 text-lilac">For {tally.platforms.join(", ").replace(/, ([^,]*)$/, " and $1")}.</p>
          <div className="mt-8">
            <StoreLinks product={tally} />
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section id="faq" aria-labelledby="faq-title" className="scroll-mt-28 py-20 sm:py-28">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div>
            <SectionHeading id="faq-title" eyebrow="FAQ" title="Questions parents ask." />
            <p className="mt-6 text-sm leading-6 text-lilac">
              Something else?{" "}
              <Link href="/tally/support/" className="font-semibold text-gold underline underline-offset-4">
                Visit Support
              </Link>
              .
            </p>
          </div>
          <Faq items={faq} />
        </Container>
      </section>
    </>
  );
}

function ChipPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-3xl bg-night-surface/60 p-6 ring-1 ring-night-border">
      <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-lilac">{title}</h3>
      <ul className="mt-4 flex flex-wrap gap-2">
        {items.map((i) => (
          <li key={i} className="rounded-full bg-night-raised/70 px-3 py-1.5 text-sm text-cream/90 ring-1 ring-night-border">
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}
