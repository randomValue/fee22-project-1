import { createElement } from './reactive/create-element.js'
import { render } from './reactive/core.js'
import { SideNav } from './components/side-nav.js'
import { NoteContent } from './components/note-content.js'

const App = () =>
  createElement(
    'main',
    {
      class: 'main',
    },
    createElement(SideNav),
    createElement(NoteContent, null)
  )

const app = document.querySelector('#app')

render(App, app)
