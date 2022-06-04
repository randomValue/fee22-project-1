import { isSame } from './is-same.js'
import { useState } from './use-state.js'
import { useEffect } from './use-effect.js'

export const create = (state) => {
  const updateStates = []
  let store = state

  const update = (value) => {
    const nextState = typeof value === 'function' ? value(store) : value
    if (!isSame(store, nextState)) {
      store = nextState
      updateStates.forEach((updateFn) => {
        updateFn((v) => v + 1)
      })
    }
  }

  const setup = () => {
    const [, setStore] = useState(0)
    useEffect(() => {
      updateStates.push(setStore)
    }, [])
    return [store, update]
  }

  return setup
}
