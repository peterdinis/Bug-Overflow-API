import { ApolloServer } from 'apollo-server';
import dotenv from 'dotenv';
import express, { Application } from 'express';
import { resolvers, typeDefs } from './graphql/appschema';

const app: Application = express();

const PORT = process.env.PORT as unknown as number;

const server = new ApolloServer({
    resolvers,
    typeDefs,
    cors: {
        origin: '*',
    },
    debug: true,
});

dotenv.config();

app.get('health', (_, res) => res.send('OK'));

server.listen(PORT).then(({ url }) => {
    console.log('Applikácia beží na url ' + url);
});
