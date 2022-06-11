import { createElement } from '../reactive/create-element.js'
import { FormInput } from './form-input.js'
import { FormLabel } from './form-label.js'
import { PrioIcon } from './icons/prio-icon.js'
import { useMemo } from '../reactive/use-memo.js'

export const FormSelect = ({ activeNote, setActiveNote }) => {
  const handleClick = useMemo(
    () => (e) => {
      if (e.target.checked) {
        setActiveNote((state) => ({ ...state, prio: parseInt(e.target.value, 10) }))
      }
    },
    []
  )

  return createElement(
    'div',
    null,
    createElement(FormLabel, {
      class: 'prio-select-button',
      label: createElement(PrioIcon, { isSelected: activeNote?.prio > 4 }),
    }),
    createElement(FormInput, {
      type: 'radio',
      name: 'prio',
      class: 'hide-radio',
      value: '4',
      onChange: handleClick,
    }),
    createElement(FormLabel, {
      class: 'prio-select-button',
      label: createElement(PrioIcon, { isSelected: activeNote?.prio > 3 }),
    }),
    createElement(FormInput, {
      type: 'radio',
      name: 'prio',
      class: 'hide-radio',
      value: '3',
      onChange: handleClick,
    }),
    createElement(FormLabel, {
      class: 'prio-select-button',
      label: createElement(PrioIcon, { isSelected: activeNote?.prio > 2 }),
    }),
    createElement(FormInput, {
      type: 'radio',
      name: 'prio',
      class: 'hide-radio',
      value: '2',
      onChange: handleClick,
    }),
    createElement(FormLabel, {
      class: 'prio-select-button',
      label: createElement(PrioIcon, { isSelected: activeNote?.prio > 1 }),
    }),
    createElement(FormInput, {
      type: 'radio',
      name: 'prio',
      class: 'hide-radio',
      value: '1',
      onChange: handleClick,
    }),
    createElement(FormLabel, {
      class: 'prio-select-button',
      label: createElement(PrioIcon, { isSelected: activeNote?.prio > 0 }),
    }),
    createElement(FormInput, {
      type: 'radio',
      name: 'prio',
      class: 'hide-radio',
      value: '0',
      onChange: handleClick,
    })
  )
}
