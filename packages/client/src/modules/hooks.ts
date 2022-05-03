import { useState, Dispatch, SetStateAction } from 'react'
import type {
  StateEditor,
  FormValidationSchema,
  FormSubmitHandler,
  FormErrors,
  FormChangeHandler,
} from '../types'

export const useStateEditor = <S>(
  initialState: (() => S) | S
): [S, StateEditor<S>, Dispatch<SetStateAction<S>>] => {
  const [state, setState] = useState<S>(initialState)
  const editState: StateEditor<S> = (key, value) =>
    setState({ ...state, [key]: value })
  return [state, editState, setState]
}

export const useFormState = <F>(params: {
  initialValues: F
  validationSchema: FormValidationSchema<F>
  onSubmit: (values: F) => void | Promise<void>
  onFailure?: (errors: FormErrors<F>) => void | Promise<void>
}): [F, FormErrors<F>, FormChangeHandler, FormSubmitHandler] => {
  const initialErrors = {} as FormErrors<F>
  const { initialValues, validationSchema, onSubmit, onFailure } = params

  const [errors, editError] = useStateEditor(initialErrors)
  const [values, editValue] = useStateEditor<F>(initialValues)

  const handleChange: FormChangeHandler = (event) => {
    event.preventDefault()
    let value: any
    switch (event.target.type) {
      case 'radio':
      case 'checkbox':
        value = event.target.checked
        break
      default:
        value = event.target.value
    }
    const key = event.target.name
    if (key in validationSchema) {
      const [isValid, error] =
        validationSchema[key as keyof typeof validationSchema](value)
      if (isValid) {
        setTimeout(() => editError(key, undefined), 0)
        editValue(key, value)
      } else {
        setTimeout(() => editError(key, error!), 0)
        editValue(key, value)
      }
    } else editValue(key, value)
  }

  const handleSubmit: FormSubmitHandler = (event) => {
    event.preventDefault()
    const numErrors = Object.values(errors).reduce<number>((t, err) => {
      if (err !== undefined) t++
      return t
    }, 0)
    if (numErrors === 0) onSubmit(values)
    else if (onFailure) onFailure(errors)
    else console.log('Failed to submit form', errors)
  }

  return [values, errors, handleChange, handleSubmit]
}

