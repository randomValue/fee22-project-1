import { mutables } from './mutables.js'

export const deleteChildren = (currentChild, parentNode, i) => {
  const node = mutables.Dom[currentChild]

  if (parentNode?.domNode && node) {
    parentNode.domNode.removeChild(node.domNode)
  }

  node?.children?.forEach((child, childId) => {
    if (typeof child === 'object') {
      if (node.domNode?.childNodes.length) {
        node.domNode.removeChild(child)
      }
      node.children[childId] = null
      return
    }
    deleteChildren(child, node, childId)
  })
  if (node) {
    node.domNode = undefined
  }

  delete mutables.Dom[currentChild]
  if (parentNode && i !== undefined) {
    parentNode.children[i] = null
  }
}
