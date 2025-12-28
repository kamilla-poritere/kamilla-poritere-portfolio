import { getCurrentLang, setLang, t, type Lang } from "../../modules/i18n";
import "./style.css";

interface NavLink {
  textKey: string;
  href: string;
  isExternal?: boolean;
}

const navLinks: NavLink[] = [
  { textKey: "header.nav.experience", href: "#experience-section" },
  { textKey: "header.nav.education", href: "#education-section" },
  { textKey: "header.nav.portfolio", href: "#portfolio-section" },
  { textKey: "header.nav.skills", href: "#skills-section" },
  { textKey: "header.nav.contact", href: "#contacts-block" },
];

const langOptions = [
  { value: "en", label: "EN" },
  { value: "ru", label: "RU" },
  { value: "lv", label: "LV" },
];

function createLogo(): HTMLAnchorElement {
  const logo = document.createElement("a");
  logo.href = "#";
  logo.className = "header__logo";
  logo.setAttribute("aria-label", "Home");
  logo.innerHTML = `
    <span class="header__logo-text">
      <span class="header__logo-first">K</span>
      <span class="header__logo-second">P</span>
    </span>
  `;
  return logo;
}

function createBrand(): HTMLDivElement {
  const brand = document.createElement("div");
  brand.className = "header__brand";
  brand.appendChild(createLogo());
  return brand;
}

function createNavItem(link: NavLink, index: number): HTMLLIElement {
  const li = document.createElement("li");
  li.className = "header__nav-item";
  li.style.animationDelay = `${index * 0.1}s`;

  const anchor = document.createElement("a");
  anchor.href = link.href;
  anchor.className = "header__nav-link";
  anchor.dataset.i18n = link.textKey;
  anchor.textContent = t(link.textKey);

  if (link.isExternal) {
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
  }

  li.appendChild(anchor);
  return li;
}

function createNavList(): HTMLUListElement {
  const navList = document.createElement("ul");
  navList.className = "header__nav-list";

  navLinks.forEach((link, index) => {
    navList.appendChild(createNavItem(link, index));
  });

  return navList;
}

function createNav(): HTMLElement {
  const nav = document.createElement("nav");
  nav.className = "header__nav";
  nav.setAttribute("aria-label", "Main navigation");
  nav.appendChild(createNavList());
  return nav;
}

function createLangTrigger(): HTMLButtonElement {
  const langTrigger = document.createElement("button");
  langTrigger.id = "lang-trigger";
  langTrigger.type = "button";
  langTrigger.className = "lang-trigger";
  langTrigger.setAttribute("aria-haspopup", "menu");
  langTrigger.setAttribute("aria-expanded", "false");
  langTrigger.setAttribute("aria-label", "Language selector");

  const langLabel = document.createElement("span");
  langLabel.className = "lang-trigger__label";
  langLabel.textContent = getCurrentLang().toUpperCase();

  const chevron = document.createElement("span");
  chevron.className = "lang-trigger__chevron";
  chevron.setAttribute("aria-hidden", "true");

  langTrigger.appendChild(langLabel);
  langTrigger.appendChild(chevron);

  return langTrigger;
}

function createLangTooltip(): HTMLDivElement {
  const langTooltip = document.createElement("div");
  langTooltip.className = "lang-tooltip";
  langTooltip.setAttribute("role", "menu");

  langOptions.forEach((opt) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "lang-option";
    btn.dataset.langOption = opt.value;
    btn.setAttribute("role", "menuitem");
    btn.textContent = opt.label;
    langTooltip.appendChild(btn);
  });

  return langTooltip;
}

function createLangDropdown(): HTMLDivElement {
  const langDropdown = document.createElement("div");
  langDropdown.className = "header__action header__action--lang";
  langDropdown.appendChild(createLangTrigger());
  langDropdown.appendChild(createLangTooltip());
  return langDropdown;
}

function createThemeBtn(): HTMLButtonElement {
  const themeBtn = document.createElement("button");
  themeBtn.id = "theme-toggle";
  themeBtn.className = "header__action header__action--theme";
  themeBtn.setAttribute("aria-label", t("header.themeToggle"));
  themeBtn.innerHTML = `
    <svg class="theme-icon theme-icon--sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
    <svg class="theme-icon theme-icon--moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  `;
  return themeBtn;
}

