# Adding an app

Only add an app when it's ready to be shown publicly. The site never shows placeholders or "coming soon" cards for apps that aren't ready.

## 1. Images

Put optimized images in `public/products/<slug>/`:
- `icon-192.webp` and `icon-512.webp`: the app icon
- an optional transparent `wordmark.webp`
- hero and gallery images (3:2 works best), in a few widths (e.g. 640, 960, 1536)
- `public/og/<slug>.png`: the 1200×630 sharing image (see `scripts/og-images.ts`)

If the app's content lives in its own repo, write a small sync script like `scripts/sync-tally.ts` rather than copying text by hand.

## 2. Config

Create `src/products/<slug>/config.ts` exporting a `ProductConfig` (see [src/products/types.ts](../src/products/types.ts)):

| Field | Purpose |
|---|---|
| `slug`, `name`, `tagline`, `summary` | Identity; the slug is the URL (`/<slug>/`) |
| `status` | `beta`, `available` or `in-development`, with an honest label and detail line |
| `tone` | `"night"` (dark product theme) or `"studio"` (site look) |
| `nav` | Anchor links in the product header |
| `platforms`, `stores` | Store buttons appear **only** when a store URL is set |
| `images` | Icon, wordmark, hero, gallery (two images on the homepage), OG image |
| `highlights` | Up to four points for the homepage showcase |
| `seo` | Page title and meta description |
| `support` | Contact email and response time |
| `legal` | `terms`, `privacy`, `imprint`, `delete-account`, `support` documents, each with an `index` flag |

## 3. Pages

- **Landing page:** write `src/products/<slug>/Landing.tsx`. Compose it from the shared components (`Faq`, `StoreLinks`, `StatusBadge`, `ResponsiveImage`) and the product's own sections. Tally's [Landing.tsx](../src/products/tally/Landing.tsx) is the reference.
- **Support page (optional):** write `Support.tsx`. Without one, `/<slug>/support/` renders the `legal.support` document.
- **Legal pages:** generated automatically for every document in `legal`.

## 4. Register

Add the app to `PRODUCTS` in [src/products/index.ts](../src/products/index.ts). The order there is the order on the homepage. The homepage, footer and sitemap pick it up automatically.

The homepage currently features `PRODUCTS[0]` in the hero. With several apps, add a product grid section to `src/app/(site)/page.tsx`.

## 5. Theme

If the app has its own colors, add them to the `@theme` block in [src/app/globals.css](../src/app/globals.css). Follow Tally's `night-*`, `gold` and `cream` tokens. Add its fonts to `src/fonts/` and `src/lib/fonts.ts`.

## 6. Tests

- Add the new routes to `tests/e2e/routes.ts`.
- Add content checks (prices, legal text) like those for Tally in `tests/unit/content.test.ts`.

Then run `npm run check`.

## Screenshots

1. Put the original phone screenshots in `assets/screenshots/<slug>/`, with a number prefix for the order (e.g. `01-tonight.jpg`).
2. Run `npm run screenshots`. It crops the status bar (time, signal, battery) and writes WebP copies to `public/products/<slug>/screenshots/`.
3. List them in the product config under `images.screenshots`, each with a caption and a descriptive alt text. The Tally page shows them in the "Inside the app" section.

Tally's five screenshots were taken on an iPhone on 12 Nov 2026. Don't use the older ones in the Tally repo (`docs/design/screenshots`): they predate the redesign and show outdated plans.
