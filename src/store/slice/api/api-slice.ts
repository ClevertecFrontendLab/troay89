import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { URLS } from '~/constants/url';
import { CategoriesResponse } from '~/type/category';
import { LoginDataType } from '~/type/LoginDataType';
import { RecipeType, RecipeTypeResponse } from '~/type/recipeType';
import { RegistrationData } from '~/type/registrationData';
import { Response } from '~/type/response';

import {
    CategoryPath,
    ForgotPasswordData,
    RecipesCategoryQueryParams,
    RecipesQueryParams,
    ResetPasswordData,
    VerifyOtpData,
} from './types';

export const apiSlice = createApi({
    reducerPath: 'apiSlice',
    baseQuery: fetchBaseQuery({ baseUrl: URLS.BASE_URL }),
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
        refresh: build.query<Response, void>({
            query: () => ({
                url: 'auth/refresh',
                method: 'GET',
                credentials: 'include',
            }),
        }),
        check: build.query<Response, void>({
            query: () => ({
                url: 'auth/check-auth',
                method: 'GET',
                credentials: 'include',
            }),
        }),
        registration: build.mutation<Response, RegistrationData>({
            query: (data) => ({
                url: 'auth/signup',
                method: 'POST',
                credentials: 'include',
                body: data,
            }),
        }),
        login: build.mutation<Response, LoginDataType>({
            query: (data) => ({
                url: 'auth/login',
                method: 'POST',
                credentials: 'include',
                body: data,
            }),
            async onQueryStarted(_, { queryFulfilled }) {
                const result = await queryFulfilled;
                const accessToken = result.meta?.response?.headers.get('Authentication-Access');

                const oldToken = localStorage.getItem('accessToken');

                if (accessToken && accessToken !== oldToken) {
                    localStorage.setItem('accessToken', accessToken);
                }
            },
        }),
        forgotPassword: build.mutation<Response, ForgotPasswordData>({
            query: (data) => ({
                url: 'auth/forgot-password',
                method: 'POST',
                body: data,
            }),
        }),
        verifyOtp: build.mutation<Response, VerifyOtpData>({
            query: (data) => ({
                url: 'auth/verify-otp',
                method: 'POST',
                body: data,
            }),
        }),
        resetPassword: build.mutation<Response, ResetPasswordData>({
            query: (data) => ({
                url: 'auth/reset-password',
                method: 'POST',
                body: data,
            }),
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
    useRegistrationMutation,
    useLoginMutation,
    useCheckQuery,
    useLazyRefreshQuery,
    useForgotPasswordMutation,
    useVerifyOtpMutation,
    useResetPasswordMutation,
} = apiSlice;
