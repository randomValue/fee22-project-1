import { isSame } from './is-same.js'
import { mutables } from './mutables.js'
import { destructedElement } from './destructed-element.js'

export const useEffect = (callback, deps) => {
  const node = mutables.Dom[mutables.identifier]
  const index = node.cachedEffects
  node.cachedEffects += 1
  if (node.prevDeps === undefined) {
    node.prevDeps = []
  }
  const sameDeps = deps.reduce((acc, item, i) => {
    if (!isSame(node.prevDeps[index]?.[i], item)) {
      return false
    }
    return acc
  }, true)
  if (!sameDeps || !node.prevDeps[index]) {
    if (!node.prevDeps[index]) {
      node.prevDeps[index] = []
    }
    deps.forEach((item, i) => {
      node.prevDeps[index][i] = destructedElement(item)
    })
    callback()
  }
}
