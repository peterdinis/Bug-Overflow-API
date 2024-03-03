import { CreatePostType, UpdatePostType } from './../types/postsTypes';
import {prisma} from "../../prisma/db";
import { ApolloError } from 'apollo-server';
import { SearchQueryType } from "../types/globalTypes";

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
                throw new ApolloError("Post with this id does not exists", "404");
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
                throw new ApolloError("Posts with these content does not exists", "404");
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
                throw new ApolloError("Could not create posts", "400");
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
                throw new ApolloError(
                    'post with this id does not exists',
                    '404',
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
                throw new ApolloError("Post can not be updated", "403");
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
                throw new ApolloError(
                    'post with this id does not exists',
                    '404',
                );
            }

            const deletePost = await prisma.post.delete({
                where: { id: findOnePost.id },
            });

            return deletePost;
        }
    }
}