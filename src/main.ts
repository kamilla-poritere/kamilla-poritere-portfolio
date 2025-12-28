import "./style.css";
import "./modules/theme";
import "./modules/i18n";

const body = document.body;

const containers = [
  "header-layout",
  "hero-section",
  "about-section",
  "content-layout",
  "footer-layout",
];

containers.forEach((id) => {
  const div = document.createElement("div");
  div.id = id;
  body.appendChild(div);
});

// Load layouts first, then components
Promise.all([
  import("./components/HeaderLayout"),
  import("./components/HeroSection"),
  import("./components/AboutSection"),
  import("./components/ContentLayout"),
  import("./components/FooterLayout"),
])
  .then(() => {
    // Wait for next tick to ensure DOM is updated
    return new Promise((resolve) => setTimeout(resolve, 0));
  })
  .then(() => {
    // Now load content components
    return Promise.all([
      import("./components/ContactsBlock"),
      import("./components/ExperienceSection"),
      import("./components/EducationSection"),
      import("./components/PortfolioSection"),
      import("./components/GoodBadSection"),
      import("./components/HobbiesSection"),
      import("./components/FunfactsSection"),
      import("./components/SkillsSection"),
      import("./components/LinksSection"),
      import("./components/LinearProgress"),
      import("./components/CircleProgress"),
      import("./components/BarProgress"),
    ]);
  })
  .catch(console.error);
