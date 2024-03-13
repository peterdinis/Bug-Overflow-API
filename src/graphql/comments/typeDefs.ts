export const commentsTypeDefs = `#graphql
    type Comment {
        id: ID!
        createdAt: String!
        commentedText: String!
        post: Post!
        postId: ID!
        user: User!
        userId: ID!
        upvote: Int!
        downvote: Int!
    }

    input CreateComment {
        commentedText: String!
        postId: ID!
        userID: ID!
        upvote: Int!
        downvote: Int!
    }

    input UpdateComment {
        commentedText: String
        postId: ID
        userID: ID
        upvote: Int
        downvote: Int
    }

    input UpvoteComment {
        commentId: ID!
        upvote: Int!
    }

    input DownvoteComment {
        commentId: ID!
        downvote: Int!
    }


    type Query {
        getAllComments: [Comment!]!
        getCommentById(id: ID!): Comment
        paginatedComments(page: Int, pageSize: Int): [Comment!]!
        searchComments(query: String!): [Comment!]!
        getAllCommentsForPost(postId: ID!): Comment
        getCommentDetailInPost(postId: ID!, commentId: ID!): Comment
    }

    type Mutation {
        createComment(createCommentInput: CreateComment!): Comment!
        updateComment(updateCommentInput: UpdateComment): Comment!
        upvoteComment(upvoteCommentInput: UpvoteComment!): Comment!
        downvoteComment(downvoteCommentInput: DovnoteComment!): Comment!
        deleteComment(id: ID!): ID
    }
`;
