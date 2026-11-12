import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Container } from "@/components/Container";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Container size="text" className="py-28 text-center">
          <p className="font-serif text-6xl italic text-muted">404</p>
          <h1 className="mt-6 text-3xl font-semibold tracking-[-0.02em]">This page doesn&apos;t exist.</h1>
          <p className="mt-4 text-muted">It may have moved, or the address may be mistyped.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/" className="inline-flex h-12 items-center rounded-full bg-ink px-6 text-sm font-semibold text-paper">
              Go to the homepage
            </Link>
            <Link href="/tally/" className="inline-flex h-12 items-center rounded-full px-6 text-sm font-semibold ring-1 ring-line">
              Tally
            </Link>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
