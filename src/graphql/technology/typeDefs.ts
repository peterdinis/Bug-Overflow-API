import { gql } from 'apollo-server';

export const technologyTypeDefs = gql`
    type Technology {
        id: ID!
        name: String!
        image: String!
    }

    input CreateTechnology {
        name: String!
        image: String!
    }

    input UpdateTechnology {
        name: String
        image: String
    }

    type Query {
        getAllTechnologies: [Technology!]!
        getTechnologyById(id: ID!): Technology
        paginatedTechnologies(page: Int, pageSize: Int): [Technology!]!
        searchTechnologies(query: String!): [Technology!]!
    }

    type Mutation {
        createTechnology(createInput: CreateTechnology!): Technology!
        updateTechnology(id: ID!, updateInput: UpdateTechnology!): Technology
        deleteTechnology(id: ID!): ID
    }
`;
