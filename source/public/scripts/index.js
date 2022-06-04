import { createElement } from './rective/create-element.js'
import { render } from './rective/core.js'
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
