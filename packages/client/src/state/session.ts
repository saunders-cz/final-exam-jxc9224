import { createSlice } from '@reduxjs/toolkit'
import type { UserState } from '../types'

const initialState: UserState = {}

export const sessionSlice = createSlice({
  name: 'session',
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.user = undefined
    },
  },
})

export const sessionReducer = sessionSlice.reducer
export default sessionReducer

