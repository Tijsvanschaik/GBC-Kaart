import type { Location } from "../types";
import type { Store } from "./state";
import { createSchematicSvg, MAP_VIEWBOX } from "../map/schematicSvg";
import { el } from "../utils/dom";

export function createMapView(
  locations: Location[],
  store: Store,
): HTMLElement {
  const root = el("section", {
    className: "map-stage",
    attrs: {
      "aria-label": "Kaart van de wandeling",
    },
  });

  const frame = el("div", { className: "map-frame" });
  const svg = createSchematicSvg();
  frame.appendChild(svg);

  const markersLayer = el("div", {
    className: "map-markers",
    attrs: { role: "group", "aria-label": "Locatiemarkers" },
  });

  const buttons = new Map<string, HTMLButtonElement>();

  for (const location of locations) {
    const button = el("button", {
      className: "map-marker",
      attrs: {
        type: "button",
        "data-location-id": location.id,
        "aria-pressed": "false",
        "aria-label": `${location.shortName}. ${location.theme}`,
      },
      children: [
        el("span", {
          className: "map-marker__code",
          text: location.code,
          attrs: { "aria-hidden": "true" },
        }),
        el("span", {
          className: "map-marker__name",
          text: location.shortName,
          attrs: { "aria-hidden": "true" },
        }),
      ],
    });

    const left = (location.schematicAnchor.x / MAP_VIEWBOX.width) * 100;
    const top = (location.schematicAnchor.y / MAP_VIEWBOX.height) * 100;
    button.style.left = `${left}%`;
    button.style.top = `${top}%`;

    button.addEventListener("click", () => {
      store.select(location.id);
    });

    buttons.set(location.id, button);
    markersLayer.appendChild(button);
  }

  frame.appendChild(markersLayer);
  root.appendChild(frame);

  const sync = (): void => {
    const { selectedId } = store.getState();
    for (const [id, button] of buttons) {
      const selected = id === selectedId;
      button.classList.toggle("is-selected", selected);
      button.setAttribute("aria-pressed", selected ? "true" : "false");
    }
  };

  store.subscribe(sync);
  sync();

  return root;
}
