import { createElement } from '../../reactive/create-element.js'

export const CheckIcon = () =>
  createElement(
    'svg',
    {
      width: '16',
      height: '16',
      viewBox: '0 0 16 16',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg',
    },
    createElement('path', {
      d: 'M5.86666 10.6L3.06666 7.79999L2.13333 8.73332L5.86666 12.4667L13.8667 4.46666L12.9333 3.53333L5.86666 10.6Z',
      fill: 'currentColor',
    })
  )
