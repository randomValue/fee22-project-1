import { createElement } from '../reactive/create-element.js'
import { EditIcon } from './icons/edit-icon.js'
import { CheckIcon } from './icons/check-icon.js'
import { DeleteIcon } from './icons/delete-icon.js'
import { backUpData, useStore } from '../store.js'

export const ContentHeaderButtons = ({ routerPush, queries, activeNote, setActiveNote }) => {
  const [data, setData] = useStore()

  return createElement(
    'div',
    { class: 'header-actions' },
    createElement(
      'button',
      {
        class: `button-base icon-button-small button-rounded edit-button ${
          queries?.[1] === 'edit' ? 'edit-button-active' : ''
        }`,
        disabled: queries?.[1] === 'edit' || undefined,
        onClick: () => {
          if (activeNote) {
            routerPush(`/${activeNote.id}/edit`)
          }
        },
      },
      createElement(EditIcon)
    ),
    createElement(
      'button',
      {
        class: 'button-base button-outline icon-button-small button-rounded done-button',
        'aria-selected': activeNote?.done ? 'true' : undefined,
        onClick: () => {
          const toggleDone = !activeNote?.done
          const newData = [...data]
          const foundNote = newData.find((note) => note.id === activeNote?.id)
          if (foundNote) {
            foundNote.done = toggleDone
          }
          setActiveNote(foundNote)
          setData([...newData])
        },
      },
      createElement(CheckIcon)
    ),
    createElement(
      'button',
      {
        class: 'button-base icon-button-small button-rounded delete-button',
        onClick: () => {
          const newData = [...data]
          const foundIndex = newData.findIndex((note) => note.id === activeNote?.id)
          if (foundIndex > -1) {
            newData.splice(foundIndex, 1)
            backUpData.default = [...newData]
            setData([...newData])
            setActiveNote(undefined)
          }
        },
      },
      createElement(DeleteIcon)
    )
  )
}
