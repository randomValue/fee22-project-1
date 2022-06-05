import { mutables } from './mutables.js'
import { destructedElement } from './destructed-element.js'
import { isSame } from './is-same.js'

export const useState = (initialState) => {
  const cachedIndex = mutables.identifier
  const cachedNode = mutables.Dom[cachedIndex]
  const index = cachedNode.cachedIndex
  cachedNode.cachedIndex += 1
  let returnState
  if (!cachedNode.state || cachedNode.state.length <= index) {
    cachedNode.nextState.push(destructedElement(initialState))
    cachedNode.state.push(destructedElement(initialState))
    returnState = destructedElement(initialState)
  } else {
    returnState = destructedElement(cachedNode.state[index])
  }
  const setState = (state) => {
    const node = mutables.Dom[cachedIndex]
    node.nextState[index] = typeof state === 'function' ? state(node.state[index]) : state
    if (!mutables.isInitial) {
      isSame(node.state, node.nextState)
      node.render(node.function, index)
    }
  }
  return [returnState, setState]
}
