import { technologyTypeDefs } from './technology/typeDefs';
import { technologyResolvers } from './technology/resolvers';
import { userTypeDefs } from './users/typeDefs';
import { userResolvers } from './users/resolvers';
import { commentsTypeDefs } from './comments/typeDefs';
import { postsTypeDefs } from './posts/typeDefs';
import { makeExecutableSchema } from 'graphql-tools';
import { rootResolvers } from './root/resolvers';
import { rootTypeDefs } from './root/typedefs';

const resolvers = [rootResolvers, technologyResolvers, userResolvers];
const typeDefs = [
    rootTypeDefs,
    technologyTypeDefs,
    userTypeDefs,
    commentsTypeDefs,
    postsTypeDefs,
];

export const schema = makeExecutableSchema({
    resolvers,
    typeDefs,
});
