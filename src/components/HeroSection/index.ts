import "./style.css";

interface QuickSkill {
  name: string;
}

const quickSkills: QuickSkill[] = [
  { name: "Figma" },
  { name: "Git" },
  { name: "Storybook" },
  { name: "Avocode" },
  { name: "Jira" },
  { name: "Slack" },
];

const tooltipPhrases = [
  "Sui sui! 👋",
  "Hooba noobie",
  "Cuh teekaloo?",
  "Ooh de gah! 😄",
  "Chum cha! 🍕",
];

function scrollToSkills(): void {
  const skillsSection = document.querySelector("#skills-section");
  if (!skillsSection) {
    setTimeout(() => scrollToSkills(), 100);
    return;
  }

  const headerOffset = 70;
  const elementPosition = skillsSection.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

  window.scrollTo({ top: offsetPosition, behavior: "smooth" });

  skillsSection.classList.add("pulse-highlight");
  setTimeout(() => skillsSection.classList.remove("pulse-highlight"), 2000);
}

function createShadowContainerHTML(index: number): string {
  if (index === 2 || index === 4) {
    return `
      <div class="shadow-container shadow-container--${index}">
        <div class="round-el ellipse"></div>
      </div>
    `;
  }
  return `
    <div class="shadow-container shadow-container--${index}">
      <div class="round green floating"></div>
      <div class="round purple floating"></div>
      <div class="round red floating"></div>
    </div>
  `;
}

function createShadowHTML(): string {
  return `
    <div class="shadow">
      ${createShadowContainerHTML(1)}
      ${createShadowContainerHTML(2)}
      ${createShadowContainerHTML(3)}
      ${createShadowContainerHTML(4)}
    </div>
  `;
}

function createRhombusHTML(): string {
  return `
    <div class="rhombus-container" aria-hidden="true">
      <div class="rhombus" role="presentation">
        <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" focusable="false">
          <polygon class="plumbob-fill" points="32,4 56,32 32,60 8,32"></polygon>
          <polygon fill="rgba(255,255,255,0.12)" points="32,10 48,32 32,54 16,32"></polygon>
        </svg>
      </div>
      <div class="tooltip">Sui sui!</div>
    </div>
  `;
}

function createHeroLeftHTML(): string {
  return `
    <div class="hero-left">
      <div class="hero-progress">
        <div id="linear-progress" class="linear-progress__wrapper"></div>
        <div id="circle-progress"></div>
      </div>
    </div>
  `;
}

function createHeroCenterHTML(): string {
  return `
    <div class="hero-center">
      <div class="hero-avatar">
        ${createRhombusHTML()}
        <div class="plumbob-shadow" aria-hidden="true"></div>
        <div class="hero-avatar__image"></div>
      </div>
    </div>
  `;
}

function createHeroRightHTML(): string {
  return `
    <div class="hero-right">
      <div class="hero-progress">
        <div id="bar-progress"></div>
        <div id="contacts-block" class="contacts__wrapper"></div>
      </div>
    </div>
  `;
}

function createHeroWrapperHTML(): string {
  return `
    <div class="hero-wrapper">
      ${createHeroLeftHTML()}
      ${createHeroCenterHTML()}
      ${createHeroRightHTML()}
    </div>
  `;
}

function createHeroFooterHTML(): string {
  return `
    <div class="hero-footer">
      <div class="skill__container"></div>
    </div>
  `;
}

function createSkillBadge(skill: QuickSkill, index: number): HTMLDivElement {
  const badge = document.createElement("div");
  badge.className = "skill";
  badge.style.animationDelay = `${index * 0.05}s`;
  badge.textContent = skill.name;
  return badge;
}

function createMoreButton(): HTMLButtonElement {
  const moreBtn = document.createElement("button");
  moreBtn.className = "skill skill--more";
  moreBtn.setAttribute("aria-label", "View all skills");
  moreBtn.innerHTML = `<span class="skill__dots">•••</span>`;
  moreBtn.addEventListener("click", scrollToSkills);
  return moreBtn;
}

function populateSkillsContainer(container: Element): void {
  quickSkills.forEach((skill, index) =>
    container.appendChild(createSkillBadge(skill, index))
  );
  container.appendChild(createMoreButton());
}

function setupRhombusTooltip(root: ParentNode): void {
  const rhombus = root.querySelector<HTMLElement>(".rhombus-container");
  const tooltip = rhombus?.querySelector<HTMLElement>(".tooltip");
  if (!rhombus || !tooltip) return;

  let idx = 0;
  const next = () => {
    idx = (idx + 1) % tooltipPhrases.length;
    tooltip.textContent = tooltipPhrases[idx];
  };

  rhombus.addEventListener("pointerenter", next);
  rhombus.addEventListener("mouseenter", next);
}

function createMain(): HTMLElement {
  const main = document.createElement("main");
  main.className = "main";
  main.innerHTML = `
    ${createShadowHTML()}
    ${createHeroWrapperHTML()}
    ${createHeroFooterHTML()}
  `;
  return main;
}

function renderHeroSection(): void {
  const container = document.querySelector<HTMLElement>("#hero-section");
  if (!container) return;

  const main = createMain();
  const skillContainer = main.querySelector(".skill__container");
  if (skillContainer) {
    populateSkillsContainer(skillContainer);
  }
  setupRhombusTooltip(main);

  container.innerHTML = "";
  container.appendChild(main);
}

renderHeroSection();
