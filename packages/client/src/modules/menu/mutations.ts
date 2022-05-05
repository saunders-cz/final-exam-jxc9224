import { gql } from '@apollo/client'

export const CREATE_ITEM = gql`
  mutation CREATE_ITEM($input: CreateItemInput!) {
    result: createItem(input: $input) {
      item {
        id
        name
        description
        imagePath
        price
        vegan
        category
        type
      }
      success
    }
  }
`

export const UPDATE_ITEM = gql`
  mutation UPDATE_ITEM($id: ID!, $input: UpdateItemInput!) {
    result: updateItem(id: $id, input: $input) {
      success
    }
  }
`

export const DELETE_ITEM = gql`
  mutation DELETE_ITEM($id: ID!) {
    result: deleteItem(id: $id) {
      success
    }
  }
`
