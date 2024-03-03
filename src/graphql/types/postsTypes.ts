export type CreatePostType = {
    content: string;
    user: any;
    tag: string;
}

export type UpdatePostType = Partial<CreatePostType>;