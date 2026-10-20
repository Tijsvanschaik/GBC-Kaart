import {
  content,
  getUniqueLocationsInOrder,
  locations,
  route,
} from "../data";
import { assertValidDataset } from "../validate/data";
import { el } from "../utils/dom";
import { isEmbedMode } from "../utils/urls";
import { startEmbedResizeReporter } from "../embed/resize";
import { createStore } from "./state";
import { createMapView } from "./MapView";
import { createInfoPanel } from "./InfoPanel";

export function mountApp(target: HTMLElement): void {
  assertValidDataset(locations, route);

  const embed = isEmbedMode();
  const unique = getUniqueLocationsInOrder();
  const store = createStore({ selectedId: null });

  document.documentElement.classList.toggle("is-embed", embed);
  document.body.classList.toggle("is-embed", embed);

  const root = el("div", {
    className: embed ? "app app--embed" : "app app--standalone",
  });

  if (!embed) {
    root.appendChild(
      el("header", {
        className: "app-header",
        children: [
          el("p", { className: "app-header__sender", text: content.sender }),
          el("h1", {
            className: "app-header__title",
            text: content.productTitle,
          }),
          el("p", {
            className: "app-header__subtitle",
            text: content.subtitle,
          }),
        ],
      }),
    );
  } else {
    // Compact identity for embeds — no duplicate site chrome.
    root.appendChild(
      el("header", {
        className: "app-header app-header--compact",
        children: [
          el("h1", {
            className: "app-header__title",
            text: content.productTitle,
          }),
          el("p", {
            className: "app-header__subtitle",
            text: content.subtitle,
          }),
        ],
      }),
    );
  }

  if (route.mapMode === "schematic") {
    root.appendChild(
      el("div", {
        className: "concept-banner",
        attrs: { role: "status" },
        children: [
          el("p", { text: content.conceptBanner }),
        ],
      }),
    );
  }

  const layout = el("div", {
    className: "app-layout",
    children: [
      createMapView(unique, store),
      createInfoPanel(unique, route, content, store),
    ],
  });
  root.appendChild(layout);

  root.appendChild(
    el("footer", {
      className: "app-footer",
      children: [
        el("p", {
          text: embed
            ? content.sender
            : `${content.sender} · onderhoud via contentbestanden`,
        }),
      ],
    }),
  );

  target.replaceChildren(root);

  if (embed) {
    startEmbedResizeReporter(root);
  }
}
