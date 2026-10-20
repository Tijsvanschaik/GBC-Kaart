/**
 * Smoke test: list + marker selection and overview reset.
 * Requires a running dev or preview server on 127.0.0.1:5173 (override with BASE_URL).
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

const base = process.env.BASE_URL ?? "http://127.0.0.1:5173/";
const outDir = resolve("artifacts");
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

const errors = [];
page.on("pageerror", (err) => errors.push(err.message));

await page.goto(base, { waitUntil: "networkidle" });
await page.waitForSelector(".map-marker");

async function assert(condition, message) {
  if (!condition) throw new Error(message);
}

await page.locator('.location-list__item[data-location-id="westerpark"]').click();
await assert(
  (await page.locator(".map-marker.is-selected").getAttribute("data-location-id")) ===
    "westerpark",
  "List selection did not select Westerpark marker",
);
await assert(
  (await page.locator("#location-detail-title").textContent()) === "Westerpark",
  "Detail title mismatch after list click",
);

await page.locator(".info-panel__back").click();
await assert(
  (await page.locator(".map-marker.is-selected").count()) === 0,
  "Overview reset left a selected marker",
);
await assert(
  await page.locator(".info-panel__overview").isVisible(),
  "Overview panel not visible after reset",
);

await page.locator('.map-marker[data-location-id="avans"]').click();
await assert(
  (await page.locator(".map-marker.is-selected").getAttribute("data-location-id")) ===
    "avans",
  "Marker click did not select Avans",
);

await page.locator('.map-marker[data-location-id="willemspoort"]').click();
await assert(
  (await page.locator("#location-detail-title").textContent()) === "Willemspoort",
  "Willemspoort detail missing",
);

const bodyText = await page.locator("body").innerText();
await assert(!/\b2[.,]?2\s*km\b/i.test(bodyText), "Unverified distance leaked into UI");
await assert(!/25\s*[-–tot]+\s*30/i.test(bodyText), "Unverified duration leaked into UI");

await page.screenshot({
  path: resolve(outDir, "desktop-selected-willemspoort.png"),
  fullPage: true,
});

await page.setViewportSize({ width: 390, height: 844 });
await page.locator(".info-panel__back").click();
await page.screenshot({
  path: resolve(outDir, "mobile-overview.png"),
  fullPage: true,
});

await page.goto(new URL("?embed=1", base).toString(), { waitUntil: "networkidle" });
await assert(
  await page.locator(".app--embed").isVisible(),
  "Embed mode class missing",
);
await page.screenshot({
  path: resolve(outDir, "embed-overview.png"),
  fullPage: true,
});

await browser.close();

if (errors.length) {
  console.error("Page errors:", errors);
  process.exit(1);
}

console.log("OK: selection, reset, no leaked source metrics, screenshots in artifacts/");
