import { ApolloError } from "apollo-server";
import {prisma} from "../../prisma/db";

export const technologyResolvers = {
    Query: {
        getAllTechnologies: async() => {
            return prisma.technology.findMany();
        },

        getTechnologyBdId: async(id: number) => {
            const findOneTechnology = await prisma.technology.findUnique({
                where: {
                    id,
                }
            })

            if(!findOneTechnology) {
                throw new ApolloError("Technology not found", "404")
            }

            return findOneTechnology
        }
    },

    Mutation: {
        createNewTechnology: async (name: string, image: string) => {
            const createTechnology = await prisma.technology.create({
                data: {
                    name,
                    image
                }
            })

            if(!createTechnology) {
                throw new ApolloError("Technology can not be created", "400")
            }

            return createTechnology
        }
    }
}