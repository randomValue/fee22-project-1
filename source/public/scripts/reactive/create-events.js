import { loopThroughStates } from './loop-through-states.js'
import { mutables } from './mutables.js'

export const createEvents = (synth, element, node) => {
  Object.entries(synth || {}).forEach(([key, value]) => {
    const handler = key.replace('on', '').toLowerCase()
    const oldHandler = node?.synth[key]
    element.removeEventListener(handler, oldHandler)
    const newHandler = (e) => {
      mutables.isEventActive = true
      value(e)
      mutables.isEventActive = false
      loopThroughStates()
    }
    synth[key] = newHandler
    element.addEventListener(handler, newHandler)
  })
}
