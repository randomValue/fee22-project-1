import {useState} from "./rective/use-state.js";
import {createElement} from "./rective/create-element.js";
import {render} from "./rective/reactive.js";

const mock = [1,2,3,4,5,6,7,8]


const CustomEl = ({isDisabled}) => {
    const [state, setState] = useState('blue')
    const [next, setNext] = useState(mock)


    return createElement('div', {
        ariaDisabled: state, onClick: () => {
            setState('green')
            next.pop()
            setNext(next)
        }
    }, next.map(item => createElement('h2', {style: `background-color: ${state}`}, `Child ${item}`)))
}

const App = () => {
    return createElement('div', {
        className: "black blue red",
        style: "background-color: red"
    }, createElement(CustomEl, {isDisabled: true}))
}

render(App, document.body)