import { createElement } from '../reactive/create-element.js'
import { SearchContainer } from './search-container.js'
import { NoteList } from './note-list.js'
import { backUpData, useStore } from '../store.js'
import { AddIcon } from './icons/add-icon.js'

export const SideNav = () => {
  const [, setStore] = useStore()
  return createElement(
    'div',
    { class: 'side-nav' },
    createElement(SearchContainer),
    createElement(
      'div',
      { class: 'add-button-container' },
      createElement(
        'button',
        {
          class: 'button-base add-button',
          onClick: () => {
            backUpData.default.push({
              ...backUpData.default[0],
              prio: backUpData.default.length + 1,
              text: `Hello ${backUpData.default.length + 1}`,
            })
            setStore([...backUpData.default])
          },
        },
        createElement(AddIcon)
      )
    ),
    createElement(NoteList)
  )
}
