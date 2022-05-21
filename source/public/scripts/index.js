import {useState} from "./rective/use-state.js";
import {createElement} from "./rective/create-element.js";
import {render} from "./rective/reactive.js";

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


const CustomEl = ({isDisabled}) => {
    const [list, setList] = useState(mock)
    const [active, setActive] = useState(0)


    return createElement('div', {
        style: {padding: '20px;', userSelect: active ? 'none' : 'auto'},
        onMousedown: (e) => {
            refs.forEach((item, i) => {
                if (item === e.target) {
                    setActive(true)
                    dragElement = e.target.cloneNode(true)
                    dragElement.style.position = "absolute"
                    dragElement.style.left = 0
                    dragElement.style.top = 0
                    dragElement.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
                    document.body.appendChild(dragElement)
                    dragElementPos = item.offsetTop
                    drag.start = {x: e.clientX, y: e.clientY}
                    dragIndex = i
                    originElement = e.target
                    originElement.style.opacity = 0
                }
            })
        },
        onMousemove: (e) => {
            const offset = {x: e.clientX, y: e.clientY}
            if (dragElement) {
                dragElement.style.transform = `translate3d(${offset.x}px,${offset.y}px,0)`
                const dragOffsetTop = dragElement.getBoundingClientRect().y
                const children = originElement.parentElement.children
                for (const item of children) {
                    const itemOffsetTop = item.getBoundingClientRect().y


                    if (itemOffsetTop > dragOffsetTop && item !== originElement) {
                        item.parentNode.insertBefore(originElement, item)
                        return
                    } else if (item === children[children.length - 1] && itemOffsetTop < dragOffsetTop) {
                        item.parentNode.insertBefore(originElement, item.nextSibling)
                    }
                }
            }
        },
        onMouseup: (e) => {
            if (!dragElement) {
                return
            }
            const children = Array.from(originElement.parentElement.children)

            const sortNext = []

            children.forEach((item, index) => {
                const foundIndex = refs.findIndex(ref => ref === item)
                foundIndex > -1 && sortNext.push(list[foundIndex])
            })

            dragElement.style.transform = ``
            dragElement.remove()
            originElement.style.removeProperty('opacity')
            dragElement = undefined

            setList(sortNext)
            setActive(false)
        }
    }, createElement('button', {
        onClick: () => {
            list.push({prio: list.length + 1, text: 'Plus' + (list.length + 1)})
            setList(list)
        }
    }, 'add'), createElement('button', {
        onClick: () => {
            list.pop()
            setList(list)
        }
    }, 'remove'), list.map((item, i) => {
        return createElement('h2', {
            key: `list_${i}`,
            ref: (ref) => {
                refs[i] = ref
            }
        }, `Test ${item.text}`, createElement('button', {
            what: list.length,
            onClick: () => {
                if (i > 0) {
                    const temp = list[i]
                    list.splice(i, 1)
                    list.splice(i - 1, 0, temp)
                    list.map((item, index) => item.prio = index)
                    setList(list)
                }
            }
        }, 'higher Prio'))
    }))
}

const App = () => {
    return createElement('div', {
        className: "black blue red",
        style: {backgroundColor: "red"}
    }, createElement(CustomEl, {isDisabled: true}))
}

render(App, document.body)