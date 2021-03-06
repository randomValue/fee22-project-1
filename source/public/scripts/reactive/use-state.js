import { mutables } from './mutables.js'
import { destructedElement } from './destructed-element.js'

export const needsUpdate = []
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
    node.nextState[index] =
      typeof state === 'function'
        ? state(destructedElement(node.state[index]))
        : destructedElement(state)
    const foundNeedUpdate = needsUpdate.find((nodeId) => nodeId === cachedIndex)
    if (!foundNeedUpdate) {
      needsUpdate.push(cachedIndex)
    }
    if (node && node.doneRendering && !mutables.isEventActive) {
      node.render(node.function || { ...node.node, props: node.nextProps }, node.id)
    }
  }
  return [returnState, setState]
}
