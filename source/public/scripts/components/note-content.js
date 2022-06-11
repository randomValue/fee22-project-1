import { createElement } from '../reactive/create-element.js'
import { ContentHeader } from './content-header.js'
import { Content } from './content.js'
import { useActiveNote } from '../store.js'
import { useRouter } from '../reactive/use-router.js'
import { Form } from './form.js'

export const NoteContent = () => {
  const [activeNote, setActiveNote] = useActiveNote()
  const { queries, push } = useRouter()

  const [, edit] = queries

  return createElement(
    'section',
    { class: 'note' },
    createElement(ContentHeader, {
      activeNote,
      isEditMode: !!edit?.match(/edit/),
      isNewMode: !!edit?.match('create-new'),
      routerPush: push,
      queries,
      setActiveNote,
    }),
    activeNote && edit === undefined && createElement(Content, { activeNote }),
    !!edit?.match(/(edit|create-new)/) &&
      createElement(Form, { activeNote, setActiveNote, routerPush: push })
  )
}
