/**
 * App screenshots: originals in assets/screenshots/<slug>/ (as taken on the phone), web copies in
 * public/products/<slug>/screenshots/. The phone status bar (time, signal, battery) is cropped off.
 *
 *   npm run screenshots
 */
import { mkdirSync, readdirSync } from "node:fs";
import { basename, dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "assets", "screenshots");
/** Status bar height as a share of the screenshot height (iPhone: ~5%). */
const STATUS_BAR = 0.051;
const WIDTHS = [720, 400];

for (const slug of readdirSync(src)) {
  const out = join(root, "public", "products", slug, "screenshots");
  mkdirSync(out, { recursive: true });
  for (const file of readdirSync(join(src, slug)).filter((f) => /\.(jpe?g|png)$/i.test(f))) {
    const path = join(src, slug, file);
    const { width = 0, height = 0 } = await sharp(path).metadata();
    const top = Math.round(height * STATUS_BAR);
    const name = basename(file, extname(file));
    for (const w of WIDTHS) {
      await sharp(path)
        .extract({ left: 0, top, width, height: height - top })
        .resize({ width: w })
        .webp({ quality: 82 })
        .toFile(join(out, `${name}-${w}.webp`));
    }
    console.log(`${slug}/${file}: ${width}×${height - top} after cropping the status bar`);
  }
}
