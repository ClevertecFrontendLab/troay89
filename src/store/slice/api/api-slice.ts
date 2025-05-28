import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
    DraftRecipeFormValues,
    RecipeFormValues,
} from '~/app/pages/new-recipe-page/NewRecipeSchema';
import { STORAGE_KEY } from '~/constants/storageKey';
import { URLS } from '~/constants/url';
import { CategoriesResponse } from '~/type/category';
import { LoginDataType } from '~/type/loginDataType';
import { MeasureUnitsResponse } from '~/type/measureUnitsResponse';
import { RecipeResponse } from '~/type/RecipeResponse';
import { RecipeType, RecipeTypeResponse } from '~/type/recipeType';
import { RegistrationData } from '~/type/registrationData';
import { Response } from '~/type/response';
import { UploadFileData } from '~/type/UploadFileData';

import { PATH } from './constants';
import {
    CategoryPath,
    ForgotPasswordData,
    RecipeId,
    RecipesCategoryQueryParams,
    RecipesQueryParams,
    ResetPasswordData,
    VerifyOtpData,
} from './types';

type DecodedAccessToken = {
    userId: string;
    login: string;
    iat: number;
    exp: number;
};

type UploadFileResponse = {
    _id: string;
    name: string;
    url: string;
};

export const apiSlice = createApi({
    reducerPath: 'apiSlice',
    baseQuery: fetchBaseQuery({ baseUrl: URLS.BASE_URL }),
    endpoints: (build) => ({
        getCategories: build.query<CategoriesResponse, void>({
            query: () => PATH.CATEGORY,
        }),
        getCategory: build.query<CategoriesResponse, CategoryPath>({
            query: ({ id }) => `${PATH.CATEGORY}/${id}`,
        }),
        getRecipe: build.query<RecipeType, CategoryPath>({
            query: ({ id }) => `${PATH.RECIPE}/${id}`,
        }),
        getMeasureUnits: build.query<MeasureUnitsResponse, void>({
            query: () => {
                const accessToken = localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
                return {
                    url: PATH.MEASURE_INITS,
                    headers: {
                        Authorization: accessToken ? `Bearer ${accessToken}` : '',
                        'Content-Type': 'application/json',
                    },
                };
            },
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
                return `${PATH.RECIPE}/${PATH.CATEGORY}/${id}${queryString}`;
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
        uploadFile: build.mutation<UploadFileResponse, UploadFileData>({
            query: ({ file }) => {
                const accessToken = localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
                const formData = new FormData();
                formData.append('file', file);
                return {
                    url: PATH.FILE_UPLOAD,
                    method: 'POST',
                    body: formData,
                    headers: {
                        Authorization: accessToken ? `Bearer ${accessToken}` : '',
                    },
                };
            },
        }),

        createRecipe: build.mutation<RecipeResponse, RecipeFormValues>({
            query: (data) => {
                const accessToken = localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
                return {
                    url: PATH.RECIPE,
                    method: 'POST',
                    body: data,
                    headers: {
                        Authorization: accessToken ? `Bearer ${accessToken}` : '',
                    },
                };
            },
        }),

        updateRecipe: build.mutation<RecipeResponse, { id: string; data: RecipeFormValues }>({
            query: ({ id, data }) => {
                const accessToken = localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
                return {
                    url: `${PATH.RECIPE}/${id}`,
                    method: 'PATCH',
                    body: data,
                    headers: {
                        Authorization: accessToken ? `Bearer ${accessToken}` : '',
                    },
                };
            },
        }),

        saveDraft: build.mutation<void, DraftRecipeFormValues>({
            query: (data) => {
                const accessToken = localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
                return {
                    url: `${PATH.RECIPE}/${PATH.DRAFT}`,
                    method: 'POST',
                    body: data,
                    headers: {
                        Authorization: accessToken ? `Bearer ${accessToken}` : '',
                    },
                };
            },
        }),

        deleteRecipe: build.mutation<void, RecipeId>({
            query: ({ id }) => {
                const accessToken = localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
                return {
                    url: `${PATH.RECIPE}/${id}`,
                    method: 'DELETE',
                    headers: {
                        Authorization: accessToken ? `Bearer ${accessToken}` : '',
                    },
                };
            },
        }),

        refresh: build.query<Response, void>({
            query: () => ({
                url: PATH.AUTH_REFRESH,
                method: 'GET',
                credentials: 'include',
            }),
        }),
        check: build.query<Response, void>({
            query: () => ({
                url: PATH.AUTH_CHECK_AUTH,
                method: 'GET',
                credentials: 'include',
            }),
        }),
        registration: build.mutation<Response, RegistrationData>({
            query: (data) => ({
                url: PATH.AUTH_SIGNUP,
                method: 'POST',
                credentials: 'include',
                body: data,
            }),
        }),
        login: build.mutation<Response, LoginDataType>({
            query: (data) => ({
                url: PATH.AUTH_LOGIN,
                method: 'POST',
                credentials: 'include',
                body: data,
            }),
            async onQueryStarted(_, { queryFulfilled }) {
                const result = await queryFulfilled;
                const accessToken = result.meta?.response?.headers.get('Authentication-Access');

                const oldToken = localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);

                if (accessToken && accessToken !== oldToken) {
                    localStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, accessToken);
                    const [_, payload] = accessToken.split('.');
                    const decodedPayload = JSON.parse(atob(payload)) as DecodedAccessToken;
                    console.log(decodedPayload, 'decodedPayload');
                    localStorage.setItem(STORAGE_KEY.DECODED_PAYLOAD, decodedPayload.userId);
                }
            },
        }),
        forgotPassword: build.mutation<Response, ForgotPasswordData>({
            query: (data) => ({
                url: PATH.AUTH_FORGOT_PASSWORD,
                method: 'POST',
                body: data,
            }),
        }),
        verifyOtp: build.mutation<Response, VerifyOtpData>({
            query: (data) => ({
                url: PATH.AUTH_VERIFY_OTP,
                method: 'POST',
                body: data,
            }),
        }),
        resetPassword: build.mutation<Response, ResetPasswordData>({
            query: (data) => ({
                url: PATH.AUTH_RESET_PASSWORD,
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
    useGetMeasureUnitsQuery,
    useUploadFileMutation,
    useCreateRecipeMutation,
    useDeleteRecipeMutation,
    useUpdateRecipeMutation,
    useSaveDraftMutation,
} = apiSlice;
