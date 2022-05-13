import {isSame} from "./is-same.js";

export const useEffect = (callback, deps) => {
    const node = mutables[identifier]
    const index = node.cachedEffects
    node.cachedEffects++
    if (node.prevDeps === undefined) {
        node.prevDeps = []
    }
    if (!isSame(node.prevDeps[index], deps)) {
        node.prevDeps[index] = deps
        callback()
    }
}