import { createElement } from '../reactive/create-element.js'
import { FormInput } from './form-input.js'
import { FormLabel } from './form-label.js'
import { FormSelect } from './form-select.js'
import { useActiveNote } from '../store.js'

export const Form = () => {
  const [activeNote] = useActiveNote()
  return createElement(
    'form',
    { class: 'note-form' },
    createElement(FormLabel, { label: 'Titel:' }),
    createElement(FormInput, {
      placeholder: 'gib bitte einen Titel ein',
      value: activeNote?.title,
    }),
    createElement(FormLabel, { label: 'zu erledigen bis:' }),
    createElement(FormInput, { value: '2022-10-13', type: 'date' }),
    createElement(FormLabel, { label: 'Relevanz:' }),
    createElement(FormSelect, { prio: activeNote?.prio }),
    createElement(FormLabel, { class: 'note-label', label: 'Notiz' }),
    createElement(FormInput, {
      class: 'note-textarea',
      type: 'textarea',
      children: activeNote?.text,
    }),
    createElement(
      'div',
      { class: 'note-button-group' },
      createElement(
        'button',
        { type: 'button', class: 'button-base button-outline note-button-cancel' },
        'abbrechen'
      ),
      createElement(
        'button',
        { type: 'button', class: 'button-base button-filled note-button-send' },
        'speichern'
      )
    )
  )
}
