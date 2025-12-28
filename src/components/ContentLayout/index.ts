import "./style.css";

function renderContentLayout() {
  const container = document.querySelector<HTMLElement>("#content-layout");
  if (!container) return;

  container.innerHTML = `
    <div class="content">
      <div class="content__section content__section--1">
        <div id="experience-section"></div>
        <div id="education-section"></div>
        <div id="hobbies-section"></div>
        <div id="links-section"></div>
      </div>
      <div class="content__section content__section--2">
        <div id="portfolio-section"></div>
        <div id="good-bad-section"></div>
        <div id="funfacts-section"></div>
        <div id="skills-section"></div>
        
      </div>
    </div>
  `;
}

renderContentLayout();
