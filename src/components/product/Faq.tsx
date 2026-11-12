import { Plus } from "lucide-react";
import type { FaqItem } from "@/products/types";

/** Native <details> accordion: keyboard-accessible and works without JavaScript. */
export function Faq({ items, tone = "night" }: { items: FaqItem[]; tone?: "night" | "studio" }) {
  const night = tone === "night";
  return (
    <div className={`divide-y rounded-3xl ring-1 ${night ? "divide-night-border bg-night-surface/60 ring-night-border" : "divide-line bg-surface ring-line"}`}>
      {items.map((item) => (
        <details key={item.q} className="group px-5 sm:px-7">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left font-semibold [&::-webkit-details-marker]:hidden">
            <span>{item.q}</span>
            <Plus aria-hidden className={`size-5 shrink-0 transition-transform group-open:rotate-45 ${night ? "text-gold" : "text-muted"}`} />
          </summary>
          <p className={`-mt-1 pb-6 leading-7 ${night ? "text-cream/85" : "text-muted"}`}>{item.a}</p>
        </details>
      ))}
    </div>
  );
}
