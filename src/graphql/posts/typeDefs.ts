import { gql } from 'apollo-server';

// TODO: Get all comments for post get comment detail for post QUERY

export const postsTypeDefs = gql`
    type Post {
        id: ID!
        content: String!
        createdAt: String!
        user: User!
        tag: String!
        comments: [Comment!]!
    }

    typeQuery {
        getAllPosts: [Post!]!
        getPostById(id: Id!): Post!
        paginatedPosts(page: Int, pageSize: Int): [Post!]!
        searchPosts(query: String!): [Post!]!
        getAllPostsByTag(tag: String!): [Post!]!
    }

    type Mutation {
        createPost(): Post!
        updatePost(id: ID!): Post!
        deletePost(id: ID!)
    }
`;
