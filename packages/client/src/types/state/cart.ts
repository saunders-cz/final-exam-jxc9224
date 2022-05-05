import { Item } from '../schema'

export interface CartItem {
  menuItem: Item
  quantity: number
}

export interface CartState {
  items: CartItem[]
}
