import {createElement} from "./rective/create-element.js";
import {render} from "./rective/reactive.js";
import {SideNav} from "./components/side-nav.js";
import {NoteContent} from "./components/note-content.js";

const mock = [
    {prio: 1, text: 'Hello 1'},
    {prio: 2, text: 'Hello 2'},
    {prio: 3, text: 'Hello 3'},
    {prio: 4, text: 'Hello 4'},
    {prio: 5, text: 'Hello 5'},
    {prio: 6, text: 'Hello 6'},
    {prio: 7, text: 'Hello 7'},
    {prio: 8, text: 'Hello 8'}
]

const refs = []
let dragElement = undefined
let drag = {start: {x: 0, y: 0}, end: 0}
let dragElementPos = 0
let dragIndex = 0
let originElement = undefined


const App = () => {
    return createElement('main', {
        class: "main",
    }, createElement(SideNav, null), createElement(NoteContent, null))
}

const app = document.querySelector('#app')

render(App, app)