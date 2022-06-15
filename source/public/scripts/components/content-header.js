import { createElement } from '../reactive/create-element.js'
import { PrioElement } from './prio-element.js'
import { ContentHeaderButtons } from './content-header-buttons.js'
import { formateDate } from '../lib/formate-date.js'

export const ContentHeader = ({
  activeNote,
  setActiveNote,
  isEditMode,
  isNewMode,
  routerPush,
  queries,
}) => {
  return createElement(
    'header',
    { class: 'header' },
    createElement(
      'button',
      {
        class: 'back-button',
        onClick: () => {
          routerPush('/')
        },
      },
      'zurück'
    ),
    activeNote &&
      !isNewMode &&
      createElement(
        'div',
        { class: 'header-date-container' },
        !isEditMode && createElement('div', { class: 'header-date-label' }, 'erledigen bis:'),
        !isEditMode &&
          createElement('div', { class: 'header-date' }, formateDate(new Date(activeNote.dueDate))),
        isEditMode && createElement('h1', { class: 'header-date-label' }, 'bearbeite Notiz')
      ),
    isNewMode && createElement('h1', { class: 'header-date-label' }, 'neue Notiz erstellen'),
    activeNote &&
      !isNewMode &&
      !isEditMode &&
      createElement(
        'div',
        { class: 'header-prio' },
        createElement('div', { class: 'header-prio-label' }, 'Relevanz:'),
        createElement(PrioElement, { prio: activeNote.prio })
      ),
    !isNewMode &&
      activeNote &&
      createElement(ContentHeaderButtons, { routerPush, queries, activeNote, setActiveNote })
  )
}
