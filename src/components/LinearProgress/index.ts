import { t } from "../../modules/i18n";
import "./style.css";

interface SkillProgressItem {
  nameKey: string;
  percentage: number;
  color: string;
  category?: string;
}

const skillsProgress: SkillProgressItem[] = [
  {
    nameKey: "linearprogress.skills.0.name",
    percentage: 60,
    color: "var(--primary)",
    category: "Soft Skills",
  },
  {
    nameKey: "linearprogress.skills.1.name",
    percentage: 50,
    color: "var(--accent-green)",
    category: "Soft Skills",
  },
  {
    nameKey: "linearprogress.skills.2.name",
    percentage: 80,
    color: "var(--accent-purple)",
    category: "Soft Skills",
  },
  {
    nameKey: "linearprogress.skills.3.name",
    percentage: 90,
    color: "var(--accent-red)",
    category: "Soft Skills",
  },
  {
    nameKey: "linearprogress.skills.4.name",
    percentage: 60,
    color: "var(--primary)",
    category: "Soft Skills",
  },
];

function createSection(): HTMLElement {
  const section = document.createElement("section");
  section.className = "linear-progress";
  return section;
}

function createList(): HTMLDivElement {
  const list = document.createElement("div");
  list.className = "linear-progress__list";
  return list;
}

function createHeader(nameKey: string, index: number) {
  const header = document.createElement("div");
  header.className = "linear-progress__item-header";

  const name = document.createElement("span");
  name.className = "linear-progress__name";
  name.dataset.i18n = nameKey;
  name.id = `lp-name-${index}`;
  name.textContent = t(nameKey);

  const percentage = document.createElement("span");
  percentage.className = "linear-progress__percentage";
  percentage.textContent = "0%";
  percentage.setAttribute("data-percentage", "0");

  header.appendChild(name);
  header.appendChild(percentage);
  return { header, name, percentage };
}

function createBar(skill: SkillProgressItem, labelId: string) {
  const barContainer = document.createElement("div");
  barContainer.className = "linear-progress__bar-container";

  const bar = document.createElement("div");
  bar.className = "linear-progress__bar";
  bar.style.setProperty("--skill-color", skill.color);
  bar.style.setProperty("--skill-percentage", `${skill.percentage}%`);

  // ARIA
  bar.setAttribute("role", "progressbar");
  bar.setAttribute("aria-valuemin", "0");
  bar.setAttribute("aria-valuemax", "100");
  bar.setAttribute("aria-valuenow", "0");
  bar.setAttribute("aria-labelledby", labelId);

  const barFill = document.createElement("div");
  barFill.className = "linear-progress__bar-fill";

  const barGlow = document.createElement("div");
  barGlow.className = "linear-progress__bar-glow";

  bar.appendChild(barFill);
  bar.appendChild(barGlow);
  barContainer.appendChild(bar);

  return { barContainer, bar };
}

function createItem(skill: SkillProgressItem, index: number) {
  const item = document.createElement("div");
  item.className = "linear-progress__item";
  item.style.animationDelay = `${index * 0.1}s`;

  const { header, name, percentage } = createHeader(skill.nameKey, index);
  const { barContainer, bar } = createBar(skill, name.id);

  // keep target on label for compatibility
  percentage.setAttribute("data-percentage", String(skill.percentage));

  item.appendChild(header);
  item.appendChild(barContainer);

  return { item, percentage, bar };
}

function animatePercentage(
  element: HTMLElement,
  bar: HTMLElement,
  target: number
) {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (reduceMotion) {
    element.textContent = `${target}%`;
    bar.setAttribute("aria-valuenow", String(target));
    bar.classList.add("is-animating");
    return;
  }

  const duration = 1500;
  const startTime = performance.now();
  const start = 0;

  function update(now: number) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + (target - start) * eased);
    element.textContent = `${current}%`;
    bar.setAttribute("aria-valuenow", String(current));
    if (progress < 1) requestAnimationFrame(update);
    else element.textContent = `${target}%`;
  }

  bar.classList.add("is-animating");
  requestAnimationFrame(update);
}

function startAnimations(root: HTMLElement) {
  const items = Array.from(root.querySelectorAll(".linear-progress__item"));
  items.forEach((it) => {
    const pct = it.querySelector<HTMLElement>(".linear-progress__percentage");
    const bar = it.querySelector<HTMLElement>(".linear-progress__bar");
    const targetAttr = pct?.getAttribute("data-percentage") ?? "0";
    const target = Number(targetAttr) || 0;
    if (pct && bar) animatePercentage(pct, bar, target);
  });
}

function renderLinearProgress() {
  const container = document.querySelector<HTMLDivElement>("#linear-progress");
  if (!container) return;

  const section = createSection();
  const list = createList();

  skillsProgress.forEach((skill, index) => {
    const { item } = createItem(skill, index);
    list.appendChild(item);
  });

  section.appendChild(list);
  container.innerHTML = "";
  container.appendChild(section);

  const observer = new IntersectionObserver(
    (entries, obs) => {
      if (entries.some((e) => e.isIntersecting)) {
        startAnimations(section);
        obs.disconnect();
      }
    },
    { threshold: 0.25, rootMargin: "0px 0px -10% 0px" }
  );
  observer.observe(section);
}

// Re-render on language change
let langBound = false;
function mount() {
  renderLinearProgress();
  if (!langBound) {
    langBound = true;
    window.addEventListener("langchange", () => {
      renderLinearProgress();
    });
  }
}

mount();
