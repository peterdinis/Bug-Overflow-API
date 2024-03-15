export type CreateComment = {
    commentedText: string;
    postId: number;
    userId: number;
    upvote: number;
    downvote: number;
}

export type UpdateComment = {
    commentedText?: string;
    postId?: number;
    userId?: number;
    upvote?: number;
    downvote?: number;
}

type CommentWithId = {
    commentId: number;
}

export type UpvoteComment = CommentWithId & {
    upvote: number;
}

export type DownvoteComment = CommentWithId & {
    downvote: number;
}