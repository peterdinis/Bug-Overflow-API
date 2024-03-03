import { gql } from 'apollo-server';

export const commentsTypeDefs = gql`
    type Comment {
        id: ID!
        createdAt: String!
        commentedText: String!
        post: Post!
        user: User!
    }

    type Query {
        getAllComments: [Comment!]!
        getCommentById(id: ID!): Comment
        paginatedComments(page: Int, pageSize: Int): [Comment!]!
        searchComments(query: String!): [Comment!]!
    }
`;
