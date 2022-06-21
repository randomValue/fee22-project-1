import { createElement } from '../reactive/create-element.js'
import { PrioElement } from './prio-element.js'
import { ContentHeaderButtons } from './content-header-buttons.js'
import { formateDate } from '../lib/formate-date.js'
import { BackIcon } from './icons/back-icon.js'
import { useMemo } from '../reactive/use-memo.js'

export const ContentHeader = ({
  activeNote,
  setActiveNote,
  isEditMode,
  isNewMode,
  routerPush,
  queries,
}) => {
  const hasNote = useMemo(
    () => !!activeNote && !isEditMode && !isNewMode,
    [activeNote, isEditMode, isNewMode]
  )
  return createElement(
    'header',
    { class: 'header' },
    createElement(
      'div',
      { class: 'header-date-container' },
      createElement(
        'button',
        {
          title: 'zurück',
          class: 'back-button',
          onClick: () => {
            routerPush('/')
          },
        },
        createElement(BackIcon)
      ),
      hasNote && createElement('div', { class: 'header-date-label' }, 'erledigen bis:'),
      hasNote &&
        createElement(
          'div',
          { class: 'header-date' },
          formateDate(activeNote?.dueDate ? new Date(activeNote.dueDate) : undefined)
        ),
      isEditMode && createElement('h1', { class: 'header-date-label' }, 'bearbeite Notiz'),
      isNewMode && createElement('h1', { class: 'header-date-label' }, 'neue Notiz erstellen')
    ),
    hasNote &&
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
