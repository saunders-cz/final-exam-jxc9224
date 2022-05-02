import type { MenuCategory, MenuType } from './enum'

export interface Item<T extends MenuType, C extends MenuCategory> {
  id: number
  name: string
  description: string
  imagePath?: string
  specialRequest?: string
  price: number
  vegan: boolean
  category: C
  type: T
}

export type Drink<T extends MenuType> = Item<T, MenuCategory.Beverage>

export interface PrixFixe<T extends MenuType> {
  appetizer: Item<T, MenuCategory.Appetizer>
  entree: Item<T, MenuCategory.Entree>
  dessert: Item<T, MenuCategory.Dessert>
}

export interface Order<T extends MenuType> {
  drinks: Drink<T>[]
  meals: PrixFixe<T>[]
}

