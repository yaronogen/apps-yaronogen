/**
 * Copies Tally's public content from the Tally repository into this website:
 *
 *   - legal texts (Terms, Privacy Policy, Legal notice, Support, Delete account), word for word
 *   - plans and prices (packages/shared/src/plans.ts)
 *   - story languages, brand name and tagline
 *   - the seven built-in sample stories and their pictures, the icon and the wordmark
 *
 * The Tally repository is only READ, never written. The website build never reads it: it uses
 * the snapshot written here (content/tally/tally.json, public/products/tally/*), which is
 * committed. So the site builds anywhere, and every change to legal text is visible in git.
 *
 *   npm run sync:tally            refresh the snapshot and images
 *   npm run legal:check           exit 1 if the snapshot differs from the Tally sources
 *
 * Tally's location: TALLY_REPO, or ../Tally next to this project.
 */
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const tally = resolve(process.env.TALLY_REPO ?? join(root, "..", "Tally"));
const checkOnly = process.argv.includes("--check");
const snapshotPath = join(root, "content", "tally", "tally.json");
const imageDir = join(root, "public", "products", "tally");

if (!existsSync(join(tally, "packages", "shared", "src", "legal", "terms.ts"))) {
  console.error(`Tally repository not found at ${tally}. Set TALLY_REPO to its folder.`);
  process.exit(2);
}

const load = async <T>(rel: string): Promise<T> => (await import(pathToFileURL(join(tally, rel)).href)) as T;

interface Section { heading: string; paragraphs: string[] }
interface LegalDoc { title: string; version: string | null; summary: string | null; sections: Section[]; sha256: string }

const doc = (title: string, version: string | null, summary: string | null, sections: Section[]): LegalDoc => ({
  title, version, summary, sections,
  sha256: createHash("sha256").update(JSON.stringify({ title, version, summary, sections })).digest("hex"),
});

const shared = "packages/shared/src";
const terms = await load<Record<string, unknown>>(`${shared}/legal/terms.ts`);
const privacy = await load<Record<string, unknown>>(`${shared}/legal/privacy.ts`);
const imprint = await load<Record<string, unknown>>(`${shared}/legal/imprint.ts`);
const plans = await load<{ PLANS: Record<string, Record<string, unknown>> }>(`${shared}/plans.ts`);
const brand = await load<{ BRAND: Record<string, string> }>(`${shared}/brand.ts`);
const languages = await load<{ STORY_LANGUAGE_CODES: string[]; STORY_LANGUAGES: Record<string, { name: string; nativeName: string; dir: string; bcp47: string }> }>(`${shared}/language/config.ts`);
const catalog = await load<{ THEMES: readonly { label: string; available: boolean }[]; OBJECTIVES: readonly { label: string; available: boolean }[] }>(`${shared}/story/catalog.ts`);
const moods = await load<{ MOODS: readonly { label: string; emoji: string }[] }>(`${shared}/story/mood.ts`);
const samples = await load<{ SAMPLE_STORIES: { language: string; title: string; paragraphs: string[]; moral: string; lesson: { question: string; explanation: string } }[] }>(
  "apps/mobile/src/features/samples/samples.ts",
);

// The subscription disclosure shown under the plans in the app (apps/mobile/src/app/premium.tsx).
const premiumScreen = readFileSync(join(tally, "apps/mobile/src/app/premium.tsx"), "utf8");
const disclosure = premiumScreen.match(/Monthly subscriptions renew[\s\S]*?Prices include VAT\./)?.[0].replace(/\s+/g, " ");
if (!disclosure) {
  console.error("Couldn't find the subscription disclosure in apps/mobile/src/app/premium.tsx. Update scripts/sync-tally.ts.");
  process.exit(2);
}

const s = (v: unknown) => v as string;
const sec = (v: unknown) => v as Section[];

const git = (...args: string[]) => {
  try { return execFileSync("git", ["-C", tally, ...args], { encoding: "utf8" }).trim(); } catch { return null; }
};
const legalPaths = [`${shared}/legal`, `${shared}/plans.ts`, `${shared}/brand.ts`, `${shared}/story`, `${shared}/language`, "apps/mobile/src/features/samples/samples.ts", "apps/mobile/src/app/premium.tsx"];

