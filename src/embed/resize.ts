import { settings } from "../data/settings";

type ResizeMessage = {
  type: "gbc-map:resize";
  height: number;
  sourceId?: string;
};

function allowedOrigin(origin: string): boolean {
  return settings.embed.allowedParentOrigins.includes(origin);
}

/**
 * Observes the module root height and posts safe resize messages to the parent.
 * Only sends to configured parent origins — never uses "*" in production path.
 */
export function startEmbedResizeReporter(root: HTMLElement): () => void {
  if (window.parent === window) {
    return () => undefined;
  }

  const parentOrigin = document.referrer
    ? (() => {
        try {
          return new URL(document.referrer).origin;
        } catch {
          return null;
        }
      })()
    : null;

  let frame = 0;
  let lastSent = 0;
  let timer: number | null = null;

  const send = (): void => {
    timer = null;
    const raw = Math.ceil(root.getBoundingClientRect().height);
    const { minHeightPx, maxHeightPx } = settings.embed;
    const height = Math.min(maxHeightPx, Math.max(minHeightPx, raw));
    if (height === lastSent) return;
    lastSent = height;

    const message: ResizeMessage = {
      type: settings.embed.messageType,
      height,
    };

    // Prefer the concrete parent origin from referrer when allowlisted.
    const targets = parentOrigin && allowedOrigin(parentOrigin)
      ? [parentOrigin]
      : settings.embed.allowedParentOrigins.filter(
          (origin) =>
            origin.startsWith("http://localhost") ||
            origin.startsWith("http://127.0.0.1"),
        );

    for (const target of targets) {
      window.parent.postMessage(message, target);
    }
  };

  const schedule = (): void => {
    if (timer !== null) window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(send);
    }, settings.embed.debounceMs);
  };

  const observer = new ResizeObserver(schedule);
  observer.observe(root);
  schedule();

  return () => {
    observer.disconnect();
    if (timer !== null) window.clearTimeout(timer);
    cancelAnimationFrame(frame);
  };
}
