# Apps by Yaron Ogen

The website for **https://apps.yaronogen.com**: the home of Yaron Ogen's apps. The first and currently only app is **Tally**, personalized bedtime stories for children.

- **Static site.** Next.js (App Router) with `output: "export"`: `npm run build` writes plain HTML, CSS and JS to `out/`. There's no server, database, login or cookies.
- **Content from the app.** Tally's legal texts, prices, languages and sample stories are **copied from the Tally repository** by a sync script, never retyped (see [docs/LEGAL.md](docs/LEGAL.md)).
- **Room to grow.** Each app is one config folder plus its images (see [docs/ADDING_A_PRODUCT.md](docs/ADDING_A_PRODUCT.md)).

## Pages

| URL | What |
|---|---|
| `/` | Studio homepage, featuring Tally |
| `/tally/` | Tally landing page: features, sample stories, how it works, privacy, pricing, FAQ |
| `/tally/support/` | Support: contact, FAQ, troubleshooting, the app's support text |
| `/tally/terms/` · `/tally/privacy/` · `/tally/imprint/` · `/tally/delete-account/` | Tally's legal documents, word for word from the app |
| `/imprint/` · `/privacy/` | The website's own legal notice and privacy notice |
| `/sitemap.xml` · `/robots.txt` | Generated at build time |

## Requirements

- Node.js 20.9 or newer (CI uses 22)
- For `npm run sync:tally` only: the Tally repository next to this one (`../Tally`) or at `TALLY_REPO`

## Commands

```sh
npm install                # once
npm run dev                # development server at http://localhost:3000
npm run build              # production build into out/
npm start                  # serve out/ at http://localhost:3000 (like GitHub Pages would)

npm run typecheck          # TypeScript
npm run lint               # ESLint
npm test                   # unit tests (content checks: prices, legal text, languages)
npm run test:e2e           # Playwright on out/: every route, links, axe WCAG 2.2 AA, keyboard, mobile
npm run check              # all of the above, in order

npm run sync:tally         # copy legal texts, plans, languages, samples and images from Tally
npm run legal:check        # fails if Tally's sources changed since the last sync
npm run og                 # regenerate the social sharing images in public/og/
```

First Playwright run: `npx playwright install chromium`.

> **Windows note.** Run the commands from a path that starts with a capital drive letter (`C:\Users\...`). From a lower-case `c:\` (VS Code's default terminal sometimes uses it), Vitest loads itself twice and every test fails with "failed to find the current suite". Running `cd C:\Users\yaron\Desktop\Claud\Apps_YaronOgen` first fixes it.

## Project layout

```
src/app/                    routes (App Router)
  (site)/                   studio pages: home, /imprint, /privacy
  [product]/                generated for every product: landing, support, legal documents
src/products/
  types.ts                  ProductConfig: the shape every app follows
  index.ts                  registry: which apps are on the site
  tally/                    Tally: config.ts (facts), content.ts (copy), Landing.tsx, Support.tsx, SampleStories.tsx
src/components/             shared UI (header, footer, legal renderer, FAQ, availability)
src/lib/                    site settings, fonts, website legal texts
src/fonts/                  self-hosted font files (SIL OFL, licenses alongside)
content/tally/tally.json    snapshot synced from the Tally repo (do not edit by hand)
public/products/tally/      optimized images synced from the Tally repo
scripts/                    sync-tally.ts, og-images.ts, postbuild.mjs, serve.mjs
tests/unit, tests/e2e       Vitest and Playwright
deploy/                     header templates for hosts other than GitHub Pages
docs/                       DEPLOYMENT, LEGAL, ADDING_A_PRODUCT, CONTENT_SOURCES, DISCOVERY
```

## Relationship to the Tally app

The Tally app lives in a separate repository (`../Tally`). This website **only reads** from it, and only when you run `npm run sync:tally`. The build itself never touches the Tally repository. What gets copied:

| From Tally | To this site |
|---|---|
| `packages/shared/src/legal/{terms,privacy,imprint}.ts` | `content/tally/tally.json` → legal pages, provider details, support text |
| `packages/shared/src/plans.ts` | prices and monthly allowances |
| `packages/shared/src/language/config.ts`, `story/catalog.ts`, `story/mood.ts` | languages, themes, endings, moods |
| `apps/mobile/src/features/samples/samples.ts` + `apps/mobile/assets/samples/*.jpg` | sample stories and their pictures |
| `apps/mobile/assets/icon.png`, `assets/brand/tally-wordmark.png` | icon and wordmark (resized) |

The snapshot records the Tally commit it came from. Tally's colors and fonts are mirrored from `apps/mobile/src/ui/theme.ts` in [src/app/globals.css](src/app/globals.css).

## Privacy and security

- No cookies, analytics, trackers or third-party requests. Fonts and images are served from this site.
- A Content-Security-Policy is set by `<meta>` tag (GitHub Pages can't send headers). Header templates for other hosts are in `deploy/`.
- There are no secrets: the project needs no environment variables or API keys. `.env*` files are git-ignored anyway.

## Deployment

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md): GitHub Pages plus one DNS record at IONOS. **Nothing is deployed automatically until the repository is pushed and Pages is switched on.**
