import { createElement } from '../reactive/create-element.js'
import { useState } from '../reactive/use-state.js'
import { useEffect } from '../reactive/use-effect.js'
import { DarkIcon } from './icons/dark-icon.js'
import { LightIcon } from './icons/light-icon.js'

const handleDarkLightMode = (toggle) => {
  const container = document.querySelector('.container')
  if (container) {
    container.dataset.theme = toggle ? 'dark' : 'light'
  }
}

export const Switch = () => {
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      handleDarkLightMode(true)
      setToggle(true)
    }
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
      handleDarkLightMode(event.matches)
    })
  }, [])
  return createElement(
    'button',
    {
      class: 'switch',
      title: 'Toggle dark/light mode',
      onClick: () => {
        setToggle(!toggle)
        handleDarkLightMode(!toggle)
      },
    },
    createElement(
      'span',
      {
        class: `switch-icon ${toggle ? 'switch-icon-on' : ''}`,
      },
      createElement(toggle ? DarkIcon : LightIcon, { svgProps: { class: 'theme-icon' } })
    )
  )
}
