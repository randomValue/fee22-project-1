export const createElement = (element, props, ...children) => {
    const splitProps = Object.entries(props || {}).reduce((acc, [key, entry]) => {
        if (key.match(/^on\D./gm)) {
            acc.synth[key] = entry
        } else if (key === 'key') {
            acc.key = entry
        } else if (key !== 'ref') {
            acc.props[key] = entry
        } else {
            acc.ref = entry
        }
        return acc
    }, {props: {}, synth: {}, ref: undefined, key: undefined})

    return {
        type: element,
        props: splitProps.props,
        synth: splitProps.synth,
        key: splitProps.key,
        ref: splitProps.ref,
        children: children.flat()
    }
}