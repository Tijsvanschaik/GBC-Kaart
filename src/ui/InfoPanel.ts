import type { Location, PublicContent, RouteData } from "../types";
import type { Store } from "./state";
import { el, clearChildren } from "../utils/dom";
import { isSafeHttpsUrl } from "../utils/urls";
import { createLocationList } from "./LocationList";

export function createInfoPanel(
  locations: Location[],
  route: RouteData,
  content: PublicContent,
  store: Store,
): HTMLElement {
  const root = el("aside", {
    className: "info-panel",
    attrs: { "aria-label": "Informatie over de wandeling" },
  });

  const live = el("div", {
    className: "info-panel__live",
    attrs: {
      "aria-live": "polite",
      "aria-atomic": "true",
    },
  });

  const overview = buildOverview(locations, route, content, store);
  const detail = el("div", { className: "info-panel__detail" });

  live.appendChild(overview);
  live.appendChild(detail);
  root.appendChild(live);

  const sync = (): void => {
    const { selectedId } = store.getState();
    clearChildren(detail);

    if (!selectedId) {
      overview.hidden = false;
      detail.hidden = true;
      return;
    }

    const location = locations.find((item) => item.id === selectedId);
    if (!location) {
      overview.hidden = false;
      detail.hidden = true;
      return;
    }

    overview.hidden = true;
    detail.hidden = false;
    detail.appendChild(buildDetail(location, content, store));
  };

  store.subscribe(sync);
  sync();

  return root;
}

function buildOverview(
  locations: Location[],
  route: RouteData,
  content: PublicContent,
  store: Store,
): HTMLElement {
  const sequence = route.routeSequence
    .map((id) => locations.find((l) => l.id === id)?.shortName ?? id)
    .join(" → ");

  return el("div", {
    className: "info-panel__overview",
    children: [
      el("p", { className: "info-panel__intro", text: content.introduction }),
      el("p", { className: "info-panel__instruction", text: content.instruction }),
      el("p", {
        className: "info-panel__sequence",
        children: [
          el("span", {
            className: "info-panel__sequence-label",
            text: "Volgorde",
          }),
          el("span", { text: sequence }),
        ],
      }),
      createLocationList(locations, store),
    ],
  });
}

function buildDetail(
  location: Location,
  content: PublicContent,
  store: Store,
): HTMLElement {
  const children: Array<Node | null | undefined> = [
    el("button", {
      className: "btn btn--ghost info-panel__back",
      text: content.showFullRouteLabel,
      attrs: { type: "button" },
    }),
    el("p", {
      className: "info-panel__code",
      text: location.routeRole
        ? `${location.code} · ${location.routeRole}`
        : location.code,
    }),
    el("h2", {
      className: "info-panel__title",
      text: location.name,
      attrs: { id: "location-detail-title" },
    }),
    el("p", {
      className: "info-panel__theme",
      text: location.theme,
    }),
    el("p", {
      className: "info-panel__org",
      children: [
        el("span", { className: "info-panel__org-label", text: "Organisatie" }),
        el("span", { text: location.organization }),
      ],
    }),
    el("p", { className: "info-panel__summary", text: location.summary }),
  ];

  if (location.image) {
    children.push(
      el("figure", {
        className: "info-panel__figure",
        children: [
          el("img", {
            attrs: {
              src: location.image.src,
              alt: location.image.alt,
              width: "640",
              height: "400",
              loading: "lazy",
              decoding: "async",
            },
          }),
          el("figcaption", { text: location.image.rights }),
        ],
      }),
    );
  }

  if (location.externalLink && isSafeHttpsUrl(location.externalLink.url)) {
    const link = el("a", {
      className: "btn btn--secondary",
      text: location.externalLink.label,
      attrs: {
        href: location.externalLink.url,
        rel:
          location.externalLink.newTab === false
            ? "noopener noreferrer"
            : "noopener noreferrer",
        ...(location.externalLink.newTab === false
          ? {}
          : { target: "_blank" }),
      },
    });
    children.push(link);
  }

  const wrap = el("div", {
    className: "info-panel__detail-inner",
    attrs: { "aria-labelledby": "location-detail-title" },
    children,
  });

  const back = wrap.querySelector(".info-panel__back");
  back?.addEventListener("click", () => store.clear());

  return wrap;
}
