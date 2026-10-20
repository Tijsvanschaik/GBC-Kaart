/**
 * Editable schematic base map for the Spoorzone walk.
 * Drawing units: viewBox 0 0 1000 720. North is up.
 * This is a concept illustration — not a verified navigation layer.
 */
export const MAP_VIEWBOX = { width: 1000, height: 720 };

export function createSchematicSvg(): SVGSVGElement {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", `0 0 ${MAP_VIEWBOX.width} ${MAP_VIEWBOX.height}`);
  svg.setAttribute("role", "img");
  svg.setAttribute(
    "aria-label",
    "Schematische gebiedskaart van de Spoorzone met Avans, Westerpark en Willemspoort",
  );
  svg.classList.add("map-svg");
  svg.innerHTML = SCHEMATIC_MARKUP;
  return svg;
}

/** Static markup kept as a string so the illustration stays easy to edit. */
const SCHEMATIC_MARKUP = `
  <defs>
    <linearGradient id="skyWash" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#E8F2F0"/>
      <stop offset="55%" stop-color="#F7F6F3"/>
      <stop offset="100%" stop-color="#EFEBE3"/>
    </linearGradient>
    <linearGradient id="parkGreen" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#DCE8D3"/>
      <stop offset="100%" stop-color="#C5D9B8"/>
    </linearGradient>
    <linearGradient id="waterFill" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#B9DCE6"/>
      <stop offset="100%" stop-color="#C8E4EC"/>
    </linearGradient>
    <pattern id="treeDot" width="28" height="28" patternUnits="userSpaceOnUse">
      <circle cx="8" cy="10" r="3.2" fill="#9DB88A" opacity="0.55"/>
      <circle cx="20" cy="18" r="2.4" fill="#8AA876" opacity="0.4"/>
    </pattern>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="2.5" flood-color="#172322" flood-opacity="0.12"/>
    </filter>
  </defs>

  <!-- Ground -->
  <rect width="1000" height="720" fill="url(#skyWash)"/>

  <!-- Distant rail / station band (east context, simplified) -->
  <g aria-hidden="true" opacity="0.9">
    <rect x="780" y="40" width="180" height="640" rx="18" fill="#E6E2DA"/>
    <rect x="815" y="70" width="28" height="560" rx="4" fill="#D2CEC6"/>
    <rect x="860" y="70" width="8" height="560" fill="#C4BFB5"/>
    <rect x="880" y="70" width="8" height="560" fill="#C4BFB5"/>
    <g fill="#B8B2A7">
      <rect x="800" y="120" width="110" height="14" rx="3"/>
      <rect x="800" y="200" width="110" height="14" rx="3"/>
      <rect x="800" y="280" width="110" height="14" rx="3"/>
      <rect x="800" y="360" width="110" height="14" rx="3"/>
      <rect x="800" y="440" width="110" height="14" rx="3"/>
      <rect x="800" y="520" width="110" height="14" rx="3"/>
    </g>
    <text x="870" y="680" text-anchor="middle" class="map-label map-label--muted">Spoor</text>
  </g>

  <!-- Streets (schematic corridors) -->
  <g aria-hidden="true" fill="none" stroke="#F4F1EB" stroke-width="34" stroke-linecap="round">
    <path d="M120 560 H760"/>
    <path d="M200 640 V180"/>
    <path d="M200 260 H700"/>
    <path d="M500 180 V600"/>
    <path d="M120 420 H520"/>
  </g>
  <g aria-hidden="true" fill="none" stroke="#DED9CF" stroke-width="2" stroke-dasharray="10 12" opacity="0.7">
    <path d="M120 560 H760"/>
    <path d="M200 640 V180"/>
    <path d="M200 260 H700"/>
    <path d="M500 180 V600"/>
    <path d="M120 420 H520"/>
  </g>

  <!-- Water ribbon -->
  <g aria-hidden="true">
    <path d="M60 300 C160 250, 240 340, 340 300 S520 240, 620 290 S760 360, 820 320"
          fill="none" stroke="url(#waterFill)" stroke-width="28" stroke-linecap="round" opacity="0.95"/>
    <path d="M60 300 C160 250, 240 340, 340 300 S520 240, 620 290 S760 360, 820 320"
          fill="none" stroke="#9FCBD8" stroke-width="3" stroke-linecap="round" opacity="0.45"/>
  </g>

  <!-- Westerpark green mass -->
  <g aria-hidden="true" filter="url(#softShadow)">
    <path d="M250 220
             C300 175, 420 170, 470 230
             C510 275, 500 360, 450 400
             C390 450, 280 440, 240 380
             C205 325, 210 260, 250 220 Z"
          fill="url(#parkGreen)"/>
    <path d="M250 220
             C300 175, 420 170, 470 230
             C510 275, 500 360, 450 400
             C390 450, 280 440, 240 380
             C205 325, 210 260, 250 220 Z"
          fill="url(#treeDot)"/>
    <!-- Simple trees -->
    <g fill="#7F9F6C">
      <circle cx="310" cy="250" r="14"/><rect x="307" y="258" width="6" height="16" rx="2" fill="#6B5A45"/>
      <circle cx="360" cy="290" r="12"/><rect x="357" y="296" width="5" height="14" rx="2" fill="#6B5A45"/>
      <circle cx="410" cy="250" r="16"/><rect x="407" y="260" width="6" height="16" rx="2" fill="#6B5A45"/>
      <circle cx="330" cy="340" r="13"/><rect x="327" y="348" width="5" height="14" rx="2" fill="#6B5A45"/>
      <circle cx="400" cy="350" r="11"/><rect x="397" y="356" width="5" height="12" rx="2" fill="#6B5A45"/>
    </g>
  </g>

  <!-- Willemspoort housing blocks (west/southwest) -->
  <g aria-hidden="true" filter="url(#softShadow)">
    <g fill="#D9D2C8" stroke="#C4BBAE" stroke-width="1.5">
      <rect x="90" y="430" width="70" height="48" rx="6"/>
      <rect x="175" y="450" width="58" height="42" rx="6"/>
      <rect x="110" y="500" width="64" height="46" rx="6"/>
      <rect x="190" y="510" width="72" height="50" rx="6"/>
      <rect x="80" y="560" width="80" height="44" rx="6"/>
      <rect x="175" y="575" width="60" height="40" rx="6"/>
    </g>
    <g fill="#B9AFA2" opacity="0.55">
      <rect x="100" y="442" width="10" height="10" rx="1"/>
      <rect x="120" y="442" width="10" height="10" rx="1"/>
      <rect x="140" y="442" width="10" height="10" rx="1"/>
      <rect x="185" y="462" width="9" height="9" rx="1"/>
      <rect x="205" y="462" width="9" height="9" rx="1"/>
      <rect x="120" y="512" width="10" height="10" rx="1"/>
      <rect x="140" y="512" width="10" height="10" rx="1"/>
    </g>
    <!-- Small courtyard green -->
    <ellipse cx="160" cy="495" rx="22" ry="12" fill="#D0E0C4"/>
  </g>

  <!-- Avans campus building cluster (east of park) -->
  <g aria-hidden="true" filter="url(#softShadow)">
    <rect x="560" y="200" width="150" height="110" rx="10" fill="#CFC7BB" stroke="#B8AFA2" stroke-width="1.5"/>
    <rect x="590" y="175" width="90" height="40" rx="8" fill="#C2B8AA" stroke="#AFA698" stroke-width="1.5"/>
    <rect x="540" y="320" width="70" height="55" rx="8" fill="#D5CDC1" stroke="#B8AFA2" stroke-width="1.5"/>
    <rect x="640" y="325" width="85" height="60" rx="8" fill="#D0C8BC" stroke="#B8AFA2" stroke-width="1.5"/>
    <!-- Courtyard suggestion (not claiming public access) -->
    <rect x="585" y="245" width="70" height="45" rx="6" fill="#DCE8D3" stroke="#B7C9A8" stroke-width="1"/>
    <circle cx="605" cy="265" r="6" fill="#8FA97B"/>
    <circle cx="625" cy="270" r="5" fill="#7F9F6C"/>
    <circle cx="645" cy="262" r="6" fill="#8FA97B"/>
    <!-- Facade rhythm -->
    <g fill="#A89F92" opacity="0.45">
      <rect x="575" y="215" width="12" height="18" rx="2"/>
      <rect x="598" y="215" width="12" height="18" rx="2"/>
      <rect x="665" y="215" width="12" height="18" rx="2"/>
      <rect x="688" y="215" width="12" height="18" rx="2"/>
    </g>
  </g>

  <!-- Extra context buildings -->
  <g aria-hidden="true" opacity="0.75">
    <rect x="430" y="470" width="90" height="55" rx="8" fill="#DDD6CC"/>
    <rect x="540" y="500" width="70" height="48" rx="8" fill="#D8D1C7"/>
    <rect x="300" y="520" width="75" height="42" rx="8" fill="#E0D9CF"/>
  </g>

  <!-- Soft people / scale marks -->
  <g aria-hidden="true" fill="#172322" opacity="0.28">
    <circle cx="455" cy="390" r="3.5"/><rect x="452.5" y="393" width="5" height="9" rx="1.5"/>
    <circle cx="475" cy="395" r="3"/><rect x="473" y="397.5" width="4.5" height="8" rx="1.5"/>
    <circle cx="270" cy="555" r="3"/><rect x="268" y="557.5" width="4.5" height="8" rx="1.5"/>
  </g>

  <!-- Schematic route: dashed, clearly not a verified footpath -->
  <g class="map-route" aria-hidden="true">
    <path id="schematic-route-path"
          d="M620 280
             C560 300, 480 310, 380 320
             C300 335, 250 400, 220 480
             C280 430, 420 360, 560 300
             C590 285, 610 280, 620 280"
          fill="none"
          stroke="#A51E53"
          stroke-width="5"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-dasharray="14 12"
          opacity="0.85"/>
    <path d="M620 280
             C560 300, 480 310, 380 320
             C300 335, 250 400, 220 480
             C280 430, 420 360, 560 300
             C590 285, 610 280, 620 280"
          fill="none"
          stroke="#EE7697"
          stroke-width="2"
          stroke-linecap="round"
          stroke-dasharray="14 12"
          opacity="0.9"/>
  </g>

  <!-- Context labels only — stop names live on the HTML markers to avoid duplicates -->
  <g class="map-labels" aria-hidden="true">
    <text x="500" y="555" class="map-label map-label--muted">Onderwijsboulevard</text>
    <text x="150" y="655" class="map-label map-label--muted">Vlijmenseweg</text>
    <text x="870" y="55" class="map-label map-label--muted">Spoorzone</text>
  </g>

  <!-- North indicator (orientation matches drawing) -->
  <g transform="translate(70,70)" aria-hidden="true">
    <circle cx="0" cy="0" r="22" fill="#fff" stroke="#D5CFC5" stroke-width="1.5"/>
    <path d="M0 -12 L6 8 L0 4 L-6 8 Z" fill="#172322"/>
    <text x="0" y="28" text-anchor="middle" class="map-label map-label--tiny">N</text>
  </g>

  <!-- Legend chip -->
  <g transform="translate(700,640)" aria-hidden="true">
    <rect x="0" y="0" width="230" height="44" rx="10" fill="#fff" fill-opacity="0.92" stroke="#E2DDD4"/>
    <line x1="16" y1="22" x2="52" y2="22" stroke="#A51E53" stroke-width="4" stroke-dasharray="8 7"/>
    <text x="64" y="27" class="map-label map-label--tiny">Schematische routeverbinding</text>
  </g>
`;
