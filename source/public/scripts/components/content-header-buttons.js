import { createElement } from '../rective/create-element.js'

export const ContentHeaderButtons = () =>
  createElement(
    'div',
    { class: 'header-actions' },
    createElement(
      'button',
      { class: 'button-base icon-button-small button-rounded edit-button' },
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
    ),
    createElement(
      'button',
      {
        class:
          'button-base button-outline icon-button-small button-rounded done-button',
      },
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
    ),
    createElement(
      'button',
      { class: 'button-base icon-button-small button-rounded delete-button' },
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
    )
  )
