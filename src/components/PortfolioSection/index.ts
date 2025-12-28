import { t } from "../../modules/i18n";
import "./style.css";

interface ProjectItem {
  titleKey: string;
  descriptionKey: string;
  technologies: string[];
  imageUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  color: string;
}

const projects: ProjectItem[] = [
  {
    titleKey: "portfolio.items.0.title",
    descriptionKey: "portfolio.items.0.description",
    technologies: ["Vue.js", "Nuxt.js", "Node.js", "MongoDB", "Docker"],
    color: "var(--primary)",
    demoUrl: "https://www.lumify.se/",
  },
  {
    titleKey: "portfolio.items.1.title",
    descriptionKey: "portfolio.items.1.description",
    technologies: [
      "JQuery",
      "JS",
      "Tailwind CSS",
      "PHP",
      "Bootstrap",
      "Vue.js",
      "Nuxt.js",
    ],
    color: "var(--accent-green)",
  },
  {
    titleKey: "portfolio.items.2.title",
    descriptionKey: "portfolio.items.2.description",
    technologies: ["React", "MobX", "TypeScript", "Storybook"],
    color: "var(--accent-purple)",
    demoUrl:
      "https://www.livecasinocomparer.com/live-casino-software/on-air-entertainment/",
  },
  {
    titleKey: "portfolio.items.3.title",
    descriptionKey: "portfolio.items.3.description",
    technologies: ["TypeScript", "Vite", "CSS3"],
    color: "var(--accent-red)",
    githubUrl: "https://github.com/username/project",
  },
];

function createTitle(): HTMLHeadingElement {
  const title = document.createElement("h2");
  title.className = "portfolio__title";
  title.dataset.i18n = "portfolio.title";
  title.textContent = t("portfolio.title");
  return title;
}

function createSubtitle(): HTMLParagraphElement {
  const subtitle = document.createElement("p");
  subtitle.className = "portfolio__subtitle";
  subtitle.dataset.i18n = "portfolio.subtitle";
  subtitle.textContent = t("portfolio.subtitle");
  return subtitle;
}

function createGrid(): HTMLDivElement {
  const grid = document.createElement("div");
  grid.className = "portfolio__grid";
  return grid;
}

function createHeader(): HTMLDivElement {
  const header = document.createElement("div");
  header.className = "portfolio-card__header";
  return header;
}

function createTechBadge(label: string): HTMLSpanElement {
  const badge = document.createElement("span");
  badge.className = "portfolio-card__tech-badge";
  badge.textContent = label;
  return badge;
}

function createTechList(techs: string[]): HTMLDivElement {
  const container = document.createElement("div");
  container.className = "portfolio-card__technologies";
  techs.forEach((t) => container.appendChild(createTechBadge(t)));
  return container;
}

function createBody(project: ProjectItem): HTMLDivElement {
  const body = document.createElement("div");
  body.className = "portfolio-card__body";

  const projectTitle = document.createElement("h3");
  projectTitle.className = "portfolio-card__title";
  projectTitle.dataset.i18n = project.titleKey;
  projectTitle.textContent = t(project.titleKey);

  const description = document.createElement("p");
  description.className = "portfolio-card__description";
  description.dataset.i18n = project.descriptionKey;
  description.textContent = t(project.descriptionKey);

  const techs = createTechList(project.technologies);

  body.appendChild(projectTitle);
  body.appendChild(description);
  body.appendChild(techs);
  return body;
}

function createLink(href: string, kind: "demo" | "github"): HTMLAnchorElement {
  const a = document.createElement("a");
  a.href = href;
  a.target = "_blank";
  a.rel = "noopener noreferrer external";
  a.className =
    kind === "demo"
      ? "portfolio-card__link portfolio-card__link--demo"
      : "portfolio-card__link portfolio-card__link--github";
  if (kind === "demo") {
    a.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
        <polyline points="15 3 21 3 21 9"></polyline>
        <line x1="10" y1="14" x2="21" y2="3"></line>
      </svg>
      <span data-i18n="portfolio.liveDemo">${t("portfolio.liveDemo")}</span>
    `;
    a.setAttribute("aria-label", t("portfolio.liveDemo"));
  } else {
    a.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
      <span data-i18n="portfolio.code">${t("portfolio.code")}</span>
    `;
    a.setAttribute("aria-label", t("portfolio.code"));
  }
  return a;
}

function createFooter(project: ProjectItem): HTMLDivElement {
  const footer = document.createElement("div");
  footer.className = "portfolio-card__footer";
  if (project.demoUrl) footer.appendChild(createLink(project.demoUrl, "demo"));
  if (project.githubUrl)
    footer.appendChild(createLink(project.githubUrl, "github"));
  return footer;
}

function createCard(project: ProjectItem, index: number): HTMLDivElement {
  const card = document.createElement("div");
  card.className = `portfolio-card ${
    project.featured ? "portfolio-card--featured" : ""
  }`;
  card.style.animationDelay = `${index * 0.1}s`;
  card.setAttribute("role", "article");

  const header = createHeader();
  const body = createBody(project);
  const footer = createFooter(project);

  card.appendChild(header);
  card.appendChild(body);
  card.appendChild(footer);
  return card;
}

function createSection(): HTMLElement {
  const section = document.createElement("section");
  section.className = "portfolio";
  section.appendChild(createTitle());
  section.appendChild(createSubtitle());
  section.appendChild(createGrid());
  return section;
}

let langBound = false;

function renderPortfolioSection() {
  const container =
    document.querySelector<HTMLDivElement>("#portfolio-section");
  if (!container) return;

  const section = createSection();
  const grid = section.querySelector<HTMLDivElement>(".portfolio__grid")!;
  projects.forEach((p, i) => grid.appendChild(createCard(p, i)));

  container.innerHTML = "";
  container.appendChild(section);

  if (!langBound) {
    langBound = true;
    window.addEventListener("langchange", () => {
      renderPortfolioSection();
    });
  }
}

renderPortfolioSection();
