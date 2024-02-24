import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { AuthType } from '../types/userTypes';
import { prisma } from '../../prisma/db';
import { ApolloError } from 'apollo-server';

export const userResolvers = {
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
                        createdAt: new Date().toISOString(),
                        token: '',
                    },
                });

                const token = jwt.sign(
                    { userId: createNewUser.id },
                    process.env.JWT_SECRET as unknown as string,
                    { expiresIn: '1d' },
                ); // Adjust the expiration as needed

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
                throw new ApolloError('User does not exists', '404');
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
