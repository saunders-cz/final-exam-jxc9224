import { ApolloServer } from 'apollo-server'
import typeDefs from './typeDefs.js'
import resolvers from './resolvers.js'

const server = new ApolloServer({ typeDefs, resolvers })
const { url } = await server.listen(4000)

console.log(`Server ready at ${url}`)

