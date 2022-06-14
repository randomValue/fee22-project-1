import { createElement } from '../reactive/create-element.js'
import { PrioElement } from './prio-element.js'
import { useState } from '../reactive/use-state.js'
import { useActiveNote, useStore } from '../store.js'
import { useEffect } from '../reactive/use-effect.js'
import { ChevronRightIcon } from './icons/chevron-right-icon.js'
import { formateDate } from '../lib/formate-date.js'
import { useRouter } from '../reactive/use-router.js'

export const ListItem = ({ id, subtitle, title, date, prio, isActive }) => {
  const { push } = useRouter()
  return createElement(
    'li',
    { class: `nav-item ${isActive ? 'nav-item-active' : ''}` },
    createElement(
      'button',
      {
        class: `nav-button ${isActive ? 'nav-button-active' : ''}`,
        disabled: isActive ? true : undefined,
        onClick: () => {
          push(`/${id}`)
        },
      },
      createElement(
        'span',
        { class: 'nav-button-text' },
        createElement('span', { class: 'nav-button-title' }, title),
        createElement('span', null, subtitle)
      ),
      createElement(
        'span',
        { class: 'nav-button-date-prio' },
        createElement(PrioElement, { prio }),
        // eslint-disable-next-line no-undef
        createElement('span', null, formateDate(date))
      ),
      createElement(ChevronRightIcon)
    )
  )
}
export const ListItemDone = ({ id, subtitle, title, isActive }) => {
  const { push } = useRouter()
  return createElement(
    'li',
    { class: `nav-item ${isActive ? 'nav-item-active' : ''}` },
    createElement(
      'button',
      {
        class: `nav-button nav-button-done ${isActive ? 'nav-button-active' : ''}`,
        disabled: isActive ? true : undefined,
        onClick: () => {
          push(`/${id}`)
        },
      },
      createElement(
        'span',
        { class: 'nav-button-text' },
        createElement('span', { class: 'nav-button-title' }, title),
        createElement('span', null, subtitle)
      ),
      createElement(ChevronRightIcon)
    )
  )
}

export const List = () => {
  const [data] = useStore()
  const [activeNote] = useActiveNote()

  const [activeIndex, setActiveIndex] = useState(-1)
  useEffect(() => {
    if (!activeNote) {
      setActiveIndex(-1)
      return
    }
    const foundIndex = data.findIndex((entry) => entry.id === activeNote.id)
    setActiveIndex(foundIndex)
  }, [activeNote, data])

  return createElement(
    'ul',
    { class: 'nav-list' },
    data.map((item, index) =>
      createElement(item.done ? ListItemDone : ListItem, {
        title: item.title,
        subtitle: item.subtitle,
        date: item.dueDate,
        prio: item.prio,
        key: `note-list-item-${index}`,
        isActive: activeIndex === index,
        index,
        id: item.id,
      })
    ),
    data.length === 0 && 'Leider nichts gefunden'
  )
}

export const NoteList = () => createElement('nav', { class: 'nav' }, createElement(List))
