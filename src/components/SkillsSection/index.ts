import { t } from "../../modules/i18n";
import "./style.css";

interface Skill {
  nameKey: string;
  level: "expert" | "advanced" | "moderate" | "basic";
}

interface SkillLevelConfig {
  color: string;
  labelKey: string;
}

const skillLevels: Record<
  "expert" | "advanced" | "moderate" | "basic",
  SkillLevelConfig
> = {
  expert: { color: "var(--accent-green)", labelKey: "skills.levels.expert" },
  advanced: {
    color: "var(--accent-purple)",
    labelKey: "skills.levels.advanced",
  },
  moderate: {
    color: "var(--accent-red)",
    labelKey: "skills.levels.moderate",
  },
  basic: { color: "var(--primary)", labelKey: "skills.levels.basic" },
};

// TODO remove translations as no need to translate skill names

const skills: Skill[] = [
  { nameKey: "skills.items.0.name", level: "expert" },
  { nameKey: "skills.items.1.name", level: "expert" },
  { nameKey: "skills.items.2.name", level: "expert" },
  { nameKey: "skills.items.3.name", level: "expert" },
  { nameKey: "skills.items.4.name", level: "advanced" },
  { nameKey: "skills.items.5.name", level: "advanced" },
  { nameKey: "skills.items.6.name", level: "advanced" },
  { nameKey: "skills.items.7.name", level: "expert" },
  { nameKey: "skills.items.8.name", level: "expert" },
  { nameKey: "skills.items.9.name", level: "advanced" },
  { nameKey: "skills.items.10.name", level: "expert" },
  { nameKey: "skills.items.11.name", level: "advanced" },
  { nameKey: "skills.items.12.name", level: "basic" },
  { nameKey: "skills.items.13.name", level: "moderate" },
  { nameKey: "skills.items.14.name", level: "moderate" },
  { nameKey: "skills.items.15.name", level: "advanced" },
  { nameKey: "skills.items.16.name", level: "expert" },
  { nameKey: "skills.items.17.name", level: "advanced" },
];

function renderSkillsSection() {
  const container = document.querySelector<HTMLDivElement>("#skills-section");
  if (!container) return;

  const section = document.createElement("section");
  section.className = "more-skills";

  const title = document.createElement("h2");
  title.dataset.i18n = "skills.title";
  title.textContent = t("skills.title");

  const intro = document.createElement("p");
  intro.dataset.i18n = "skills.intro";
  intro.textContent = t("skills.intro");

  const legend = document.createElement("div");
  legend.className = "skill__legend";

  Object.entries(skillLevels).forEach(([_level, config]) => {
    const legendItem = document.createElement("div");
    legendItem.className = "skill__legend-item";

    const dot = document.createElement("span");
    dot.className = "skill__legend-dot";
    dot.style.backgroundColor = config.color;

    const label = document.createElement("span");
    label.dataset.i18n = config.labelKey;
    label.textContent = t(config.labelKey);

    legendItem.appendChild(dot);
    legendItem.appendChild(label);
    legend.appendChild(legendItem);
  });

  const outro = document.createElement("p");
  outro.dataset.i18n = "skills.outro";
  outro.textContent = t("skills.outro");

  const skillContainer = document.createElement("div");
  skillContainer.className = "skill__container";

  skills.forEach((skill, index) => {
    const skillElement = document.createElement("div");
    skillElement.className = "skill";
    skillElement.style.borderColor = skillLevels[skill.level].color;
    skillElement.style.animationDelay = `${index * 0.05}s`;
    skillElement.dataset.i18n = skill.nameKey;
    skillElement.textContent = t(skill.nameKey);
    skillElement.setAttribute("data-level", skill.level);
    skillContainer.appendChild(skillElement);
  });

  section.appendChild(title);
  section.appendChild(intro);
  section.appendChild(legend);
  section.appendChild(outro);
  section.appendChild(skillContainer);

  container.innerHTML = "";
  container.appendChild(section);
}

renderSkillsSection();
