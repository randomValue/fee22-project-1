import {useState} from "./rective/use-state.js";
import {createElement} from "./rective/create-element.js";
import {render} from "./rective/reactive.js";


const CustomEl = ({isDisabled}) => {
    const [state, setState] = useState('blue')
    const [next, setNext] = useState('You')


    return createElement('div', {
        ariaDisabled: state, onClick: () => {
            setNext("Wohooo")
            setState('green')
            setTimeout(() => {
                setNext("Rocken-Roll")
                setState('blue')
            }, 1000)
        }
    }, state === "blue" ? createElement('h2', {style: `background-color: ${state}`}, `${state} ${next}`) : null)
}

const App = () => {
    return createElement('div', {
        className: "black blue red",
        style: "background-color: red"
    }, createElement(CustomEl, {isDisabled: true}))
}

render(App, document.body)