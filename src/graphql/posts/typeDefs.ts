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
`;