import { createElement } from '../reactive/create-element.js'
import { useActiveNote } from '../store.js'

export const Content = () => {
  const [activeNote] = useActiveNote()
  return createElement(
    'article',
    { class: 'note-content' },
    createElement('h1', { class: 'note-title' }, activeNote.title),
    createElement('p', { class: 'note-text' }, activeNote.text)
  )
}
