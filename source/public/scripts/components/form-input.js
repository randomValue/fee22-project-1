import { createElement } from '../reactive/create-element.js'
import { mutables } from '../lib/mutables.js'
import { useMemo } from '../reactive/use-memo.js'
import { useRef } from '../reactive/use-ref.js'
import { useEffect } from '../reactive/use-effect.js'

let i = 0
export const FormInput = ({ hasError, isRequired, value, ...props }) => {
  const inputRef = useRef(undefined)
  const id = useMemo(() => mutables.formId, [])
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = value
    }
  }, [value])

  return createElement(
    props.type === 'textarea' ? 'textarea' : 'input',
    {
      ref: (ref) => {
        inputRef.current = ref
      },
      value,
      ...props,
      id: `input_${id}`,
      class: `note-input ${props.class || ''}`,
      'aria-invalid': hasError ? 'true' : undefined,
      required: isRequired ? 'true' : undefined,
    },
    props.children
  )
}
