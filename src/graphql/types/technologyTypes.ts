export type CreateTechnologyType = {
    name: string;
    image: string;
};

export type UpdateTechnologyType = Partial<CreateTechnologyType>;


export type SearchQueryType = {
    query: string
}