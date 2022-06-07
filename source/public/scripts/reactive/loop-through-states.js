import { needsUpdate } from './use-state.js'
import { mutables } from './mutables.js'

const loopThroughIds = (a, b) => {
  if (a.length < b.length) {
    return loopThroughIds(b, a)
  }
  let isLarger
  a.find((entry, i) => {
    if (!b[i]) {
      isLarger = false
      return true
    }
    if (entry > b[i]) {
      isLarger = true
      return true
    }
    if (entry < b[i]) {
      return true
    }
    return false
  })
  if (isLarger) {
    return a
  }
  if (isLarger === false) {
    return b
  }
  return isLarger
}

export const loopThroughStates = () => {
  if (needsUpdate.length === 0) {
    return
  }
  const cloneNeedsUpdate = [...needsUpdate].sort((a, b) => {
    const splitA = a.toString().split(/[_]/g)
    const splitB = b.toString().split(/[_]/g)
    const largerId = loopThroughIds(splitB, splitA)
    if (largerId === splitB) {
      return 1
    }
    if (largerId === splitA) {
      return -1
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
