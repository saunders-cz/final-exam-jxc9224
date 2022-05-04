import { MenuCategory, MenuType } from '../types'

export const EMAIL_VALID_REGEX = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/

export const init = {
  login: {
    email: localStorage.getItem('email') || '',
    password: localStorage.getItem('password') || '',
    rememberme: localStorage.getItem('rememberme') === 'yes',
  },
  register: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    newsletter: true,
  },
  itemAdder: {
    name: '',
    description: '',
    imagePath: 'default.png',
    price: 9.99,
    vegan: false,
    category: MenuCategory.Appetizer,
    type: MenuType.Brunch,
  },
}
