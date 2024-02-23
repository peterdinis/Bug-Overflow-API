export type CreateTechnologyType = {
    name: string;
    image: string;
};

export type UpdateTechnologyType = Partial<CreateTechnologyType>;
