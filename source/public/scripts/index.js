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
    {prio: 7, text: 'Hello 8'},
    {prio: 8, text: 'Hello 8'}
]


const CustomEl = ({isDisabled}) => {
    const [active, setActive] = useState(0)
    const [next, setNext] = useState(mock)

    return createElement('div', null, createElement('button', {
        onClick: () => {
            next.push({prio: next.length, text: 'Plus 1'})
            setNext(next)
        }
    }, 'add'), createElement('button', {
        onClick: () => {
            next.pop()
            setNext(next)
        }
    }, 'remove'), next.map((item, i) => createElement('h2', {
        onClick: () => {
            setActive(i)
        }, style: `background-color: ${active === i ? 'green' : 'red'}`
    }, `Test ${item.text}`, createElement('button', {
        onClick: () => {
            if (i > 0) {
                console.log(next[i].prio)
                next[i].prio = next[i].prio - 1
                next[i - 1].prio = next[i - 1].prio + 1
                const sorted = next.sort((prev, next) => prev.prio - next.prio)
                setNext(sorted)
            }
        }
    }, 'higher Prio'))))
}

const App = () => {
    return createElement('div', {
        className: "black blue red",
        style: "background-color: red"
    }, createElement(CustomEl, {isDisabled: true}))
}

render(App, document.body)