import { CreatePostType, UpdatePostType } from './../types/postsTypes';
import {prisma} from "../../prisma/db";
import { SearchQueryType } from "../types/globalTypes";
import { GraphQLError } from 'graphql';

export const postsResolvers = {
    Query: {
        getAllPosts: async() => {
            return prisma.post.findMany();
        },

        getPostById: async(id: number) => {
            const findOnePost = await prisma.post.findUnique({
                where: {
                    id
                }
            });

            if(!findOnePost) {
                throw new GraphQLError("Post with this id does not exists");
            }

            return findOnePost;
        },

        paginatedPosts: async (
            _: unknown,
            { page = 1, pageSize = 10 },
        ) => {
            const posts = await prisma.post.findMany({
                take: pageSize,
                skip: (page - 1) * pageSize,
            });

            return posts;
        },

        searchPosts: async (_: unknown, { query }: SearchQueryType) => {
            const posts = await prisma.post.findMany({
                where: {
                    content: {
                        contains: query
                    }
                }
            });

            if(!posts) {
                throw new GraphQLError("Posts with these content does not exists");
            }

            return posts;
        },
    },

    Mutation: {
        createPost: async(
            _: unknown,
            createPostInput: CreatePostType
        ) =>{
            const newPosts = await prisma.post.create({
                data: {
                    ...createPostInput
                }
            });

            if(!newPosts) {
                throw new GraphQLError("Could not create posts");
            }

            return newPosts
        },

        updatePost: async(
            _: unknown,
            id: number,
            updatePostInput: UpdatePostType
        ) => {
            const findOnePost = await prisma.post.findUnique({
                where: {
                    id,
                },
            });

            if (!findOnePost) {
                throw new GraphQLError(
                    'post with this id does not exists',
                );
            }

            const updateOnePost = await prisma.post.update({
                where: {
                    id: findOnePost.id
                },
                data: {
                    ...updatePostInput
                }
            })

            if(!updateOnePost) {
                throw new GraphQLError("Post can not be updated");
            }

            return updateOnePost;
        },

        deletePost: async(_: unknown, id: number) => {
            const findOnePost = await prisma.post.findUnique({
                where: {
                    id,
                },
            });

            if (!findOnePost) {
                throw new GraphQLError(
                    'post with this id does not exists',
                );
            }

            const deletePost = await prisma.post.delete({
                where: { id: findOnePost.id },
            });

            return deletePost;
        }
    }
}