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

export interface CheckoutState {
  shipping: Partial<Address>
  billing: Partial<Address>
  card: Partial<Card>
}
