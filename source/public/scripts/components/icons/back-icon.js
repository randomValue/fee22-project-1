import { createElement } from '../../reactive/create-element.js'

export const BackIcon = ({ svgProps, pathProps }) =>
  createElement(
    'svg',
    {
      width: '16',
      height: '17',
      viewBox: '0 0 16 17',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg',
      ...svgProps,
    },
    createElement('path', {
      d: 'M11.8901 2.57999L10.7034 1.39999L4.11011 7.99999L10.7101 14.6L11.8901 13.42L6.47011 7.99999L11.8901 2.57999Z',
      fill: 'currentColor',
      ...pathProps,
    })
  )
