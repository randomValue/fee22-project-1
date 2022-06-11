import { createElement } from '../reactive/create-element.js'

export const Content = ({ activeNote }) => {
  return createElement(
    'article',
    { class: 'note-content' },
    createElement('h1', { class: 'note-title' }, activeNote?.title),
    createElement('p', { class: 'note-text' }, activeNote?.text)
  )
}
