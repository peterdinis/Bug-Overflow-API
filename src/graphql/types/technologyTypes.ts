export type Technologies = {
    id: number;
    name: string;
    image: string;
};

export type CreateTechnologyType = {
    name: string;
    image: string;
};

export type UpdateTechnologyType = Partial<CreateTechnologyType>;
