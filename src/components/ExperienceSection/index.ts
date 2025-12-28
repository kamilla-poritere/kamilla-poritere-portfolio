import { t } from "../../modules/i18n";
import "./style.css";

interface ExperienceItem {
  titleKey: string;
  companyKey: string;
  periodKey: string;
  locationKey?: string;
  typeKey: string;
  responsibilityKeys: string[];
  technologies?: string[];
}

const calendarIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`;
const locationIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`;
const briefcaseIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"></path></svg>`;

const experienceData: ExperienceItem[] = [
  {
    titleKey: "experience.items.0.title",
    companyKey: "experience.items.0.company",
    periodKey: "experience.items.0.period",
    typeKey: "experience.items.0.type",
    responsibilityKeys: [
      "experience.items.0.highlight.1",
      "experience.items.0.highlight.2",
      "experience.items.0.highlight.3",
      "experience.items.0.highlight.4",
      "experience.items.0.highlight.5",
    ],
    technologies: [
      "Frontend Development",
      "System Architecture",
      "Team Collaboration",
    ],
  },
  {
    titleKey: "experience.items.1.title",
    companyKey: "experience.items.1.company",
    periodKey: "experience.items.1.period",
    locationKey: "experience.items.1.location",
    typeKey: "experience.items.1.type",
    responsibilityKeys: [
      "experience.items.1.highlight.1",
      "experience.items.1.highlight.2",
      "experience.items.1.highlight.3",
      "experience.items.1.highlight.4",
      "experience.items.1.highlight.5",
      "experience.items.1.highlight.6",
      "experience.items.1.highlight.7",
    ],
    technologies: [
      "React",
      "TypeScript",
      "MobX",
      "PostCSS",
      "Storybook",
      "MacOs",
      "Windows",
    ],
  },
  {
    titleKey: "experience.items.2.title",
    companyKey: "experience.items.2.company",
    periodKey: "experience.items.2.period",
    typeKey: "experience.items.2.type",
    responsibilityKeys: [
      "experience.items.2.highlight.1",
      "experience.items.2.highlight.2",
      "experience.items.2.highlight.3",
      "experience.items.2.highlight.4",
      "experience.items.2.highlight.5",
    ],
    technologies: [
      "JavaScript",
      "TypeScript",
      "React",
      "Vue.js",
      "JQuery/PHP",
      "MacOs",
      "Windows",
    ],
  },
  {
    titleKey: "experience.items.3.title",
    companyKey: "experience.items.3.company",
    periodKey: "experience.items.3.period",
    locationKey: "experience.items.3.location",
    typeKey: "experience.items.3.type",
    responsibilityKeys: [
      "experience.items.3.highlight.1",
      "experience.items.3.highlight.2",
      "experience.items.3.highlight.3",
      "experience.items.3.highlight.4"
    ],
    technologies: [
      "JavaScript",
      "TypeScript",
      "React",
      "Vue.js",
      "Angular",
      "Node.js",
      "Ubuntu",
    ],
  },
  {
    titleKey: "experience.items.4.title",
    companyKey: "experience.items.4.company",
    periodKey: "experience.items.4.period",
    locationKey: "experience.items.4.location",
    typeKey: "experience.items.4.type",
    responsibilityKeys: [
      "experience.items.4.highlight.1",
      "experience.items.4.highlight.2",
      "experience.items.4.highlight.3",
    ],
    technologies: [
      "Vue.js",
      "Nuxt.js",
      "TypeScript",
      "JQuery/PHP",
      "Jest",
      "Cypress",
      "Git",
      "Docker",
      "CircleCI",
    ],
  },
];

function createTitle(): HTMLHeadingElement {
  const title = document.createElement("h2");
  title.className = "experience__title";
  title.dataset.i18n = "experience.title";
  title.textContent = t("experience.title");
  return title;
}

function createHeader(exp: ExperienceItem): HTMLDivElement {
  const header = document.createElement("div");
  header.className = "experience__header";

  const jobTitle = document.createElement("h3");
  jobTitle.className = "experience__job-title";
  jobTitle.dataset.i18n = exp.titleKey;
  jobTitle.textContent = t(exp.titleKey);

  const company = document.createElement("div");
  company.className = "experience__company";
  company.dataset.i18n = exp.companyKey;
  company.textContent = t(exp.companyKey);

  header.appendChild(jobTitle);
  header.appendChild(company);
  return header;
}

