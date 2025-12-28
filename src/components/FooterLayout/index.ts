import { t } from "../../modules/i18n";
import "./style.css";

interface SocialLink {
  nameKey: string;
  url: string;
  icon: string;
}

interface FooterLink {
  textKey: string;
  href: string;
}

const socialLinks: SocialLink[] = [
  {
    nameKey: "footer.social.github",
    url: "https://github.com/kamilla-poritere",
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`,
  },
  {
    nameKey: "footer.social.linkedin",
    url: "https://linkedin.com/in/kamilla-poritere-177721198",
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path></svg>`,
  },
  {
    nameKey: "footer.social.email",
    url: "mailto:kamilla.poriter@gmail.com",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`,
  },
];

const quickLinks: FooterLink[] = [
  { textKey: "footer.links.about", href: "#about-section" },
  { textKey: "footer.links.experience", href: "#experience-section" },
  { textKey: "footer.links.portfolio", href: "#portfolio-section" },
  { textKey: "footer.links.contact", href: "#contacts-block" },
];

function createLogo(): HTMLDivElement {
  const logo = document.createElement("div");
  logo.className = "footer__logo";
  logo.innerHTML = `
    <span class="footer__logo-text">
      <span class="footer__logo-first">Kamilla</span>
      <span class="footer__logo-second">Poritere</span>
    </span>
  `;
  return logo;
}

function createTagline(): HTMLParagraphElement {
  const tagline = document.createElement("p");
  tagline.className = "footer__tagline";
  tagline.dataset.i18n = "footer.tagline";
  tagline.textContent = t("footer.tagline");
  return tagline;
}

function createBrandSection(): HTMLDivElement {
  const brandSection = document.createElement("div");
  brandSection.className = "footer__section footer__brand";
  brandSection.appendChild(createLogo());
  brandSection.appendChild(createTagline());
  return brandSection;
}

function setupSmoothScroll(anchor: HTMLAnchorElement): void {
  anchor.addEventListener("click", (e) => {
    const href = anchor.getAttribute("href");
    if (!href || href === "#") return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    const headerOffset = 70;
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  });
}

function createLinksList(): HTMLUListElement {
  const linksList = document.createElement("ul");
  linksList.className = "footer__links-list";

  quickLinks.forEach((link) => {
    const li = document.createElement("li");
    const anchor = document.createElement("a");
    anchor.href = link.href;
    anchor.className = "footer__link";
    anchor.dataset.i18n = link.textKey;
    anchor.textContent = t(link.textKey);

    setupSmoothScroll(anchor);

    li.appendChild(anchor);
    linksList.appendChild(li);
  });

  return linksList;
}

function createLinksTitle(): HTMLHeadingElement {
  const linksTitle = document.createElement("h3");
  linksTitle.className = "footer__section-title";
  linksTitle.dataset.i18n = "footer.quickLinks";
  linksTitle.textContent = t("footer.quickLinks");
  return linksTitle;
}

function createLinksSection(): HTMLDivElement {
  const linksSection = document.createElement("div");
  linksSection.className = "footer__section footer__links";
  linksSection.appendChild(createLinksTitle());
  linksSection.appendChild(createLinksList());
  return linksSection;
}

function createSocialList(): HTMLDivElement {
  const socialList = document.createElement("div");
  socialList.className = "footer__social-list";

  socialLinks.forEach((social) => {
    const link = document.createElement("a");
    link.href = social.url;
    link.className = "footer__social-link";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", t(social.nameKey));
    link.innerHTML = social.icon;
    socialList.appendChild(link);
  });

  return socialList;
}

function createSocialTitle(): HTMLHeadingElement {
  const socialTitle = document.createElement("h3");
  socialTitle.className = "footer__section-title";
  socialTitle.dataset.i18n = "footer.connect";
  socialTitle.textContent = t("footer.connect");
  return socialTitle;
}

function createSocialSection(): HTMLDivElement {
  const socialSection = document.createElement("div");
  socialSection.className = "footer__section footer__social";
  socialSection.appendChild(createSocialTitle());
  socialSection.appendChild(createSocialList());
  return socialSection;
}

function createCopyright(): HTMLParagraphElement {
  const copyright = document.createElement("p");
  copyright.className = "footer__copyright";
  copyright.dataset.i18n = "footer.copyright";
  copyright.dataset.i18nHtml = "true";
  const currentYear = new Date().getFullYear();
  const copyrightText = t("footer.copyright").replace(
    "{year}",
    currentYear.toString()
  );
  copyright.innerHTML = copyrightText;
  return copyright;
}

function createMadeWith(): HTMLParagraphElement {
  const madeWith = document.createElement("p");
  madeWith.className = "footer__made-with";
  madeWith.dataset.i18n = "footer.madeWith";
  madeWith.dataset.i18nHtml = "true";
  madeWith.innerHTML = t("footer.madeWith");
  return madeWith;
}

function createFooterBottom(): HTMLDivElement {
  const bottom = document.createElement("div");
  bottom.className = "footer__bottom";
  bottom.appendChild(createCopyright());
  bottom.appendChild(createMadeWith());
  return bottom;
}

function createFooterContent(): HTMLDivElement {
  const content = document.createElement("div");
  content.className = "footer__content";
  content.appendChild(createBrandSection());
  content.appendChild(createLinksSection());
  content.appendChild(createSocialSection());
  return content;
}

function renderFooter(): void {
  const container = document.querySelector<HTMLDivElement>("#footer-layout");
  if (!container) return;

  const footer = document.createElement("footer");
  footer.className = "footer";
  footer.appendChild(createFooterContent());
  footer.appendChild(createFooterBottom());

  container.innerHTML = "";
  container.appendChild(footer);
}

renderFooter();
window.addEventListener("langchange", renderFooter);