const content = {
  legal: {
    terms: doc(s(terms.TERMS_TITLE), s(terms.TERMS_VERSION), s(terms.TERMS_SUMMARY), sec(terms.TERMS_SECTIONS)),
    privacy: doc(s(privacy.PRIVACY_TITLE), s(privacy.PRIVACY_VERSION), s(privacy.PRIVACY_SUMMARY), sec(privacy.PRIVACY_SECTIONS)),
    imprint: doc(s(imprint.IMPRINT_TITLE), null, null, sec(imprint.IMPRINT_SECTIONS)),
    support: doc(s(imprint.SUPPORT_TITLE), null, null, sec(imprint.SUPPORT_SECTIONS)),
    deleteAccount: doc(s(imprint.DELETE_ACCOUNT_TITLE), null, null, sec(imprint.DELETE_ACCOUNT_SECTIONS)),
  },
  provider: {
    name: s(terms.PROVIDER_NAME),
    address: s(terms.PROVIDER_ADDRESS),
    email: s(terms.TERMS_CONTACT),
    appLegalBaseUrl: s(terms.LEGAL_BASE_URL),
  },
  subscriptionDisclosure: disclosure,
  brand: { name: brand.BRAND.name, storeTitle: brand.BRAND.storeTitle, tagline: brand.BRAND.tagline },
  plans: Object.values(plans.PLANS).map((p) => ({
    id: p.id, name: p.name, storiesPerMonth: p.storiesPerMonth, pictures: p.pictures, choices: p.choices,
    booksAndPdf: p.booksAndPdf, maxChildren: p.maxChildren, priceEur: p.priceEur,
  })),
  languages: languages.STORY_LANGUAGE_CODES.map((code) => {
    const l = languages.STORY_LANGUAGES[code]!;
    return { code, name: l.name, nativeName: l.nativeName, dir: l.dir, bcp47: l.bcp47 };
  }),
  catalog: {
    themes: catalog.THEMES.filter((t) => t.available).map((t) => t.label),
    endings: catalog.OBJECTIVES.filter((o) => o.available).map((o) => o.label),
    moods: moods.MOODS.map((m) => ({ label: m.label, emoji: m.emoji })),
  },
  samples: samples.SAMPLE_STORIES.map((x) => ({ language: x.language, title: x.title, paragraphs: x.paragraphs, moral: x.moral, lesson: x.lesson })),
};

const stable = JSON.stringify(content, null, 2);

if (checkOnly) {
  if (!existsSync(snapshotPath)) {
    console.error("No snapshot yet. Run: npm run sync:tally");
    process.exit(1);
  }
  const current = JSON.parse(readFileSync(snapshotPath, "utf8")) as { content: unknown; source: { commit: string | null } };
  if (JSON.stringify(current.content, null, 2) === stable) {
    console.log(`Up to date with Tally (snapshot from ${current.source.commit ?? "unknown commit"}).`);
    process.exit(0);
  }
  const changed = Object.entries(content.legal)
    .filter(([k, v]) => (current.content as typeof content).legal?.[k as keyof typeof content.legal]?.sha256 !== v.sha256)
    .map(([k]) => k);
  console.error(`Tally's content changed since the last sync${changed.length ? ` (legal: ${changed.join(", ")})` : " (plans, languages or samples)"}.`);
  console.error("Review the change, then run: npm run sync:tally");
  process.exit(1);
}

const dirty = git("status", "--porcelain", "--", ...legalPaths);
const snapshot = {
  $comment: "Generated by scripts/sync-tally.ts from the Tally repository. Do not edit by hand: change the text in Tally, then run npm run sync:tally.",
  source: {
    commit: git("rev-parse", "HEAD"),
    uncommittedChanges: Boolean(dirty),
    syncedAt: new Date().toISOString(),
  },
  content,
};
mkdirSync(dirname(snapshotPath), { recursive: true });
writeFileSync(snapshotPath, JSON.stringify(snapshot, null, 2) + "\n");
console.log(`Wrote ${snapshotPath.replace(root, ".")} from Tally ${snapshot.source.commit?.slice(0, 7) ?? "(no git)"}${dirty ? " (WARNING: Tally has uncommitted changes in these files)" : ""}`);

// Images: resized and compressed copies (the originals are 0.4-1.5 MB each).
mkdirSync(join(imageDir, "samples"), { recursive: true });
const assets = join(tally, "apps", "mobile", "assets");
const jobs: Promise<unknown>[] = [];
for (const size of [512, 192, 64]) {
  jobs.push(sharp(join(assets, "icon.png")).resize(size, size).webp({ quality: 86 }).toFile(join(imageDir, `icon-${size}.webp`)));
}
jobs.push(sharp(join(assets, "icon.png")).resize(180, 180).png({ compressionLevel: 9 }).toFile(join(root, "public", "apple-touch-icon.png")));
jobs.push(sharp(join(assets, "icon.png")).resize(32, 32).png({ compressionLevel: 9 }).toFile(join(root, "public", "favicon-32.png")));
jobs.push(sharp(join(assets, "brand", "tally-wordmark.png")).resize({ width: 480 }).webp({ quality: 90 }).toFile(join(imageDir, "wordmark.webp")));
for (const sample of content.samples) {
  const src = join(assets, "samples", `${sample.language}.jpg`);
  if (!existsSync(src)) continue;
  for (const width of [1536, 960, 640]) {
    jobs.push(sharp(src).resize({ width, withoutEnlargement: true }).webp({ quality: 78 }).toFile(join(imageDir, "samples", `${sample.language}-${width}.webp`)));
  }
}
await Promise.all(jobs);
console.log(`Wrote ${jobs.length} images to ${imageDir.replace(root, ".")}`);
