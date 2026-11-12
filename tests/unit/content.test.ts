import { existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import snapshot from "../../content/tally/tally.json";
import { PRODUCTS, LEGAL_PAGES } from "@/products";
import { tally } from "@/products/tally/config";
import { billingNotes, faq, languages, plans, samples } from "@/products/tally/content";
import { SITE_IMPRINT, SITE_PRIVACY } from "@/lib/site-legal";
import { SITE } from "@/lib/site";

const c = snapshot.content;

describe("pricing matches the Tally app", () => {
  it("shows exactly the app's paid plans, names, prices and allowances", () => {
    const paidInApp = c.plans.filter((p) => p.priceEur !== null);
    const paidOnSite = plans.filter((p) => p.priceEur);
    expect(paidOnSite.map((p) => [p.id, p.name, p.priceEur, p.storiesPerMonth])).toEqual(
      paidInApp.map((p) => [p.id, p.name, p.priceEur, p.storiesPerMonth]),
    );
  });

  it("does not advertise a free story allowance (the app has no free stories)", () => {
    const free = plans.find((p) => p.priceEur === 0)!;
    expect(free.storiesPerMonth).toBeNull();
    expect(JSON.stringify([plans, faq, billingNotes])).not.toMatch(/\b5 (free )?stories\b/i);
  });

  it("states automatic renewal, cancellation window and no rollover, as in Terms section 5", () => {
    const terms5 = c.legal.terms.sections.find((s) => s.heading.startsWith("5."))!.paragraphs.join(" ");
    expect(terms5).toContain("renew automatically");
    expect(terms5).toContain("at least 24 hours before the renewal date");
    expect(terms5).toContain("don't carry over");
    const notes = billingNotes.join(" ");
    expect(notes).toContain("renew automatically");
    expect(notes).toContain("at least 24 hours before the renewal date");
    expect(notes).toContain("don't carry over");
  });
});

describe("Tally facts", () => {
  it("lists every story language and one sample per language", () => {
    expect(languages.map((l) => l.code)).toEqual(c.languages.map((l) => l.code));
    expect(new Set(samples.map((s) => s.language))).toEqual(new Set(c.languages.map((l) => l.code)));
  });

  it("has a picture for every sample story", () => {
    for (const s of samples) {
      for (const w of [640, 960, 1536]) expect(existsSync(join("public/products/tally/samples", `${s.language}-${w}.webp`))).toBe(true);
    }
  });

  it("shows no store buttons until real store URLs are configured", () => {
    for (const url of Object.values(tally.stores)) {
      if (url) expect(url).toMatch(/^https:\/\/(apps\.apple\.com|play\.google\.com)\//);
    }
  });
});

describe("legal documents", () => {
  it("are taken from the Tally snapshot without changes", () => {
    expect(tally.legal.terms?.sections).toEqual(c.legal.terms.sections);
    expect(tally.legal.privacy?.sections).toEqual(c.legal.privacy.sections);
    expect(tally.legal.imprint?.sections).toEqual(c.legal.imprint.sections);
    expect(tally.legal["delete-account"]?.sections).toEqual(c.legal.deleteAccount.sections);
    expect(tally.legal.support?.sections).toEqual(c.legal.support.sections);
    expect(tally.legal.terms?.summary).toBe(c.legal.terms.summary);
    expect(tally.legal.privacy?.version).toBe(c.legal.privacy.version);
  });

  it("the website imprint names the same provider as the app", () => {
    expect(SITE_IMPRINT.sections).toEqual(c.legal.imprint.sections);
    const text = JSON.stringify(SITE_PRIVACY);
    expect(text).toContain(c.provider.name);
    expect(text).toContain(c.provider.address);
    expect(text).toContain(SITE.operator.email);
  });

  it("every product links all its legal pages", () => {
    for (const { config } of PRODUCTS) {
      for (const { kind } of LEGAL_PAGES) expect(config.legal[kind], `${config.slug} ${kind}`).toBeDefined();
    }
  });
});

describe("snapshot freshness", () => {
  const tallyRepo = process.env.TALLY_REPO ?? join("..", "Tally");
  it.runIf(existsSync(join(tallyRepo, "packages/shared/src/legal/terms.ts")))("matches the current Tally sources (npm run legal:check)", () => {
    const tsx = join("node_modules", "tsx", "dist", "cli.mjs");
    expect(() => execFileSync(process.execPath, [tsx, "scripts/sync-tally.ts", "--check"], { stdio: "pipe" })).not.toThrow();
  }, 60_000);
});
