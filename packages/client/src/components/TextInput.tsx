import React from 'react'
import {
  FormControl,
  FormHelperText,
  OutlinedInput,
  InputLabel,
} from '@mui/material'
import { FormChangeHandler } from '../types'

export interface TextInputProps {
  error?: string
  fullWidth?: boolean
  helperText?: string
  label: string
  name: string
  required?: boolean
  type?: 'password' | 'text'
  value: string
  onFormChange: FormChangeHandler
}

export const TextInput: React.FC<TextInputProps> = ({
  name,
  type,
  error,
  label,
  value,
  required,
  fullWidth,
  helperText,
  onFormChange,
}) => {
  return (
    <FormControl error={!!error} fullWidth={fullWidth} required={required}>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <OutlinedInput
        fullWidth
        name={name}
        label={label}
        type={type ?? 'text'}
        aria-describedby={`${name}-text`}
        value={value}
        onChange={onFormChange}
      />
      <FormHelperText id={`${name}-text`}>{error ?? helperText}</FormHelperText>
    </FormControl>
  )
}

