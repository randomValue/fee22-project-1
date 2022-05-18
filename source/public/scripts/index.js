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


const CustomEl = ({isDisabled}) => {
    const [active, setActive] = useState(0)
    const [next, setNext] = useState(mock)


    return createElement('div', null, createElement('button', {
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
        onClick: () => {
            setActive(i)
        }, style: `background-color: ${active === i ? 'green' : 'red'}`
    }, `Test ${item.text}`, createElement('button', {
        what: next.length,
        onClick: () => {
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
        style: "background-color: red"
    }, createElement(CustomEl, {isDisabled: true}))
}

render(App, document.body)