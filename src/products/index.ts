import type { ComponentType } from "react";
import type { ProductConfig } from "./types";
import { tally } from "./tally/config";
import { TallyLanding } from "./tally/Landing";
import { TallySupport } from "./tally/Support";

/**
 * Every product on the website. Order = order on the homepage.
 * Only add a product here when it is ready to be shown publicly (no placeholders).
 */
export interface ProductEntry {
  config: ProductConfig;
  /** The landing page at /<slug>/. */
  Landing: ComponentType;
  /** The support page at /<slug>/support/ (falls back to the support legal text). */
  Support?: ComponentType;
}

export const PRODUCTS: ProductEntry[] = [{ config: tally, Landing: TallyLanding, Support: TallySupport }];

export function getProduct(slug: string): ProductEntry | undefined {
  return PRODUCTS.find((p) => p.config.slug === slug);
}

export { LEGAL_PAGES } from "./legal-pages";
