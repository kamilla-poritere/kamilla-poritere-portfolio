import { t, getCurrentLang } from "../../modules/i18n";
import "./style.css";

type Fact = { id: string; text: string };

const SUN_FALLBACK_KEYS = [
  "funfacts.sun.fallback.1",
  "funfacts.sun.fallback.2",
  "funfacts.sun.fallback.3",
  "funfacts.sun.fallback.4",
  "funfacts.sun.fallback.5",
];

const MOON_FALLBACK_KEYS = [
  "funfacts.moon.fallback.1",
  "funfacts.moon.fallback.2",
  "funfacts.moon.fallback.3",
  "funfacts.moon.fallback.4",
  "funfacts.moon.fallback.5",
];

function createHeaderHTML(): string {
  return `
    <div class="funfacts__header">
      <h2 class="funfacts__title"></h2>
      <div class="funfacts__subtitle" data-i18n="funfacts.subtitle"></div>
    </div>
  `;
}

function createViewportHTML(): string {
  return `
    <div class="funfacts__viewport" tabindex="0">
      <div class="funfacts__loader">
        <div class="loader-spinner"></div>
        <div data-i18n="funfacts.loading"></div>
      </div>
    </div>
  `;
}

function createControlsHTML(): string {
  return `
    <div class="funfacts__controls">
      <button class="funfacts__btn prev" data-i18n-aria-label="funfacts.prevBtn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <div class="funfacts__dots"></div>
      <button class="funfacts__btn next" data-i18n-aria-label="funfacts.nextBtn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>
    <div class="funfacts__status" aria-hidden="true"></div>
  `;
}

function createSectionHTML(): string {
  return `
    <section class="funfacts">
      ${createHeaderHTML()}
      ${createViewportHTML()}
      ${createControlsHTML()}
    </section>
  `;
}

function getElements(container: HTMLElement) {
  return {
    titleEl: container.querySelector<HTMLElement>(".funfacts__title")!,
    subtitleEl: container.querySelector<HTMLElement>(".funfacts__subtitle")!,
    loaderTextEl: container.querySelector<HTMLElement>(
      ".funfacts__loader div:last-child"
    )!,
    viewport: container.querySelector<HTMLElement>(".funfacts__viewport")!,
    statusEl: container.querySelector<HTMLElement>(".funfacts__status")!,
    dotsContainer: container.querySelector<HTMLElement>(".funfacts__dots")!,
    btnNext: container.querySelector<HTMLButtonElement>(".funfacts__btn.next")!,
    btnPrev: container.querySelector<HTMLButtonElement>(".funfacts__btn.prev")!,
  };
}

function escapeHtml(str: string): string {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getFallbackFacts(isMoon: boolean): Fact[] {
  const keys = isMoon ? MOON_FALLBACK_KEYS : SUN_FALLBACK_KEYS;
  return keys.map((key, i) => ({
    id: `fb${i}`,
    text: t(key),
  }));
}

async function fetchWithTimeout(url: string, ms = 6000): Promise<any> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ms);
  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(id);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(id);
  }
}

function extractFactsFromWiki(json: any): Fact[] {
  if (!json || typeof json.extract !== "string") return [];
  const sents = json.extract
    .split(/(?<=\.)\s+/)
    .map((s: string) => s.trim())
    .filter((s: string) => s.length > 20)
    .slice(0, 6);
  return sents.map((text: string, i: number) => ({ id: `w${i}`, text }));
}

function updateStaticTexts(
  subtitleEl: HTMLElement,
  loaderTextEl: HTMLElement,
  btnPrev: HTMLButtonElement,
  btnNext: HTMLButtonElement
): void {
  subtitleEl.textContent = t("funfacts.subtitle");
  loaderTextEl.textContent = t("funfacts.loading");
  btnPrev.setAttribute("aria-label", t("funfacts.prevBtn"));
  btnNext.setAttribute("aria-label", t("funfacts.nextBtn"));
}

function renderFactItems(viewport: HTMLElement, facts: Fact[]): HTMLElement {
  viewport.innerHTML = `<div class="funfacts__list"></div>`;
  const list = viewport.querySelector<HTMLElement>(".funfacts__list")!;

  list.innerHTML = facts
    .map(
      (f, i) => `
      <div class="funfact" data-id="${f.id}" aria-hidden="${
        i === 0 ? "false" : "true"
      }">
        ${escapeHtml(f.text)}
      </div>`
    )
    .join("");

  const first = list.querySelector<HTMLElement>(".funfact");
  if (first) {
    requestAnimationFrame(() => {
      const h = first.offsetHeight;
      if (h) viewport.style.minHeight = `${h + 20}px`;
    });
  }

  return list;
}

function renderDots(dotsContainer: HTMLElement, count: number): void {
  dotsContainer.innerHTML = Array.from({ length: count })
    .map(
      (_, i) =>
        `<div class="funfacts__dot ${i === 0 ? "is-active" : ""}"></div>`
    )
    .join("");
}

