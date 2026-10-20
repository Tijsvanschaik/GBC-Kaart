import type { Location } from "../types";

/**
 * Public location content for version 1.
 * CFTF: edit texts, links and images here. Keep ids stable.
 * Do not invent verified coordinates — leave coordinates null until confirmed.
 */
export const locations: Location[] = [
  {
    id: "avans",
    order: 1,
    code: "A/D",
    name: "Avans Campus Binnentuin",
    shortName: "Avans",
    routeRole: "Start en finish",
    theme: "Onderwijs en werk van de toekomst",
    organization: "Avans",
    summary:
      "Het Avans-gebouw en ‘Workforce of the Future’ vormen het inhoudelijke vertrekpunt van de wandeling.",
    coordinates: null,
    geoVerification: "unverified",
    // Schematic anchors are drawing positions only (SVG viewBox 0–1000 × 0–720).
    schematicAnchor: { x: 620, y: 280 },
    image: null,
    externalLink: null,
  },
  {
    id: "westerpark",
    order: 2,
    code: "B",
    name: "Westerpark",
    shortName: "Westerpark",
    routeRole: null,
    theme: "Biodiversiteit en groene omgeving",
    organization: "Gemeente ’s-Hertogenbosch",
    summary:
      "Een halte rond biodiversiteit en de groene omgeving in de Spoorzone.",
    coordinates: null,
    geoVerification: "unverified",
    schematicAnchor: { x: 380, y: 320 },
    image: null,
    externalLink: null,
  },
  {
    id: "willemspoort",
    order: 3,
    code: "C",
    name: "Willemspoort",
    shortName: "Willemspoort",
    routeRole: null,
    theme: "Duurzaam wonen en wijkontwikkeling",
    organization: "Heijmans",
    summary:
      "Deze halte gaat over wonen en de ontwikkeling van Willemspoort, met Heijmans als betrokken organisatie.",
    coordinates: null,
    geoVerification: "unverified",
    schematicAnchor: { x: 220, y: 480 },
    image: null,
    // Bronnoemt https://www.heijmans.nl/nl/projecten/Willemspoort-DenBosch/
    // Niet als publieke CTA tot bereikbaarheid vanuit de productieroute is bevestigd
    // (deze bouwomgeving kreeg HTTP 403 van Cloudflare).
    externalLink: null,
  },
];

export function getLocationById(id: string): Location | undefined {
  return locations.find((location) => location.id === id);
}

export function getUniqueLocationsInOrder(): Location[] {
  return [...locations].sort((a, b) => a.order - b.order);
}
