import { mountApp } from "./ui/App";

const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
document.documentElement.classList.toggle(
  "reduce-motion",
  prefersReduced.matches,
);
prefersReduced.addEventListener("change", (event) => {
  document.documentElement.classList.toggle("reduce-motion", event.matches);
});

const appRoot = document.querySelector<HTMLElement>("#app");
if (!appRoot) {
  throw new Error("Missing #app root");
}

mountApp(appRoot);
