import { t } from "../../modules/i18n";
import "./style.css";

interface Contact {
  typeKey: string;
  icon: string;
  textKey: string;
  link?: string;
  noteKey?: string;
}

const contacts: Contact[] = [
  {
    typeKey: "contacts.phone.type",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>`,
    textKey: "contacts.phone.text",
    link: "tel:+37127077457",
    noteKey: "contacts.phone.note",
  },
  {
    typeKey: "contacts.email.type",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`,
    textKey: "contacts.email.text",
    link: "mailto:kamilla.poriter@gmail.com",
  },
  {
    typeKey: "contacts.location.type",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
    textKey: "contacts.location.text",
  },
  {
    typeKey: "contacts.linkedin.type",
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path></svg>`,
    textKey: "contacts.linkedin.text",
    link: "https://linkedin.com/in/kamilla-poritere-177721198",
  },
];

function createIconContainer(icon: string): HTMLDivElement {
  const iconContainer = document.createElement("div");
  iconContainer.className = "contacts__icon-container";

  const iconWrapper = document.createElement("div");
  iconWrapper.className = "contacts__icon";
  iconWrapper.innerHTML = icon;
  iconWrapper.setAttribute("aria-hidden", "true");

  iconContainer.appendChild(iconWrapper);
  return iconContainer;
}

function createTypeLabel(typeKey: string): HTMLDivElement {
  const typeLabel = document.createElement("div");
  typeLabel.className = "contacts__type";
  typeLabel.dataset.i18n = typeKey;
  typeLabel.textContent = t(typeKey);
  return typeLabel;
}

function createTextElement(contact: Contact): HTMLElement {
  const textElement = contact.link
    ? document.createElement("a")
    : document.createElement("span");

  textElement.className = "contacts__text";
  textElement.dataset.i18n = contact.textKey;
  textElement.textContent = t(contact.textKey);

  if (contact.link && textElement instanceof HTMLAnchorElement) {
    textElement.href = contact.link;
    textElement.setAttribute(
      "aria-label",
      `${t(contact.typeKey)}: ${t(contact.textKey)}`
    );
    if (contact.typeKey === "contacts.linkedin.type") {
      textElement.target = "_blank";
      textElement.rel = "noopener noreferrer";
    }
  }

  return textElement;
}

function createNote(noteKey?: string): HTMLSpanElement | null {
  if (!noteKey) return null;
  const noteEl = document.createElement("span");
  noteEl.className = "contacts__note";
  noteEl.dataset.i18n = noteKey;
  noteEl.textContent = t(noteKey);
  return noteEl;
}

function createContent(contact: Contact): HTMLDivElement {
  const contentDiv = document.createElement("div");
  contentDiv.className = "contacts__content";

  contentDiv.appendChild(createTypeLabel(contact.typeKey));
  contentDiv.appendChild(createTextElement(contact));

  const noteEl = createNote(contact.noteKey);
  if (noteEl) contentDiv.appendChild(noteEl);

  return contentDiv;
}

function createItem(contact: Contact, index: number): HTMLDivElement {
  const item = document.createElement("div");
  item.className = "contacts__item";
  item.style.animationDelay = `${index * 0.1}s`;
  item.setAttribute("role", "listitem");

  item.appendChild(createIconContainer(contact.icon));
  item.appendChild(createContent(contact));

  return item;
}

function renderContactsBlock(): void {
  const container = document.querySelector<HTMLDivElement>("#contacts-block");
  if (!container) return;

  const contactsDiv = document.createElement("div");
  contactsDiv.className = "contacts";
  contactsDiv.setAttribute("role", "list");
  contactsDiv.setAttribute("aria-label", "Contact information");

  contacts.forEach((contact, index) => {
    contactsDiv.appendChild(createItem(contact, index));
  });

  container.innerHTML = "";
  container.appendChild(contactsDiv);
}

renderContactsBlock();
window.addEventListener("langchange", renderContactsBlock);
