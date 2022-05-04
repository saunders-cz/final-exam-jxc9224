import { gql } from '@apollo/client'

export const CREATE_USER = gql`
  mutation CREATE_USER($input: CreateUserInput!) {
    result: createUser(input: $input) {
      user {
        id
        email
        password
        firstName
        lastName
        newsletter
      }
      success
    }
  }
`

export const UPDATE_USER = gql`
  mutation UPDATE_USER($id: ID!, $input: UpdateUserInput!) {
    result: updateUser(id: $id, input: $input) {
      success
    }
  }
`

export const DELETE_USER = gql`
  mutation DELETE_USER($id: ID!) {
    result: deleteUser(id: $id) {
      success
    }
  }
`
