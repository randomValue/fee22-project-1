import { createElement } from './reactive/create-element.js'
import { render } from './reactive/core.js'
import { SideNav } from './components/side-nav.js'
import { NoteContent } from './components/note-content.js'
import { backUpData, useActiveNote, useSnackbar, useStore } from './store.js'
import { useEffect } from './reactive/use-effect.js'
import { useRouter } from './reactive/use-router.js'
import { readNote } from './fetch/read-note.js'
import { Snackbar } from './components/snackbar.js'

const App = () => {
  const [data, setData] = useStore()
  const [, setActiveNote] = useActiveNote()
  const { queries } = useRouter()
  const [, setSnackbar] = useSnackbar()

  useEffect(async () => {
    await readNote()
      .then((res) => {
        if (res.status >= 400) {
          setSnackbar({ text: res.message, type: 'error' })
          return
        }
        setData(res)
        backUpData.default.push(...res)
        const foundNote = res.find((entry) => entry.id.toString() === queries[0])
        setActiveNote(foundNote)
      })
      .catch((e) => {
        setSnackbar({ text: e.message, type: 'error' })
      })
  }, [])

  useEffect(() => {
    const foundNote = data.find((entry) => entry.id.toString() === queries[0])
    setActiveNote(foundNote)
  }, [queries])

  return createElement(
    'main',
    {
      class: 'main',
    },
    createElement(SideNav),
    createElement(NoteContent, null),
    createElement(Snackbar)
  )
}
const app = document.querySelector('#app')

render(App, app)
