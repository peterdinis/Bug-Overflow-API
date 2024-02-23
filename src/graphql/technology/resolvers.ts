import { ApolloError } from 'apollo-server';
import { prisma } from '../../prisma/db';

export const technologyResolvers = {
    Query: {
        getAllTechnologies: async () => {
            return prisma.technology.findMany();
        },

        getTechnologyById: async (id: number) => {
            const findOneTechnology = await prisma.technology.findUnique({
                where: {
                    id,
                },
            });

            if (!findOneTechnology) {
                throw new ApolloError('Technology not found', '404');
            }

            return findOneTechnology;
        },
    },

    Mutation: {
        createTechnology: async (_: any, { name, image }: any) => {
            const createTechnology = await prisma.technology.create({
                data: {
                    name,
                    image,
                },
            });
    
            if (!createTechnology) {
                throw new ApolloError('Technology can not be created', '400');
            }
    
            return createTechnology;
        },

        updateTechnology: async(id: number, name: string, image: string) => {

        },

        deleteTechnology: async(id: number) => {
            
        }
    },
};
