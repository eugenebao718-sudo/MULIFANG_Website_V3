import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

test("server-renders all localized home pages", async () => {
  for (const [path, phrase] of [["/en", /Premium Custom/], ["/zh", /高端定制家具制造商/], ["/ko", /프리미엄 맞춤 가구 제조업체/]]) {
    const response = await render(path); const html = await response.text();
    assert.equal(response.status, 200, path); assert.match(html, phrase); assert.match(html, /MULIFANG/); assert.doesNotMatch(html, /codex-preview|Your site is taking shape/);
  }
});

test("server-renders every key route in all three languages", async () => {
  const routes = ["/products", "/launch-collection-2026", "/custom-projects", "/factory", "/about", "/contact", "/privacy", "/terms", "/products/nest-1800-tv-console", "/products/custom-kitchen-cabinets"];
  for (const locale of ["en", "zh", "ko"]) for (const route of routes) {
    const path = `/${locale}${route}`;
    const response = await render(path); assert.equal(response.status, 200, path);
  }
});

test("English product content stays English and preserves the approved custom sequence", async () => {
  const response = await render("/en/products");
  const html = await response.text();
  const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? "";
  assert.doesNotMatch(main, /[\u3400-\u9fff]/);
  assert.match(main, /Custom Solutions/i);
  assert.match(main, /View Details/);
  assert.match(main, /Request a Quote/);
  const approved = ["MF-CUS-001", "MF-CUS-002", "MF-CUS-017", "MF-CUS-018", "MF-CUS-019"];
  const positions = approved.map((code) => main.indexOf(code));
  assert.ok(positions.every((position) => position >= 0), "approved custom product codes are present");
  assert.deepEqual([...positions].sort((a, b) => a - b), positions, "approved custom products retain their sequence");
  assert.match(main, /Luxury Villa Project - 1/);
  assert.match(main, /Luxury Villa Project - 2/);
});

test("localized page content never leaks another interface language", async () => {
  const routes = ["", "/products", "/launch-collection-2026", "/custom-projects", "/factory", "/about", "/contact", "/privacy", "/terms", "/products/nest-1800-tv-console", "/products/custom-kitchen-cabinets"];
  const forbiddenUi = {
    en: /[\u3400-\u9fff\uac00-\ud7af]/,
    zh: /[\uac00-\ud7af]|\b(?:View Details|Request a Quote|Custom Solutions|Product Gallery|Related Products|Business Hours)\b/i,
    ko: /[\u3400-\u9fff]|\b(?:View Details|Request a Quote|Custom Solutions|Product Gallery|Related Products|Business Hours)\b/i,
  };
  for (const locale of ["en", "zh", "ko"]) for (const route of routes) {
    const path = `/${locale}${route}`;
    const response = await render(path);
    const html = await response.text();
    const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? "";
    const visible = main.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/&[a-z#0-9]+;/gi, " ");
    assert.doesNotMatch(visible, forbiddenUi[locale], path);
  }
});

test("localized pages preserve the approved production section order", async () => {
  const cases = [
    ["/en/launch-collection-2026", ["launch-page-hero", "collection-stats", "Hero Launch Products", "dark-section section", "Complete Range", "quote-banner"]],
    ["/en/custom-projects", ["page-hero", "Project Categories", "project-approach", "interior-section", "villa-section", "quote-banner"]],
    ["/en/factory", ["page-hero", "factory-gallery", "Production Scope", "capability-list", "stats-band", "quote-banner"]],
    ["/en/about", ["page-hero", "Company Profile", "Brand Position", "Direction", "Core Values", "service-area", "quote-banner"]],
    ["/en/products/nest-1800-tv-console", ["product-hero", "product-specs", "launch-details", "product-gallery-section", "exploded-layout", "pricing-note", "Related Products", "quote-banner"]],
  ];
  for (const [path, markers] of cases) {
    const response = await render(path);
    const html = await response.text();
    const positions = markers.map(marker => html.indexOf(marker));
    assert.ok(positions.every(position => position >= 0), `${path}: all approved sections exist`);
    assert.deepEqual([...positions].sort((a, b) => a - b), positions, `${path}: approved section order`);
  }
});

test("legacy routes safely redirect to English", async () => {
  for (const path of ["/", "/products", "/factory", "/products/nest-1800-tv-console"]) {
    const response = await render(path);
    assert.ok([301, 302, 307, 308].includes(response.status), `${path}: ${response.status}`);
    assert.match(response.headers.get("location") || "", /\/en(?:\/|$)/);
  }
});

test("launch prices use one numeric source of truth", async () => {
  const source = await readFile(new URL("../data/products.ts", import.meta.url), "utf8");
  const expected = {
    "MF-LR-TV1800": 8990, "MF-LR-CT1100": 9990, "MF-LR-SF1800": 19990, "MF-LR-SB1900": 22990,
    "MF-ST-SC1200": 10990, "MF-ST-SH800": 5990, "MF-ST-BS1200": 6990, "MF-ST-BN1000": 4990,
    "MF-ST-DR1200": 7990, "MF-BR-BD1500": 21990, "MF-BR-WR1800": 24990, "MF-BR-NS500": 2990,
    "MF-BR-DT1000": 8990, "MF-DR-ET1400": 13990, "MF-DR-DC450": 2490, "MF-DR-DS1400": 19990,
    "MF-DR-BS1200": 8990, "MF-OF-DS1200": 6990, "MF-OF-MP400": 4990, "MF-KT-PC1000": 12990,
  };
  const launchLines = source.split("\n").filter((line) => line.includes("launch({ number:"));
  assert.equal(launchLines.length, 20);
  for (const [code, price] of Object.entries(expected)) {
    const line = launchLines.find((entry) => entry.includes(`code: "${code}"`));
    assert.ok(line, code);
    assert.match(line, new RegExp(`suggestedRetailPrice: ${price}(?:,| })`));
    assert.doesNotMatch(line, /suggestedRetailPrice:\s*"|suggestedRetailPrice:\s*₱/);
  }
});

test("complete launch range renders all 20 unique product main images", async () => {
  for (const locale of ["en", "zh", "ko"]) {
    const response = await render(`/${locale}/launch-collection-2026`);
    const html = await response.text();
    const grid = html.match(/<div class="container compact-product-grid">([\s\S]*?)<div class="container collection-note">/)?.[1] ?? "";
    const images = [...grid.matchAll(/%2Fimages%2Fproducts%2Flaunch-collection-2026%2F[^&\"]+%2Fmain\.webp/g)].map((match) => match[0]);
    assert.equal(images.length, 20, `${locale}: every compact launch row has an image`);
    assert.equal(new Set(images).size, 20, `${locale}: compact launch images are unique`);
  }
});

test("about brand position uses the approved living-and-kitchen panorama", async () => {
  for (const locale of ["en", "zh", "ko"]) {
    const response = await render(`/${locale}/about`);
    const html = await response.text();
    assert.match(html, /brand-position-section/);
    assert.match(html, /\/images\/projects\/brand-position-living-kitchen\.webp/);
  }
});
