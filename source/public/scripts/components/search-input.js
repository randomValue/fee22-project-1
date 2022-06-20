import { createElement } from '../reactive/create-element.js'
import { backUpData, useStore } from '../store.js'
import { SearchIcon } from './icons/search-icon.js'
import { useState } from '../reactive/use-state.js'
import { CloseIcon } from './icons/close-icon.js'

const inputRef = { current: undefined }
export const SearchInput = () => {
  const [, setData] = useStore()
  const [hasCloseIcon, setHasCloseIcon] = useState(false)

  return createElement(
    'div',
    {
      class: 'search-input-container',
    },
    createElement('input', {
      class: 'search-input',
      name: 'search',
      type: 'text',
      ref: (ref) => {
        inputRef.current = ref
      },
      onInput: (e) => {
        if (e.target.value) {
          setHasCloseIcon(true)
        }
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
    createElement(
      'button',
      {
        class: 'button-base icon-button-small search-button',
        title: hasCloseIcon ? 'Suche zurücksetzen' : 'Suche',
        onClick: () => {
          if (inputRef.current) {
            inputRef.current.focus()
            if (hasCloseIcon) {
              inputRef.current.value = ''
              setData(backUpData.default)
              setHasCloseIcon(false)
            }
          }
        },
      },
      createElement(hasCloseIcon ? CloseIcon : SearchIcon, {
        svgProps: { class: 'search-input-toggle-button' },
      })
    )
  )
}
