import { createElement } from '../reactive/create-element.js'
import { EditIcon } from './icons/edit-icon.js'
import { CheckIcon } from './icons/check-icon.js'
import { DeleteIcon } from './icons/delete-icon.js'

export const ContentHeaderButtons = () =>
  createElement(
    'div',
    { class: 'header-actions' },
    createElement(
      'button',
      { class: 'button-base icon-button-small button-rounded edit-button' },
      createElement(EditIcon)
    ),
    createElement(
      'button',
      {
        class: 'button-base button-outline icon-button-small button-rounded done-button',
      },
      createElement(CheckIcon)
    ),
    createElement(
      'button',
      { class: 'button-base icon-button-small button-rounded delete-button' },
      createElement(DeleteIcon)
    )
  )
