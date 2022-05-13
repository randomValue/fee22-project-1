import {mutables} from "./mutables.js";

export const useState = (initialState) => {
    const node = mutables.Dom[mutables.identifier]
    const index = node.cachedIndex
    node.cachedIndex++
    if (!node.state || node.state[index] === undefined) {
        node.nextState.push(initialState)
        node.state.push(initialState)
    }
    const setState = (state) => {
        node.nextState[index] = state
        node.render(node.function, index)
    }
    return [node.state[index], setState]
}