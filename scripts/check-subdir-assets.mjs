import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const distIndex = resolve("dist/index.html");
if (!existsSync(distIndex)) {
  console.error("dist/index.html missing — run build:subdir first");
  process.exit(1);
}

const html = readFileSync(distIndex, "utf8");
const absoluteRootAsset = /(?:src|href)=["']\/assets\//;
if (absoluteRootAsset.test(html)) {
  console.error("Found absolute /assets/ paths — subpath deploy would break");
  process.exit(1);
}

if (!html.includes("assets/")) {
  console.error("Expected relative assets/ references in dist/index.html");
  process.exit(1);
}

console.log("OK: production HTML uses non-root-absolute asset paths");
