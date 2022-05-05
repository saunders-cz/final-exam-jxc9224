import React from 'react'
import type { Page } from '../types'

import HomeIcon from '@mui/icons-material/HomeSharp'
import MenuIcon from '@mui/icons-material/RestaurantSharp'
import CartIcon from '@mui/icons-material/ShoppingCartSharp'
import CheckoutIcon from '@mui/icons-material/PointOfSaleSharp'
import RegisterIcon from '@mui/icons-material/AppRegistrationSharp'
import LoginIcon from '@mui/icons-material/LoginSharp'
import AdminIcon from '@mui/icons-material/AdminPanelSettingsSharp'

export const PAGE_LIST: Page[] = [
  {
    title: 'Home',
    header: '',
    element: React.lazy(() => import('./home/HomePage')),
    icon: HomeIcon,
    order: 1,
  },
  {
    title: 'Menu',
    header: 'Menus',
    element: React.lazy(() => import('./menu/MenuPage')),
    icon: MenuIcon,
    path: 'menu',
    order: 2,
  },
  {
    title: 'Cart',
    header: 'Shopping Cart',
    element: React.lazy(() => import('./cart/CartPage')),
    icon: CartIcon,
    path: 'cart',
    order: 3,
  },
  {
    title: 'Checkout',
    header: 'Order Checkout',
    element: React.lazy(() => import('./checkout/CheckoutPage')),
    icon: CheckoutIcon,
    path: 'checkout',
    order: 4,
  },
  {
    title: 'Register',
    header: 'Account Registration',
    element: React.lazy(() => import('./register/RegisterPage')),
    icon: RegisterIcon,
    path: 'register',
    session: false,
    order: 5,
  },
  {
    title: 'Login',
    header: 'Account Login',
    element: React.lazy(() => import('./login/LoginPage')),
    icon: LoginIcon,
    path: 'login',
    session: false,
    order: 6,
  },
  {
    title: 'Admin',
    header: 'Admin Panel',
    element: React.lazy(() => import('./admin/AdminPage')),
    icon: AdminIcon,
    path: 'admin',
    session: true,
    order: 7,
  },
]

export default PAGE_LIST

