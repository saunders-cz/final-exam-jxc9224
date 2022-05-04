import { DataTypes, Model, Sequelize } from 'sequelize'

class Item extends Model {}
class User extends Model {}

const sequelize = new Sequelize('sqlite:./data/database.sqlite')

Item.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    imagePath: { type: DataTypes.STRING, allowNull: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    vegan: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    category: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
  }
)

User.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    newsletter: { type: DataTypes.BOOLEAN, allowNull: false },
  },
  {
    sequelize,
  }
)

await sequelize.sync({ force: true })
//await Item.bulkCreate(items)

export { Item, User }
