export const destructedElement = (el) => {
  if (Array.isArray(el)) {
    return [...el]
  }
  if (typeof el === 'object' && el !== null) {
    return { ...el }
  }
  return el
}
