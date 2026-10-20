export function isEmbedMode(search: string = window.location.search): boolean {
  const params = new URLSearchParams(search);
  return params.get("embed") === "1";
}

export function isSafeHttpsUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:";
  } catch {
    return false;
  }
}

/** Maps deep-link for a place search — never presented as a verified walking route. */
export function mapsSearchUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
