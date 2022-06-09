import { createElement } from '../reactive/create-element.js'
import { mutables } from '../lib/mutables.js'
import { useMemo } from '../reactive/use-memo.js'

export const FormInput = ({ ...props }) => {
  const id = useMemo(() => mutables.formId, [])
  return createElement(props.type === 'textarea' ? 'textarea' : 'input', {
    ...props,
    id: `input_${id}`,
    class: `note-input ${props.class || ''}`,
  })
}
