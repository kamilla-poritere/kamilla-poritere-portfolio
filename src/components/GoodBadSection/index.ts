import { t } from "../../modules/i18n";
import "./style.css";

interface GoodBad {
  type: "good" | "bad";
  titleKey: string;
  itemKeys: string[];
}

const goodBadData: GoodBad[] = [
  {
    type: "good",
    titleKey: "goodbad.good.title",
    itemKeys: [
      "goodbad.good.items.0",
      "goodbad.good.items.1",
      "goodbad.good.items.2",
      "goodbad.good.items.3",
      "goodbad.good.items.4",
    ],
  },
  {
    type: "bad",
    titleKey: "goodbad.bad.title",
    itemKeys: [
      "goodbad.bad.items.0",
      "goodbad.bad.items.1",
      "goodbad.bad.items.2",
      "goodbad.bad.items.3",
      "goodbad.bad.items.4",
    ],
  },
];

const GOOD_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M9 10h.01M15 10h.01"></path><path d="M8.5 14.5Q12 17 15.5 14.5"></path></svg>`;

const BAD_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M9 10h.01M15 10h.01"></path><path d="M8.5 16.5Q12 14 15.5 16.5"></path></svg>`;

function createTitle(): HTMLHeadingElement {
  const title = document.createElement("h2");
  title.className = "good-or-bad__title";
  title.dataset.i18n = "goodbad.title";
  title.textContent = t("goodbad.title");
  return title;
}

function createIcon(type: "good" | "bad"): HTMLSpanElement {
  const icon = document.createElement("span");
  icon.className = "good-or-bad__icon";
  icon.innerHTML = type === "good" ? GOOD_ICON : BAD_ICON;
  return icon;
}

function createColumnTitle(
  titleKey: string,
  type: "good" | "bad"
): HTMLHeadingElement {
  const columnTitle = document.createElement("h3");
  columnTitle.className = "good-or-bad__column-title";
  columnTitle.dataset.i18n = titleKey;
  columnTitle.textContent = t(titleKey);
  columnTitle.appendChild(createIcon(type));
  return columnTitle;
}

function createListItems(itemKeys: string[]): HTMLUListElement {
  const list = document.createElement("ul");
  list.className = "good-or-bad__list";

  itemKeys.forEach((itemKey, itemIndex) => {
    const li = document.createElement("li");
    li.className = "good-or-bad__item";
    li.style.animationDelay = `${0.2 + itemIndex * 0.05}s`;
    li.dataset.i18n = itemKey;
    li.textContent = t(itemKey);
    list.appendChild(li);
  });

  return list;
}

// Helper: Create column
function createColumn(item: GoodBad, index: number): HTMLDivElement {
  const column = document.createElement("div");
  column.className = `good-or-bad__column good-or-bad__column--${item.type}`;
  column.style.animationDelay = `${index * 0.15}s`;

  column.appendChild(createColumnTitle(item.titleKey, item.type));
  column.appendChild(createListItems(item.itemKeys));

  return column;
}

// Helper: Create container
function createContainer(): HTMLDivElement {
  const container = document.createElement("div");
  container.className = "good-or-bad__container";

  goodBadData.forEach((item, index) => {
    container.appendChild(createColumn(item, index));
  });

  return container;
}

// Helper: Create section
function createSection(): HTMLElement {
  const section = document.createElement("section");
  section.className = "good-or-bad";

  section.appendChild(createTitle());
  section.appendChild(createContainer());

  return section;
}

// Main: Render GoodBad section
function renderGoodBadSection(): void {
  const container = document.querySelector<HTMLDivElement>("#good-bad-section");
  if (!container) return;

  container.innerHTML = "";
  container.appendChild(createSection());
}

renderGoodBadSection();
