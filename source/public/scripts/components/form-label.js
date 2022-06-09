import { createElement } from '../reactive/create-element.js'
import { mutables } from '../lib/mutables.js'
import { useMemo } from '../reactive/use-memo.js'

export const FormLabel = ({ label, ...props }) => {
  const id = useMemo(() => {
    mutables.formId += 1
    return mutables.formId
  }, [])

  return createElement(
    'label',
    { ...props, for: `input_${id}`, class: `note-label ${props.class}` },
    label
  )
}
