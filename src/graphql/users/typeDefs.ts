import { gql } from 'apollo-server';

export const userTypeDefs = gql`
    type User {
        id: ID!
        userName: String!
        email: String!
        password: String!
        token: String!
        createdAt: String!
    }
`;
