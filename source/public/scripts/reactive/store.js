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
      const cloneUpdateStates = [...updateStates]
      cloneUpdateStates.forEach(({ id, setStore }) => {
        if (!mutables.Dom[id]) {
          const foundIndex = updateStates.findIndex((entry) => entry === id)
          updateStates.splice(foundIndex, 1)
          return
        }
        setStore((v) => v + 1)
      })
    }
  }

  const setup = () => {
    const [, setStore] = useState(0)
    useEffect(() => {
      const mayExists = updateStates.find((entry) => entry.id === mutables.identifier)
      if (!mayExists) {
        updateStates.push({ id: mutables.identifier, setStore })
      } else {
        mayExists.setStore = setStore
      }
    }, [])
    return [store, update]
  }

  return setup
}
