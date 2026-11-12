# Legal content

## Where each text comes from

| Page | Source | Edited here? |
|---|---|---|
| `/tally/terms/` | Tally `packages/shared/src/legal/terms.ts` (`TERMS_*`) | **No.** Synced word for word. |
| `/tally/privacy/` | Tally `packages/shared/src/legal/privacy.ts` (`PRIVACY_*`) | **No.** Synced word for word. |
| `/tally/imprint/` | Tally `packages/shared/src/legal/imprint.ts` (`IMPRINT_*`) | **No.** Synced word for word. |
| `/tally/delete-account/` | Tally `imprint.ts` (`DELETE_ACCOUNT_*`) | **No.** Synced word for word. |
| `/tally/support/` (sidebar) | Tally `imprint.ts` (`SUPPORT_*`) | **No.** Synced word for word. The FAQ around it is website copy. |
| `/tally/` pricing: subscription disclosure | Tally `apps/mobile/src/app/premium.tsx` (the text under the plans) | **No.** Synced word for word. |
| `/imprint/` | Same as `/tally/imprint/` (same operator) | **No.** |
| `/privacy/` | `src/lib/site-legal.ts` | **Yes.** This is the website's own notice. |

**Search for existing legal texts (12 Nov 2026).** The whole `Claud` folder was searched for privacy, terms, imprint and similar documents:
- Tally's legal texts are only the files above. The app's Settings screen links exactly these, and its Plans screen shows the subscription disclosure.
- `docs/SECURITY.md` is internal and not a public document.
- The portfolio (`Website_YaronOgen`) has no Impressum or privacy notice.
- Mana has its own privacy and support pages (`Mana/docs/privacy.html`). Those belong to Mana and were not reused, because Mana isn't on this site.
- Nothing existed for a website-level privacy notice, so `/privacy/` is new.

The Tally texts are TypeScript in the app, rendered by the app (`apps/mobile/src/app/terms.tsx`) and by the Tally API as HTML (`apps/api/src/legal/pages.ts`). This website renders the same `{ heading, paragraphs[] }` structure and adds or removes nothing. URLs and email addresses become links, with the same rule as the Tally API pages.

Automated checks:
- `tests/unit/content.test.ts` checks that the pages use the snapshot unchanged.
- `tests/e2e/pages.spec.ts` checks that every heading and paragraph appears on the rendered page.

## Keeping the website and the app in sync

The approach is a **controlled snapshot**. There's no runtime or build-time dependency on the Tally repo.

1. Change legal text **in the Tally repo only** (and bump `TERMS_VERSION` / `PRIVACY_VERSION` there as usual).
2. In this repo, run `npm run sync:tally`. It reads the Tally sources and rewrites `content/tally/tally.json`, recording the Tally commit.
3. Review the diff (`git diff content/`), run `npm run check`, and commit. Pushing to `main` publishes it.

`npm run legal:check`, and the unit test that runs it when `../Tally` exists, fails as soon as Tally's texts differ from the snapshot. That's your reminder to sync.

The snapshot also warns if Tally had uncommitted changes in these files when it was synced (`source.uncommittedChanges`).

## Recommended follow-up in the Tally app (needs your approval; not done)

The app's texts name the Railway server as their official location (`LEGAL_BASE_URL = https://tallyapi-production-1103.up.railway.app`).

The website paths were chosen to match exactly: `/terms`, `/privacy`, `/imprint`, `/support` and `/delete-account` sit under `https://apps.yaronogen.com/tally`. Once this site is live, you could:

1. Set `LEGAL_BASE_URL = "https://apps.yaronogen.com/tally"` in Tally (`packages/shared/src/legal/terms.ts`). Then bump the versions and regenerate the docs.
2. Optionally let the Railway pages redirect to the website.
3. Use the website URLs in App Store Connect (Privacy Policy URL, Support URL) and Google Play (Privacy Policy, account deletion URL).
4. Run `npm run sync:tally` here.

## Open questions for legal review

These are flagged, not changed:

1. **Draft status.** Tally's own source says the Terms and Privacy Policy are "a starting draft, not legal advice", to be reviewed by a lawyer before public launch.
2. **App-only wording** shown on the website as is:
   - Terms: "By tapping 'I agree' you accept these terms."
   - Terms §7: "we'll ask you to agree again in the app."
   - Privacy §10: "the current version is always at …railway.app/privacy".
3. **Impressum (§ 5 DDG).** It lists email as the only contact. Many lawyers recommend a second fast way to reach you (e.g. a phone number or contact form). Please also confirm whether you have a VAT ID (USt-IdNr.) that must be listed.
4. **Language.** All Tally legal texts are English only, while the app is offered in Germany. Check whether German versions are needed for your target markets.
5. **Website privacy notice** (`/privacy/`, version 2026-11-12). This is a new draft for this website. It describes GitHub Pages hosting, the absence of cookies and tracking, and email contact. It names the Landesbeauftragter für den Datenschutz Sachsen-Anhalt as the competent authority (operator based in Halle). Please review it. If the host changes, the hosting section must change too.
6. **Prices.** The site shows €14.99 / €29.99 "incl. VAT" (confirmed by the operator on 12 Nov 2026). The stores show local prices.

## Search engines

Each legal document has an `index` flag (`src/products/tally/config.ts`, `src/lib/site-legal.ts`):
- Imprint pages are `noindex`.
- Terms, Privacy, Support and Delete-account are indexable.

`noindex` only affects search results. Every page stays publicly reachable without login, and all of them are linked from the footer.
