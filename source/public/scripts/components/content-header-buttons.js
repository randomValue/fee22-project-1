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
            fetch(`/delete/${activeNote.id}`, {
              method: 'POST', // *GET, POST, PUT, DELETE, etc.
              mode: 'cors', // no-cors, *cors, same-origin
              cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
              credentials: 'same-origin', // include, *same-origin, omit
              headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
              redirect: 'follow', // manual, *follow, error
              referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            })
              .then((res) => res.json())
              .then((id) => {
                setData((state) => {
                  const index = state.findIndex((item) => item.id === id)
                  state.splice(index, 1)
                  backUpData.default = [...state]
                  return state
                })
                setActiveNote(undefined)
              })
          }
        },
      },
      createElement(DeleteIcon)
    )
  )
}
