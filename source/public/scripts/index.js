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
    const [active, setActive] = useState(0)
    const [next, setNext] = useState(mock)


    return createElement('div', {
        style: {padding: '20px;'},
        onMousedown: (e) => {
            refs.forEach((item, i) => {
                if (item === e.target) {
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
                for (const item of refs) {
                    const itemOffsetTop = item.getBoundingClientRect().y


                    if (itemOffsetTop > dragOffsetTop && item !== originElement) {
                        item.parentNode.insertBefore(originElement, item)
                        return
                    } else if (item === refs[refs.length - 1] && itemOffsetTop < dragOffsetTop) {
                        item.parentNode.insertBefore(originElement, item.nextSibling)
                    }
                }
            }
        },
        onMouseup: (e) => {
            if (!dragElement) {
                return
            }
            dragElement.style.transform = ``
            dragElement.remove()
            originElement.style.opacity = 1
            dragElement = undefined
        }
    }, createElement('button', {
        onClick: () => {
            next.push({prio: next.length + 1, text: 'Plus' + (next.length + 1)})
            setNext(next)
        }
    }, 'add'), createElement('button', {
        onClick: () => {
            next.pop()
            setNext(next)
        }
    }, 'remove'), next.map((item, i) => createElement('h2', {
        ref: (ref) => {
            refs[i] = ref
        },
        onClick: () => {
            setActive(i)
        }, style: {
            backgroundColor: `${active === i ? 'green' : 'red'}`,
        }
    }, `Test ${item.text}`, createElement('button', {
        what: next.length,
        onMouseDown: () => {
            if (i > 0) {
                const temp = next[i]
                next.splice(i, 1)
                next.splice(i - 1, 0, temp)
                next.map((item, index) => item.prio = index)
                setNext(next)
            }
        }
    }, 'higher Prio' + next.length))))
}

const App = () => {
    return createElement('div', {
        className: "black blue red",
        style: {backgroundColor: "red"}
    }, createElement(CustomEl, {isDisabled: true}))
}

render(App, document.body)