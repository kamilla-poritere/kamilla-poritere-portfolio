import { t } from "../../modules/i18n";
import "./style.css";

const aboutData = {
  greetingKey: "about.greeting",
  nameKey: "about.name",
  roleKey: "about.role",
  descriptionKeys: ["about.description.1", "about.description.2"],
  highlightKeys: [
    "about.highlight.1",
    "about.highlight.2",
    "about.highlight.3",
    "about.highlight.4",
  ],
};

function createGreeting() {
  const greeting = document.createElement("div");
  greeting.className = "about__greeting";
  greeting.dataset.i18n = aboutData.greetingKey;
  greeting.textContent = t(aboutData.greetingKey);

  return greeting;
}

function createName() {
  const name = document.createElement("h1");
  name.className = "about__name";
  name.dataset.i18n = aboutData.nameKey;
  name.textContent = t(aboutData.nameKey);
  return name;
}

function createRole() {
  const role = document.createElement("h2");
  role.className = "about__role";
  role.dataset.i18n = aboutData.roleKey;
  role.textContent = t(aboutData.roleKey);
  return role;
}

function createDescriptionContainer() {
  const container = document.createElement("div");
  container.className = "about__description";
  aboutData.descriptionKeys.forEach((key, index) => {
    const p = document.createElement("p");
    p.dataset.i18n = key;
    p.textContent = t(key);
    p.style.animationDelay = `${0.2 + index * 0.1}s`;
    container.appendChild(p);
  });
  return container;
}

function createHighlightsContainer() {
  const container = document.createElement("div");
  container.className = "about__highlights";
  aboutData.highlightKeys.forEach((key, index) => {
    const item = document.createElement("div");
    item.className = "about__highlight-item";
    item.dataset.i18n = key;
    item.textContent = t(key);
    item.style.animationDelay = `${0.4 + index * 0.1}s`;
    container.appendChild(item);
  });
  return container;
}

function renderAboutSection() {
  const container = document.querySelector<HTMLDivElement>("#about-section");
  if (!container) return;

  const section = document.createElement("section");
  section.className = "about";

  section.appendChild(createGreeting());
  section.appendChild(createName());
  section.appendChild(createRole());
  section.appendChild(createDescriptionContainer());
  section.appendChild(createHighlightsContainer());

  container.innerHTML = "";
  container.appendChild(section);
}

renderAboutSection();
