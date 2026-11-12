# Deployment: apps.yaronogen.com

## What exists today (checked 12 Nov 2026, read-only)

- `yaronogen.com` uses **IONOS nameservers** (`ns1105.ui-dns.com`, …). DNS is managed in the IONOS control panel.
- The portfolio at `yaronogen.com` is served by **GitHub Pages**, not IONOS webspace. Its A records point to `185.199.108–111.153`.
- `apps.yaronogen.com` **does not exist yet**.

## Chosen setup: GitHub Pages

| | |
|---|---|
| Cost | €0 (the repository must be **public** on GitHub Free. A private repo needs GitHub Pro.) |
| SSL | Free, automatic (Let's Encrypt via GitHub) |
| Deploys | Automatic on every push to `main`, after all checks pass (`.github/workflows/site.yml`) |
| DNS change | **One new CNAME record** at IONOS. No existing record changes, and the portfolio is untouched. |
| Limitation | Custom HTTP headers aren't possible. A CSP is set via `<meta>`. Cloudflare Pages would allow real headers; see the alternatives below. |

### Step by step (do these yourself, or ask me to do them, when you're ready)

1. **Create the repository** on GitHub, e.g. `yaronogen/apps-yaronogen` (public), and push this project:
   ```sh
   git remote add origin https://github.com/<you>/apps-yaronogen.git
   git push -u origin main
   ```
   The first workflow run checks everything, but the deploy job will fail until step 2 is done.
2. **Turn on Pages:** repository → Settings → Pages → *Build and deployment* → Source: **GitHub Actions**.
3. **Set the custom domain:** Settings → Pages → Custom domain: `apps.yaronogen.com` → Save.
   - Optional but recommended: verify the domain under your GitHub account settings → Pages → *Add a domain*. This prevents domain takeover. GitHub shows a TXT record to add at IONOS.
4. **Add the DNS record at IONOS:** Domains & SSL → `yaronogen.com` → DNS → *Add record*:

   | Type | Host name | Points to | TTL |
   |---|---|---|---|
   | CNAME | `apps` | `<your-github-username>.github.io` | 1 hour |

   Don't change or delete any existing record.
5. **Wait for DNS** (usually minutes, up to 24 h). GitHub then issues the certificate. When it's ready, tick **Enforce HTTPS** in Settings → Pages.
6. Re-run the workflow (Actions → Site → *Run workflow*), then open https://apps.yaronogen.com.

Check the DNS record with: `nslookup apps.yaronogen.com` (it should resolve to `<you>.github.io`).

### Updating the site

Edit, then commit and push to `main`. The workflow typechecks, lints, runs unit and browser tests, builds, and deploys. If any check fails, nothing is deployed.

## Alternatives

| Option | When it makes sense | What changes |
|---|---|---|
| **Cloudflare Pages** | You want real security headers or private repos, for free | Connect the repo in Cloudflare; build command `npm run build`, output `out`; copy `deploy/_headers` to `public/_headers`; CNAME `apps` → `<project>.pages.dev`. Mention Cloudflare in the website privacy notice. |
| **IONOS webspace** | Your IONOS package includes webspace and you want everything at IONOS | In IONOS, create subdomain `apps`, point it to a folder, enable the SSL certificate for it; copy `deploy/.htaccess` to `public/`; upload the contents of `out/` by SFTP. Update the hosting section of the website privacy notice. |

## Before going live: checklist

- [ ] Website privacy notice reviewed (it names GitHub as the host). See [LEGAL.md](LEGAL.md).
- [ ] `npm run legal:check` passes (the site shows the current Tally legal texts).
- [ ] Store URLs added to `src/products/tally/config.ts` once Tally is public. The download buttons then appear automatically.
- [ ] Current app screenshots added, if you want them (see [ADDING_A_PRODUCT.md](ADDING_A_PRODUCT.md#screenshots)).
