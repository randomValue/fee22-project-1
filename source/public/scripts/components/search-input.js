import { createElement } from '../reactive/create-element.js'
import { backUpData, useStore } from '../store.js'
import { useEffect } from '../reactive/use-effect.js'

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
    return b[filterBy] - a[filterBy]
  })
  return [...sorted]
}

export const FilterButton = ({ label, disabled, filterBy, isActive, setFilterIndex, index }) => {
  const [, setData] = useStore()
  return createElement(
    'button',
    {
      'aria-selected': isActive ? 'true' : 'false',
      class: 'button-base button-outline button-rounded filter-button',
      disabled,
      onClick: () => {
        if (!isActive) {
          setFilterIndex(index)
          setData(sortData(filterBy))
          return
        }
        setFilterIndex(-1)
        setData(backUpData.default)
      },
    },
    label
  )
}

const inputRef = { current: undefined }
export const SearchInput = ({ toggleSearch, setToggleSearch }) => {
  const [, setData] = useStore()

  useEffect(() => {
    if (toggleSearch) {
      inputRef.current?.focus()
    }
  }, [toggleSearch])

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
