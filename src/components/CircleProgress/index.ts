import { t } from "../../modules/i18n";
import "./style.css";

interface CircleData {
  levelKey: string;
  labelKey: string;
  percent: number;
  color?: string;
  skills: Array<{ nameKey: string; percent: number }>;
}

const circleData: CircleData[] = [
  {
    levelKey: "circleprogress.items.0.level",
    labelKey: "circleprogress.items.0.label",
    percent: 80,
    color: "var(--accent-green)",
    skills: [
      { nameKey: "circleprogress.skills.reading", percent: 90 },
      { nameKey: "circleprogress.skills.speaking", percent: 90 },
      { nameKey: "circleprogress.skills.listening", percent: 100 },
    ],
  },
  {
    levelKey: "circleprogress.items.1.level",
    labelKey: "circleprogress.items.1.label",
    percent: 100,
    color: "var(--primary)",
    skills: [
      { nameKey: "circleprogress.skills.reading", percent: 100 },
      { nameKey: "circleprogress.skills.speaking", percent: 100 },
      { nameKey: "circleprogress.skills.listening", percent: 100 },
    ],
  },
  {
    levelKey: "circleprogress.items.2.level",
    labelKey: "circleprogress.items.2.label",
    percent: 70,
    color: "var(--accent-purple)",
    skills: [
      { nameKey: "circleprogress.skills.reading", percent: 70 },
      { nameKey: "circleprogress.skills.speaking", percent: 60 },
      { nameKey: "circleprogress.skills.listening", percent: 70 },
    ],
  },
  {
    levelKey: "circleprogress.items.3.level",
    labelKey: "circleprogress.items.3.label",
    percent: 50,
    color: "var(--accent-red)",
    skills: [
      { nameKey: "circleprogress.skills.reading", percent: 60 },
      { nameKey: "circleprogress.skills.speaking", percent: 20 },
      { nameKey: "circleprogress.skills.listening", percent: 50 },
    ],
  },
  {
    levelKey: "circleprogress.items.4.level",
    labelKey: "circleprogress.items.4.label",
    percent: 30,
    color: "var(--accent-purple)",
    skills: [
      { nameKey: "circleprogress.skills.reading", percent: 40 },
      { nameKey: "circleprogress.skills.speaking", percent: 10 },
      { nameKey: "circleprogress.skills.listening", percent: 40 },
    ],
  },
];

const radius = 26;
const circumference = 2 * Math.PI * radius;

function createTooltip(data: CircleData): HTMLElement {
  const tooltip = document.createElement("div");
  tooltip.className = "circle-progress__tooltip";

  const title = document.createElement("div");
  title.className = "circle-progress__tooltip-title";
  title.dataset.i18n = data.labelKey;
  title.textContent = t(data.labelKey);

  const skillsContainer = document.createElement("div");
  skillsContainer.className = "circle-progress__skills";

  data.skills.forEach((skill) => {
    const row = document.createElement("div");
    row.className = "circle-progress__skill-row";

    const name = document.createElement("div");
    name.className = "circle-progress__skill-name";
    name.dataset.i18n = skill.nameKey;
    name.textContent = t(skill.nameKey);

    const bar = document.createElement("div");
    bar.className = "circle-progress__skill-bar";

    const fill = document.createElement("div");
    fill.className = "circle-progress__skill-fill";
    fill.style.width = `${skill.percent}%`;

    bar.appendChild(fill);
    row.appendChild(name);
    row.appendChild(bar);
    skillsContainer.appendChild(row);
  });

  tooltip.appendChild(title);
  tooltip.appendChild(skillsContainer);
  return tooltip;
}

function createCircle(data: CircleData): HTMLElement {
  const circle = document.createElement("div");
  circle.className = "circle-progress__circle";

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "circle-progress__svg");
  svg.setAttribute("viewBox", "0 0 64 64");
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", `${t(data.labelKey)} ${data.percent} percent`);

  const bgCircle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  bgCircle.setAttribute("class", "circle-progress__svg-bg");
  bgCircle.setAttribute("cx", "32");
  bgCircle.setAttribute("cy", "32");
  bgCircle.setAttribute("r", radius.toString());

  const progressCircle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  progressCircle.setAttribute("class", "circle-progress__svg-progress");
  progressCircle.setAttribute("cx", "32");
  progressCircle.setAttribute("cy", "32");
  progressCircle.setAttribute("r", radius.toString());
  progressCircle.style.setProperty(
    "--circle-circumference",
    circumference.toString()
  );
  progressCircle.style.setProperty(
    "--circle-offset",
    (circumference * (1 - data.percent / 100)).toString()
  );
  progressCircle.style.setProperty(
    "--circle-color",
    data.color || "var(--primary)"
  );

  svg.appendChild(bgCircle);
  svg.appendChild(progressCircle);

  const value = document.createElement("div");
  value.className = "circle-progress__value";
  value.dataset.i18n = data.levelKey;
  value.textContent = t(data.levelKey);

  const percent = document.createElement("div");
  percent.className = "circle-progress__percent";
  percent.textContent = `${data.percent}%`;

  const label = document.createElement("span");
  label.className = "circle-progress__label";
  label.dataset.i18n = data.labelKey;
  label.textContent = t(data.labelKey);

  circle.appendChild(svg);
  circle.appendChild(value);
  circle.appendChild(percent);
  circle.appendChild(label);

  return circle;
}

function renderCircleProgress(): void {
  const container = document.querySelector<HTMLDivElement>("#circle-progress");
  if (!container) return;

  const progressCircle = document.createElement("div");
  progressCircle.className = "circle-progress";
  progressCircle.setAttribute("aria-hidden", "true");

  const tooltipContainer = document.createElement("div");
  tooltipContainer.className = "circle-progress__tooltips";

  circleData.forEach((data, index) => {
    const wrapper = document.createElement("div");
    wrapper.className = "circle-progress__wrapper";
    wrapper.style.animationDelay = `${index * 0.1}s`;

    const circle = createCircle(data);
    const tooltip = createTooltip(data);

    tooltip.style.animationDelay = `${index * 0.1}s`;

    wrapper.addEventListener("mouseenter", () => {
      const rect = wrapper.getBoundingClientRect();
      tooltip.style.left = `${rect.left + rect.width / 2}px`;
      tooltip.style.top = `${rect.bottom + 10}px`;
      tooltip.style.opacity = "1";
      tooltip.style.visibility = "visible";
      tooltip.style.transform = "translateX(-50%) translateY(0)";
    });

    wrapper.addEventListener("mouseleave", () => {
      tooltip.style.opacity = "0";
      tooltip.style.visibility = "hidden";
      tooltip.style.transform = "translateX(-50%) translateY(10px)";
    });

    wrapper.appendChild(circle);
    progressCircle.appendChild(wrapper);
    tooltipContainer.appendChild(tooltip);
  });

  container.innerHTML = "";
  container.appendChild(progressCircle);
  container.appendChild(tooltipContainer);
}

renderCircleProgress();
window.addEventListener("langchange", renderCircleProgress);
