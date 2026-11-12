/**
 * Social sharing images (1200×630) in public/og/. Run after `npm run sync:tally` when the
 * pictures or wording change:  npm run og
 */
import { mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "public", "og");
const tally = join(root, "public", "products", "tally");
mkdirSync(out, { recursive: true });

const W = 1200;
const H = 630;
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

// Tally: the English sample picture, darkened on the left, with the wordmark and a line of text.
{
  const picture = await sharp(join(tally, "samples", "en-1536.webp")).resize(W, H, { fit: "cover", position: "right" }).toBuffer();
  const shade = Buffer.from(
    `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#0a1026" stop-opacity="0.96"/><stop offset="0.55" stop-color="#0e1533" stop-opacity="0.75"/><stop offset="1" stop-color="#0e1533" stop-opacity="0"/></linearGradient></defs>
      <rect width="${W}" height="${H}" fill="url(#g)"/>
      <text x="72" y="410" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="46" font-weight="600" fill="#f6efe1">${esc("Personalized bedtime stories")}</text>
      <text x="72" y="468" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="30" fill="#afaacb">${esc("For your child, in seven languages, with a")}</text>
      <text x="72" y="508" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="30" fill="#afaacb">${esc("picture for every story.")}</text>
      <text x="72" y="574" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="22" fill="#ebc47c">apps.yaronogen.com/tally</text>
    </svg>`,
  );
  const wordmark = await sharp(join(tally, "wordmark.webp")).resize({ width: 340 }).toBuffer();
  await sharp(picture)
    .composite([{ input: shade }, { input: wordmark, left: 60, top: 92 }])
    .png({ compressionLevel: 9 })
    .toFile(join(out, "tally.png"));
}

// Studio: ink background, serif headline, and Tally's icon as the featured app.
{
  const bg = Buffer.from(
    `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${W}" height="${H}" fill="#17161b"/>
      <text x="80" y="120" font-family="Georgia, serif" font-style="italic" font-size="44" fill="#f3f1ec">Apps</text>
      <text x="200" y="120" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="22" letter-spacing="3" fill="#a7a3ae">BY YARON OGEN</text>
      <text x="80" y="300" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="68" font-weight="600" fill="#f3f1ec">Thoughtful software</text>
      <text x="80" y="385" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="68" font-weight="600" fill="#f3f1ec">for <tspan font-family="Georgia, serif" font-style="italic" font-weight="400">everyday life.</tspan></text>
      <text x="80" y="540" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="24" fill="#a7a3ae">apps.yaronogen.com</text>
      <text x="1000" y="540" text-anchor="end" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="22" fill="#a7a3ae">Featuring Tally</text>
    </svg>`,
  );
  const icon = await sharp(join(tally, "icon-512.webp"))
    .resize(120, 120)
    .composite([{ input: Buffer.from(`<svg width="120" height="120"><rect width="120" height="120" rx="28" fill="#fff"/></svg>`), blend: "dest-in" }])
    .png()
    .toBuffer();
  await sharp(bg).composite([{ input: icon, left: 1020, top: 460 }]).png({ compressionLevel: 9 }).toFile(join(out, "site.png"));
}

console.log("Wrote public/og/tally.png and public/og/site.png");
