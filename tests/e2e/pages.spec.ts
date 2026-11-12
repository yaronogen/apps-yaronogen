import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import snapshot from "../../content/tally/tally.json" with { type: "json" };
import { ROUTES } from "./routes";

for (const route of ROUTES) {
  test.describe(route, () => {
    test("loads, has one h1, a title, a canonical URL and no console errors", async ({ page }) => {
      const errors: string[] = [];
      page.on("console", (m) => {
        if (m.type() === "error") errors.push(m.text());
      });
      page.on("pageerror", (e) => errors.push(e.message));
      const res = await page.goto(route);
      expect(res?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      expect(await page.title()).not.toBe("");
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://apps.yaronogen.com${route}`);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.{40,}/);
      expect(errors).toEqual([]);
    });

    test("passes axe WCAG 2.2 AA checks", async ({ page }) => {
      await page.goto(route);
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
      expect(results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`)).toEqual([]);
    });

    test("has no horizontal scrolling", async ({ page }) => {
      await page.goto(route);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow).toBeLessThanOrEqual(0);
    });
  });
}

test("every internal link resolves, and new-tab links are safe", async ({ page, request }) => {
  test.setTimeout(120_000); // visits every page
  const seen = new Set<string>();
  for (const route of ROUTES) {
    await page.goto(route);
    const links = await page.locator("a[href]").evaluateAll((as) =>
      as.map((a) => ({ href: (a as HTMLAnchorElement).href, target: a.getAttribute("target"), rel: a.getAttribute("rel") ?? "" })),
    );
    for (const l of links) {
      if (l.target === "_blank") expect(l.rel, l.href).toContain("noopener");
      const url = new URL(l.href);
      if (url.origin !== "http://localhost:4173") continue;
      const key = url.pathname + url.hash;
      if (seen.has(key)) continue;
      seen.add(key);
      const res = await request.get(url.pathname);
      expect(res.status(), `${route} -> ${url.pathname}`).toBe(200);
      if (url.hash) {
        const html = await res.text();
        expect(html, `${route} -> ${l.href}`).toContain(`id="${url.hash.slice(1)}"`);
      }
    }
  }
});

test.describe("legal documents are shown word for word", () => {
  const docs = [
    ["/tally/terms/", snapshot.content.legal.terms],
    ["/tally/privacy/", snapshot.content.legal.privacy],
    ["/tally/imprint/", snapshot.content.legal.imprint],
    ["/tally/delete-account/", snapshot.content.legal.deleteAccount],
    ["/tally/support/", snapshot.content.legal.support],
    ["/imprint/", snapshot.content.legal.imprint],
  ] as const;
  const norm = (s: string) => s.replace(/\s+/g, " ").trim();
  for (const [route, doc] of docs) {
    test(route, async ({ page }) => {
      await page.goto(route);
      const text = norm(await page.locator("main").innerText());
      expect(text).toContain(norm(doc.title));
      if (doc.summary) expect(text).toContain(norm(doc.summary));
      if (doc.version) expect(text).toContain(`Version ${doc.version}`);
      for (const s of doc.sections) {
        expect(text).toContain(norm(s.heading));
        for (const p of s.paragraphs) expect(text).toContain(norm(p));
      }
    });
  }

  test("imprint pages are noindex, the others indexable", async ({ page }) => {
    for (const route of ["/imprint/", "/tally/imprint/"]) {
      await page.goto(route);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    }
    for (const route of ["/tally/terms/", "/tally/privacy/", "/tally/"]) {
      await page.goto(route);
      await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
    }
  });
});

test.describe("Tally landing", () => {
  test("shows the app's real prices and no free story allowance", async ({ page }) => {
    await page.goto("/tally/");
    const pricing = page.locator("#pricing");
    for (const p of snapshot.content.plans.filter((x) => x.priceEur)) {
      await expect(pricing).toContainText(p.name);
      await expect(pricing).toContainText(`€${p.priceEur!.toFixed(2)}`);
      await expect(pricing).toContainText(`${p.storiesPerMonth} stories a month`);
    }
    await expect(pricing).toContainText(snapshot.content.subscriptionDisclosure);
    await expect(pricing).toContainText("renew automatically");
    await expect(pricing).toContainText("don't carry over");
    await expect(page.locator("main")).not.toContainText(/5 (free )?stories (a|per) month/i);
  });

  test("lists every story language", async ({ page }) => {
    await page.goto("/tally/");
    for (const l of snapshot.content.languages) {
      await expect(page.getByRole("tablist")).toContainText(l.code === "nl" ? "Nederlands" : l.nativeName);
    }
  });

  test("sample story tabs work with the keyboard, and Hebrew reads right to left", async ({ page }) => {
    await page.goto("/tally/");
    const first = page.getByRole("tab").first();
    await first.focus();
    await page.keyboard.press("End");
    const last = page.getByRole("tab").last();
    await expect(last).toBeFocused();
    await expect(last).toHaveAttribute("aria-selected", "true");
    const he = snapshot.content.samples.find((s) => s.language === "he")!;
    const article = page.getByRole("tabpanel").locator("article");
    await expect(article).toHaveAttribute("dir", "rtl");
    await expect(article).toContainText(he.title);
    await page.keyboard.press("ArrowRight");
    await expect(first).toBeFocused();
  });

  test("shows every app screenshot with alt text", async ({ page }) => {
    await page.goto("/tally/");
    const shots = page.getByRole("list", { name: "Tally screenshots" }).locator("img");
    await expect(shots).toHaveCount(5);
    for (const alt of await shots.evaluateAll((imgs) => imgs.map((i) => i.getAttribute("alt") ?? ""))) expect(alt.length).toBeGreaterThan(20);
  });

  test("shows no store buttons while no store URL is configured", async ({ page }) => {
    await page.goto("/tally/");
    await expect(page.getByText("Coming soon to the App Store and Google Play.").first()).toBeVisible();
    await expect(page.locator('a[href*="apps.apple.com"], a[href*="play.google.com"]')).toHaveCount(0);
  });
});

test("homepage is general and lets you choose every app", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toContainText("Thoughtful software");
  const index = page.getByRole("navigation", { name: "The apps" });
  const apps = page.locator("#apps");
  for (const slug of ["tally"]) {
    await expect(index.locator(`a[href="/${slug}/"]`)).toHaveCount(1);
    await expect(apps.locator(`a[href="/${slug}/"]`)).toHaveCount(1);
  }
  await apps.getByRole("link", { name: "Explore Tally" }).click();
  await expect(page).toHaveURL(/\/tally\/$/);
  await expect(page.getByRole("list", { name: "Tally screenshots" })).toBeVisible();
});

test("skip link is the first thing keyboard users reach", async ({ page }) => {
  await page.goto("/tally/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
});

test("unknown pages return the 404 page", async ({ page }) => {
  const res = await page.goto("/does-not-exist/");
  expect(res?.status()).toBe(404);
  await expect(page.locator("h1")).toContainText("doesn");
});

test("sitemap and robots.txt", async ({ request }) => {
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).toContain("https://apps.yaronogen.com/tally/");
  expect(sitemap).not.toContain("/imprint/");
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain("Sitemap: https://apps.yaronogen.com/sitemap.xml");
});
