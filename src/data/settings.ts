import type { AppSettings } from "../types";

/**
 * Runtime settings. Production parent origins must be set before live embed.
 * Local origins are for development only.
 */
export const settings: AppSettings = {
  publicModulePathHint: "/den-bosch/stadswandeling/",
  embed: {
    allowedParentOrigins: [
      // Development / local preview hosts
      "http://localhost:5174",
      "http://127.0.0.1:5174",
      "http://localhost:4174",
      "http://127.0.0.1:4174",
      // Intended production parent — confirm before go-live
      "https://greenbusinessclub.nl",
    ],
    messageType: "gbc-map:resize",
    minHeightPx: 320,
    maxHeightPx: 4000,
    debounceMs: 80,
  },
};
