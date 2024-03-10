import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs, resolvers } from './graphql/appschema';
import loglevel from 'loglevel';
import { ServerContent } from './graphql/types/serverTypes';
import express from "express";
import cors from "cors";

const logger = loglevel.getLogger('apollo-server');

const app = express();

app.use(cors());

logger.setLevel(loglevel.levels.DEBUG);

const server = new ApolloServer<ServerContent>({
    typeDefs,
    resolvers,
    cache: "bounded",
    includeStacktraceInErrorResponses: true,
});

const startServer = async () => {
    const { url } = await startStandaloneServer(server, {
        context: async ({ req }) => ({ token: req.headers.token }),
        listen: { port: 4000 },
    });
    console.log(`🚀  Server ready at ${url}`);
};

startServer();
