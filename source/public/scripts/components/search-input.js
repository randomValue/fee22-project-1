import { createElement } from '../reactive/create-element.js'
import { backUpData, useStore } from '../store.js'

export const FilterButton = ({ label, disabled }) =>
  createElement('button', { class: 'button-base button-outline button-rounded', disabled }, label)

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
