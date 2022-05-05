import { gql } from '@apollo/client'

export const FIND_ALL_ITEMS = gql`
  query FIND_ALL_ITEMS {
    items: findAllItems {
      id
      name
      description
      imagePath
      price
      vegan
      category
      type
    }
  }
`

export const FIND_ITEM_BY_ID = gql`
  query FIND_ITEM_BY_ID($id: ID!) {
    item: findItemById(id: $id) {
      id
      name
      description
      imagePath
      price
      vegan
      category
      type
    }
  }
`