function createMetaItem(
  icon: string,
  textKey: string,
  className: string
): HTMLSpanElement {
  const wrapper = document.createElement("span");
  wrapper.className = className;

  const iconEl = document.createElement("span");
  iconEl.innerHTML = icon;
  iconEl.setAttribute("aria-hidden", "true");

  const textEl = document.createElement("span");
  textEl.dataset.i18n = textKey;
  textEl.textContent = t(textKey);

  wrapper.appendChild(iconEl);
  wrapper.appendChild(textEl);
  return wrapper;
}

function createMeta(exp: ExperienceItem): HTMLDivElement {
  const meta = document.createElement("div");
  meta.className = "experience__meta";

  meta.appendChild(
    createMetaItem(calendarIcon, exp.periodKey, "experience__period")
  );

  if (exp.locationKey) {
    meta.appendChild(
      createMetaItem(locationIcon, exp.locationKey, "experience__location")
    );
  }

  meta.appendChild(
    createMetaItem(briefcaseIcon, exp.typeKey, "experience__type")
  );

  return meta;
}

function createResponsibilities(exp: ExperienceItem): HTMLUListElement {
  const list = document.createElement("ul");
  list.className = "experience__responsibilities";

  exp.responsibilityKeys.forEach((key) => {
    const li = document.createElement("li");
    li.dataset.i18n = key;
    li.textContent = t(key);
    list.appendChild(li);
  });

  return list;
}

function createTechnologies(technologies?: string[]): HTMLDivElement | null {
  if (!technologies || technologies.length === 0) return null;

  const container = document.createElement("div");
  container.className = "experience__technologies";

  technologies.forEach((tech) => {
    const badge = document.createElement("span");
    badge.className = "experience__tech-badge";
    badge.textContent = tech;
    container.appendChild(badge);
  });

  return container;
}

function createItem(exp: ExperienceItem, index: number): HTMLDivElement {
  const item = document.createElement("div");
  item.className = "experience__item";
  item.setAttribute("data-index", String(index));

  item.appendChild(createHeader(exp));
  item.appendChild(createMeta(exp));
  item.appendChild(createResponsibilities(exp));

  const technologies = createTechnologies(exp.technologies);
  if (technologies) item.appendChild(technologies);

  return item;
}

function createTimeline(): HTMLDivElement {
  const timeline = document.createElement("div");
  timeline.className = "experience__timeline";

  experienceData.forEach((exp, index) => {
    timeline.appendChild(createItem(exp, index));
  });

  return timeline;
}

function setupLoadMore(
  timeline: HTMLDivElement,
  button: HTMLButtonElement
): void {
  const items = Array.from(
    timeline.querySelectorAll<HTMLElement>(".experience__item")
  );

  items.forEach((el, i) => {
    el.classList.remove("is-visible");
    if (i === 0) {
      el.classList.add("is-visible");
      el.style.display = "";
    } else {
      el.style.display = "none";
    }
  });

  button.addEventListener("click", () => {
    const next = items.find((el) => el.style.display === "none");
    if (!next) {
      button.style.display = "none";
      return;
    }

    next.style.display = "";
    requestAnimationFrame(() => {
      next.classList.remove("is-visible");
      void next.offsetWidth;
      next.classList.add("is-visible");
    });

    const remaining = items.filter((el) => el.style.display === "none").length;
    if (remaining === 0) {
      setTimeout(() => {
        button.style.display = "none";
      }, 500);
    }
  });
}

function renderExperienceSection(): void {
  const container = document.querySelector<HTMLDivElement>(
    "#experience-section"
  );
  if (!container) return;

  const section = document.createElement("section");
  section.className = "experience";

  const timeline = createTimeline();

  const loadMoreBtn = document.createElement("button");
  loadMoreBtn.className = "experience__btn";
  loadMoreBtn.type = "button";
  loadMoreBtn.dataset.i18n = "experience.loadMore";
  loadMoreBtn.textContent = t("experience.loadMore");

  section.appendChild(createTitle());
  section.appendChild(timeline);
  section.appendChild(loadMoreBtn);

  container.innerHTML = "";
  container.appendChild(section);

  setupLoadMore(timeline, loadMoreBtn);
}

let langBound = false;

function initExperienceSection(): void {
  renderExperienceSection();

  if (!langBound) {
    langBound = true;
    window.addEventListener("langchange", () => {
      renderExperienceSection();
    });
  }
}

initExperienceSection();
