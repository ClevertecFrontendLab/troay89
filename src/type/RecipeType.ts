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
    id: string;
    title: string;
    description: string;
    category: string[];
    subcategory: string[];
    image: string;
    bookmarks: number;
    likes: number;
    date: string;
    time: string;
    portions?: number;
    nutritionValue: NutritionValue;
    ingredients: Ingredient[];
    steps: Step[];
    meat?: string;
    side?: string;
};

export default RecipeType;
