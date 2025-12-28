import "./style.css";

interface BarProgressItem {
  label: string;
  percent: number;
  color?: string;
}

const barData: BarProgressItem[] = [
  { label: "JS/TS", percent: 90, color: "var(--accent-green)" },
  { label: "React", percent: 80, color: "var(--accent-purple)" },
  { label: "Vue", percent: 90, color: "var(--accent-purple)" },
  { label: "Angular", percent: 40, color: "var(--accent-purple)" },
  { label: "UI/UX", percent: 95, color: "var(--primary)" },
  { label: "CSS", percent: 100, color: "var(--accent-red)" },
];

function renderBarProgress() {
  const container = document.querySelector<HTMLDivElement>("#bar-progress");
  if (!container) return;

  const barProgress = document.createElement("div");
  barProgress.className = "bar-progress";
  barProgress.setAttribute("aria-hidden", "true");

  const maxHeight = 120; // px

  barData.forEach((item, index) => {
    const bar = document.createElement("div");
    bar.className = `bar bar--p${index + 1}`;

    const fill = document.createElement("div");
    fill.className = "bar__fill";
    fill.style.setProperty(
      "--bar-height",
      `${(item.percent / 100) * maxHeight}px`
    );
    fill.style.setProperty("--bar-color", item.color || "var(--primary)");
    fill.style.animationDelay = `${index * 0.1}s`;

    const text = document.createElement("div");
    text.className = "bar__text";
    text.textContent = item.label;

    const percentage = document.createElement("div");
    percentage.className = "bar__percentage";
    percentage.textContent = `${item.percent}%`;

    bar.appendChild(fill);
    bar.appendChild(text);
    bar.appendChild(percentage);
    barProgress.appendChild(bar);
  });

  container.innerHTML = "";
  container.appendChild(barProgress);
}

renderBarProgress();
