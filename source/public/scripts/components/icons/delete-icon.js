import { createElement } from '../../reactive/create-element.js'

export const DeleteIcon = () =>
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
      d: 'M10.6667 6V12.6667H5.33334V6H10.6667ZM9.66668 2H6.33334L5.66668 2.66667H3.33334V4H12.6667V2.66667H10.3333L9.66668 2ZM12 4.66667H4.00001V12.6667C4.00001 13.4 4.60001 14 5.33334 14H10.6667C11.4 14 12 13.4 12 12.6667V4.66667Z',
      fill: 'currentColor',
    })
  )
