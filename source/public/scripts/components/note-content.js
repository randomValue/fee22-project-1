import { createElement } from '../reactive/create-element.js'
import { ContentHeader } from './content-header.js'
import { Content } from './content.js'
import { useActiveNote } from '../store.js'

export const NoteContent = () => {
  const [activeNote] = useActiveNote()

  return createElement(
    'section',
    { class: 'note' },
    activeNote && createElement(ContentHeader),
    activeNote && createElement(Content)
  )
}
