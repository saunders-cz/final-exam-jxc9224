import React from 'react'
import { Action, ThunkAction } from '@reduxjs/toolkit'
import { store } from '../../state'

export * from './cart'
export * from './checkout'

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export interface ResponseError {
  message: string
  path: string
}

export interface BaseResponse {
  success?: boolean
  errors?: ResponseError[]
}

export interface SortButtons {
  [key: string]: {
    [key: string]: string
  }
}

export interface SortFunctions<T> {
  [key: string]: {
    [key: string]: (a: T, b: T) => number
  }
}

export interface SortState {
  [key: string]: string | undefined
}

export type StateEditor<S> = <K extends keyof S>(
  key: K,
  value: S[K] | undefined
) => void

export type FormChangeHandler = (event: React.ChangeEvent<any>) => void

export type FormErrors<F> = {
  [K in keyof Partial<F>]: string | undefined
}

export type FormSubmitHandler = (
  event: React.FormEvent<HTMLFormElement>
) => void

export type FormValidationSchema<F> = {
  [K in keyof Partial<F>]: (value: F[K]) => [boolean, string?]
}

