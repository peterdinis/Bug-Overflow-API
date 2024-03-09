export const commentsTypeDefs = `#graphql
    type Comment {
        id: ID!
        createdAt: String!
        commentedText: String!
        post: Post!
        user: User!
    }
`;
