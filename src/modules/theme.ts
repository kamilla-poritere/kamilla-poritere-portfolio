const STORAGE_KEY = "site.theme";

function getStored() {
  return localStorage.getItem(STORAGE_KEY) as "light" | "dark" | null;
}

function detectPref(): "light" | "dark" {
  return window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

export function applyTheme(t: "light" | "dark") {
  document.documentElement.setAttribute(
    "data-theme",
    t === "light" ? "light" : ""
  );
  updateThemeButton(t);
}

function updateThemeButton(t: "light" | "dark") {
  const btn = document.getElementById(
    "theme-toggle"
  ) as HTMLButtonElement | null;
  if (!btn) return;

  btn.setAttribute(
    "aria-label",
    t === "light" ? "Switch to dark mode" : "Switch to light mode"
  );
  btn.classList.toggle("is-light", t === "light");
  btn.classList.toggle("is-dark", t === "dark");

  // Force repaint on iOS
  const sunIcon = btn.querySelector(".theme-icon--sun") as SVGElement | null;
  const moonIcon = btn.querySelector(".theme-icon--moon") as SVGElement | null;
  if (sunIcon) {
    sunIcon.style.opacity = t === "light" ? "1" : "0";
    sunIcon.style.transform =
      t === "light" ? "rotate(0) scale(1)" : "rotate(180deg) scale(0)";
  }
  if (moonIcon) {
    moonIcon.style.opacity = t === "dark" ? "1" : "0";
    moonIcon.style.transform =
      t === "dark" ? "rotate(0) scale(1)" : "rotate(-180deg) scale(0)";
  }
}

function saveTheme(t: "light" | "dark") {
  localStorage.setItem(STORAGE_KEY, t);
}

function toggleTheme() {
  const current =
    document.documentElement.getAttribute("data-theme") === "light"
      ? "light"
      : "dark";
  const next = current === "light" ? "dark" : "light";
  saveTheme(next);
  applyTheme(next);
}

export function initTheme() {
  const stored = getStored();
  const initial = stored ?? detectPref();
  applyTheme(initial);

  // Use MutationObserver to wait for theme button to be added to DOM
  const observer = new MutationObserver(() => {
    const btn = document.getElementById(
      "theme-toggle"
    ) as HTMLButtonElement | null;
    if (btn && !btn.hasAttribute("data-theme-listener")) {
      btn.setAttribute("data-theme-listener", "true");
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        toggleTheme();
      });
      updateThemeButton(initial);
      observer.disconnect();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

// auto-run
initTheme();
