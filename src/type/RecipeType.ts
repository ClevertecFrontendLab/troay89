export type NutritionValue = {
    calories: number;
    proteins: number;
    fats: number;
    carbohydrates: number;
};

export type Ingredient = {
    title: string;
    count: string;
    measureUnit: string;
};

export type Step = {
    stepNumber: number;
    description: string;
    image: string;
};

export type RecipeType = {
    _id: string;
    title: string;
    description: string;
    category: string[];
    subcategory: string[];
    categoriesIds: string[];
    image: string;
    views: number;
    bookmarks: number;
    likes: number;
    createdAt: string;
    time: string;
    portions: number;
    authorId: string;
    nutritionValue: NutritionValue;
    ingredients: Ingredient[];
    steps: Step[];
    meat: string;
    garnish: string;
};

export type PaginationMeta = {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
};

export type RecipeTypeResponse = {
    data: RecipeType[];
    meta: PaginationMeta;
};
