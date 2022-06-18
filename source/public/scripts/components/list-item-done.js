import { useRouter } from '../reactive/use-router.js'
import { createElement } from '../reactive/create-element.js'
import { CheckIcon } from './icons/check-icon.js'
import { ChevronRightIcon } from './icons/chevron-right-icon.js'

export const ListItemDone = ({ id, subtitle, title, isActive }) => {
  const { push } = useRouter()
  return createElement(
    'li',
    { class: `nav-item ${isActive ? 'nav-item-active' : ''}` },
    createElement(
      'button',
      {
        title: `Notiz ${title} aufrufen`,
        class: `nav-button nav-button-done ${isActive ? 'nav-button-active' : ''}`,
        disabled: isActive ? true : undefined,
        onClick: () => {
          push(`/${id}`)
        },
      },
      createElement(
        'span',
        { class: 'nav-button-text-container' },
        createElement(CheckIcon, { svgProps: { class: 'nav-button-done-icon' } }),
        createElement(
          'span',
          { class: 'nav-button-text-done' },
          createElement('span', { class: 'nav-button-title' }, title),
          createElement('span', null, subtitle)
        )
      ),
      createElement(ChevronRightIcon, { svgProps: { class: 'nav-button-icon' } })
    )
  )
}
