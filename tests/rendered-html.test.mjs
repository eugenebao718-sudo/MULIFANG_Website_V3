import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

test("server-renders the production home page", async () => {
  const response = await render(); const html = await response.text();
  assert.equal(response.status, 200); assert.match(html, /Premium Custom/); assert.match(html, /MULIFANG/); assert.doesNotMatch(html, /codex-preview|Your site is taking shape/);
});

test("server-renders key routes", async () => {
  for (const path of ["/products", "/launch-collection-2026", "/custom-projects", "/factory", "/about", "/contact", "/privacy", "/terms", "/products/nest-1800-tv-console", "/products/custom-kitchen-cabinets"]) {
    const response = await render(path); assert.equal(response.status, 200, path);
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
