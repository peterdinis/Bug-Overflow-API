import { postsResolvers } from './posts/resolvers';
import { technologyTypeDefs } from './technology/typeDefs';
import { technologyResolvers } from './technology/resolvers';
import { userTypeDefs } from './users/typeDefs';
import { userResolvers } from './users/resolvers';
import { commentsTypeDefs } from './comments/typeDefs';
import { rootResolvers } from './root/resolvers';
import { rootTypeDefs } from './root/typedefs';
import { postsTypeDefs } from './posts/typeDefs';

export const resolvers = [
    rootResolvers,
    postsResolvers,
    technologyResolvers,
    userResolvers,
];
export const typeDefs = [
    rootTypeDefs,
    technologyTypeDefs,
    userTypeDefs,
    commentsTypeDefs,
    postsTypeDefs,
];
