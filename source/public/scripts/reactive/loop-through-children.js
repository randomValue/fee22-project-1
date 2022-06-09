import { mutables } from './mutables.js'
import { buildVDom } from './core.js'
import { domNode } from './dom-node.js'
import { isSame } from './is-same.js'
import { destructedElement } from './destructed-element.js'

const deleteChildren = (currentChild, parentNode, i) => {
  const node = mutables.Dom[currentChild]

  if (parentNode?.domNode && node) {
    parentNode.domNode.removeChild(node.domNode)
  }

  node?.children?.forEach((child, childId) => {
    if (typeof child === 'object') {
      node.domNode.removeChild(child)
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

export const loopThroughChildren = (composition, parentNode) => {
  if (composition.children.length < parentNode.children.length) {
    parentNode.children = parentNode.children.filter((childId, i) => {
      const childNode = mutables.Dom[childId]
      const foundChild = composition.children.find((child) => isSame(child, childNode?.node))
      if (!foundChild) {
        deleteChildren(childId, parentNode)
      }
      return foundChild
    })
  }
  composition.children.forEach((child, i) => {
    const currentChild = parentNode.children[i]
    if ((typeof child === 'string' || typeof child === 'number') && child) {
      if (currentChild?.nodeValue && currentChild?.nodeValue !== child) {
        currentChild.nodeValue = child
      } else {
        const node = mutables.Dom[currentChild]
        if (node && node.domNode) {
          const textNode = document.createTextNode(child)
          parentNode.domNode.insertBefore(textNode, node.domNode)
          parentNode.domNode.removeChild(node.domNode)
          delete mutables.Dom[currentChild]
          parentNode.children[i] = textNode
        }
      }
      return
    }
    const node = mutables.Dom[currentChild]
    if (!child && node?.node) {
      deleteChildren(currentChild, parentNode, i)
      return
    }
    if (!child) {
      return
    }
    if ((!currentChild && child) || (child && !node && typeof child !== 'string')) {
      if (currentChild?.nodeType && parentNode.domNode === parentNode.oldDomNode) {
        parentNode.domNode.removeChild(currentChild)
      }
      parentNode.children[i] = `${parentNode.id}_${i}`
      buildVDom(child, parentNode.children[i], parentNode.domNode)
      return
    }
    if (node) {
      node.nextProps = child?.props || null
      if (!node.node && child) {
        const { element } = domNode(child)
        parentNode.domNode.insertBefore(element, parentNode.domNode.children[i + 1])
        node.domNode = element
      }
      const domChildren = parentNode.domNode.children
      if (domChildren[i] !== node.domNode) {
        parentNode.domNode.insertBefore(node.domNode, domChildren[i])
      }
      if (!isSame(node.node, child)) {
        node.render(child)
      }
    } else {
      if (!currentChild) {
        buildVDom(child, parentNode.children[i], parentNode.domNode)
        return
      }
      parentNode.children[i].nodeValue = child
      if (!composition) {
        parentNode.domNode.insertBefore(currentChild, parentNode.children[i + 1])
      }
    }
  })
}
