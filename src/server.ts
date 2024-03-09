import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs, resolvers } from './graphql/appschema';
import loglevel from 'loglevel';

interface MyContext {
    token?: String;
}

const logger = loglevel.getLogger('apollo-server');
logger.setLevel(loglevel.levels.DEBUG);

const server = new ApolloServer<MyContext>({ typeDefs, resolvers, includeStacktraceInErrorResponses: true, });

const startServer = async () => {
    const { url } = await startStandaloneServer(server, {
        context: async ({ req }) => ({ token: req.headers.token }),
        listen: { port: 4000 },
    });
    console.log(`🚀  Server ready at ${url}`);
};

startServer();
