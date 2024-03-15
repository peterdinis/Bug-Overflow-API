import { Posts } from './postsTypes';
import { UserType } from './userTypes';

export type CommentType = {
    id: number;
    createdAt: string;
    commentedText: string;
    post: Posts[];
    user: UserType[];
};

export type CreateComment = {
    commentedText: string;
    postId: number;
    userId: number;
    upvote: number;
    downvote: number;
};

export type UpdateComment = {
    commentedText?: string;
    postId?: number;
    userId?: number;
    upvote?: number;
    downvote?: number;
};

type CommentWithId = {
    commentId: number;
};

export type UpvoteComment = CommentWithId & {
    upvote: number;
};

export type DownvoteComment = CommentWithId & {
    downvote: number;
};
