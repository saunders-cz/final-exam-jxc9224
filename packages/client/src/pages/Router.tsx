import { Provider } from 'react-redux'
import React, { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Typography } from '@mui/material'

import { store } from '../state'
import { Layout } from '../components/'

const AdminPage = React.lazy(() => import('./admin/AdminPage'))
const CartPage = React.lazy(() => import('./cart/CartPage'))
const CheckoutPage = React.lazy(() => import('./checkout/CheckoutPage'))
const HomePage = React.lazy(() => import('./home/HomePage'))
const MenuPage = React.lazy(() => import('./menu/MenuPage'))

const Router: React.FC = () => {
  return (
    <Provider store={store}>
      <Suspense
        fallback={<Typography variant='body1'>Loading page...</Typography>}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path='admin' element={<AdminPage />} />
              <Route path='cart' element={<CartPage />} />
              <Route path='catalog' element={<MenuPage />} />
              <Route path='checkout' element={<CheckoutPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Suspense>
    </Provider>
  )
}

export default Router
