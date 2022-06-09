import { createElement } from '../reactive/create-element.js'
import { ContentHeader } from './content-header.js'
import { Content } from './content.js'
import { useActiveNote } from '../store.js'
import { useRouter } from '../reactive/use-router.js'
import { Form } from './form.js'

export const NoteContent = () => {
  const [activeNote] = useActiveNote()
  const { queries } = useRouter()

  const [, edit] = queries

  return createElement(
    'section',
    { class: 'note' },
    createElement(ContentHeader, {
      activeNote,
      isEditMode: !!edit?.match(/edit/),
      isNewMode: !!edit?.match('create-new'),
    }),
    activeNote && edit === undefined && createElement(Content),
    !!edit?.match(/(edit|create-new)/) && createElement(Form)
  )
}
