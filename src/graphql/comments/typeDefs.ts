import { gql } from 'apollo-server';

export const commentsTypeDefs = gql`
    type Comment {
        id: ID!
        createdAt: String!
        commentedText: String!
        post: Post!
        user: User!
    }
`;