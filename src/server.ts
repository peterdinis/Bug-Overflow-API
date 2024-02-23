import { ApolloServer } from 'apollo-server';
import { resolvers, typeDefs } from './graphql/appschema';
import dotenv from "dotenv";

const PORT = process.env.PORT as unknown as number;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    cors: {
        origin: '*',
    },
});

dotenv.config();

server.listen(PORT).then(({ url }) => {
    console.log('Applikácia beží na url ' + url);
});
