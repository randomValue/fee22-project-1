import {identifier} from './mutables.js'

export const createElement = (element, props, ...children) => {
    const id = identifier
    if (vDom[id]?.domNode !== undefined) {
        return
    }
    return {
        type: element,
        props,
        children: children.flat()
    }
}