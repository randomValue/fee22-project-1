import {mutables} from "./mutables.js";
import {isSame} from "./is-same.js";
import {domNode} from "./dom-node.js";
import {buildVDom} from "./reactive.js";


export const vNode = {
    state: undefined,
    nextState: undefined,
    cachedIndex: 0,
    id: undefined,
    props: undefined,
    nextProps: undefined,
    node: undefined,
    domNode: undefined,
    children: undefined,
    function: undefined,
    prevDeps: undefined,
    cachedEffects: 0,
    render: function (Comp, cachedIndex) {
        mutables.identifier = this.id
        const sameState = isSame(this.state[cachedIndex], this.nextState[cachedIndex])
        const sameProps = isSame(this.props, this.nextProps)
        let sameNode = true
        if (typeof Comp !== "function") {
            sameNode = isSame(this.node, Comp)
        }
        if (Comp && (!sameState || !sameProps || !sameNode)) {
            this.nextState.forEach((entry, index) => {
                    if (Array.isArray(entry)) {
                        this.state[index] = [...entry]
                        return
                    }
                    if (typeof entry === 'object' &&
                        !Array.isArray(entry) &&
                        entry !== null) {
                        this.state[index] = {...entry}
                        return
                    }
                    this.state[index] = entry
                }
            )
            this.cachedIndex = 0
            this.cachedEffects = 0
            this.props = this.nextProps
            const composition = typeof Comp === "function" ? Comp(this.props) : Comp
            this.cachedIndex = cachedIndex

            Object.entries(composition.props || {}).forEach(([key, value]) => {
                this.domNode.setAttribute(key, value)
            })
            if (composition.children.length < this.children.length) {
                const amount = this.children.length - composition.children.length

                for(let i = 0; i < amount; i++){
                    const childId = this.children[this.children.length - 1 - i]
                    const childNode = mutables.Dom[childId]
                    this.domNode.removeChild(childNode.domNode)
                    delete mutables.Dom[childNode]
                }
                this.children = this.children.slice(0, -1)
            }
            composition.children.forEach((child, i) => {
                const node = mutables.Dom[this.children[i]]
                if (!child && node?.node) {
                    this.domNode.removeChild(node.domNode)
                    delete mutables.Dom[this.children[i]]
                    this.children[i] = null
                    return
                }
                if (!child) {
                    return
                }
                if (this.children[i] === null && child) {
                    this.children[i] = Math.random() * Date.now() + i
                    buildVDom(child, this.children[i], this.domNode)
                    return
                }
                if (node) {
                    node.nextProps = child?.props || null
                    if (!node.node && child) {
                        const {element} = domNode(child)
                        this.domNode.insertBefore(element, this.domNode.children[i + 1])
                        node.domNode = element
                    }
                    node.render(child)
                    node.node = child
                } else {
                    this.children[i].nodeValue = child
                    if (!this.node) {
                        this.domNode.insertBefore(this.children[i], this.children[i + 1])
                    }
                    return
                }

                if (this.children[i].node) {
                    this.children[i].node = child
                }
            })

        }
    }
}