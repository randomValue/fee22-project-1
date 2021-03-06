import { createElement } from '../reactive/create-element.js'
import { EditIcon } from './icons/edit-icon.js'
import { CheckIcon } from './icons/check-icon.js'
import { DeleteIcon } from './icons/delete-icon.js'
import { backUpData, useSnackbar, useStore } from '../store.js'
import { updateNote } from '../fetch/update-note.js'
import { deleteNote } from '../fetch/delete-note.js'

export const ContentHeaderButtons = ({ routerPush, queries, activeNote, setActiveNote }) => {
  const [data, setData] = useStore()
  const [, setSnackbar] = useSnackbar()

  return createElement(
    'div',
    { class: 'header-actions' },
    createElement(
      'button',
      {
        class: `button-base icon-button-small button-rounded edit-button ${
          queries?.[1] === 'edit' ? 'edit-button-active' : ''
        }`,
        title: 'bearbeiten',
        onClick: () => {
          if (activeNote) {
            routerPush(`/${activeNote.id}${queries?.[1] ? '' : '/edit'}`)
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
        title: 'als erledigt markieren',
        onClick: async () => {
          const toggleDone = !activeNote?.done
          const newData = [...data]
          const { ...foundNote } = newData.find((note) => note.id === activeNote?.id)
          if (foundNote) {
            foundNote.done = toggleDone
            await updateNote(foundNote)
              .then((v) => {
                setData((state) => {
                  const foundIndex = state.findIndex((entry) => entry.id === v.note.id)
                  if (foundIndex > -1) {
                    state[foundIndex] = v.note
                  }
                  backUpData.default = state
                  return state
                })
                setSnackbar({ text: v.message, type: 'success' })
                setActiveNote(foundNote)
              })
              .catch((e) => {
                setSnackbar({ text: e.message, type: 'error' })
              })
          }
        },
      },
      createElement(CheckIcon)
    ),
    createElement(
      'button',
      {
        class: 'button-base icon-button-small button-rounded delete-button',
        title: 'l??schen',
        onClick: async () => {
          const newData = [...data]
          const foundIndex = newData.findIndex((note) => note.id === activeNote?.id)
          if (foundIndex > -1) {
            await deleteNote(activeNote.id)
              .then(({ message, id }) => {
                setSnackbar({ text: message, type: 'success' })
                setData((state) => {
                  const index = state.findIndex((item) => item.id === id)
                  state.splice(index, 1)
                  backUpData.default = [...state]
                  return state
                })
                setActiveNote(undefined)
              })
              .catch((e) => {
                setSnackbar({ text: e.message, type: 'error' })
              })
          }
        },
      },
      createElement(DeleteIcon)
    )
  )
}
