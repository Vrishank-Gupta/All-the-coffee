import { useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

// Must match the key and colours used by the inline script in index.html,
// which applies the saved theme before React loads so the page never flashes.
// The data-theme attribute on <html> is the single source of truth, so every
// toggle on the page stays in sync.
const THEME_KEY = "atc-theme";
const THEME_COLOR: Record<Theme, string> = { light: "#241711", dark: "#22272e" };
const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

function hasStoredTheme() {
  try {
    const value = localStorage.getItem(THEME_KEY);
    return value === "light" || value === "dark";
  } catch {
    return false;
  }
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLOR[theme]);
}

// Follow the OS setting until the visitor picks a theme themselves.
darkQuery.addEventListener("change", (e) => {
  if (!hasStoredTheme()) applyTheme(e.matches ? "dark" : "light");
});

function readTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, readTheme);

  function toggleTheme() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // Storage blocked (private browsing); the choice still applies for this visit.
    }
    applyTheme(next);
  }

  return { theme, toggleTheme };
}
