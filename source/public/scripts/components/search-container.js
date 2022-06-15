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
  const [filterIndex, setFilterIndex] = useState(-1)

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
          index: 0,
          setFilterIndex,
          isActive: filterIndex === 0,
        }),
        createElement(FilterButton, {
          label: 'Relevanz',
          disabled: toggleSearch ? true : undefined,
          filterBy: 'prio',
          index: 1,
          setFilterIndex,
          isActive: filterIndex === 1,
        }),
        createElement(FilterButton, {
          label: 'Erstellung',
          disabled: toggleSearch ? true : undefined,
          filterBy: 'creationDate',
          index: 2,
          setFilterIndex,
          isActive: filterIndex === 2,
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
