import { isSame } from './is-same.js'
import { useState } from './use-state.js'
import { useEffect } from './use-effect.js'
import { destructedElement } from './destructed-element.js'
import { mutables } from './mutables.js'

export const create = (state) => {
  const updateStates = []
  let store = destructedElement(state)

  const update = (value) => {
    const nextState =
      typeof value === 'function' ? destructedElement(value(store)) : destructedElement(value)
    if (!isSame(store, nextState)) {
      store = nextState
      updateStates.forEach(({ id, setStore, count }, i) => {
        if (!mutables.Dom[id]) {
          updateStates.splice(i, 1)
          return
        }
        mutables.identifier = id
        setStore((v) => v + 1)
      })
    }
  }

  const setup = () => {
    const [, setStore] = useState(0)
    useEffect(() => {
      updateStates.push({ id: mutables.identifier, setStore })
    }, [])
    return [store, update]
  }

  return setup
}
