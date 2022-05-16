import {mutables} from "./mutables.js";
import {buildVDom} from "./reactive.js";
import {domNode} from "./dom-node.js";

export const loopThroughChildren = (composition, currentNode) => {
    if (composition.children.length < currentNode.children.length) {
        const amount = currentNode.children.length - composition.children.length

        for (let i = 0; i < amount; i++) {
            const childId = currentNode.children[currentNode.children.length - 1 - i]
            const childNode = mutables.Dom[childId]
            currentNode.domNode.removeChild(childNode.domNode)
            delete mutables.Dom[childNode]
        }
        currentNode.children = currentNode.children.slice(0, -1)
    }
    composition.children.forEach((child, i) => {
        if (typeof child === "string" && child) {
            const textNode = currentNode.children[i]
            textNode.nodeValue && console.log(currentNode.children[i])
            if (textNode.nodeValue && textNode.nodeValue !== child) {
                textNode.nodeValue = child
            }
        }
        const node = mutables.Dom[currentNode.children[i]]

        if (!child && node?.node) {
            currentNode.domNode.removeChild(node.domNode)
            delete mutables.Dom[currentNode.children[i]]
            currentNode.children[i] = null
            return
        }
        if (!child) {
            return
        }
        if (currentNode.children[i] === null && child) {
            currentNode.children[i] = Math.round(Math.random() * Date.now() + i) + "_" + i
            buildVDom(child, currentNode.children[i], currentNode.domNode)
            return
        }
        if (child && node === undefined && typeof child !== 'string') {
            currentNode.children[i] = Math.round(Math.random() * Date.now()) + "_" + i
            buildVDom(child, currentNode.children[i], currentNode.domNode)
            return
        }
        if (node) {
            node.nextProps = child?.props || null
            if (!node.node && child) {
                const {element} = domNode(child)
                currentNode.domNode.insertBefore(element, currentNode.domNode.children[i + 1])
                node.domNode = element
            }
            node.render(child)
            node.node = child
        } else {
            currentNode.children[i].nodeValue = child
            if (!currentNode.node) {
                currentNode.domNode.insertBefore(currentNode.children[i], currentNode.children[i + 1])
            }
            return
        }

        if (currentNode.children[i].node) {
            currentNode.children[i].node = child
        }
    })
}