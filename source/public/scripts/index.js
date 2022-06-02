import {createElement} from "./rective/create-element.js";
import {render} from "./rective/core.js";
import {SideNav} from "./components/side-nav.js";
import {NoteContent} from "./components/note-content.js";
import {create} from "./rective/store.js";
import {mock} from "./mock.js";


export const useStore = create([])

export const useActiveNote = create(mock[0])

export const backUpData = {default: [...mock]}

const App = () => {
    return createElement('main', {
        class: "main",
    }, createElement(SideNav), createElement(NoteContent, null))
}

const app = document.querySelector('#app')

render(App, app)
