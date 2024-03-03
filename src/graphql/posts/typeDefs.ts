import { gql } from 'apollo-server';

export const postsTypeDefs = gql`
    type Post {
        id: ID!
        content: String!
        createdAt: String!
        user: User!
        tag: String!
        comments: [Comment!]!
    }

    input CreatePostInput {
        content: String!
        createdAt: String!
        user: User!
        tag: String!
    }

    input UpdatePostInput {
        content: String
        createdAt: String
        user: User
        tag: String
    }

    type Query {
        getAllPosts: [Post!]!
        getPostById(id: ID!): Post!
        paginatedPosts(page: Int, pageSize: Int): [Post!]!
        searchPosts(query: String!): [Post!]!
        getAllPostsByTag(tag: String!): [Post!]!
        allCommentsForPost: [Post!]!
    }

    type Mutation {

    }
`;
