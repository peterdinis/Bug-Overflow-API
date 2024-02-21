import { ApolloServer, gql } from 'apollo-server';

const server = new ApolloServer({
    typeDefs: gql`
        type Query {
            hello: String
        }
    `,
    cors: {
        origin: '*',
    },
});

server.listen(6132).then(({ url }) => {
    console.log('Applikácia beží na porte' + 6132);
});
