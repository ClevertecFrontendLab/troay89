import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { CategoriesResponse } from '~/type/Category';
import RecipeType, { RecipeTypeResponse } from '~/type/RecipeType';

type RecipesQueryParams = {
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

type RecipesCategoryQueryParams = {
    id: string | undefined;
    page?: number;
    limit?: number;
    allergens?: string;
    searchString?: string;
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
        getRecipeByCategory: build.query<RecipeTypeResponse, RecipesCategoryQueryParams>({
            query: ({ id, page, limit, allergens, searchString }) => {
                const params = new URLSearchParams();

                if (limit !== undefined) {
                    params.append('limit', String(limit));
                }
                if (page !== undefined) {
                    params.append('page', String(page));
                }
                if (allergens) {
                    params.append('allergens', allergens);
                }
                if (searchString) {
                    params.append('searchString', searchString);
                }

                const queryString = params.toString() ? `?${params.toString()}` : '';
                return `recipe/category/${id}${queryString}`;
            },
        }),
        getRecipes: build.query<RecipeTypeResponse, RecipesQueryParams>({
            query: ({
                limit,
                page,
                sortBy,
                sortOrder,
                subcategoriesIds,
                allergens,
                searchString,
                meat,
                garnish,
            }) => {
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
                if (allergens) {
                    params.append('allergens', allergens);
                }
                if (searchString) {
                    params.append('searchString', searchString);
                }
                if (meat) {
                    params.append('meat', meat);
                }
                if (garnish) {
                    params.append('garnish', garnish);
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
    useGetRecipeByCategoryQuery,
    useLazyGetRecipeByCategoryQuery,
} = appSlice;
