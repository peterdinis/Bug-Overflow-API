import {prisma} from "../../prisma/db";

export const technologyResolvers = {
    Query: {
        getAllTechnologies: async() => {
            return prisma.technology.findMany();
        }
    }
}