import { createElement } from './reactive/create-element.js'
import { render } from './reactive/core.js'
import { SideNav } from './components/side-nav.js'
import { NoteContent } from './components/note-content.js'
import { backUpData, useActiveNote, useStore } from './store.js'
import { useEffect } from './reactive/use-effect.js'
import { useRouter } from './reactive/use-router.js'

const App = () => {
  const [data, setData] = useStore()
  const [, setActiveNote] = useActiveNote()

  const { queries } = useRouter()

  useEffect(async () => {
    await fetch('/api/mock')
      .then((r) => r.json())
      .then((response) => {
        setData(response)
        backUpData.default.push(...response)
        const foundNote = response.find((entry) => entry.id.toString() === queries[0])
        setActiveNote(foundNote)
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
    createElement(NoteContent, null)
  )
}
const app = document.querySelector('#app')

render(App, app)
