import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { CategoriesResponse } from '~/type/Category';
import RecipeType, { RecipeTypeResponse } from '~/type/RecipeType';

type RecipesQueryParams = {
    limit: number;
    page?: number;
    sortBy?: 'createdAt' | 'likes';
    sortOrder?: 'asc' | 'desc';
    subcategoriesIds?: string;
};

type CategoryPath = {
    id: string | undefined;
};

const url = 'https://marathon-api.clevertec.ru/';

export const appSlice = createApi({
    reducerPath: 'appSlice',
    baseQuery: fetchBaseQuery({ baseUrl: url }),
    endpoints: (build) => ({
        getCategories: build.query<CategoriesResponse, void>({
            query: () => 'category',
        }),
        getCategory: build.query<CategoriesResponse, CategoryPath>({
            query: ({ id }) => `category/${id}`,
        }),
        getRecipe: build.query<RecipeType, CategoryPath>({
            query: ({ id }) => `recipe/${id}`,
        }),
        getRecipes: build.query<RecipeTypeResponse, RecipesQueryParams>({
            query: ({ limit, page, sortBy, sortOrder, subcategoriesIds }) => {
                const params = new URLSearchParams({ limit: String(limit) });

                if (sortBy) {
                    params.append('sortBy', sortBy);
                }
                if (page) {
                    params.append('page', page + '');
                }
                if (sortOrder) {
                    params.append('sortOrder', sortOrder);
                }
                if (subcategoriesIds) {
                    params.append('subcategoriesIds', subcategoriesIds);
                }

                return `recipe?${params.toString()}`;
            },
        }),
    }),
});

export const {
    useGetCategoriesQuery,
    useGetRecipesQuery,
    useLazyGetRecipesQuery,
    useGetRecipeQuery,
    useLazyGetRecipeQuery,
} = appSlice;
