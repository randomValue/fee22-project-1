import { createElement } from '../reactive/create-element.js'
import { FormInput } from './form-input.js'
import { useState } from '../reactive/use-state.js'
import { FormLabel } from './form-label.js'
import { PrioIcon } from './icons/prio-icon.js'
import { useMemo } from '../reactive/use-memo.js'
import { useEffect } from '../reactive/use-effect.js'

export const FormSelect = ({ prio }) => {
  const [activePrio, setActivePrio] = useState(prio || -1)
  const handleClick = useMemo(
    () => (e) => {
      if (e.target.checked) {
        setActivePrio(parseInt(e.target.value, 10))
      }
    },
    []
  )
  useEffect(() => {
    setActivePrio(prio)
  }, [prio])

  return createElement(
    'div',
    null,
    createElement(FormLabel, {
      class: 'prio-select-button',
      label: createElement(PrioIcon, { isSelected: activePrio >= 4 }),
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
      label: createElement(PrioIcon, { isSelected: activePrio >= 3 }),
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
      label: createElement(PrioIcon, { isSelected: activePrio >= 2 }),
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
      label: createElement(PrioIcon, { isSelected: activePrio >= 1 }),
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
      label: createElement(PrioIcon, { isSelected: activePrio >= 0 }),
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