function createVersion(): HTMLSpanElement {
  const version = document.createElement("span");
  version.className = "header__action header__action--version";
  version.textContent = "v1.0";
  version.dataset.i18n = "header.version";
  version.setAttribute("title", t("header.version"));
  return version;
}

function createMenuToggle(): HTMLButtonElement {
  const menuToggle = document.createElement("button");
  menuToggle.className = "header__menu-toggle";
  menuToggle.setAttribute("aria-label", t("header.menuToggle"));
  menuToggle.innerHTML = `
    <span class="menu-toggle__line"></span>
    <span class="menu-toggle__line"></span>
    <span class="menu-toggle__line"></span>
  `;
  return menuToggle;
}

function createActions(): HTMLDivElement {
  const actions = document.createElement("div");
  actions.className = "header__actions";
  actions.appendChild(createLangDropdown());
  actions.appendChild(createThemeBtn());
  actions.appendChild(createVersion());
  actions.appendChild(createMenuToggle());
  return actions;
}

function createHeader(): HTMLElement {
  const header = document.createElement("header");
  header.className = "header";
  header.appendChild(createBrand());
  header.appendChild(createNav());
  header.appendChild(createActions());
  return header;
}

function setupLangMenu(
  wrapper: HTMLElement,
  trigger: HTMLButtonElement,
  tooltip: HTMLElement
): void {
  let isOpen = false;

  const setOpen = (state: boolean) => {
    isOpen = state;
    wrapper.classList.toggle("is-open", state);
    trigger.setAttribute("aria-expanded", state.toString());
  };

  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    setOpen(!isOpen);
  });

  tooltip.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("lang-option")) {
      const lang = target.dataset.langOption as Lang;
      if (lang) {
        setLang(lang);
        setOpen(false);
      }
    }
  });

  document.addEventListener("click", (e) => {
    if (!wrapper.contains(e.target as Node)) {
      setOpen(false);
    }
  });
}

function setupMobileMenu(nav: HTMLElement, toggle: HTMLButtonElement): void {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.classList.toggle("is-active", isOpen);
    toggle.setAttribute("aria-expanded", isOpen.toString());
  });

  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (target.closest(".header__nav-link")) {
      nav.classList.remove("is-open");
      toggle.classList.remove("is-active");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

function setupSmoothScroll(): void {
  document
    .querySelectorAll<HTMLAnchorElement>('a[href^="#"]')
    .forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        const href = anchor.getAttribute("href");
        if (!href || href === "#") return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        const headerOffset = 70;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      });
    });
}

function setupActiveLinks(): void {
  const sections = document.querySelectorAll<HTMLElement>(
    "#experience-section, #education-section, #portfolio-section, #skills-section, #contacts-block"
  );
  const navLinks =
    document.querySelectorAll<HTMLAnchorElement>(".header__nav-link");

  if (sections.length === 0 || navLinks.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -70% 0px",
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach((link) => {
          const isActive = link.getAttribute("href") === `#${id}`;
          link.classList.toggle("is-active", isActive);
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));
}

function renderHeader(): void {
  const container = document.querySelector<HTMLDivElement>("#header-layout");
  if (!container) return;

  const header = createHeader();
  container.innerHTML = "";
  container.appendChild(header);

  const langWrapper = header.querySelector<HTMLDivElement>(
    ".header__action--lang"
  );
  const langTrigger = header.querySelector<HTMLButtonElement>("#lang-trigger");
  const langTooltip = header.querySelector<HTMLDivElement>(".lang-tooltip");

  if (langWrapper && langTrigger && langTooltip) {
    setupLangMenu(langWrapper, langTrigger, langTooltip);
  }

  const nav = header.querySelector<HTMLElement>(".header__nav");
  const menuToggle = header.querySelector<HTMLButtonElement>(
    ".header__menu-toggle"
  );

  if (nav && menuToggle) {
    setupMobileMenu(nav, menuToggle);
  }

  setupSmoothScroll();
  setupActiveLinks();
}

renderHeader();
window.addEventListener("langchange", renderHeader);
