export type Category = {
    _id: string;
    title: string;
    description?: string;
    category: string;
    icon?: string;
    rootCategoryId?: string;
    subCategories?: Category[];
};

export type CategoriesResponse = Category[];
