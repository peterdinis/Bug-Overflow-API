import { GraphQLError } from 'graphql';
import { prisma } from '../../prisma/db';
import { SearchQueryType } from '../types/globalTypes';

export const commentResolvers = {
    Query: {
        getAllComments: async() => {
            return prisma.comment.findMany();
        },

        getCommentById: async(id: number) => {},

        paginatedComments: async(_:unknown, {page = 1, pageSize = 10}) => {},

        searchTechnologies: async(_:unknown, {query}: SearchQueryType) => {},

        getAllCommentsForPost: async(postId: number) => {},

        getCommentDetailInPost: async(postId: number, commentId: number) => {}
    },

    Mutation: {
        createComment: async() => {},

        updateComment: async() => {},

        deleteComment: async() => {},

        downvoteComment: async() => {},

        upvoteComment: async() => {}
    }
};
