import { createElement } from '../../reactive/create-element.js'

export const EditIcon = () =>
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
      d: 'M9.37251 6.01333L9.98584 6.62667L3.94584 12.6667H3.33251V12.0533L9.37251 6.01333ZM11.7725 2C11.6058 2 11.4325 2.06667 11.3058 2.19333L10.0858 3.41333L12.5858 5.91333L13.8058 4.69333C14.0658 4.43333 14.0658 4.01333 13.8058 3.75333L12.2458 2.19333C12.1125 2.06 11.9458 2 11.7725 2ZM9.37251 4.12667L1.99918 11.5V14H4.49918L11.8725 6.62667L9.37251 4.12667Z',
      fill: 'currentColor',
    })
  )
