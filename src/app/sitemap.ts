import type { MetadataRoute } from "next";
import snapshot from "@content/tally/tally.json";
import { LEGAL_PAGES, PRODUCTS } from "@/products";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

/** Indexable pages only (documents marked noindex are left out; they stay publicly reachable). */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(snapshot.source.syncedAt);
  const pages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified, priority: 1 },
    { url: absoluteUrl("/privacy/"), lastModified, priority: 0.2 },
  ];
  for (const { config } of PRODUCTS) {
    pages.push({ url: absoluteUrl(`/${config.slug}/`), lastModified, priority: 0.9 });
    pages.push({ url: absoluteUrl(`/${config.slug}/support/`), lastModified, priority: 0.5 });
    for (const { kind } of LEGAL_PAGES) {
      if (config.legal[kind]?.index) pages.push({ url: absoluteUrl(`/${config.slug}/${kind}/`), lastModified, priority: 0.3 });
    }
  }
  return pages;
}
