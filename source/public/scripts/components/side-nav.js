import { createElement } from '../reactive/create-element.js'
import { SideNavHeader } from './side-nav-header.js'
import { NoteList } from './note-list.js'

export const SideNav = () => {
  return createElement(
    'div',
    { class: 'side-nav' },
    createElement(SideNavHeader),
    createElement('div', { class: 'add-button-container' }),
    createElement(NoteList)
  )
}
