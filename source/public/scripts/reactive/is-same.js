export const isSame = (oldState, state) => {
  if (typeof state !== typeof oldState) {
    return false
  }
  if (typeof state === 'object' && !Array.isArray(state) && state && oldState) {
    return Object.entries(state).reduce((acc, [key, value]) => {
      if (!(key in oldState)) {
        return false
      }
      if (!isSame(value, oldState[key])) {
        return false
      }
      if (value !== oldState[key]) {
        return false
      }
      return acc
    }, true)
  }
  if (Array.isArray(state)) {
    return (
      state.reduce((acc, entry, index) => {
        if (!isSame(entry, oldState[index])) {
          acc = false
        }
        return acc
      }, true) && state.length === oldState.length
    )
  }
  return state === oldState
}
