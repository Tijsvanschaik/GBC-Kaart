import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

const out = "/opt/cursor/artifacts/screenshots";
mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" });
await page.waitForSelector(".map-marker");
await page.screenshot({ path: resolve(out, "desktop_overview.png"), fullPage: true });

await page.locator('.map-marker[data-location-id="avans"]').click();
await page.waitForSelector("#location-detail-title");
await page.screenshot({ path: resolve(out, "desktop_selected_avans.png"), fullPage: true });

await page.locator(".info-panel__back").click();
await page.locator('.location-list__item[data-location-id="westerpark"]').click();
await page.screenshot({ path: resolve(out, "desktop_selected_westerpark.png"), fullPage: true });

await page.setViewportSize({ width: 390, height: 844 });
await page.locator(".info-panel__back").click();
await page.waitForSelector(".info-panel__overview");
await page.waitForTimeout(200);
await page.screenshot({ path: resolve(out, "mobile_overview_390.png"), fullPage: true });

await page.locator('.map-marker[data-location-id="willemspoort"]').click();
await page.waitForSelector("#location-detail-title");
await page.screenshot({ path: resolve(out, "mobile_selected_willemspoort.png"), fullPage: true });

await page.setViewportSize({ width: 320, height: 720 });
await page.locator(".info-panel__back").click();
await page.screenshot({ path: resolve(out, "mobile_overview_320.png"), fullPage: true });

await page.setViewportSize({ width: 1100, height: 800 });
await page.goto("http://127.0.0.1:5173/?embed=1", { waitUntil: "networkidle" });
await page.screenshot({ path: resolve(out, "embed_desktop.png"), fullPage: true });

await page.goto("http://127.0.0.1:5174/", { waitUntil: "networkidle" });
await page.waitForTimeout(500);
await page.screenshot({ path: resolve(out, "iframe_host_overview.png"), fullPage: true });
const frame = page.frameLocator("iframe");
await frame.locator('.location-list__item[data-location-id="avans"]').click();
await page.waitForTimeout(600);
await page.screenshot({ path: resolve(out, "iframe_host_selected.png"), fullPage: true });

await browser.close();
console.log("screenshots written to", out);
