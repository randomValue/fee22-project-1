import {createElement} from "../rective/create-element.js";
import {SearchContainer} from "./search-container.js";
import {NoteList} from "./note-list.js";
import {backUpData, useStore} from "../index.js";

export const SideNav = () => {
    const [data, setStore] = useStore()
    return createElement('div', {class: 'side-nav'},
        createElement(SearchContainer),
        createElement('div', {class: 'add-button-container'},
            createElement('button', {
                    class: 'button-base add-button', onClick: () => {
                        backUpData.default.push({...backUpData.default[0], prio: backUpData.default.length+1, text: `Hello ${backUpData.default.length+1}`})
                        setStore([...backUpData.default])
                    }
                },
                createElement('svg', {width: "24", height: "24", viewBox: "0 0 24 24", fill: "none"},
                    createElement('path', {d: "M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z", fill: "white"})
                )
            )
        ),
        createElement(NoteList)
    )
}