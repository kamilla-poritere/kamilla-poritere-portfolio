export type Lang = "en" | "ru" | "lv";

const STORAGE_KEY = "site.lang";
const FALLBACK_COMBINED_URL = new URL(
  "../translations/en.json",
  import.meta.url
).toString();

let current: Lang = (localStorage.getItem(STORAGE_KEY) as Lang) || "en";
let TRANSLATIONS: Record<string, string> = {};
const CACHE: Partial<Record<Lang, Record<string, string>>> = {};

function isCombinedPayload(
  obj: unknown
): obj is Record<string, Record<Lang, string>> {
  if (!obj || typeof obj !== "object") return false;
  const first = Object.values(obj as Record<string, unknown>)[0];
  return (
    !!first &&
    typeof first === "object" &&
    ("en" in (first as object) ||
      "ru" in (first as object) ||
      "lv" in (first as object))
  );
}

function normalizeCombined(
  payload: Record<string, Record<Lang, string>>,
  lang: Lang
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(payload)) {
    out[k] = v[lang] ?? v.en ?? k;
  }
  return out;
}

async function loadLang(lang: Lang): Promise<Record<string, string>> {
  if (CACHE[lang]) return CACHE[lang]!;
  // Try per-language file first
  const perLangUrl = new URL(
    `../translations/${lang}.json`,
    import.meta.url
  ).toString();

  const tryFetch = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to load ${url}`);
    return res.json();
  };

  try {
    const payload = await tryFetch(perLangUrl);
    if (isCombinedPayload(payload)) {
      CACHE[lang] = normalizeCombined(payload, lang);
    } else {
      CACHE[lang] = payload as Record<string, string>;
    }
  } catch {
    // Fallback to combined file if per-lang missing
    try {
      const payload = await tryFetch(FALLBACK_COMBINED_URL);
      if (isCombinedPayload(payload)) {
        CACHE[lang] = normalizeCombined(payload, lang);
      } else {
        CACHE[lang] = payload as Record<string, string>;
      }
    } catch (err) {
      console.warn("i18n: failed to load translations", err);
      CACHE[lang] = {};
    }
  }

  return CACHE[lang]!;
}

export function t(key: string): string {
  return TRANSLATIONS[key] ?? key;
}

function updateLangUI(lang: Lang) {
  const trigger = document.getElementById(
    "lang-trigger"
  ) as HTMLButtonElement | null;
  const label = trigger?.querySelector(
    ".lang-trigger__label"
  ) as HTMLElement | null;
  if (label) label.textContent = lang.toUpperCase();

  document
    .querySelectorAll<HTMLButtonElement>("[data-lang-option]")
    .forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.langOption === lang);
    });
}

export function getCurrentLang(): Lang {
  return current;
}

export function setLang(lang: Lang) {
  if (lang === current) return;
  loadLang(lang)
    .then((dict) => {
      current = lang;
      TRANSLATIONS = dict;
      localStorage.setItem(STORAGE_KEY, lang);
      updateLangUI(lang);
      translateDOM();
      window.dispatchEvent(new CustomEvent("langchange", { detail: { lang } }));
    })
    .catch((err) => console.warn("i18n: setLang failed", err));
}

export function translateDOM(root: ParentNode = document) {
  if (!TRANSLATIONS || Object.keys(TRANSLATIONS).length === 0) return;
  const els = Array.from((root as Element).querySelectorAll("[data-i18n]"));
  els.forEach((el) => {
    const key = el.getAttribute("data-i18n")!;
    const asHtml = el.getAttribute("data-i18n-html") === "true";
    if (asHtml) {
      (el as HTMLElement).innerHTML = t(key);
    } else {
      (el as HTMLElement).textContent = t(key);
    }
  });
}

export async function initI18n(opts?: { defaultLang?: Lang }) {
  const stored =
    (localStorage.getItem(STORAGE_KEY) as Lang) || opts?.defaultLang || current;
  current = stored;
  TRANSLATIONS = await loadLang(current);
  updateLangUI(current);
  translateDOM();
  return { t, setLang, translateDOM, getCurrentLang };
}

initI18n().catch(() => {});
