import { gql } from 'apollo-server';

export const userTypeDefs = gql`
    type User {
        id: ID!
        userName: String!
        email: String!
        token: String!
        favoriteTechnologies: [Technology!]!
        createdAt: String!
        posts: [Post!]!
    }

    input AuthInput {
        userName: String!
        email: String!
        password: String!
    }

    type Query {
        userProfile(id: ID!): User
    }

    type Mutation {
        registerUser(createNewUser: AuthInput!): User!
        loginUser(loginNewUser: AuthInput!): User!
    }
`;
