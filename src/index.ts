import express from 'express'
import { ApolloServer, gql } from 'apollo-server-express'
import * as coinService from './coinApi'
import * as definitions from './definitions'

const typeDefs = gql`
  type Query {
    coins: [${definitions.coin.name}]
    icons: [${definitions.icon.name}]
    history(assetId: String): [${definitions.history.name}]
  }

  ${definitions.coin.definition}
  ${definitions.icon.definition}
  ${definitions.history.definition}
`

const resolvers = {
  Query: {
    coins: () => coinService.getCoins(),
    icons: () => coinService.getIcons(),
    history: (parent: any, data: { assetId: string }) => {
      console.log(data)
      return coinService.getHistory({ assetId: data.assetId })
    },
  },
}

const server = new ApolloServer({ typeDefs, resolvers })

const app = express()
server.applyMiddleware({ app })

app.listen({ port: 4000 }, () =>
  console.log(`🚀 runing on http://localhost:4000${server.graphqlPath}`)
)
