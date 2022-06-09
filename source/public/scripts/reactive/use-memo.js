import { isSame } from './is-same.js'
import { mutables } from './mutables.js'
import { destructedElement } from './destructed-element.js'

export const useMemo = (callback, deps) => {
  const cachedIdentifier = mutables.identifier
  const node = mutables.Dom[mutables.identifier]

  const index = node.cachedMemos
  node.cachedMemos += 1
  if (node.prevMemoDeps === undefined) {
    node.prevMemoDeps = []
  }
  const sameDeps = deps.reduce((acc, item, i) => {
    if (!isSame(node.prevMemoDeps[index]?.[i], item)) {
      return false
    }
    return acc
  }, true)
  if (!sameDeps || !node.prevMemoDeps[index] || mutables.isInitial) {
    if (!node.prevMemoDeps[index]) {
      node.prevMemoDeps[index] = []
    }
    if (node.memos === undefined) {
      node.memos = []
    }
    deps.forEach((item, i) => {
      node.prevMemoDeps[index][i] = destructedElement(item)
    })
    if (!node.memos || node.memos.length <= index) {
      node.memos.push(destructedElement(callback()))
    } else {
      node.memos[index] = destructedElement(callback())
    }
  }
  mutables.identifier = cachedIdentifier
  return node.memos[index]
}
