export const createRef = (node, element) => {
    if (typeof node.ref === "function") {
        node.ref(element)
    } else {
        node.ref = element
    }
}