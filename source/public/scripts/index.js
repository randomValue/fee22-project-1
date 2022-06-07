import { createElement } from './reactive/create-element.js'
import { render } from './reactive/core.js'
import { SideNav } from './components/side-nav.js'
import { NoteContent } from './components/note-content.js'
import { useStore } from './store.js'
import { useEffect } from './reactive/use-effect.js'

const App = () => {
  const [, setData] = useStore()

  useEffect(async () => {
    await fetch('/api/mock')
      .then((r) => r.json())
      .then((data) => {
        setData(data)
      })
  }, [])

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
