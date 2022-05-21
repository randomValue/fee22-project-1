export const destructedElement = (el) => {
    if (Array.isArray(el)) {
        return [...el]
    } else if (typeof el === "object") {
        return {...el}
    } else {
        return el
    }
}