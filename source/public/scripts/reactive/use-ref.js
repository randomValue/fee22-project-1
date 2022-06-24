import { mutables } from './mutables.js'

export const useRef = (state) => {
  const node = mutables.Dom[mutables.identifier]
  const cachedId = node.cachedRefs
  if (node.refs === undefined) {
    node.refs = []
  }
  if (node.refs.length < cachedId + 1) {
    node.refs.push({ current: state })
  }
  node.cachedRefs += 1
  return node.refs[cachedId]
}
