import { createElement } from '../reactive/create-element.js'
import { FormInput } from './form-input.js'
import { FormLabel } from './form-label.js'
import { FormSelect } from './form-select.js'
import { parseDate, toDate } from '../lib/formate-date.js'
import { backUpData, useStore } from '../store.js'
import { updateNote } from '../fetch/update-note.js'
import { uniqueId } from '../lib/uniqueId.js'
import { useState } from '../reactive/use-state.js'
import { createNote } from '../fetch/create-note.js'

export const emptyNote = {
  id: uniqueId(),
  prio: 0,
  title: '',
  subtitle: '',
  text: '',
  dueDate: null,
  creationDate: toDate(Date.now()),
  done: false,
}

export const Form = ({ activeNote, setActiveNote, routerPush, isNewEntry }) => {
  const [, setData] = useStore()
  const [newNote, setNewNote] = useState(emptyNote)

  return createElement(
    'form',
    { class: 'note-form' },
    createElement(FormLabel, { label: 'Titel:' }),
    createElement(FormInput, {
      placeholder: 'gib bitte einen Titel ein',
      value: activeNote?.title,
      onChange: (e) => {
        if (isNewEntry) {
          setNewNote((state) => ({ ...state, title: e.target.value }))
          return
        }
        setActiveNote((state) => ({ ...state, title: e.target.value }))
      },
    }),
    createElement(FormLabel, { label: 'Beschreibung:' }),
    createElement(FormInput, {
      placeholder: 'gib bitte eine Beschreibung ein',
      value: activeNote?.subtitle,
      onChange: (e) => {
        if (isNewEntry) {
          setNewNote((state) => ({ ...state, subtitle: e.target.value }))
          return
        }
        setActiveNote((state) => ({ ...state, subtitle: e.target.value }))
      },
    }),
    createElement(FormLabel, { label: 'zu erledigen bis:' }),
    createElement(FormInput, {
      value: parseDate(activeNote?.dueDate),
      type: 'date',
      onChange: (e) => {
        if (isNewEntry) {
          setNewNote((state) => ({ ...state, dueDate: toDate(e.target.value) }))
          return
        }
        setActiveNote((state) => ({ ...state, dueDate: toDate(e.target.value) }))
      },
    }),
    createElement(FormLabel, { label: 'Relevanz:' }),
    createElement(FormSelect, {
      notePrio: isNewEntry ? newNote?.prio : activeNote?.prio,
      handleClick: (e) => {
        if (e.target.checked) {
          if (isNewEntry) {
            setNewNote((state) => ({ ...state, prio: parseInt(e.target.value, 10) + 1 }))
            return
          }
          setActiveNote((state) => ({ ...state, prio: parseInt(e.target.value, 10) + 1 }))
        }
      },
    }),
    createElement(FormLabel, { class: 'note-label', label: 'Notiz' }),
    createElement(FormInput, {
      class: 'note-textarea',
      type: 'textarea',
      children: activeNote?.text,
      onChange: (e) => {
        if (isNewEntry) {
          setNewNote((state) => ({ ...state, text: e.target.value }))
          return
        }
        setActiveNote((state) => ({ ...state, text: e.target.value }))
      },
    }),
    createElement(
      'div',
      { class: 'note-button-group' },
      createElement(
        'button',
        {
          type: 'button',
          class: 'button-base button-outline note-button-cancel',
          onClick: () => {
            routerPush(`/${activeNote?.id || ''}`)
          },
        },
        'abbrechen'
      ),
      createElement(
        'button',
        {
          type: 'button',
          class: 'button-base button-filled note-button-send',
          onClick: async () => {
            if (isNewEntry) {
              await createNote(newNote, setData).then((v) => {
                setData((state) => {
                  state.unshift(v.note)
                  backUpData.default = state
                  return state
                })
              })
              routerPush(`/${newNote?.id}/edit`)
              return
            }
            await updateNote(activeNote).then((v) => {
              setData((state) => {
                const foundIndex = state.findIndex((entry) => entry.id === v.note.id)
                if (foundIndex > -1) {
                  state[foundIndex] = v.note
                }
                backUpData.default = state
                return state
              })
            })
          },
        },
        'speichern'
      )
    )
  )
}
