import type { RouteData } from "../types";

/**
 * Route metadata. mapMode is "schematic" until stop positions and
 * pedestrian connections are confirmed. Do not copy sourceIndication
 * values into verified* fields without that confirmation.
 */
export const route: RouteData = {
  routeSequence: ["avans", "westerpark", "willemspoort", "avans"],
  uniqueLocationIds: ["avans", "westerpark", "willemspoort"],
  mapMode: "schematic",
  geometry: null,
  verifiedDistanceMeters: null,
  verifiedWalkingMinutes: null,
  verifiedRouteUrl: null,
  sourceIndication: {
    distanceMeters: 2200,
    walkingMinutesMin: 25,
    walkingMinutesMax: 30,
    verifiedForSelectedRoute: false,
    note:
      "Historische bronindicatie uit presentatie mei 2026; niet gecontroleerd voor de gekozen stopselectie.",
  },
  publicStatusLabel:
    "Conceptkaart: exacte ligging en wandelverbindingen worden nog gecontroleerd.",
  missingGeoNotes: [
    "Exacte Avans-binnentuin, ingang en verzamelpunt nog niet bevestigd.",
    "Exacte stoppositie in Westerpark nog niet bevestigd.",
    "Exacte stoppositie in Willemspoort nog niet bevestigd.",
    "Voetgangersverbindingen voor de volgorde avans → westerpark → willemspoort → avans nog niet gecontroleerd.",
    "Toegankelijkheid van de Avans-binnentuin nog niet vastgesteld.",
    "Afstand en looptijd uit de presentatie zijn niet overgenomen als geverifieerde metadata.",
  ],
};
