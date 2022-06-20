import { createElement } from '../reactive/create-element.js'
import { FormInput } from './form-input.js'
import { FormLabel } from './form-label.js'
import { PrioIcon } from './icons/prio-icon.js'

export const FormSelect = ({ notePrio, handleClick }) => {
  const prio = notePrio || 0
  return createElement(
    'div',
    null,
    createElement(FormLabel, {
      class: 'prio-select-button',
      label: createElement(PrioIcon, { isSelected: prio > 0 }),
    }),
    createElement(FormInput, {
      type: 'radio',
      name: 'prio',
      class: 'hide-radio',
      value: '0',
      onChange: handleClick,
    }),
    createElement(FormLabel, {
      class: 'prio-select-button',
      label: createElement(PrioIcon, { isSelected: prio > 1 }),
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
      label: createElement(PrioIcon, { isSelected: prio > 2 }),
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
      label: createElement(PrioIcon, { isSelected: prio > 3 }),
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
      label: createElement(PrioIcon, { isSelected: prio > 4 }),
    }),
    createElement(FormInput, {
      type: 'radio',
      name: 'prio',
      class: 'hide-radio',
      value: '4',
      onChange: handleClick,
    })
  )
}
