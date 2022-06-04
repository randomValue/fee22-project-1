export const createRef = (node, element) => {
  if (node.ref === undefined) {
    return
  }
  if (typeof node.ref === 'function') {
    node.ref(element)
  } else {
    node.ref = element
  }
}
