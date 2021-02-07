import express from 'express'
import { ApolloServer, gql } from 'apollo-server-express'
import * as coinService from './coinApi'
import * as definitions from './definitions'

const typeDefs = gql`
  type Query {
    getCoins: [${definitions.coin.name}]
    getIcons: [${definitions.icon.name}]
    getCoinHistory(assetId: String, period: String): [${definitions.history.name}]
  }

  ${definitions.coin.definition}
  ${definitions.icon.definition}
  ${definitions.history.definition}
`

const resolvers = {
  Query: {
    getCoins: () => coinService.getCoins(),
    getIcons: () => coinService.getIcons(),
    getCoinHistory: (parent: any, data: { assetId: string; period: string }) =>
      coinService.getHistory({ assetId: data.assetId, period: data.period }),
  },
}

const server = new ApolloServer({ typeDefs, resolvers })

const app = express()
server.applyMiddleware({ app })

app.listen({ port: 4000 }, () =>
  console.log(`🚀 runing on http://localhost:4000${server.graphqlPath}`)
)
