import { createElement } from '../reactive/create-element.js'
import { FormInput } from './form-input.js'
import { FormLabel } from './form-label.js'
import { FormSelect } from './form-select.js'
import { parseDate, toDate } from '../lib/formate-date.js'
import { backUpData, useStore } from '../store.js'
import { fetchPostOptions } from '../lib/fetch-post-options.js'

export const Form = ({ activeNote, setActiveNote, routerPush }) => {
  const [, setData] = useStore()
  return createElement(
    'form',
    { class: 'note-form' },
    createElement(FormLabel, { label: 'Titel:' }),
    createElement(FormInput, {
      placeholder: 'gib bitte einen Titel ein',
      value: activeNote?.title,
      onChange: (e) => {
        setActiveNote((state) => ({ ...state, title: e.target.value }))
      },
    }),
    createElement(FormLabel, { label: 'zu erledigen bis:' }),
    createElement(FormInput, {
      value: parseDate(activeNote?.dueDate),
      type: 'date',
      onChange: (e) => {
        setActiveNote((state) => ({ ...state, dueDate: toDate(e.target.value) }))
      },
    }),
    createElement(FormLabel, { label: 'Relevanz:' }),
    createElement(FormSelect, { activeNote, setActiveNote }),
    createElement(FormLabel, { class: 'note-label', label: 'Notiz' }),
    createElement(FormInput, {
      class: 'note-textarea',
      type: 'textarea',
      children: activeNote?.text,
      onChange: (e) => {
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
            await fetch(`/api/data/${activeNote?.id}`, {
              ...fetchPostOptions,
              body: JSON.stringify(activeNote),
            })
              .then((data) => data.json())
              .then((v) => {
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
