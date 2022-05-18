import {mutables} from "./mutables.js";
import {isSame} from "./is-same.js";
import {loopThroughChildren} from "./loop-through-children.js";
import {createAttributes} from "./create-attributes.js";
import {createEvents} from "./create-events.js";


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

            createAttributes(composition.props, this.domNode)
            createEvents(composition.synth, this.domNode, this.node)
            loopThroughChildren(composition, this)
        }
    }
}