import { mutables } from './mutables.js'
import { vNode } from './v-node.js'
import { domNode } from './dom-node.js'
import { createRef } from './create-ref.js'

export const buildVDom = (virtualNode, id, parentNode, parentId) => {
  if (typeof virtualNode === 'string' || typeof virtualNode === 'number' || !virtualNode) {
    return
  }
  const node = { ...vNode }
  if (!id) {
    node.id = mutables.identifier
  } else {
    node.id = id
    mutables.identifier = id
  }
  mutables.Dom = { ...mutables.Dom, [node.id]: node }
  node.state = []
  node.nextState = []
  node.children = []
  node.props = { ...virtualNode.props }
  node.nextProps = { ...virtualNode.props }
  node.parentId = parentId

  if (typeof virtualNode === 'function') {
    node.function = virtualNode
  } else if (typeof virtualNode.type === 'function') {
    node.function = virtualNode.type
  }

  const { node: createdNode, element } = domNode(virtualNode)

  node.doneRendering = true

  createRef(createdNode, element)

  node.node = createdNode
  node.domNode = element

  parentNode.appendChild(element)

  createdNode?.children
    ?.filter((child) => !!child)
    .forEach((child, i) => {
      if (!child) {
        node.children[i] = false
        return
      }
      if (typeof child === 'string' || typeof child === 'number') {
        const textElement = document.createTextNode(child)
        element.appendChild(textElement)
        node.children[i] = textElement
        return
      }
      const childId = `${node.id}_${i}`
      mutables.identifier = childId
      node.children[i] = childId
      buildVDom(child, childId, element, node.parentId)
    })
  return mutables.Dom
}

export const render = (element, container) => {
  buildVDom(element, null, container)
  mutables.isInitial = false
}
