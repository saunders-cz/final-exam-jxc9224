import { gql } from 'apollo-server'

export default gql`
  scalar DateTime

  type Item {
    id: ID!
    name: String!
    description: String!
    imagePath: String
    price: Float!
    vegan: Boolean!
    category: MenuCategory!
    type: MenuType!
  }

  input CreateItemInput {
    name: String!
    description: String!
    imagePath: String
    price: Float!
    vegan: Boolean!
    category: MenuCategory!
    type: MenuType!
  }

  input UpdateItemInput {
    name: String
    description: String
    imagePath: String
    price: Float
    vegan: Boolean
    category: MenuCategory
    type: MenuType
  }

  type User {
    id: ID!
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    newsletter: Boolean!
  }

  input CreateUserInput {
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    newsletter: Boolean!
  }

  input UpdateUserInput {
    email: String
    password: String
    firstName: String
    lastName: String
    newsletter: Boolean
  }

  type Error {
    message: String
    path: String
  }

  type BaseResponse {
    success: Boolean
    errors: [Error]
  }

  type ItemResponse {
    item: Item
    success: Boolean
    errors: [Error]
  }

  type UserResponse {
    user: User
    success: Boolean
    errors: [Error]
  }

  type Query {
    findAllItems: [Item]
    findItemById(id: ID!): Item
    findAllUsers: [User]
    findUserById(id: ID!): User
    authorizeUser(email: String!, password: String!): User
  }

  type Mutation {
    createItem(input: CreateItemInput!): ItemResponse
    updateItem(id: ID!, input: UpdateItemInput): BaseResponse
    deleteItem(id: ID!): BaseResponse
    createUser(input: CreateUserInput!): UserResponse
    updateUser(id: ID!, input: UpdateUserInput!): BaseResponse
    deleteUser(id: ID!): BaseResponse
  }

  enum MenuCategory {
    Alcohol
    Appetizer
    Beverage
    Dessert
    Entree
  }

  enum MenuType {
    Brunch
    Dessert
    Dinner
    Drinks
  }
`

