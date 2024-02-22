import { gql } from 'apollo-server';
import { technologyTypeDefs } from './technology/typeDefs';
import { technologyResolvers } from './technology/resolvers';

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

export const resolvers = [rootResolvers, technologyResolvers];
export const typeDefs = [rootTypeDefs, technologyTypeDefs];
