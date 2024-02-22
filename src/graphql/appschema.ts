import { gql } from 'apollo-server';

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

export const resolvers = [rootResolvers];
export const typeDefs = [rootTypeDefs];
