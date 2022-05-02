export interface CartItem {
  menuItem: object
  quantity: number
}

export interface CartState {
  items: CartItem[]
}

