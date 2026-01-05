export type Lang = "en" | "ru" | "lv";

let currentLang: Lang = "en";
let translations: Record<string, string> = {};

export function t(key: string): string {
  return translations[key] ?? key;
}

export function getCurrentLang(): Lang {
  return currentLang;
}

export async function setLang(lang: Lang): Promise<void> {
  currentLang = lang;
  localStorage.setItem("site.lang", lang);

  // Simulate fetch
  const response = await fetch(`/translations/${lang}.json`);
  if (response.ok) {
    translations = await response.json();
  }
}

export function translateDOM(_root?: ParentNode): void {
  // Mock implementation - does nothing
}

export async function initI18n(opts?: { defaultLang?: Lang }) {
  currentLang = opts?.defaultLang || "en";
  return { t, setLang, translateDOM, getCurrentLang };
}
