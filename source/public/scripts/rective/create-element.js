import {mutables} from './mutables.js'

export const createElement = (element, props, ...children) => {
    const splitProps = Object.entries(props || {}).reduce((acc, [key, entry]) => {
        if (typeof entry === "function") {
            acc.synth[key] = entry
        } else {
            acc.props[key] = entry
        }
        return acc
    }, {props: {}, synth: {}})

    return {
        type: element,
        props: splitProps.props,
        synth: splitProps.synth,
        children: children.flat()
    }
}