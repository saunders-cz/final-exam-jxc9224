import { createSlice } from '@reduxjs/toolkit'
import type { CheckoutState } from '../types'

const initialState: CheckoutState = {
  shipping: {},
  billing: {},
  card: {},
}

export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: initialState,
  reducers: {
    setShippingAddress: (state, action) => {
      state.shipping = action.payload
    },
    setBillingAddress: (state, action) => {
      state.shipping = action.payload
    },
    setCheckoutCard: (state, action) => {
      state.card = action.payload
    },
  },
})

export const checkoutReducer = checkoutSlice.reducer
export default checkoutReducer
