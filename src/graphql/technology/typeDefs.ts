import { gql } from 'apollo-server';

export const technologyTypeDefs = gql`
    type Technology {
        id: ID!
        name: String!
        image: String!
    }

    type Query {
        getAllTechnologies: [Technology!]!
        getTechnologyById(id: ID!): Technology
        paginatedTechnologies(page: Int, pageSize: Int): [Technology!]!
        searchTechnologies(query: String!): [Technology!]!
    }

    type Mutation {
        createTechnology(name: String!, image: String!): Technology!
        updateTechnology(id: ID!, name: String, image: String): Technology
        deleteTechnology(id: ID!): ID
    }
`;
