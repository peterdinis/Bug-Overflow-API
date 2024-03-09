import { GraphQLError } from 'graphql';
import { prisma } from '../../prisma/db';
import {
    CreateTechnologyType,
    UpdateTechnologyType,
} from '../types/technologyTypes';
import { SearchQueryType } from '../types/globalTypes';

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
                throw new GraphQLError('Technology not found');
            }

            return findOneTechnology;
        },

        paginatedTechnologies: async (
            _: unknown,
            { page = 1, pageSize = 10 },
        ) => {
            const technologies = await prisma.technology.findMany({
                take: pageSize,
                skip: (page - 1) * pageSize,
            });

            return technologies;
        },
        searchTechnologies: async (_: unknown, { query }: SearchQueryType) => {
            const technologies = await prisma.technology.findMany({
                where: {
                    name: {
                        contains: query,
                    },
                },
            });

            return technologies;
        },
    },

    Mutation: {
        createTechnology: async (
            _: unknown,
            createTechnologyInput: CreateTechnologyType,
        ) => {
            const createTechnology = await prisma.technology.create({
                data: {
                    ...createTechnologyInput,
                },
            });

            if (!createTechnology) {
                throw new GraphQLError('Technology can not be created');
            }

            return createTechnology;
        },

        updateTechnology: async (
            _: unknown,
            id: number,
            updateTechnologyInput: UpdateTechnologyType,
        ) => {
            const findOneTechnology = await prisma.technology.findUnique({
                where: {
                    id,
                },
            });

            if (!findOneTechnology) {
                throw new GraphQLError(
                    'Technology with this id does not exists',
                );
            }

            const updatingTechnology = await prisma.technology.update({
                where: {
                    id: findOneTechnology.id,
                },
                data: {
                    ...updateTechnologyInput,
                },
            });

            if (!updatingTechnology) {
                throw new GraphQLError('Update technology failed');
            }

            return updatingTechnology;
        },

        deleteTechnology: async (id: number) => {
            const findOneTechnology = await prisma.technology.findUnique({
                where: {
                    id,
                },
            });

            if (!findOneTechnology) {
                throw new GraphQLError(
                    'Technology with this id does not exists',
                );
            }

            const deleteCategory = await prisma.technology.delete({
                where: { id: findOneTechnology.id },
            });

            return deleteCategory;
        },
    },
};
