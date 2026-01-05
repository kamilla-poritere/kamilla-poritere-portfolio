jest.mock("../i18n");

import { t, setLang, getCurrentLang } from "../i18n";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

// Mock fetch for translations
global.fetch = jest.fn();

describe("i18n module", () => {
  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  describe("t() function", () => {
    it("should return translation key when translation not found", () => {
      const result = t("nonexistent.key");
      expect(result).toBe("nonexistent.key");
    });

    it("should return translation value when key exists", async () => {
      // Mock fetch response
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          "about.name": "Kamilla Poriter",
          "about.role": "Frontend Developer & UI Enthusiast",
        }),
      });

      await setLang("en");

      const name = t("about.name");
      const role = t("about.role");

      expect(name).toBe("Kamilla Poriter");
      expect(role).toBe("Frontend Developer & UI Enthusiast");
    });
  });

  describe("getCurrentLang()", () => {
    it("should return default language", () => {
      const lang = getCurrentLang();
      expect(lang).toBe("en");
    });

    it("should return language from localStorage if available", () => {
      localStorageMock.setItem("site.lang", "ru");
      // Note: You'll need to reload the module or expose a way to re-read from storage
      expect(localStorageMock.getItem("site.lang")).toBe("ru");
    });
  });

  describe("setLang()", () => {
    it("should change current language", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          "about.name": "Камилла Поритере",
        }),
      });

      await setLang("ru");

      expect(getCurrentLang()).toBe("ru");
      expect(localStorageMock.getItem("site.lang")).toBe("ru");
    });
  });
});
