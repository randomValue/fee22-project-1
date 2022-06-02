import {mutables} from "./mutables.js";
import {buildVDom} from "./core.js";
import {domNode} from "./dom-node.js";

export const loopThroughChildren = (composition, currentNode) => {
    if (composition.children.length < currentNode.children.length) {
        const amount = currentNode.children.length - composition.children.length

        for (let i = 0; i < amount; i++) {
            const childId = currentNode.children[currentNode.children.length - 1 - i]
            const childNode = mutables.Dom[childId]
            childNode && currentNode.domNode.removeChild(childNode.domNode)
            delete mutables.Dom[childId]
        }
        currentNode.children = currentNode.children.slice(0, -1)
    }
    composition.children.forEach((child, i) => {
        const currentChild = currentNode.children[i]
        if ((typeof child === "string" || typeof child === "number") && child) {
            if (currentChild?.nodeValue && currentChild?.nodeValue !== child) {
                currentChild.nodeValue = child
            } else {
                const node = mutables.Dom[currentChild]
                if(node && node.domNode){
                    const textNode = document.createTextNode(child)
                    currentNode.domNode.insertBefore(textNode, node.domNode)
                    currentNode.domNode.removeChild(node.domNode)
                    delete mutables.Dom[currentChild]
                    currentNode.children[i] = textNode
                }
            }
            return;
        }
        const node = mutables.Dom[currentChild]

        if (!child && node?.node) {
            currentNode.domNode.removeChild(node.domNode)
            delete mutables.Dom[currentChild]
            currentNode.children[i] = null
            return
        }
        if (!child) {
            return
        }
        if ((currentChild === null && child) || (child && node === undefined && (typeof child !== 'string'))) {
            if(currentChild?.nodeType){
                currentNode.domNode.removeChild(currentChild)
            }
            currentNode.children[i] = currentNode.id + "_" + i
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
            const domChildren = currentNode.domNode.children
            if (domChildren[i] !== node.domNode) {
                currentNode.domNode.insertBefore(node.domNode, domChildren[i])
            }
            node.render(child)
        } else {
            if(!currentChild){
                buildVDom(child, currentNode.children[i], currentNode.domNode)
                return;
            }
            currentNode.children[i].nodeValue = child
            if (!currentNode.node) {
                currentNode.domNode.insertBefore(currentChild, currentNode.children[i + 1])
            }
            return
        }
    })
}