/**
 * Green Business Club — host helper for iframe height.
 * Load this script on the WordPress parent page (theme or approved embed route).
 *
 * Configure ALLOWED_CHILD_ORIGINS to the HTTPS origin that hosts the map module.
 */
(function (global) {
  "use strict";

  var MESSAGE_TYPE = "gbc-map:resize";
  var MIN_HEIGHT = 320;
  var MAX_HEIGHT = 4000;

  /** Replace with the production module origin before go-live. */
  var ALLOWED_CHILD_ORIGINS = [
    "https://greenbusinessclub.nl",
    "http://127.0.0.1:5173",
    "http://localhost:5173",
    "http://127.0.0.1:4173",
    "http://localhost:4173",
  ];

  function isFiniteHeight(value) {
    return typeof value === "number" && isFinite(value) && value > 0;
  }

  function clampHeight(height) {
    return Math.min(MAX_HEIGHT, Math.max(MIN_HEIGHT, Math.ceil(height)));
  }

  /**
   * @param {HTMLIFrameElement} iframe
   * @param {{ allowedOrigins?: string[] }} [options]
   */
  function bindMapEmbed(iframe, options) {
    if (!iframe || iframe.tagName !== "IFRAME") {
      throw new Error("gbc-map-embed: expected an iframe element");
    }

    var allowed =
      (options && options.allowedOrigins) || ALLOWED_CHILD_ORIGINS.slice();

    function onMessage(event) {
      if (allowed.indexOf(event.origin) === -1) return;
      if (event.source !== iframe.contentWindow) return;
      var data = event.data;
      if (!data || data.type !== MESSAGE_TYPE) return;
      if (!isFiniteHeight(data.height)) return;
      iframe.style.height = clampHeight(data.height) + "px";
    }

    global.addEventListener("message", onMessage);

    return function unbind() {
      global.removeEventListener("message", onMessage);
    };
  }

  function autoBind() {
    var nodes = global.document.querySelectorAll(
      "iframe[data-gbc-map-embed], iframe#gbc-map-embed",
    );
    for (var i = 0; i < nodes.length; i++) {
      bindMapEmbed(nodes[i]);
    }
  }

  global.GbcMapEmbed = {
    bind: bindMapEmbed,
    autoBind: autoBind,
  };

  if (global.document.readyState === "loading") {
    global.document.addEventListener("DOMContentLoaded", autoBind);
  } else {
    autoBind();
  }
})(typeof window !== "undefined" ? window : this);
