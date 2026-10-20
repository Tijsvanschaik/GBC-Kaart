/** Text-only element helper — never uses innerHTML for content data. */
export function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  options: {
    className?: string;
    text?: string;
    attrs?: Record<string, string | boolean | null | undefined>;
    children?: Array<Node | null | undefined>;
  } = {},
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (options.className) node.className = options.className;
  if (options.text !== undefined) node.textContent = options.text;
  if (options.attrs) {
    for (const [key, value] of Object.entries(options.attrs)) {
      if (value === null || value === undefined || value === false) continue;
      if (value === true) {
        node.setAttribute(key, "");
      } else {
        node.setAttribute(key, value);
      }
    }
  }
  if (options.children) {
    for (const child of options.children) {
      if (child) node.appendChild(child);
    }
  }
  return node;
}

export function clearChildren(node: HTMLElement): void {
  while (node.firstChild) node.removeChild(node.firstChild);
}
