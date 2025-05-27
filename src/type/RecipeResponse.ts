export type IngredientType = {
    title: string;
    count: number;
    measureUnit: string;
};

export type NutritionValueType = {
    calories: number;
    carbohydrates: number;
    fats: number;
    protein: number;
};

export type StepCook = {
    stepNumber: number;
    description: string;
    image?: string;
};

export type RecipeResponse = {
    _id: string;
    authorId: string;
    bookmarks: number;
    categoriesIds: string[];
    createdAt: string;
    description: string;
    image: string;
    ingredients: IngredientType[];
    likes: number;
    nutritionValue: NutritionValueType;
    portions: number;
    steps: StepCook[];
    time: number;
    title: string;
    views: number;
};
