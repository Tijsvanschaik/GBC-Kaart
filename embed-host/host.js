/**
 * Parent-page helper for automatic iframe height.
 * Copy the production version from public/gbc-map-embed.js when embedding.
 */

const MESSAGE_TYPE = "gbc-map:resize";
const MIN_HEIGHT = 320;
const MAX_HEIGHT = 4000;

/** Origins allowed to send resize messages (the map module host). */
const ALLOWED_CHILD_ORIGINS = [
  "http://127.0.0.1:5173",
  "http://localhost:5173",
  "http://127.0.0.1:4173",
  "http://localhost:4173",
];

function isFiniteHeight(value) {
  return typeof value === "number" && Number.isFinite(value) && value > 0;
}

function clampHeight(height) {
  return Math.min(MAX_HEIGHT, Math.max(MIN_HEIGHT, Math.ceil(height)));
}

const iframe = document.getElementById("gbc-map-embed");

window.addEventListener("message", (event) => {
  if (!ALLOWED_CHILD_ORIGINS.includes(event.origin)) return;
  if (!iframe || event.source !== iframe.contentWindow) return;
  const data = event.data;
  if (!data || data.type !== MESSAGE_TYPE) return;
  if (!isFiniteHeight(data.height)) return;
  iframe.style.height = `${clampHeight(data.height)}px`;
});
