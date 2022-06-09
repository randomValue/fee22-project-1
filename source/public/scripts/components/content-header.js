import { createElement } from '../reactive/create-element.js'
import { PrioElement } from './prio-element.js'
import { ContentHeaderButtons } from './content-header-buttons.js'
import { formateDate } from '../lib/formate-date.js'

export const ContentHeader = ({ activeNote, isEditMode, isNewMode }) =>
  createElement(
    'header',
    { class: 'header' },
    activeNote &&
      createElement(
        'div',
        { class: 'header-date-container' },
        !isEditMode &&
          !isNewMode &&
          createElement('div', { class: 'header-date-label' }, 'erledigen bis:'),
        !isEditMode &&
          !isNewMode &&
          createElement('div', { class: 'header-dat' }, formateDate(new Date(activeNote.dueDate))),
        (isEditMode || isNewMode) &&
          createElement('h1', { class: 'header-date-label' }, 'bearbeite Notiz')
      ),
    activeNote &&
      createElement(
        'div',
        { class: 'header-prio' },
        createElement('div', { class: 'header-prio-label' }, 'Relevanz:'),
        createElement(PrioElement, { prio: activeNote.prio })
      ),
    createElement(ContentHeaderButtons)
  )
