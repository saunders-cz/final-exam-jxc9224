import { gql } from '@apollo/client'

export const AUTHORIZE_USER = gql`
  query AUTHORIZE_USER($email: String!, $password: String!) {
    user: authorizeUser(email: $email, password: $password) {
      id
      email
      password
      firstName
      lastName
      newsletter
    }
  }
`

export const FIND_ALL_USERS = gql`
  query FIND_ALL_USERS {
    users: findAllUsers {
      id
      email
      firstName
      lastName
      newsletter
    }
  }
`

export const FIND_USER_BY_ID = gql`
  query FIND_USER_BY_ID($id: ID!) {
    user: findUserById(id: $id) {
      id
      email
      password
      firstName
      lastName
      newsletter
    }
  }
`

