import { createElement } from '../reactive/create-element.js'
import { useState } from '../reactive/use-state.js'
import { useActiveNote, useStore } from '../store.js'
import { useEffect } from '../reactive/use-effect.js'
import { ListItemDone } from './list-item-done.js'
import { ListItem } from './list-item.js'

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
