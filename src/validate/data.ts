import type { Location, RouteData } from "../types";

export type ValidationIssue = {
  level: "error" | "warning";
  message: string;
};

const SAFE_URL = /^https:\/\//i;

export function validateDataset(
  locations: Location[],
  route: RouteData,
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const ids = locations.map((l) => l.id);

  if (new Set(ids).size !== ids.length) {
    issues.push({ level: "error", message: "Location ids must be unique." });
  }

  if (route.uniqueLocationIds.length !== 3) {
    issues.push({
      level: "error",
      message: "Version 1 expects exactly three unique locations.",
    });
  }

  for (const id of route.uniqueLocationIds) {
    if (!ids.includes(id)) {
      issues.push({
        level: "error",
        message: `uniqueLocationIds references unknown id "${id}".`,
      });
    }
  }

  for (const id of route.routeSequence) {
    if (!ids.includes(id)) {
      issues.push({
        level: "error",
        message: `routeSequence references unknown id "${id}".`,
      });
    }
  }

  const avansCount = locations.filter((l) => l.id === "avans").length;
  if (avansCount !== 1) {
    issues.push({
      level: "error",
      message: "Avans must appear exactly once as a unique location.",
    });
  }

  if (
    route.routeSequence[0] !== "avans" ||
    route.routeSequence[route.routeSequence.length - 1] !== "avans"
  ) {
    issues.push({
      level: "error",
      message: "Route must start and finish at avans.",
    });
  }

  for (const location of locations) {
    if (location.coordinates === null && location.geoVerification === "verified-stop") {
      issues.push({
        level: "error",
        message: `Location "${location.id}" cannot be verified-stop without coordinates.`,
      });
    }

    if (
      location.coordinates !== null &&
      (location.coordinates.longitude === 0 || location.coordinates.latitude === 0)
    ) {
      issues.push({
        level: "error",
        message: `Location "${location.id}" uses suspicious 0-coordinate; use null when unknown.`,
      });
    }

    if (location.externalLink) {
      if (!SAFE_URL.test(location.externalLink.url)) {
        issues.push({
          level: "error",
          message: `Unsafe or non-HTTPS external link on "${location.id}".`,
        });
      }
    }
  }

  if (route.mapMode === "geographic" && route.geometry === null) {
    issues.push({
      level: "error",
      message: "Geographic mapMode requires geometry.",
    });
  }

  if (route.verifiedDistanceMeters !== null && route.mapMode === "schematic") {
    issues.push({
      level: "warning",
      message: "verifiedDistanceMeters set while map is still schematic.",
    });
  }

  if (route.verifiedRouteUrl && !SAFE_URL.test(route.verifiedRouteUrl)) {
    issues.push({
      level: "error",
      message: "verifiedRouteUrl must be an https URL.",
    });
  }

  if (route.sourceIndication.verifiedForSelectedRoute !== false) {
    issues.push({
      level: "error",
      message: "sourceIndication.verifiedForSelectedRoute must stay false until rechecked.",
    });
  }

  return issues;
}

export function assertValidDataset(
  locations: Location[],
  route: RouteData,
): void {
  const issues = validateDataset(locations, route);
  const errors = issues.filter((i) => i.level === "error");
  if (errors.length > 0) {
    throw new Error(
      `Dataset validation failed:\n${errors.map((e) => `- ${e.message}`).join("\n")}`,
    );
  }
}
