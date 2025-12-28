import { t } from "../../modules/i18n";
import "./style.css";

interface HobbyItem {
  nameKey: string;
  descriptionKey: string;
  icon: string;
  color: string;
}

const hobbies: HobbyItem[] = [
  {
    nameKey: "hobbies.items.0.name",
    descriptionKey: "hobbies.items.0.description",
    color: "var(--primary)",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="16 18 22 12 16 6"></polyline>
      <polyline points="8 6 2 12 8 18"></polyline>
    </svg>`,
  },
  {
    nameKey: "hobbies.items.1.name",
    descriptionKey: "hobbies.items.1.description",
    color: "var(--accent-purple)",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
      <path d="M2 2l7.586 7.586"></path>
      <circle cx="11" cy="11" r="2"></circle>
    </svg>`,
  },
  {
    nameKey: "hobbies.items.2.name",
    descriptionKey: "hobbies.items.2.description",
    color: "var(--accent-green)",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
      <circle cx="12" cy="13" r="4"></circle>
    </svg>`,
  },
  {
    nameKey: "hobbies.items.3.name",
    descriptionKey: "hobbies.items.3.description",
    color: "var(--accent-red)",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M9 18V5l12-2v13"></path>
      <circle cx="6" cy="18" r="3"></circle>
      <circle cx="18" cy="16" r="3"></circle>
    </svg>`,
  },
  {
    nameKey: "hobbies.items.4.name",
    descriptionKey: "hobbies.items.4.description",
    color: "var(--primary)",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
    </svg>`,
  },
  {
    nameKey: "hobbies.items.5.name",
    descriptionKey: "hobbies.items.5.description",
    color: "var(--accent-purple)",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="6" y1="11" x2="10" y2="11"></line>
      <line x1="8" y1="9" x2="8" y2="13"></line>
      <line x1="15" y1="12" x2="15.01" y2="12"></line>
      <line x1="18" y1="10" x2="18.01" y2="10"></line>
      <path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"></path>
    </svg>`,
  },
  {
    nameKey: "hobbies.items.6.name",
    descriptionKey: "hobbies.items.6.description",
    color: "var(--accent-green)",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>`,
  },
  {
    nameKey: "hobbies.items.7.name",
    descriptionKey: "hobbies.items.7.description",
    color: "var(--accent-red)",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
    </svg>`,
  },
];

function createTitle(): HTMLHeadingElement {
  const title = document.createElement("h2");
  title.className = "hobbies__title";
  title.id = "hobbies-title";
  title.dataset.i18n = "hobbies.title";
  title.textContent = t("hobbies.title");
  return title;
}

function createSubtitle(): HTMLParagraphElement {
  const subtitle = document.createElement("p");
  subtitle.className = "hobbies__subtitle";
  subtitle.dataset.i18n = "hobbies.subtitle";
  subtitle.textContent = t("hobbies.subtitle");
  return subtitle;
}

function createIconWrapper(hobby: HobbyItem): HTMLDivElement {
  const iconWrapper = document.createElement("div");
  iconWrapper.className = "hobby-card__icon";
  iconWrapper.style.setProperty("--hobby-color", hobby.color);
  iconWrapper.innerHTML = hobby.icon;
  return iconWrapper;
}

function createCardContent(hobby: HobbyItem): HTMLDivElement {
  const content = document.createElement("div");
  content.className = "hobby-card__content";

  const name = document.createElement("h3");
  name.className = "hobby-card__name";
  name.dataset.i18n = hobby.nameKey;
  name.textContent = t(hobby.nameKey);

  const description = document.createElement("p");
  description.className = "hobby-card__description";
  description.dataset.i18n = hobby.descriptionKey;
  description.textContent = t(hobby.descriptionKey);

  content.appendChild(name);
  content.appendChild(description);
  return content;
}

function createCard(hobby: HobbyItem, index: number): HTMLDivElement {
  const card = document.createElement("div");
  card.className = "hobby-card";
  card.style.animationDelay = `${index * 0.1}s`;
  card.setAttribute("role", "listitem");
  card.setAttribute("aria-label", t(hobby.nameKey));

  card.appendChild(createIconWrapper(hobby));
  card.appendChild(createCardContent(hobby));
  return card;
}

function createGrid(): HTMLDivElement {
  const grid = document.createElement("div");
  grid.className = "hobbies__grid";
  grid.setAttribute("role", "list");

  hobbies.forEach((hobby, index) => {
    grid.appendChild(createCard(hobby, index));
  });

  return grid;
}

function createSection(): HTMLElement {
  const section = document.createElement("section");
  section.className = "hobbies";
  section.setAttribute("aria-labelledby", "hobbies-title");

  section.appendChild(createTitle());
  section.appendChild(createSubtitle());
  section.appendChild(createGrid());

  return section;
}

let langBound = false;

function renderHobbiesSection(): void {
  const container = document.querySelector<HTMLDivElement>("#hobbies-section");
  if (!container) return;

  container.innerHTML = "";
  container.appendChild(createSection());

  if (!langBound) {
    langBound = true;
    window.addEventListener("langchange", () => {
      // Re-render to refresh i18n content
      renderHobbiesSection();
    });
  }
}

renderHobbiesSection();
