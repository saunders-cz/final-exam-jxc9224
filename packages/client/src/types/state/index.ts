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

export type StateEditor<T> = <K extends keyof T>(key: K, value: T[K]) => void

