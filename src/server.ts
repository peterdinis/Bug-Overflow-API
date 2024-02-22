import { ApolloServer, gql } from 'apollo-server';
import { resolvers, typeDefs } from './graphql/appschema';

const server = new ApolloServer({
    typeDefs,
    resolvers,
    cors: {
        origin: '*',
    },
});

server.listen(6132).then(({ url }) => {
    console.log('Applikácia beží na porte' + 6132);
});
