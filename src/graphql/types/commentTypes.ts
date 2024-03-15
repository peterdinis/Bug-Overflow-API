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

export type UpvoteComment = {
    commentId: number;
    upvote: number;
};

export type DownvoteComment = {
    commentId: number;
    downvote: number;
};
