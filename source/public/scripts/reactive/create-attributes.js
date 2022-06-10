export const createAttributes = (props, node) => {
  Object.entries(props || {}).forEach(([key, value]) => {
    if (key === 'style') {
      const style = Object.entries(value).reduce((acc, [styleKey, entry]) => {
        const toStyleKey = styleKey.replace(
          /[A-Z]+(?![a-z])|[A-Z]/g,
          (match, splitter) => `${splitter ? '-' : ''}${match.toLowerCase()}`
        )
        acc += `${toStyleKey}: ${entry};`
        return acc
      }, '')
      node.setAttribute(key, style)
    } else if (value === undefined) {
      node.removeAttribute(key)
    } else if (key !== 'children') {
      node?.setAttribute(key, value)
    }
  })
}
