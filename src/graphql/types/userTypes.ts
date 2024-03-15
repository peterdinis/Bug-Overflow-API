import { Technologies } from "./technologyTypes";

export type AuthType = {
    userName: string;
    email: string;
    password: string;
};

export type UserType = {
    id: number;
    userName: string;
    email: string;
    token: string;
    favoriteTechnologies: Technologies[];
    createdAt: string | Date;
    posts: any;
}