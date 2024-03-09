export const postsTypeDefs = `#graphql
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
        user: String!
        tag: String!
    }

    input UpdatePostInput {
        content: String
        user: String
        tag: String
    }

    type Query {
        getAllPosts: [Post!]!
        getPostById(id: ID!): Post!
        paginatedPosts(page: Int, pageSize: Int): [Post!]!
        searchPosts(query: String!): [Post!]!
    }

    type Mutation {
        createPost(createPostInput: CreatePostInput!): Post!
        updatePost(updatePostInput: UpdatePostInput): Post
        deletePost(id: ID!):ID
    }
`;
