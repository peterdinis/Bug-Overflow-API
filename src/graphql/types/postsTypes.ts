export type CreatePostType = {
    content: string;
    user: any;
    status: string;
    tag: string;
};

export type UpdatePostType = Partial<CreatePostType>;
