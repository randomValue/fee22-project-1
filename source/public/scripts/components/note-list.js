import { createElement } from '../reactive/create-element.js'
import { PrioElement } from './prio-element.js'
import { useState } from '../reactive/use-state.js'
import { useActiveNote, useStore } from './store.js'
import { useEffect } from '../reactive/use-effect.js'

export const ListItem = ({ subtitle, title, prio, isActive, setIsActive, index }) =>
  createElement(
    'li',
    { class: `nav-item ${isActive ? 'nav-item-active' : ''}` },
    createElement(
      'button',
      {
        class: `nav-button ${isActive ? 'nav-button-active' : ''}`,
        disabled: isActive ? true : undefined,
        onClick: () => {
          setIsActive(index)
        },
      },
      createElement(
        'span',
        { class: 'nav-button-text' },
        createElement('span', { class: 'nav-button-title' }, title),
        createElement('span', null, subtitle)
      ),
      createElement(PrioElement, { prio })
    )
  )
export const ListItemDone = ({ subtitle, title, isActive, setIsActive, index }) =>
  createElement(
    'li',
    { class: `nav-item ${isActive ? 'nav-item-active' : ''}` },
    createElement(
      'button',
      {
        class: `nav-button nav-button-done ${isActive ? 'nav-button-active' : ''}`,
        disabled: isActive ? true : undefined,
        onClick: () => {
          setIsActive(index)
        },
      },
      createElement(
        'span',
        { class: 'nav-button-text' },
        createElement('span', { class: 'nav-button-title' }, title),
        createElement('span', null, subtitle)
      )
    )
  )

export const List = () => {
  const [data] = useStore()
  const [, setActiveNote] = useActiveNote()

  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    setActiveNote(data[activeIndex])
  }, [activeIndex])

  return createElement(
    'ul',
    { class: 'nav-list' },
    data.map((item, index) =>
      createElement(item.done ? ListItemDone : ListItem, {
        title: item.title,
        subtitle: item.subtitle,
        prio: item.prio,
        key: `note-list-item-${index}`,
        isActive: activeIndex === index,
        index,
        setIsActive: setActiveIndex,
      })
    ),
    data.length === 0 && 'Leider nichts gefunden'
  )
}

export const NoteList = () => createElement('nav', { class: 'nav' }, createElement(List))
