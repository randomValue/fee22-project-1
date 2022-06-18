import { useRouter } from '../reactive/use-router.js'
import { createElement } from '../reactive/create-element.js'
import { PrioElement } from './prio-element.js'
import { formateDate } from '../lib/formate-date.js'
import { ChevronRightIcon } from './icons/chevron-right-icon.js'

export const ListItem = ({ id, subtitle, title, date, prio, isActive }) => {
  const { push } = useRouter()
  return createElement(
    'li',
    { class: `nav-item ${isActive ? 'nav-item-active' : ''}` },
    createElement(
      'button',
      {
        title: `Notiz ${title} aufrufen`,
        class: `nav-button ${isActive ? 'nav-button-active' : ''}`,
        disabled: isActive ? true : undefined,
        onClick: () => {
          push(`/${id}`)
        },
      },
      createElement(
        'span',
        { class: 'nav-button-text' },
        createElement('span', { class: 'nav-button-title' }, title),
        createElement('span', null, subtitle)
      ),
      createElement(
        'span',
        { class: 'nav-button-date-prio' },
        createElement(PrioElement, { prio }),
        // eslint-disable-next-line no-undef
        createElement('span', null, formateDate(date))
      ),
      createElement(ChevronRightIcon, { svgProps: { class: 'nav-button-icon' } })
    )
  )
}
