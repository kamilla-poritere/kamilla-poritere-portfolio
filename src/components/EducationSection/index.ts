import { t } from "../../modules/i18n";
import "./style.css";

interface EducationItem {
  degreeKey: string;
  schoolKey: string;
  periodKey: string;
  locationKey?: string;
  descriptionKey: string;
  achievementKeys?: string[];
}

const calendarIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`;
const locationIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`;

const educationData: EducationItem[] = [
  {
    degreeKey: "education.items.0.degree",
    schoolKey: "education.items.0.school",
    periodKey: "education.items.0.period",
    locationKey: "education.items.0.location",
    descriptionKey: "education.items.0.description",
    achievementKeys: [
      "education.items.0.achievement.1",
      "education.items.0.achievement.2",
      "education.items.0.achievement.3",
    ],
  },
  {
    degreeKey: "education.items.1.degree",
    schoolKey: "education.items.1.school",
    periodKey: "education.items.1.period",
    descriptionKey: "education.items.1.description",
    achievementKeys: [
      "education.items.1.achievement.1",
      "education.items.1.achievement.2",
      "education.items.1.achievement.3",
    ],
  },
  {
    degreeKey: "education.items.2.degree",
    schoolKey: "education.items.2.school",
    periodKey: "education.items.2.period",
    descriptionKey: "education.items.2.description",
    achievementKeys: [
      "education.items.2.achievement.1",
      "education.items.2.achievement.2",
    ],
  },
  {
    degreeKey: "education.items.3.degree",
    schoolKey: "education.items.3.school",
    periodKey: "education.items.3.period",
    locationKey: "education.items.3.location",
    descriptionKey: "education.items.3.description",
  },
  {
    degreeKey: "education.items.4.degree",
    schoolKey: "education.items.4.school",
    periodKey: "education.items.4.period",
    locationKey: "education.items.4.location",
    descriptionKey: "education.items.4.description",
    achievementKeys: [
      "education.items.4.achievement.1",
      "education.items.4.achievement.2",
      "education.items.4.achievement.3",
    ],
  },
];

function createTitle() {
  const title = document.createElement("h2");
  title.className = "education__title";
  title.dataset.i18n = "education.title";
  title.textContent = t("education.title");
  return title;
}

function createHeader(edu: EducationItem) {
  const header = document.createElement("div");
  header.className = "education__header";

  const degree = document.createElement("h3");
  degree.className = "education__degree";
  degree.dataset.i18n = edu.degreeKey;
  degree.textContent = t(edu.degreeKey);

  const school = document.createElement("div");
  school.className = "education__school";
  school.dataset.i18n = edu.schoolKey;
  school.textContent = t(edu.schoolKey);

  header.appendChild(degree);
  header.appendChild(school);
  return header;
}

function createMetaItem(icon: string, textKey: string, className: string) {
  const wrapper = document.createElement("span");
  wrapper.className = className;

  const iconEl = document.createElement("span");
  iconEl.className = "education__icon";
  iconEl.innerHTML = icon;

  const textEl = document.createElement("span");
  textEl.className = "education__text";
  textEl.dataset.i18n = textKey;
  textEl.textContent = t(textKey);

  wrapper.append(iconEl, textEl);
  return wrapper;
}

function createMeta(edu: EducationItem) {
  const meta = document.createElement("div");
  meta.className = "education__meta";

  meta.appendChild(
    createMetaItem(calendarIcon, edu.periodKey, "education__period")
  );

  if (edu.locationKey) {
    meta.appendChild(
      createMetaItem(locationIcon, edu.locationKey, "education__location")
    );
  }

  return meta;
}

function createDescription(edu: EducationItem) {
  const description = document.createElement("p");
  description.className = "education__description";
  description.dataset.i18n = edu.descriptionKey;
  description.textContent = t(edu.descriptionKey);
  return description;
}

function createAchievements(achievementKeys?: string[]) {
  if (!achievementKeys || achievementKeys.length === 0) return null;

  const list = document.createElement("ul");
  list.className = "education__achievements";

  achievementKeys.forEach((key) => {
    const li = document.createElement("li");
    li.dataset.i18n = key;
    li.textContent = t(key);
    list.appendChild(li);
  });

  return list;
}

function createItem(edu: EducationItem, index: number) {
  const item = document.createElement("div");
  item.className = "education__item";
  item.style.animationDelay = `${index * 0.15}s`;

  item.appendChild(createHeader(edu));
  item.appendChild(createMeta(edu));
  item.appendChild(createDescription(edu));

  const achievements = createAchievements(edu.achievementKeys);
  if (achievements) item.appendChild(achievements);

  return item;
}

function createTimeline() {
  const timeline = document.createElement("div");
  timeline.className = "education__timeline";

  educationData.forEach((edu, index) => {
    timeline.appendChild(createItem(edu, index));
  });

  return timeline;
}

function renderEducationSection() {
  const container =
    document.querySelector<HTMLDivElement>("#education-section");
  if (!container) return;

  const section = document.createElement("section");
  section.className = "education";

  section.appendChild(createTitle());
  section.appendChild(createTimeline());

  container.innerHTML = "";
  container.appendChild(section);
}

renderEducationSection();
