import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { AuthType } from '../types/userTypes';
import { prisma } from '../../prisma/db';
import { GraphQLError } from 'graphql';
import {format} from "date-fns";

export const userResolvers = {
    Query: {
        userProfile: async (_: unknown, { id }: any) => {
            return await prisma.user.findUnique({
                where: { id: Number(id) },
            });
        },
    },

    Mutation: {
        registerUser: async (
            _: unknown,
            { email, password, userName }: AuthType,
        ) => {
            try {
                if (!email || !password || !userName) {
                    throw new Error(
                        'Incomplete input. Please provide email, password, and userName.',
                    );
                }

                const hashedPassword = await bcrypt.hash(password, 10);

                const createNewUser = await prisma.user.create({
                    data: {
                        userName,
                        email,
                        password: hashedPassword,
                        createdAt: format(new Date(), 'MM-dd-YYYY'),
                        token: '',
                    },
                });

                const token = jwt.sign(
                    { userId: createNewUser.id },
                    process.env.JWT_SECRET as unknown as string,
                    { expiresIn: '1d' },
                );

                const updatedUser = await prisma.user.update({
                    where: { id: createNewUser.id },
                    data: { token },
                });

                return {
                    ...updatedUser,
                    token,
                };
            } catch (error) {
                console.error('Error during user registration:', error);
                throw new Error('User registration failed. Please try again.');
            }
        },

        loginUser: async (_: unknown, { email, password }: AuthType) => {
            const user = await prisma.user.findUnique({
                where: {
                    email,
                },
            });

            if (!user) {
                throw new GraphQLError('User does not exists');
            }

            const valid = await bcrypt.compare(password, user.password);
            if (!valid) throw new Error('Invalid password');

            const token = jwt.sign(
                { userId: user.id },
                process.env.JWT_SECRET as unknown as string,
                { expiresIn: '1d' },
            );

            return {
                ...user,
                token,
            };
        },
    },
};
