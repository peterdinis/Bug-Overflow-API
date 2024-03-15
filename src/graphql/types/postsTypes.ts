import { CommentType } from './commentTypes';
import { UserType } from './userTypes';

export type Posts = {
    id: number;
    content: string;
    createdAt: string;
    user: UserType[];
    tag: string;
    comments: CommentType[];
};

export type CreatePostType = {
    content: string;
    user: UserType;
    tag: string;
};

export type UpdatePostType = Partial<CreatePostType>;
