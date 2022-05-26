import {createElement} from "../rective/create-element.js";

export const FilterButton = ({label, disabled}) => {
    return createElement('button', {class: 'button-base button-outline button-rounded', disabled}, label)
}

const initialData = []

const inputRef = {current: undefined}
export const SearchInput = ({toggleSearch, setToggleSearch, setData}) => {

    return createElement('div', {class: `search-input-container ${!toggleSearch && 'search-input-collapsed'}`},
        createElement('input', {
            class: 'search-input', name: 'search', type: 'text', onFocus: () => {
                setToggleSearch(true)
            }, ref: (ref) => {
                inputRef.current = ref
            }, onInput: (e) => {
                setData(state => {
                    if (initialData.length === 0) {
                        initialData.push(...state)
                    }
                    const filtered = initialData.filter(item => item.text.match(e.target.value))
                    return filtered
                })
            }
        }),
        createElement('button', {
                class: 'button-base icon-button-small search-button', onClick: () => {
                    setToggleSearch(!toggleSearch)
                }
            },
            createElement('svg', {
                    width: "16", height: "17", viewBox: "0 0 16 17", fill: "none",
                    xmlns: "http://www.w3.org/2000/svg"
                },
                createElement('path', {
                    d: "M10.5033 10.0033H9.97665L9.78998 9.82335C10.4433 9.06335 10.8366 8.07668 10.8366 7.00335C10.8366 4.61001 8.89665 2.67001 6.50332 2.67001C4.10998 2.67001 2.16998 4.61001 2.16998 7.00335C2.16998 9.39668 4.10998 11.3367 6.50332 11.3367C7.57665 11.3367 8.56332 10.9433 9.32332 10.29L9.50332 10.4767V11.0033L12.8366 14.33L13.83 13.3367L10.5033 10.0033ZM6.50332 10.0033C4.84332 10.0033 3.50332 8.66335 3.50332 7.00335C3.50332 5.34335 4.84332 4.00335 6.50332 4.00335C8.16332 4.00335 9.50332 5.34335 9.50332 7.00335C9.50332 8.66335 8.16332 10.0033 6.50332 10.0033Z",
                    fill: "currentColor"
                }))),
    )
}