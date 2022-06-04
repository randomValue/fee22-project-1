import { createElement } from "../rective/create-element.js";
import { PrioElement } from "./prio-element.js";
import { ContentHeaderButtons } from "./content-header-buttons.js";
import { useActiveNote } from "./store.js";

const formateDate = (date) =>
  `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;

export const ContentHeader = () => {
  const [activeNote] = useActiveNote();
  return createElement(
    "header",
    { class: "header" },
    activeNote &&
      createElement(
        "div",
        { class: "header-date-container" },
        createElement("div", { class: "header-date-label" }, "erledigen bis:"),
        createElement(
          "div",
          { class: "header-dat" },
          formateDate(new Date(activeNote.dueDate))
        )
      ),
    activeNote &&
      createElement(
        "div",
        { class: "header-prio" },
        createElement("div", { class: "header-prio-label" }, "Relevanz:"),
        createElement(PrioElement, { prio: activeNote.prio })
      ),
    createElement(ContentHeaderButtons)
  );
};
