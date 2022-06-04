import { mutables } from './mutables.js'
import { destructedElement } from './destructed-element.js'

export const useState = (initialState) => {
  const node = mutables.Dom[mutables.identifier]
  const index = node.cachedIndex
  node.cachedIndex += 1
  let returnState
  if (!node.state || node.state.length <= index) {
    node.nextState.push(destructedElement(initialState))
    node.state.push(destructedElement(initialState))
    returnState = destructedElement(initialState)
  } else {
    returnState = destructedElement(node.state[index])
  }
  const setState = (state) => {
    node.nextState[index] =
      typeof state === 'function' ? state(node.state[index]) : state
    node.render(node.function, index)
  }
  return [returnState, setState]
}
