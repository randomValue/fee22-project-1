import { createElement } from '../reactive/create-element.js'
import { FilterButton, SearchInput } from './search-input.js'
import { useState } from '../reactive/use-state.js'
import { useEffect } from '../reactive/use-effect.js'
import { FilterIcon } from './icons/filter-icon.js'

export const ToggleFilterButton = ({ handleClick }) =>
  createElement(
    'button',
    {
      class: 'button-base icon-button-small button-filled button-rounded',
      onClick: handleClick,
    },
    createElement(FilterIcon)
  )

const filterGroup = { current: undefined }
const filterGroupContainer = { current: undefined }

export const SearchContainer = () => {
  const [toggleSearch, setToggleSearch] = useState(true)

  useEffect(() => {
    if (!filterGroup.current || !filterGroupContainer.current) {
      return
    }
    filterGroupContainer.current.style.width = `${
      !toggleSearch ? filterGroup.current.getBoundingClientRect().width : 0
    }px`
  }, [toggleSearch])

  return createElement(
    'div',
    { class: 'search-container' },
    createElement(SearchInput, { toggleSearch, setToggleSearch }),
    createElement(
      'div',
      {
        class: 'filter-group-container',
        ref: (ref) => {
          filterGroupContainer.current = ref
        },
      },
      createElement(
        'div',
        {
          class: 'filter-group',
          ref: (ref) => {
            filterGroup.current = ref
          },
        },
        createElement(FilterButton, {
          label: 'Datum',
          disabled: toggleSearch ? true : undefined,
          filterBy: 'dueDate',
        }),
        createElement(FilterButton, {
          label: 'Relevanz',
          disabled: toggleSearch ? true : undefined,
          filterBy: 'prio',
        }),
        createElement(FilterButton, {
          label: 'Erstellung',
          disabled: toggleSearch ? true : undefined,
        })
      )
    ),
    createElement(ToggleFilterButton, {
      handleClick: () => {
        setToggleSearch(!toggleSearch)
      },
    })
  )
}
