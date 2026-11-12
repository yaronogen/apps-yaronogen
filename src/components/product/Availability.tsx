import type { ProductConfig, ProductStatus } from "@/products/types";

export function StatusBadge({ status }: { status: ProductStatus }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-gold/12 px-3 py-1 text-xs font-semibold text-gold ring-1 ring-gold/35">
      <span aria-hidden className="size-1.5 rounded-full bg-gold" />
      {status.label}
    </span>
  );
}

/**
 * Store buttons appear only for configured store URLs. Without any, an honest status line is shown.
 * Buttons are plain text (no store badge images: those have their own usage rules).
 */
export function StoreLinks({ product }: { product: ProductConfig }) {
  const links = [
    product.stores.appStore && { href: product.stores.appStore, label: "Download on the App Store" },
    product.stores.googlePlay && { href: product.stores.googlePlay, label: "Get it on Google Play" },
  ].filter(Boolean) as { href: string; label: string }[];

  if (links.length === 0) {
    return (
      <p className="text-sm leading-6 text-lilac">
        <StatusBadge status={product.status} /> <span className="ml-2">{product.status.detail}</span>
      </p>
    );
  }
  return (
    <ul className="flex flex-wrap gap-3">
      {links.map((l) => (
        <li key={l.href}>
          <a
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center rounded-full bg-cream px-6 text-sm font-semibold text-gold-ink transition-transform hover:-translate-y-0.5"
          >
            {l.label}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
