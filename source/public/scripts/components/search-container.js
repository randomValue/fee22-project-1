import {createElement} from "../rective/create-element.js";
import {FilterButton, SearchInput} from "./search-input.js";
import {useState} from "../rective/use-state.js";

export const ToggleFilterButton = ({handleClick}) => {
    return createElement('button', {
            class: 'button-base icon-button-small button-filled button-rounded', onClick: handleClick
        },
        createElement('svg', {width: "16", height: "17", viewBox: "0 0 16 17", fill: "none"},
            createElement('path', {
                d: "M6.66667 12.5H9.33333V11.1667H6.66667V12.5ZM2 4.5V5.83333H14V4.5H2ZM4 9.16667H12V7.83333H4V9.16667Z",
                fill: "currentColor"
            }))
    )
}

export const SearchContainer = () => {
    const [toggleSearch, setToggleSearch] = useState(false)

    return createElement('div', {class: 'search-container'},
        createElement(SearchInput, {toggleSearch, setToggleSearch}),
        createElement('div', {class: 'filter-group', style: {display: toggleSearch ? 'none' : 'flex'}},
            createElement(FilterButton, {label: 'Datum'}),
            createElement(FilterButton, {label: 'Relevanz'}),
            createElement(FilterButton, {label: 'Erstellung'}),
        ),
        createElement(ToggleFilterButton, {
            handleClick: () => {
                setToggleSearch(!toggleSearch)
            }
        })
    )
}