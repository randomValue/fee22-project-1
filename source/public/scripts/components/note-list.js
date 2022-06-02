import {createElement} from "../rective/create-element.js";
import {PrioElement} from "./prio-element.js";
import {useState} from "../rective/use-state.js";
import {useActiveNote, useStore} from "../index.js";
import {useEffect} from "../rective/use-effect.js";


export const ListItem = ({subtitle, title, prio, isActive, setIsActive, index}) => {
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
                createElement('span', null, subtitle)
            ),
            createElement(PrioElement, {prio})
        )
    )
}

export const List = () => {
    const [data] = useStore()
    const [, setActiveNote] = useActiveNote()

    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        setActiveNote(data[activeIndex])
    }, [activeIndex])

    return createElement('ul', {class: 'nav-list'},
        data.map((item, index) => {
            return createElement(ListItem, {
                title: item.title,
                subtitle: item.subtitle,
                prio: item.prio,
                key: `note-list-item-${index}`,
                isActive: activeIndex === index,
                index,
                setIsActive: setActiveIndex
            })
        }),data.length === 0 && 'Leider nichts gefunden',
    )
}

export const NoteList = () => {
    return createElement('nav', {class: 'nav'},
        createElement(List)
    )
}

