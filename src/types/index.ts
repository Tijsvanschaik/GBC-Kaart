/** WGS84 coordinates. GeoJSON order: [longitude, latitude]. */
export type Wgs84Coordinate = {
  longitude: number;
  latitude: number;
};

export type GeoVerificationStatus =
  | "unverified"
  | "approximate-area"
  | "verified-stop";

export type MapMode = "schematic" | "geographic";

export type ExternalLink = {
  label: string;
  url: string;
  /** Open in new tab when true (default). */
  newTab?: boolean;
};

export type LocationImage = {
  src: string;
  alt: string;
  rights: string;
};

/** Schematic drawing anchor in SVG viewBox units — not WGS84. */
export type SchematicAnchor = {
  x: number;
  y: number;
};

export type Location = {
  id: string;
  /** Display order in the unique-location list (1-based). */
  order: number;
  code: string;
  name: string;
  shortName: string;
  /** Role in the walk, e.g. "Start en finish". */
  routeRole: string | null;
  theme: string;
  organization: string;
  summary: string;
  /** Real stop coordinates, or null when not confirmed. */
  coordinates: Wgs84Coordinate | null;
  geoVerification: GeoVerificationStatus;
  schematicAnchor: SchematicAnchor;
  image: LocationImage | null;
  externalLink: ExternalLink | null;
};

export type SourceIndication = {
  distanceMeters: number;
  walkingMinutesMin: number;
  walkingMinutesMax: number;
  verifiedForSelectedRoute: false;
  note: string;
};

export type RouteData = {
  routeSequence: string[];
  uniqueLocationIds: string[];
  mapMode: MapMode;
  /** GeoJSON LineString coordinates [lng, lat][], or null. */
  geometry: [number, number][] | null;
  verifiedDistanceMeters: number | null;
  verifiedWalkingMinutes: number | null;
  verifiedRouteUrl: string | null;
  sourceIndication: SourceIndication;
  /** Human-readable status for the public UI. */
  publicStatusLabel: string;
  missingGeoNotes: string[];
};

export type PublicContent = {
  productTitle: string;
  subtitle: string;
  sender: string;
  introduction: string;
  instruction: string;
  showFullRouteLabel: string;
  conceptBanner: string;
};

export type EmbedSettings = {
  allowedParentOrigins: string[];
  messageType: "gbc-map:resize";
  minHeightPx: number;
  maxHeightPx: number;
  debounceMs: number;
};

export type AppSettings = {
  publicModulePathHint: string;
  embed: EmbedSettings;
};
