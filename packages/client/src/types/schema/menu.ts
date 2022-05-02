import type { Allergen, MenuCategory, MenuType } from './enum'

export interface Consumable<T extends MenuType, C extends MenuCategory> {
  id: number
  allergens: Array<Allergen>
  name: string
  price: number
  vegan: boolean
  category: C
  type: T
}

export type Drink<T extends MenuType> = Consumable<T, MenuCategory.Beverage>

export interface PrixFixe<T extends MenuType> {
  appetizer: Consumable<T, MenuCategory.Appetizer>
  entree: Consumable<T, MenuCategory.Entree>
  dessert: Consumable<T, MenuCategory.Dessert>
}

export interface Order<T extends MenuType> {
  drinks: Drink<T>[]
  meals: PrixFixe<T>[]
}

