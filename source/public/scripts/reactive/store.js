import { isSame } from './is-same.js'
import { useState } from './use-state.js'
import { useEffect } from './use-effect.js'
import { destructedElement } from './destructed-element.js'
import { mutables } from './mutables.js'

export const create = (state) => {
  const updateStates = []
  let store = destructedElement(state)
  let nextState = destructedElement(state)

  const update = (value) => {
    nextState =
      typeof value === 'function' ? destructedElement(value(store)) : destructedElement(value)
    if (!isSame(store, nextState)) {
      const cloneUpdateStates = [...updateStates]
      cloneUpdateStates.forEach(({ id, setStore }) => {
        if (!mutables.Dom[id]) {
          const foundIndex = updateStates.findIndex((entry) => entry === id)
          updateStates.splice(foundIndex, 1)
          return
        }
        setStore(destructedElement(nextState))
      })
    }
  }

  const setup = () => {
    const [value, setStore] = useState(store)
    store = nextState
    useEffect(() => {
      const mayExists = updateStates.find((entry) => entry.id === mutables.identifier)
      if (!mayExists) {
        updateStates.push({ id: mutables.identifier, setStore })
      } else {
        mayExists.setStore = setStore
      }
    }, [])
    return [value, update]
  }

  return setup
}
