export const isSame = (oldState, state) => {
    if (typeof state !== typeof oldState) {
        return false
    }
    if (typeof state === 'object' && !Array.isArray(state)) {
        return Object.entries(state).reduce((acc, [key, value]) => {
            if (!(key in oldState)) {
                return false
            }
            if (value !== oldState[key]) {
                return false
            }
            return acc
        }, true)
    }
    if (Array.isArray(state)) {
        return state.reduce((acc, entry, index) => {
            if (entry !== oldState[index]) {
                return false
            }
            return acc
        }, true) && state.length === oldState.length
    }
    if (state !== oldState) {
        return false
    }
    return true

}