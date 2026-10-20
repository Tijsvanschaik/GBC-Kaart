/**
 * Generates a plain-HTML location list for WordPress fallback pages
 * from the same TypeScript content source.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { getUniqueLocationsInOrder, content, route } from "../src/data";

const here = dirname(fileURLToPath(import.meta.url));
const outPath = resolve(here, "../dist/wordpress-fallback-locations.html");

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

const locations = getUniqueLocationsInOrder();

const items = locations
  .map((location) => {
    const role = location.routeRole
      ? ` — ${escapeHtml(location.routeRole)}`
      : "";
    return `<li>
  <h3>${escapeHtml(location.shortName)}${role}</h3>
  <p><strong>Thema:</strong> ${escapeHtml(location.theme)}</p>
  <p><strong>Organisatie:</strong> ${escapeHtml(location.organization)}</p>
  <p>${escapeHtml(location.summary)}</p>
</li>`;
  })
  .join("\n");

const html = `<!-- Gegenereerd uit src/data — niet handmatig bewerken -->
<section class="gbc-walk-fallback" aria-labelledby="gbc-walk-fallback-title">
  <h2 id="gbc-walk-fallback-title">${escapeHtml(content.productTitle)}</h2>
  <p>${escapeHtml(content.subtitle)}</p>
  <p>${escapeHtml(content.introduction)}</p>
  <p><strong>Volgorde:</strong> ${escapeHtml(
    route.routeSequence.join(" → "),
  )}</p>
  ${
    route.mapMode === "schematic"
      ? `<p><em>${escapeHtml(content.conceptBanner)}</em></p>`
      : ""
  }
  <ol>
${items}
  </ol>
  <p>${escapeHtml(content.sender)}</p>
</section>
`;

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, html, "utf8");
console.log(`Wrote ${outPath}`);
