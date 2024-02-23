import { ApolloServer } from 'apollo-server';
import { resolvers, typeDefs } from './graphql/appschema';
import dotenv from 'dotenv';
import { MemcachedCache } from "apollo-server-cache-memcached";

const PORT = process.env.PORT as unknown as number;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    cors: {
        origin: '*',
    },
    cache: new MemcachedCache(
        ['memcached-server-1', 'memcached-server-2', 'memcached-server-3'],
        { retries: 10, retry: 10000 },
      ),
});

dotenv.config();

server.listen(PORT).then(({ url }) => {
    console.log('Applikácia beží na url ' + url);
});
