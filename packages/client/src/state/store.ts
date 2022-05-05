import { configureStore } from '@reduxjs/toolkit'

import cartReducer from './cart'
import sessionReducer from './session'
import checkoutReducer from './checkout'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    session: sessionReducer,
    checkout: checkoutReducer,
  },
})

