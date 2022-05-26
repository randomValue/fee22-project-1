import {createElement} from "../rective/create-element.js";
import {PrioElement} from "./prio-element.js";
import {useState} from "../rective/use-state.js";

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

export const ListItem = ({text, title, isActive, setIsActive, index}) => {
    return createElement('li', {class: `nav-item ${isActive ? 'nav-item-active' : ''}`},
        createElement('button', {
                class: `nav-button ${isActive ? 'nav-button-active' : ''}`,
                disabled: isActive ? true : undefined,
                onClick: () => {
                    setIsActive(index)
                }
            },
            createElement('span', {class: 'nav-button-text'},
                createElement('span', {class: 'nav-button-title'}, title),
                createElement('span', null, text)
            ),
            createElement(PrioElement, {prio: text})
        )
    )
}

export const List = ({data}) => {
    const [activeIndex, setActiveIndex] = useState(0)

    return createElement('ul', {class: 'nav-list'},
        data.map((item, index) => {
            return createElement(ListItem, {
                title: item.text,
                text: item.prio,
                key: `note-list-item-${index}`,
                isActive: activeIndex === index,
                index,
                setIsActive: setActiveIndex
            })
        })
    )
}

export const NoteList = ({data}) => {
    return createElement('nav', {class: 'nav'},
        createElement(List, {data})
    )
}

