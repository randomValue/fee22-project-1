import { createElement } from '../reactive/create-element.js'
import { ContentHeader } from './content-header.js'
import { Content } from './content.js'

export const NoteContent = () =>
  createElement('section', { class: 'note' }, createElement(ContentHeader), createElement(Content))
