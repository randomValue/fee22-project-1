import { createElement } from '../../reactive/create-element.js'

export const FilterIcon = () =>
  createElement(
    'svg',
    { width: '16', height: '17', viewBox: '0 0 16 17', fill: 'none' },
    createElement('path', {
      d: 'M6.66667 12.5H9.33333V11.1667H6.66667V12.5ZM2 4.5V5.83333H14V4.5H2ZM4 9.16667H12V7.83333H4V9.16667Z',
      fill: 'currentColor',
    })
  )
