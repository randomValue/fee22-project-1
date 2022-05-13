import {identifier} from "./mutables.js";
import {isSame} from "./is-same.js";

const vNode = {
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
        identifier = this.id
        const sameState = isSame(this.state[cachedIndex], this.nextState[cachedIndex])
        const sameProps = isSame(this.props, this.nextProps)
        if (!sameState || !sameProps) {
            this.nextState.forEach((entry, index) => {
                this.state[index] = entry
            })
            this.cachedIndex = 0
            this.cachedEffects = 0
            const composition = typeof Comp === "function" ? Comp(this.props) : Comp
            this.cachedIndex = cachedIndex

        }
    }
}