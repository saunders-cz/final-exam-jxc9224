import { DateTimeResolver } from 'graphql-scalars'
import { Item, User } from './model.js'

const { createHmac } = await import('crypto')
const SHA512_SALT = 'horse staple battery something'

const hash = (password) =>
  createHmac('sha512', SHA512_SALT).update(password).digest('hex')

export default {
  Query: {
    findAllItems: async () => await Item.findAll(),
    findItemById: async (_, { id }) => await Item.findByPk(id),
    findAllUsers: async () => await User.findAll(),
    findUserById: async (_, { id }) => await User.findByPk(id),
    authorizeUser: async (_, { email, password }) =>
      await User.findOne({ where: { email: email, password: hash(password) } }),
  },

  Mutation: {
    createItem: async (_, { input }) => {
      const item = await Item.create({ ...input, complete: false })
      return { item: item, success: true }
    },
    updateItem: async (_, { id, input }) => {
      await Item.update({ ...input }, { where: { id: id } })
      return { success: true }
    },
    deleteItem: async (_, { id }) => {
      const item = await Item.findByPk(id)
      if (!item) throw new Error(`Item with id ${id} was not found.`)
      await item.destroy()
      return { success: true }
    },
    createUser: async (_, { input }) => {
      const user = await User.create({
        ...input,
        password: hash(input.password),
        complete: false,
      })
      return { user: user, success: true }
    },
    updateUser: async (_, { id, password, input }) => {
      const user = await User.findByPk(id)
      if (user.getDataValue('password') === hash(password)) {
        if (input.password) {
          await User.update(
            { ...input, password: hash(input.password) },
            { where: { id: id } }
          )
        } else {
          await User.update({ ...input }, { where: { id: id } })
        }
        return { success: true }
      }
      return { success: false }
    },
    deleteUser: async (_, { id }) => {
      const user = await User.findByPk(id)
      if (!user) throw new Error(`User with id ${id} was not found.`)
      await user.destroy()
      return { success: true }
    },
  },

  MenuCategory: {
    Alcohol: 'Alcohol',
    Appetizer: 'Appetizer',
    Beverage: 'Beverage',
    Dessert: 'Dessert',
    Entree: 'Entree',
  },

  MenuType: {
    Brunch: 'Brunch',
    Dessert: 'Dessert',
    Dinner: 'Dinner',
    Drinks: 'Drinks',
  },

  DateTime: DateTimeResolver,
}
