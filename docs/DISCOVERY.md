# Phase 1 discovery (12 Nov 2026)

What I found in the Tally repo (`C:\Users\yaron\Desktop\Claud\Tally`, commit `09d4efb`) before building the site. Nothing in the Tally repo was changed.

## Differences from the original website brief (resolved)

| Brief | Actual app | Decision |
|---|---|---|
| Free: 5 stories/month | No free stories; 7 sample stories readable | Site follows the app (approved) |
| Standard €14.99 / Premium €29.99 | Premium €14.99 (30) / Premium Plus €29.99 (60) | Site follows the app (approved) |
| — | 7 story languages | Shown |
| Reuse existing screenshots | The existing screenshots are outdated (pre-redesign, old plans) | Not used; current screenshots to follow |

## Small inconsistencies inside the Tally repo (not fixed; for your to-do list)

- `packages/shared/src/plans.ts`: `free.storiesPerMonth: 5`, and `apps/api/src/quota/quota.ts` still opens a free monthly allowance, but story creation requires a plan. This is harmless leftover code.
- `packages/shared/src/language/config.ts`: Dutch `nativeName` is `"Dutch"`; it should probably be `"Nederlands"`. The website shows "Nederlands".
- `packages/shared/src/legal/imprint.ts` (support text): mentions only "Premium", not "Premium Plus".
- `README.md`: still says 5 languages, 100 stories, read-aloud, and a free tier.
- `docs/design/DESIGN_BRIEF.md`: describes the old €7.99 / 100 stories plan.

## Brand (as used on the site)

- Name "Tally", store title "Tally - Bedtime Stories", tagline "Every child has a story. Tally helps tell it."
- Night palette from `apps/mobile/src/ui/theme.ts`: sky `#1B2552` → `#0A1026`, background `#0E1533`, surfaces `#161F45` / `#212C5C`, gold `#EBC47C` / `#C8964A`, cream `#F6EFE1`, muted `#AFAACB`.
- Fonts: Fredoka (titles), Nunito (story text), Rubik (Hebrew).
- Assets: `apps/mobile/assets/icon.png`, `assets/brand/tally-wordmark.png`, `assets/samples/*.jpg` (watercolor sample pictures with the Tally stamp).
