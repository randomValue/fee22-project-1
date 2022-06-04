import { createElement } from '../../rective/create-element.js'

export const AddIcon = () =>
  createElement(
    'svg',
    { width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none' },
    createElement('path', {
      d: 'M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z',
      fill: 'white',
    })
  )
