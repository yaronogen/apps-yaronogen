import Link from "next/link";
import { ArrowRight, FileText, LifeBuoy, Scale, ShieldCheck, Trash2 } from "lucide-react";
import type { ProductConfig } from "@/products/types";

/**
 * An app's help and legal documents, with the same names as in the app's Settings screen.
 * Only documents the app actually has are listed.
 */
export function helpAndLegalLinks(product: ProductConfig) {
  const base = `/${product.slug}`;
  return [
    product.legal.privacy && { href: `${base}/privacy/`, label: "Privacy Policy", text: "What Tally collects, why, and your rights.", icon: ShieldCheck },
    product.legal.terms && { href: `${base}/terms/`, label: "Terms of Use", text: "The agreement for using the app and its subscriptions.", icon: FileText },
    { href: `${base}/support/`, label: "Help and support", text: "Answers, troubleshooting and how to contact us.", icon: LifeBuoy },
    product.legal.imprint && { href: `${base}/imprint/`, label: "Legal notice", text: "Impressum: who provides the app.", icon: Scale },
    product.legal["delete-account"] && { href: `${base}/delete-account/`, label: "Delete your account", text: "How to delete your account and all its data.", icon: Trash2 },
  ].filter(Boolean) as { href: string; label: string; text: string; icon: typeof ShieldCheck }[];
}

export function HelpAndLegal({ product }: { product: ProductConfig }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {helpAndLegalLinks(product).map((l) => (
        <li key={l.href}>
          <Link
            href={l.href}
            className="group flex h-full items-start gap-4 rounded-2xl bg-night-surface/70 p-5 ring-1 ring-night-border transition-colors hover:ring-gold/50"
          >
            <l.icon aria-hidden className="mt-0.5 size-5 shrink-0 text-gold" />
            <span className="min-w-0 flex-1">
              <span className="block font-semibold text-cream">{l.label}</span>
              <span className="mt-1 block text-sm leading-6 text-lilac">{l.text.replace("Tally", product.name)}</span>
            </span>
            <ArrowRight aria-hidden className="mt-1 size-4 shrink-0 text-lilac transition-transform group-hover:translate-x-1 group-hover:text-gold" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
