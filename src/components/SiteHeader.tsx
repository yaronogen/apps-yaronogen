import Link from "next/link";
import { Container } from "./Container";
import { SkipLink } from "./SkipLink";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline gap-1.5 ${className}`}>
      <span className="font-serif text-[1.45rem] italic leading-none tracking-tight">Apps</span>{" "}
      <span className="text-[0.8rem] font-medium uppercase tracking-[0.14em] text-muted">by Yaron Ogen</span>
    </span>
  );
}

const NAV = [
  { href: "/#apps", label: "Apps" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact", wide: true },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/80 backdrop-blur-md supports-[backdrop-filter]:bg-paper/70">
      <SkipLink className="focus:bg-ink focus:text-paper" />
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="rounded-md">
          <Wordmark />
        </Link>
        <nav aria-label="Main">
          <ul className="flex items-center gap-1 text-sm font-medium sm:gap-2">
            {NAV.map((item) => (
              <li key={item.href} className={item.wide ? "hidden sm:block" : undefined}>
                <Link href={item.href} className="rounded-full px-3 py-2 text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
