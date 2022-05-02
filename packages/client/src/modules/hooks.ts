import { useState, Dispatch, SetStateAction } from 'react'
import type {
  StateEditor,
  FormValidationSchema,
  FormSubmitHandler,
  FormErrors,
  FormChangeHandler,
} from '../types'

export const useStateEditor = <S extends object>(
  initialState: (() => S) | S
): [S, StateEditor<S>, Dispatch<SetStateAction<S>>] => {
  const [state, setState] = useState<S>(initialState)
  const editState: StateEditor<S> = (key, value) =>
    setState({ ...state, [key]: value })
  return [state, editState, setState]
}

export const useFormState = <F extends object>(
  initialValues: F,
  validationSchema: FormValidationSchema<F>,
  onSubmit: (values: F) => void | Promise<void>,
  onFailure?: (errors: FormErrors<F>) => void | Promise<void>
): [F, FormErrors<F>, FormChangeHandler, FormSubmitHandler] => {
  const initialErrors = {} as FormErrors<F>
  const [errors, editError] = useStateEditor(initialErrors)
  const [values, editValue] = useStateEditor<F>(initialValues)
  const [validFormState, setValidFormState] = useState(true)

  const handleChange: FormChangeHandler = (event) => {
    event.preventDefault()
    const key = event.target.key as keyof F
    const value: any = event.target.value
    const [isValid, error] = validationSchema[key](value)
    setTimeout(() => setValidFormState(isValid), 0)
    if (isValid) {
      setTimeout(() => setValidFormState(isValid), 0)
      editValue(key, value)
    } else editError(key, error!)
  }

  const handleSubmit: FormSubmitHandler = (event) => {
    event.preventDefault()
    if (validFormState) onSubmit(values)
    else if (onFailure) onFailure(errors)
    else console.log('Failed to submit form', errors)
  }

  return [values, errors, handleChange, handleSubmit]
}

