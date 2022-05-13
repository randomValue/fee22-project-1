export const domNode = (node) => {
    let createdNode = node
    if (typeof node === "function") {
        createdNode = node()
    } else if (typeof node.type === "function") {
        createdNode = node.type({...node.props, children: node.children})
    } else if (typeof node.type === 'string') {
        createdNode = node
    }
    let element
    if (createdNode.type) {
        element = document.createElement(createdNode.type)
    }
    Object.entries(createdNode.props || {}).forEach(([key, value]) => {
        element.setAttribute(key, value)
    })
    Object.entries(createdNode.synth || {}).forEach(([key, value]) => {
        const handler = key.replace("on", "")
        element.addEventListener(handler.toLowerCase(), value)
    })
    return {node: createdNode, element}
}