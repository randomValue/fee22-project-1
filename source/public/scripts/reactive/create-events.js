import { loopThroughStates } from './loop-through-states.js'
import { needsUpdate } from './use-state.js'

export const createEvents = (synth, element, node) => {
  Object.entries(synth || {}).forEach(([key, value]) => {
    const handler = key.replace('on', '').toLowerCase()
    const oldHandler = node?.synth[key]
    element.removeEventListener(handler, oldHandler)
    const newHandler = (e) => {
      value(e)
      loopThroughStates()
      needsUpdate.length = 0
    }
    synth[key] = newHandler
    element.addEventListener(handler, newHandler)
  })
}
