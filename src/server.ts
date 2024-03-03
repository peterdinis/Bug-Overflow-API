import { ApolloServer } from 'apollo-server';
import express from "express";
import dotenv from 'dotenv';
import { resolvers, typeDefs } from './graphql/appschema';
import { createServer } from 'http';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

const PORT = process.env.PORT as unknown as number;

const app = express();

const httpServer = createServer(app);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/subscriptions',
});

const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer({
    schema,
    cors: {
        origin: '*',
    },
    debug: true,
    plugins: [
  
      {
        async serverWillStart() {
          return {
            async drainServer() {
              console.log("PING");
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
});

dotenv.config();

server.listen(PORT).then(({ url }) => {
    console.log('Applikácia beží na url ' + url);
});
