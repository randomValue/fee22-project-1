import { createElement } from '../reactive/create-element.js'
import { useSnackbar } from '../store.js'
import { useEffect } from '../reactive/use-effect.js'
import { useState } from '../reactive/use-state.js'

export const Snackbar = ({ text, type }) => {
  const [, setSnackbar] = useSnackbar()
  const [toggle, setToggle] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setToggle(false)
    }, 3000)
    setTimeout(() => {
      setSnackbar({ text: '', type: '' })
    }, 3250)
  }, [])
  return createElement(
    'div',
    {
      class: `snackbar ${type ? `snackbar-${type}` : ''} ${
        toggle ? 'snackbar-show' : 'snackbar-hide'
      }`,
      onTransitionend: () => {
        console.log('end')
      },
    },
    text
  )
}
