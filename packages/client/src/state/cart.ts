import { createSlice } from '@reduxjs/toolkit'
import type { CartState } from '../types'

const initialState: CartState = {
  items: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addCartItem: (state, action) => {
      const cartItem = state.items.find(
        (item) => item.menuItem.name === action.payload.menuItem.name
      )

      if (cartItem) {
        cartItem.quantity += action.payload.quantity
      } else {
        state.items.push({ ...action.payload })
      }
    },

    removeCartItem: (state, action) => {
      const cartItem = state.items.find(
        (item) => item.menuItem.name === action.payload.name
      )

      state.items = state.items.filter(
        (item) => !cartItem || item.menuItem !== cartItem.menuItem
      )
    },

    clearCart: (state) => {
      state.items = []
    },
  },
})

export const cartReducer = cartSlice.reducer
export default cartReducer
