import type { Location } from "../types";
import type { Store } from "./state";
import { el } from "../utils/dom";

export function createLocationList(
  locations: Location[],
  store: Store,
): HTMLElement {
  const root = el("ul", {
    className: "location-list",
    attrs: {
      "aria-label": "Locaties op de wandeling",
    },
  });

  const items = new Map<string, HTMLButtonElement>();

  for (const location of locations) {
    const meta = location.routeRole
      ? `${location.routeRole} · ${location.organization}`
      : location.organization;

    const button = el("button", {
      className: "location-list__item",
      attrs: {
        type: "button",
        "data-location-id": location.id,
        "aria-pressed": "false",
      },
      children: [
        el("span", {
          className: "location-list__code",
          text: location.code,
          attrs: { "aria-hidden": "true" },
        }),
        el("span", {
          className: "location-list__body",
          children: [
            el("span", {
              className: "location-list__name",
              text: location.shortName,
            }),
            el("span", {
              className: "location-list__meta",
              text: meta,
            }),
          ],
        }),
      ],
    });

    button.addEventListener("click", () => store.select(location.id));
    items.set(location.id, button);
    root.appendChild(el("li", { className: "location-list__li", children: [button] }));
  }

  const sync = (): void => {
    const { selectedId } = store.getState();
    for (const [id, button] of items) {
      const selected = id === selectedId;
      button.classList.toggle("is-selected", selected);
      button.setAttribute("aria-pressed", selected ? "true" : "false");
    }
  };

  store.subscribe(sync);
  sync();

  return root;
}
