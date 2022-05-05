import type { Item } from '../../types'

export const SORT_BUTTONS = {
  cat: {
    asc: 'Category (A-Z)',
    desc: 'Category (Z-A)',
  },
  name: {
    asc: 'Name (A-Z)',
    desc: 'Name (Z-A)',
  },
  price: {
    asc: 'Price (Low-High)',
    desc: 'Price (High-Low)',
  },
}

export const SORT_FUNCTIONS = {
  cat: {
    asc: (a: Item, b: Item) => {
      return a.category.localeCompare(b.category)
    },
    desc: (a: Item, b: Item) => {
      return b.category.localeCompare(a.category)
    },
  },
  price: {
    asc: (a: Item, b: Item) => {
      return a.price - b.price
    },
    desc: (a: Item, b: Item) => {
      return b.price - a.price
    },
  },
  name: {
    asc: (a: Item, b: Item) => {
      return a.name.localeCompare(b.name)
    },
    desc: (a: Item, b: Item) => {
      return b.name.localeCompare(a.name)
    },
  },
}
