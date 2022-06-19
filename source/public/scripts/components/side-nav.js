import { createElement } from '../reactive/create-element.js'
import { SearchContainer } from './search-container.js'
import { NoteList } from './note-list.js'
import { AddIcon } from './icons/add-icon.js'
import { useRouter } from '../reactive/use-router.js'
import { Switch } from './switch.js'

export const SideNav = () => {
  const { push } = useRouter()
  return createElement(
    'div',
    { class: 'side-nav' },
    createElement(SearchContainer),
    createElement('div', { class: 'side-nav-switch' }, createElement(Switch)),
    createElement(
      'div',
      { class: 'add-button-container' },
      createElement(
        'button',
        {
          class: 'button-base add-button',
          title: 'neue Notiz erstellen',
          onClick: () => {
            push('/new/create-new')
          },
        },
        createElement(AddIcon)
      )
    ),
    createElement(NoteList)
  )
}
