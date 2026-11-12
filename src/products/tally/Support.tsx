import Link from "next/link";
import { Mail } from "lucide-react";
import { Container } from "@/components/Container";
import { Faq } from "@/components/product/Faq";
import { LegalArticle } from "@/components/legal/LegalArticle";
import { LEGAL_PAGES } from "../legal-pages";
import { tally } from "./config";
import { faq, troubleshooting } from "./content";

const subscriptionQuestions = new Set(["How do the monthly stories work?", "How do I cancel?", "Can I try Tally before subscribing?"]);

/** /tally/support/: contact, the app's own support text (word for word), FAQ and troubleshooting. */
export function TallySupport() {
  const supportDoc = tally.legal.support!;
  return (
    <>
      <section aria-labelledby="support-title" className="relative overflow-hidden bg-gradient-to-b from-night-sky-top to-night">
        <div aria-hidden className="starfield pointer-events-none absolute inset-0 opacity-60" />
        <Container className="relative py-16 sm:py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">Support</p>
          <h1 id="support-title" className="mt-3 font-tally text-4xl font-semibold text-cream sm:text-5xl">
            How can we help?
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-lilac">
            Answers to common questions about Tally, subscriptions and your data. Can&apos;t find what you need? Write to us.
          </p>
          <a
            href={`mailto:${tally.support.email}?subject=${encodeURIComponent("Tally support")}`}
            className="mt-8 inline-flex h-12 max-w-full items-center gap-2 rounded-full bg-gold px-6 text-sm font-semibold text-gold-ink transition-transform hover:-translate-y-0.5"
          >
            <Mail aria-hidden className="size-4 shrink-0" />
            <span className="truncate">{tally.support.email}</span>
          </a>
          {tally.support.responseTime && <p className="mt-3 text-sm text-lilac">{tally.support.responseTime}</p>}
        </Container>
      </section>

      <Container className="grid gap-16 py-16 sm:py-20 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
        <div className="space-y-16">
          <section aria-labelledby="faq-general">
            <h2 id="faq-general" className="font-tally text-2xl font-semibold text-cream">About Tally</h2>
            <div className="mt-6">
              <Faq items={faq.filter((f) => !subscriptionQuestions.has(f.q))} />
            </div>
          </section>
          <section aria-labelledby="faq-subscriptions">
            <h2 id="faq-subscriptions" className="font-tally text-2xl font-semibold text-cream">Subscriptions</h2>
            <div className="mt-6">
              <Faq items={faq.filter((f) => subscriptionQuestions.has(f.q))} />
            </div>
          </section>
          <section aria-labelledby="troubleshooting">
            <h2 id="troubleshooting" className="font-tally text-2xl font-semibold text-cream">Troubleshooting</h2>
            <div className="mt-6">
              <Faq items={troubleshooting} />
            </div>
          </section>
        </div>

        <aside className="space-y-8 lg:sticky lg:top-32 lg:self-start">
          <div className="rounded-3xl bg-night-surface/70 p-6 ring-1 ring-night-border sm:p-7">
            <LegalArticle doc={supportDoc} tone="night" eyebrow="From the Tally app" embedded />
          </div>
          <nav aria-labelledby="legal-links" className="rounded-3xl bg-night-surface/40 p-6 ring-1 ring-night-border sm:p-7">
            <h2 id="legal-links" className="text-sm font-semibold uppercase tracking-[0.14em] text-lilac">Legal</h2>
            <ul className="mt-4 space-y-2.5">
              {LEGAL_PAGES.filter((l) => tally.legal[l.kind]).map((l) => (
                <li key={l.kind}>
                  <Link className="text-gold underline underline-offset-4" href={`/tally/${l.kind}/`}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </Container>
    </>
  );
}
