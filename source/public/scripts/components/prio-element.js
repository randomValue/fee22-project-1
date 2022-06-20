import { createElement } from '../reactive/create-element.js'
import { PrioIcon } from './icons/prio-icon.js'

const prioArray = new Array(5).fill(1)

export const PrioElement = ({ prio }) =>
  createElement(
    'div',
    null,
    prioArray.map((entry, index) =>
      createElement(PrioIcon, {
        isSelected: index < prio,
      })
    )
  )
