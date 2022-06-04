import { createElement } from "../rective/create-element.js";
import { FilterButton, SearchInput } from "./search-input.js";
import { useState } from "../rective/use-state.js";
import { useEffect } from "../rective/use-effect.js";

export const ToggleFilterButton = ({ handleClick }) =>
  createElement(
    "button",
    {
      class: "button-base icon-button-small button-filled button-rounded",
      onClick: handleClick,
    },
    createElement(
      "svg",
      { width: "16", height: "17", viewBox: "0 0 16 17", fill: "none" },
      createElement("path", {
        d: "M6.66667 12.5H9.33333V11.1667H6.66667V12.5ZM2 4.5V5.83333H14V4.5H2ZM4 9.16667H12V7.83333H4V9.16667Z",
        fill: "currentColor",
      })
    )
  );

const filterGroup = { current: undefined };
const filterGroupContainer = { current: undefined };

export const SearchContainer = () => {
  const [toggleSearch, setToggleSearch] = useState(true);

  useEffect(() => {
    if (!filterGroup.current || !filterGroupContainer.current) {
      return;
    }
    filterGroupContainer.current.style.width = `${
      !toggleSearch ? filterGroup.current.getBoundingClientRect().width : 0
    }px`;
  }, [toggleSearch]);

  return createElement(
    "div",
    { class: "search-container" },
    createElement(SearchInput, { toggleSearch, setToggleSearch }),
    createElement(
      "div",
      {
        class: "filter-group-container",
        ref: (ref) => {
          filterGroupContainer.current = ref;
        },
      },
      createElement(
        "div",
        {
          class: "filter-group",
          ref: (ref) => {
            filterGroup.current = ref;
          },
        },
        createElement(FilterButton, {
          label: "Datum",
          disabled: toggleSearch ? true : undefined,
        }),
        createElement(FilterButton, {
          label: "Relevanz",
          disabled: toggleSearch ? true : undefined,
        }),
        createElement(FilterButton, {
          label: "Erstellung",
          disabled: toggleSearch ? true : undefined,
        })
      )
    ),
    createElement(ToggleFilterButton, {
      handleClick: () => {
        setToggleSearch(!toggleSearch);
      },
    })
  );
};
