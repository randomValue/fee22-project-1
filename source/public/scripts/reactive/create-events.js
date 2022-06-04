export const createEvents = (synth, element, node) => {
    Object.entries(synth || {}).forEach(([key, value]) => {
        const handler = key.replace('on', '').toLowerCase()
        const oldHandler = node?.synth[key]
        element.removeEventListener(handler, oldHandler)
        element.addEventListener(handler, value)
    })
}