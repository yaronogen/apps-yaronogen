import type { LucideIcon } from "lucide-react";

/**
 * One application on the website. Adding a product = a folder in src/products/<slug>/ with a
 * config of this type, its images in public/products/<slug>/, and an entry in
 * src/products/index.ts. Pages under /<slug>/ are generated from it (see docs/ADDING_A_PRODUCT.md).
 */
export interface ProductConfig {
  slug: string;
  name: string;
  /** One line under the name, e.g. the app's own tagline. */
  tagline: string;
  /** What kind of app it is, in a few words (homepage app list), e.g. "Bedtime stories for children". */
  category: string;
  /** Two or three sentences: the homepage showcase and meta descriptions. */
  summary: string;
  status: ProductStatus;
  /** Visual identity of the product pages: "night" = dark product theme, "studio" = the site look. */
  tone: "night" | "studio";
  /** In-page navigation on the product header (anchors on the landing page). */
  nav: { label: string; href: string }[];
  platforms: string[];
  /** Store links. A button appears only when a URL is set. */
  stores: { appStore?: string; googlePlay?: string };
  images: {
    icon: { src: string; alt: string };
    wordmark?: { src: string; alt: string; width: number; height: number };
    /** Large visual for the homepage showcase and the product hero. */
    hero: ResponsiveImage;
    /** Social sharing image (1200×630), relative to the site root. */
    og: string;
    /** Real visuals from the product for the homepage showcase (two are shown). */
    gallery: (ResponsiveImage & { caption: string; captionNote?: string; lang?: string; dir?: "ltr" | "rtl" })[];
    /** Real screenshots from the current app (see scripts/screenshots.ts). Optional. */
    screenshots?: (ResponsiveImage & { caption: string })[];
  };
  /** Up to four short points for the homepage showcase. */
  highlights: Highlight[];
  seo: { title: string; description: string };
  support: { email: string; responseTime?: string };
  /** Legal and help pages generated under /<slug>/... */
  legal: Partial<Record<LegalKind, LegalDocument>>;
  /** Where the product's own legal texts come from (shown at the bottom of each legal page). */
  legalSource?: string;
}

export type ProductStatus =
  | { kind: "beta"; label: string; detail: string }
  | { kind: "available"; label: string; detail?: string }
  | { kind: "in-development"; label: string; detail: string };

export interface Highlight {
  icon: LucideIcon;
  title: string;
  text: string;
}

export interface ResponsiveImage {
  /** srcset candidates, widest first. */
  sources: { src: string; width: number }[];
  width: number;
  height: number;
  alt: string;
}

export type LegalKind = "terms" | "privacy" | "imprint" | "support" | "delete-account";

export interface LegalSection {
  heading: string;
  paragraphs: string[];
}

export interface LegalDocument {
  title: string;
  version: string | null;
  summary: string | null;
  sections: LegalSection[];
  /** Search engines: legal pages stay public either way. */
  index: boolean;
}

export interface Plan {
  id: string;
  name: string;
  priceEur: number | null;
  period: string | null;
  storiesPerMonth: number | null;
  features: string[];
  featured?: boolean;
}

export interface FaqItem {
  q: string;
  a: string;
}
