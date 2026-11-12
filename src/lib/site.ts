import snapshot from "@content/tally/tally.json";

/**
 * Site-wide settings. The operator details come from the Tally legal sources (synced by
 * scripts/sync-tally.ts), so the website and the app always name the same provider.
 */
const provider = snapshot.content.provider;

export const SITE = {
  name: "Apps by Yaron Ogen",
  shortName: "Yaron Ogen Apps",
  url: "https://apps.yaronogen.com",
  description:
    "Thoughtfully designed applications that combine creativity, technology and intelligent experiences. Home of Tally, personalized bedtime stories for children.",
  locale: "en",
  operator: {
    name: provider.name,
    address: provider.address,
    email: provider.email,
  },
} as const;

/** Absolute URL for a site path ("/tally/" -> "https://apps.yaronogen.com/tally/"). */
export function absoluteUrl(path: string): string {
  return new URL(path, SITE.url).toString();
}
