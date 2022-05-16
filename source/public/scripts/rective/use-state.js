import {mutables} from "./mutables.js";
import {destructedElement} from "./destructed-element.js";

export const useState = (initialState) => {
    const node = mutables.Dom[mutables.identifier]
    const index = node.cachedIndex
    node.cachedIndex++
    let returnState
    if (!node.state || node.state.length <= index) {
        node.nextState.push(destructedElement(initialState))
        node.state.push(destructedElement(initialState))
        returnState = destructedElement(initialState)
    } else {
        const destructState = destructedElement(node.state[index])
        returnState = destructState
    }
    const setState = (state) => {
        node.nextState[index] = state
        node.render(node.function, index)
    }
    return [returnState, setState]
}