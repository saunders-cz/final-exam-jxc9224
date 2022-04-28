export interface CartItem {
  menuItem: object
  quantity: number
}

export interface CartState {
  items: CartItem[]
}

export interface Address {
  addressLine1: string
  addressLine2?: string
  country: string
  state: string
  city: string
  zip: string
}

export interface Card {
  cardNumber: number
  cardExpDate: Date
  cardCVV: number
}

export type AddressInput = Partial<Address>
export type CardInput = Partial<Card>

export interface CheckoutState {
  shipping: AddressInput
  billing: AddressInput
  card: CardInput
}

export type StateEditor<T> = <K extends keyof T>(key: K, value: T[K]) => void

