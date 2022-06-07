import { createElement } from '../reactive/create-element.js'
import { backUpData, useStore } from '../store.js'
import { useState } from '../reactive/use-state.js'

const sortData = (filterBy) => (state) => {
  if (backUpData.default.length === 0) {
    backUpData.default.push(...state)
  }
  const sorted = [...backUpData.default].sort((a, b) => {
    if (filterBy === 'dueDate' || filterBy === 'creationDate') {
      const aMill = Date.parse(a[filterBy])
      const bMill = Date.parse(b[filterBy])
      return bMill - aMill
    }
    return a[filterBy] - b[filterBy]
  })
  return [...sorted]
}

export const FilterButton = ({ label, disabled, filterBy }) => {
  const [, setData] = useStore()
  const [toggleFilter, setToggleFilter] = useState(false)
  return createElement(
    'button',
    {
      class: 'button-base button-outline button-rounded',
      disabled,
      onClick: () => {
        setToggleFilter(!toggleFilter)
        if (!toggleFilter) {
          setData(sortData(filterBy))
          return
        }
        setData(backUpData.default.sort((a, b) => a.id - b.id))
      },
    },
    label
  )
}

const inputRef = { current: undefined }
export const SearchInput = ({ toggleSearch, setToggleSearch }) => {
  const [, setData] = useStore()

  return createElement(
    'div',
    {
      class: `search-input-container ${!toggleSearch && 'search-input-collapsed'}`,
    },
    createElement('input', {
      class: 'search-input',
      name: 'search',
      type: 'text',
      onFocus: () => {
        setToggleSearch(true)
      },
      ref: (ref) => {
        inputRef.current = ref
      },
      onInput: (e) => {
        setData((state) => {
          if (backUpData.default.length === 0) {
            backUpData.default.push(...state)
          }
          const filtered = backUpData.default.filter((item) => {
            const inTitle = item.title.toLowerCase().match(e.target.value.toLowerCase())
            const inSubtitle = item.subtitle.toLowerCase().match(e.target.value.toLowerCase())
            return inTitle || inSubtitle
          })
          return [...filtered]
        })
      },
    }),
    createElement('button', {
      class: 'button-base icon-button-small search-button',
      onClick: () => {
        setToggleSearch(!toggleSearch)
      },
    })
  )
}
