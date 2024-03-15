import { GraphQLError } from 'graphql';
import { prisma } from '../../prisma/db';
import { SearchQueryType } from '../types/globalTypes';
import {
    CreateComment,
    UpdateComment,
    DownvoteComment,
    UpvoteComment,
} from '../types/commentTypes';

export const commentResolvers = {
    Query: {
        getAllComments: async () => {
            return prisma.comment.findMany();
        },

        getCommentById: async (_: unknown, { id }: { id: number }) => {
            return prisma.comment.findUnique({
                where: { id },
            });
        },

        paginatedComments: async (
            _: unknown,
            { page = 1, pageSize = 10 }: { page: number; pageSize: number },
        ) => {
            const skip = (page - 1) * pageSize;
            return prisma.comment.findMany({
                skip,
                take: pageSize,
            });
        },

        searchComments: async (_: unknown, { query }: SearchQueryType) => {
            return prisma.comment.findMany({
                where: {
                    commentedText: {
                        contains: query,
                    },
                },
            });
        },

        getAllCommentsForPost: async (postId: number) => {
            return prisma.comment.findMany({
                where: {
                    postId,
                },
            });
        },

        getCommentDetailInPost: async (postId: number, commentId: number) => {
            return prisma.comment.findUnique({
                where: {
                    id: commentId,
                },
            });
        },
    },

    Mutation: {
        createComment: async (
            _: unknown,
            { createCommentInput }: { createCommentInput: CreateComment },
        ) => {
            try {
                return prisma.comment.create({
                    data: createCommentInput,
                });
            } catch (error) {
                throw new GraphQLError('Failed to create comment');
            }
        },

        updateComment: async (
            _: unknown,
            id: number,
            { updateCommentInput }: { updateCommentInput: UpdateComment },
        ) => {
            const { ...rest } = updateCommentInput;
            try {
                return prisma.comment.update({
                    where: { id },
                    data: rest,
                });
            } catch (error) {
                throw new GraphQLError('Failed to update comment');
            }
        },

        deleteComment: async (_: unknown, { id }: { id: number }) => {
            try {
                await prisma.comment.delete({
                    where: { id },
                });
                return id;
            } catch (error) {
                throw new GraphQLError('Failed to delete comment');
            }
        },

        downvoteComment: async (
            _: unknown,
            { downvoteCommentInput }: { downvoteCommentInput: DownvoteComment },
        ) => {
            const { commentId, downvote } = downvoteCommentInput;
            try {
                return prisma.comment.update({
                    where: { id: commentId },
                    data: { downvote },
                });
            } catch (error) {
                throw new GraphQLError('Failed to downvote comment');
            }
        },

        upvoteComment: async (
            _: unknown,
            { upvoteCommentInput }: { upvoteCommentInput: UpvoteComment },
        ) => {
            const { commentId, upvote } = upvoteCommentInput;
            try {
                return prisma.comment.update({
                    where: { id: commentId },
                    data: { upvote },
                });
            } catch (error) {
                throw new GraphQLError('Failed to upvote comment');
            }
        },
    },
};
