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
export const loopThroughStates = (id, isEvent) => {
  if (needsUpdate.length === 0) {
    return
  }
  const foundIndex = needsUpdate.findIndex((entryId) => entryId === id)

  if (foundIndex > -1 && !isEvent) {
    if (foundIndex) {
      const node = mutables.Dom[id]
      node.render(node.function || { ...node.node, props: node.nextProps })
      needsUpdate.splice(foundIndex, 1)
    }
  } else if (isEvent) {
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
    cloneNeedsUpdate.forEach((updateId) => {
      const updateNode = mutables.Dom[updateId]
      if (updateNode) {
        updateNode.render(
          updateNode.function || { ...updateNode.node, props: updateNode.nextProps },
          id
        )
      }
      needsUpdate.length = 0
    })
  }
}
