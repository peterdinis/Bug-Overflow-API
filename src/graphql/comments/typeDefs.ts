export const commentsTypeDefs = `#graphql
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
        getAllCommentsForPost(postId: ID!)
        getCommentDetailInPost(postId: ID!, commentId: ID!)
    }
`;
