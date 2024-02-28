import { gql } from 'apollo-server';
import { technologyTypeDefs } from './technology/typeDefs';
import { technologyResolvers } from './technology/resolvers';
import { userTypeDefs } from './users/typeDefs';
import { userResolvers } from './users/resolvers';
import { commentsTypeDefs } from './comments/typeDefs';
import { postsTypeDefs } from './posts/typeDefs';

export const rootTypeDefs = gql`
    type Query {
        hello: String
    }
`;

export const rootResolvers = {
    Query: {
        hello: async () => {
            return 'Hello';
        },
    },
};

export const resolvers = [rootResolvers, technologyResolvers, userResolvers];
export const typeDefs = [rootTypeDefs, technologyTypeDefs, userTypeDefs, commentsTypeDefs, postsTypeDefs];
