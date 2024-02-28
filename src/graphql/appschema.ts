import { gql } from 'apollo-server';
import { technologyTypeDefs } from './technology/typeDefs';
import { technologyResolvers } from './technology/resolvers';
import { userTypeDefs } from './users/typeDefs';
import { userResolvers } from './users/resolvers';
import { commentsTypeDefs } from './comments/typeDefs';
import { postsTypeDefs } from './posts/typeDefs';
import { makeExecutableSchema } from 'graphql-tools';

const rootTypeDefs = gql`
    type Query {
        hello: String
    }
`;

const rootResolvers = {
    Query: {
        hello: async () => {
            return 'Hello';
        },
    },
};

const resolvers = [rootResolvers, technologyResolvers, userResolvers];
const typeDefs = [rootTypeDefs, technologyTypeDefs, userTypeDefs, commentsTypeDefs, postsTypeDefs];


export const schema = makeExecutableSchema({
    resolvers,
    typeDefs
})