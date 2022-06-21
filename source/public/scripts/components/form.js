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
import { useEffect } from '../reactive/use-effect.js'

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

const isValid = (note) => !!note.title && !!note.subtitle && !!note.text

export const Form = ({ activeNote, setActiveNote, routerPush, isNewEntry }) => {
  const [, setData] = useStore()
  const [hasError, setHasError] = useState({ title: false, subtitle: false, text: false })
  const [newNote, setNewNote] = useState(emptyNote)

  useEffect(() => {
    setHasError({
      title: activeNote?.title === '',
      subtitle: activeNote?.subtitle === '',
      text: activeNote?.text === '',
    })
  }, [activeNote])

  return createElement(
    'form',
    { class: 'note-form' },
    createElement(FormLabel, { label: 'Titel:' }),
    createElement(FormInput, {
      isRequired: true,
      hasError: hasError.title || undefined,
      placeholder: 'gib bitte einen Titel ein',
      'aria-errormessage': 'error-title',
      value: activeNote?.title || newNote?.title,
      onChange: (e) => {
        if (isNewEntry) {
          setNewNote((state) => ({ ...state, title: e.target.value }))
          return
        }
        setActiveNote((state) => ({ ...state, title: e.target.value }))
      },
    }),
    hasError.title &&
      createElement(
        'span',
        { id: 'error-title', class: 'error-input' },
        'das Feld darf nicht leer sein.'
      ),
    createElement(FormLabel, { label: 'Beschreibung:' }),
    createElement(FormInput, {
      isRequired: true,
      hasError: hasError.subtitle,
      placeholder: 'gib bitte eine Beschreibung ein',
      value: activeNote?.subtitle || newNote?.subtitle,
      'aria-errormessage': 'error-subtitle',
      onChange: (e) => {
        if (isNewEntry) {
          setNewNote((state) => ({ ...state, subtitle: e.target.value }))
          return
        }
        setActiveNote((state) => ({ ...state, subtitle: e.target.value }))
      },
    }),
    hasError.subtitle &&
      createElement(
        'span',
        { id: 'error-subtitle', class: 'error-input' },
        'das Feld darf nicht leer sein.'
      ),
    createElement(FormLabel, { label: 'zu erledigen bis:' }),
    createElement(FormInput, {
      value: parseDate(activeNote?.dueDate || newNote?.dueDate),
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
    hasError.text &&
      createElement(
        'span',
        { id: 'error-subtitle', class: 'error-input error-textarea' },
        'das Feld darf nicht leer sein.'
      ),
    createElement(FormInput, {
      isRequired: true,
      hasError: hasError.text || undefined,
      class: 'note-textarea',
      type: 'textarea',
      'aria-errormessage': 'error-text',
      children: activeNote?.text || newNote?.text,
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
              if (!isValid(newNote)) {
                setHasError({
                  title: newNote.title === '',
                  subtitle: newNote.subtitle === '',
                  text: newNote.text === '',
                })
                return
              }
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
            if (!isValid(activeNote)) {
              console.log(activeNote.text)
              setHasError({
                title: activeNote.title === '',
                subtitle: activeNote.subtitle === '',
                text: activeNote.text === '',
              })
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
