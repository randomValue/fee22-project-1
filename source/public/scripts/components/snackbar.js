import { createElement } from '../reactive/create-element.js'
import { useSnackbar } from '../store.js'
import { useEffect } from '../reactive/use-effect.js'
import { useState } from '../reactive/use-state.js'

export const Snackbar = () => {
  const [snackbar, setSnackbar] = useSnackbar()
  const [toggle, setToggle] = useState(true)
  useEffect(() => {
    setToggle(!!snackbar.text)
    if (snackbar.text) {
      setTimeout(() => {
        setToggle(false)
      }, [3000])
    }
  }, [snackbar])

  useEffect(() => {
    if (!toggle) {
      setTimeout(() => {
        setSnackbar({ text: '', type: '' })
      }, 300)
    }
  }, [toggle])
  return createElement(
    'div',
    { class: 'snackbar-container' },
    !!snackbar.text &&
      createElement(
        'div',
        {
          class: `snackbar ${snackbar.type ? `snackbar-${snackbar.type}` : ''} ${
            toggle ? 'snackbar-show' : 'snackbar-hide'
          }`,
        },
        snackbar.text
      )
  )
}
