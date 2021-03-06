import { createElement } from '../../reactive/create-element.js'

export const ChevronRightIcon = ({ svgProps, pathProps }) =>
  createElement(
    'svg',
    { width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', ...svgProps },
    createElement('path', {
      d: 'M6.11499 20.23L7.88499 22L17.885 12L7.88499 2L6.11499 3.77L14.345 12L6.11499 20.23Z',
      fill: 'currentColor',
      ...pathProps,
    })
  )