function updateTitle(titleEl: HTMLElement, isMoon: boolean): void {
  const emoji = isMoon ? "🌙" : "☀️";
  const titleKey = isMoon ? "funfacts.moon.title" : "funfacts.sun.title";
  titleEl.textContent = `${t(titleKey)} ${emoji}`;
  titleEl.style.color = isMoon ? "var(--primary)" : "var(--accent-red)";
}

function initCarouselControls(
  listEl: HTMLElement,
  dotsContainer: HTMLElement,
  statusEl: HTMLElement,
  btnNext: HTMLButtonElement,
  btnPrev: HTMLButtonElement,
  viewport: HTMLElement
): void {
  const items = Array.from(listEl.querySelectorAll<HTMLElement>(".funfact"));
  if (items.length === 0) return;

  let currentIndex = 0;
  let autoId: number | null = null;

  function updateDots(idx: number): void {
    const dots = Array.from(
      dotsContainer.querySelectorAll<HTMLElement>(".funfacts__dot")
    );
    dots.forEach((dot, i) => {
      if (i === idx) {
        dot.classList.add("is-active");
      } else {
        dot.classList.remove("is-active");
      }
    });
  }

  function showIndex(idx: number): void {
    idx = ((idx % items.length) + items.length) % items.length;
    items.forEach((el, i) => {
      if (i === idx) {
        el.classList.add("is-visible");
        el.setAttribute("aria-hidden", "false");
      } else {
        el.classList.remove("is-visible");
        el.setAttribute("aria-hidden", "true");
      }
    });
    updateDots(idx);
    currentIndex = idx;
    statusEl.textContent = `${idx + 1} ${t("funfacts.of")} ${items.length}`;
  }

  function startAutoRotate(): void {
    stopAutoRotate();
    autoId = window.setInterval(() => {
      showIndex(currentIndex + 1);
    }, 5000);
  }

  function stopAutoRotate(): void {
    if (autoId != null) {
      clearInterval(autoId);
      autoId = null;
    }
  }

  items.forEach((el, i) => {
    el.classList.toggle("is-visible", i === 0);
    el.setAttribute("aria-hidden", i === 0 ? "false" : "true");
  });
  updateDots(0);
  statusEl.textContent = `1 ${t("funfacts.of")} ${items.length}`;

  btnNext.addEventListener("click", (e) => {
    e.preventDefault();
    stopAutoRotate();
    showIndex(currentIndex + 1);
    startAutoRotate();
  });

  btnPrev.addEventListener("click", (e) => {
    e.preventDefault();
    stopAutoRotate();
    showIndex(currentIndex - 1);
    startAutoRotate();
  });

  viewport.addEventListener("mouseenter", stopAutoRotate);
  viewport.addEventListener("mouseleave", startAutoRotate);

  viewport.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      btnNext.click();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      btnPrev.click();
    }
  });

  startAutoRotate();
}

function initFunfacts(): void {
  const container = document.querySelector<HTMLElement>("#funfacts-section");
  if (!container) {
    console.warn("No #funfacts-section found");
    return;
  }

  container.innerHTML = createSectionHTML();
  const els = getElements(container);

  updateStaticTexts(els.subtitleEl, els.loaderTextEl, els.btnPrev, els.btnNext);

  async function loadFacts(): Promise<void> {
    const isDark =
      document.documentElement.getAttribute("data-theme") === "dark" ||
      !document.documentElement.getAttribute("data-theme");
    const isMoon = isDark;
    const query = isMoon ? "Moon" : "Sun";

    try {
      const lang = getCurrentLang();
      const subdomain = lang === "en" ? "en" : lang;
      const url = `https://${subdomain}.wikipedia.org/api/rest_v1/page/summary/${query}`;
      const data = await fetchWithTimeout(url);
      const facts = extractFactsFromWiki(data);
      const factsToShow = facts.length > 0 ? facts : getFallbackFacts(isMoon);

      const list = renderFactItems(els.viewport, factsToShow);
      renderDots(els.dotsContainer, factsToShow.length);
      updateTitle(els.titleEl, isMoon);
      initCarouselControls(
        list,
        els.dotsContainer,
        els.statusEl,
        els.btnNext,
        els.btnPrev,
        els.viewport
      );
    } catch (err) {
      console.error("Failed to load facts:", err);
      const fallbackFacts = getFallbackFacts(isMoon);
      const list = renderFactItems(els.viewport, fallbackFacts);
      renderDots(els.dotsContainer, fallbackFacts.length);
      updateTitle(els.titleEl, isMoon);
      initCarouselControls(
        list,
        els.dotsContainer,
        els.statusEl,
        els.btnNext,
        els.btnPrev,
        els.viewport
      );
    }
  }

  loadFacts();

  const observer = new MutationObserver(() => {
    loadFacts();
  });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });

  window.addEventListener("langchange", () => {
    loadFacts();
  });
}

initFunfacts();
