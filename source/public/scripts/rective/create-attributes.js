export const createAttributes = (props, node) => {
    Object.entries(props || {}).forEach(([key, value]) => {
        node.setAttribute(key, value)
    })
}