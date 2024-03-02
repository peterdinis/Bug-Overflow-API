import { ApolloServer } from 'apollo-server';
import dotenv from 'dotenv';
import { resolvers, typeDefs } from './graphql/appschema';

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

server.listen(PORT).then(({ url }) => {
    console.log('Applikácia beží na url ' + url);
});
