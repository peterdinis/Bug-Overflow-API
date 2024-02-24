import { ApolloServer } from 'apollo-server';
import { resolvers, typeDefs } from './graphql/appschema';
import dotenv from 'dotenv';
import express, { Application } from "express";

const app: Application = express();

const PORT = process.env.PORT as unknown as number;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    cors: {
        origin: '*',
    },
});

dotenv.config();

app.get("health", (_, res) => res.send("OK")); // Helper endpoint

server.listen(PORT).then(({ url }) => {
    console.log('Applikácia beží na url ' + url);
});
