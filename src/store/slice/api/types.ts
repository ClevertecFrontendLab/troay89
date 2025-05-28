export type RecipesQueryParams = {
    limit: number;
    page?: number;
    sortBy?: 'createdAt' | 'likes';
    sortOrder?: 'asc' | 'desc';
    subcategoriesIds?: string;
    allergens?: string;
    searchString?: string;
    meat?: string;
    garnish?: string;
};

export type RecipesCategoryQueryParams = Partial<{
    id: string;
    page: number;
    limit: number;
    allergens: string;
    searchString: string;
}>;

export type CategoryPath = Partial<{
    id: string;
}>;

export type RecipeId = {
    id: string;
};

export type ForgotPasswordData = {
    email: string;
};

export type VerifyOtpData = {
    email: string;
    otpToken: string;
};

export type ResetPasswordData = {
    email: string;
    login: string;
    password: string;
    passwordConfirm: string;
};
