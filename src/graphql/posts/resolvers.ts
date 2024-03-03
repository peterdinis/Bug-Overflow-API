import {prisma} from "../../prisma/db";
import { ApolloError } from 'apollo-server';

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

        searchPosts: () => {},

        getAllPostsByTag:(tag: string) => {},

        allCommentsForPosts: () => {}
    }
}