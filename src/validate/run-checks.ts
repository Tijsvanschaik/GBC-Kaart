import { locations, route } from "../data";
import { validateDataset } from "./data";

const issues = validateDataset(locations, route);
const errors = issues.filter((i) => i.level === "error");
const warnings = issues.filter((i) => i.level === "warning");

for (const warning of warnings) {
  console.warn(`WARN: ${warning.message}`);
}

if (errors.length > 0) {
  for (const error of errors) {
    console.error(`ERROR: ${error.message}`);
  }
  process.exit(1);
}

console.log(
  `OK: ${locations.length} locations, route ${route.routeSequence.join(" → ")}, mapMode=${route.mapMode}`,
);
