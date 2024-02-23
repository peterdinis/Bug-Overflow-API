import { gql } from 'apollo-server';

export const technologyTypeDefs = gql`
    type Technology {
        id: ID!
        name: String!
    }

    type Query {
        getAllTechnologies: [Technology!]!
        getTechnologyById(id: ID!): Technology
    }

    type Mutation {
        createTechnology(name: String!, image: String!): Technology!
        updateTechnology(id: ID!, name: String, image: String): Technology
        deleteTechnology(id: ID!): ID
    }
`;
