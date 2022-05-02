import React, { useState } from 'react'
import {
  FormControl,
  FormControlProps,
  FormHelperText,
  Input,
  InputLabel,
} from '@mui/material'

export interface TextInputProps extends FormControlProps {
  id: string
  label: string
  helperText: string
  validate: (value: string) => [boolean, string?]
  onValidate: (value: string) => void
}

export const TextInput: React.FC<TextInputProps> = ({
  id,
  label,
  helperText,
  validate,
  onValidate,
  ...formControlProps
}) => {
  const [errorState, setErrorState] = useState<string>()
  const [valueState, setValueState] = useState<string>('')
  return (
    <FormControl {...formControlProps} error={!!errorState}>
      <InputLabel htmlFor={`${id}-input`}>{label}</InputLabel>
      <Input
        fullWidth
        id={`${id}-input`}
        type='text'
        aria-describedby={`${id}-text`}
        value={valueState}
        onChange={(event) => {
          event.preventDefault()
          const value = event.target.value
          const [isValid, error] = validate(value)
          setTimeout(() => {
            if (isValid) {
              setTimeout(() => setErrorState(undefined), 0)
              onValidate(value)
            } else setErrorState(error!)
          }, 0)
          setValueState(value)
        }}
      />
      <FormHelperText id={`${id}-text`}>
        {errorState ?? helperText}
      </FormHelperText>
    </FormControl>
  )
}

