import { needsUpdate } from './use-state.js'
import { mutables } from './mutables.js'

const loopThroughIds = (a, b) => {
  if (a.length < b.length) {
    return loopThroughIds(b, a)
  }
  let isLarger
  a.find((entry, i) => {
    if (!b[i]) {
      isLarger = a
      return true
    }
    if (entry > b[i]) {
      isLarger = a
      return true
    }
    if (entry < b[i]) {
      isLarger = b
      return true
    }
    return false
  })
  return isLarger
}

export const loopThroughStates = () => {
  if (needsUpdate.length === 0) {
    return
  }
  const cloneNeedsUpdate = [...needsUpdate].sort((a, b) => {
    const splitA = a.toString().split(/[_]/g)
    const splitB = b.toString().split(/[_]/g)
    const isLarger = loopThroughIds(splitB, splitA)

    if (isLarger === splitB) {
      return -1
    }
    if (isLarger === splitA) {
      return 1
    }
    return 0
  })
  cloneNeedsUpdate.forEach((id) => {
    const updateNode = mutables.Dom[id]
    if (updateNode) {
      updateNode.render(updateNode.function, id)
    }
  })
  needsUpdate.length = 0
}
