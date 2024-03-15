import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs, resolvers } from './graphql/appschema';
import loglevel from 'loglevel';
import { ServerContent } from './graphql/types/serverTypes';
import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

const logger = loglevel.getLogger('apollo-server');

const app = express();
const httpServer = createServer(app);

app.use(cors());

logger.setLevel(loglevel.levels.DEBUG);

const schema = makeExecutableSchema({ typeDefs, resolvers });

const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql', // localhost:3000/graphql
});

const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer<ServerContent>({
    typeDefs,
    resolvers,
    cache: 'bounded',
    includeStacktraceInErrorResponses: true,
    plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        {
            async serverWillStart() {
                return {
                    async drainServer() {
                        await serverCleanup.dispose();
                    },
                };
            },
        },
    ],
});

const startServer = async () => {
    const { url } = await startStandaloneServer(server, {
        context: async ({ req }) => ({ token: req.headers.token }),
        listen: { port: 4000 },
    });
    console.log(`🚀  Server ready at ${url}`);
};

startServer();
