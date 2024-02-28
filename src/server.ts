import { ApolloServer } from 'apollo-server';
import {ApolloServerPluginUsageReporting} from "apollo-server-core";
import { schema} from './graphql/appschema';
import dotenv from 'dotenv';
import express, { Application } from 'express';

const app: Application = express();

const PORT = process.env.PORT as unknown as number;

const server = new ApolloServer({
    schema,
    cors: {
        origin: '*',
    },
    debug: true,
    plugins: [
        ApolloServerPluginUsageReporting({
          sendReportsImmediately: true
        }),
      ],
});

dotenv.config();

app.get('health', (_, res) => res.send('OK')); // Helper endpoint

server.listen(PORT).then(({ url }) => {
    console.log('Applikácia beží na url ' + url);
});
