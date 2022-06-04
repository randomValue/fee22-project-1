export const destructedElement = (el) => {
  if (Array.isArray(el)) {
    return [...el]
  }
  if (typeof el === 'object') {
    return { ...el }
  }
  return el
}
