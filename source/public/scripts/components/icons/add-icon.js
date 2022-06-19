import { createElement } from '../../reactive/create-element.js'

export const AddIcon = ({ svgProps, pathProps }) =>
  createElement(
    'svg',
    { width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', ...svgProps },
    createElement('path', {
      d: 'M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z',
      fill: 'currentColor',
      ...pathProps,
    })
  )
